// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { StyleSheet, View, Text, Animated, Alert } from "react-native";
// import { GiftedChat, Bubble, InputToolbar, Send } from "react-native-gifted-chat";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { SafeAreaView } from "react-native-safe-area-context";
// import io from "socket.io-client";
// import { API_BASE } from "../constants/Constant";

// const COLORS = {
//   primary: "#6366f1",
//   surface: "#fff",
//   background: "#f8fafc",
//   text: "#1e293b",
//   textLight: "#64748b",
//   border: "#e2e8f0",
// };

// export default function PatientChatScreen() {
//   const [messages, setMessages] = useState([]);
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [chatId, setChatId] = useState(null);
//   const socketRef = useRef(null);

//   const CONFIG = {
//     BACKEND: API_BASE,
//     AUTH: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZThhNjdhMDZlMmIzODE0M2IxNjM3NyIsImlhdCI6MTc2MDA5MTk5MCwiZXhwIjoxNzYwNjk2NzkwfQ.J4TCIIgZIu6q_uFIXPWH4dUMp2RTmGVF1Ni-Ze0Susk",
//   };
//   const token= AsyncStorage.getItem('token');
//   // Convert MongoDB chat to GiftedChat format
//   const mongoChatToGiftedChat = (mongoChat) => {
//     return mongoChat.messages
//       .map((msg) => ({
//         _id: msg._id,
//         text: msg.message,
//         createdAt: new Date(msg.timestamp),
//         user: {
//           _id: msg.sender === "admin" ? 2 : 1,
//           name: msg.sender === "admin" ? "Dr. Sarah" : "You",
//           avatar:
//             msg.sender === "admin"
//               ? "https://i.pravatar.cc/150?img=5"
//               : "https://i.pravatar.cc/150?img=1",
//         },
//       }))
//       .sort((a, b) => b.createdAt - a.createdAt);
//   };

//   // Fetch chat from backend
//   const fetchChatById = async (id) => {
//     try {
//       const res = await axios.get(`${CONFIG.BACKEND}/api/chat/${id}`, {
//         headers: { Authorization: CONFIG.AUTH },
//       });
//       if (res.data.success) {
//         setMessages(mongoChatToGiftedChat(res.data.data));
//       }
//     } catch (err) {
//       console.log("Error fetching chat by id:", err);
//     }
//   };

//   // Initialize chat
//   const initChat = async () => {
//     try {
//        const token = await AsyncStorage.getItem('token'); 
//       const res = await axios.get(`${CONFIG.BACKEND}/api/chat/my-chats`, {
//         headers: { Authorization: token},
//       });

//       let chat;
//       if (res.data.success && res.data.data.length > 0) {
//         chat = res.data.data[0];
//       } else {
//         const startRes = await axios.post(
//           `${CONFIG.BACKEND}/api/chat/start`,
//           {},
//           { headers: { Authorization: token} }
//         );
//         if (!startRes.data.success) {
//           return Alert.alert("Error", startRes.data.message);
//         }
//         chat = startRes.data.data;
//       }

//       setChatId(chat._id);
//       await AsyncStorage.setItem("activeChatId", chat._id);
//       setMessages(mongoChatToGiftedChat(chat));
//     } catch (err) {
//       console.log("Error initializing chat:", err);
//       Alert.alert("Error", "Failed to initialize chat");
//     }
//   };

//   // Setup Socket.IO
//   const setupSocket = (id) => {
//     if (socketRef.current) socketRef.current.disconnect();

//     socketRef.current = io(CONFIG.BACKEND, {
//       transports: ["websocket"],
//       auth: { token: token},
//     });

//     socketRef.current.on("connect", () => {
//       console.log("Socket connected");
//       socketRef.current.emit("join_chat", { chatId: id });
//     });

//     socketRef.current.on("new_message", (msg) => {
//       setMessages((prev) => {
//         // avoid duplicate
//         if (prev.find((m) => m._id === msg._id)) return prev;
//         return GiftedChat.append(prev, [
//           {
//             _id: msg._id,
//             text: msg.message,
//             createdAt: new Date(msg.timestamp),
//             user: {
//               _id: msg.sender === "admin" ? 2 : 1,
//               name: msg.sender === "admin" ? "Dr. Sarah" : "You",
//               avatar:
//                 msg.sender === "admin"
//                   ? "https://i.pravatar.cc/150?img=5"
//                   : "https://i.pravatar.cc/150?img=1",
//             },
//           },
//         ]);
//       });
//     });

//     socketRef.current.on("disconnect", () => console.log("Socket disconnected"));
//   };

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 500,
//       useNativeDriver: true,
//     }).start();

//     initChat();
//   }, []);

//   // Setup socket once chatId is available
//   useEffect(() => {
//     if (!chatId) return;
//     setupSocket(chatId);

//     // Fetch latest chat immediately to get new messages
//     fetchChatById(chatId);

//     return () => {
//       if (socketRef.current) socketRef.current.disconnect();
//     };
//   }, [chatId]);

//   const onSend = useCallback(async (newMessages = []) => {
//     setMessages((prev) => GiftedChat.append(prev, newMessages));

//     try {
//       const activeChatId = await AsyncStorage.getItem("activeChatId");
//       if (!activeChatId) return;

//       const messageData = { message: newMessages[0].text };

//       await axios.post(
//         `${CONFIG.BACKEND}/api/chat/${activeChatId}/message`,
//         messageData,
//         { headers: { Authorization: CONFIG.AUTH } }
//       );

//       // Emit for live update
//       socketRef.current.emit("send_message", {
//         chatId: activeChatId,
//         message: messageData.message,
//         sender: "user",
//       });
//     } catch (err) {
//       console.log("Error sending message:", err);
//       Alert.alert("Error", "Failed to send message");
//     }
//   }, []);

//   const renderBubble = (props) => (
//     <Bubble
//       {...props}
//       wrapperStyle={{
//         right: { backgroundColor: COLORS.primary, borderRadius: 16 },
//         left: { backgroundColor: COLORS.surface, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border },
//       }}
//       textStyle={{ right: { color: "#fff" }, left: { color: COLORS.text } }}
//     />
//   );

//   const renderInputToolbar = (props) => <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
//   const renderSend = (props) => (
//     <Send {...props} containerStyle={styles.sendContainer}>
//       <View style={styles.sendButton}>
//         <Icon name="send" size={24} color="#fff" />
//       </View>
//     </Send>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
//         <GiftedChat
//           messages={messages}
//           onSend={(msgs) => onSend(msgs)}
//           user={{ _id: 1, name: "You" }}
//           renderBubble={renderBubble}
//           renderInputToolbar={renderInputToolbar}
//           renderSend={renderSend}
//           scrollToBottom
//           alwaysShowSend
//         />
//       </Animated.View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background },
//   inputToolbar: { backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: COLORS.border, padding: 8 },
//   sendContainer: { justifyContent: "center", alignItems: "center", marginRight: 8, marginBottom: 8 },
//   sendButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primary, justifyContent: "center", alignItems: "center" },
// });


// import React, { useState, useEffect, useCallback } from "react";
// import { StyleSheet, View, Alert, Animated } from "react-native";
// import { GiftedChat, Bubble, InputToolbar, Send } from "react-native-gifted-chat";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_BASE } from "../constants/Constant";

// const COLORS = {
//   primary: "#6366f1",
//   surface: "#fff",
//   background: "#f8fafc",
//   text: "#1e293b",
//   textLight: "#64748b",
//   border: "#e2e8f0",
// };

// export default function PatientChatScreen() {
//   const [messages, setMessages] = useState([]);
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [authToken, setAuthToken] = useState(null);
//   const [chatId, setChatId] = useState(null);

//   useEffect(() => {
//     const loadToken = async () => {
//       const stored = await AsyncStorage.getItem("token");
//       if (stored) setAuthToken(stored);
//     };
//     loadToken();
//   }, []);

//   const mongoChatToGiftedChat = (mongoChat) => {
//     return mongoChat.messages
//       .map((msg) => ({
//         _id: msg._id,
//         text: msg.message,
//         createdAt: new Date(msg.timestamp),
//         user: {
//           _id: msg.sender === "admin" ? 2 : 1,
//           name: msg.sender === "admin" ? "Doctor" : "You",
//         },
//       }))
//       .sort((a, b) => b.createdAt - a.createdAt);
//   };

//   const fetchChatById = async (id) => {
//     if (!authToken) return;
//     try {
//       const res = await axios.get(`${API_BASE}/api/chat/${id}`, {
//         headers: { Authorization: authToken },
//       });
//       if (res.data.success) setMessages(mongoChatToGiftedChat(res.data.data));
//     } catch (err) {
//       console.log("Fetch Chat Error:", err.response?.data || err);
//     }
//   };

//   const initChat = async () => {
//     if (!authToken) return;
//     try {
//       const res = await axios.get(`${API_BASE}/api/chat/my-chats`, {
//         headers: { Authorization: authToken },
//       });

//       let chat = res.data.data[0];

//       if (!chat) {
//         const startRes = await axios.post(
//           `${API_BASE}/api/chat/start`,
//           {},
//           { headers: { Authorization: authToken } }
//         );
//         chat = startRes.data.data;
//       }

//       setChatId(chat._id);
//       await AsyncStorage.setItem("activeChatId", chat._id);
//       setMessages(mongoChatToGiftedChat(chat));
//     } catch (err) {
//       console.log("Init Chat Error:", err.response?.data || err);
//       Alert.alert("Chat Error", "Unable to initialize chat");
//     }
//   };

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 500,
//       useNativeDriver: true
//     }).start();
//   }, []);

//   useEffect(() => {
//     if (authToken) initChat();
//   }, [authToken]);

//   useEffect(() => {
//     if (chatId) fetchChatById(chatId);
//   }, [chatId]);

//   const onSend = useCallback(
//     async (newMessages = []) => {
//       const newMsg = newMessages[0];
//       if (!newMsg) return;

//       setMessages((prev) => GiftedChat.append(prev, newMessages));

//       try {
//         const activeChatId = await AsyncStorage.getItem("activeChatId");
//         const payload = { message: newMsg.text };

//         await axios.post(
//           `${API_BASE}/api/chat/${activeChatId}/message`,
//           payload,
//           { headers: { Authorization: authToken } }
//         );

//         fetchChatById(activeChatId);
//       } catch (err) {
//         console.log("Send Error:", err.response?.data || err);
//         Alert.alert("Error", "Failed to send message");
//       }
//     },
//     [authToken]
//   );

//   const renderBubble = (props) => (
//     <Bubble
//       {...props}
//       wrapperStyle={{
//         right: { backgroundColor: COLORS.primary, borderRadius: 16 },
//         left: {
//           backgroundColor: COLORS.surface,
//           borderRadius: 16,
//           borderWidth: 1,
//           borderColor: COLORS.border
//         },
//       }}
//       textStyle={{ right: { color: "#fff" }, left: { color: COLORS.text } }}
//     />
//   );

//   return (
//     <View style={{ flex: 1 }}>
//       <GiftedChat
//         messages={messages}
//         onSend={(msgs) => onSend(msgs)}
//         user={{ _id: 1 }}
//         renderBubble={renderBubble}
//         renderInputToolbar={(props) => (
//           <InputToolbar {...props} containerStyle={styles.inputToolbar} />
//         )}
//         renderSend={(props) => (
//           <Send {...props} containerStyle={styles.sendContainer}>
//             <View style={styles.sendButton}>
//               <Icon name="send" size={24} color="#fff" />
//             </View>
//           </Send>
//         )}
//         scrollToBottom
//         alwaysShowSend
//         inverted
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   inputToolbar: {
//     backgroundColor: COLORS.surface,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.border,
//     padding: 8,
//   },
//   sendContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 8,
//     marginBottom: 8
//   },
//   sendButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: COLORS.primary,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });


import React, { useState, useEffect, useCallback, useRef } from "react";
import { StyleSheet, View, Alert, Animated } from "react-native";
import { GiftedChat, Bubble, InputToolbar, Send } from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from "../constants/Constant";
import io from "socket.io-client";

const COLORS = {
  primary: "#6366f1",
  surface: "#fff",
  background: "#f8fafc",
  text: "#1e293b",
  textLight: "#64748b",
  border: "#e2e8f0",
};

export default function PatientChatScreen() {
  const [messages, setMessages] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [authToken, setAuthToken] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [userId, setUserId] = useState(null);

  const socketRef = useRef(null);

  useEffect(() => {
    const loadUserData = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("userId");

      if (storedToken) setAuthToken(storedToken);
      if (storedUser) setUserId(storedUser);
    };
    loadUserData();
  }, []);

  const setupSocket = (userId) => {
    if (socketRef.current) return;

    socketRef.current = io(API_BASE, {
      transports: ["websocket"]
    });

    socketRef.current.on("connect", () => {
      console.log("Socket Connected ✅", socketRef.current.id);

      // ✅ Register user with socket
      socketRef.current.emit("registerUser", userId);
    });

    // ✅ Receive messages instantly
    socketRef.current.on("receiveMessage", (msg) => {
      console.log("💬 New Msg Arrived =>", msg);

      const formatted = {
        _id: Math.random().toString(),
        text: msg.message,
        createdAt: new Date(msg.timestamp),
        user: {
          _id: msg.senderId === userId ? 1 : 2,
          name: msg.senderId === userId ? "You" : "Doctor",
        },
      };

      setMessages((prev) => GiftedChat.append(prev, [formatted]));
    });
  };

  const mongoChatToGiftedChat = (mongoChat) => {
    return mongoChat.messages
      .map((msg) => ({
        _id: msg._id,
        text: msg.message,
        createdAt: new Date(msg.timestamp),
        user: {
          _id: msg.sender === "admin" ? 2 : 1,
          name: msg.sender === "admin" ? "Doctor" : "You",
        },
      }))
      .sort((a, b) => b.createdAt - a.createdAt);
  };

  const fetchChatById = async (id) => {
    if (!authToken) return;
    try {
      const res = await axios.get(`${API_BASE}/api/chat/${id}`, {
        headers: { Authorization: authToken },
      });
      if (res.data.success) setMessages(mongoChatToGiftedChat(res.data.data));
    } catch (err) {
      console.log("Fetch Chat Error:", err.response?.data || err);
    }
  };

  const initChat = async () => {
    if (!authToken) return;
    try {
      const res = await axios.get(`${API_BASE}/api/chat/my-chats`, {
        headers: { Authorization: authToken },
      });

      let chat = res.data.data[0];

      if (!chat) {
        const startRes = await axios.post(
          `${API_BASE}/api/chat/start`,
          {},
          { headers: { Authorization: authToken } }
        );
        chat = startRes.data.data;
      }

      setChatId(chat._id);
      await AsyncStorage.setItem("activeChatId", chat._id);
      setMessages(mongoChatToGiftedChat(chat));

      if (userId) setupSocket(userId);
    } catch (err) {
      console.log("Init Chat Error:", err.response?.data || err);
      Alert.alert("Chat Error", "Unable to initialize chat");
    }
  };

  useEffect(() => {
    if (authToken && userId) initChat();
  }, [authToken, userId]);

  const onSend = useCallback(
    async (newMessages = []) => {
      const newMsg = newMessages[0];
      if (!newMsg) return;

      setMessages((prev) => GiftedChat.append(prev, newMessages));

      try {
        const activeChatId = await AsyncStorage.getItem("activeChatId");

        // ✅ Emit socket private message
        socketRef.current.emit("sendPrivateMessage", {
          receiverId: "admin", // TODO: Replace with real admin ID
          chatId: activeChatId,
          message: newMsg.text,
          senderId: userId
        });

        // ✅ Save message to DB
        await axios.post(
          `${API_BASE}/api/chat/${activeChatId}/message`,
          { message: newMsg.text },
          { headers: { Authorization: authToken } }
        );
      } catch (err) {
        console.log("Send Error:", err.response?.data || err);
        Alert.alert("Error", "Failed to send message");
      }
    },
    [authToken, userId]
  );

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: COLORS.primary, borderRadius: 16 },
        left: {
          backgroundColor: COLORS.surface,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: COLORS.border,
        },
      }}
      textStyle={{ right: { color: "#fff" }, left: { color: COLORS.text } }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(msgs) => onSend(msgs)}
        user={{ _id: 1 }}
        renderBubble={renderBubble}
        renderInputToolbar={(props) => (
          <InputToolbar {...props} containerStyle={styles.inputToolbar} />
        )}
        renderSend={(props) => (
          <Send {...props} containerStyle={styles.sendContainer}>
            <View style={styles.sendButton}>
              <Icon name="send" size={24} color="#fff" />
            </View>
          </Send>
        )}
        scrollToBottom
        alwaysShowSend
        inverted
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputToolbar: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: 8,
  },
  sendContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
