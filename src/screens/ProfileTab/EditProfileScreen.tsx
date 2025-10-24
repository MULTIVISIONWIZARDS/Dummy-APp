import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../ProfileTab/StyleSheet';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateProfile } from '../../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

const EditProfileScreen: React.FC = () => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(
    user?.avatar || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
  );

  // Load user info from AsyncStorage
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userInfo');
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setAvatar(parsed.avatar || avatar);
          setName(parsed.name || name);
          setPhone(parsed.phone || phone);
          setEmail(parsed.email || email);
        }
      } catch (err) {
        console.log('Error loading user info:', err);
      }
    };
    loadUserInfo();
  }, []);

  // Save to AsyncStorage
  const saveUserInfo = async (newInfo: any) => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(newInfo));
    } catch (err) {
      console.log('Error saving user info:', err);
    }
  };

  // Android camera permission
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to take photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Open camera
  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera access is required to take photos.');
      return;
    }

    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        mediaType: 'photo',
          useFrontCamera: true,
      });
      setAvatar(image.path);
    } catch (error: any) {
      if (error.message !== 'User cancelled image selection') {
        Alert.alert('Error', 'Failed to capture image');
      }
    }
  };

  // Pick image from gallery
  const pickImageGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        mediaType: 'photo',
      });
      setAvatar(image.path);
    } catch (error: any) {
      if (error.message !== 'User cancelled image selection') {
        Alert.alert('Error', 'Failed to pick image');
      }
    }
  };

  // ActionSheet style picker (camera or gallery)
  const pickOrCapture = () => {
    Alert.alert('Update Profile Picture', 'Choose an option', [
      { text: 'Camera', onPress: openCamera },
      { text: 'Gallery', onPress: pickImageGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  // Save profile
  const handleSave = () => {
    if (!name || !phone || !email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const updatedUser = { ...user, name, phone, email, avatar };

    // Update Redux
    dispatch(updateProfile(updatedUser));

    // Save to AsyncStorage
    saveUserInfo(updatedUser);

    // Alert.alert('Success', 'Profile updated successfully');
    Toast.show({
  type:"success",
  text1:"Profile updated successfully"
})
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarSection}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.changePhotoButton} onPress={pickOrCapture}>
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
