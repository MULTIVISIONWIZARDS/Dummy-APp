
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   Alert,

// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import styless from '../Game/styles'

// const BoxBreathingGame = ({ navigation }) => {
//   const [phase, setPhase] = useState('ready'); // ready, inhale, hold1, exhale, hold2
//   const [cycles, setCycles] = useState(0);
//   const [isActive, setIsActive] = useState(false);
//   const [timer, setTimer] = useState(4);
  
//   const scaleAnim = useRef(new Animated.Value(0.5)).current;
//   const colorAnim = useRef(new Animated.Value(0)).current;
  
//   const phases = {
//     inhale: { text: 'Inhale', color: '#4CAF50', duration: 4000 },
//     hold1: { text: 'Hold', color: '#2196F3', duration: 4000 },
//     exhale: { text: 'Exhale', color: '#FF9800', duration: 4000 },
//     hold2: { text: 'Hold', color: '#9C27B0', duration: 4000 }
//   };

//   // Set navigation options
//   useEffect(() => {
//     navigation.setOptions({
//       title: '🫁 Box Breathing',
//       headerStyle: {
//         backgroundColor: '#4CAF50',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     });
//   }, [navigation]);

//   useEffect(() => {
//     let interval;
//     if (isActive && phase !== 'ready') {
//       interval = setInterval(() => {
//         setTimer(prev => {
//           if (prev <= 1) {
//             nextPhase();
//             return 4;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [isActive, phase]);

//   const nextPhase = () => {
//     const phaseOrder = ['inhale', 'hold1', 'exhale', 'hold2'];
//     const currentIndex = phaseOrder.indexOf(phase);
//     const nextIndex = (currentIndex + 1) % phaseOrder.length;
    
//     if (nextIndex === 0) {
//       setCycles(prev => prev + 1);
//     }
    
//     setPhase(phaseOrder[nextIndex]);
//     animateCircle(phaseOrder[nextIndex]);
//   };

//   const animateCircle = (currentPhase) => {
//     const targetScale = currentPhase === 'inhale' ? 1.5 : currentPhase === 'exhale' ? 0.5 : 1;
    
//     Animated.parallel([
//       Animated.timing(scaleAnim, {
//         toValue: targetScale,
//         duration: phases[currentPhase].duration,
//         useNativeDriver: true,
//       }),
//       Animated.timing(colorAnim, {
//         toValue: Math.random(),
//         duration: phases[currentPhase].duration,
//         useNativeDriver: false,
//       }),
//     ]).start();
//   };

//   const saveScore = async (score) => {
//     try {
//       const existingScores = await AsyncStorage.getItem('boxBreathingScores');
//       const scores = existingScores ? JSON.parse(existingScores) : [];
//       scores.push(score);
//       await AsyncStorage.setItem('boxBreathingScores', JSON.stringify(scores));
//     } catch (error) {
//       console.log('Error saving score:', error);
//     }
//   };

//   const startBreathing = () => {
//     setIsActive(true);
//     setPhase('inhale');
//     setCycles(0);
//     setTimer(4);
//     animateCircle('inhale');
//   };

//   const stopBreathing = async () => {
//     setIsActive(false);
//     setPhase('ready');
//     setTimer(4);
//     scaleAnim.setValue(0.5);
    
//     if (cycles > 0) {
//       const newScore = { cycles, date: new Date().toLocaleDateString() };
//       await saveScore(newScore);
//       Alert.alert('Great Job! 🎉', `You completed ${cycles} breathing cycles!`);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.gameContainer}>
//      <View style={styless.gameHeader}>
//             <TouchableOpacity
//                            onPress={() => navigation?.goBack?.()}
//                            style={styless.backButton}
//                             activeOpacity={0.5}
//                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                          >
//                            <Icon name="arrow-left" size={24} color="#fff" />
//                          </TouchableOpacity>
//              <Text style={styless.gameTitle}>🫁 Box Breathing</Text>
//            </View>
//       <View style={styles.breathingContainer}>
//         <Text style={styles.breathingInstructions}>
//           {phase === 'ready' ? 'Tap Start to begin your breathing exercise' : 
//            `${phases[phase]?.text} for ${timer} seconds`}
//         </Text>

//         <View style={styles.breathingCircleContainer}>
//           <Animated.View
//             style={[
//               styles.breathingCircle,
//               {
//                 transform: [{ scale: scaleAnim }],
//                 backgroundColor: phase !== 'ready' ? phases[phase]?.color : '#4CAF50'
//               }
//             ]}
//           >
//             <Text style={styles.breathingText}>
//               {phase === 'ready' ? 'Ready' : phases[phase]?.text}
//             </Text>
//           </Animated.View>
//         </View>

//         <Text style={styles.cycleCounter}>Cycles: {cycles}</Text>

//         <View style={styles.breathingControls}>
//           {!isActive ? (
//             <TouchableOpacity activeOpacity={0.7} style={styles.startButton} onPress={startBreathing}>
//               <Text style={styles.startButtonText}>Start Breathing</Text>
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity  activeOpacity={0.7} style={styles.stopButton} onPress={stopBreathing}>
//               <Text style={styles.stopButtonText}>Stop</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   gameContainer: {
//     flex: 1,
//     backgroundColor: '#E8F5E8',
//   },
//   iconBtn: { padding: 8, borderRadius: 20 },
//   breathingContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   breathingInstructions: {
//     fontSize: 18,
//     color: '#2E7D32',
//     textAlign: 'center',
//     marginBottom: 40,
//     fontWeight: '500',
//   },
//   breathingCircleContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 40,
//   },
//   breathingCircle: {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 10,
//   },
//   breathingText: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   cycleCounter: {
//     fontSize: 20,
//     color: '#2E7D32',
//     fontWeight: 'bold',
//     marginBottom: 30,
//   },
//   breathingControls: {
//     alignItems: 'center',
//   },
//   startButton: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 25,
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//   },
//   startButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   stopButton: {
//     backgroundColor: '#f44336',
//     borderRadius: 25,
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//   },
//   stopButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default BoxBreathingGame;


import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const BREATHING_TECHNIQUES = [
  {
    id: 1,
    name: 'Deep Relaxation',
    subtitle: '4-7-8 Technique',
    description: 'Inhale for 4 seconds, hold for 7, exhale for 8. Naturally calms your nervous system.',
    benefits: ['Reduces anxiety', 'Promotes better sleep', 'Calms the mind'],
    color: '#4f46e5',
    icon: '🌙',
  },
  {
    id: 2,
    name: 'Focused Breathing',
    subtitle: 'Box Breathing',
    description: 'Equal 4-second intervals for inhale, hold, exhale, and pause. Creates mental clarity.',
    benefits: ['Improves concentration', 'Reduces stress', 'Builds focus'],
    color: '#059669',
    icon: '🧘‍♀️',
  },
  {
    id: 3,
    name: 'Belly Breathing',
    subtitle: 'Diaphragmatic Breath',
    description: 'Slow, deep breathing from your diaphragm. 6 seconds in, 6 seconds out.',
    benefits: ['Activates relaxation response', 'Lowers blood pressure', 'Improves oxygen flow'],
    color: '#dc2626',
    icon: '❤️',
  },
  {
    id: 4,
    name: 'Equal Breathing',
    subtitle: 'Balanced Technique',
    description: 'Simple and effective. Inhale and exhale for equal counts of 5 seconds.',
    benefits: ['Balances nervous system', 'Easy for beginners', 'Reduces tension'],
    color: '#7c3aed',
    icon: '⚖️',
  },
];

export default function BreathingGuideScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mindful Breathing</Text>
        <Text style={styles.subtitle}>
          Take a moment to center yourself with these calming breathing techniques
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {BREATHING_TECHNIQUES.map((technique) => (
          <View key={technique.id} style={styles.techniqueCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.icon}>{technique.icon}</Text>
              <View style={{ marginLeft: 16 }}>
                <Text style={styles.techniqueName}>{technique.name}</Text>
                <Text style={styles.techniqueSubtitle}>{technique.subtitle}</Text>
              </View>
            </View>
            <Text style={styles.description}>{technique.description}</Text>
            <View style={styles.benefitsContainer}>
              <Text style={styles.benefitsTitle}>Benefits:</Text>
              {technique.benefits.map((b, i) => (
                <Text key={i} style={styles.benefit}>• {b}</Text>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { paddingTop: 20, paddingHorizontal: 24, paddingBottom: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  title: { fontSize: 28, fontWeight: '700', color: '#1e293b', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#64748b', lineHeight: 22 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
  techniqueCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  icon: { fontSize: 28 },
  techniqueName: { fontSize: 18, fontWeight: '600', color: '#1e293b', marginBottom: 2 },
  techniqueSubtitle: { fontSize: 14, color: '#64748b' },
  description: { fontSize: 15, color: '#475569', marginBottom: 12 },
  benefitsContainer: { backgroundColor: '#f1f5f9', borderRadius: 12, padding: 12, marginTop: 8 },
  benefitsTitle: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4 },
  benefit: { fontSize: 14, color: '#64748b', lineHeight: 18 },
});
