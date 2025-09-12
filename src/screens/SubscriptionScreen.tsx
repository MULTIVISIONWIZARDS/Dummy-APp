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

interface SubscriptionPlan { id: string; name: string; price: number; yearlyPrice: number; description: string; features: string[]; color: string; icon: string; }
const plans: SubscriptionPlan[] = [
  { id: 'basic', name: 'Basic', price: 4.95, yearlyPrice: 49.95, description: 'Perfect for getting started', features: ['Daily informational content'], color: '#6B7280', icon: 'shield' },
  { id: 'silver', name: 'Silver', price: 9.95, yearlyPrice: 99.95, description: 'Great for regular users', features: ['Daily content', '1 online consult / month'], color: '#3B82F6', icon: 'military-tech' },
  { id: 'gold', name: 'Gold', price: 19.95, yearlyPrice: 199.95, description: 'Best value for professionals', features: ['Daily content', '1 online consult / week'], color: '#dbba00ff', icon: 'star' },
  { id: 'platinum', name: 'Platinum', price: 39.95, yearlyPrice: 399.95, description: 'All-inclusive premium plan', features: ['Daily content','1 online consult / week','1 video consult / month'], color: '#8B5CF6', icon: 'diamond' },
];

export default function SubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState<string>('basic');
  const [isYearly, setIsYearly] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const route = useRoute();
  const userId = route.params?.userId;

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    const price = isYearly ? plan.yearlyPrice : plan.price;
    const period = isYearly ? 'yearly' : 'monthly';

    Alert.alert('Subscribe to ' + plan.name, `You're about to subscribe to ${plan.name} plan for $${price}/${period}.`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Continue', style: 'default', onPress: async () => {
          console.log(`Subscribed to ${plan.name}`);
          await AsyncStorage.setItem(`subscription_${userId}`, 'true');
         // Toast.show({ type: 'success', text1: 'Subscription Successful', text2: `You have subscribed to the ${plan.name} plan!` });
          navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
        }
      },
    ]);
  };

  return (
    <LinearGradient colors={['#dbd6d6ff', '#e3d1e4ff', '#f9b7ffff']} style={{ flex: 1 }}>
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
  card: { width: CARD_WIDTH, height: CARD_HEIGHT, backgroundColor: '#fff4ffe8', borderRadius: 20, padding: 20, borderWidth: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 6 },
  iconWrap: { alignItems: 'center', marginBottom: 12 },
  planName: { fontSize: 20, fontWeight: '700', textAlign: 'center', color: '#111827' },
  planDescription: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 12 },
  priceText: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 6 },
  saveText: { fontSize: 13, color: '#10B981', textAlign: 'center', marginBottom: 8 },
  subscribeBtn: { marginTop: 'auto', paddingVertical: 14, borderRadius: 12 },
  subscribeBtnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  headerTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#1f2937', marginTop: 25, marginBottom: 25 },
});
