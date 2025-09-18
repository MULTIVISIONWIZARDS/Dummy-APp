// // // CategoryDetailScreen.js
// // import React from "react";
// // import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
// // import Colors from "../constants/Colors";
// // import LinearGradient from "react-native-linear-gradient";


// // export default function CategoryDetailScreen({ route }) {
// //   const { item } = route.params; // receive the category item

// //   // Map each category to a remote image URL
// // const imageMap = {
// //   Diet: "https://westernnews.media.clients.ellingtoncms.com/img/photos/2018/08/09/Balanced-Diet.jpg",
// //   Exercise: "https://img.freepik.com/free-photo/sport-lifestyle-fitness-male-training_1139-724.jpg?semt=ais_hybrid",
// //   Hormones: "https://media.istockphoto.com/photos/text-hormones-of-colored-wooden-letters-stethoscope-and-pills-picture-id651798282?k=6&m=651798282&s=612x612&w=0&h=NzBIkGBhzOx2BfzZTyo9vegAaYJu3Ypwk9lYBTtv3rU=",
// //   Supplements: "https://static.vecteezy.com/system/resources/thumbnails/021/394/177/small_2x/alternative-medicine-herbal-organic-capsule-with-vitamin-e-omega-3-fish-oil-mineral-drug-with-herbs-leaf-natural-supplements-for-healthy-good-life-free-photo.jpg",
// //   Sleep: "https://images.unsplash.com/photo-1549388604-817d15aa0110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
// //   Stress: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
// //   Mindfulness: "https://th.bing.com/th/id/OIP.JDAfo0L0AasM4RK0lScAhAHaE7?w=288&h=192&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
// //   Hydration: "https://tse3.mm.bing.net/th/id/OIP.Mhwbepap9URJjVmL0hDugAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
// // };

// //   return (
// //       <LinearGradient  colors={["#E0F7FA", "#F1F8E9"]} style={styles.container}>
// //     <ScrollView  showsVerticalScrollIndicator={false}>
// //       <Image
// //         source={{ uri: imageMap[item.title] }}
// //         style={styles.banner}
// //         resizeMode="cover"
// //       />
// //       <Text style={styles.title}>{item.title}</Text>
// //       <Text style={styles.content}>
// //         {item.description}
// //       </Text>
// //       <Text style={styles.content}>
// //         {item.detailedContent}
// //       </Text>
// //     </ScrollView>
// //       </LinearGradient>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: "#fff", padding: 16 },
// //   banner: { width: "100%", height: 200, borderRadius: 12, marginBottom: 16 },
// //   title: { fontSize: 24, fontWeight: "700", marginBottom: 12, color: Colors.darkBlueP1 },
// //   content: { fontSize: 16, lineHeight: 24, color: "#333" },
// // });

// import React, { useRef, useEffect, useState } from "react";
// import { View, Text, Image, ScrollView, StyleSheet, Animated } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import Colors from "../constants/Colors";
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";

// export default function CategoryDetailScreen({ route }) {
//   const { item } = route.params;
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const [loading, setLoading] = useState(true);
//   // useEffect(() => {
//   //   Animated.timing(fadeAnim, {
//   //     toValue: 1,
//   //     duration: 800,
//   //     useNativeDriver: true,
//   //   }).start();
//   // }, []);
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }).start();
//     }, 1500); // 1.5s skeleton before content shows

//     return () => clearTimeout(timer);
//   }, []);
//   const imageMap = {
//     Diet: "https://westernnews.media.clients.ellingtoncms.com/img/photos/2018/08/09/Balanced-Diet.jpg",
//     Exercise: "https://img.freepik.com/free-photo/sport-lifestyle-fitness-male-training_1139-724.jpg?semt=ais_hybrid",
//     Hormones: "https://media.istockphoto.com/photos/text-hormones-of-colored-wooden-letters-stethoscope-and-pills-picture-id651798282?k=6&m=651798282&s=612x612&w=0&h=NzBIkGBhzOx2BfzZTyo9vegAaYJu3Ypwk9lYBTtv3rU=",
//     Supplements: "https://static.vecteezy.com/system/resources/thumbnails/021/394/177/small_2x/alternative-medicine-herbal-organic-capsule-with-vitamin-e-omega-3-fish-oil-mineral-drug-with-herbs-leaf-natural-supplements-for-healthy-good-life-free-photo.jpg",
//     Sleep: "https://images.unsplash.com/photo-1549388604-817d15aa0110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
//     Stress: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
//     Mindfulness: "https://th.bing.com/th/id/OIP.JDAfo0L0AasM4RK0lScAhAHaE7?w=288&h=192&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
//     Hydration: "https://tse3.mm.bing.net/th/id/OIP.Mhwbepap9URJjVmL0hDugAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
//   };

// if (loading) {
//   return (
//     <LinearGradient colors={["#E0F7FA", "#F1F8E9"]} style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <SkeletonPlaceholder borderRadius={8}>
//           {/* Banner */}
//           <SkeletonPlaceholder.Item width={"100%"} height={160} borderRadius={16} />

//           {/* Title */}
//           <SkeletonPlaceholder.Item marginTop={12} width={180} height={28} borderRadius={6} />

//           {/* Generate multiple paragraphs */}
//           {Array.from({ length: 5 }).map((_, index) => (
//             <SkeletonPlaceholder.Item key={index} marginTop={20}>
//               <SkeletonPlaceholder.Item width={"100%"} height={18} borderRadius={6} />
//               <SkeletonPlaceholder.Item marginTop={8} width={"95%"} height={18} borderRadius={6} />
//               <SkeletonPlaceholder.Item marginTop={8} width={"92%"} height={18} borderRadius={6} />
//               <SkeletonPlaceholder.Item marginTop={8} width={"88%"} height={18} borderRadius={6} />
//             </SkeletonPlaceholder.Item>
//           ))}
//         </SkeletonPlaceholder>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

//   return (
//     <LinearGradient colors={["#f4fefff5", "#f9fff2f6"]} style={styles.container}>
//     {/* <LinearGradient colors={["#f7fefff8", "#fcfff8f6"]} style={styles.container}> */}
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <Animated.Image
//           source={{ uri: imageMap[item.title] }}
//           style={[styles.banner, { opacity: fadeAnim }]}
//           resizeMode="cover"
//         />
//         <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
//           {item.title}
//         </Animated.Text>
//         <Animated.View style={{ opacity: fadeAnim }}>
//           <Text style={styles.content}>{item.description}</Text>
//           <Text style={styles.content}>{item.detailedContent}</Text>
//         </Animated.View>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     //paddingTop: 10,
//     backgroundColor:"red"
//   },
//   banner: {
//     width: "100%",
//     height: 160,
//     borderRadius: 16,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "700",
//     color: Colors.darkBlueP1,
//    // marginBottom: 12,
//   },
//   content: {
//     fontSize: 18,
//     lineHeight: 28,
//     color: "#37474F",
//     //marginBottom: 16,
//   },
// });



import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Button,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function PatientDietScreen({ route }) {
  const { item } = route.params; // category object
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [hasSubscription, setHasSubscription] = useState(false);

  // Skeleton loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Check subscription status
  useEffect(() => {
    const checkSubscription = async () => {
      const data = await AsyncStorage.getItem("subscriptionDetails");
      if (data) {
        const subscription = JSON.parse(data);
        const now = new Date();
        const expiry = new Date(subscription.expiryDate);
        if (expiry > now) {
          setHasSubscription(true);
        }
      }
    };
    checkSubscription();
  }, []);

  if (loading) {
    return (
      <LinearGradient colors={["#E0F7FA", "#F1F8E9"]} style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SkeletonPlaceholder borderRadius={8}>
            <SkeletonPlaceholder.Item width="100%" height={180} borderRadius={16} />
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonPlaceholder.Item key={index} marginTop={20}>
                <SkeletonPlaceholder.Item width="100%" height={150} borderRadius={12} />
                <SkeletonPlaceholder.Item marginTop={10} width="60%" height={20} borderRadius={6} />
                <SkeletonPlaceholder.Item marginTop={6} width="90%" height={14} borderRadius={6} />
                <SkeletonPlaceholder.Item marginTop={6} width="85%" height={14} borderRadius={6} />
              </SkeletonPlaceholder.Item>
            ))}
          </SkeletonPlaceholder>
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#f4fefff5", "#f9fff2f6"]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.Text style={[styles.screenTitle, { opacity: fadeAnim }]}>
          {item.title} - Details
        </Animated.Text>

        {!hasSubscription ? (
          // If user does NOT have subscription, only show Unlock button
          <View style={{ marginTop: 50, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={() => navigation.navigate("Subscription")}
            >
              <Text style={styles.subscribeText}>Unlock Full Plan</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // If user has subscription, show full content
          item.subcategories.map((sub) => (
            <Animated.View key={sub.id} style={{ opacity: fadeAnim }}>
              <View style={styles.card}>
                <Image source={{ uri: sub.image }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{sub.title}</Text>
                <Text style={styles.cardDescription}>{sub.shortDescription}</Text>

                {/* Expandable Section */}
                <View style={styles.contentSection}>
                  {sub.detailedContent.map((line, index) => (
                    <Text key={index} style={styles.contentText}>
                      • {line}
                    </Text>
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
  container: {
    flex: 1,
    padding: 15,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0D3B66",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 20,
    padding: 15,
  },
  cardImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 12,
    color: "#0D3B66",
  },
  cardDescription: {
    fontSize: 16,
    marginTop: 6,
    color: "#37474F",
  },
  contentSection: {
    marginTop: 10,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#37474F",
    marginBottom: 4,
  },
  subscribeButton: {
    marginTop: 12,
    backgroundColor: "#34d399",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: "center",
  },
  subscribeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});
