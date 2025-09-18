// import React, { useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, Animated } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import styles from '../Game/styles';
// import { useNavigation } from '@react-navigation/native';

// const HomeGame = ({navigation}) => {
   
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.8)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.spring(scaleAnim, {
//         toValue: 1,
//         tension: 50,
//         friction: 7,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <Animated.View style={[styles.homeContent, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
//         <Text style={styles.title}>🌿 Wellness Arcade 🌿</Text>
//         <Text style={styles.subtitle}>Your pocket-friendly wellness playground!</Text>

//         <View style={styles.gameButtons}>
//           <TouchableOpacity
//             style={[styles.gameButton, styles.breathingButton]}
//             onPress={() =>navigation.navigate('breathing')}
//           >
//             <Text style={styles.gameButtonEmoji}>🫁</Text>
//             <Text style={styles.gameButtonText}>Box Breathing</Text>
//             <Text style={styles.gameButtonDesc}>Relax & Focus</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.gameButton, styles.tapButton]}
//             onPress={() => navigation.navigate('tapHappy')}
            
            
//           >
//             <Text style={styles.gameButtonEmoji}>😃</Text>
//             <Text style={styles.gameButtonText}>Tap Happy Faces</Text>
//             <Text style={styles.gameButtonDesc}>Focus & Fun</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity
//           style={styles.scoresButton}
//           onPress={() => navigation.navigate('scores')}
          
//         >
//           <Text style={styles.scoresButtonText}>📊 View Scores</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </SafeAreaView>
//   );
// };

// export default HomeGame;

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeGame = () => {
  const navigation=useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.homeContent, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.title}>🌿 Wellness Arcade 🌿</Text>
        <Text style={styles.subtitle}>Your pocket-friendly wellness playground!</Text>
        
        <View style={styles.gameButtons}>
          <TouchableOpacity
            style={[styles.gameButton, styles.breathingButton]}
            onPress={() => navigation.navigate('breathing')}
          >
            <Text style={styles.gameButtonEmoji}>🫁</Text>
            <Text style={styles.gameButtonText}>Box Breathing</Text>
            <Text style={styles.gameButtonDesc}>Relax & Focus</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.gameButton, styles.tapButton]}
            onPress={() => navigation.navigate('tapHappy')}
          >
            <Text style={styles.gameButtonEmoji}>😃</Text>
            <Text style={styles.gameButtonText}>Tap Happy Faces</Text>
            <Text style={styles.gameButtonDesc}>Focus & Fun</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.scoresButton}
          onPress={() => navigation.navigate('scores')}
        >
          <Text style={styles.scoresButtonText}>📊 View Scores</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E8',
  },
  homeContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 40,
    fontStyle: 'italic',
  },
  gameButtons: {
    width: '100%',
    marginBottom: 30,
  },
  gameButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  breathingButton: {
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  tapButton: {
    borderLeftWidth: 5,
    borderLeftColor: '#FF9800',
  },
  gameButtonEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  gameButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
  gameButtonDesc: {
    fontSize: 14,
    color: '#666',
  },
  scoresButton: {
    backgroundColor: '#2196F3',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  scoresButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeGame;