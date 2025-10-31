// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   Alert,
//   Platform,
//   PermissionsAndroid,
// } from 'react-native';
// import styles from '../ProfileTab/StyleSheet';
// import { useAppDispatch, useAppSelector } from '../../store/hooks';
// import { updateProfile } from '../../store/authSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ImagePicker from 'react-native-image-crop-picker';
// import Toast from 'react-native-toast-message';
// import axios from 'axios';
// import { API_BASE } from '../../constants/Constant';

// const EditProfileScreen: React.FC = () => {
//   const user = useAppSelector(state => state.auth.user);
//   const dispatch = useAppDispatch();

//   const [name, setName] = useState(user?.name || '');
//   const [phone, setPhone] = useState(user?.phone || '');
//   const [email, setEmail] = useState(user?.email || '');
//   const [avatar, setAvatar] = useState(
//     user?.avatar || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
//   );
//   const [loading, setLoading] = useState(false);

//   // 🔹 Fetch user info from backend (GET /profile)
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const token = await AsyncStorage.getItem('token');
//         if (!token) return;

//         const res = await axios.get(`${API_BASE}/api/users/profile`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
// console.log(res.data.data);

//         const fetchedUser = res.data.data || res.data.user || res.data;

//         // Update local + Redux + AsyncStorage
//         setName(fetchedUser.name || '');
//         setPhone(fetchedUser.phone || '');
//         setEmail(fetchedUser.email || '');
//         setAvatar(fetchedUser.avatar || 'https://cdn-icons-png.flaticon.com/512/847/847969.png');

//         dispatch(updateProfile(fetchedUser));
//         await AsyncStorage.setItem('userInfo', JSON.stringify(fetchedUser));
//       } catch (error: any) {
//         console.log('Error fetching profile:', error.response?.data || error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [dispatch]);

//   // 🔹 Save to AsyncStorage helper
//   const saveUserInfo = async (newInfo: any) => {
//     try {
//       await AsyncStorage.setItem('userInfo', JSON.stringify(newInfo));
//     } catch (err) {
//       console.log('Error saving user info:', err);
//     }
//   };

//   // 🔹 Camera permission (Android)
//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: 'Camera Permission',
//             message: 'App needs access to your camera to take photos',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           }
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return true;
//   };

//   // 🔹 Open camera
//   const openCamera = async () => {
//     const hasPermission = await requestCameraPermission();
//     if (!hasPermission) {
//       Alert.alert('Permission Denied', 'Camera access is required to take photos.');
//       return;
//     }

//     try {
//       const image = await ImagePicker.openCamera({
//         width: 300,
//         height: 300,
//         cropping: true,
//         cropperCircleOverlay: true,
//         useFrontCamera: true,
//       });
//       setAvatar(image.path);
//     } catch (error: any) {
//       if (error.message !== 'User cancelled image selection') {
//         Alert.alert('Error', 'Failed to capture image');
//       }
//     }
//   };

//   // 🔹 Pick from gallery
//   const pickImageGallery = async () => {
//     try {
//       const image = await ImagePicker.openPicker({
//         width: 300,
//         height: 300,
//         cropping: true,
//         cropperCircleOverlay: true,
//       });
//       setAvatar(image.path);
//     } catch (error: any) {
//       if (error.message !== 'User cancelled image selection') {
//         Alert.alert('Error', 'Failed to pick image');
//       }
//     }
//   };

//   // 🔹 Choose image source
//   const pickOrCapture = () => {
//     Alert.alert('Update Profile Picture', 'Choose an option', [
//       { text: 'Camera', onPress: openCamera },
//       { text: 'Gallery', onPress: pickImageGallery },
//       { text: 'Cancel', style: 'cancel' },
//     ]);
//   };

//   // 🔹 Save profile to backend (PUT /profile)
//   const handleSave = async () => {
//     if (!name || !phone || !email) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         Alert.alert('Error', 'User not authenticated');
//         return;
//       }

//       const updatedData = { name, phone, email, avatar };

//       const response = await axios.put(`${API_BASE}/api/users/profile`, updatedData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const updatedUser = response.data.data || response.data.user || response.data;

//       // Update Redux + AsyncStorage
//       dispatch(updateProfile(updatedUser));
//       await saveUserInfo(updatedUser);

//       Toast.show({
//         type: 'success',
//         text1: 'Profile updated successfully',
//       });
//     } catch (error: any) {
//       console.log('Error updating profile:', error.response?.data || error.message);
//       Toast.show({
//         type: 'error',
//         text1: 'Failed to update profile',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.avatarSection}>
//         <Image source={{ uri: avatar }} style={styles.avatar} />
//         <TouchableOpacity style={styles.changePhotoButton} onPress={pickOrCapture}>
//           <Text style={styles.changePhotoText}>Change Photo</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.formSection}>
//         <Text style={styles.label}>Full Name</Text>
//         <TextInput
//           style={styles.input}
//           value={name}
//           onChangeText={setName}
//           placeholder="Enter your full name"
//         />

//         <Text style={styles.label}>Phone Number</Text>
//         <TextInput
//           style={styles.input}
//           value={phone}
//           onChangeText={setPhone}
//           placeholder="Enter your phone number"
//           keyboardType="phone-pad"
//         />

//         <Text style={styles.label}>Email</Text>
//         <TextInput
//           style={styles.input}
//           value={email}
//           onChangeText={setEmail}
//           placeholder="Enter your email"
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />

//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={styles.saveButton}
//           onPress={handleSave}
//           disabled={loading}
//         >
//           <Text style={styles.saveButtonText}>
//             {loading ? 'Saving...' : 'Save Changes'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default EditProfileScreen;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import styles from '../ProfileTab/StyleSheet';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateProfile } from '../../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { API_BASE } from '../../constants/Constant';

const EditProfileScreen: React.FC = () => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(
    user?.avatar || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
  );
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch user info from backend (GET /profile)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const res = await axios.get(`${API_BASE}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedUser = res.data.data || res.data.user || res.data;

        // Update local + Redux + AsyncStorage
        setName(fetchedUser.name || '');
        setPhone(fetchedUser.phone || '');
        setEmail(fetchedUser.email || '');
        setAvatar(fetchedUser.avatar || 'https://cdn-icons-png.flaticon.com/512/847/847969.png');

        dispatch(updateProfile(fetchedUser));
        await AsyncStorage.setItem('userInfo', JSON.stringify(fetchedUser));
      } catch (error: any) {
        console.log('Error fetching profile:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch]);

  // 🔹 Save to AsyncStorage helper
  const saveUserInfo = async (newInfo: any) => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(newInfo));
    } catch (err) {
      console.log('Error saving user info:', err);
    }
  };

  // 🔹 Camera permission (Android)
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

  // 🔹 Open camera
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
        useFrontCamera: true,
      });
      setAvatar(image.path);
    } catch (error: any) {
      if (error.message !== 'User cancelled image selection') {
        Alert.alert('Error', 'Failed to capture image');
      }
    }
  };

  // 🔹 Pick from gallery
  const pickImageGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
      });
      setAvatar(image.path);
    } catch (error: any) {
      if (error.message !== 'User cancelled image selection') {
        Alert.alert('Error', 'Failed to pick image');
      }
    }
  };

  // 🔹 Choose image source
  const pickOrCapture = () => {
    Alert.alert('Update Profile Picture', 'Choose an option', [
      { text: 'Camera', onPress: openCamera },
      { text: 'Gallery', onPress: pickImageGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  // 🔹 Save profile to backend (PUT /profile)
  const handleSave = async () => {
    if (!name || !phone || !email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      const updatedData = { name, phone, email, avatar };

      const response = await axios.put(`${API_BASE}/api/users/profile`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUser = response.data.data || response.data.user || response.data;

      // Update Redux + AsyncStorage
      dispatch(updateProfile(updatedUser));
      await saveUserInfo(updatedUser);

      Toast.show({
        type: 'success',
        text1: 'Profile updated successfully',
      });
    } catch (error: any) {
      console.log('Error updating profile:', error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: 'Failed to update profile',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 🔹 Fullscreen Loader Overlay */}
      {loading && (
        <View style={localStyles.loaderOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={localStyles.loaderText}>Please wait...</Text>
        </View>
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loaderText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 16,
  },
});

export default EditProfileScreen;
