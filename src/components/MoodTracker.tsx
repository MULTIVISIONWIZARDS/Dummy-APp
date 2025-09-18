// // // WellnessArcade.js
// // import React, { useState, useRef, useEffect } from "react";
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Animated,
// // } from "react-native";

// // const WellnessArcade = ({ onComplete }) => {
// //   const [stage, setStage] = useState(-1); // -1 = guide, 0 = breathing, 1 = tap, 2 = affirmations
// //   const [score, setScore] = useState(0);
// //   const fadeAnim = useRef(new Animated.Value(0)).current;

// //   useEffect(() => {
// //     Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
// //   }, [stage]);

// //   /* ---------------- Guide Screen ---------------- */
// //   const GuideScreen = () => (
// //     <View style={styles.center}>
// //       <Text style={styles.title}>🧘 Wellness Arcade</Text>
// //       <Text style={styles.text}>
// //         You’ll play 3 quick wellness games:
// //         {"\n"}1️⃣ Box Breathing (relax){"\n"}2️⃣ Tap happy faces{"\n"}3️⃣ Positive affirmations
// //       </Text>
// //       <Text style={[styles.text, { marginTop: 10 }]}>
// //         Box Breathing: Inhale 4s → Hold 4s → Exhale 4s → Hold 4s
// //       </Text>
// //       <TouchableOpacity style={styles.btn} onPress={() => setStage(0)}>
// //         <Text style={styles.btnText}>Start 🌟</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );

// //   /* ---------------- Game 1: Box Breathing ---------------- */
// //   const BreathingBar = () => {
// //     const widthAnim = useRef(new Animated.Value(80)).current;
// //     const [phase, setPhase] = useState("Get Ready");

// //     useEffect(() => {
// //       const boxBreath = () => {
// //         // Inhale (expand bar 4s)
// //         setPhase("🌬 Inhale");
// //         Animated.timing(widthAnim, { toValue: 250, duration: 4000, useNativeDriver: false }).start(() => {
// //           // Hold (4s)
// //           setPhase("✋ Hold");
// //           setTimeout(() => {
// //             // Exhale (shrink bar 4s)
// //             setPhase("😮‍💨 Exhale");
// //             Animated.timing(widthAnim, { toValue: 80, duration: 4000, useNativeDriver: false }).start(() => {
// //               // Hold (4s)
// //               setPhase("✋ Hold");
// //               setTimeout(() => boxBreath(), 4000);
// //             });
// //           }, 4000);
// //         });
// //       };

// //       boxBreath();
// //       const timer = setTimeout(() => setStage(1), 20000); // ~1 full cycle (20s)
// //       return () => clearTimeout(timer);
// //     }, []);

// //     return (
// //       <View style={styles.center}>
// //         <Text style={styles.text}>{phase}</Text>
// //         <View style={styles.breathContainer}>
// //           <Animated.View style={[styles.breathFill, { width: widthAnim }]} />
// //         </View>
// //       </View>
// //     );
// //   };

// //   /* ---------------- Game 2: Tap Happy Faces ---------------- */
// //   const TapGame = () => {
// //     const emojis = ["😃", "😢", "🙂", "😃", "☹️", "😐", "😃"];
// //     return (
// //       <View style={styles.center}>
// //         <Text style={styles.text}>🎯 Tap only the 😃 faces!</Text>
// //         <View style={styles.row}>
// //           {emojis.map((e, i) => (
// //             <TouchableOpacity
// //               key={i}
// //               onPress={() => e === "😃" && setScore((s) => s + 1)}
// //               style={styles.moodBtn}
// //             >
// //               <Text style={styles.mood}>{e}</Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>
// //         <Text style={styles.text}>Score: {score}</Text>
// //         <TouchableOpacity style={styles.btn} onPress={() => setStage(2)}>
// //           <Text style={styles.btnText}>Next ➡️</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   };

// //   /* ---------------- Game 3: Positive Affirmations ---------------- */
// //   const PositiveTap = () => {
// //     const affirmations = ["You’re strong 💪", "You’re loved ❤️", "Keep going 🚀"];
// //     return (
// //       <View style={styles.center}>
// //         <Text style={styles.text}>✨ Tap to reveal positivity</Text>
// //         {affirmations.map((a, i) => (
// //           <TouchableOpacity key={i} style={[styles.btn, { marginTop: 10 }]}>
// //             <Text style={styles.btnText}>{a}</Text>
// //           </TouchableOpacity>
// //         ))}
// //         <TouchableOpacity style={[styles.btn, { backgroundColor: "#4CAF50" }]} onPress={onComplete}>
// //           <Text style={styles.btnText}>Finish ✅</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   };

// //   return (
// //     <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
// //       {stage === -1 && <GuideScreen />}
// //       {stage === 0 && <BreathingBar />}
// //       {stage === 1 && <TapGame />}
// //       {stage === 2 && <PositiveTap />}
// //     </Animated.View>
// //   );
// // };

// // export default WellnessArcade;

// // /* ---------------- Styles ---------------- */
// // const styles = StyleSheet.create({
// //   container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
// //   center: { alignItems: "center", justifyContent: "center" },
// //   title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
// //   text: { fontSize: 18, marginVertical: 10, textAlign: "center" },
// //   row: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
// //   moodBtn: { margin: 5, padding: 10 },
// //   mood: { fontSize: 35 },
// //   btn: { backgroundColor: "#2196F3", padding: 12, borderRadius: 8, marginTop: 20, minWidth: 120 },
// //   btnText: { color: "#fff", fontSize: 16, textAlign: "center" },
// //   breathContainer: { width: 280, height: 30, backgroundColor: "#eee", borderRadius: 15, marginTop: 20, overflow: "hidden" },
// //   breathFill: { height: 30, backgroundColor: "#4CAF50", borderRadius: 15 },
// // });


// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   Animated,
//   StatusBar,
//   Alert,
//   ScrollView,

// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const { width, height } = Dimensions.get('window');

// const WellnessArcade = () => {
//   const [currentScreen, setCurrentScreen] = useState('home');
//   const [gameScores, setGameScores] = useState({
//     boxBreathing: [],
//     tapHappy: []
//   });

//   // Home Screen Component
//   const HomeScreen = () => {
//     const fadeAnim = useRef(new Animated.Value(0)).current;
//     const scaleAnim = useRef(new Animated.Value(0.8)).current;

//     useEffect(() => {
//       Animated.parallel([
//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//         Animated.spring(scaleAnim, {
//           toValue: 1,
//           tension: 50,
//           friction: 7,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     }, []);

//     return (
//       <SafeAreaView style={styles.container}>
//         <Animated.View style={[styles.homeContent, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
//           <Text style={styles.title}>🌿 Wellness Arcade 🌿</Text>
//           <Text style={styles.subtitle}>Your pocket-friendly wellness playground!</Text>
          
//           <View style={styles.gameButtons}>
//             <TouchableOpacity
//               style={[styles.gameButton, styles.breathingButton]}
//               onPress={() => setCurrentScreen('breathing')}
//             >
//               <Text style={styles.gameButtonEmoji}>🫁</Text>
//               <Text style={styles.gameButtonText}>Box Breathing</Text>
//               <Text style={styles.gameButtonDesc}>Relax & Focus</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.gameButton, styles.tapButton]}
//               onPress={() => setCurrentScreen('tapHappy')}
//             >
//               <Text style={styles.gameButtonEmoji}>😃</Text>
//               <Text style={styles.gameButtonText}>Tap Happy Faces</Text>
//               <Text style={styles.gameButtonDesc}>Focus & Fun</Text>
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity
//             style={styles.scoresButton}
//             onPress={() => setCurrentScreen('scores')}
//           >
//             <Text style={styles.scoresButtonText}>📊 View Scores</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       </SafeAreaView>
//     );
//   };

//   // Box Breathing Game Component
//   const BoxBreathingGame = () => {
//     const [phase, setPhase] = useState('ready'); // ready, inhale, hold1, exhale, hold2
//     const [cycles, setCycles] = useState(0);
//     const [isActive, setIsActive] = useState(false);
//     const [timer, setTimer] = useState(4);
    
//     const scaleAnim = useRef(new Animated.Value(0.5)).current;
//     const colorAnim = useRef(new Animated.Value(0)).current;
    
//     const phases = {
//       inhale: { text: 'Inhale', color: '#4CAF50', duration: 4000 },
//       hold1: { text: 'Hold', color: '#2196F3', duration: 4000 },
//       exhale: { text: 'Exhale', color: '#FF9800', duration: 4000 },
//       hold2: { text: 'Hold', color: '#9C27B0', duration: 4000 }
//     };

//     useEffect(() => {
//       let interval;
//       if (isActive && phase !== 'ready') {
//         interval = setInterval(() => {
//           setTimer(prev => {
//             if (prev <= 1) {
//               nextPhase();
//               return 4;
//             }
//             return prev - 1;
//           });
//         }, 1000);
//       }
//       return () => clearInterval(interval);
//     }, [isActive, phase]);

//     const nextPhase = () => {
//       const phaseOrder = ['inhale', 'hold1', 'exhale', 'hold2'];
//       const currentIndex = phaseOrder.indexOf(phase);
//       const nextIndex = (currentIndex + 1) % phaseOrder.length;
      
//       if (nextIndex === 0) {
//         setCycles(prev => prev + 1);
//       }
      
//       setPhase(phaseOrder[nextIndex]);
//       animateCircle(phaseOrder[nextIndex]);
//     };

//     const animateCircle = (currentPhase) => {
//       const targetScale = currentPhase === 'inhale' ? 1.5 : currentPhase === 'exhale' ? 0.5 : 1;
      
//       Animated.parallel([
//         Animated.timing(scaleAnim, {
//           toValue: targetScale,
//           duration: phases[currentPhase].duration,
//           useNativeDriver: true,
//         }),
//         Animated.timing(colorAnim, {
//           toValue: Math.random(),
//           duration: phases[currentPhase].duration,
//           useNativeDriver: false,
//         }),
//       ]).start();
//     };

//     const startBreathing = () => {
//       setIsActive(true);
//       setPhase('inhale');
//       setCycles(0);
//       setTimer(4);
//       animateCircle('inhale');
//     };

//     const stopBreathing = () => {
//       setIsActive(false);
//       setPhase('ready');
//       setTimer(4);
//       scaleAnim.setValue(0.5);
      
//       if (cycles > 0) {
//         const newScore = { cycles, date: new Date().toLocaleDateString() };
//         setGameScores(prev => ({
//           ...prev,
//           boxBreathing: [...prev.boxBreathing, newScore]
//         }));
//         Alert.alert('Great Job! 🎉', `You completed ${cycles} breathing cycles!`);
//       }
//     };

//     const backgroundColor = colorAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: [phase !== 'ready' ? phases[phase]?.color || '#4CAF50' : '#4CAF50', '#E3F2FD']
//     });

//     return (
//       <SafeAreaView style={styles.gameContainer}>
//         <View style={styles.gameHeader}>
//           <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.backButton}>
//             <Text style={styles.backButtonText}>← Back</Text>
//           </TouchableOpacity>
//           <Text style={styles.gameTitle}>🫁 Box Breathing</Text>
//         </View>

//         <View style={styles.breathingContainer}>
//           <Text style={styles.breathingInstructions}>
//             {phase === 'ready' ? 'Tap Start to begin your breathing exercise' : 
//              `${phases[phase]?.text} for ${timer} seconds`}
//           </Text>

//           <View style={styles.breathingCircleContainer}>
//             <Animated.View
//               style={[
//                 styles.breathingCircle,
//                 {
//                   transform: [{ scale: scaleAnim }],
//                   backgroundColor: phase !== 'ready' ? phases[phase]?.color : '#4CAF50'
//                 }
//               ]}
//             >
//               <Text style={styles.breathingText}>
//                 {phase === 'ready' ? 'Ready' : phases[phase]?.text}
//               </Text>
//             </Animated.View>
//           </View>

//           <Text style={styles.cycleCounter}>Cycles: {cycles}</Text>

//           <View style={styles.breathingControls}>
//             {!isActive ? (
//               <TouchableOpacity style={styles.startButton} onPress={startBreathing}>
//                 <Text style={styles.startButtonText}>Start Breathing</Text>
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity style={styles.stopButton} onPress={stopBreathing}>
//                 <Text style={styles.stopButtonText}>Stop</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//       </SafeAreaView>
//     );
//   };

//   // Tap Happy Faces Game Component
//   const TapHappyGame = () => {
//     const [score, setScore] = useState(0);
//     const [timeLeft, setTimeLeft] = useState(30);
//     const [isActive, setIsActive] = useState(false);
//     const [faces, setFaces] = useState([]);
//     const [gameOver, setGameOver] = useState(false);

//     const faceTypes = [
//       { emoji: '😃', isHappy: true, points: 10 },
//       { emoji: '😊', isHappy: true, points: 10 },
//       { emoji: '🥰', isHappy: true, points: 15 },
//       { emoji: '😄', isHappy: true, points: 10 },
//       { emoji: '😁', isHappy: true, points: 10 },
//       { emoji: '😢', isHappy: false, points: -5 },
//       { emoji: '😠', isHappy: false, points: -5 },
//       { emoji: '😵', isHappy: false, points: -5 },
//       { emoji: '🤢', isHappy: false, points: -5 },
//     ];

//     useEffect(() => {
//       let interval;
//       if (isActive && timeLeft > 0) {
//         interval = setInterval(() => {
//           setTimeLeft(prev => {
//             if (prev <= 1) {
//               endGame();
//               return 0;
//             }
//             return prev - 1;
//           });
//         }, 1000);
//       }
//       return () => clearInterval(interval);
//     }, [isActive, timeLeft]);

//     useEffect(() => {
//       let faceInterval;
//       if (isActive) {
//         faceInterval = setInterval(() => {
//           addRandomFace();
//         }, 800);
//       }
//       return () => clearInterval(faceInterval);
//     }, [isActive]);

//     useEffect(() => {
//       const cleanupInterval = setInterval(() => {
//         setFaces(prev => prev.filter(face => Date.now() - face.created < 3000));
//       }, 100);
      
//       return () => clearInterval(cleanupInterval);
//     }, []);

//     const addRandomFace = () => {
//       const faceType = faceTypes[Math.floor(Math.random() * faceTypes.length)];
//       const newFace = {
//         id: Date.now() + Math.random(),
//         ...faceType,
//         x: Math.random() * (width - 80),
//         y: Math.random() * (height * 0.5) + 150,
//         created: Date.now(),
//       };
//       setFaces(prev => [...prev, newFace]);
//     };

//     const tapFace = (face) => {
//       setFaces(prev => prev.filter(f => f.id !== face.id));
//       setScore(prev => Math.max(0, prev + face.points));
      
//       // Add tap animation effect here if needed
//     };

//     const startGame = () => {
//       setIsActive(true);
//       setScore(0);
//       setTimeLeft(30);
//       setGameOver(false);
//       setFaces([]);
//     };

//     const endGame = () => {
//       setIsActive(false);
//       setGameOver(true);
//       setFaces([]);
      
//       const newScore = { score, date: new Date().toLocaleDateString() };
//       setGameScores(prev => ({
//         ...prev,
//         tapHappy: [...prev.tapHappy, newScore]
//       }));
//     };

//     return (
//       <SafeAreaView style={styles.gameContainer}>
//         <View style={styles.gameHeader}>
//           <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.backButton}>
//             <Text style={styles.backButtonText}>← Back</Text>
//           </TouchableOpacity>
//           <Text style={styles.gameTitle}>😃 Tap Happy Faces</Text>
//         </View>

//         <View style={styles.tapGameStats}>
//           <Text style={styles.statText}>Score: {score}</Text>
//           <Text style={styles.statText}>Time: {timeLeft}s</Text>
//         </View>

//         <View style={styles.gameArea}>
//           {faces.map(face => (
//             <TouchableOpacity
//               key={face.id}
//               style={[styles.face, { left: face.x, top: face.y }]}
//               onPress={() => tapFace(face)}
//             >
//               <Text style={styles.faceEmoji}>{face.emoji}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <View style={styles.gameControls}>
//           {!isActive && !gameOver && (
//             <TouchableOpacity style={styles.startButton} onPress={startGame}>
//               <Text style={styles.startButtonText}>Start Game</Text>
//             </TouchableOpacity>
//           )}
          
//           {gameOver && (
//             <View style={styles.gameOverContainer}>
//               <Text style={styles.gameOverText}>Game Over! 🎉</Text>
//               <Text style={styles.finalScoreText}>Final Score: {score}</Text>
//               <TouchableOpacity style={styles.playAgainButton} onPress={startGame}>
//                 <Text style={styles.playAgainButtonText}>Play Again</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         {!isActive && !gameOver && (
//           <View style={styles.instructions}>
//             <Text style={styles.instructionText}>
//               Tap only the HAPPY faces 😃 to score points!{'\n'}
//               Avoid sad faces 😢 or lose points.{'\n'}
//               You have 30 seconds - Good luck! 🌟
//             </Text>
//           </View>
//         )}
//       </SafeAreaView>
//     );
//   };

//   // Scores Screen Component
//   const ScoresScreen = () => {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.gameHeader}>
//           <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.backButton}>
//             <Text style={styles.backButtonText}>← Back</Text>
//           </TouchableOpacity>
//           <Text style={styles.gameTitle}>📊 Your Scores</Text>
//         </View>

//         <ScrollView style={styles.scoresContainer}>
//           <View style={styles.scoreSection}>
//             <Text style={styles.scoreSectionTitle}>🫁 Box Breathing Sessions</Text>
//             {gameScores.boxBreathing.length === 0 ? (
//               <Text style={styles.noScoresText}>No sessions yet. Start breathing! 🌿</Text>
//             ) : (
//               gameScores.boxBreathing.map((session, index) => (
//                 <View key={index} style={styles.scoreItem}>
//                   <Text style={styles.scoreItemText}>
//                     {session.cycles} cycles completed
//                   </Text>
//                   <Text style={styles.scoreItemDate}>{session.date}</Text>
//                 </View>
//               ))
//             )}
//           </View>

//           <View style={styles.scoreSection}>
//             <Text style={styles.scoreSectionTitle}>😃 Tap Happy Faces High Scores</Text>
//             {gameScores.tapHappy.length === 0 ? (
//               <Text style={styles.noScoresText}>No scores yet. Start tapping! ⚡</Text>
//             ) : (
//               gameScores.tapHappy
//                 .sort((a, b) => b.score - a.score)
//                 .map((game, index) => (
//                   <View key={index} style={styles.scoreItem}>
//                     <Text style={styles.scoreItemText}>
//                       Score: {game.score} points
//                     </Text>
//                     <Text style={styles.scoreItemDate}>{game.date}</Text>
//                   </View>
//                 ))
//             )}
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     );
//   };

//   // Main render logic
//   const renderCurrentScreen = () => {
//     switch (currentScreen) {
//       case 'home':
//         return <HomeScreen />;
//       case 'breathing':
//         return <BoxBreathingGame />;
//       case 'tapHappy':
//         return <TapHappyGame />;
//       case 'scores':
//         return <ScoresScreen />;
//       default:
//         return <HomeScreen />;
//     }
//   };

//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />
//       {renderCurrentScreen()}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E8F5E8',
//   },
//   homeContent: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#2E7D32',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#4CAF50',
//     textAlign: 'center',
//     marginBottom: 40,
//     fontStyle: 'italic',
//   },
//   gameButtons: {
//     width: '100%',
//     marginBottom: 30,
//   },
//   gameButton: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 25,
//     marginBottom: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   breathingButton: {
//     borderLeftWidth: 5,
//     borderLeftColor: '#4CAF50',
//   },
//   tapButton: {
//     borderLeftWidth: 5,
//     borderLeftColor: '#FF9800',
//   },
//   gameButtonEmoji: {
//     fontSize: 40,
//     marginBottom: 10,
//   },
//   gameButtonText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#2E7D32',
//     marginBottom: 5,
//   },
//   gameButtonDesc: {
//     fontSize: 14,
//     color: '#666',
//   },
//   scoresButton: {
//     backgroundColor: '#2196F3',
//     borderRadius: 15,
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//   },
//   scoresButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   gameContainer: {
//     flex: 1,
//     backgroundColor: '#E8F5E8',
//   },
//   gameHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#4CAF50',
//   },
//   backButton: {
//     marginRight: 15,
//   },
//   backButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   gameTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
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
//   tapGameStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#fff',
//     paddingVertical: 15,
//     marginHorizontal: 20,
//     marginTop: 20,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   statText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2E7D32',
//   },
//   gameArea: {
//     flex: 1,
//     marginHorizontal: 20,
//     marginTop: 20,
//     position: 'relative',
//   },
//   face: {
//     position: 'absolute',
//     width: 60,
//     height: 60,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 30,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   faceEmoji: {
//     fontSize: 35,
//   },
//   gameControls: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   gameOverContainer: {
//     alignItems: 'center',
//   },
//   gameOverText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//     marginBottom: 10,
//   },
//   finalScoreText: {
//     fontSize: 20,
//     color: '#2E7D32',
//     marginBottom: 20,
//   },
//   playAgainButton: {
//     backgroundColor: '#FF9800',
//     borderRadius: 25,
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//   },
//   playAgainButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   instructions: {
//     backgroundColor: '#fff',
//     marginHorizontal: 20,
//     marginBottom: 20,
//     padding: 20,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   instructionText: {
//     fontSize: 16,
//     color: '#2E7D32',
//     textAlign: 'center',
//     lineHeight: 24,
//   },
//   scoresContainer: {
//     flex: 1,
//     padding: 20,
//   },
//   scoreSection: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   scoreSectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2E7D32',
//     marginBottom: 15,
//   },
//   noScoresText: {
//     fontSize: 16,
//     color: '#666',
//     fontStyle: 'italic',
//     textAlign: 'center',
//   },
//   scoreItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   scoreItemText: {
//     fontSize: 16,
//     color: '#2E7D32',
//     fontWeight: '500',
//   },
//   scoreItemDate: {
//     fontSize: 14,
//     color: '#666',
//   },
// });

// export default WellnessArcade; 

import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import HomeGame from '../screens/Game/HomeGame';
import BoxBreathingGame from '../screens/Game/BoxBreathingGame';
import TapHappyGame from '../screens/Game/TapHappyGame';
import ScoresScreen from '../screens/Game/ScoresScreen';
import { useNavigation } from '@react-navigation/native';


const WellnessArcade = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [gameScores, setGameScores] = useState({ boxBreathing: [], tapHappy: [] });
const navigation=useNavigation();
  const addScore = (game, scoreObj) => {
    setGameScores(prev => ({ ...prev, [game]: [...prev[game], scoreObj] }));
  };

  const navigate = (screen) => setCurrentScreen(screen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home': return <HomeGame navigation={navigation} />;
      case 'breathing': return <BoxBreathingGame navigation={navigation} addScore={addScore} />;
      case 'tapHappy': return <TapHappyGame navigation={navigation} addScore={addScore} />;
      case 'scores': return <ScoresScreen navigation={navigation} gameScores={gameScores} />;
      default: return <HomeGame navigation={navigation} />;
    }
  };

  return (
    <>
      {/* <StatusBar barStyle="light-content" backgroundColor="#2E7D32" /> */}
      {renderScreen()}
    </>
  );
};

export default WellnessArcade;
