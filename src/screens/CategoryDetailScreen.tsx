import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CommonSubscription from "../components/CommonSubscription";

export default function PatientDietScreen({ route }) {
  // const { item } = route.params;
const item = route?.params?.item;   
  if (!item) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No data available</Text>
      </View>
    );
  }
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

        {
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
        }
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  screenTitle: { fontSize: 28, fontWeight: "700", color: "#0D3B66", marginBottom: 16, textAlign: "center" },
  card: {  borderRadius: 16, marginBottom: 20, padding: 15 },
  cardImage: { width: "100%", height: 160, borderRadius: 12 },
  cardTitle: { fontSize: 22, fontWeight: "700", marginTop: 12, color: "#0D3B66" },
  cardDescription: { fontSize: 16, marginTop: 6, color: "#37474F" },
  contentSection: { marginTop: 10 },
  contentText: { fontSize: 15, lineHeight: 22, color: "#37474F", marginBottom: 4 },
});
