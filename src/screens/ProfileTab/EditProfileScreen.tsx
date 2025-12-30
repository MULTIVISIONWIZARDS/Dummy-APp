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
  // const openCamera = async () => {
  //   const hasPermission = await requestCameraPermission();
  //   if (!hasPermission) {
  //     Alert.alert('Permission Denied', 'Camera access is required to take photos.');
  //     return;
  //   }

  //   try {
  //     const image = await ImagePicker.openCamera({
  //       width: 300,
  //       height: 300,
  //       cropping: true,
  //       cropperCircleOverlay: true,
  //       useFrontCamera: true,
  //     });
  //     setAvatar(image.path);
  //   } catch (error: any) {
  //     if (error.message !== 'User cancelled image selection') {
  //       Alert.alert('Error', 'Failed to capture image');
  //     }
  //   }
  // };

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
//   ActivityIndicator,
//   StyleSheet,
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

//         const fetchedUser = res.data.data || res.data.user || res.data;
// console.log(fetchedUser,":::::::::::::::fff");

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
// const handleSave = async () => {
//   if (!name || !phone || !email) return Alert.alert("Please fill all fields");

//   setLoading(true);

//   try {
//     const token = await AsyncStorage.getItem("token");

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("phone", phone);
//     formData.append("email", email);

//     // If avatar is new local file path
//     if (avatar && avatar.startsWith("file")) {
//       formData.append("avatar", {
//         uri: avatar,
//         type: "image/jpeg",
//         name: "profile.jpg",
//       });
//     }

//     const res = await axios.put(`${API_BASE}/api/users/profile`, formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     const updatedUser = res.data.data;

//     dispatch(updateProfile(updatedUser));
//     await AsyncStorage.setItem("userInfo", JSON.stringify(updatedUser));

//     Toast.show({ type: "success", text1: "Profile updated!" });

//   } catch (err) {
//     Toast.show({ type: "error", text1: "Update failed" });
//   } finally {
//     setLoading(false);
//   }
// };

//   // 🔹 Save profile to backend (PUT /profile)
//   const hanfdleSave = async () => {
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
//     <View style={{ flex: 1 }}>
//       <ScrollView style={styles.container}>
//         <View style={styles.avatarSection}>
//           <Image source={{ uri: avatar }} style={styles.avatar} />
          
//           <TouchableOpacity style={styles.changePhotoButton} onPress={pickOrCapture}>
//             <Text style={styles.changePhotoText}>Change Photo</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.formSection}>
//           <Text style={styles.label}>Full Name</Text>
//           <TextInput
//             style={styles.input}
//             value={name}
//             onChangeText={setName}
//             placeholder="Enter your full name"
//           />

//           <Text style={styles.label}>Phone Number</Text>
//           <TextInput
//             style={styles.input}
//             value={phone}
//             onChangeText={setPhone}
//             placeholder="Enter your phone number"
//             keyboardType="phone-pad"
//           />

//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={styles.input}
//             value={email}
//             onChangeText={setEmail}
//             placeholder="Enter your email"
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />

//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={styles.saveButton}
//             onPress={handleSave}
//             disabled={loading}
//           >
//             <Text style={styles.saveButtonText}>
//               {loading ? 'Saving...' : 'Save Changes'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* 🔹 Fullscreen Loader Overlay */}
//       {loading && (
//         <View style={localStyles.loaderOverlay}>
//           <ActivityIndicator size="large" color="#fff" />
//           <Text style={localStyles.loaderText}>Please wait...</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const localStyles = StyleSheet.create({
//   loaderOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 999,
//   },
//   loaderText: {
//     color: '#fff',
//     marginTop: 8,
//     fontSize: 16,
//   },
// });

// export default EditProfileScreen;

// import React, { useState, useEffect } from 'react';
// import {
//   View, Text, TextInput, TouchableOpacity, ScrollView,
//   Image, Alert, Platform, PermissionsAndroid,
//   ActivityIndicator, StyleSheet
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

//   const getValidAvatar = (url: string) => {
//     if (!url) return 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
    
//     url = url.replace('undefined', '').replace(/([^:]\/)\/+/g, '$1');

//     if (url.startsWith('file')) return url;

//     return url.startsWith('http')
//       ? url
//       : `${API_BASE}${url}`;
//   };

//   const [name, setName] = useState(user?.name || '');
//   const [phone, setPhone] = useState(user?.phone || '');
//   const [email, setEmail] = useState(user?.email || '');
//   const [avatar, setAvatar] = useState(getValidAvatar(user?.avatar || ''));
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         setLoading(true);
//         const token = await AsyncStorage.getItem('token');
//         const res = await axios.get(`${API_BASE}/api/users/profile`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         const fetchedUser = res.data.data;
//         setName(fetchedUser.name);
//         setEmail(fetchedUser.email);
//         setPhone(fetchedUser.phone);
//         setAvatar(getValidAvatar(fetchedUser.avatar));

//         dispatch(updateProfile(fetchedUser));
//         await AsyncStorage.setItem('userInfo', JSON.stringify(fetchedUser));

//       } catch {}
//       finally { setLoading(false); }
//     };

//     loadUser();
//   }, []);

//   const pickOrCapture = () => {
//     Alert.alert("Change Profile Photo", "Choose", [
//       { text: "Camera", onPress: openCamera },
//       { text: "Gallery", onPress: pickImageGallery },
//       { text: "Cancel", style: "cancel" }
//     ]);
//   };

//   const openCamera = async () => {
//     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
//     if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;

//     const image = await ImagePicker.openCamera({ width: 300, height: 300, cropping: true });
//     setAvatar(image.path);
//   };

  // const pickImageGallery = async () => {
  //   try {
  //     const image = await ImagePicker.openPicker({
  //       width: 300,
  //       height: 300,
  //       cropping: true,
  //       cropperCircleOverlay: true,
  //     });
  //     setAvatar(image.path);
  //   } catch (error: any) {
  //     if (error.message !== 'User cancelled image selection') {
  //       Alert.alert('Error', 'Failed to pick image');
  //     }
  //   }
  // };
//   // const pickImageGallery = async () => {
//   //   const image = await ImagePicker.openPicker({ width: 300, height: 300, cropping: true });
//   //   setAvatar(image.path);
//   // };

//   const handleSave = async () => {
//     if (!name || !phone || !email) {
//       return Alert.alert("Error", "All fields required");
//     }

//     setLoading(true);
//     try {
//       const token = await AsyncStorage.getItem("token");

//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("phone", phone);
//       formData.append("email", email);

//       if (avatar.startsWith("file")) {
//         formData.append("avatar", {
//           uri: avatar,
//           name: `profile_${Date.now()}.jpg`,
//           type: "image/jpeg"
//         });
//       }

//       const res = await axios.put(`${API_BASE}/api/users/profile`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const updatedUser = res.data.data;
//       updatedUser.avatar = getValidAvatar(updatedUser.avatar);

//       dispatch(updateProfile(updatedUser));
//       await AsyncStorage.setItem("userInfo", JSON.stringify(updatedUser));

//       Toast.show({ type: "success", text1: "Profile updated successfully!" });

//     } catch {
//       Toast.show({ type: "error", text1: "Update failed" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <ScrollView style={styles.container}>
//         <View style={styles.avatarSection}>
//           <Image source={{ uri: avatar }} style={styles.avatar} />

//           <TouchableOpacity style={styles.changePhotoButton} onPress={pickOrCapture}>
//             <Text style={styles.changePhotoText}>Change Photo</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.formSection}>
//           <Text style={styles.label}>Name</Text>
//           <TextInput style={styles.input} value={name} onChangeText={setName} />

//           <Text style={styles.label}>Phone</Text>
//           <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

//           <Text style={styles.label}>Email</Text>
//           <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />

//           <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
//             <Text style={styles.saveButtonText}>{loading ? "Saving..." : "Save Changes"}</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {loading && (
//         <View style={localStyles.loaderOverlay}>
//           <ActivityIndicator size="large" color="#fff" />
//         </View>
//       )}
//     </View>
//   );
// };

// const localStyles = StyleSheet.create({
//   loaderOverlay: {
//     position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center"
//   }
// });

// export default EditProfileScreen;


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
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { API_BASE } from '../../constants/Constant';

const DATA_EXPIRY = 6 * 60 * 60 * 1000; // 6 hours

const EditProfileScreen: React.FC = () => {

  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();


  const getValidAvatar = (url: string) => {
  if (!url) return 'https://cdn-icons-png.flaticon.com/512/847/847969.png';

  // If it's a local image path, return directly
  if (url.startsWith("file") || url.startsWith("content")) return url;

  // Always convert any full URL -> relative path first
  const cleanPath = url.replace(/^https?:\/\/[^/]+/, "");

  // Then prepend base URL dynamically
  return `${API_BASE}${cleanPath}`;
};


  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(getValidAvatar(user?.avatar || ''));
  const [loading, setLoading] = useState(false);

  // ⚡ Optimized Load — Only fetch when old
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);

        const storedUser = await AsyncStorage.getItem("userInfo");
        const lastFetch = await AsyncStorage.getItem("profile_last_update");

        // Load cached UI quickly
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setName(parsed.name);
          setEmail(parsed.email);
          setPhone(parsed.phone);
          setAvatar(getValidAvatar(parsed.avatar));
        }

        // Skip GET if within expiry
        if (lastFetch && Date.now() - Number(lastFetch) < DATA_EXPIRY) {
          setLoading(false);
          return;
        }

        await fetchUserFromServer();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // 🔥 GET updated user from server (only if needed)
  const fetchUserFromServer = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    const res = await axios.get(`${API_BASE}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const fetchedUser = res.data.data;

    setName(fetchedUser.name);
    setEmail(fetchedUser.email);
    setPhone(fetchedUser.phone);
    setAvatar(getValidAvatar(fetchedUser.avatar));

    dispatch(updateProfile(fetchedUser));

    await AsyncStorage.setItem("userInfo", JSON.stringify(fetchedUser));
    await AsyncStorage.setItem("profile_last_update", Date.now().toString());
  };

  // 🧠 Pick or Capture Image
  const pickOrCapture = () => {
    Alert.alert("Change Profile Photo", "Choose", [
      { text: "Camera", onPress: openCamera },
      { text: "Gallery", onPress: pickImageGallery },
      { text: "Cancel", style: "cancel" }
    ]);
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;

    // const image = await ImagePicker.openCamera({ width: 300, height: 300, cropping: true });
        const image = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        useFrontCamera: true,
      });
    setAvatar(image.path);
  };

  // const pickImageGallery = async () => {
  //   const image = await ImagePicker.openPicker({ width: 300, height: 300, cropping: true });
  //   setAvatar(image.path);
  // };
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
const handleSave = async () => {
  const trimmedName = name.trim();
  const trimmedPhone = phone.trim();
  const trimmedEmail = email.trim();

  // 🚨 FULL VALIDATION
  if (!trimmedName || !trimmedPhone || !trimmedEmail) {
    Toast.show({ type: "error", text1: "All fields are required." });
    return;
  }

  if (trimmedName.length < 3) {
    Toast.show({ type: "error", text1: "Name must be at least 3 characters." });
    return;
  }

  if (!/^[0-9]{10,15}$/.test(trimmedPhone)) {
    Toast.show({ type: "error", text1: "Enter a valid phone number." });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    Toast.show({ type: "error", text1: "Enter a valid email address." });
    return;
  }

  // 🛑 Check if user made ANY changes
  if (
    trimmedName === user?.name &&
    trimmedPhone === user?.phone &&
    trimmedEmail === user?.email &&
    !avatar.startsWith("file") // avatar not changed
  ) {
    Toast.show({ type: "info", text1: "No changes to update." });
    return;
  }

  setLoading(true);

  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Toast.show({ type: "error", text1: "Authentication error. Please login again." });
      return;
    }

    const formData = new FormData();
    formData.append("name", trimmedName);
    formData.append("phone", trimmedPhone);
    formData.append("email", trimmedEmail);

    // Image added only when changed
    if (avatar.startsWith("file")) {
      formData.append("avatar", {
        uri: avatar,
        name: `profile_${Date.now()}.jpg`,
        type: "image/jpeg",
      });
    }

    const res = await axios.put(`${API_BASE}/api/users/profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    

const updatedUser = res.data.data;

// always convert to relative path before saving locally
updatedUser.avatar = updatedUser.avatar.replace(/^https?:\/\/[^/]+/, "");

await AsyncStorage.setItem("userInfo", JSON.stringify(updatedUser));
setAvatar(getValidAvatar(updatedUser.avatar));

    await AsyncStorage.setItem("profile_last_update", Date.now().toString());

    Toast.show({ type: "success", text1: "Profile updated successfully!" });

  } catch (err) {
    Toast.show({ type: "error", text1: "Failed to update. Try again." });
  } finally {
    setLoading(false);
  }
};

  // ---------------- SAVE CHANGES ----------------
  const jhandleSave = async () => {
    if (!name || !phone || !email) {
      return Alert.alert("Error", "All fields required");
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);

      if (avatar.startsWith("file")) {
        formData.append("avatar", {
          uri: avatar,
          name: `profile_${Date.now()}.jpg`,
          type: "image/jpeg"
        });
      }

      const res = await axios.put(`${API_BASE}/api/users/profile`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      const updatedUser = res.data.data;
      updatedUser.avatar = getValidAvatar(updatedUser.avatar);

      dispatch(updateProfile(updatedUser));
      await AsyncStorage.setItem("userInfo", JSON.stringify(updatedUser));
      await AsyncStorage.setItem("profile_last_update", Date.now().toString());

      Toast.show({ type: "success", text1: "Profile updated successfully!" });

    } catch {
      Toast.show({ type: "error", text1: "Update failed" });
    } finally {
      setLoading(false);
    }
  };
const DEFAULT_AVATAR ='https://cdn-icons-png.flaticon.com/512/847/847969.png';
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        
        {/* Avatar */}
        <View style={styles.avatarSection}>
          {/* <Image source={{ uri: avatar }} style={styles.avatar} /> */}
          <Image
  source={{ uri: avatar }}
  style={styles.avatar}
  onError={() => setAvatar(DEFAULT_AVATAR)}
/>

          <TouchableOpacity style={styles.changePhotoButton} onPress={pickOrCapture}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Phone</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />

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
