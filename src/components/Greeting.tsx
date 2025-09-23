// import React, { useEffect, useState } from "react";
// import { Text, View, StyleSheet } from "react-native";
// import LinearGradient from "react-native-linear-gradient"; 
// import { useAppSelector } from "../store/hooks"; // ✅ your custom typed hook

// export default function Greeting() {
//   const user = useAppSelector((state) => state.auth.user); // ✅ get user from Redux
//   const [greeting, setGreeting] = useState("");
//   const [emoji, setEmoji] = useState("🌸");
//   const [subGreeting, setSubGreeting] = useState("");

//   useEffect(() => {
//     const currentHour = new Date().getHours();

//     if (currentHour < 12) {
//       setGreeting("Good Morning");
//       setEmoji("☀️");
//       setSubGreeting("Have a bright and energetic start to your day! 🌿");
//     } else if (currentHour < 17) {
//       setGreeting("Good Afternoon");
//       setEmoji("🌤️");
//       setSubGreeting("Keep up the positivity and stay hydrated 💧");
//     } else if (currentHour < 21) {
//       setGreeting("Good Evening");
//       setEmoji("🌆");
//       setSubGreeting("Relax and recharge, you’ve done great today ✨");
//     } else {
//       setGreeting("Good Night");
//       setEmoji("🌙");
//       setSubGreeting("Unwind and enjoy a restful sleep 😴");
//     }
//   }, []);

//   return (
//     <LinearGradient colors={["#63f1fbff", "#5786c7ff"]} style={styles.gradient}>
//       <View style={styles.container}>
//         <Text style={styles.greeting}>
//           {greeting}, {user?.name || "Guest"} {emoji}
//         </Text>
//         <Text style={styles.subGreeting}>{subGreeting}</Text>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   gradient: {
//     borderRadius: 12,
//     margin: 12,
//     padding: 10,
//     elevation: 3,
//   },
//   container: {
//     alignItems: "flex-start",
//   },
//   greeting: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#fff",
//   },
//   subGreeting: {
//     fontSize: 14,
//     color: "#f0f0f0",
//     marginTop: 4,
//   },
// });



import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useAppSelector } from "../store/hooks";

type Theme = {
  backgroundColor: string;
  textColor: string;
  subTextColor: string;
};

export default function Greeting() {
  const user = useAppSelector((state) => state.auth.user);
  const [greeting, setGreeting] = useState("");
  const [emoji, setEmoji] = useState("🌸");
  const [subGreeting, setSubGreeting] = useState("");
  const [theme, setTheme] = useState<Theme>({
    backgroundColor: "#ffffff",
    textColor: "#000000",
    subTextColor: "#555555",
  });

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting("Good Morning");
      setEmoji("☀️");
      setSubGreeting("Have a bright and energetic start to your day! 🌿");
      setTheme({
        backgroundColor: "#FFF5E1",
        textColor: "#2C2C2C",
        subTextColor: "#555555",
      });
    } else if (currentHour < 17) {
      setGreeting("Good Afternoon");
      setEmoji("🌤️");
      setSubGreeting("Keep up the positivity and stay hydrated 💧");
      setTheme({
        backgroundColor: "#E6F7FF",
        textColor: "#1A1A1A",
        subTextColor: "#444444",
      });
    } else if (currentHour < 21) {
      setGreeting("Good Evening");
      setEmoji("🌆");
      setSubGreeting("Relax and recharge, you’ve done great today ✨");
      setTheme({
        backgroundColor: "#FFE5D9",
        textColor: "#2C2C2C",
        subTextColor: "#555555",
      });
    } else {
      setGreeting("Good Night");
      setEmoji("🌙");
      setSubGreeting("Unwind and enjoy a restful sleep 😴");
      setTheme({
        backgroundColor: "#1C1C2E",
        textColor: "#F1F1F1",
        subTextColor: "#BBBBBB",
      });
    }
  }, []);

  // truncate name if it's too long
  const formatName = (name: string | undefined) => {
    if (!name) return "Guest";
    return name.length > 18 ? name.slice(0, 15) + "..." : name;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text
        style={[styles.greeting, { color: theme.textColor }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {greeting}, {formatName(user?.name)} {emoji}
      </Text>
      <Text
        style={[styles.subGreeting, { color: theme.subTextColor }]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {subGreeting}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    margin: 12,
    padding: 16,
    elevation: 3,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    maxWidth: "95%", // avoid overflow
  },
  subGreeting: {
    fontSize: 15,
    marginTop: 6,
    maxWidth: "95%",
  },
});
