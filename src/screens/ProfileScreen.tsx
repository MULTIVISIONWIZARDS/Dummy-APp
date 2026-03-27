// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Modal,
//   Alert,
//   ActivityIndicator,
//   Linking
// } from 'react-native';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { logout } from '../store/authSlice';
// import Colors from '../constants/Colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { AuthStackRoutes } from '../navigation/Routes';
// import axios from 'axios';
// import { API_BASE, APIBASEWITH } from '../constants/Constant';

// const DATA_EXPIRY = 6 * 60 * 60 * 1000; // 6 hours

// const ProfileScreen: React.FC<any> = () => {
//   const dispatch = useAppDispatch();
//   const navigation = useNavigation();
//   const user = useAppSelector(s => s.auth.user);

//   const [logoutModalVisible, setLogoutModalVisible] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const [userInfo, setUserInfo] = useState({
//     name: user?.name || 'Loading...',
//     phone: user?.phone || '',
//     avatar: user?.avatar || 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
//   });

//   // ⭐ Function to format avatar properly
//   const formatAvatar = (url: string) => {
//     if (!url) return 'https://cdn-icons-png.flaticon.com/512/847/847969.png';

//     // Local photo
//     if (url.startsWith("file") || url.startsWith("content")) return url;

//     // Remove any old IP/domain → convert to relative
//     const cleanPath = url.replace(/^https?:\/\/[^/]+/, "");

//     // Add correct base URL
//     return `${APIBASEWITH}${cleanPath}`;
//   };

//   // ------------------ LOAD PROFILE ------------------
//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const storedUser = await AsyncStorage.getItem("userInfo");
//         const lastFetch = await AsyncStorage.getItem("lastProfileFetch");

//         if (storedUser) {
//           const parsed = JSON.parse(storedUser);
//           setUserInfo({
//             ...parsed,
//             avatar: formatAvatar(parsed.avatar)
//           });
//         }

//         if (lastFetch && Date.now() - Number(lastFetch) < DATA_EXPIRY) {
//           setLoading(false);
//           return;
//         }

//         await fetchProfileFromServer();
//       } catch (err) {
//         console.log("Profile fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProfile();
//   }, []);

//   // ------------------ API CALL ------------------
//   const fetchProfileFromServer = async () => {
//     const token = await AsyncStorage.getItem("token");
//     if (!token) return;

//     const res = await axios.get(`${API_BASE}/users/profile`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const freshUser = res.data.data;

//     const updated = {
//       ...freshUser,
//       avatar: formatAvatar(freshUser.avatar)
//     };

//     setUserInfo(updated);

//     await AsyncStorage.setItem("userInfo", JSON.stringify(updated));
//     await AsyncStorage.setItem("lastProfileFetch", Date.now().toString());
//   };

//   // ------------------ MANUAL REFRESH ------------------
//   const refreshProfile = async () => {
//     const lastFetch = await AsyncStorage.getItem("lastProfileFetch");

//     setRefreshing(true);

//     if (lastFetch && Date.now() - Number(lastFetch) < DATA_EXPIRY) {
//       setTimeout(() => setRefreshing(false), 1500);
//       return;
//     }

//     try {
//       await fetchProfileFromServer();
//       Alert.alert("Updated 🎉", "Your profile has been refreshed successfully.");
//     } catch (err) {
//       console.log("Refresh Error:", err);
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   // ------------------ LOGOUT ------------------
//   const confirmLogout2 = async () => {
//     await AsyncStorage.clear();
//     dispatch(logout());
//     navigation.reset({
//       index: 0,
//       routes: [{ name: AuthStackRoutes.Login }],
//     });
//   };
// const confirmLogout = async () => {
//   try {
//     const userId = await AsyncStorage.getItem('userId');

//     await AsyncStorage.multiRemove([
//       // 🔑 Auth
//       'authToken',
//       'token', // remove if still used
//       'userId',
//       'userInfo',
//       'isLoggedIn',

//       // 💳 Subscription & payment
//       'subscriptionDetails',
//       `subscription_${userId}`,
//       'last_expanded_tier',
//       'extraFee',
//       'meeting',

//       // 💬 Chat
//       'activeChatId',
//       'user_chat_messages',

//       // 🧠 User activity
//       'journalEntries',
//       'boxBreathingScores',
//       'tapHappyScores',

//       // 📦 Cache
//       'lastProfileFetch',
//     ]);

//     // 🔁 Reset redux
//     dispatch(logout());

//     // 🚀 Reset navigation
//     navigation.reset({
//       index: 0,
//       routes: [{ name: AuthStackRoutes.Login }],
//     });
//   } catch (error) {
//     console.error('Logout failed:', error);
//   }
// };
// const DEFAULT_AVATAR ='https://cdn-icons-png.flaticon.com/512/847/847969.png';
 
//   return (
//     <View style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false} style={styles.headerTitle} contentContainerStyle={{ paddingBottom: 0 }}>

//         {/* Profile Section */}
//         <View style={styles.profileSection}>
//           <View style={styles.avatarContainer}>
//             {/* <Image source={{ uri: userInfo.avatar }} style={styles.avatar} /> */}
//             <Image
//   source={{ uri: userInfo.avatar || DEFAULT_AVATAR }}
//   style={styles.avatar}
//   onError={() =>
//     setUserInfo(prev => ({ ...prev, avatar: DEFAULT_AVATAR }))
//   }
// />
//             <TouchableOpacity
//               style={styles.editAvatarButton}
//               onPress={() => navigation.navigate(AuthStackRoutes.EditProfileScreen)}
//               activeOpacity={0.7}
//             >
//               <Icon name="edit" size={16} color="#FFFFFF" />
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.userName}>{userInfo.name}</Text>

//           {/* Refresh */}
//           <TouchableOpacity onPress={refreshProfile} style={{ marginTop: 10 }} disabled={refreshing}>
//             {refreshing ? (
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <ActivityIndicator size="small" color={Colors.darkBlueP1} style={{ marginRight: 6 }} />
//                 <Text style={{ color: Colors.darkBlueP1 }}>Refreshing...</Text>
//               </View>
//             ) : (
//               <Text style={{ color: Colors.darkBlueP1 }}>Refresh Profile ⟳</Text>
//             )}
//           </TouchableOpacity>
//         </View>

//         {/* Menu */}
//         <View style={styles.menuContainer}>
//           <ProfileMenuItem icon="person-outline" title="Edit Profile" onPress={() => navigation.navigate(AuthStackRoutes.EditProfileScreen)} />
//           <ProfileMenuItem icon="notifications-none" title="Notifications" onPress={() => navigation.navigate(AuthStackRoutes.NotificationsScreen)} />
//           <ProfileMenuItem icon="help-outline" title="Subscription and features" onPress={() => navigation.navigate(AuthStackRoutes.HelpScreen as never)} />
//           <ProfileMenuItem icon="description" title="Terms and Conditions" onPress={() => navigation.navigate(AuthStackRoutes.TermsScreen as never)} />
// <ProfileMenuItem
//   icon="delete-outline"
//   title="Account Deletion Request"
//   onPress={() =>
//     Alert.alert(
//       'Account Deletion Request',
//       'You will be redirected to our website to request account deletion. Do you want to continue?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Continue',
//           onPress: () =>
//             Linking.openURL('https://vintagecms.cloud/account-deletion.html'),
//         },
//       ],
//     )
//   }
// />


//           <ProfileMenuItem icon="logout" title="Log Out" showArrow={false} onPress={() => setLogoutModalVisible(true)} />
//         </View>
//       </ScrollView>

//       {/* Logout Modal */}
//       <Modal transparent visible={logoutModalVisible} animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Log Out</Text>
//             <Text style={styles.modalMessage}>Are you sure you want to log out?</Text>

//             <View style={styles.modalButtons}>
//               <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setLogoutModalVisible(false)}>
//                 <Text style={styles.cancelText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={[styles.modalButton, styles.logoutButton]} onPress={confirmLogout}>
//                 <Text style={styles.logoutText}>Yes, Logout</Text>
//               </TouchableOpacity>
//             </View>

//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const ProfileMenuItem = ({ icon, title, onPress, showArrow = true }: any) => (
//   <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.4}>
//     <View style={styles.menuItemLeft}>
//       <View className={styles.iconContainer}>
//         <Icon name={icon} size={24} color={Colors.darkBlueP1 || '#2E3A59'} />
//       </View>
//       <Text style={styles.menuItemText}>{title}</Text>
//     </View>
//     {showArrow && <Icon name="chevron-right" size={24} color="#C7C7CC" />}
//   </TouchableOpacity>
// );

// // ------------------ STYLES ------------------
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#FFFFFF' },
//   headerTitle: { marginTop: 25 },
//   profileSection: { alignItems: 'center', marginBottom:0 },
//   avatarContainer: {
//     position: 'relative', marginBottom: 20, borderWidth:2,
//     borderColor:Colors.darkBlueP1, borderRadius:80, padding:2
//   },
//   avatar: { width: 120, height: 120, borderRadius: 100 },
//   editAvatarButton: {
//     position: 'absolute', bottom: 5, right: 5, width: 32, height: 32, borderRadius: 16,
//     backgroundColor: '#2E3A59', justifyContent: 'center', alignItems: 'center',
//     borderWidth: 3, borderColor: '#FFFFFF',
//   },
//   userName: { fontSize: 24, fontWeight: '600', color: '#1C1C1E', marginBottom: 8 },
//   menuContainer: { paddingHorizontal: 20 },
//   menuItem: {
//     flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//     paddingVertical: 16, borderBottomWidth: 0.5, borderBottomColor: '#E5E5EA',
//   },
//   menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
//   iconContainer: { marginRight: 16 },
//   menuItemText: { fontSize: 17 },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
//   modalContent: {
//     backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30,
//     padding: 24,
//   },
//   modalTitle: { fontSize: 20, textAlign: 'center', fontWeight: '700' },
//   modalMessage: { textAlign: 'center', marginBottom: 25 },
//   modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
//   modalButton: { flex: 1, padding: 12, borderRadius: 30, marginHorizontal: 8 },
//   cancelButton: { backgroundColor: '#F2F2F7' },
//   logoutButton: { backgroundColor: Colors.bg_black },
//   cancelText: { textAlign: 'center' },
//   logoutText: { textAlign: 'center', color: '#FFF' },
// });

// export default ProfileScreen;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
  Linking
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/authSlice';
import Colors from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthStackRoutes } from '../navigation/Routes';
import axios from 'axios';
import { API_BASE, IMAGE_BASE } from '../constants/Constant';

const DATA_EXPIRY = 6 * 60 * 60 * 1000; // 6 hours

const ProfileScreen: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const user = useAppSelector(s => s.auth.user);

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: user?.name || 'Loading...',
    phone: user?.phone || '',
    avatar: user?.avatar || 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
  });

  const getValidAvatar = (url) => {
    
    
    if (!url) {
 
      return 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
    }
    
    if (url.startsWith("file") || url.startsWith("content")) {
    
      return url;
    }
    
    if (url.startsWith("http")) {
      // console.log('🔍 Profile - Full URL detected:', url);
      return url;
    }
    
    if (!url.includes('/')) {
      const finalUrl = `${IMAGE_BASE}/uploads/${url}`;
      // console.log('🔍 Profile - Constructed URL from filename:', finalUrl);
      return finalUrl;
    }
    
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    const finalUrl = `${IMAGE_BASE}${cleanPath}`;
    // console.log('🔍 Profile - Constructed URL from path:', finalUrl);
    
    return finalUrl;
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // console.log('📥 Profile - Loading from storage...');
        const storedUser = await AsyncStorage.getItem("userInfo");
        const lastFetch = await AsyncStorage.getItem("lastProfileFetch");

        // console.log('💾 Profile - Stored user:', storedUser);
        // console.log('⏰ Profile - Last fetch:', lastFetch);

        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          // console.log('📦 Profile - Parsed stored user:', parsed);
          // console.log('📦 Profile - Stored avatar:', parsed.avatar);
          
          const avatarUrl = getValidAvatar(parsed.avatar);
          // console.log('🖼️ Profile - Setting avatar from storage to:', avatarUrl);
          
          setUserInfo({
            ...parsed,
            avatar: avatarUrl
          });
        }

        if (lastFetch && Date.now() - Number(lastFetch) < DATA_EXPIRY) {
          // console.log('✅ Profile - Using cached data, skipping server fetch');
          setLoading(false);
          return;
        }

        console.log('🔄 Profile - Fetching fresh data from server...');
        await fetchProfileFromServer();
      } catch (err) {
        console.log("❌ Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const fetchProfileFromServer = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    try {
      console.log('🌐 Profile - Making API call to:', `${API_BASE}/users/profile`);
      
      const res = await axios.get(`${API_BASE}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log('✅ Profile - Server response status:', res.status);
      // console.log('✅ Profile - Server response data:', JSON.stringify(res.data, null, 2));
      
      const freshUser = res.data.data;
      console.log('👤 Profile - Fetched user:', freshUser);
      console.log('🖼️ Profile - Fetched avatar raw value:', freshUser.avatar);

      const avatarUrl = getValidAvatar(freshUser.avatar);
      console.log('🖼️ Profile - Final avatar URL being set:', avatarUrl);

      const updated = {
        ...freshUser,
        avatar: avatarUrl
      };

      setUserInfo(updated);

      await AsyncStorage.setItem("userInfo", JSON.stringify(updated));
      await AsyncStorage.setItem("lastProfileFetch", Date.now().toString());
      console.log('💾 Profile - Saved to storage');
    } catch (error) {
      console.error('❌ Profile - Error fetching from server:', error);
      if (error.response) {
        console.error('❌ Profile - Error response:', error.response.data);
        console.error('❌ Profile - Error status:', error.response.status);
      }
    }
  };

  const refreshProfile = async () => {
    const lastFetch = await AsyncStorage.getItem("lastProfileFetch");

    setRefreshing(true);
    console.log('🔄 Profile - Manual refresh started');

    if (lastFetch && Date.now() - Number(lastFetch) < DATA_EXPIRY) {
      console.log('✅ Profile - Using cached data for refresh');
      setTimeout(() => setRefreshing(false), 1500);
      return;
    }

    try {
      await fetchProfileFromServer();
      Alert.alert("Updated 🎉", "Your profile has been refreshed successfully.");
    } catch (err) {
      console.log("❌ Refresh Error:", err);
    } finally {
      setRefreshing(false);
    }
  };

  const confirmLogout = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');

      await AsyncStorage.multiRemove([
        'authToken',
        'token',
        'userId',
        'userInfo',
        'isLoggedIn',
        'subscriptionDetails',
        `subscription_${userId}`,
        'last_expanded_tier',
        'extraFee',
        'meeting',
        'activeChatId',
        'user_chat_messages',
        'journalEntries',
        'boxBreathingScores',
        'tapHappyScores',
        'lastProfileFetch',
      ]);

      dispatch(logout());

      navigation.reset({
        index: 0,
        routes: [{ name: AuthStackRoutes.Login }],
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  const DEFAULT_AVATAR = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
 
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.headerTitle} contentContainerStyle={{ paddingBottom: 0 }}>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: userInfo.avatar || DEFAULT_AVATAR }}
              style={styles.avatar}
              onError={(e) => {
                console.log('❌ Profile - Image failed to load - URL attempted:', userInfo.avatar);
                console.log('❌ Profile - Error details:', e.nativeEvent.error);
                console.log('❌ Profile - Falling back to default avatar');
                setUserInfo(prev => ({ ...prev, avatar: DEFAULT_AVATAR }));
              }}
              onLoad={() => console.log('✅ Profile - Image loaded successfully:', userInfo.avatar)}
            />
            <TouchableOpacity
              style={styles.editAvatarButton}
              onPress={() => navigation.navigate(AuthStackRoutes.EditProfileScreen)}
              activeOpacity={0.7}
            >
              <Icon name="edit" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{userInfo.name}</Text>

          {/* Refresh */}
          <TouchableOpacity onPress={refreshProfile} style={{ marginTop: 10 }} disabled={refreshing}>
            {refreshing ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator size="small" color={Colors.darkBlueP1} style={{ marginRight: 6 }} />
                <Text style={{ color: Colors.darkBlueP1 }}>Refreshing...</Text>
              </View>
            ) : (
              <Text style={{ color: Colors.darkBlueP1 }}>Refresh Profile ⟳</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Menu */}
        <View style={styles.menuContainer}>
          <ProfileMenuItem icon="person-outline" title="Edit Profile" onPress={() => navigation.navigate(AuthStackRoutes.EditProfileScreen)} />
          <ProfileMenuItem icon="notifications-none" title="Notifications" onPress={() => navigation.navigate(AuthStackRoutes.NotificationsScreen)} />
          <ProfileMenuItem icon="help-outline" title="Subscription and features" onPress={() => navigation.navigate(AuthStackRoutes.HelpScreen as never)} />
          <ProfileMenuItem icon="description" title="Terms and Conditions" onPress={() => navigation.navigate(AuthStackRoutes.TermsScreen as never)} />
          <ProfileMenuItem
            icon="delete-outline"
            title="Account Deletion Request"
            onPress={() =>
              Alert.alert(
                'Account Deletion Request',
                'You will be redirected to our website to request account deletion. Do you want to continue?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Continue',
                    onPress: () =>
                      Linking.openURL('https://vintagecms.cloud/account-deletion.html'),
                  },
                ],
              )
            }
          />
          <ProfileMenuItem icon="logout" title="Log Out" showArrow={false} onPress={() => setLogoutModalVisible(true)} />
        </View>
      </ScrollView>

      {/* Logout Modal */}
      <Modal transparent visible={logoutModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Log Out</Text>
            <Text style={styles.modalMessage}>Are you sure you want to log out?</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.logoutButton]} onPress={confirmLogout}>
                <Text style={styles.logoutText}>Yes, Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ProfileMenuItem = ({ icon, title, onPress, showArrow = true }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.4}>
    <View style={styles.menuItemLeft}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={24} color={Colors.darkBlueP1 || '#2E3A59'} />
      </View>
      <Text style={styles.menuItemText}>{title}</Text>
    </View>
    {showArrow && <Icon name="chevron-right" size={24} color="#C7C7CC" />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerTitle: { marginTop: 25 },
  profileSection: { alignItems: 'center', marginBottom:0 },
  avatarContainer: {
    position: 'relative', marginBottom: 20, borderWidth:2,
    borderColor:Colors.darkBlueP1, borderRadius:80, padding:2
  },
  avatar: { width: 120, height: 120, borderRadius: 100 },
  editAvatarButton: {
    position: 'absolute', bottom: 5, right: 5, width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#2E3A59', justifyContent: 'center', alignItems: 'center',
    borderWidth: 3, borderColor: '#FFFFFF',
  },
  userName: { fontSize: 24, fontWeight: '600', color: '#1C1C1E', marginBottom: 8 },
  menuContainer: { paddingHorizontal: 20 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 16, borderBottomWidth: 0.5, borderBottomColor: '#E5E5EA',
  },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: { marginRight: 16 },
  menuItemText: { fontSize: 17 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30,
    padding: 24,
  },
  modalTitle: { fontSize: 20, textAlign: 'center', fontWeight: '700' },
  modalMessage: { textAlign: 'center', marginBottom: 25 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  modalButton: { flex: 1, padding: 12, borderRadius: 30, marginHorizontal: 8 },
  cancelButton: { backgroundColor: '#F2F2F7' },
  logoutButton: { backgroundColor: Colors.bg_black },
  cancelText: { textAlign: 'center' },
  logoutText: { textAlign: 'center', color: '#FFF' },
});

export default ProfileScreen;