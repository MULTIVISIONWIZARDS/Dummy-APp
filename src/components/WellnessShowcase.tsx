// import React from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";

// const wellnessData = [
//   {
//     id: "diet",
//     icon: "🥗",
//     color: "#10B981",
//     title: "Diet",
//     subtitle: "Palm-sized protein + half plate veggies.",
//     detail: "Avoid: Sugary cereals. Myth: Carbs at night cause fat gain (❌).",
//   },
//   {
//     id: "exercise",
//     icon: "💪",
//     color: "#3B82F6",
//     title: "Exercise",
//     subtitle: "Routine: 3 min warm-up, 3× circuit, stretch.",
//     detail: "Challenge: 10 push-ups today 💥",
//   },
//   {
//     id: "hormones",
//     icon: "🧬",
//     color: "#8B5CF6",
//     title: "Hormones",
//     subtitle: "Cortisol helps manage stress & energy.",
//     detail: "Balanced by sleep, movement & relaxation.",
//   },
//   {
//     id: "supplements",
//     icon: "💊",
//     color: "#F59E0B",
//     title: "Supplements",
//     subtitle: "Vitamin D ☀️ supports immunity.",
//     detail: "Many adults are low; sunlight & testing help.",
//   },
// ];

// const Widget = ({ icon, color, title, subtitle, detail }: any) => (
//   <View style={[styles.widget, { borderLeftColor: color }]}>
//     <Text style={styles.icon}>{icon}</Text>
//     <View style={styles.content}>
//       <Text style={styles.title}>{title}</Text>
//       <Text style={styles.subtitle}>{subtitle}</Text>
//       <Text style={styles.detail}>{detail}</Text>
//     </View>
//   </View>
// );

// export default function WellnessDashboard() {
//   return (
//     <ScrollView
//       style={styles.container}
//     //  contentContainerStyle={{ paddingBottom: 40 }}
//       showsVerticalScrollIndicator={false}
//     >
//       {wellnessData.map((item) => (
//         <Widget key={item.id} {...item} />
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: "#F9FAFB",
//     padding: 10,
//   },
//   widget: {
//     flexDirection: "row",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 10,
//     marginBottom: 14,
//     borderLeftWidth: 6,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.05,
//     shadowRadius: 6,
//     elevation: 2,
//   },
//   icon: {
//     fontSize: 32,
//     marginRight: 12,
//   },
//   content: { flex: 1 },
//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 2,
//   },
//   subtitle: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#374151",
//     marginBottom: 2,
//   },
//   detail: {
//     fontSize: 13,
//     color: "#4B5563",
//   },
//   disclaimerBox: {
//     marginTop: 20,
//     padding: 12,
//     borderRadius: 12,
//     backgroundColor: "rgba(255,255,255,0.9)",
//   },
//   disclaimer: {
//     fontSize: 12,
//     textAlign: "center",
//     fontStyle: "italic",
//     color: "#374151",
//   },
// });


import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Animated,
} from "react-native";
import axios from "axios";
import { API_BASE } from "../constants/Constant";
const wellnessData = [
  {
    id: "diet",
    icon: "🥗",
    color: "#10B981",
    title: "Diet",
    subtitle: "Palm-sized protein + half plate veggies.",
    detail: "Avoid: Sugary cereals. Myth: Carbs at night cause fat gain (❌).",
  },
  {
    id: "exercise",
    icon: "💪",
    color: "#3B82F6",
    title: "Exercise",
    subtitle: "Routine: 3 min warm-up, 3× circuit, stretch.",
    detail: "Challenge: 10 push-ups today 💥",
  },
  {
    id: "hormones",
    icon: "🧬",
    color: "#8B5CF6",
    title: "Hormones",
    subtitle: "Cortisol helps manage stress & energy.",
    detail: "Balanced by sleep, movement & relaxation.",
  },
  {
    id: "supplements",
    icon: "💊",
    color: "#F59E0B",
    title: "Supplements",
    subtitle: "Vitamin D ☀️ supports immunity.",
    detail: "Many adults are low; sunlight & testing help.",
  },
];
// 🧱 Widget component
const Widget = ({ icon, color, title, subtitle, detail }: any) => (
  <View style={[styles.widget, { borderLeftColor: color }]}>
    <Text style={styles.icon}>{icon}</Text>
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.detail}>{detail}</Text>
    </View>
  </View>
);

// 💀 Skeleton widget
const SkeletonWidget = () => {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.widget, { borderLeftColor: "#E5E7EB", opacity: fadeAnim }]}>
      <View style={[styles.skeletonCircle, { backgroundColor: "#E5E7EB" }]} />
      <View style={styles.content}>
        <View style={[styles.skeletonLine, { width: "50%" }]} />
        <View style={[styles.skeletonLine, { width: "70%", marginTop: 6 }]} />
        <View style={[styles.skeletonLine, { width: "90%", marginTop: 6 }]} />
      </View>
    </Animated.View>
  );
};

// 💀 Skeleton for the title
const SkeletonHeader = () => {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
      <View style={[styles.skeletonTitle, { backgroundColor: "#E5E7EB" }]} />
    </Animated.View>
  );
};

export default function WellnessDashboard() {
  const [wellnessDataa, setWellnessData] = useState<any[]>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const BASE_URL = `${API_BASE}/api/wellness`;

  const fetchWellnessData = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setWellnessData(res.data.data || []);
    } catch (err) {
      console.error("❌ Error fetching wellness data:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWellnessData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchWellnessData();
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* 🌿 Header Section */}
      {loading ? (
        <SkeletonHeader />
      ) : (
        <View style={styles.headerContainer}>
          <Text style={styles.sectionTitle}>Daily Thoughts</Text>
        </View>
      )}

      {/* 💀 Skeletons or Data */}
      {loading ? (
        [...Array(4)].map((_, i) => <SkeletonWidget key={i} />)
      ) : wellnessData.length > 0 ? (
        wellnessData.map((item) => <Widget key={item.id} {...item} />)
      ) : (
        <Text style={styles.emptyText}>No wellness items found.</Text>
      )}
    </ScrollView>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 18,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#065F46",
    textAlign: "center",
  },
  widget: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 10,
    marginBottom: 14,
    borderLeftWidth: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  content: { flex: 1 },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 2,
  },
  detail: {
    fontSize: 13,
    color: "#4B5563",
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 30,
    fontSize: 14,
  },

  // 💀 Skeleton styles
  skeletonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  skeletonLine: {
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
  },
  skeletonTitle: {
    height: 26,
    width: 180,
    borderRadius: 8,
  },
});
