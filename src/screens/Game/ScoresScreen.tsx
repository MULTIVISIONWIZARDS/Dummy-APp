import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
 import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styless from '../Game/styles'
const ScoresScreen = ({ navigation }) => {
  const [boxBreathingScores, setBoxBreathingScores] = useState([]);
  const [tapHappyScores, setTapHappyScores] = useState([]);

  // Set navigation options
  useEffect(() => {
    navigation.setOptions({
      title: '📊 Your Scores',
      headerStyle: {
        backgroundColor: '#4CAF50',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  const loadScores = async () => {
    try {
      const breathingScores = await AsyncStorage.getItem('boxBreathingScores');
      const happyScores = await AsyncStorage.getItem('tapHappyScores');
      
      if (breathingScores) {
        setBoxBreathingScores(JSON.parse(breathingScores));
      }
      
      if (happyScores) {
        setTapHappyScores(JSON.parse(happyScores));
      }
    } catch (error) {
      console.log('Error loading scores:', error);
    }
  };

  // Load scores when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadScores();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
   <View style={styless.gameHeader}>
                  <TouchableOpacity
                   activeOpacity={0.5}
                                 onPress={() => navigation?.goBack?.()}
                                 style={styless.backButton}
                                 hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                               >
                                 <Icon name="arrow-left" size={24} color="#fff" />
                               </TouchableOpacity>
                   <Text style={styless.gameTitle}>📊 Your Scores</Text>
                 </View>
      <ScrollView style={styles.scoresContainer}>
        {/* <View style={styles.scoreSection}>
          <Text style={styles.scoreSectionTitle}>🫁 Box Breathing Sessions</Text>
          {boxBreathingScores.length === 0 ? (
            <Text style={styles.noScoresText}>No sessions yet. Start breathing! 🌿</Text>
          ) : (
            boxBreathingScores.map((session, index) => (
              <View key={index} style={styles.scoreItem}>
                <Text style={styles.scoreItemText}>
                  {session.cycles} cycles completed
                </Text>
                <Text style={styles.scoreItemDate}>{session.date}</Text>
              </View>
            ))
          )}
        </View> */}

        <View style={styles.scoreSection}>
          <Text style={styles.scoreSectionTitle}>😃 Tap Happy Faces High Scores</Text>
          {tapHappyScores.length === 0 ? (
            <Text style={styles.noScoresText}>No scores yet. Start tapping! ⚡</Text>
          ) : (
            tapHappyScores
              .sort((a, b) => b.score - a.score)
              .map((game, index) => (
                <View key={index} style={styles.scoreItem}>
                  <Text style={styles.scoreItemText}>
                    Score: {game.score} points
                  </Text>
                  <Text style={styles.scoreItemDate}>{game.date}</Text>
                </View>
              ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E8',
  },
  scoresContainer: {
    flex: 1,
    padding: 20,
  },
  scoreSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  noScoresText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scoreItemText: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '500',
  },
  scoreItemDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default ScoresScreen;