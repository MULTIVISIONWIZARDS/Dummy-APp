// // import React, { useEffect, useRef } from "react";
// // import { View, Image, StyleSheet, Animated, Dimensions } from "react-native";
// // import { StackActions, useNavigation } from "@react-navigation/native";
// // import AsyncStorage from "@react-native-async-storage/async-storage";

// // const { height, width } = Dimensions.get("window");

// // export default function SplashScreen() {
// //   const fadeAnim = useRef(new Animated.Value(1)).current;
// //   const navigation = useNavigation();

// //   useEffect(() => {
// //     const checkAppState = async () => {
// //       // Check if onboarding has been completed
// //       const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
// //       const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
// //       //const isLoggedIn = false; // Replace with your auth check

// //       const timer = setTimeout(() => {
// //         // Fade out animation
// //         Animated.timing(fadeAnim, {
// //           toValue: 0,
// //           duration: 600,
// //           useNativeDriver: true,
// //         }).start(() => {
// //           // Navigate based on flags
// //           if (!hasOnboarded) {
// //             navigation.dispatch(StackActions.replace("Onboard"));
// //           } else if (isLoggedIn) {
// //             navigation.dispatch(StackActions.replace("Main"));
// //           } else {
// //             navigation.dispatch(StackActions.replace("Main"));
// //           }
// //         });
// //       }, 2500); // Show splash for ~2.5s

// //       return () => clearTimeout(timer);
// //     };

// //     checkAppState();
// //   }, [fadeAnim, navigation]);

// //   return (
// //     <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
// //       <Image
// //         source={{
// //           uri: "https://img.freepik.com/free-photo/doctors-day-handsome-brunette-cute-guy-medical-gown-with-crossed-hands_140725-162942.jpg?w=1480",
// //         }}
// //         style={styles.logo}
// //         resizeMode="cover"
// //       />
// //     </Animated.View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   logo: {
// //     width,
// //     height,
// //   },
// // });

// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Image,
//   StyleSheet,
//   Animated,
//   Dimensions,
//   Text,
// } from "react-native";
// import { StackActions, useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import LinearGradient from "react-native-linear-gradient";
// import AnimatedSplashScreen from "../components/AnimatedSplashScreen";

// const { height, width } = Dimensions.get("window");

// export default function SplashScreen() {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.8)).current;
//   const pulseAnim = useRef(new Animated.Value(1)).current;
//    const [showSplash, setShowSplash] = useState(true);

//   const navigation = useNavigation();

//   useEffect(() => {
//     const checkAppState = async () => {
//       const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
//       const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

//       // Run animations
//       Animated.sequence([
//         Animated.parallel([
//           Animated.timing(fadeAnim, {
//             toValue: 1,
//             duration: 800,
//             useNativeDriver: true,
//           }),
//           Animated.spring(scaleAnim, {
//             toValue: 1,
//             friction: 3,
//             useNativeDriver: true,
//           }),
//         ]),
//         Animated.loop(
//           Animated.sequence([
//             Animated.timing(pulseAnim, {
//               toValue: 1.1,
//               duration: 600,
//               useNativeDriver: true,
//             }),
//             Animated.timing(pulseAnim, {
//               toValue: 1,
//               duration: 600,
//               useNativeDriver: true,
//             }),
//           ]),
//           { iterations: 2 } // two heartbeat-like pulses
//         ),
//         Animated.delay(600),
//         Animated.timing(fadeAnim, {
//           toValue: 0,
//           duration: 600,
//           useNativeDriver: true,
//         }),
//       ]).start(() => {
//         // ✅ Navigate after animation ends
//         if (!hasOnboarded) {
//           navigation.dispatch(StackActions.replace("Onboard"));
//         } else if (isLoggedIn) {
//           navigation.dispatch(StackActions.replace("Main"));
//         } else {
//           navigation.dispatch(StackActions.replace("Login"));
//         }
//       });
//     };

//     checkAppState();
//   }, [fadeAnim, scaleAnim, pulseAnim, navigation]);

//   if (showSplash) {
//     return (
//       <AnimatedSplashScreen
//         onFinish={() => setShowSplash(false)} 
//       />
//     );
//   }
//   return (

//     <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
//       <Animated.Image
//         source={{
//           uri: "https://img.freepik.com/free-photo/doctors-day-handsome-brunette-cute-guy-medical-gown-with-crossed-hands_140725-162942.jpg?w=1480",
//         }}
//         style={[
//           styles.logo,
//           {
//             transform: [{ scale: Animated.multiply(scaleAnim, pulseAnim) }],
//           },
//         ]}
//         resizeMode="cover"
//       />

//       <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
//         My Health App
//       </Animated.Text>
//     </Animated.View>
   
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logo: {
//     width: width * 0.6,
//     height: width * 0.6,
//     //borderRadius: width * 0.3,
//   },
//   text: {
//     marginTop: 20,
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#1a73e8",
//   },
// });

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
} from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AnimatedSplashScreen from "../components/AnimatedSplashScreen";

const { height, width } = Dimensions.get("window");

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [showSplash, setShowSplash] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const runSplashAndCheck = async () => {
      // ✅ Get app state
      const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      const userId = await AsyncStorage.getItem("userId");
      const subscribed = userId
        ? await AsyncStorage.getItem(`subscription_${userId}`)
        : null;

      // ✅ Run animations
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
          }),
        ]),
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.1,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
          ]),
          { iterations: 2 }
        ),
        Animated.delay(600),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // ✅ Navigate after animation
        if (!hasOnboarded) {
          navigation.dispatch(StackActions.replace("Onboard"));
        } else if (isLoggedIn && userId && subscribed === "true") {
          navigation.dispatch(StackActions.replace("Main"));
        } else if (isLoggedIn && userId && subscribed !== "true") {
          navigation.dispatch(StackActions.replace("Main"));
          // navigation.dispatch(StackActions.replace("Subscription", { userId }));
        } else {
          navigation.dispatch(StackActions.replace("Login"));
        }
      });
    };

    runSplashAndCheck();
  }, [fadeAnim, scaleAnim, pulseAnim, navigation]);

  if (showSplash) {
    return <AnimatedSplashScreen onFinish={() => setShowSplash(true)} />;
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.Image
        source={{
          uri: "https://img.freepik.com/free-photo/doctors-day-handsome-brunette-cute-guy-medical-gown-with-crossed-hands_140725-162942.jpg?w=1480",
        }}
        style={[
          styles.logo,
          { transform: [{ scale: Animated.multiply(scaleAnim, pulseAnim) }] },
        ]}
        resizeMode="cover"
      />
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        My Health App
      </Animated.Text>
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
    width: width * 0.6,
    height: width * 0.6,
  },
  text: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "700",
    color: "#1a73e8",
  },
});
