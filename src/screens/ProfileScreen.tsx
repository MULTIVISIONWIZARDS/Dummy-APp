import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/authSlice';
import Colors from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';

const ProfileScreen: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const user = useAppSelector(s => s.auth.user);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: user?.name || 'Daniel Martinez',
    phone: user?.phone || '+123 856479683',
    avatar:
      user?.avatar ||
      'https://cdn-icons-png.flaticon.com/512/847/847969.png',
  });

  // Load avatar from AsyncStorage on mount
  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const storedInfo = await AsyncStorage.getItem('userInfo');
        if (storedInfo) {
          setUserInfo(JSON.parse(storedInfo));
        }
      } catch (err) {
        console.log('Error loading user info:', err);
      }
    };
    loadAvatar();
  }, []);

  // Save updated avatar or user info to AsyncStorage
  const saveUserInfo = async (newInfo: any) => {
    try {
      setUserInfo(newInfo);
      await AsyncStorage.setItem('userInfo', JSON.stringify(newInfo));
    } catch (err) {
      console.log('Error saving user info:', err);
    }
  };

  // Pick image from gallery
  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.7,
      },
      response => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Failed to pick image');
        } else {
          const uri = response.assets[0].uri;
          const updatedInfo = { ...userInfo, avatar: uri };
          saveUserInfo(updatedInfo);
        }
      },
    );
  };

  const confirmLogout = async () => {
    try {
      await AsyncStorage.clear();
      dispatch(logout());
      setLogoutModalVisible(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleEditProfile = () => navigation.navigate('EditProfileScreen');
  const handleNotifications = () => navigation.navigate('NotificationsScreen');
  const handleHelp = () => navigation.navigate('HelpScreen' as never);
  const handleTerms = () => navigation.navigate('TermsScreen' as never);

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Profile</Text>

        {/* Profile Info Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
            <TouchableOpacity
              style={styles.editAvatarButton}
              onPress={pickImage}
              activeOpacity={0.8}
            >
              <Icon name="edit" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.userPhone}>{userInfo.phone}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <ProfileMenuItem
            icon="person-outline"
            title="Edit Profile"
            onPress={handleEditProfile}
          />
          <ProfileMenuItem
            icon="notifications-none"
            title="Notifications"
            onPress={handleNotifications}
          />
          <ProfileMenuItem
            icon="help-outline"
            title="Help and Support"
            onPress={handleHelp}
          />
          <ProfileMenuItem
            icon="description"
            title="Terms and Conditions"
            onPress={handleTerms}
          />
          <ProfileMenuItem
            icon="logout"
            title="Log Out"
            onPress={() => setLogoutModalVisible(true)}
            showArrow={false}
          />
        </View>
      </ScrollView>

      {/* Logout Modal */}
      <Modal
        transparent
        visible={logoutModalVisible}
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Log Out</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setLogoutModalVisible(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.logoutButton]}
                onPress={confirmLogout}
                activeOpacity={0.8}
              >
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
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 30,
    color: '#1C1C1E',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  avatarContainer: { position: 'relative', marginBottom: 20 },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 100,
    backgroundColor: '#F2F2F7',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2E3A59',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  userPhone: { fontSize: 16, color: '#8E8E93', fontWeight: '400' },
  menuContainer: { paddingHorizontal: 20 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconContainer: { marginRight: 16, width: 24, alignItems: 'center' },
  menuItemText: { fontSize: 17, color: '#1C1C1E', fontWeight: '400' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1C1C1E',
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 30,
    marginHorizontal: 8,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: { backgroundColor: '#F2F2F7' },
  logoutButton: { backgroundColor: Colors.bg_black },
  cancelText: { fontSize: 16, fontWeight: '600', color: '#333' },
  logoutText: { fontSize: 16, fontWeight: '600', color: '#FFF' },
});

export default ProfileScreen;
