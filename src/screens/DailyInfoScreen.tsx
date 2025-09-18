import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

const initialLayout = { width: Dimensions.get('window').width };
type SubscriptionTier = 'Free' | 'Tier1' | 'Tier2' | 'Tier3';
const dummySubscription: SubscriptionTier = 'Tier2';

const DailyInfoScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'diet', title: 'Diet' },
    { key: 'exercise', title: 'Exercise' },
    { key: 'hormones', title: 'Hormones' },
    { key: 'supplements', title: 'Supplements' },
  ]);

  const dailyInfo: { [key: string]: string } = {
    diet: '🍎 Eat balanced meals with protein, carbs, and healthy fats.',
    exercise: '🏋️‍♂️ 30 mins of walking or light exercise.',
    hormones: '💤 Maintain regular sleep to support hormone balance.',
    supplements: '💊 Consider vitamin D and omega-3 if deficient.',
  };

  const renderScene = ({ route }: any) => (
    <ScrollView contentContainerStyle={styles.tabContainer}>
      <Text style={styles.infoText}>{dailyInfo[route.key]}</Text>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Info</Text>
      <View style={{ flex: 1 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              scrollEnabled
              style={{ backgroundColor: '#4a90e2' }}
              indicatorStyle={{ backgroundColor: '#fff' }}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 10 },
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  tabContainer: { padding: 10, flexGrow: 1 },
  infoText: { fontSize: 16, lineHeight: 22 },
});

export default DailyInfoScreen;
