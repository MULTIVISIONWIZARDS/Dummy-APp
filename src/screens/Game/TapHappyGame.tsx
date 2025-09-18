import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
 import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styless from '../Game/styles'
const { width, height } = Dimensions.get('window');

const TapHappyGame = ({ navigation }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [faces, setFaces] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const faceTypes = [
    { emoji: '😃', isHappy: true, points: 10 },
    { emoji: '😊', isHappy: true, points: 10 },
    { emoji: '🥰', isHappy: true, points: 15 },
    { emoji: '😄', isHappy: true, points: 10 },
    { emoji: '😁', isHappy: true, points: 10 },
    { emoji: '😢', isHappy: false, points: -5 },
    { emoji: '😠', isHappy: false, points: -5 },
    { emoji: '😵', isHappy: false, points: -5 },
    { emoji: '🤢', isHappy: false, points: -5 },
  ];

  // Set navigation options
  useEffect(() => {
    navigation.setOptions({
      title: '😃 Tap Happy Faces',
      headerStyle: {
        backgroundColor: '#4CAF50',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    let faceInterval;
    if (isActive) {
      faceInterval = setInterval(() => {
        addRandomFace();
      }, 800);
    }
    return () => clearInterval(faceInterval);
  }, [isActive]);

  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      setFaces(prev => prev.filter(face => Date.now() - face.created < 3000));
    }, 100);
    
    return () => clearInterval(cleanupInterval);
  }, []);

  const addRandomFace = () => {
    const faceType = faceTypes[Math.floor(Math.random() * faceTypes.length)];
    const newFace = {
      id: Date.now() + Math.random(),
      ...faceType,
      x: Math.random() * (width - 80),
      y: Math.random() * (height * 0.5) + 150,
      created: Date.now(),
    };
    setFaces(prev => [...prev, newFace]);
  };

  const tapFace = (face) => {
    setFaces(prev => prev.filter(f => f.id !== face.id));
    setScore(prev => Math.max(0, prev + face.points));
  };

  const saveScore = async (score) => {
    try {
      const existingScores = await AsyncStorage.getItem('tapHappyScores');
      const scores = existingScores ? JSON.parse(existingScores) : [];
      scores.push(score);
      await AsyncStorage.setItem('tapHappyScores', JSON.stringify(scores));
    } catch (error) {
      console.log('Error saving score:', error);
    }
  };

  const startGame = () => {
    setIsActive(true);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setFaces([]);
  };

  const endGame = async () => {
    setIsActive(false);
    setGameOver(true);
    setFaces([]);
    
    const newScore = { score, date: new Date().toLocaleDateString() };
    await saveScore(newScore);
  };

  return (
    <SafeAreaView style={styles.gameContainer}>
   
       <View style={styless.gameHeader}>
                  <TouchableOpacity
                                 onPress={() => navigation?.goBack?.()}
                                 style={styless.backButton}
                                  activeOpacity={0.5}
                                 hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                               >
                                 <Icon name="arrow-left" size={24} color="#fff" />
                               </TouchableOpacity>
                   <Text style={styless.gameTitle}>😃 Tap Happy Faces</Text>
                 </View>
      <View style={styles.tapGameStats}>
        <Text style={styles.statText}>Score: {score}</Text>
        <Text style={styles.statText}>Time: {timeLeft}s</Text>
      </View>
 
      <View style={styles.gameArea}>
        {faces.map(face => (
          <TouchableOpacity
            key={face.id}
            style={[styles.face, { left: face.x, top: face.y }]}
            onPress={() => tapFace(face)}
          >
            <Text style={styles.faceEmoji}>{face.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.gameControls}>
        {!isActive && !gameOver && (
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>Start Game</Text>
          </TouchableOpacity>
        )}
        
        {gameOver && (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>Game Over! 🎉</Text>
            <Text style={styles.finalScoreText}>Final Score: {score}</Text>
            <TouchableOpacity style={styles.playAgainButton} onPress={startGame}>
              <Text style={styles.playAgainButtonText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {!isActive && !gameOver && (
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            Tap only the HAPPY faces 😃 to score points!{'\n'}
            Avoid sad faces 😢 or lose points.{'\n'}
            You have 30 seconds - Good luck! 🌟
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    backgroundColor: '#E8F5E8',
  },
  tapGameStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  gameArea: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
    position: 'relative',
  },
  face: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  faceEmoji: {
    fontSize: 35,
  },
  gameControls: {
    alignItems: 'center',
    padding: 20,
  },
  gameOverContainer: {
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  finalScoreText: {
    fontSize: 20,
    color: '#2E7D32',
    marginBottom: 20,
  },
  playAgainButton: {
    backgroundColor: '#FF9800',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  playAgainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructions: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionText: {
    fontSize: 16,
    color: '#2E7D32',
    textAlign: 'center',
    lineHeight: 24,
  },
});


export default TapHappyGame;
