import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, SafeAreaView, Alert, Text, View, TouchableOpacity } from "react-native";
import { GiftedChat, Bubble, InputToolbar, Send } from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/MaterialIcons"; // npm install react-native-vector-icons
import Colors from "../constants/Colors";

// Subscription tiers
type SubscriptionTier = "Free" | "Tier1" | "Tier2" | "Tier3";

interface UserSubscription {
  tier: SubscriptionTier;
  lastConsultDate?: Date;
}

// Dummy subscription
const dummySubscription: UserSubscription = {
  tier: "Tier2",
};

// Max consults per tier
const getMaxConsults = (tier: SubscriptionTier) => {
  switch (tier) {
    case "Tier1": return 1;
    case "Tier2": return 4;
    case "Tier3": return 4;
    default: return 0;
  }
};

const canSendConsult = (subscription: UserSubscription, consultsSent: number) => {
  const now = new Date();
  const maxConsults = getMaxConsults(subscription.tier);

  if (subscription.tier === "Free") return false;
  if (!subscription.lastConsultDate) return true;

  const last = new Date(subscription.lastConsultDate);
  if (subscription.tier === "Tier1") {
    return consultsSent < maxConsults && now.getMonth() !== last.getMonth();
  } else {
    const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
    return consultsSent < maxConsults && diffDays >= 7;
  }
};

export default function BookingScreen() {
  const [messages, setMessages] = useState([]);
  const [consultsSent, setConsultsSent] = useState(0);
  const [subscription] = useState<UserSubscription>(dummySubscription);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello! I’m your doctor. How can I help you today?",
        createdAt: new Date(),
        user: { _id: 2, name: "Doctor", avatar: "https://i.pravatar.cc/150?img=5" },
      },
    ]);
  }, []);

  const onSend = useCallback(
    (newMessages = []) => {
      if (!canSendConsult(subscription, consultsSent)) {
        Alert.alert(
          "Consult Limit Reached",
          "You have reached your consultation limit for this period. Upgrade your subscription for more access."
        );
        return;
      }

      subscription.lastConsultDate = new Date();
      setMessages((prev) => GiftedChat.append(prev, newMessages));
      setConsultsSent((prev) => prev + 1);

      setTimeout(() => {
        setMessages((prev) =>
          GiftedChat.append(prev, [
            {
              _id: Math.round(Math.random() * 1000000),
              text: "Thanks for your message! Here’s my advice for your question.",
              createdAt: new Date(),
              user: { _id: 2, name: "Doctor", avatar: "https://i.pravatar.cc/150?img=5" },
            },
          ])
        );
      }, 1500);
    },
    [consultsSent, subscription]
  );

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{ right: { backgroundColor: "#4a90e2" }, left: { backgroundColor: "#e5e5ea" } }}
      textStyle={{ right: { color: "#fff" }, left: { color: "#000" } }}
    />
  );

  const renderInputToolbar = (props) => (
    <InputToolbar {...props} containerStyle={styles.inputToolbar} />
  );

  // Custom send button
  const renderSend = (props) => (
    <Send {...props}>
      <View style={styles.sendButton}>
        <Icon name="send" size={28} color={Colors.darkBlueP1}/>
      </View>
    </Send>
  );

  return (
    <View style={styles.container}>
      <View style={styles.subscriptionBanner}>
        <Text style={styles.bannerText}>
          Current Tier: {subscription.tier} | Consults sent: {consultsSent}/{getMaxConsults(subscription.tier)}
        </Text>
      </View>

      <View style={styles.chatContainer}>
        <GiftedChat
          messages={messages}
          onSend={(msgs) => onSend(msgs)}
          user={{ _id: 1, name: "Patient", avatar: "https://i.pravatar.cc/150?img=1" }}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
          placeholder="Type your message..."
          alwaysShowSend
          showUserAvatar
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  chatContainer: { flex: 1 },
  inputToolbar: { borderTopWidth: 1, borderTopColor: "#ddd" },
  subscriptionBanner: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    alignItems: "center",
  },
  bannerText: { fontSize: 14, fontWeight: "bold" },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 5,
  },
});
