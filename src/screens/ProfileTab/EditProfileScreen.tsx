import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  Image, Alert, Platform, PermissionsAndroid,
  ActivityIndicator, StyleSheet
} from 'react-native';

import styles from '../ProfileTab/StyleSheet';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateProfile } from '../../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { API_BASE, IMAGE_BASE } from '../../constants/Constant';

const DATA_EXPIRY = 6 * 60 * 60 * 1000; // 6 hours

const EditProfileScreen: React.FC = () => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

 const getValidAvatar = (url) => {
  console.log('🔍 getValidAvatar - Input URL:', url);
  
  if (!url) {
    console.log('🔍 No URL, using default');
    return 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
  }
  
  if (url.startsWith("file") || url.startsWith("content")) {
    console.log('🔍 Local URI detected:', url);
    return url;
  }
  
  if (url.startsWith("http")) {
    console.log('🔍 Full URL detected:', url);
    return url;
  }
  
  // ✅ FIX: Check if it's just a filename (no slashes)
  if (!url.includes('/')) {
    const finalUrl = `${IMAGE_BASE}/uploads/${url}`;
    console.log('🔍 Constructed URL from filename:', finalUrl);
    return finalUrl;
  }
  
  // If it has slashes but no http, clean it
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  const finalUrl = `${IMAGE_BASE}${cleanPath}`;
  console.log('🔍 Constructed URL from path:', finalUrl);
  console.log('🔍 IMAGE_BASE used:', IMAGE_BASE);
  
  return finalUrl;
};

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(() => {
    console.log('📸 Initial avatar from user:', user?.avatar);
    return getValidAvatar(user?.avatar || '');
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('🔄 Component mounted');
    console.log('📦 Redux user:', user);
    console.log('📦 Redux user avatar:', user?.avatar);
    
    const loadUser = async () => {
      try {
        setLoading(true);
        console.log('📥 Loading user from storage...');

        const storedUser = await AsyncStorage.getItem("userInfo");
        const lastFetch = await AsyncStorage.getItem("profile_last_update");
        
        console.log('💾 Stored user:', storedUser);
        console.log('⏰ Last fetch:', lastFetch);

        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          console.log('📦 Parsed stored user:', parsed);
          console.log('📦 Stored avatar:', parsed.avatar);
          
          setName(parsed.name);
          setEmail(parsed.email);
          setPhone(parsed.phone);
          const avatarUrl = getValidAvatar(parsed.avatar);
          console.log('🖼️ Setting avatar from storage to:', avatarUrl);
          setAvatar(avatarUrl);
        }

        if (lastFetch && Date.now() - Number(lastFetch) < DATA_EXPIRY) {
          console.log('✅ Using cached data, skipping server fetch');
          setLoading(false);
          return;
        }

        console.log('🔄 Fetching fresh data from server...');
        await fetchUserFromServer();
      } catch (error) {
        console.error('❌ Error in loadUser:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const fetchUserFromServer = async () => {
    console.log('🌐 Fetching user from server...');
    const token = await AsyncStorage.getItem('token');
    console.log('🔑 Token exists:', !!token);
    
    if (!token) return;

    try {
      const res = await axios.get(`${API_BASE}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('✅ Server response:', res.data);
      const fetchedUser = res.data.data;
      console.log('👤 Fetched user:', fetchedUser);
      console.log('🖼️ Fetched avatar:', fetchedUser.avatar);

      setName(fetchedUser.name);
      setEmail(fetchedUser.email);
      setPhone(fetchedUser.phone);
      
      const avatarUrl = getValidAvatar(fetchedUser.avatar);
      console.log('🖼️ Setting avatar from server to:', avatarUrl);
      setAvatar(avatarUrl);

      dispatch(updateProfile(fetchedUser));

      await AsyncStorage.setItem("userInfo", JSON.stringify(fetchedUser));
      await AsyncStorage.setItem("profile_last_update", Date.now().toString());
      console.log('💾 Saved to storage');
      
    } catch (error) {
      console.error('❌ Error fetching from server:', error);
    }
  };

  const pickOrCapture = () => {
    Alert.alert("Change Profile Photo", "Choose", [
      { text: "Camera", onPress: openCamera },
      { text: "Gallery", onPress: pickImageGallery },
      { text: "Cancel", style: "cancel" }
    ]);
  };

  const openCamera = async () => {
    console.log('📸 Opening camera...');
    if (Platform.OS === 'android') {
      const permission = await new Promise((resolve) => {
        Alert.alert(
          "Camera Permission Required",
          "To update your profile photo, the app needs access to your camera to capture a new picture.",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => resolve(false),
            },
            {
              text: "Allow",
              onPress: async () => {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.CAMERA
                );
                resolve(granted === PermissionsAndroid.RESULTS.GRANTED);
              },
            },
          ],
          { cancelable: false }
        );
      });

      if (!permission) {
        console.log('❌ Camera permission denied');
        Alert.alert("Permission Denied", "Camera access is required to take a profile photo.");
        return;
      }
    }

    const options = {
      mediaType: 'photo',
      quality: 0.8,
      saveToPhotos: false,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('📸 Camera cancelled');
        return;
      }
      if (response.errorCode) {
        console.log('❌ Camera error:', response.errorMessage);
        Alert.alert('Error', response.errorMessage || 'Camera error occurred.');
        return;
      }

      const uri = response.assets?.[0]?.uri;
      console.log('📸 Captured image URI:', uri);
      if (uri) setAvatar(uri);
    });
  };

  const pickImageGallery = async () => {
    console.log('🖼️ Opening gallery...');
    if (Platform.OS === 'android' && Platform.Version < 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('❌ Storage permission denied');
        Alert.alert("Permission Required", "Storage permission is required to select a profile image.");
        return;
      }
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) {
          console.log('🖼️ Gallery cancelled');
          return;
        }
        if (response.errorCode) {
          console.log('❌ Gallery error:', response.errorMessage);
          Alert.alert('Error', response.errorMessage || 'Failed to pick image.');
          return;
        }

        const uri = response.assets?.[0]?.uri;
        console.log('🖼️ Selected image URI:', uri);
        if (uri) setAvatar(uri);
      }
    );
  };

  const handleSave = async () => {
    console.log('💾 Starting save process...');
    
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    console.log('📝 Input values:', { trimmedName, trimmedPhone, trimmedEmail });
    console.log('🖼️ Current avatar:', avatar);

    if (!trimmedName || !trimmedPhone || !trimmedEmail) {
      console.log('❌ Validation failed: empty fields');
      Toast.show({ type: "error", text1: "All fields are required." });
      return;
    }

    if (trimmedName.length < 3) {
      console.log('❌ Validation failed: name too short');
      Toast.show({ type: "error", text1: "Name must be at least 3 characters." });
      return;
    }

    if (!/^[0-9]{10,15}$/.test(trimmedPhone)) {
      console.log('❌ Validation failed: invalid phone');
      Toast.show({ type: "error", text1: "Enter a valid phone number." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      console.log('❌ Validation failed: invalid email');
      Toast.show({ type: "error", text1: "Enter a valid email address." });
      return;
    }

    const isLocalImage = avatar.startsWith("file") || avatar.startsWith("content");
    console.log('🖼️ Is local image:', isLocalImage);
    console.log('👤 Current user:', user);

    if (
      trimmedName === user?.name &&
      trimmedPhone === user?.phone &&
      trimmedEmail === user?.email &&
      !isLocalImage
    ) {
      console.log('ℹ️ No changes detected');
      Toast.show({ type: "info", text1: "No changes to update." });
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");
      console.log('🔑 Token retrieved:', !!token);
      
      if (!token) {
        Toast.show({ type: "error", text1: "Authentication error. Please login again." });
        return;
      }

      const formData = new FormData();
      formData.append("name", trimmedName);
      formData.append("phone", trimmedPhone);
      formData.append("email", trimmedEmail);

      if (isLocalImage) {
        const imageFile = {
          uri: avatar,
          name: `profile_${Date.now()}.jpg`,
          type: "image/jpeg",
        };
        console.log('📎 Appending image:', imageFile);
        formData.append("avatar", imageFile);
      } else {
        console.log('📎 No new image to upload');
      }

      console.log('📤 Sending request to:', `${API_BASE}/users/profile`);
      
      const res = await axios.put(`${API_BASE}/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log('✅ Server response:', res.data);
      
      const updatedUser = res.data.data;
      console.log('👤 Updated user:', updatedUser);
      console.log('🖼️ Updated avatar (full):', updatedUser.avatar);

      // Log the avatar URL after cleaning
      const cleanedAvatar = updatedUser.avatar.replace(/^https?:\/\/[^/]+/, "");
      console.log('🖼️ Cleaned avatar path:', cleanedAvatar);
      
      updatedUser.avatar = cleanedAvatar;

      await AsyncStorage.setItem("userInfo", JSON.stringify(updatedUser));
      
      const newAvatarUrl = getValidAvatar(updatedUser.avatar);
      console.log('🖼️ New avatar URL:', newAvatarUrl);
      setAvatar(newAvatarUrl);

      dispatch(updateProfile(updatedUser));
      await AsyncStorage.setItem("profile_last_update", Date.now().toString());

      Toast.show({ type: "success", text1: "Profile updated successfully!" });

    } catch (err) {
      console.error('❌ Save error:', err);
      if (err.response) {
        console.error('❌ Error response:', err.response.data);
      }
      Toast.show({ type: "error", text1: "Failed to update. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const DEFAULT_AVATAR = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.avatarSection}>
          <Image
            source={{ uri: avatar }}
            style={styles.avatar}
            onError={(e) => {
              console.log('❌ Image failed to load:', avatar);
              console.log('❌ Error:', e.nativeEvent.error);
              setAvatar(DEFAULT_AVATAR);
            }}
            onLoad={() => console.log('✅ Image loaded successfully:', avatar)}
          />
          <TouchableOpacity style={styles.changePhotoButton} onPress={pickOrCapture}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#1C1C1E'}
            placeholder="Enter mobile number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
            <Text style={styles.saveButtonText}>{loading ? "Saving..." : "Save Changes"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {loading && (
        <View style={localStyles.loaderOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  loaderOverlay: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center"
  }
});

export default EditProfileScreen;