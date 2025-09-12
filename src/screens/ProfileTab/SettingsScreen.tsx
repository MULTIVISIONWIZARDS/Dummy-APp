import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../ProfileTab/StyleSheet'
const SettingsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.settingGroup}>
        <Text style={styles.groupTitle}>Account</Text>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingText}>Change Password</Text>
          <Icon name="chevron-right" size={24} color="#C7C7CC" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingText}>Privacy Settings</Text>
          <Icon name="chevron-right" size={24} color="#C7C7CC" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.settingGroup}>
        <Text style={styles.groupTitle}>App</Text>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingText}>Language</Text>
          <Text style={styles.settingValue}>English</Text>
          <Icon name="chevron-right" size={24} color="#C7C7CC" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingText}>Dark Mode</Text>
          <Text style={styles.settingValue}>Off</Text>
          <Icon name="chevron-right" size={24} color="#C7C7CC" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default SettingsScreen;