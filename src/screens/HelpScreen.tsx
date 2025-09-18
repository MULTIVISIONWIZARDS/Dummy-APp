// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   LayoutAnimation,
//   Platform,
//   UIManager,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Colors from '../constants/Colors';

// // Enable LayoutAnimation on Android
// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// const HelpScreen = () => {
//   const [expanded, setExpanded] = useState(null);

//   // Restore last expanded tier from storage
//   useEffect(() => {
//     (async () => {
//       const saved = await AsyncStorage.getItem('last_expanded_tier');
//       if (saved) setExpanded(saved);
//     })();
//   }, []);

//   // Subscription tiers data
//   const tiesrs = [
//     {
//       name: 'Tier 1',
//       price: '$4.95 / month',
//       features: [
//         'Access to daily educational content',
//         'Category tabs: Diet, Exercise, Hormones, Supplements',
//         'Track symptoms in personal journal',
//       ],
//     },
//     {
//       name: 'Tier 2',
//       price: '$9.95 / month',
//       features: [
//         'All Tier 1 features',
//         '1 written consult per month',
//         'Ask questions anytime, receive answer within 24 hrs',
//       ],
//     },
//     {
//       name: 'Tier 3',
//       price: '$19.95 / month',
//       features: [
//         'All Tier 2 features',
//         '1 written consult per week',
//         'Ask questions any day of the week, receive response within 24 hrs',
//       ],
//     },
//     {
//       name: 'Tier 4',
//       price: '$39.95 / month',
//       features: [
//         'All Tier 3 features',
//         '1 online visit per week',
//         '1 face-to-face or video consult per month (30 mins, schedule at least 1 week in advance)',
//       ],
//     },
//   ];
//   const tiers = [
//   {
//     id: 'basic',
//     name: 'Basic',
//     price: '$9.95',
//     yearlyPrice: '$99.95',
//     description: 'Informational only',
//     features: [
//       'Access to informational content',
//     ],
//     color: '#6B7280',
//     icon: 'shield',
//     paymentUrl: 'https://buy.stripe.com/test_dRm8wOcCT0Wt2aNaHS7g400',
//   },
//   {
//     id: 'silver',
//     name: 'Silver',
//     price: '$19.95',
//     yearlyPrice: '$199.95',
//     description:
//       'Informational + 1 online consult per month via text (response within 24 hrs)',
//     features: [
//       'Access to informational content',
//       '1 online consult per month via text',
//       'Response within 24 hrs',
//       'Covers up to 3 questions/scenarios',
//     ],
//     color: '#3B82F6',
//     icon: 'military-tech',
//     paymentUrl: 'https://buy.stripe.com/test_bJefZgcCT48FeXz5ny7g401',
//   },
//   {
//     id: 'gold',
//     name: 'Gold',
//     price: '$29.95',
//     yearlyPrice: '$299.95',
//     description:
//       'Informational + 1 online consult per week via text (response within 24 hrs)',
//     features: [
//       'Access to informational content',
//       '1 online consult per week via text',
//       'Response within 24 hrs',
//       'Covers up to 3 questions/scenarios',
//     ],
//     color: '#dbba00ff',
//     icon: 'star',
//     paymentUrl: 'https://buy.stripe.com/test_14A00i46nbB72aN5ny7g403',
    
//   },
//   {
//     id: 'platinum',
//     name: 'Platinum',
//     price: '$49.95',
//     yearlyPrice: '$499.95',
//     description:
//       'Informational + weekly online consults + monthly face-to-face consult (30 mins)',
//     features: [
//       'Access to informational content',
//       '1 online consult per week via text',
//       'Response within 24 hrs',
//       'Covers up to 3 questions/scenarios',
//       '1 face-to-face consult per month (30 minutes)',
//       'Must be scheduled 1 week in advance',
//     ],
//     color: '#8B5CF6',
//     icon: 'diamond',
//     paymentUrl: 'https://buy.stripe.com/test_14A00i46nbB72aN5ny7g403',
//   },
// ];

//   const toggleExpand = async (key) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     const newKey = expanded === key ? null : key;
//     setExpanded(newKey);
//     await AsyncStorage.setItem('last_expanded_tier', newKey ?? '');
//   };

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <Text style={styles.header}>Subscription Plans & Features</Text>

//       {tiers.map((tier, index) => {
//         const key = `${index}`;
//         const isExpanded = expanded === key;
//         return (
//           <View key={key} style={styles.card}>
//             <TouchableOpacity activeOpacity={0.8} onPress={() => toggleExpand(key)}>
//               <View style={styles.tierHeader}>
//                 <Text style={styles.tierName}>{tier.name}</Text>
//                 <Text style={[styles.tierPrice,tier.name==='Platinum'&&{marginRight:26},tier.name==='Gold'&&{marginLeft:10}]}>{tier.price}</Text>
//                 <Text style={styles.arrow}>{isExpanded ? '−' : '+'}</Text>
//               </View>
//             </TouchableOpacity>
//             {isExpanded &&
//               tier.features.map((f, i) => (
//                 <Text key={i} style={styles.feature}>
//                   • {f}
//                 </Text>
//               ))}
//           </View>
//         );
//       })}

//       {/* Contact / Privacy */}
//       <View style={styles.contactCard}>
//         <Text style={styles.contactTitle}>Need more information?</Text>
//         <Text style={styles.contactText}>Email: support@example.com</Text>
//         <Text style={styles.contactText}>Phone: +1 (800) 123-4567</Text>
//         <Text style={styles.contactText}>
//           Privacy Policy: Your data is securely stored and only used for educational and consult purposes.
//         </Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F7F8FA', padding: 16 },
//   header: { fontSize: 24, fontWeight: '700', marginBottom: 20, color: '#222' },
//   card: {
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   tierHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   tierName: { fontSize: 18, fontWeight: '600', color: Colors.darkBlueP1 },
//   tierPrice: { fontSize: 16, fontWeight: '500', color: '#333' },
//   arrow: { fontSize: 25, color: Colors.darkBlueP1, fontWeight: '700' },
//   feature: { marginTop: 8, fontSize: 14, color: '#333', lineHeight: 20 },
//   contactCard: {
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     padding: 20,
//     marginTop: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.06,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 1,
//     marginBottom: 50,
//   },
//   contactTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
//   contactText: { fontSize: 14, lineHeight: 20, color: '#555', marginBottom: 4 },
// });

// export default HelpScreen;


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
import { useNavigation } from '@react-navigation/native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HelpScreen = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const navigation = useNavigation();

  // Restore last expanded tier + subscription details
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('last_expanded_tier');
      if (saved) setExpanded(saved);

      try {
        const subData = await AsyncStorage.getItem('subscriptionDetails');
        if (subData) {
          const parsed = JSON.parse(subData);
          // check expiry
          if (parsed.expiryDate && new Date(parsed.expiryDate) > new Date()) {
            setSubscription(parsed);
          } else {
            setSubscription(null); // expired
          }
        }
      } catch (e) {
        console.log('Invalid subscription data:', e);
        setSubscription(null);
      }
    })();
  }, []);

  const tiers = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$9.95',
      description: 'Informational only',
      features: ['Access to informational content'],
    },
    {
      id: 'silver',
      name: 'Silver',
      price: '$19.95',
      description:
        'Informational + 1 online consult per month via text (response within 24 hrs)',
      features: [
        'Access to informational content',
        '1 online consult per month via text',
        'Response within 24 hrs',
        'Covers up to 3 questions/scenarios',
      ],
    },
    {
      id: 'gold',
      name: 'Gold',
      price: '$29.95',
      description:
        'Informational + 1 online consult per week via text (response within 24 hrs)',
      features: [
        'Access to informational content',
        '1 online consult per week via text',
        'Response within 24 hrs',
        'Covers up to 3 questions/scenarios',
      ],
    },
    {
      id: 'platinum',
      name: 'Platinum',
      price: '$49.95',
      description:
        'Informational + weekly online consults + monthly face-to-face consult (30 mins)',
      features: [
        'Access to informational content',
        '1 online consult per week via text',
        'Response within 24 hrs',
        'Covers up to 3 questions/scenarios',
        '1 face-to-face consult per month (30 minutes)',
        'Must be scheduled 1 week in advance',
      ],
    },
  ];

  const toggleExpand = async (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newKey = expanded === key ? null : key;
    setExpanded(newKey);
    await AsyncStorage.setItem('last_expanded_tier', newKey ?? '');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Active Subscription */}
      {subscription ? (
        <View style={styles.activeCard}>
          <Text style={styles.activeTitle}>Your Active Plan</Text>
          <Text style={styles.activeText}>Plan: {subscription.planName}</Text>
          <Text style={styles.activeText}>
            Start Date: {new Date(subscription.startDate).toDateString()}
          </Text>
          <Text style={styles.activeText}>
            Expiry Date: {new Date(subscription.expiryDate).toDateString()}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.activeCard}
          onPress={() => navigation.navigate('Subscription')}
        >
          <Text style={styles.activeTitle}>No Active Subscription</Text>
          <Text style={styles.activeText}>
            You have not purchased any plan yet.
          </Text>
        </TouchableOpacity>
      )}

      {/* All Plans */}
      {tiers.map((tier, index) => {
        const key = `${index}`;
        const isExpanded = expanded === key;
        return (
          <View key={key} style={styles.card}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => toggleExpand(key)}>
              <View style={styles.tierHeader}>
                <Text style={styles.tierName}>{tier.name}</Text>
                <Text
                  style={[
                    styles.tierPrice,
                    tier.name === 'Platinum' && { marginRight: 26 },
                    tier.name === 'Gold' && { marginLeft: 10 },
                  ]}
                >
                  {tier.price}
                </Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA', padding: 16 },
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
  activeCard: {
    backgroundColor: '#E6F7FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: Colors.darkBlueP1,
  },
  activeTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    color: Colors.darkBlueP1,
  },
  activeText: { fontSize: 14, color: '#333', marginBottom: 4 },
});

export default HelpScreen;
