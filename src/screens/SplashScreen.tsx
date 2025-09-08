import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, Animated, Dimensions } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const checkAppState = async () => {
      // Check if onboarding has been completed
      const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      //const isLoggedIn = false; // Replace with your auth check

      const timer = setTimeout(() => {
        // Fade out animation
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }).start(() => {
          // Navigate based on flags
          if (!hasOnboarded) {
            navigation.dispatch(StackActions.replace("Onboard"));
          } else if (isLoggedIn) {
            navigation.dispatch(StackActions.replace("Main"));
          } else {
            navigation.dispatch(StackActions.replace("Login"));
          }
        });
      }, 2500); // Show splash for ~2.5s

      return () => clearTimeout(timer);
    };

    checkAppState();
  }, [fadeAnim, navigation]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image
        source={{
          uri: "https://img.freepik.com/free-photo/doctors-day-handsome-brunette-cute-guy-medical-gown-with-crossed-hands_140725-162942.jpg?w=1480",
        }}
        style={styles.logo}
        resizeMode="cover"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width,
    height,
  },
});
