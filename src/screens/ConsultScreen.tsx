// import React, { useState, useEffect, useCallback } from "react";
// import { StyleSheet, SafeAreaView, Alert, Text, View, TouchableOpacity } from "react-native";
// import { GiftedChat, Bubble, InputToolbar, Send } from "react-native-gifted-chat";
// import Icon from "react-native-vector-icons/MaterialIcons"; // npm install react-native-vector-icons
// import Colors from "../constants/Colors";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Subscription tiers
// type SubscriptionTier = "Free" | "Tier1" | "Tier2" | "Tier3";

// interface UserSubscription {
//   tier: SubscriptionTier;
//   lastConsultDate?: Date;
// }

// // Dummy subscription
// const dummySubscription: UserSubscription = {
//   tier: "Tier2",
// };

// // Max consults per tier
// const getMaxConsults = (tier: SubscriptionTier) => {
//   switch (tier) {
//     case "Tier1": return 1;
//     case "Tier2": return 4;
//     case "Tier3": return 4;
//     default: return 0;
//   }
// };

// const canSendConsult = (subscription: UserSubscription, consultsSent: number) => {
//   const now = new Date();
//   const maxConsults = getMaxConsults(subscription.tier);

//   if (subscription.tier === "Free") return false;
//   if (!subscription.lastConsultDate) return true;

//   const last = new Date(subscription.lastConsultDate);
//   if (subscription.tier === "Tier1") {
//     return consultsSent < maxConsults && now.getMonth() !== last.getMonth();
//   } else {
//     const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
//     return consultsSent < maxConsults && diffDays >= 7;
//   }
// };

// export default function ConsultScreen() {
//   const [messages, setMessages] = useState([]);
//   const [consultsSent, setConsultsSent] = useState(0);
//   const [subscription] = useState<UserSubscription>(dummySubscription);
// const [subscriptionD, setSubscriptionD] = useState<any>(null);
//  const [expanded, setExpanded] = useState<string | null>(null);
//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: "Hello! I’m your doctor. How can I help you today?",
//         createdAt: new Date(),
//         user: { _id: 2, name: "Doctor", avatar: "https://i.pravatar.cc/150?img=5" },
//       },
//     ]);
//   }, []);
//   useEffect(() => {
//     (async () => {
//       const saved = await AsyncStorage.getItem('last_expanded_tier');
//       if (saved) setExpanded(saved);

//       try {
//         const subData = await AsyncStorage.getItem('subscriptionDetails');
//         if (subData) {
//           const parsed = JSON.parse(subData);
//           // check expiry
//           if (parsed.expiryDate && new Date(parsed.expiryDate) > new Date()) {
//             setSubscriptionD(parsed);
//           } else {
//             setSubscriptionD(null); // expired
//           }
//         }
//       } catch (e) {
//         console.log('Invalid subscription data:', e);
//         setSubscriptionD(null);
//       }
//     })();
//   }, []);

//   const onSend = useCallback(
//     (newMessages = []) => {
//       if (!canSendConsult(subscription, consultsSent)) {
//         Alert.alert(
//           "Consult Limit Reached",
//           "You have reached your consultation limit for this period. Upgrade your subscription for more access."
//         );
//         return;
//       }

//       subscription.lastConsultDate = new Date();
//       setMessages((prev) => GiftedChat.append(prev, newMessages));
//       setConsultsSent((prev) => prev + 1);

//       setTimeout(() => {
//         setMessages((prev) =>
//           GiftedChat.append(prev, [
//             {
//               _id: Math.round(Math.random() * 1000000),
//               text: "Thanks for your message! Here’s my advice for your question.",
//               createdAt: new Date(),
//               user: { _id: 2, name: "Doctor", avatar: "https://i.pravatar.cc/150?img=5" },
//             },
//           ])
//         );
//       }, 1500);
//     },
//     [consultsSent, subscription]
//   );

//   const renderBubble = (props) => (
//     <Bubble
//       {...props}
//       wrapperStyle={{ right: { backgroundColor: "#4a90e2" }, left: { backgroundColor: "#e5e5ea" } }}
//       textStyle={{ right: { color: "#fff" }, left: { color: "#000" } }}
//     />
//   );

//   const renderInputToolbar = (props) => (
//     <InputToolbar {...props} containerStyle={styles.inputToolbar} />
//   );

//   // Custom send button
//   const renderSend = (props) => (
//     <Send {...props}>
//       <View style={styles.sendButton}>
//         <Icon name="send" size={28} color={Colors.darkBlueP1}/>
//       </View>
//     </Send>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.subscriptionBanner}>
//         <Text style={styles.bannerText}>
//           Current Tier: {subscriptionD?.planName} | Consults sent: {consultsSent}/{getMaxConsults(subscriptionD?.planName)}
//         </Text>
//       </View>

//       <View style={styles.chatContainer}>
//         <GiftedChat
//           messages={messages}
//           onSend={(msgs) => onSend(msgs)}
//           user={{ _id: 1, name: "Patient", avatar: "https://i.pravatar.cc/150?img=1" }}
//           renderBubble={renderBubble}
//           renderInputToolbar={renderInputToolbar}
//           renderSend={renderSend}
//           placeholder="Type your message..."
//           alwaysShowSend
//           showUserAvatar
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   chatContainer: { flex: 1 },
//   inputToolbar: { borderTopWidth: 1, borderTopColor: "#ddd" },
//   subscriptionBanner: {
//     backgroundColor: "#f5f5f5",
//     padding: 10,
//     alignItems: "center",
//   },
//   bannerText: { fontSize: 14, fontWeight: "bold" },
//   sendButton: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 10,
//     marginBottom: 5,
//   },
// });

import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { GiftedChat, Bubble, InputToolbar, Send, SystemMessage } from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import CommonSubscription from "../components/CommonSubscription";

type SubscriptionTier = "Free" | "Tier1" | "Tier2" | "Tier3";

interface UserSubscription {
  planName: SubscriptionTier;
  expiryDate?: string;
  lastConsultDate?: string;
  consultsSent?: number;
}

const CHAT_STORAGE_KEY = "user_chat_messages";

const getMaxConsults = (tier: SubscriptionTier) => {
  switch (tier) {
    case "Tier1": return 1;
    case "Tier2": return 4;
    case "Tier3": return 10;
    default: return 0;
  }
};

const canSendConsult = (sub: UserSubscription | null): boolean => {
  if (!sub || sub.planName === "Free") return false;
  const now = new Date();
  let sent = sub.consultsSent || 0;
  const max = getMaxConsults(sub.planName);
  if (!sub.lastConsultDate) return true;

  const last = new Date(sub.lastConsultDate);
  if (sub.planName === "Tier1") {
    if (now.getMonth() !== last.getMonth() || now.getFullYear() !== last.getFullYear()) sent = 0;
  } else {
    const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays >= 7) sent = 0;
  }
  return sent < max;
};

export default function ConsultScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
const navigation=useNavigation();
  useEffect(() => {
    (async () => {
      try {
        const subData = await AsyncStorage.getItem("subscriptionDetails");
        if (subData) {
          const parsed: UserSubscription = JSON.parse(subData);
          if (!parsed.expiryDate || new Date(parsed.expiryDate) > new Date()) {
            setSubscription(parsed);
          }
        }

        // Load messages only if user has subscription
        if (subData) {
          const savedChat = await AsyncStorage.getItem(CHAT_STORAGE_KEY);
          if (savedChat) setMessages(JSON.parse(savedChat));
        }
      } catch (e) {
        console.log("Error loading data:", e);
      }
    })();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      AsyncStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const canSendNow = canSendConsult(subscription);

  const onSend = useCallback(
    async (newMessages = []) => {
      if (!subscription || !canSendNow) return;

      setMessages((prev) => GiftedChat.append(prev, newMessages));

      // Update subscription usage
      const updated: UserSubscription = {
        ...subscription,
        lastConsultDate: new Date().toISOString(),
        consultsSent: (subscription.consultsSent || 0) + 1,
      };
      setSubscription(updated);
      await AsyncStorage.setItem("subscriptionDetails", JSON.stringify(updated));

      // Doctor reply
      setTimeout(() => {
        setMessages((prev) =>
          GiftedChat.append(prev, [
            {
              _id: Math.round(Math.random() * 1000000),
              text: "Thanks for your message! Here's my advice on your question.",
              createdAt: new Date(),
              user: { _id: 2, name: "Doctor", avatar: "https://i.pravatar.cc/150?img=5" },
            },
          ])
        );
      }, 1500);
    },
    [subscription, canSendNow]
  );

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: Colors.darkBlueP1, borderRadius: 15 },
        left: { backgroundColor: "#f0f0f0", borderRadius: 15 },
      }}
      textStyle={{ right: { color: "#fff" }, left: { color: "#000" } }}
    />
  );

  const renderInputToolbar = (props) =>
    canSendNow ? <InputToolbar {...props} containerStyle={styles.inputToolbar} /> : null;

  const renderSend = (props) => (
    <Send {...props}>
      <View style={styles.sendButton}>
        <Icon name="send" size={28} color={Colors.darkBlueP1} />
      </View>
    </Send>
  );

  // ✅ If user has no subscription, show unlock message
  if (!subscription) {
    return (
      <CommonSubscription/>
      // <View style={styles.lockedContainer}>
      //   <Text style={styles.lockedText}>
      //     Unlock consultations by subscribing to a plan.
      //   </Text>
      //   <TouchableOpacity
      //     style={styles.unlockButton}
      //     onPress={() =>navigation.navigate('Subscription')}
      //   >
      //     <Text style={styles.unlockButtonText}>Unlock Now</Text>
      //   </TouchableOpacity>
      // </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.subscriptionBanner, !canSendNow && styles.bannerLocked]}>
        <Text style={styles.bannerText}>
          Tier: {subscription.planName} | Consults sent: {subscription.consultsSent || 0}/{getMaxConsults(subscription.planName)}
        </Text>
        {!canSendNow && (
          <Text style={styles.limitText}>
            You have reached your consultation limit. Upgrade or wait for reset.
          </Text>
        )}
      </View>

      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: 1, name: "Patient", avatar: "https://i.pravatar.cc/150?img=1" }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        placeholder={canSendNow ? "Type your message..." : "Limit reached"}
        alwaysShowSend
        showUserAvatar
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  subscriptionBanner: {
    padding: 12,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  bannerLocked: { backgroundColor: "#ffe6e6" },
  bannerText: { fontSize: 14, fontWeight: "600" },
  limitText: { fontSize: 12, color: "#d00", marginTop: 4, textAlign: "center" },
  inputToolbar: { borderTopWidth: 1, borderTopColor: "#ddd", padding: 6 },
  sendButton: { justifyContent: "center", alignItems: "center", marginRight: 10 },
  lockedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  lockedText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  unlockButton: {
    backgroundColor: Colors.darkBlueP1,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  unlockButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
