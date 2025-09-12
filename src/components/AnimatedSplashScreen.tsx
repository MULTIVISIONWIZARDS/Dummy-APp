import React, {useEffect, useRef, useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  Easing,
  Image,
} from 'react-native';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');

const AnimatedSplashScreen = ({onFinish}) => {
  // All animation refs declared at top level
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(50)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleScale = useRef(new Animated.Value(0.8)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.8)).current;
  const backgroundGradient = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Particle animation refs - all declared at top level
  const particle1X = useRef(new Animated.Value(Math.random() * width)).current;
  const particle1Y = useRef(new Animated.Value(Math.random() * height)).current;
  const particle1Opacity = useRef(new Animated.Value(0)).current;
  const particle1Scale = useRef(new Animated.Value(0)).current;
  
  const particle2X = useRef(new Animated.Value(Math.random() * width)).current;
  const particle2Y = useRef(new Animated.Value(Math.random() * height)).current;
  const particle2Opacity = useRef(new Animated.Value(0)).current;
  const particle2Scale = useRef(new Animated.Value(0)).current;
  
  const particle3X = useRef(new Animated.Value(Math.random() * width)).current;
  const particle3Y = useRef(new Animated.Value(Math.random() * height)).current;
  const particle3Opacity = useRef(new Animated.Value(0)).current;
  const particle3Scale = useRef(new Animated.Value(0)).current;
  
  const particle4X = useRef(new Animated.Value(Math.random() * width)).current;
  const particle4Y = useRef(new Animated.Value(Math.random() * height)).current;
  const particle4Opacity = useRef(new Animated.Value(0)).current;
  const particle4Scale = useRef(new Animated.Value(0)).current;
  
  const particle5X = useRef(new Animated.Value(Math.random() * width)).current;
  const particle5Y = useRef(new Animated.Value(Math.random() * height)).current;
  const particle5Opacity = useRef(new Animated.Value(0)).current;
  const particle5Scale = useRef(new Animated.Value(0)).current;
  
  const particle6X = useRef(new Animated.Value(Math.random() * width)).current;
  const particle6Y = useRef(new Animated.Value(Math.random() * height)).current;
  const particle6Opacity = useRef(new Animated.Value(0)).current;
  const particle6Scale = useRef(new Animated.Value(0)).current;
  
  const particle7X = useRef(new Animated.Value(Math.random() * width)).current;
  const particle7Y = useRef(new Animated.Value(Math.random() * height)).current;
  const particle7Opacity = useRef(new Animated.Value(0)).current;
  const particle7Scale = useRef(new Animated.Value(0)).current;
  
  const particle8X = useRef(new Animated.Value(Math.random() * width)).current;
  const particle8Y = useRef(new Animated.Value(Math.random() * height)).current;
  const particle8Opacity = useRef(new Animated.Value(0)).current;
  const particle8Scale = useRef(new Animated.Value(0)).current;

  const [currentStep, setCurrentStep] = useState(0);

  // Create particles array using useMemo to avoid recreating on each render
  const particles = useMemo(() => [
    {id: 1, x: particle1X, y: particle1Y, opacity: particle1Opacity, scale: particle1Scale},
    {id: 2, x: particle2X, y: particle2Y, opacity: particle2Opacity, scale: particle2Scale},
    {id: 3, x: particle3X, y: particle3Y, opacity: particle3Opacity, scale: particle3Scale},
    {id: 4, x: particle4X, y: particle4Y, opacity: particle4Opacity, scale: particle4Scale},
    {id: 5, x: particle5X, y: particle5Y, opacity: particle5Opacity, scale: particle5Scale},
    {id: 6, x: particle6X, y: particle6Y, opacity: particle6Opacity, scale: particle6Scale},
    {id: 7, x: particle7X, y: particle7Y, opacity: particle7Opacity, scale: particle7Scale},
    {id: 8, x: particle8X, y: particle8Y, opacity: particle8Opacity, scale: particle8Scale},
  ], []);

  useEffect(() => {
    startAnimation();
  }, []);

  const createPulseAnimation = () => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
  };

  const animateParticles = () => {
    const particleAnimations = particles.map((particle, index) => {
      const initialY = particle.y._value;
      return Animated.loop(
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.parallel([
            Animated.timing(particle.opacity, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(particle.scale, {
              toValue: 1,
              duration: 800,
              easing: Easing.out(Easing.back(1.5)),
              useNativeDriver: true,
            }),
            Animated.timing(particle.y, {
              toValue: initialY - 100,
              duration: 3000,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(particle.opacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(particle.scale, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
        ])
      );
    });
    
    Animated.parallel(particleAnimations).start();
  };

  const startAnimation = () => {
    // Background gradient animation
    Animated.timing(backgroundGradient, {
      toValue: 1,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();

    // Start pulse animation
    createPulseAnimation().start();

    // Step 1: Logo entrance
    setTimeout(() => {
      setCurrentStep(1);
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);

    // Step 2: Title entrance
    setTimeout(() => {
      setCurrentStep(2);
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(titleTranslateY, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1500);

    // Step 3: Subtitle entrance
    setTimeout(() => {
      setCurrentStep(3);
      Animated.parallel([
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(subtitleScale, {
          toValue: 1,
          tension: 80,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2300);

    // Step 4: Button entrance and particles
    setTimeout(() => {
      setCurrentStep(4);
      Animated.parallel([
        Animated.spring(buttonOpacity, {
          toValue: 1,
          tension: 60,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.spring(buttonScale, {
          toValue: 1,
          tension: 80,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();
      
      animateParticles();
    }, 3000);
  };

  const handleGetStarted = () => {
    // Exit animation
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(titleOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish && onFinish();
    });
  };

  const logoRotateInterpolation = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const backgroundColorInterpolation = backgroundGradient.interpolate({
    inputRange: [0, 1],
    outputRange: ['#667eea', '#764ba2'],
  });

  return (
    <>
      {/* <StatusBar barStyle="light-content" backgroundColor="#667eea" /> */}
      <Animated.View 
        style={[
          styles.container,
          {backgroundColor: backgroundColorInterpolation}
        ]}
      >
        {/* Animated Background Circles */}
        <View style={styles.backgroundShapes}>
          <Animated.View 
            style={[
              styles.backgroundCircle,
              styles.circle1,
              {transform: [{scale: pulseAnim}]}
            ]} 
          />
          <Animated.View 
            style={[
              styles.backgroundCircle,
              styles.circle2,
              {transform: [{scale: pulseAnim}]}
            ]} 
          />
        </View>

        {/* Particles */}
        {particles.map((particle) => (
          <Animated.View
            key={particle.id}
            style={[
              styles.particle,
              {
                left: particle.x._value,
                transform: [
                  {translateY: particle.y},
                  {scale: particle.scale},
                ],
                opacity: particle.opacity,
              },
            ]}
          />
        ))}

        {/* Main Content */}
        <View style={styles.content}>
          {/* Logo */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                transform: [
                  {scale: logoScale},
                  {rotate: logoRotateInterpolation},
                  {scale: pulseAnim},
                ],
              },
            ]}
          >
            <View style={styles.logo}>
              <View style={styles.logoInner}>
                {/* <Text style={styles.logoText}>📅</Text> */}
                <Image style={{height:50,width:50,borderRadius:40}} source={{uri:"https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg?uid=R210148761&ga=GA1.1.641802148.1754460082&semt=ais_hybrid&w=740&q=80"}}/>
              </View>
            </View>
          </Animated.View>

          {/* Title */}
          <Animated.View
            style={[
              styles.titleContainer,
              {
                opacity: titleOpacity,
                transform: [{translateY: titleTranslateY}],
              },
            ]}
          >
            <Text style={styles.title}>Vintage</Text>
          </Animated.View>

          {/* Subtitle */}
          <Animated.View
            style={[
              styles.subtitleContainer,
              {
                opacity: subtitleOpacity,
                transform: [{scale: subtitleScale}],
              },
            ]}
          >
            <Text style={styles.subtitle}>
              Schedule appointments effortlessly{'\n'}
              Your time, your choice
            </Text>
          </Animated.View>

          {/* Get Started Button */}
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: buttonOpacity,
                transform: [{scale: buttonScale}],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <View style={styles.buttonIcon}>
                {/* <Text style={styles.buttonArrow}>→</Text> */}
{/* <Icon name="chevron-forward" size={19} color="white" /> */}
<Icon name="arrow-forward" size={20} color="white" />

              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Loading indicator */}
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBar}>
            <Animated.View 
              style={[
                styles.loadingProgress,
                {
                  width: currentStep >= 4 ? '100%' : `${(currentStep / 4) * 100}%`
                }
              ]} 
            />
          </View>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundCircle: {
    position: 'absolute',
    borderRadius: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  circle1: {
    width: 300,
    height: 300,
    top: -150,
    right: -150,
  },
  circle2: {
    width: 200,
    height: 200,
    bottom: -100,
    left: -100,
  },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: '#ffffff',
    borderRadius: 3,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logoInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'System',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  subtitleContainer: {
    marginBottom: 60,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '300',
  },
  buttonContainer: {
    width: '100%',
  },
  getStartedButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#667eea',
    marginRight: 10,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonArrow: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 60,
    left: 40,
    right: 40,
  },
  loadingBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
});

export default AnimatedSplashScreen;