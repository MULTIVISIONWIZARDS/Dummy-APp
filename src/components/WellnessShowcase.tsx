import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

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

export default function WellnessDashboard() {
  return (
    <ScrollView
      style={styles.container}
    //  contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {wellnessData.map((item) => (
        <Widget key={item.id} {...item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F9FAFB",
    padding: 10,
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
  disclaimerBox: {
    marginTop: 20,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  disclaimer: {
    fontSize: 12,
    textAlign: "center",
    fontStyle: "italic",
    color: "#374151",
  },
});
