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
// import { useNavigation } from '@react-navigation/native';
// import { AuthStackRoutes } from '../navigation/Routes';

// // Enable LayoutAnimation on Android
// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// const SubscriptionandFeature = () => {
//   const [expanded, setExpanded] = useState<string | null>(null);
//   const [subscription, setSubscription] = useState<any>(null);
//   const navigation = useNavigation();

//   // Restore last expanded tier + subscription details
//   useEffect(() => {
//     (async () => {
//       const saved = await AsyncStorage.getItem('last_expanded_tier');
//       if (saved) setExpanded(saved);

//       try {
//         const subData = await AsyncStorage.getItem('subscriptionDetails');
//         if (subData) {
//           const parsed = JSON.parse(subData);
//           // check expiry
//           if (parsed.expiryDate && new Date(parsed.expiryDate) > new Date()) {
//             setSubscription(parsed);
//           } else {
//             setSubscription(null); // expired
//           }
//         }
//       } catch (e) {
//         console.log('Invalid subscription data:', e);
//         setSubscription(null);
//       }
//     })();
//   }, []);

//   const tiers = [
//     {
//       id: 'basic',
//       name: 'Basic',
//       price: '$9.95',
//       description: 'Informational only',
//       features: ['Access to informational content'],
//     },
//     {
//       id: 'silver',
//       name: 'Silver',
//       price: '$19.95',
//       description:
//         'Informational + 1 online consult per month via text (response within 24 hrs)',
//       features: [
//         'Access to informational content',
//         '1 online consult per month via text',
//         'Response within 24 hrs',
//         'Covers up to 3 questions/scenarios',
//       ],
//     },
//     {
//       id: 'gold',
//       name: 'Gold',
//       price: '$29.95',
//       description:
//         'Informational + 1 online consult per week via text (response within 24 hrs)',
//       features: [
//         'Access to informational content',
//         '1 online consult per week via text',
//         'Response within 24 hrs',
//         'Covers up to 3 questions/scenarios',
//       ],
//     },
//     {
//       id: 'platinum',
//       name: 'Platinum',
//       price: '$49.95',
//       description:
//         'Informational + weekly online consults + monthly face-to-face consult (30 mins)',
//       features: [
//         'Access to informational content',
//         '1 online consult per week via text',
//         'Response within 24 hrs',
//         'Covers up to 3 questions/scenarios',
//         '1 face-to-face consult per month (30 minutes)',
//         'Must be scheduled 1 week in advance',
//       ],
//     },
//   ];

//   const toggleExpand = async (key: string) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     const newKey = expanded === key ? null : key;
//     setExpanded(newKey);
//     await AsyncStorage.setItem('last_expanded_tier', newKey ?? '');
//   };

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       {/* Active Subscription */}
//       {subscription ? (
//         <View style={styles.activeCard}>
//           <Text style={styles.activeTitle}>Your Active Plan</Text>
//           <Text style={styles.activeText}>Plan: {subscription.planName}</Text>
//           <Text style={styles.activeText}>
//             Start Date: {new Date(subscription.startDate).toDateString()}
//           </Text>
//           <Text style={styles.activeText}>
//             Expiry Date: {new Date(subscription.expiryDate).toDateString()}
//           </Text>
//         </View>
//       ) : (
//         <TouchableOpacity
//   style={styles.activeCard}
//   onPress={() => navigation.navigate(AuthStackRoutes.Subscription)}
//   activeOpacity={0.8}
// >
//   <Text style={styles.activeTitle}>No Active Subscription</Text>
//   <Text style={styles.activeText}>
//     🚀 Upgrade now to enjoy unlimited access!{"\n"}
//     Tap here to view available plans.
//   </Text>
//   <View style={styles.ctaButton}>
//     <Text style={styles.ctaText}>View Plans</Text>
//   </View>
  
// </TouchableOpacity>

//       )}

//       {/* All Plans */}
//       {tiers.map((tier, index) => {
//         const key = `${index}`;
//         const isExpanded = expanded === key;
//         return (
//           <View key={key} style={styles.card}>
//             <TouchableOpacity activeOpacity={0.8} onPress={() => toggleExpand(key)}>
//               <View style={styles.tierHeader}>
//                 <Text style={styles.tierName}>{tier.name}</Text>
//                 <Text
//                   style={[
//                     styles.tierPrice,
//                     tier.name === 'Platinum' && { marginRight: 26 },
//                     tier.name === 'Gold' && { marginLeft: 10 },
//                   ]}
//                 >
//                   {tier.price}
//                 </Text>
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
//             <View style={styles.contactCard}>
//         <Text style={styles.contactTitle}>Need more information?</Text>
//         <Text style={styles.contactText}>Email: vinwithjenn@yahoo.com</Text>
//         {/* <Text style={styles.contactText}>Phone: +1 (800) 123-4567</Text> */}
//         <Text style={styles.contactText}>
//           Privacy Policy: Your data is securely stored and only used for educational and consult purposes.
//         </Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F7F8FA', padding: 16 },
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
//   activeCard: {
//     backgroundColor: '#E6F7FF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 20,
//     borderLeftWidth: 4,
//     borderLeftColor: Colors.darkBlueP1,
//   },
//   activeTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginBottom: 6,
//     color: Colors.darkBlueP1,
//   },
//   activeText: { fontSize: 14, color: '#333', marginBottom: 4 },
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
//   ctaButton: {
//   backgroundColor: "#fff",
//   paddingVertical: 10,
//   paddingHorizontal: 20,
//   borderRadius: 25,
// },
// ctaText: {
//   color:Colors.darkBlueP1,
//   fontSize: 15,
//   fontWeight: "600",
// },
// });

// export default SubscriptionandFeature;







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

import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { AuthStackRoutes } from '../navigation/Routes';
import API from '../utils/apiClient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PLANS_CACHE_KEY = 'cached_subscription_plans_v1';

const SubscriptionandFeature = () => {
  const navigation = useNavigation();

  const [expanded, setExpanded] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load active subscription
  const loadSubscription = async () => {
    try {
      const res = await API.get('/subscriptions/my-subscription');

      if (res.data?.success && res.data?.data) {
        const sub = res.data.data;
        const isValid =
          sub.isActive && new Date(sub.endDate) > new Date();

        setSubscription(isValid ? sub : null);
      } else {
        setSubscription(null);
      }
    } catch (e) {
      console.log('Subscription error:', e);
      setSubscription(null);
    }
  };

  // 🔹 Fetch plans with cache
  const fetchPlans = async () => {
    try {
      const cached = await AsyncStorage.getItem(PLANS_CACHE_KEY);
      if (cached) {
        setPlans(JSON.parse(cached));
        return;
      }

      const res = await API.get('/subscriptions');
      if (res.data?.success && Array.isArray(res.data.data)) {
        setPlans(res.data.data);
        await AsyncStorage.setItem(
          PLANS_CACHE_KEY,
          JSON.stringify(res.data.data)
        );
      } else {
        setPlans([]);
      }
    } catch (e) {
      console.log('Plans error:', e);
      setPlans([]);
    }
  };

  // 🔹 Load everything once
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([loadSubscription(), fetchPlans()]);
      setLoading(false);
    };
    init();
  }, []);

  // 🔹 Expand / collapse
  const toggleExpand = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => (prev === key ? null : key));
  };

  const activePlanId = subscription?.subscription?._id;

  // 🔹 Skeleton
  const SubscriptionSkeleton = () => (
    <SkeletonPlaceholder backgroundColor="#E1E9EE" highlightColor="#F2F8FC">
      <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 20, flexDirection: 'row' }}>
        <View style={{ width: 4, marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <View style={{ width: 140, height: 16, borderRadius: 4 }} />
          <View style={{ height: 10 }} />
          <View style={{ width: 90, height: 12, borderRadius: 4 }} />
          <View style={{ height: 6 }} />
          <View style={{ width: 160, height: 12, borderRadius: 4 }} />
        </View>
      </View>

      {[1, 2, 3, 4].map(i => (
        <View
          key={i}
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ width: 90, height: 14, borderRadius: 4 }} />
          </View>
          <View style={{ width: 60, height: 14, borderRadius: 4 }} />
          <View style={{ width: 22, height: 22, borderRadius: 11, marginLeft: 16 }} />
        </View>
      ))}
    </SkeletonPlaceholder>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {loading ? (
        <SubscriptionSkeleton />
      ) : (
        <>
          {/* Active Subscription */}
          {subscription ? (
            <View style={styles.activeCard}>
              <Text style={styles.activeTitle}>Your Active Plan</Text>
              <Text style={styles.activeText}>
                Plan: {subscription.subscription.name}
              </Text>
              <Text style={styles.activeText}>
                Start Date: {new Date(subscription.startDate).toDateString()}
              </Text>
              <Text style={styles.activeText}>
                Expiry Date: {new Date(subscription.endDate).toDateString()}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.activeCard}
              onPress={() => navigation.navigate(AuthStackRoutes.Subscription)}
            >
              <Text style={styles.activeTitle}>No Active Subscription</Text>
              <Text style={styles.activeText}>
                🚀 Upgrade now to enjoy unlimited access!
              </Text>
            </TouchableOpacity>
          )}

          {/* Plans */}
        
          {plans.map(plan => {
  const isExpanded = expanded === plan._id;
  const isActive = plan._id === activePlanId;

  return (
    <View
      key={plan._id}
      style={[
        styles.card
      ]}
    >
      {/* HEADER */}
      <TouchableOpacity
        onPress={() => toggleExpand(plan._id)}
        activeOpacity={0.8}
      >
        <View style={styles.tierHeader}>
          <Text style={styles.tierName}>{plan.name}</Text>

          <Text style={styles.tierPrice}>${plan.price}</Text>

         
            <Text style={styles.arrow}>{isExpanded ? '−' : '+'}</Text>
          
          
        </View>
      </TouchableOpacity>

      {/* ACTIVE LABEL */}
    {isActive && (
  <View style={styles.activeBadge}>
    <Text style={styles.activeBadgeText}>CURRENT PLAN</Text>
  </View>
)}


      {/* FEATURES (NOW WORKS FOR ACTIVE PLAN TOO) */}
      {isExpanded &&
        plan.features?.map((f: string, i: number) => (
          <Text key={i} style={styles.feature}>
            • {f}
          </Text>
        ))}
    </View>
  );
})}

        </>
      )}
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
    elevation: 2,
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tierName: { fontSize: 18, fontWeight: '600', color: Colors.darkBlueP1 },
  tierPrice: { fontSize: 16, fontWeight: '500' },
  arrow: { fontSize: 24, color: Colors.darkBlueP1 },
  feature: { marginTop: 8, fontSize: 14 },
  activeCard: {
    backgroundColor: '#E6F7FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: Colors.darkBlueP1,
  },
  activeTitle: { fontSize: 18, fontWeight: '700', color: Colors.darkBlueP1 },
  activeText: { fontSize: 14 },
  activePlanCard: {
    borderWidth: 1,
    borderColor: Colors.dark_yellow,
    backgroundColor: '#F0F8FF',
  },
 
  activePlanText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.bg_orange,
  },
  activeBadge: {
  backgroundColor: "#E8F5E9",
  paddingHorizontal: 2,
  paddingVertical: 4,
  borderRadius: 12,
  alignSelf: "flex-start",
},
activeBadgeText: {
  color: "#2E7D32",
  fontSize: 12,
  fontWeight: "600",
},

});

export default SubscriptionandFeature;
