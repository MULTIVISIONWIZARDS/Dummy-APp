import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE } from '../../constants/Constant';
import { AuthStackRoutes } from '../../navigation/Routes';
import { useNavigation } from '@react-navigation/native';

const PROFILE_IMAGE =
  'https://vintagehealthbody.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-12-at-08.56.17_5fe3d2f7.jpg';

const SettingsScreen: React.FC = ({hasSubscription}) => {
  const navigation=useNavigation();
  return (
  <ScrollView
      contentContainerStyle={styles.emptyContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* HERO */}
      <View style={styles.heroSection}>
        <Image source={{ uri: PROFILE_IMAGE }} style={styles.heroAvatar} />
  
        <Text style={styles.heroName}>Jennifer Mooneyham</Text>
        <Text style={styles.heroRole}>Family Nurse Practitioner (FNP-BC)</Text>
  
        <View style={styles.pillRow}>
          <View style={styles.pill}>
            <Icon name="message-outline" size={14} color="#2563EB" />
            <Text style={styles.pillText}>Secure Messaging</Text>
          </View>
  
          <View style={styles.pill}>
            <Icon name="calendar-check" size={14} color="#2563EB" />
            <Text style={styles.pillText}>Consult Updates</Text>
          </View>
        </View>
      </View>
  
  {/* ABOUT CLINICIAN */}
  <View style={styles.aboutCard}>
    <Text style={styles.aboutTitle}>Who You’ll Be Talking To</Text>
  
  
    <Text style={styles.aboutText}>
      Jennifer Mooneyham is a board-certified Family Nurse Practitioner (FNP-BC)
      with experience across internal medicine, pediatrics, and surgical care.
    </Text>
  
    <Text style={styles.aboutText}>
      She served 15 years in the United States Armed Forces, including emergency
      medicine, deployment operations, and critical care air transport.
    </Text>
  
    <Text style={styles.aboutText}>
      Founder of 4 The Family Healthcare, Jennifer specializes in men’s health,
      menopause, and hormone optimization—care refined through years of
      hands-on clinical practice.
    </Text>
    {/* SUBSCRIPTION CTA */}
  {!hasSubscription &&<TouchableOpacity
    activeOpacity={0.9}
    style={styles.subscribeButton}
    onPress={() => navigation.navigate(AuthStackRoutes.Subscription)}
  >
    <Icon name="lock-open-variant" size={20} color="#fff" />
    <Text style={styles.subscribeText}>Unlock Care & Subscribe</Text>
  </TouchableOpacity>}
  
  <Text style={styles.subscribeHint}>
    Secure access  • HIPAA compliant
  </Text>
  
  </View>
  
    </ScrollView>
  );
};
export default SettingsScreen;
const styles = StyleSheet.create({
   emptyContainer: {
    padding: 24,
    paddingBottom: 40,
    // backgroundColor: '#0080ff',
  },
  /* ABOUT */
aboutCard: {
  backgroundColor: '#ffffff',
  borderRadius: 20,
  padding: 20,
  marginBottom: 24,

  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 14,
  elevation: 3,
},

aboutTitle: {
  fontSize: 17,
  fontWeight: '700',
  color: '#0f172a',
  marginBottom: 10,
},

aboutText: {
  fontSize: 14.5,
  color: '#475569',
  lineHeight: 22,
  marginBottom: 8,
},

/* SUBSCRIBE CTA */
subscribeButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  backgroundColor: '#111827',
  borderRadius: 16,
  paddingVertical: 16,
  marginBottom: 8,
},

subscribeText: {
  marginLeft: 8,
  fontSize: 16,
  fontWeight: '600',
  color: '#ffffff',
},

subscribeHint: {
  textAlign: 'center',
  fontSize: 12,
  color: '#6b7280',
  marginBottom: 30,
},


  /* HERO */
  heroSection: {
    alignItems: 'center',
    marginBottom: 28,
  },

  heroAvatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 14,
  },

  heroName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },

  heroRole: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },

  pillRow: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 10,
  },

  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },

  pillText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '500',
  },

  /* INFO GLASS */
  infoGlass: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },

  infoTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 6,
  },

  infoText: {
    fontSize: 14.5,
    color: '#475569',
    lineHeight: 22,
  },

  /* STORE */
  storeGlass: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },

  storeTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 14,
  },

  storeRow: {
    flexDirection: 'row',
    gap: 5,
  },

  storeBadge: {flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 14,
  },

  storeBadgeText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
  },
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  loading: { textAlign: 'center', marginTop: 40, color: '#6b7280' },

  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },

  textContainer: { marginLeft: 12, flex: 1 },
  title: { fontSize: 15, fontWeight: '600', color: '#111' },
  body: { fontSize: 14, color: '#555', marginVertical: 4 },
  time: { fontSize: 12, color: '#888' },

  /* EMPTY */
 
  heroCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },

  heroImage: { width: 150, height: 150, borderRadius: 75, marginBottom: 12 },
 
  badgeRow: { flexDirection: 'row', gap: 10 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: { marginLeft: 6, fontSize: 12, color: '#4f46e5' },

  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    elevation: 3,
  },
  
  storeCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    elevation: 3,
  },
  
  storeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  storeText: { marginLeft: 8, fontSize: 13 },
});