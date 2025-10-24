import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
interface FooterProps {
  brand?: string;
  developer?: string;
  primaryColor?: string;
  accentColor?: string;
  onLinkPress?: (url: string) => void;
}

const Footer: React.FC<FooterProps> = ({
  brand = 'Vintage',
  developer = 'Cipher Mantra',
  primaryColor = '#667eea',
  accentColor = '#764ba2',
  onLinkPress,
}) => {
  const year = new Date().getFullYear();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;
  const decorAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideUpAnim, {
        toValue: 0,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(decorAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for end indicator
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleLinkPress = async (url: string) => {
    try {
      if (onLinkPress) {
        onLinkPress(url);
      } else {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        }
      }
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  const links = [
    { label: 'Terms of Service', url: 'https://multivisionwizards.com/terms', icon: '📋' },
    { label: 'Privacy Policy', url: 'https://multivisionwizards.com/privacy', icon: '🔒' },
    { label: 'Contact Us', url: 'https://multivisionwizards.com/contact-us.php', icon: '💬' },
  ];

  const socialLindks = [
    { label: 'Twitter', icon: 'twitter' },
    { label: 'Facebook', icon: 'facebook' },
    { label: 'Instagram', icon: 'instagram' },
    { label: 'LinkedIn', icon: 'linkdin' },
  ];
const socialLinks = [
  { label: 'Twitter', icon: 'logo-twitter', url: 'https://twitter.com/yourprofile' },
  { label: 'Facebook', icon: 'logo-facebook', url: 'https://facebook.com/yourprofile' },
  { label: 'Instagram', icon: 'logo-instagram', url: 'https://instagram.com/yourprofile' },
  { label: 'LinkedIn', icon: 'logo-linkedin', url: 'https://linkedin.com/in/yourprofile' },
];
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideUpAnim }],
        },
      ]}
    >
      {/* Gradient Background Overlay */}
      <View style={[styles.gradientOverlay, { 
        backgroundColor: primaryColor,
        opacity: 0.03,
      }]} />

      {/* Decorative Top Wave */}
      {/* <Animated.View 
        style={[
          styles.waveContainer,
          { opacity: decorAnim }
        ]}
      >
        <View style={[styles.wave, styles.wave1, { backgroundColor: primaryColor }]} />
        <View style={[styles.wave, styles.wave2, { backgroundColor: accentColor }]} />
      </Animated.View> */}

      {/* End of Content Indicator - Very Prominent */}
      <Animated.View 
        style={[
          styles.endOfContentContainer,
          { transform: [{ scale: pulseAnim }] }
        ]}
      >
        <View style={styles.endLineGroup}>
          <View style={[styles.endLine, styles.endLineLeft]} />
          <View style={styles.endIconContainer}>
            <Text style={styles.endIcon}>✦</Text>
          </View>
          <View style={[styles.endLine, styles.endLineRight]} />
        </View>
        <Text style={styles.endText}>You've reached the end</Text>
      </Animated.View>

      {/* Main Footer Content */}
      <View style={styles.mainContent}>
        {/* Brand Section with Logo Placeholder */}
        <View style={styles.brandSection}>
          {/* <View style={[styles.logoPlaceholder, { 
            borderColor: primaryColor,
          }]}>
          
            <Image source={require('../assets/applogo.jpg')}  style={{height:30,width:30,borderRadius:30,resizeMode:"contain"}}/>
          </View> */}
          <Text style={styles.brandName}>{brand}</Text>
          <Text style={styles.tagline}>Excellence in Every Detail</Text>
        </View>

        {/* Social Media Section */}
        <View style={styles.socialSection}>
          <Text style={styles.sectionTitle}>Connect With Us</Text>
          <View style={styles.socialContainer}>
            {socialLinks.map((social) => (
      <TouchableOpacity
        key={social.label}
        style={styles.socialButton}
        activeOpacity={0.7}
        //onPress={() => Linking.openURL(social.url)}
        accessibilityLabel={`Visit our ${social.label}`}
      >
        <Icon
          name={social.icon}
          size={22}
          color="#007AFF"
          style={styles.socialIcon}
        />
      </TouchableOpacity>
    ))}
          </View>
        </View>

        {/* Divider with Decorative Elements */}
        <View style={styles.decorativeDivider}>
          <View style={styles.dividerLine} />
          <View style={[styles.dividerDot, { backgroundColor: primaryColor }]} />
          <View style={styles.dividerLine} />
        </View>

        {/* Copyright and Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.copyrightRow}>
            <Text style={styles.copyrightIcon}>©</Text>
            <Text style={styles.copyrightText}>
              {year} {brand}. All Rights Reserved.
            </Text>
          </View>
          
          <View style={styles.locationRow}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>
              Serving Customers Worldwide
            </Text>
          </View>

          <View style={styles.secureRow}>
            <Text style={styles.secureIcon}>🔐</Text>
            <Text style={styles.secureText}>
              Secure & Trusted Platform
            </Text>
          </View>
        </View>

        {/* Developer Credit with Special Design */}
        <View style={styles.developerSection}>
          <View style={styles.developerCard}>
            <View style={styles.developerHeader}>
              {/* <Text style={styles.craftedText}>Crafted with</Text> */}
              {/* <Text style={styles.heartIcon}>❤️</Text> */}
              <Text style={styles.craftedText}>Developed by</Text>
            </View>
            <Text style={[styles.developerName, { color: primaryColor }]}>
              {developer}
            </Text>
            <View style={styles.developerBadge}>
              <Text style={styles.badgeText}>⭐ Premium Development Partner</Text>
            </View>
          </View>
        </View>

        {/* Version and Tech Info */}
        <View style={styles.techInfoSection}>
          <View style={styles.techBadge}>
            <Text style={styles.techText}>v1.0.0</Text>
          </View>
          <Text style={styles.buildText}>Build 2024.10.01</Text>
          <Text style={styles.platformText}>
            {Platform.OS === 'ios' ? '🍎 iOS' : '🤖 Android'} Optimized
          </Text>
        </View>

        {/* Final Bottom Accent */}
        <View style={styles.bottomAccentContainer}>
          <View style={[styles.accentLine, { backgroundColor: primaryColor }]} />
          <View style={[styles.accentLine, { backgroundColor: accentColor }]} />
          <View style={[styles.accentLine, { backgroundColor: primaryColor }]} />
        </View>

        {/* Thank You Message */}
        <Text style={styles.thankYouText}>
          Thank you for using {brand} ✨
        </Text>
      </View>
    </Animated.View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingTop: 0,
    paddingBottom: 32,
    position: 'relative',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  waveContainer: {
    height: 80,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
  },
  wave: {
    position: 'absolute',
    width: width * 2,
    height: 80,
    borderRadius: width,
    opacity: 0.1,
  },
  wave1: {
    left: -width / 2,
    top: 20,
  },
  wave2: {
    left: -width / 3,
    top: 30,
  },
  endOfContentContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 32,
  },
  endLineGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 12,
  },
  endLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#e0e0e0',
  },
  endLineLeft: {
    marginRight: 16,
  },
  endLineRight: {
    marginLeft: 16,
  },
  endIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  endIcon: {
    fontSize: 16,
    color: '#666',
  },
  endText: {
    fontSize: 13,
    color: '#888',
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  mainContent: {
    paddingHorizontal: 24,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoPlaceholder: {
    width: 35,
    height: 35,
    borderRadius: 32,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
  },
  logoText: {
    fontSize: 32,
    fontWeight: '800',
  },
  brandName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  linksSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  linksGrid: {
    gap: 12,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  linkIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  linkText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  linkArrow: {
    fontSize: 16,
    color: '#999',
  },
  socialSection: {
    marginBottom: 32,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  socialIcon: {
    fontSize: 20,
  },
  decorativeDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e8e8e8',
  },
  dividerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 16,
  },
  infoSection: {
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  copyrightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  copyrightIcon: {
    fontSize: 16,
    color: '#666',
  },
  copyrightText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationIcon: {
    fontSize: 14,
  },
  locationText: {
    fontSize: 12,
    color: '#888',
  },
  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  secureIcon: {
    fontSize: 14,
  },
  secureText: {
    fontSize: 12,
    color: '#888',
  },
  developerSection: {
    marginBottom: 24,
  },
  developerCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  developerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  craftedText: {
    fontSize: 12,
    color: '#666',
  },
  heartIcon: {
    fontSize: 14,
  },
  developerName: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  developerBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  badgeText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
  },
  techInfoSection: {
    alignItems: 'center',
    marginBottom: 20,
    gap: 6,
  },
  techBadge: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  techText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  buildText: {
    fontSize: 10,
    color: '#999',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  platformText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
  },
  bottomAccentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  accentLine: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  thankYouText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    fontWeight: '600',
    fontStyle: 'italic',
  },
});

export default Footer;