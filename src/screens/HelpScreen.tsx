import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SubscriptionScreen = () => {
  const [expanded, setExpanded] = useState(null);

  // Restore last expanded tier from storage
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('last_expanded_tier');
      if (saved) setExpanded(saved);
    })();
  }, []);

  // Subscription tiers data
  const tiers = [
    {
      name: 'Tier 1',
      price: '$4.95 / month',
      features: [
        'Access to daily educational content',
        'Category tabs: Diet, Exercise, Hormones, Supplements',
        'Track symptoms in personal journal',
      ],
    },
    {
      name: 'Tier 2',
      price: '$9.95 / month',
      features: [
        'All Tier 1 features',
        '1 written consult per month',
        'Ask questions anytime, receive answer within 24 hrs',
      ],
    },
    {
      name: 'Tier 3',
      price: '$19.95 / month',
      features: [
        'All Tier 2 features',
        '1 written consult per week',
        'Ask questions any day of the week, receive response within 24 hrs',
      ],
    },
    {
      name: 'Tier 4',
      price: '$39.95 / month',
      features: [
        'All Tier 3 features',
        '1 online visit per week',
        '1 face-to-face or video consult per month (30 mins, schedule at least 1 week in advance)',
      ],
    },
  ];

  const toggleExpand = async (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newKey = expanded === key ? null : key;
    setExpanded(newKey);
    await AsyncStorage.setItem('last_expanded_tier', newKey ?? '');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Subscription Plans & Features</Text>

      {tiers.map((tier, index) => {
        const key = `${index}`;
        const isExpanded = expanded === key;
        return (
          <View key={key} style={styles.card}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => toggleExpand(key)}>
              <View style={styles.tierHeader}>
                <Text style={styles.tierName}>{tier.name}</Text>
                <Text style={styles.tierPrice}>{tier.price}</Text>
                <Text style={styles.arrow}>{isExpanded ? '−' : '+'}</Text>
              </View>
            </TouchableOpacity>
            {isExpanded &&
              tier.features.map((f, i) => (
                <Text key={i} style={styles.feature}>
                  • {f}
                </Text>
              ))}
          </View>
        );
      })}

      {/* Contact / Privacy */}
      <View style={styles.contactCard}>
        <Text style={styles.contactTitle}>Need more information?</Text>
        <Text style={styles.contactText}>Email: support@example.com</Text>
        <Text style={styles.contactText}>Phone: +1 (800) 123-4567</Text>
        <Text style={styles.contactText}>
          Privacy Policy: Your data is securely stored and only used for educational and consult purposes.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA', padding: 16 },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 20, color: '#222' },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tierName: { fontSize: 18, fontWeight: '600', color: Colors.darkBlueP1 },
  tierPrice: { fontSize: 16, fontWeight: '500', color: '#333' },
  arrow: { fontSize: 25, color: Colors.darkBlueP1, fontWeight: '700' },
  feature: { marginTop: 8, fontSize: 14, color: '#333', lineHeight: 20 },
  contactCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 50,
  },
  contactTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
  contactText: { fontSize: 14, lineHeight: 20, color: '#555', marginBottom: 4 },
});

export default SubscriptionScreen;
