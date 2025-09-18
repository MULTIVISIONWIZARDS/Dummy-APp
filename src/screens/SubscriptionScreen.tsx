// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   Dimensions,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   Animated,
//   ScrollView,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Colors from '../constants/Colors';
// import { useNavigation } from '@react-navigation/native';
// import Toast from 'react-native-toast-message';

// const { width, height } = Dimensions.get('window');
// const CARD_WIDTH = width * 0.75;
// const CARD_HEIGHT = height * 0.55; // fit screen height
// const SPACING = 20;
// const SIDE_PADDING = (width - CARD_WIDTH) / 2;

// interface SubscriptionPlan {
//   id: string;
//   name: string;
//   price: number;
//   yearlyPrice: number;
//   description: string;
//   features: string[];
//   color: string;
//   icon: string;
// }

// const plans: SubscriptionPlan[] = [
//   { id: 'basic', name: 'Basic', price: 4.95, yearlyPrice: 49.95, description: 'Perfect for getting started', features: ['Daily informational content'], color: '#6B7280', icon: 'shield' },
//   { id: 'silver', name: 'Silver', price: 9.95, yearlyPrice: 99.95, description: 'Great for regular users', features: ['Daily content', '1 online consult / month'], color: '#3B82F6', icon: 'military-tech' },
//   { id: 'gold', name: 'Gold', price: 19.95, yearlyPrice: 199.95, description: 'Best value for professionals', features: ['Daily content', '1 online consult / week'], color: '#dbba00ff', icon: 'star' },
//   { id: 'platinum', name: 'Platinum', price: 39.95, yearlyPrice: 399.95, description: 'All-inclusive premium plan', features: ['Daily content','1 online consult / week','1 video consult / month'], color: '#8B5CF6', icon: 'diamond' },
// ];

// export default function SubscriptionScreen() {
//   const [selectedPlan, setSelectedPlan] = useState<string>('basic');
//   const [isYearly, setIsYearly] = useState<boolean>(false);
//   const scrollX = useRef(new Animated.Value(0)).current;
// const navigation=useNavigation();

// const handleSubscribe = (plan: SubscriptionPlan) => {
//   const price = isYearly ? plan.yearlyPrice : plan.price;
//   const period = isYearly ? 'yearly' : 'monthly';

//   Alert.alert(
//     'Subscribe to ' + plan.name,
//     `You're about to subscribe to ${plan.name} plan for $${price}/${period}.`,
//     [
//       { text: 'Cancel', style: 'cancel' },
//       { 
//         text: 'Continue', 
//         style: 'default',
//         onPress: () => {
//           // Dummy subscription logic
//           console.log(`Subscribed to ${plan.name} plan`);

//           // Show toast
//              Toast.show({
//             type: 'success',
//             text1: 'Subscription Successful',
//             text2: `You have subscribed to the ${plan.name} plan!`,
         
//             visibilityTime: 2500, // Toast visible for 3 seconds
//             autoHide: true,
//           });

//           // Wait 3 seconds before navigating
//           setTimeout(() => {
//             navigation.reset({
//               index: 0,
//               routes: [{ name: 'Main' }],
//             });
//           }, 3000); // 3000ms = 3 seconds
//         }
//       },
//     ]
//   );
// };

//   return (
//     <LinearGradient colors={['#fcfcebff', '#f7dcf9ff', '#f3e3f5ff']} style={{ flex: 1 }}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
//         <Text style={styles.headerTitle}>Choose Your Plan</Text>

//         {/* Monthly/Yearly Toggle */}
//         <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 25 }}>
//           <TouchableOpacity
//             onPress={() => setIsYearly(false)}
//             style={{
//               backgroundColor: !isYearly ? Colors.darkBlueP1 : '#E5E7EB',
//               paddingVertical: 10,
//               paddingHorizontal: 24,
//               borderRadius: 12,
//               marginRight: 8
//             }}
//           >
//             <Text style={{ color: !isYearly ? '#fff' : '#374151', fontWeight: '600' }}>Monthly</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => setIsYearly(true)}
//             style={{
//               backgroundColor: isYearly ? Colors.darkBlueP1 : '#E5E7EB',
//               paddingVertical: 10,
//               paddingHorizontal: 24,
//               borderRadius: 12
//             }}
//           >
//             <Text style={{ color: isYearly ? '#fff' : '#374151', fontWeight: '600' }}>Yearly</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Carousel */}
//         <Animated.FlatList
//           data={plans}
//           horizontal
//           keyExtractor={(item) => item.id}
//           showsHorizontalScrollIndicator={false}
//           snapToInterval={CARD_WIDTH + SPACING}
//           decelerationRate="fast"
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//             { useNativeDriver: true }
//           )}
//           onMomentumScrollEnd={(ev) => {
//             const offsetX = ev.nativeEvent.contentOffset.x;
//             const index = Math.round(offsetX / (CARD_WIDTH + SPACING));
//             setSelectedPlan(plans[index].id);
//           }}
//           renderItem={({ item, index }) => {
//             const inputRange = [
//               (index - 1) * (CARD_WIDTH + SPACING),
//               index * (CARD_WIDTH + SPACING),
//               (index + 1) * (CARD_WIDTH + SPACING),
//             ];

//             const scale = scrollX.interpolate({ inputRange, outputRange: [0.85, 1, 0.85], extrapolate: 'clamp' });
//             const opacity = scrollX.interpolate({ inputRange, outputRange: [0.6, 1, 0.6], extrapolate: 'clamp' });
//             const translateY = scrollX.interpolate({ inputRange, outputRange: [20, 0, 20], extrapolate: 'clamp' });

//             return (
//               <Animated.View
//                 style={[
//                   styles.card,
//                   {
//                     transform: [{ scale }, { translateY }],
//                     opacity,
//                     borderColor: selectedPlan === item.id ? item.color : '#E5E7EB',
//                     marginLeft: index === 0 ? SIDE_PADDING : SPACING / 2,
//                     marginRight: index === plans.length - 1 ? SIDE_PADDING : SPACING / 2,
//                   },
//                 ]}
//               >
//                 <TouchableOpacity activeOpacity={0.9} style={{ flex: 1 }} onPress={() => setSelectedPlan(item.id)}>
//                   <View style={styles.iconWrap}>
//                     <View style={{ backgroundColor: item.color + '20', padding: 12, borderRadius: 50 }}>
//                       <Icon name={item.icon} size={28} color={item.color} />
//                     </View>
//                   </View>

//                   <Text style={styles.planName}>{item.name}</Text>
//                   <Text style={styles.planDescription}>{item.description}</Text>
//                   <Text style={styles.priceText}>${isYearly ? item.yearlyPrice : item.price}/{isYearly ? 'year' : 'month'}</Text>
//                   {isYearly && <Text style={styles.saveText}>Save ${(item.price * 12 - item.yearlyPrice).toFixed(0)} yearly</Text>}

//                   <View style={{ marginTop: 10 }}>
//                     {item.features.map(f => (
//                       <View key={f} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
//                         <Icon name="check-circle" size={18} color="#10B981" />
//                         <Text style={{ marginLeft: 8, color: '#374151' }}>{f}</Text>
//                       </View>
//                     ))}
//                   </View>

//                   <TouchableOpacity
//                     style={[styles.subscribeBtn, { backgroundColor: selectedPlan === item.id ? item.color : '#9CA3AF' }]}
//                     disabled={selectedPlan !== item.id}
//                     onPress={() => handleSubscribe(item)}
//                   >
//                     <Text style={styles.subscribeBtnText}>{selectedPlan === item.id ? 'Subscribe' : 'Choose Plan'}</Text>
//                   </TouchableOpacity>
//                 </TouchableOpacity>
//               </Animated.View>
//             );
//           }}
//         />

//         {/* Content below carousel */}
//         <View style={{ paddingHorizontal: 20, marginTop: 25 }}>
//           <Text style={{ fontSize: 16, color: '#374151', marginBottom: 8 }}>Benefits of our plans:</Text>
//           <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>- Access daily content curated by experts.</Text>
//           <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>- Online consultations included in Silver & above.</Text>
//           <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>- Premium video consults for Platinum members.</Text>
//         </View>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     width: CARD_WIDTH,
//     height: CARD_HEIGHT,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 20,
//     borderWidth: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 6,
//   },
//   iconWrap: { alignItems: 'center', marginBottom: 12 },
//   planName: { fontSize: 20, fontWeight: '700', textAlign: 'center', color: '#111827' },
//   planDescription: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 12 },
//   priceText: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 6 },
//   saveText: { fontSize: 13, color: '#10B981', textAlign: 'center', marginBottom: 8 },
//   subscribeBtn: { marginTop: 'auto', paddingVertical: 14, borderRadius: 12 },
//   subscribeBtnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
//   headerTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#1f2937', marginTop: 25, marginBottom: 25 },
// });


import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Alert, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../constants/Colors';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;
const CARD_HEIGHT = height * 0.55;
const SPACING = 20;
const SIDE_PADDING = (width - CARD_WIDTH) / 2;

interface SubscriptionPlan { id: string; name: string; price: number; yearlyPrice: number; description: string; features: string[]; color: string; icon: string; paymentUrl:string; }
// const plans: SubscriptionPlan[] = [
//   { id: 'basic', name: 'Basic', price: 4.95, yearlyPrice: 49.95, description: 'Perfect for getting started', features: ['Daily informational content'], color: '#6B7280', icon: 'shield' ,paymentUrl:'https://buy.stripe.com/test_dRm8wOcCT0Wt2aNaHS7g400'},
//   { id: 'silver', name: 'Silver', price: 9.95, yearlyPrice: 99.95, description: 'Great for regular users', features: ['Daily content', '1 online consult / month'], color: '#3B82F6', icon: 'military-tech',paymentUrl:'https://buy.stripe.com/test_bJefZgcCT48FeXz5ny7g401' },
//   { id: 'gold', name: 'Gold', price: 19.95, yearlyPrice: 199.95, description: 'Best value for professionals', features: ['Daily content', '1 online consult / week'], color: '#dbba00ff', icon: 'star' ,paymentUrl:'https://buy.stripe.com/test_14A00i46nbB72aN5ny7g403'},
//   { id: 'platinum', name: 'Platinum', price: 39.95, yearlyPrice: 399.95, description: 'All-inclusive premium plan', features: ['Daily content','1 online consult / week','1 video consult / month'], color: '#8B5CF6', icon: 'diamond',paymentUrl:'https://buy.stripe.com/test_14A00i46nbB72aN5ny7g403' },
// ];
const plans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.95,
    yearlyPrice: 99.95,
    description: 'Informational only',
    features: [
      'Access to informational content',
    ],
    color: '#6B7280',
    icon: 'shield',
    paymentUrl: 'https://buy.stripe.com/test_7sY28q1YfdJf6r303e7g404',
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 19.95,
    yearlyPrice: 199.95,
    description:
      'Informational + 1 online consult per month via text (response within 24 hrs)',
    features: [
      'Access to informational content',
      '1 online consult per month via text',
      'Response within 24 hrs',
      'Covers up to 3 questions/scenarios',
    ],
    color: '#3B82F6',
    icon: 'military-tech',
    paymentUrl: 'https://buy.stripe.com/test_28EbJ0byP7kR2aNcQ07g405',
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 29.95,
    yearlyPrice: 299.95,
    description:
      'Informational + 1 online consult per week via text (response within 24 hrs)',
    features: [
      'Access to informational content',
      '1 online consult per week via text',
      'Response within 24 hrs',
      'Covers up to 3 questions/scenarios',
    ],
    color: '#dbba00ff',
    icon: 'star',
    paymentUrl: 'https://buy.stripe.com/test_6oU9ASbyPeNj5mZcQ07g406',
    
    
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 49.95,
    yearlyPrice: 499.95,
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
    color: '#8B5CF6',
    icon: 'diamond',
    paymentUrl: 'https://buy.stripe.com/test_3cI7sK9qH34BdTv4ju7g407',
  },
];



export default function SubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState<string>('basic');
  const [isYearly, setIsYearly] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const route = useRoute();
  const userId = route.params?.userId;

  
  // const handleSubscribe = async (plan: SubscriptionPlan) => {
  //   const price = isYearly ? plan.yearlyPrice : plan.price;
  //   const period = isYearly ? 'yearly' : 'monthly';

  //   Alert.alert('Subscribe to ' + plan.name, `You're about to subscribe to ${plan.name} plan for $${price}/${period}.`, [
  //     { text: 'Cancel', style: 'cancel' },
  //     { text: 'Continue', style: 'default', onPress: async () => {
  //         console.log(`Subscribed to ${plan.name}`);
  //         await AsyncStorage.setItem(`subscription_${userId}`, 'true');
  //        // Toast.show({ type: 'success', text1: 'Subscription Successful', text2: `You have subscribed to the ${plan.name} plan!` });
  //         navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  //       }
  //     },
  //   ]);
  // };
const handleSubscribe = (plan) => {
 
     navigation.navigate('PaymentWebView', {
      paymentUrl: plan.paymentUrl,
      planId: plan.id,
      planName:plan.name,
      userId:userId
    });
};
  return (
    <LinearGradient colors={['white', 'white',]} style={{ flex: 1 }}>
    {/* <LinearGradient colors={['#fcfcebff', '#f7dcf9ff', '#f3e3f5ff']} style={{ flex: 1 }}> */}
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.headerTitle}>Choose Your Plan</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 25 }}>
          <TouchableOpacity onPress={() => setIsYearly(false)} style={{ backgroundColor: !isYearly ? Colors.darkBlueP1 : '#E5E7EB', paddingVertical: 10, paddingHorizontal: 24, borderRadius: 12, marginRight: 8 }}>
            <Text style={{ color: !isYearly ? '#fff' : '#374151', fontWeight: '600' }}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsYearly(true)} style={{ backgroundColor: isYearly ? Colors.darkBlueP1 : '#E5E7EB', paddingVertical: 10, paddingHorizontal: 24, borderRadius: 12 }}>
            <Text style={{ color: isYearly ? '#fff' : '#374151', fontWeight: '600' }}>Yearly</Text>
          </TouchableOpacity>
        </View>

        <Animated.FlatList
          data={plans}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + SPACING}
          decelerationRate="fast"
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
          onMomentumScrollEnd={(ev) => {
            const offsetX = ev.nativeEvent.contentOffset.x;
            const index = Math.round(offsetX / (CARD_WIDTH + SPACING));
            setSelectedPlan(plans[index].id);
          }}
          renderItem={({ item, index }) => {
            const inputRange = [(index - 1) * (CARD_WIDTH + SPACING), index * (CARD_WIDTH + SPACING), (index + 1) * (CARD_WIDTH + SPACING)];
            const scale = scrollX.interpolate({ inputRange, outputRange: [0.85, 1, 0.85], extrapolate: 'clamp' });
            const opacity = scrollX.interpolate({ inputRange, outputRange: [0.6, 1, 0.6], extrapolate: 'clamp' });
            const translateY = scrollX.interpolate({ inputRange, outputRange: [20, 0, 20], extrapolate: 'clamp' });

            return (
              <Animated.View style={[styles.card, { transform: [{ scale }, { translateY }], opacity, borderColor: selectedPlan === item.id ? item.color : '#E5E7EB', marginLeft: index === 0 ? SIDE_PADDING : SPACING / 2, marginRight: index === plans.length - 1 ? SIDE_PADDING : SPACING / 2 }]}>
                <TouchableOpacity activeOpacity={0.9} style={{ flex: 1 }} onPress={() => setSelectedPlan(item.id)}>
                  <View style={styles.iconWrap}><View style={{ backgroundColor: item.color + '20', padding: 12, borderRadius: 50 }}><Icon name={item.icon} size={28} color={item.color} /></View></View>
                  <Text style={styles.planName}>{item.name}</Text>
                  <Text style={styles.planDescription}>{item.description}</Text>
                  <Text style={styles.priceText}>${isYearly ? item.yearlyPrice : item.price}/{isYearly ? 'year' : 'month'}</Text>
                  {isYearly && <Text style={styles.saveText}>Save ${(item.price * 12 - item.yearlyPrice).toFixed(0)} yearly</Text>}
                  <View style={{ marginTop: 10 }}>{item.features.map(f => <View key={f} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}><Icon name="check-circle" size={18} color="#10B981" /><Text style={{ marginLeft: 8, color: '#374151' }}>{f}</Text></View>)}</View>
                  <TouchableOpacity style={[styles.subscribeBtn, { backgroundColor: selectedPlan === item.id ? item.color : '#9CA3AF' }]} disabled={selectedPlan !== item.id} onPress={() => handleSubscribe(item)}>
                    <Text style={styles.subscribeBtnText}>{selectedPlan === item.id ? 'Subscribe' : 'Choose Plan'}</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </Animated.View>
            );
          }}
        />

        <View style={{ paddingHorizontal: 20, marginTop: 25 }}>
          <Text style={{ fontSize: 16, color: '#374151', marginBottom: 8 }}>Benefits of our plans:</Text>
          <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>- Access daily content curated by experts.</Text>
          <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>- Online consultations included in Silver & above.</Text>
          <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>- Premium video consults for Platinum members.</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: { width: CARD_WIDTH, height: CARD_HEIGHT+80, backgroundColor: '#ffffffe8', borderRadius: 20, padding: 20, borderWidth: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 6 },
  iconWrap: { alignItems: 'center', marginBottom: 12 },
  planName: { fontSize: 20, fontWeight: '700', textAlign: 'center', color: '#111827' },
  planDescription: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 12 },
  priceText: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 6 },
  saveText: { fontSize: 13, color: '#10B981', textAlign: 'center', marginBottom: 8 },
  subscribeBtn: { marginTop: 'auto', paddingVertical: 14, borderRadius: 12 },
  subscribeBtnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  headerTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#1f2937', marginTop: 25, marginBottom: 25 },
});


// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   TouchableOpacity, 
//   StyleSheet, 
//   Animated, 
//   Dimensions, 
//   Alert, 
//   ScrollView,
//   StatusBar,
//   ImageBackground
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Toast from 'react-native-toast-message';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import Colors from '../constants/Colors';

// const { width, height } = Dimensions.get('window');
// const CARD_WIDTH = width * 0.85;
// const CARD_HEIGHT = height * 0.7;
// const SPACING = 30;
// const SIDE_PADDING = (width - CARD_WIDTH) / 2;

// interface SubscriptionPlan {
//   id: string;
//   name: string;
//   price: number;
//   yearlyPrice: number;
//   description: string;
//   features: string[];
//   color: string;
//   darkColor: string;
//   icon: string;
//   popular?: boolean;
//   emoji: string;
// }

// const plans: SubscriptionPlan[] = [
//   {
//     id: 'basic',
//     name: 'Starter',
//     price: 4.95,
//     yearlyPrice: 49.95,
//     description: 'Perfect for beginners',
//     features: ['Daily premium content', 'Basic analytics', 'Email support', 'Mobile app access'],
//     color: '#667eea',
//     darkColor: '#764ba2',
//     icon: 'rocket-launch',
//     emoji: '🚀'
//   },
//   {
//     id: 'silver',
//     name: 'Professional',
//     price: 9.95,
//     yearlyPrice: 99.95,
//     description: 'For serious users',
//     features: ['Everything in Starter', '4 consultations/month', 'Priority support', 'Advanced reports', 'API access'],
//     color: '#f093fb',
//     darkColor: '#f5576c',
//     icon: 'psychology',
//     emoji: '💎'
//   },
//   {
//     id: 'gold',
//     name: 'Enterprise',
//     price: 19.95,
//     yearlyPrice: 199.95,
//     description: 'Most popular choice',
//     features: ['Everything in Pro', 'Weekly consultations', 'Custom integrations', 'White-label solution', 'Dedicated manager', '24/7 phone support'],
//     color: '#4facfe',
//     darkColor: '#00f2fe',
//     icon: 'auto-awesome',
//     popular: true,
//     emoji: '⭐'
//   },
//   {
//     id: 'platinum',
//     name: 'Ultimate',
//     price: 39.95,
//     yearlyPrice: 399.95,
//     description: 'Everything you need',
//     features: ['Everything included', 'Unlimited consultations', 'Video calls', 'Personal concierge', 'Custom development', 'Premium onboarding'],
//     color: '#fa709a',
//     darkColor: '#fee140',
//     icon: 'workspace-premium',
//     emoji: '👑'
//   },
// ];

// export default function SubscriptionScreen() {
//   const [selectedPlan, setSelectedPlan] = useState<string>('gold');
//   const [isYearly, setIsYearly] = useState(true);
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(100)).current;
//   const pulseAnim = useRef(new Animated.Value(1)).current;
//   const navigation = useNavigation();
//   const route = useRoute();
//   const userId = route.params?.userId;

//   useEffect(() => {
//     // Entry animations
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1200,
//         useNativeDriver: true,
//       }),
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         tension: 50,
//         friction: 8,
//         useNativeDriver: true,
//       }),
//     ]).start();

//     // Continuous pulse animation for popular badge
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(pulseAnim, {
//           toValue: 1.1,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(pulseAnim, {
//           toValue: 1,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   }, []);

//   const handleSubscribe = async (plan: SubscriptionPlan) => {
//     const price = isYearly ? plan.yearlyPrice : plan.price;
//     const period = isYearly ? 'yearly' : 'monthly';

//     Alert.alert(
//       `${plan.emoji} Subscribe to ${plan.name}`,
//       `You're about to unlock ${plan.name} for $${price}/${period}. Ready to level up?`,
//       [
//         { text: 'Not Yet', style: 'cancel' },
//         {
//           text: `Let's Go! 🎉`,
//           style: 'default',
//           onPress: async () => {
//             console.log(`Subscribed to ${plan.name}`);
//             await AsyncStorage.setItem(`subscription_${userId}`, 'true');
//             navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
//           }
//         },
//       ]
//     );
//   };

//   const renderCard = ({ item, index }) => {
//     const inputRange = [
//       (index - 1) * (CARD_WIDTH + SPACING),
//       index * (CARD_WIDTH + SPACING),
//       (index + 1) * (CARD_WIDTH + SPACING)
//     ];

//     const scale = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.85, 1, 0.85],
//       extrapolate: 'clamp'
//     });

//     const rotateY = scrollX.interpolate({
//       inputRange,
//       outputRange: ['25deg', '0deg', '-25deg'],
//       extrapolate: 'clamp'
//     });

//     const translateX = scrollX.interpolate({
//       inputRange,
//       outputRange: [50, 0, -50],
//       extrapolate: 'clamp'
//     });

//     const isSelected = selectedPlan === item.id;

//     return (
//       <Animated.View
//         style={[
//           styles.cardWrapper,
//           {
//             transform: [
//               { scale },
//               { perspective: 1000 },
//               { rotateY },
//               { translateX }
//             ],
//             marginLeft: index === 0 ? SIDE_PADDING : SPACING / 2,
//             marginRight: index === plans.length - 1 ? SIDE_PADDING : SPACING / 2
//           }
//         ]}
//       >
//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={() => setSelectedPlan(item.id)}
//           style={styles.cardContainer}
//         >
//           {/* Glassmorphism Background */}
//           <LinearGradient
//             colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.1)']}
//             style={styles.glassBackground}
//           >
//             <LinearGradient
//               colors={[item.color, item.darkColor]}
//               style={[
//                 styles.gradientOverlay,
//                 { opacity: isSelected ? 0.9 : 0.7 }
//               ]}
//             >
//               {/* Popular Badge */}
//               {item.popular && (
//                 <Animated.View 
//                   style={[
//                     styles.popularBadge,
//                     { transform: [{ scale: pulseAnim }] }
//                   ]}
//                 >
//                   <LinearGradient
//                     colors={['#FF6B6B', '#FF8E53']}
//                     style={styles.badgeGradient}
//                   >
//                     <Text style={styles.popularText}>🔥 MOST POPULAR</Text>
//                   </LinearGradient>
//                 </Animated.View>
//               )}

//               {/* Header Section */}
//               <View style={styles.cardHeader}>
//                 <View style={styles.emojiContainer}>
//                   <Text style={styles.planEmoji}>{item.emoji}</Text>
//                 </View>
//                 <Text style={styles.planName}>{item.name}</Text>
//                 <Text style={styles.planDescription}>{item.description}</Text>
//               </View>

//               {/* Price Section */}
//               <View style={styles.priceSection}>
//                 <View style={styles.priceContainer}>
//                   <Text style={styles.currency}>$</Text>
//                   <Text style={styles.price}>
//                     {isYearly ? item.yearlyPrice : item.price}
//                   </Text>
//                 </View>
//                 <Text style={styles.period}>
//                   per {isYearly ? 'year' : 'month'}
//                 </Text>
                
//                 {isYearly && (
//                   <View style={styles.savingsContainer}>
//                     <Text style={styles.savingsText}>
//                       💰 Save ${(item.price * 12 - item.yearlyPrice).toFixed(0)}
//                     </Text>
//                   </View>
//                 )}
//               </View>

//               {/* Features Section */}
//               <View style={styles.featuresSection}>
//                 {item.features.map((feature, idx) => (
//                   <Animated.View 
//                     key={feature}
//                     style={[
//                       styles.featureItem,
//                       {
//                         opacity: fadeAnim,
//                         transform: [{
//                           translateX: slideAnim.interpolate({
//                             inputRange: [0, 100],
//                             outputRange: [0, (idx + 1) * 20]
//                           })
//                         }]
//                       }
//                     ]}
//                   >
//                     <View style={styles.checkIcon}>
//                       <Icon name="check" size={14} color="#FFFFFF" />
//                     </View>
//                     <Text style={styles.featureText}>{feature}</Text>
//                   </Animated.View>
//                 ))}
//               </View>

//               {/* CTA Button */}
//               <TouchableOpacity
//                 style={styles.ctaButton}
//                 onPress={() => handleSubscribe(item)}
//                 activeOpacity={0.8}
//               >
//                 <LinearGradient
//                   colors={isSelected 
//                     ? ['#FFFFFF', '#F0F0F0'] 
//                     : ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']
//                   }
//                   style={styles.buttonGradient}
//                 >
//                   <Text style={[
//                     styles.ctaText,
//                     { 
//                       color: isSelected ? item.color : '#FFFFFF',
//                       fontWeight: isSelected ? '800' : '600'
//                     }
//                   ]}>
//                     {isSelected ? `🚀 Choose ${item.name}` : 'Select Plan'}
//                   </Text>
//                 </LinearGradient>
//               </TouchableOpacity>

//               {/* Decorative Elements */}
//               <View style={styles.decorativeCircle1} />
//               <View style={styles.decorativeCircle2} />
//               <View style={styles.decorativeCircle3} />
//             </LinearGradient>
//           </LinearGradient>
//         </TouchableOpacity>
//       </Animated.View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
//       {/* Animated Background */}
//       <LinearGradient
//         colors={['#1a1a2e', '#16213e', '#0f3460']}
//         style={styles.backgroundGradient}
//       >
//         {/* Floating Elements */}
//         <View style={styles.floatingElement1} />
//         <View style={styles.floatingElement2} />
//         <View style={styles.floatingElement3} />
        
//         <ScrollView 
//           contentContainerStyle={styles.scrollContainer}
//           showsVerticalScrollIndicator={false}
//         >
//           {/* Header */}
//           <Animated.View 
//             style={[
//               styles.header,
//               {
//                 opacity: fadeAnim,
//                 transform: [{ translateY: slideAnim }]
//               }
//             ]}
//           >
//             <Text style={styles.headerTitle}>Choose Your{'\n'}Perfect Plan ✨</Text>
//             <Text style={styles.headerSubtitle}>
//               Unlock premium features and transform your experience
//             </Text>
//           </Animated.View>

//           {/* Period Toggle */}
//           <Animated.View 
//             style={[
//               styles.toggleSection,
//               {
//                 opacity: fadeAnim,
//                 transform: [{ translateY: slideAnim }]
//               }
//             ]}
//           >
//             <LinearGradient
//               colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
//               style={styles.toggleContainer}
//             >
//               <TouchableOpacity
//                 onPress={() => setIsYearly(false)}
//                 style={[
//                   styles.toggleOption,
//                   !isYearly && styles.toggleActive
//                 ]}
//               >
//                 {!isYearly && (
//                   <LinearGradient
//                     colors={['#667eea', '#764ba2']}
//                     style={styles.activeToggleBackground}
//                   />
//                 )}
//                 <Text style={[
//                   styles.toggleText,
//                   { color: !isYearly ? '#FFFFFF' : 'rgba(255,255,255,0.7)' }
//                 ]}>
//                   Monthly
//                 </Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity
//                 onPress={() => setIsYearly(true)}
//                 style={[
//                   styles.toggleOption,
//                   isYearly && styles.toggleActive
//                 ]}
//               >
//                 {isYearly && (
//                   <LinearGradient
//                     colors={['#667eea', '#764ba2']}
//                     style={styles.activeToggleBackground}
//                   />
//                 )}
//                 <Text style={[
//                   styles.toggleText,
//                   { color: isYearly ? '#FFFFFF' : 'rgba(255,255,255,0.7)' }
//                 ]}>
//                   Yearly
//                 </Text>
//                 <View style={styles.discountBadge}>
//                   <Text style={styles.discountText}>-20%</Text>
//                 </View>
//               </TouchableOpacity>
//             </LinearGradient>
//           </Animated.View>

//           {/* Plans Carousel */}
//           <Animated.FlatList
//             data={plans}
//             horizontal
//             keyExtractor={(item) => item.id}
//             showsHorizontalScrollIndicator={false}
//             snapToInterval={CARD_WIDTH + SPACING}
//             decelerationRate="fast"
//             contentContainerStyle={styles.carouselContainer}
//             onScroll={Animated.event(
//               [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//               { useNativeDriver: true }
//             )}
//             onMomentumScrollEnd={(ev) => {
//               const offsetX = ev.nativeEvent.contentOffset.x;
//               const index = Math.round(offsetX / (CARD_WIDTH + SPACING));
//               setSelectedPlan(plans[index].id);
//             }}
//             renderItem={renderCard}
//           />

//           {/* Trust Indicators */}
//           <Animated.View 
//             style={[
//               styles.trustSection,
//               {
//                 opacity: fadeAnim,
//                 transform: [{ translateY: slideAnim }]
//               }
//             ]}
//           >
//             <LinearGradient
//               colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
//               style={styles.trustContainer}
//             >
//               <Text style={styles.trustTitle}>🛡️ Trusted by 50,000+ users</Text>
              
//               <View style={styles.trustItems}>
//                 <View style={styles.trustItem}>
//                   <Text style={styles.trustEmoji}>⚡</Text>
//                   <Text style={styles.trustText}>Instant Setup</Text>
//                 </View>
//                 <View style={styles.trustItem}>
//                   <Text style={styles.trustEmoji}>🔒</Text>
//                   <Text style={styles.trustText}>Secure & Private</Text>
//                 </View>
//                 <View style={styles.trustItem}>
//                   <Text style={styles.trustEmoji}>💎</Text>
//                   <Text style={styles.trustText}>Premium Support</Text>
//                 </View>
//               </View>

//               <Text style={styles.guaranteeText}>
//                 30-day money-back guarantee • Cancel anytime
//               </Text>
//             </LinearGradient>
//           </Animated.View>
//         </ScrollView>
//       </LinearGradient>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backgroundGradient: {
//     flex: 1,
//   },
//   floatingElement1: {
//     position: 'absolute',
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     backgroundColor: 'rgba(102, 126, 234, 0.1)',
//     top: 100,
//     right: -50,
//   },
//   floatingElement2: {
//     position: 'absolute',
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     backgroundColor: 'rgba(240, 147, 251, 0.1)',
//     bottom: 200,
//     left: -30,
//   },
//   floatingElement3: {
//     position: 'absolute',
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: 'rgba(79, 172, 254, 0.1)',
//     top: 300,
//     left: 50,
//   },
//   scrollContainer: {
//     paddingBottom: 50,
//   },
//   header: {
//     alignItems: 'center',
//     paddingTop: 70,
//     paddingHorizontal: 30,
//     marginBottom: 40,
//   },
//   headerTitle: {
//     fontSize: 36,
//     fontWeight: '900',
//     textAlign: 'center',
//     color: '#FFFFFF',
//     marginBottom: 12,
//     lineHeight: 44,
//   },
//   headerSubtitle: {
//     fontSize: 18,
//     color: 'rgba(255,255,255,0.7)',
//     textAlign: 'center',
//     lineHeight: 26,
//   },
//   toggleSection: {
//     alignItems: 'center',
//     marginBottom: 40,
//     paddingHorizontal: 30,
//   },
//   toggleContainer: {
//     flexDirection: 'row',
//     borderRadius: 25,
//     padding: 6,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.2)',
//   },
//   toggleOption: {
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 20,
//     position: 'relative',
//     minWidth: 100,
//     alignItems: 'center',
//   },
//   toggleActive: {
//     // Active styles handled by gradient overlay
//   },
//   activeToggleBackground: {
//     ...StyleSheet.absoluteFillObject,
//     borderRadius: 20,
//   },
//   toggleText: {
//     fontSize: 16,
//     fontWeight: '700',
//     zIndex: 1,
//   },
//   discountBadge: {
//     position: 'absolute',
//     top: -8,
//     right: -8,
//     backgroundColor: '#FF6B6B',
//     borderRadius: 10,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//   },
//   discountText: {
//     color: '#FFFFFF',
//     fontSize: 10,
//     fontWeight: '800',
//   },
//   carouselContainer: {
//     paddingVertical: 30,
//   },
//   cardWrapper: {
//     width: CARD_WIDTH,
//     height: CARD_HEIGHT,
//   },
//   cardContainer: {
//     flex: 1,
//   },
//   glassBackground: {
//     flex: 1,
//     borderRadius: 30,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.2)',
//   },
//   gradientOverlay: {
//     flex: 1,
//     padding: 30,
//     position: 'relative',
//   },
//   popularBadge: {
//     position: 'absolute',
//     top: -15,
//     left: 20,
//     right: 20,
//     zIndex: 10,
//   },
//   badgeGradient: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     alignItems: 'center',
//   },
//   popularText: {
//     color: '#FFFFFF',
//     fontSize: 12,
//     fontWeight: '800',
//     letterSpacing: 1,
//   },
//   cardHeader: {
//     alignItems: 'center',
//     marginBottom: 30,
//     marginTop: 20,
//   },
//   emojiContainer: {
//     marginBottom: 16,
//   },
//   planEmoji: {
//     fontSize: 48,
//   },
//   planName: {
//     fontSize: 32,
//     fontWeight: '900',
//     color: '#FFFFFF',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   planDescription: {
//     fontSize: 16,
//     color: 'rgba(255,255,255,0.8)',
//     textAlign: 'center',
//   },
//   priceSection: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     alignItems: 'baseline',
//     marginBottom: 8,
//   },
//   currency: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#FFFFFF',
//   },
//   price: {
//     fontSize: 48,
//     fontWeight: '900',
//     color: '#FFFFFF',
//   },
//   period: {
//     fontSize: 16,
//     color: 'rgba(255,255,255,0.8)',
//     marginBottom: 12,
//   },
//   savingsContainer: {
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     borderRadius: 15,
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//   },
//   savingsText: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#FFFFFF',
//   },
//   featuresSection: {
//     flex: 1,
//     marginBottom: 25,
//   },
//   featureItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   checkIcon: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: 'rgba(255,255,255,0.3)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   featureText: {
//     fontSize: 15,
//     color: '#FFFFFF',
//     flex: 1,
//     lineHeight: 22,
//   },
//   ctaButton: {
//     borderRadius: 25,
//     overflow: 'hidden',
//     marginTop: 'auto',
//   },
//   buttonGradient: {
//     paddingVertical: 18,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   ctaText: {
//     fontSize: 18,
//     fontWeight: '800',
//   },
//   decorativeCircle1: {
//     position: 'absolute',
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     top: 50,
//     right: -20,
//   },
//   decorativeCircle2: {
//     position: 'absolute',
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     bottom: 100,
//     left: -10,
//   },
//   decorativeCircle3: {
//     position: 'absolute',
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: 'rgba(255,255,255,0.03)',
//     bottom: 200,
//     right: -30,
//   },
//   trustSection: {
//     paddingHorizontal: 30,
//     marginTop: 30,
//   },
//   trustContainer: {
//     borderRadius: 25,
//     padding: 30,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.1)',
//     alignItems: 'center',
//   },
//   trustTitle: {
//     fontSize: 20,
//     fontWeight: '800',
//     color: '#FFFFFF',
//     marginBottom: 25,
//     textAlign: 'center',
//   },
//   trustItems: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: 25,
//   },
//   trustItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   trustEmoji: {
//     fontSize: 28,
//     marginBottom: 8,
//   },
//   trustText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: 'rgba(255,255,255,0.8)',
//     textAlign: 'center',
//   },
//   guaranteeText: {
//     fontSize: 14,
//     color: 'rgba(255,255,255,0.6)',
//     textAlign: 'center',
//     lineHeight: 20,
//   },
// });