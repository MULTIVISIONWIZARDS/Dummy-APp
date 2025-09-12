// // CategoryDetailScreen.js
// import React from "react";
// import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
// import Colors from "../constants/Colors";
// import LinearGradient from "react-native-linear-gradient";


// export default function CategoryDetailScreen({ route }) {
//   const { item } = route.params; // receive the category item

//   // Map each category to a remote image URL
// const imageMap = {
//   Diet: "https://westernnews.media.clients.ellingtoncms.com/img/photos/2018/08/09/Balanced-Diet.jpg",
//   Exercise: "https://img.freepik.com/free-photo/sport-lifestyle-fitness-male-training_1139-724.jpg?semt=ais_hybrid",
//   Hormones: "https://media.istockphoto.com/photos/text-hormones-of-colored-wooden-letters-stethoscope-and-pills-picture-id651798282?k=6&m=651798282&s=612x612&w=0&h=NzBIkGBhzOx2BfzZTyo9vegAaYJu3Ypwk9lYBTtv3rU=",
//   Supplements: "https://static.vecteezy.com/system/resources/thumbnails/021/394/177/small_2x/alternative-medicine-herbal-organic-capsule-with-vitamin-e-omega-3-fish-oil-mineral-drug-with-herbs-leaf-natural-supplements-for-healthy-good-life-free-photo.jpg",
//   Sleep: "https://images.unsplash.com/photo-1549388604-817d15aa0110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
//   Stress: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
//   Mindfulness: "https://th.bing.com/th/id/OIP.JDAfo0L0AasM4RK0lScAhAHaE7?w=288&h=192&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
//   Hydration: "https://tse3.mm.bing.net/th/id/OIP.Mhwbepap9URJjVmL0hDugAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
// };

//   return (
//       <LinearGradient  colors={["#E0F7FA", "#F1F8E9"]} style={styles.container}>
//     <ScrollView  showsVerticalScrollIndicator={false}>
//       <Image
//         source={{ uri: imageMap[item.title] }}
//         style={styles.banner}
//         resizeMode="cover"
//       />
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.content}>
//         {item.description}
//       </Text>
//       <Text style={styles.content}>
//         {item.detailedContent}
//       </Text>
//     </ScrollView>
//       </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 16 },
//   banner: { width: "100%", height: 200, borderRadius: 12, marginBottom: 16 },
//   title: { fontSize: 24, fontWeight: "700", marginBottom: 12, color: Colors.darkBlueP1 },
//   content: { fontSize: 16, lineHeight: 24, color: "#333" },
// });

import React, { useRef, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../constants/Colors";

export default function CategoryDetailScreen({ route }) {
  const { item } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const imageMap = {
    Diet: "https://westernnews.media.clients.ellingtoncms.com/img/photos/2018/08/09/Balanced-Diet.jpg",
    Exercise: "https://img.freepik.com/free-photo/sport-lifestyle-fitness-male-training_1139-724.jpg?semt=ais_hybrid",
    Hormones: "https://media.istockphoto.com/photos/text-hormones-of-colored-wooden-letters-stethoscope-and-pills-picture-id651798282?k=6&m=651798282&s=612x612&w=0&h=NzBIkGBhzOx2BfzZTyo9vegAaYJu3Ypwk9lYBTtv3rU=",
    Supplements: "https://static.vecteezy.com/system/resources/thumbnails/021/394/177/small_2x/alternative-medicine-herbal-organic-capsule-with-vitamin-e-omega-3-fish-oil-mineral-drug-with-herbs-leaf-natural-supplements-for-healthy-good-life-free-photo.jpg",
    Sleep: "https://images.unsplash.com/photo-1549388604-817d15aa0110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    Stress: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    Mindfulness: "https://th.bing.com/th/id/OIP.JDAfo0L0AasM4RK0lScAhAHaE7?w=288&h=192&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
    Hydration: "https://tse3.mm.bing.net/th/id/OIP.Mhwbepap9URJjVmL0hDugAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
  };

  return (
    <LinearGradient colors={["#E0F7FA", "#F1F8E9"]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.Image
          source={{ uri: imageMap[item.title] }}
          style={[styles.banner, { opacity: fadeAnim }]}
          resizeMode="cover"
        />
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
          {item.title}
        </Animated.Text>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.content}>{item.description}</Text>
          <Text style={styles.content}>{item.detailedContent}</Text>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    //paddingTop: 10,
    backgroundColor:"red"
  },
  banner: {
    width: "100%",
    height: 160,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.darkBlueP1,
   // marginBottom: 12,
  },
  content: {
    fontSize: 18,
    lineHeight: 28,
    color: "#37474F",
    //marginBottom: 16,
  },
});
