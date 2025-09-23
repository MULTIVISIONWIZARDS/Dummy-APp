import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Animated,
  Dimensions,
  StatusBar
} from 'react-native';

const { width } = Dimensions.get('window');

export default function NoInternetScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [pulseAnim] = useState(new Animated.Value(1));
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    // Initial fade and scale animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation for the image
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

 
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f0f9ff" barStyle="dark-content" />
      
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        {/* Animated Image */}
        <Animated.View style={[styles.imageContainer, { transform: [{ scale: pulseAnim }] }]}>
          <Image 
            source={require('../assets/nowifi.png')} 
            style={styles.image} 
          />
        </Animated.View>

        {/* Title with gradient-like effect */}
        <Text style={styles.title}>You're Offline</Text>
        
        {/* Enhanced subtitle */}
        <Text style={styles.subtitle}>
          Oops! It looks like you've lost your internet connection. 
          Please check your Wi-Fi or mobile data and try again.
        </Text>

        {/* Connection tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Quick fixes:</Text>
          <Text style={styles.tipItem}>• Check your Wi-Fi connection</Text>
          <Text style={styles.tipItem}>• Toggle airplane mode on/off</Text>
          <Text style={styles.tipItem}>• Restart your router</Text>
        </View>


        {/* Status indicator */}
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, styles.statusOffline]} />
          <Text style={styles.statusText}>No Internet Connection</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1f2937',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 16,
    maxWidth: width * 0.8,
  },
  tipsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    width: '100%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  tipItem: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
    minWidth: 140,
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  retryButtonDisabled: {
    backgroundColor: '#9ca3af',
    shadowOpacity: 0.1,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusOffline: {
    backgroundColor: '#ef4444',
  },
  statusText: {
    fontSize: 14,
    color: '#dc2626',
    fontWeight: '500',
  },
});