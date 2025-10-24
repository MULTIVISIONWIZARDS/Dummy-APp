
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
