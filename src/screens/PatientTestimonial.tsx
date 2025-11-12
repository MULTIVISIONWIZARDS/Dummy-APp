import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PatientTestimonial = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>💬 Patient Testimony</Text>

      <View style={styles.card}>
        <View style={styles.quoteIcon}>
          <Icon name="format-quote-open" size={32} color="#10B981" />
        </View>

        <Text style={styles.text}>
          “Jennifer Mooneyham, 4 The Family. Jennifer and her team are
          oustanding. Her knowledge saved me in so many ways. I would not
          acconplished my health and weight goals without her. She has become
          part of my family. God bless her and her team allowing them to
          continue to make such a fantastic difference in people's life's. I
          will always be her patient, no matter what part of the world life
          takes me to.”
        </Text>

        <Text style={styles.signature}>– SB</Text>

        <View style={styles.ratingContainer}>
          <Icon name="star" size={20} color="#FBBF24" />
          <Icon name="star" size={20} color="#FBBF24" />
          <Icon name="star" size={20} color="#FBBF24" />
          <Icon name="star" size={20} color="#FBBF24" />
          <Icon name="star" size={20} color="#FBBF24" />
        </View>
      </View>

      <Text style={styles.footerNote}>
        💚 Thank you to all our amazing patients for trusting 4 The Family.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  content: { padding: 20, alignItems: "center" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    width: "100%",
  },
  quoteIcon: { marginBottom: 10 },
  text: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    marginBottom: 12,
  },
  signature: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#6B7280",
    textAlign: "right",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  footerNote: {
    marginTop: 30,
    textAlign: "center",
    color: "#6B7280",
    fontSize: 14,
  },
});

export default PatientTestimonial;
