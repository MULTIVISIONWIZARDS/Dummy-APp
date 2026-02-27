// import React, { useState, useEffect, useCallback, useRef } from "react";
// import {
//   StyleSheet,
//   View,
//   Alert,
//   Animated,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator, // 👈 add this
//   Text,
// } from "react-native";
// import { GiftedChat, Bubble } from "react-native-gifted-chat";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_BASE } from "../constants/Constant";
// import io from "socket.io-client";
// import { LogBox } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useFocusEffect } from "@react-navigation/native";
// import { SOCKET_URL } from '../constants/Constant';
// LogBox.ignoreLogs([
//   'A props object containing a "key" prop is being spread into JSX',
// ]);

// const COLORS = {
//   primary: "#6366f1",
//   surface: "#fff",
//   background: "#f8fafc",
//   text: "#1e293b",
//   textLight: "#64748b",
//   border: "#e2e8f0",
// };

// export default function PatientChatScreen() {
//   // const [messages, setMessages] = useState([]);
//   const [messages, setMessages] = useState<any[]>([]);

//   const [authToken, setAuthToken] = useState(null);
//   const [chatId, setChatId] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(true); // 👈 loading state

//   const socketRef = useRef(null);

//   useEffect(() => {
//     const loadUserData = async () => {
//       const storedToken = await AsyncStorage.getItem("token");
//       const storedUser = await AsyncStorage.getItem("userId");

//       if (storedToken) setAuthToken(storedToken);
//       if (storedUser) setUserId(storedUser);
//     };
//     loadUserData();
//   }, []);
// //  const SOCKET_URL = "https://vintagecms.cloud";

//   const setupSocket = (userId) => {
//     if (socketRef.current) return;
    

//     // socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });
// socketRef.current = io(SOCKET_URL, {
//   transports: ["websocket"],
//   path: "/socket.io",
// });

//     socketRef.current.on("connect", () => {
//       console.log("Socket Connected ✅", socketRef.current.id);
//       socketRef.current.emit("registerUser", userId);
//     });

//     socketRef.current.on("receiveMessage", (msg) => {
//       const formatted = {
//         _id: Math.random().toString(),
//         text: msg.message,
//         createdAt: new Date(msg.timestamp),
//         user: {
//           _id: msg.senderId === userId ? 1 : 2,
//           name: msg.senderId === userId ? "You" : "Doctor",
//         },
//       };
//       setMessages((prev) => GiftedChat.append(prev, [formatted]));
//     });
//   };

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

//   const initChat = async () => {
//     if (!authToken) return;
//     try {
//       setLoading(true); // 👈 start loading
//       const res = await axios.get(`${API_BASE}/chat/my-chats`, {
//         headers: { Authorization: authToken },
//       });

//       let chat = res.data.data[0];

//       if (!chat) {
//         const startRes = await axios.post(
//           `${API_BASE}/chat/start`,
//           {},
//           { headers: { Authorization: authToken } }
//         );
//         chat = startRes.data.data;
//       }

//       setChatId(chat._id);
//       await AsyncStorage.setItem("activeChatId", chat._id);
//       setMessages(mongoChatToGiftedChat(chat));

//       if (userId) setupSocket(userId);
//     } catch (err) {
//       console.log("Init Chat Error:", err.response?.data || err);
//       Alert.alert("Chat Error", "Unable to initialize chat");
//     } finally {
//       setLoading(false); // 👈 stop loading
//     }
//   };

//   useEffect(() => {
//     if (authToken && userId) initChat();
//   }, [authToken, userId]);

//   const handleSend = async () => {
//     if (!text.trim()) return;

//     const newMsg = {
//       _id: Math.random().toString(),
//       text,
//       createdAt: new Date(),
//       user: { _id: 1 },
//     };

//     setMessages((prev) => GiftedChat.append(prev, [newMsg]));
//     setText("");

//     try {
//       const activeChatId = await AsyncStorage.getItem("activeChatId");

//       if (socketRef.current) {
//   socketRef.current.emit("sendPrivateMessage", {
//     receiverId: "admin",
//     chatId: activeChatId,
//     message: newMsg.text,
//     senderId: userId,
//   });
// }

//       // socketRef.current.emit("sendPrivateMessage", {
//       //   receiverId: "admin",
//       //   chatId: activeChatId,
//       //   message: newMsg.text,
//       //   senderId: userId,
//       // });

//       await axios.post(
//         `${API_BASE}/chat/${activeChatId}/message`,
//         { message: newMsg.text },
//         { headers: { Authorization: authToken } }
//       );
//     } catch (err) {
//       console.log("Send Error:", err.response?.data || err);
//       Alert.alert("Error", "Failed to send message");
//     }
//   };
// useFocusEffect(
//   React.useCallback(() => {
//     // Screen focused
//     if (userId && !socketRef.current) {
//       setupSocket(userId);
//     }

//     return () => {
//       // Screen blurred (TAB change / back)
//       if (socketRef.current) {
//         console.log('Disconnecting socket on blur 🔌');
//         socketRef.current.off('receiveMessage');
//         socketRef.current.disconnect();
//         socketRef.current = null;
//       }
//     };
//   }, [userId])
// );
//   const renderBubble = (props) => (
//     <Bubble
//       {...props}
//       wrapperStyle={{
//         right: { backgroundColor: COLORS.primary, borderRadius: 16 },
//         left: {
//           backgroundColor: COLORS.surface,
//           borderRadius: 16,
//           borderWidth: 1,
//           borderColor: COLORS.border,
//         },
//       }}
//       textStyle={{ right: { color: "#fff" }, left: { color: COLORS.text } }}
//     />
//   );

//   // 👇 Show loading spinner while chat loads
//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={COLORS.primary} />
//         <Text style={{ color: COLORS.textLight, marginTop: 10 }}>
//           Loading chat...
//         </Text>
//       </View>
//     );
//   }

//   return (
//   <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//         keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
//       >
//     {Array.isArray(messages) && messages.length === 0 && (
//   <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//     <Text>Start the conversation</Text>
//   </View>
// )}
 
//         <View style={{ flex: 1 }}>
//           <GiftedChat
//             messages={messages}
//             user={{ _id: 1 }}
//             renderInputToolbar={() => null}
//             scrollToBottom
//             inverted
//           />
//         </View>

//         {/* Input Bar */}
//         <View style={styles.inputSection}>
//           <TextInput
//             value={text}
//             onChangeText={setText}
//             placeholder="Type a message..."
//             placeholderTextColor={COLORS.textLight}
//             style={styles.input}
//             multiline
//           />
//           <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
//             <Icon name="send" size={24} color="#fff" />
//           </TouchableOpacity>
     
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//   inputSection: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: COLORS.surface,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.border,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: Platform.OS === "ios" ? 10 : 6, // 👈 prevent text clipping
//     fontSize: 16,
//     maxHeight: 120,
//     textAlignVertical: "top", // 👈 fixes cut text in Android multiline
//   },
//   sendButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: COLORS.primary,
//     justifyContent: "center",
//     alignItems: "center",
//     marginLeft: 8,
//   },
//     loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: COLORS.background,
//   },
// });




// import React, { useState, useEffect, useRef } from "react";
// import {
//   StyleSheet,
//   View,
//   Alert,
//   Animated,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   ActivityIndicator,
//   Text,
//   Keyboard,
// } from "react-native";
// import { Bubble, GiftedChat } from "react-native-gifted-chat";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_BASE, SOCKET_URL } from "../constants/Constant";
// import io from "socket.io-client";
// import { LogBox } from "react-native";
// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from "react-native-safe-area-context";
// import { useFocusEffect } from "@react-navigation/native";

// LogBox.ignoreLogs([
//   'A props object containing a "key" prop is being spread into JSX',
// ]);

// const COLORS = {
//   primary: "#6366f1",
//   surface: "#fff",
//   background: "#f8fafc",
//   text: "#1e293b",
//   textLight: "#64748b",
//   border: "#e2e8f0",
// };

// export default function PatientChatScreen() {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [authToken, setAuthToken] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(true);

//   const socketRef = useRef<any>(null);


//   /* 🔥 safe area inset (KEY FIX) */
//   const insets = useSafeAreaInsets();

//   useEffect(() => {
//     const loadUserData = async () => {
//       const storedToken = await AsyncStorage.getItem("token");
//       const storedUser = await AsyncStorage.getItem("userId");
//       if (storedToken) setAuthToken(storedToken);
//       if (storedUser) setUserId(storedUser);
//     };
//     loadUserData();
//   }, []);

//   const setupSocket = (uid) => {
//     if (socketRef.current) return;

//     socketRef.current = io(SOCKET_URL, {
//       transports: ["websocket"],
//       path: "/socket.io",
//     });

//     socketRef.current.on("connect", () => {
//       socketRef.current.emit("registerUser", uid);
//     });

//     socketRef.current.on("receiveMessage", (msg) => {
//       const formatted = {
//         _id: Math.random().toString(),
//         text: msg.message,
//         createdAt: new Date(msg.timestamp),
//         user: { _id: msg.senderId === uid ? 1 : 2 },
//       };
//       setMessages((prev) => GiftedChat.append(prev, [formatted]));
//     });
//   };

 
//   const initChat = async () => {
//   if (!authToken) return;

//   try {
//     setLoading(true);

//     const res = await axios.get(`${API_BASE}/chat/my-chats`, {
//       headers: { Authorization: `Bearer ${authToken}` },
//     });

//     const chats = res?.data?.data || [];

//     // ✅ No chat yet
//     if (!chats.length) {
//       setMessages([]);
//       return;
//     }

//     const chat = chats[0];
//     const messages = chat?.messages || [];

//     setMessages(
//       messages
//         .map((m) => ({
//           _id: m._id,
//           text: m.message,
//           createdAt: new Date(m.timestamp),
//           user: { _id: m.sender === "admin" ? 2 : 1 },
//         }))
//         .reverse()
//     );

//     if (userId) setupSocket(userId);
//   } catch (error) {
//     console.log("Chat error:", error?.response?.data || error.message);
//     Alert.alert("Unable to load chat");
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     if (authToken && userId) initChat();
//   }, [authToken, userId]);

//   const handleSend = () => {
//     if (!text.trim()) return;

//     const msg = {
//       _id: Math.random().toString(),
//       text,
//       createdAt: new Date(),
//       user: { _id: 1 },
//     };

//     setMessages((prev) => GiftedChat.append(prev, [msg]));
//     setText("");

//     socketRef.current?.emit("sendPrivateMessage", {
//       receiverId: "admin",
//       message: msg.text,
//       senderId: userId,
//     });
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       if (userId && !socketRef.current) setupSocket(userId);
//       return () => {
//         socketRef.current?.disconnect();
//         socketRef.current = null;
//       };
//     }, [userId])
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={COLORS.primary} />
//         <Text>Loading chat...</Text>
//       </View>
//     );
//   }

// return (
//   <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
//     {/* Empty state */}
//     {Array.isArray(messages) && messages.length === 0 && (
//       <View style={styles.emptyContainer}>
//         <Text style={styles.emptyText}>Start the conversation</Text>
//       </View>
//     )}

//     {/* 🔥 Messages container */}
//     <View style={{ flex: 1 }}>
//       <GiftedChat
//         messages={messages}
//         user={{ _id: 1 }}
//         inverted
//         keyboardShouldPersistTaps="handled"
//         bottomOffset={insets.bottom}
//         renderInputToolbar={() => null}
//         renderBubble={(props) => (
//           <Bubble
//             {...props}
//             wrapperStyle={{
//               right: {
//                 backgroundColor: "#DCF8C6", // WhatsApp greenDCF8C6
//                 padding: 4,
//               },
//               left: {
//                 backgroundColor: "#FFFFFF",
//                 padding: 4,
//               },
//             }}
//             textStyle={{
//               right: { color: "#000" },
//               left: { color: "#000" },
//             }}
            
//           />
//         )}
//         timeTextStyle={{
//         right: { color: "#4B5563" }, // ✅ FIXED (dark gray)
//         left: { color: "#6B7280" },
//       }}
//         listViewProps={{
//           showsVerticalScrollIndicator: false,
//         }}
//       />
//     </View>

//     {/* 🔥 Input / Send container (WhatsApp style) */}
//     <View style={styles.inputSection}>
//       <TextInput
//         value={text}
//         onChangeText={setText}
//         placeholder="Type a message..."
//         placeholderTextColor={COLORS.textLight}
//         multiline
//         style={styles.input}
//       />

//       <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
//         <Icon name="send" size={22} color="#fff" />
//       </TouchableOpacity>
//     </View>
//   </SafeAreaView>
// );


// }

// const styles = StyleSheet.create({
//   emptyContainer: {
//   position: "absolute",
//   top: 0,
//   bottom: 60,
//   left: 0,
//   right: 0,
//   justifyContent: "center",
//   alignItems: "center",
// },
// emptyText: {
//   color: COLORS.textLight,
//   fontSize: 14,
// },

// inputSection: {
//   flexDirection: "row",
//   alignItems: "center",
//   backgroundColor: "#F0F0F0",
//   paddingHorizontal: 8,
//   paddingVertical: 6,
//   borderTopWidth: 0,
// },

// input: {
//   flex: 1,
//   backgroundColor: "#fff",
//   borderRadius: 22,
//   paddingHorizontal: 16,
//   paddingVertical: Platform.OS === "ios" ? 10 : 8,
//   fontSize: 16,
//   maxHeight: 120,
// },

// sendButton: {
//   width: 44,
//   height: 44,
//   borderRadius: 22,
//   backgroundColor: "#25D366", // WhatsApp green
//   justifyContent: "center",
//   alignItems: "center",
//   marginLeft: 6,
// },

 
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });


// import React, { useState, useEffect, useRef } from "react";
// import {
//   StyleSheet,
//   View,
//   Alert,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   ActivityIndicator,
//   Text,
//   KeyboardAvoidingView,
// } from "react-native";
// import { Bubble, GiftedChat } from "react-native-gifted-chat";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_BASE, SOCKET_URL } from "../constants/Constant";
// import io from "socket.io-client";
// import { LogBox } from "react-native";
// import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
// import { useFocusEffect } from "@react-navigation/native";
// import Colors from "../constants/Colors";

// LogBox.ignoreLogs([
//   'A props object containing a "key" prop is being spread into JSX',
// ]);

// const INPUT_HEIGHT = 60;

// const COLORS = {
//   background: "#f8fafc",
//   textLight: "#64748b",
// };

// export default function PatientChatScreen() {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [authToken, setAuthToken] = useState<string | null>(null);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(true);

//   const socketRef = useRef<any>(null);
//   const insets = useSafeAreaInsets();

//   /* =========================
//      LOAD USER
//   ========================= */
//   useEffect(() => {
//     (async () => {
//       const token = await AsyncStorage.getItem("token");
//       const uid = await AsyncStorage.getItem("userId");
//       if (token) setAuthToken(token);
//       if (uid) setUserId(uid);
//     })();
//   }, []);

//   /* =========================
//      SOCKET
//   ========================= */
//   const setupSocket = (uid: string) => {
//     if (socketRef.current) return;

//     socketRef.current = io(SOCKET_URL, {
//       transports: ["websocket"],
//       path: "/socket.io",
//     });

//     socketRef.current.on("connect", () => {
//       socketRef.current.emit("registerUser", uid);
//     });

//     socketRef.current.on("receiveMessage", msg => {
//       setMessages(prev =>
//         GiftedChat.append(prev, [
//           {
//             _id: Math.random().toString(),
//             text: msg.message,
//             createdAt: new Date(msg.timestamp),
//             user: { _id: msg.senderId === uid ? 1 : 2 },
//           },
//         ])
//       );
//     });
//   };

//   /* =========================
//      LOAD CHAT
//   ========================= */
//   const initChat = async () => {
//     if (!authToken) return;

//     try {
//       setLoading(true);
//       const res = await axios.get(`${API_BASE}/chat/my-chats`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       });

//       const chats = res?.data?.data || [];
//       if (!chats.length) {
//         setMessages([]);
//         return;
//       }

//       const chat = chats[0];
//       setMessages(
//         chat.messages
//           .map(m => ({
//             _id: m._id,
//             text: m.message,
//             createdAt: new Date(m.timestamp),
//             user: { _id: m.sender === "admin" ? 2 : 1 },
//           }))
//           .reverse()
//       );

//       if (userId) setupSocket(userId);
//     } catch {
//       Alert.alert("Unable to load chat");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (authToken && userId) initChat();
//   }, [authToken, userId]);

//   /* =========================
//      SEND
//   ========================= */
//   const handleSend = () => {
//     if (!text.trim()) return;

//     const msg = {
//       _id: Math.random().toString(),
//       text,
//       createdAt: new Date(),
//       user: { _id: 1 },
//     };

//     setMessages(prev => GiftedChat.append(prev, [msg]));
//     setText("");

//     socketRef.current?.emit("sendPrivateMessage", {
//       receiverId: "admin",
//       message: msg.text,
//       senderId: userId,
//     });
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       if (userId && !socketRef.current) setupSocket(userId);
//       return () => {
//         socketRef.current?.disconnect();
//         socketRef.current = null;
//       };
//     }, [userId])
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" />
//         <Text>Loading chat...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
    //       <KeyboardAvoidingView
    //   style={{ flex: 1 }}
    //   behavior={Platform.OS === "ios" ? "padding" : undefined}
    //   keyboardVerticalOffset={insets.top}
    // >
//       {/* MESSAGES */}
//       <View style={{ flex: 1 }}>
//         <GiftedChat
//           messages={messages}
//           user={{ _id: 1 }}
//           inverted
//           renderInputToolbar={() => null}
//           keyboardShouldPersistTaps="handled"
//           timeTextStyle={{
//   right: { color: "#6B7280", fontSize: 11 },
//   left: { color: "#9CA3AF", fontSize: 11 },
// }}

        
//           listViewProps={{
//              showsVerticalScrollIndicator: false,
//   contentContainerStyle: {
//     paddingBottom: INPUT_HEIGHT + insets.bottom + 32,
//   },
// }}

         
//           renderBubble={(props) => (
//   <Bubble
//     {...props}
//     wrapperStyle={{
//       right: {
//         backgroundColor: "#E8F0FE", // soft LinkedIn blue
//         paddingVertical: 6,
//         paddingHorizontal: 10,
//         borderRadius: 16,
//         marginVertical: 4,
//       },
//       left: {
//         backgroundColor: "#FFFFFF",
//         paddingVertical: 6,
//         paddingHorizontal: 10,
//         borderRadius: 16,
//         marginVertical: 4,
//         borderWidth: 1,
//         borderColor: "#E5E7EB",
//       },
//     }}
//     textStyle={{
//       right: { color: "#111827", fontSize: 15 },
//       left: { color: "#111827", fontSize: 15 },
//     }}
    
//   />
// )}

//         />
//       </View>

//       {/* INPUT – ALWAYS JUST ABOVE KEYBOARD */}
//       <View style={[styles.absoluteInput, { paddingBottom: insets.bottom }]}>
//         <TextInput
//           value={text}
//           onChangeText={setText}
//           placeholder="Type a message..."
//           placeholderTextColor={COLORS.textLight}
//           multiline
//           style={styles.input}
//         />

//         <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
//           <Icon name="send" size={22} color="#fff" />
//         </TouchableOpacity>
//       </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// /* =========================
//    STYLES
// ========================= */
// const styles = StyleSheet.create({
//   absoluteInput: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: INPUT_HEIGHT,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F0F0F0",
//     paddingHorizontal: 8
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#fff",
//     borderRadius: 22,
//     paddingHorizontal: 14,
//     paddingVertical: Platform.OS === "ios" ? 8 : 10,
//     fontSize: 16,
//     maxHeight: 100,
    
//   },
//   sendButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: "#25D366",
//     justifyContent: "center",
//     alignItems: "center",
//     marginLeft: 6,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });



// import React, { useState, useEffect, useRef } from "react";
// import {
//   StyleSheet,
//   View,
//   Alert,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   ActivityIndicator,
//   Text,
//   KeyboardAvoidingView,
// } from "react-native";
// import { Bubble, GiftedChat } from "react-native-gifted-chat";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_BASE, SOCKET_URL } from "../constants/Constant";
// import io from "socket.io-client";
// import { LogBox } from "react-native";
// import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
// import { useFocusEffect } from "@react-navigation/native";
// import Colors from "../constants/Colors";

// LogBox.ignoreLogs([
//   'A props object containing a "key" prop is being spread into JSX',
// ]);

// const INPUT_HEIGHT = 60;

// const COLORS = {
//   background: "#fafcf8",
//   textLight: "#64748b",
// };

// export default function PatientChatScreen() {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [authToken, setAuthToken] = useState<string | null>(null);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(true);

//   const socketRef = useRef<any>(null);
//   const insets = useSafeAreaInsets();

//   /* =========================
//      LOAD USER
//   ========================= */
//   useEffect(() => {
//     (async () => {
//       const token = await AsyncStorage.getItem("token");
//       const uid = await AsyncStorage.getItem("userId");
//       if (token) setAuthToken(token);
//       if (uid) setUserId(uid);
//     })();
//   }, []);

//   /* =========================
//      SOCKET
//   ========================= */
//   const setupSocket = (uid: string) => {
//     if (socketRef.current) return;

//     socketRef.current = io(SOCKET_URL, {
//       transports: ["websocket"],
//       path: "/socket.io",
//     });

//     socketRef.current.on("connect", () => {
//       socketRef.current.emit("registerUser", uid);
//     });

//     socketRef.current.on("receiveMessage", msg => {
//       setMessages(prev =>
//         GiftedChat.append(prev, [
//           {
//             _id: Math.random().toString(),
//             text: msg.message,
//             createdAt: new Date(msg.timestamp),
//             user: { _id: msg.senderId === uid ? 1 : 2 },
//           },
//         ])
//       );
//     });
//   };

//   /* =========================
//      LOAD CHAT
//   ========================= */
//   const initChat = async () => {
//     if (!authToken) return;

//     try {
//       setLoading(true);
//       const res = await axios.get(`${API_BASE}/chat/my-chats`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       });

//       const chats = res?.data?.data || [];
//       if (!chats.length) {
//         setMessages([]);
//         return;
//       }

//       const chat = chats[0];
//       setMessages(
//         chat.messages
//           .map(m => ({
//             _id: m._id,
//             text: m.message,
//             createdAt: new Date(m.timestamp),
//             user: { _id: m.sender === "admin" ? 2 : 1 },
//           }))


//       );

//       if (userId) setupSocket(userId);
//     } catch (error) {
//   console.log("CHAT LOAD ERROR:", error?.response?.data || error.message);
//   Alert.alert("Unable to load chat");


//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (authToken && userId) initChat();
//   }, [authToken, userId]);

//   /* =========================
//      SEND
//   ========================= */
//   const handleSend = () => {
//     if (!text.trim()) return;

//     const msg = {
//       _id: Math.random().toString(),
//       text,
//       createdAt: new Date(),
//       user: { _id: 1 },
//     };

//     setMessages(prev => GiftedChat.append(prev, [msg]));
//     setText("");

//     socketRef.current?.emit("sendPrivateMessage", {
//       receiverId: "admin",
//       message: msg.text,
//       senderId: userId,
//     });
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       if (userId && !socketRef.current) setupSocket(userId);
//       return () => {
//         socketRef.current?.disconnect();
//         socketRef.current = null;
//       };
//     }, [userId])
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" />
//         <Text>Loading chat...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
//          <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       keyboardVerticalOffset={insets.top}
//     >
//   <View style={{ flex: 1 }}>
//     <GiftedChat
//       messages={messages}
//       user={{ _id: 1 }}
//       renderInputToolbar={() => null}
//       keyboardShouldPersistTaps="handled"
//       alignTop={false}
//       scrollToBottom

//         timeTextStyle={{
//     right: { color: "#6B7280", fontSize: 11 },
//     left: { color: "#6B7280", fontSize: 11 },
//   }}
//       listViewProps={{
//         showsVerticalScrollIndicator: false,
//         contentContainerStyle: {
//           paddingTop: 8,
//           paddingBottom: INPUT_HEIGHT + insets.bottom,
//           flexGrow: 1,
//           justifyContent: messages.length === 0 ? "center" : "flex-end",
//         },
//       }}
//               renderBubble={(props) => (
//   <Bubble
//     {...props}
//     wrapperStyle={{
//       right: {
//         backgroundColor: "#E8F0FE", // soft LinkedIn blue
//         paddingVertical: 6,
//         paddingHorizontal: 10,
//         borderRadius: 16,
//         marginVertical: 4,
//       },
//       left: {
//         backgroundColor: "#FFFFFF",
//         paddingVertical: 6,
//         paddingHorizontal: 10,
//         borderRadius: 16,
//         marginVertical: 4,
//         borderWidth: 1,
//         borderColor: "#E5E7EB",
//       },
//     }}
//     textStyle={{
//       right: { color: "#111827", fontSize: 15 },
//       left: { color: "#111827", fontSize: 15 },
//     }}
    
//   />
// )}
//     />
//   </View>

//   {/* INPUT */}
//   <View style={[styles.absoluteInput, { paddingBottom: insets.bottom }]}>
//     <TextInput
//       value={text}
//       onChangeText={setText}
//       placeholder="Type a message..."
//       placeholderTextColor={COLORS.textLight}
//       multiline
//       style={styles.input}
//     />
//     <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
//       <Icon name="send" size={22} color="#fff" />
//     </TouchableOpacity>
//   </View>
//   </KeyboardAvoidingView>
// </SafeAreaView>

//   );
// }

// /* =========================
//    STYLES
// ========================= */
// const styles = StyleSheet.create({
//   absoluteInput: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: INPUT_HEIGHT,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F0F0F0",
//     paddingHorizontal: 8
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#fff",
//     borderRadius: 22,
//     paddingHorizontal: 14,
//     paddingVertical: Platform.OS === "ios" ? 8 : 10,
//     fontSize: 16,
//     maxHeight: 100,
    
//   },
//   sendButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: "#25D366",
//     justifyContent: "center",
//     alignItems: "center",
//     marginLeft: 6,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });



import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE, SOCKET_URL } from "../constants/Constant";

import { LogBox } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { useSocket } from "../context/SocketContext";

LogBox.ignoreLogs([
  'A props object containing a "key" prop is being spread into JSX',
]);

const INPUT_HEIGHT = 60;

const COLORS = {
  background: "#fafcf8",
  textLight: "#64748b",
};

export default function PatientChatScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
const [chatId, setChatId] = useState<string | null>(null);
const socketRef = useSocket();

  // const socketRef = useRef<any>(null);
  const insets = useSafeAreaInsets();

  /* =========================
     LOAD USER
  ========================= */

  useEffect(() => {


 
 const socket = socketRef?.current;
  if (!socket) return;
  const handleReceive = (msg: any) => {
    setMessages(prev =>
      GiftedChat.append(prev, [
        {
          _id: Math.random().toString(),
          text: msg.message,
          createdAt: new Date(msg.timestamp),
          user: { _id: msg.senderId === userId ? 1 : 2 },
        },
      ])
    );
  };
const handleEdit = ({ index, message }: any) => {
  setMessages(prev => {
    const updated = [...prev];

    // GiftedChat is reversed (latest first)
    const reversedIndex = updated.length - 1 - index;

    if (updated[reversedIndex]) {
      updated[reversedIndex] = {
        ...updated[reversedIndex],
        text: message,
      };
    }

    return updated;
  });
};
  const handleDelete = ({ index }: any) => {
    setMessages(prev => {
      const updated = [...prev];
      const reversedIndex = updated.length - 1 - index;

      if (updated[reversedIndex]) {
        updated[reversedIndex] = {
          ...updated[reversedIndex],
          text: "This message was deleted",
        };
      }

      return updated;
    });
  };

  socket.on("receiveMessage", handleReceive);
  socket.on("messageDeleted", handleDelete);
  socket.on("messageEdited", handleEdit);


  return () => {
    socket.off("receiveMessage", handleReceive);
    socket.off("messageDeleted", handleDelete);
    socket.off("messageEdited", handleEdit);

    
  };

}, [socketRef, userId]);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      const uid = await AsyncStorage.getItem("userId");
      if (token) setAuthToken(token);
      if (uid) setUserId(uid);
    })();
  }, []);

  /* =========================
     SOCKET
  ========================= */
 
  /* =========================
     LOAD CHAT
  ========================= */
 const initChat = async () => {
  if (!authToken) return;

  try {
    setLoading(true);

    const res = await axios.get(`${API_BASE}/chat/my-chats`, {
      headers: { Authorization: authToken }, // match your working backend
    });

    const chats = res?.data?.data || [];

    if (!chats.length) {
      setMessages([]);
      return;
    }

    const chat = chats[0];

    setChatId(chat._id);
    await AsyncStorage.setItem("activeChatId", chat._id);

    const formattedMessages = chat.messages
      .map(m => ({
        _id: m._id,
        text: m.message,
        createdAt: new Date(m.timestamp),
        user: { _id: m.sender === "admin" ? 2 : 1 },
      }))
      .sort((a, b) => b.createdAt - a.createdAt); // important

    setMessages(formattedMessages);

    

  } catch (error) {
    console.log("CHAT LOAD ERROR:", error?.response?.data || error.message);
    Alert.alert("Unable to load chat");
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    if (authToken && userId) initChat();
  }, [authToken, userId]);

  /* =========================
     SEND
  ========================= */
//   const handleSend = async () => {
//   if (!text.trim()) return;

//   const msg = {
//     _id: Math.random().toString(),
//     text,
//     createdAt: new Date(),
//     user: { _id: 1 },
//   };

//   setMessages(prev => GiftedChat.append(prev, [msg]));
//   setText("");

//   try {
//     const activeChatId = await AsyncStorage.getItem("activeChatId");

//     socketRef.current?.emit("sendPrivateMessage", {
//       receiverId: "admin",
//       chatId: activeChatId, // ✅ FIXED
//       message: msg.text,
//       senderId: userId,
//     });

//     await axios.post(
//       `${API_BASE}/chat/${activeChatId}/message`,
//       { message: msg.text },
//       { headers: { Authorization: authToken } }
//     );

//   } catch (error) {
//     console.log("SEND ERROR:", error?.response?.data || error.message);
//   }
// };


const handleSend = async () => {
  if (!text.trim() || !authToken) return;

  let messageText = text;

  const localMsg = {
    _id: Math.random().toString(),
    text: messageText,
    createdAt: new Date(),
    user: { _id: 1 },
  };

  setMessages(prev => GiftedChat.append(prev, [localMsg]));
  setText("");

  try {
    let activeChatId = await AsyncStorage.getItem("activeChatId");


    // 🔥 If no chat → create
    if (!activeChatId) {
      const startRes = await axios.post(
        `${API_BASE}/chat/start`,
        {},
        { headers: { Authorization: authToken } }
      );

      activeChatId = startRes.data.data._id;
      await AsyncStorage.setItem("activeChatId", activeChatId);
      setChatId(activeChatId);
    }

    await axios.post(
      `${API_BASE}/chat/${activeChatId}/message`,
      { message: messageText },
      { headers: { Authorization: authToken } }
    );

    socketRef.current?.emit("sendPrivateMessage", {
      receiverId: "admin",
      chatId: activeChatId,
      message: messageText,
      senderId: userId,
    });

  } catch (error: any) {

    // 💥 If admin deleted chat
    if (error?.response?.status === 404) {

      try {
        // create new chat
        const startRes = await axios.post(
          `${API_BASE}/chat/start`,
          {},
          { headers: { Authorization: authToken } }
        );

        const newChatId = startRes.data.data._id;

        await AsyncStorage.setItem("activeChatId", newChatId);
        setChatId(newChatId);

        // 🔁 resend message
        await axios.post(
          `${API_BASE}/chat/${newChatId}/message`,
          { message: messageText },
          { headers: { Authorization: authToken } }
        );

        socketRef.current?.emit("sendPrivateMessage", {
          receiverId: "admin",
          chatId: newChatId,
          message: messageText,
          senderId: userId,
        });

      } catch (err) {
        console.log("RETRY FAILED:", err);
        Alert.alert("Unable to restart chat");
      }

    } else {
      console.log("SEND ERROR:", error);
    }
  }
};

 

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading chat...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
               {Array.isArray(messages) && messages.length === 0 && (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Start the conversation</Text>
  </View>
)}
         <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={insets.top}
    >
  
  <View style={{ flex: 1 }}>
    <GiftedChat
      messages={messages}
      user={{ _id: 1 }}
      renderInputToolbar={() => null}
      keyboardShouldPersistTaps="handled"
      alignTop={false}
      scrollToBottom

        timeTextStyle={{
    right: { color: "#6B7280", fontSize: 11 },
    left: { color: "#6B7280", fontSize: 11 },
  }}
      listViewProps={{
        showsVerticalScrollIndicator: false,
        contentContainerStyle: {
          paddingTop: 8,
          paddingBottom: INPUT_HEIGHT + insets.bottom,
          flexGrow: 1,
          justifyContent: messages.length === 0 ? "center" : "flex-end",
        },
      }}
              renderBubble={(props) => (
  <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: "#E8F0FE", // soft LinkedIn blue
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 16,
        marginVertical: 4,
      },
      left: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 16,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: "#E5E7EB",
      },
    }}
    textStyle={{
      right: { color: "#111827", fontSize: 15 },
      left: { color: "#111827", fontSize: 15 },
    }}
    
  />
)}
    />
  </View>

  {/* INPUT */}
  <View style={[styles.absoluteInput, { paddingBottom: insets.bottom }]}>
    <TextInput
      value={text}
      onChangeText={setText}
      placeholder="Type a message..."
      placeholderTextColor={COLORS.textLight}
      multiline
      style={styles.input}
    />
    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
      <Icon name="send" size={22} color="#fff" />
    </TouchableOpacity>
  </View>
  </KeyboardAvoidingView>
</SafeAreaView>

  );
}

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  absoluteInput: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: INPUT_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 8
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 8 : 10,
    fontSize: 16,
    maxHeight: 100,
    
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#25D366",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
