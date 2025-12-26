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
  ActivityIndicator
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/authSlice';
import Colors from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthStackRoutes } from '../navigation/Routes';
import axios from 'axios';
import { API_BASE } from '../constants/Constant';

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

  // ⭐ Function to format avatar properly
  const formatAvatar = (url: string) => {
    if (!url) return 'https://cdn-icons-png.flaticon.com/512/847/847969.png';

    // Local photo
    if (url.startsWith("file") || url.startsWith("content")) return url;

    // Remove any old IP/domain → convert to relative
    const cleanPath = url.replace(/^https?:\/\/[^/]+/, "");

    // Add correct base URL
    return `${API_BASE}${cleanPath}`;
  };

  // ------------------ LOAD PROFILE ------------------
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("userInfo");
        const lastFetch = await AsyncStorage.getItem("lastProfileFetch");

        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUserInfo({
            ...parsed,
            avatar: formatAvatar(parsed.avatar)
          });
        }

        if (lastFetch && Date.now() - Number(lastFetch) < DATA_EXPIRY) {
          setLoading(false);
          return;
        }

        await fetchProfileFromServer();
      } catch (err) {
        console.log("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // ------------------ API CALL ------------------
  const fetchProfileFromServer = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    const res = await axios.get(`${API_BASE}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const freshUser = res.data.data;

    const updated = {
      ...freshUser,
      avatar: formatAvatar(freshUser.avatar)
    };

    setUserInfo(updated);

    await AsyncStorage.setItem("userInfo", JSON.stringify(updated));
    await AsyncStorage.setItem("lastProfileFetch", Date.now().toString());
  };

  // ------------------ MANUAL REFRESH ------------------
  const refreshProfile = async () => {
    const lastFetch = await AsyncStorage.getItem("lastProfileFetch");

    setRefreshing(true);

    if (lastFetch && Date.now() - Number(lastFetch) < DATA_EXPIRY) {
      setTimeout(() => setRefreshing(false), 1500);
      return;
    }

    try {
      await fetchProfileFromServer();
      Alert.alert("Updated 🎉", "Your profile has been refreshed successfully.");
    } catch (err) {
      console.log("Refresh Error:", err);
    } finally {
      setRefreshing(false);
    }
  };

  // ------------------ LOGOUT ------------------
  const confirmLogout2 = async () => {
    await AsyncStorage.clear();
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: AuthStackRoutes.Login }],
    });
  };
const confirmLogout = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');

    await AsyncStorage.multiRemove([
      // 🔑 Auth
      'authToken',
      'token', // remove if still used
      'userId',
      'userInfo',
      'isLoggedIn',

      // 💳 Subscription & payment
      'subscriptionDetails',
      `subscription_${userId}`,
      'last_expanded_tier',
      'extraFee',
      'meeting',

      // 💬 Chat
      'activeChatId',
      'user_chat_messages',

      // 🧠 User activity
      'journalEntries',
      'boxBreathingScores',
      'tapHappyScores',

      // 📦 Cache
      'lastProfileFetch',
    ]);

    // 🔁 Reset redux
    dispatch(logout());

    // 🚀 Reset navigation
    navigation.reset({
      index: 0,
      routes: [{ name: AuthStackRoutes.Login }],
    });
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.headerTitle}>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
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
      <View className={styles.iconContainer}>
        <Icon name={icon} size={24} color={Colors.darkBlueP1 || '#2E3A59'} />
      </View>
      <Text style={styles.menuItemText}>{title}</Text>
    </View>
    {showArrow && <Icon name="chevron-right" size={24} color="#C7C7CC" />}
  </TouchableOpacity>
);

// ------------------ STYLES ------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerTitle: { marginTop: 25 },
  profileSection: { alignItems: 'center', marginBottom: 40 },
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
