// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import React, { useEffect, useRef, useState } from "react";
// import { View, Text, ScrollView, Image, StyleSheet, Animated } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";
// import CommonSubscription from "../components/CommonSubscription";

// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../../firebaseConfig";

// export default function PatientDietScreen({ route }) {
//   const { item } = route.params;
//   const [loading, setLoading] = useState(true);
//   const [subcategories, setSubcategories] = useState([]);
//   const [hasSubscription, setHasSubscription] = useState(false);
//   const navigation = useNavigation();
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   // Skeleton loading animation
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//       Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   // Check subscription
//   useEffect(() => {
//     const checkSubscription = async () => {
//       const data = await AsyncStorage.getItem("subscriptionDetails");
//       if (data) {
//         const subscription = JSON.parse(data);
//         const now = new Date();
//         const expiry = new Date(subscription.expiryDate);
//         if (expiry > now) setHasSubscription(true);
//       }
//     };
//     checkSubscription();
//   }, []);

//   // Fetch subcategories from Firestore
//   useEffect(() => {
//     const fetchSubcategories = async () => {
//       if (!item?.id) return;
//       try {
//         const q = query(collection(db, "subcategories"), where("categoryId", "==", item.id));
//         const snapshot = await getDocs(q);
//         const subs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setSubcategories(subs);
//       } catch (error) {
//         console.log("Error fetching subcategories:", error);
//       }
//     };
//     fetchSubcategories();
//   }, [item]);

//   if (loading) {
//     return (
//       <LinearGradient colors={["#E0F7FA", "#F1F8E9"]} style={styles.container}>
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <SkeletonPlaceholder borderRadius={8}>
//             <SkeletonPlaceholder.Item width="100%" height={180} borderRadius={16} />
//             {Array.from({ length: 3 }).map((_, index) => (
//               <SkeletonPlaceholder.Item key={index} marginTop={20}>
//                 <SkeletonPlaceholder.Item width="100%" height={150} borderRadius={12} />
//                 <SkeletonPlaceholder.Item marginTop={10} width="60%" height={20} borderRadius={6} />
//                 <SkeletonPlaceholder.Item marginTop={6} width="90%" height={14} borderRadius={6} />
//                 <SkeletonPlaceholder.Item marginTop={6} width="85%" height={14} borderRadius={6} />
//               </SkeletonPlaceholder.Item>
//             ))}
//           </SkeletonPlaceholder>
//         </ScrollView>
//       </LinearGradient>
//     );
//   }

//   return (
//     <LinearGradient colors={["#f4fefff5", "#f9fff2f6"]} style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {hasSubscription && <Animated.Text style={[styles.screenTitle, { opacity: fadeAnim }]}>{item.title} - Details</Animated.Text>}

//         {!hasSubscription ? (
//           <CommonSubscription />
//         ) : (
//           (subcategories || []).map(sub => (
//             <Animated.View key={sub.id} style={{ opacity: fadeAnim }}>
//               <View style={styles.card}>
//                 <Image source={{ uri: sub.image }} style={styles.cardImage} />
//                 <Text style={styles.cardTitle}>{sub.title}</Text>
//                 <Text style={styles.cardDescription}>{sub.shortDescription}</Text>
//                 <View style={styles.contentSection}>
//                   {(sub.detailedContent || []).map((line, index) => (
//                     <Text key={index} style={styles.contentText}>• {line}</Text>
//                   ))}
//                 </View>
//               </View>
//             </Animated.View>
//           ))
//         )}
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 15 },
//   screenTitle: { fontSize: 28, fontWeight: "700", color: "#0D3B66", marginBottom: 16, textAlign: "center" },
//   card: { backgroundColor: "#fff", borderRadius: 16, marginBottom: 20, padding: 15 },
//   cardImage: { width: "100%", height: 160, borderRadius: 12 },
//   cardTitle: { fontSize: 22, fontWeight: "700", marginTop: 12, color: "#0D3B66" },
//   cardDescription: { fontSize: 16, marginTop: 6, color: "#37474F" },
//   contentSection: { marginTop: 10 },
//   contentText: { fontSize: 15, lineHeight: 22, color: "#37474F", marginBottom: 4 },
// });

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CommonSubscription from "../components/CommonSubscription";

export default function PatientDietScreen({ route }) {
  const { item } = route.params; // category object from CategoryGrid
  const [hasSubscription, setHasSubscription] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, []);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const data = await AsyncStorage.getItem("subscriptionDetails");
        if (data) {
          const subscription = JSON.parse(data);
          if (new Date(subscription.expiryDate) > new Date()) setHasSubscription(true);
        }
      } catch (err) {
        console.log("Error checking subscription:", err.message);
      }
    };
    checkSubscription();
  }, []);

  // Use subcategories from item
  const subcategories = item?.subcategories || []; 
// console.log(":::::::::SYGG::::::",subcategories);

  return (
    <LinearGradient colors={["#f4fefff5", "#f9fff2f6"]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {hasSubscription && (
          <Animated.Text style={[styles.screenTitle, { opacity: fadeAnim }]}>
            {item.title} - Details
          </Animated.Text>
        )}

        {!hasSubscription ? (
          <CommonSubscription />
        ) : (
          subcategories.map((sub,index) => (
            <Animated.View key={index} style={{ opacity: fadeAnim }}>
              <View style={styles.card}>
                <Image source={{ uri: sub.image }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{sub.title}</Text>
                <Text style={styles.cardDescription}>{sub.shortDescription}</Text>
                <View style={styles.contentSection}>
                  {(sub.detailedContent || []).map((line, index) => (
                    <Text key={index} style={styles.contentText}>• {line}</Text>
                  ))}
                </View>
              </View>
            </Animated.View>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  screenTitle: { fontSize: 28, fontWeight: "700", color: "#0D3B66", marginBottom: 16, textAlign: "center" },
  card: { backgroundColor: "#fff", borderRadius: 16, marginBottom: 20, padding: 15 },
  cardImage: { width: "100%", height: 160, borderRadius: 12 },
  cardTitle: { fontSize: 22, fontWeight: "700", marginTop: 12, color: "#0D3B66" },
  cardDescription: { fontSize: 16, marginTop: 6, color: "#37474F" },
  contentSection: { marginTop: 10 },
  contentText: { fontSize: 15, lineHeight: 22, color: "#37474F", marginBottom: 4 },
});
