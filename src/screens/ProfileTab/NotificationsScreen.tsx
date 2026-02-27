// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_BASE } from '../../constants/Constant';

// const NotificationsScreen = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadNotifications();
//   }, []);

//   const loadNotifications = async () => {
//   try {
//     const token = await AsyncStorage.getItem('token');
//     const userId = await AsyncStorage.getItem('userId');

//     // 🔒 Guard: user not logged in
//     if (!token || !userId) {
//       setNotifications([]);
//       return;
//     }

//     const headers = {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     };

//     const [meetingsRes, chatsRes] = await Promise.all([
//       fetch(`${API_BASE}/meetings?userId=${userId}`, { headers }),
//       fetch(`${API_BASE}/chat/my-chats`, { headers }),
//     ]);

//     const meetingsJson = await meetingsRes.json();
//     const chatsJson = await chatsRes.json();

//     const meetings = Array.isArray(meetingsJson?.meetings)
//       ? meetingsJson.meetings
//       : [];

//     const chats = Array.isArray(chatsJson?.data)
//       ? chatsJson.data
//       : [];

//     const meetingNotifications = buildMeetingNotifications(meetings);
//     const chatNotifications = buildChatNotifications(chats);

//     const allNotifications = [...meetingNotifications, ...chatNotifications]
//       .filter(Boolean)
//       .sort((a, b) => new Date(b.date) - new Date(a.date));

//     setNotifications(allNotifications);
//   } catch (error) {
//     console.log('Notification load error:', error);
//     setNotifications([]);
//   } finally {
//     setLoading(false);
//   }
// };


//   /* ------------------ BUILDERS ------------------ */

// const buildMeetingNotifications = (meetings = []) =>
//   meetings.map(m => {
//     if (!m || !m._id) return null;

//     let title = 'Consultation Update';
//     let body = '';
//     let type = 'info';
//     let date = m.updatedAt || m.startTime || new Date();

//     if (m.status === 'pending') {
//       title = 'Consultation Requested';
//       body = `Topic: ${m.topic || 'Consultation'}`;
//       type = 'reminder';
//     } else if (m.status === 'accepted') {
//       title = 'Consultation Confirmed';
//       body = `Topic: ${m.topic || 'Consultation'}\nScheduled on ${new Date(m.startTime).toLocaleString()}`;
//       type = 'success';
//     } else if (m.status === 'ended') {
//       title = 'Consultation Completed';
//       body = `Topic: ${m.topic || 'Consultation'}\nCompleted on ${new Date(m.endedAt || m.startTime).toLocaleString()}`;
//       type = 'success';
//     } else if (m.status === 'declined') {
//       title = 'Consultation Declined';
//       body = `Topic: ${m.topic || 'Consultation'}`;
//       type = 'info';
//     }

//     return {
//       id: `meeting-${m._id}`,
//       title,
//       body,
//       time: formatTime(date),
//       date,
//       type,
//     };
//   }).filter(Boolean);




// const buildChatNotifications = (chats = []) =>
//   chats
//     .map(chat => {
//       if (!chat?.messages) return null;

//       const adminMessages = chat.messages.filter(m => m.sender === 'admin');
//       if (adminMessages.length === 0) return null;

//       const lastAdminMsg = adminMessages[adminMessages.length - 1];

//       return {
//         id: `chat-${chat._id}`,
//         title: 'New Message from Admin',
//         body:
//           lastAdminMsg.message?.length > 50
//             ? lastAdminMsg.message.slice(0, 50) + '...'
//             : lastAdminMsg.message || 'You received a new message.',
//         time: formatTime(lastAdminMsg.timestamp),
//         date: lastAdminMsg.timestamp,
//         type: 'message',
//       };
//     })
//     .filter(Boolean);


//   /* ------------------ UI HELPERS ------------------ */

//   const formatTime = (date) => {
//     if (!date) return '';
//     const diff = Math.floor((Date.now() - new Date(date)) / 60000);
//     if (diff < 60) return 'Just now';
//     if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
//     return `${Math.floor(diff / 1440)}d ago`;
//   };

//   const renderIcon = (type) => {
//     switch (type) {
//       case 'success':
//         return <Icon name="check-circle" size={28} color="#28a745" />;
//       case 'message':
//         return <Icon name="message-text" size={28} color="#007bff" />;
//       case 'reminder':
//         return <Icon name="bell-ring" size={28} color="#ffc107" />;
//       case 'info':
//         return <Icon name="information" size={28} color="#17a2b8" />;
//       default:
//         return <Icon name="bell" size={28} color="#333" />;
//     }
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.notificationItem} activeOpacity={1}>
//       <View style={styles.iconContainer}>{renderIcon(item.type)}</View>
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.body}>{item.body}</Text>
//         <Text style={styles.time}>{item.time}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   /* ------------------ RENDER ------------------ */

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <Text style={styles.noNotif}>Loading updates...</Text>
//       ) : notifications.length === 0 ? (
//         // <Text style={styles.noNotif}>No updates yet</Text>
//         <Text style={styles.noNotif}>
//   You're all set 🎉{"\n"}
//   Updates about messages and consultations will appear here.
// </Text>

//       ) : (
//         <FlatList
//           data={notifications}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={{ paddingBottom: 16 }}
//         />
//       )}
//     </View>
//   );
// };

// /* ------------------ STYLES ------------------ */

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },
//   notificationItem: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 12,
//     elevation: 2,
//   },
//   iconContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 40,
//   },
//   textContainer: { flex: 1, paddingLeft: 12 },
//   title: { fontWeight: 'bold', fontSize: 16, color: '#333' },
//   body: { fontSize: 14, color: '#555', marginVertical: 4 },
//   time: { fontSize: 12, color: '#888' },
//   noNotif: { textAlign: 'center', marginTop: 50, color: 'gray', fontSize: 16 },
// });

// export default NotificationsScreen;


// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_BASE } from '../../constants/Constant';
// const IOS_APP_URL = 'https://apps.apple.com/app/idXXXXXXXXXX'; // replace
// const ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.yourapp'; // replace

// const NotificationsScreen = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadNotifications();
//   }, []);

//   const loadNotifications = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const userId = await AsyncStorage.getItem('userId');

//       if (!token || !userId) {
//         setNotifications([]);
//         return;
//       }

//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };

//       const [meetingsRes, chatsRes] = await Promise.all([
//         fetch(`${API_BASE}/meetings?userId=${userId}`, { headers }),
//         fetch(`${API_BASE}/chat/my-chats`, { headers }),
//       ]);

//       const meetingsJson = await meetingsRes.json();
//       const chatsJson = await chatsRes.json();

//       const meetings = Array.isArray(meetingsJson?.meetings)
//         ? meetingsJson.meetings
//         : [];

//       const chats = Array.isArray(chatsJson?.data)
//         ? chatsJson.data
//         : [];

//       const meetingNotifications = buildMeetingNotifications(meetings);
//       const chatNotifications = buildChatNotifications(chats);

//       const allNotifications = [...meetingNotifications, ...chatNotifications]
//         .filter(Boolean)
//         .sort((a, b) => new Date(b.date) - new Date(a.date));

//       setNotifications(allNotifications);
//     } catch (error) {
//       console.log('Notification load error:', error);
//       setNotifications([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ------------------ BUILDERS ------------------ */

//   const buildMeetingNotifications = (meetings = []) =>
//     meetings
//       .map(m => {
//         if (!m || !m._id) return null;

//         let title = 'Consultation Update';
//         let body = '';
//         let type = 'info';
//         let date = m.updatedAt || m.startTime || new Date();

//         if (m.status === 'pending') {
//           title = 'Consultation Requested';
//           body = `Topic: ${m.topic || 'Consultation'}`;
//           type = 'reminder';
//         } else if (m.status === 'accepted') {
//           title = 'Consultation Confirmed';
//           body = `Topic: ${m.topic || 'Consultation'}\nScheduled on ${new Date(
//             m.startTime
//           ).toLocaleString()}`;
//           type = 'success';
//         } else if (m.status === 'ended') {
//           title = 'Consultation Completed';
//           body = `Topic: ${m.topic || 'Consultation'}\nCompleted on ${new Date(
//             m.endedAt || m.startTime
//           ).toLocaleString()}`;
//           type = 'success';
//         } else if (m.status === 'declined') {
//           title = 'Consultation Declined';
//           body = `Topic: ${m.topic || 'Consultation'}`;
//           type = 'info';
//         }

//         return {
//           id: `meeting-${m._id}`,
//           title,
//           body,
//           time: formatTime(date),
//           date,
//           type,
//         };
//       })
//       .filter(Boolean);

//   const buildChatNotifications = (chats = []) =>
//     chats
//       .map(chat => {
//         if (!chat?.messages) return null;

//         const adminMessages = chat.messages.filter(m => m.sender === 'admin');
//         if (adminMessages.length === 0) return null;

//         const lastAdminMsg = adminMessages[adminMessages.length - 1];

//         return {
//           id: `chat-${chat._id}`,
//           title: 'New Message from Admin',
//           body:
//             lastAdminMsg.message?.length > 50
//               ? lastAdminMsg.message.slice(0, 50) + '...'
//               : lastAdminMsg.message || 'You received a new message.',
//           time: formatTime(lastAdminMsg.timestamp),
//           date: lastAdminMsg.timestamp,
//           type: 'message',
//         };
//       })
//       .filter(Boolean);

//   /* ------------------ UI HELPERS ------------------ */

//   const formatTime = (date) => {
//     if (!date) return '';
//     const diff = Math.floor((Date.now() - new Date(date)) / 60000);
//     if (diff < 60) return 'Just now';
//     if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
//     return `${Math.floor(diff / 1440)}d ago`;
//   };

//   const renderIcon = (type) => {
//     switch (type) {
//       case 'success':
//         return <Icon name="check-circle" size={28} color="#28a745" />;
//       case 'message':
//         return <Icon name="message-text" size={28} color="#007bff" />;
//       case 'reminder':
//         return <Icon name="bell-ring" size={28} color="#ffc107" />;
//       case 'info':
//         return <Icon name="information" size={28} color="#17a2b8" />;
//       default:
//         return <Icon name="bell" size={28} color="#333" />;
//     }
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.notificationItem} activeOpacity={1}>
//       <View style={styles.iconContainer}>{renderIcon(item.type)}</View>
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.body}>{item.body}</Text>
//         <Text style={styles.time}>{item.time}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   /* ------------------ EMPTY STATE ------------------ */

//  const renderEkmptyState = () => (
//   <ScrollView contentContainerStyle={styles.emptyContainer}>
//     <Image
//       source={{
//         uri: 'https://vintagehealthbody.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-12-at-08.56.17_5fe3d2f7.jpg',
//       }}
//       style={styles.profileImage}
//     />

//     <Icon
//       name="cellphone-link"
//       size={42}
//       color="#6B7280"
//       style={{ marginBottom: 12 }}
//     />

//     <Text style={styles.emptyTitle}>Welcome to Vintage</Text>

//     <Text style={styles.emptyText}>
//       You are just a click away from becoming fiercely Vintage.
//     </Text>

//     <Text style={styles.emptyText}>
//       Stay informed and empowered with daily wellness updates covering hormones,
//       lifestyle balance, and supplement education.
//     </Text>

//     <Text style={styles.emptyText}>
//       Optional educational consults are available with a Family Nurse Practitioner
//       bringing over 28 years of real-world experience and understanding.
//     </Text>

//     <Text style={styles.emptyFooter}>
//       Available on iOS & Android • Secure • Informational
//     </Text>
//   </ScrollView>
// );

// const renderEmptyState = () => (
//   <ScrollView contentContainerStyle={styles.emptyContainer} showsVerticalScrollIndicator={false}>

//     {/* HERO SECTION */}
//     <View style={styles.heroCard}>
//       <Image
//         source={{
//           uri: 'https://vintagehealthbody.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-12-at-08.56.17_5fe3d2f7.jpg',
//         }}
//         style={styles.heroImage}
//       />

//       <Text style={styles.heroName}>Jennifer Mooneyham, FNP-BC</Text>
//       <Text style={styles.heroRole}>
//         Nurse Practitioner • 28+ Years Experience
//       </Text>

//       <View style={styles.badgeRow}>
//         <View style={styles.badge}>
//           <Icon name="message-text-outline" size={14} color="#4F46E5" />
//           <Text style={styles.badgeText}>Direct Messaging</Text>
//         </View>
//         <View style={styles.badge}>
//           <Icon name="calendar-clock" size={14} color="#4F46E5" />
//           <Text style={styles.badgeText}>Consult Updates</Text>
//         </View>
//       </View>
//     </View>

//     {/* INFO SECTION */}
//     <View style={styles.infoCard}>
//       <Icon name="information-outline" size={26} color="#4F46E5" />

//       <Text style={styles.infoTitle}>
//         Your Communication Hub
//       </Text>

//       <Text style={styles.infoText}>
//         This screen shows messages, consultation updates, and important
//         responses related to your care and education.
//       </Text>

//       <Text style={styles.infoText}>
//         Once you start a chat or book a consultation, all updates will
//         appear here in one place.
//       </Text>
//     </View>

//     {/* FOOTER */}
//     <View style={styles.footer}>
//       <Icon name="cellphone" size={16} color="#9CA3AF" />
//       <Text style={styles.platformText}>
//         Available on iOS & Android • Secure • Informational
//       </Text>
//     </View>

//   </ScrollView>
// );

//   /* ------------------ RENDER ------------------ */

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <Text style={styles.noNotif}>Loading updates...</Text>
//       ) : notifications.length === 0 ? (
//         renderEmptyState()
//       ) : (
//         <FlatList
//           data={notifications}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={{ paddingBottom: 16 }}
//         />
//       )}
//     </View>
//   );
// };

// /* ------------------ STYLES ------------------ */

// const styles = StyleSheet.create({
//   /* ---------- EMPTY STATE (PREMIUM) ---------- */

// emptyContainer: {
//   flexGrow: 1,
//   padding: 20,
//   backgroundColor: '#f8f9fa',
// },

// /* HERO CARD */
// heroCard: {
//   backgroundColor: '#ffffff',
//   borderRadius: 20,
//   padding: 20,
//   alignItems: 'center',
//   marginBottom: 20,
//   elevation: 3,
// },

// heroImage: {
//   width: 160,
//   height: 160,
//   borderRadius: 80,
//   marginBottom: 14,
// },

// heroName: {
//   fontSize: 18,
//   fontWeight: '700',
//   color: '#111827',
//   textAlign: 'center',
// },

// heroRole: {
//   fontSize: 13,
//   color: '#6B7280',
//   marginTop: 4,
//   marginBottom: 14,
//   textAlign: 'center',
// },

// badgeRow: {
//   flexDirection: 'row',
//   gap: 10,
// },

// badge: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   backgroundColor: '#EEF2FF',
//   paddingHorizontal: 10,
//   paddingVertical: 6,
//   borderRadius: 999,
// },

// badgeText: {
//   fontSize: 12,
//   color: '#4F46E5',
//   marginLeft: 6,
//   fontWeight: '500',
// },

// /* INFO CARD */
// infoCard: {
//   backgroundColor: '#ffffff',
//   borderRadius: 20,
//   padding: 20,
//   alignItems: 'center',
//   elevation: 3,
// },

// infoTitle: {
//   fontSize: 16,
//   fontWeight: '600',
//   color: '#111827',
//   marginTop: 10,
//   marginBottom: 8,
//   textAlign: 'center',
// },

// infoText: {
//   fontSize: 14,
//   color: '#4B5563',
//   lineHeight: 21,
//   textAlign: 'center',
//   marginBottom: 6,
// },

// /* FOOTER */
// footer: {
//   marginTop: 22,
//   flexDirection: 'row',
//   justifyContent: 'center',
//   alignItems: 'center',
// },

// platformText: {
//   fontSize: 12,
//   color: '#9CA3AF',
//   marginLeft: 6,
// },

//   container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },

//   notificationItem: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 12,
//     elevation: 2,
//   },

//   iconContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 40,
//   },

//   textContainer: { flex: 1, paddingLeft: 12 },

//   title: { fontWeight: 'bold', fontSize: 16, color: '#333' },
//   body: { fontSize: 14, color: '#555', marginVertical: 4 },
//   time: { fontSize: 12, color: '#888' },

//   noNotif: {
//     textAlign: 'center',
//     marginTop: 50,
//     color: 'gray',
//     fontSize: 16,
//   },

//   /* EMPTY STATE */
//   emptyContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//   },

//   emptyTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     marginBottom: 12,
//     color: '#111',
//     textAlign: 'center',
//   },

//   emptyText: {
//     fontSize: 15,
//     color: '#555',
//     textAlign: 'center',
//     marginBottom: 10,
//     lineHeight: 22,
//   },

//   emptyFooter: {
//     marginTop: 16,
//     fontSize: 12,
//     color: '#888',
//     textAlign: 'center',
//   },profileImage: {
//   width:380,
//   height: 250,
  
//   marginBottom: 16,
//   borderWidth: 2,
//   borderColor: '#e5e7eb',
// },

// });

// export default NotificationsScreen;



// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   Linking,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_BASE } from '../../constants/Constant';
// import { useNavigation } from '@react-navigation/native';

// const IOS_APP_URL = 'https://apps.apple.com/app/vintageappointment'; // replace
// const ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.vintageappointment'; // replace

// const NotificationsScreen = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     loadNotifications();
//   }, []);

//   /* ------------------ LOAD DATA ------------------ */

//   const loadNotifications = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const userId = await AsyncStorage.getItem('userId');

//       if (!token || !userId) {
//         setNotifications([]);
//         return;
//       }

//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };

//       const [meetingsRes, chatsRes] = await Promise.all([
//         fetch(`${API_BASE}/meetings?userId=${userId}`, { headers }),
//         fetch(`${API_BASE}/chat/my-chats`, { headers }),
//       ]);

//       const meetingsJson = await meetingsRes.json();
//       const chatsJson = await chatsRes.json();

//       const meetings = Array.isArray(meetingsJson?.meetings)
//         ? meetingsJson.meetings
//         : [];

//       const chats = Array.isArray(chatsJson?.data)
//         ? chatsJson.data
//         : [];

//       const meetingNotifications = buildMeetingNotifications(meetings);
//       const chatNotifications = buildChatNotifications(chats);

//       const allNotifications = [...meetingNotifications, ...chatNotifications]
//         .filter(Boolean)
//         .sort((a, b) => new Date(b.date) - new Date(a.date));

//       setNotifications(allNotifications);
//     } catch (e) {
//       console.log('Notification load error:', e);
//       setNotifications([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ------------------ BUILDERS ------------------ */

//   const buildMeetingNotifications = (meetings = []) =>
//     meetings
//       .map(m => {
//         if (!m?._id) return null;

//         let title = 'Consultation Update';
//         let body = '';
//         let type = 'info';
//         let date = m.updatedAt || m.startTime;

//         if (m.status === 'pending') {
//           title = 'Consultation Requested';
//           body = `Topic: ${m.topic || 'Consultation'}`;
//           type = 'reminder';
//         } else if (m.status === 'accepted') {
//           title = 'Consultation Confirmed';
//           body = `Topic: ${m.topic || 'Consultation'}\nScheduled on ${new Date(
//             m.startTime
//           ).toLocaleString()}`;
//           type = 'success';
//         } else if (m.status === 'ended') {
//           title = 'Consultation Completed';
//           body = `Topic: ${m.topic || 'Consultation'}\nCompleted successfully`;
//           type = 'success';
//         } else if (m.status === 'declined') {
//           title = 'Consultation Declined';
//           body = `Topic: ${m.topic || 'Consultation'}`;
//         }

//         return {
//           id: `meeting-${m._id}`,
//           title,
//           body,
//           time: formatTime(date),
//           date,
//           type,
//         };
//       })
//       .filter(Boolean);

//   const buildChatNotifications = (chats = []) =>
//     chats
//       .map(chat => {
//         const adminMessages = chat?.messages?.filter(m => m.sender === 'admin');
//         if (!adminMessages?.length) return null;

//         const last = adminMessages[adminMessages.length - 1];

//         return {
//           id: `chat-${chat._id}`,
//           title: 'New Message',
//           body:
//             last.message.length > 50
//               ? last.message.slice(0, 50) + '...'
//               : last.message,
//           time: formatTime(last.timestamp),
//           date: last.timestamp,
//           type: 'message',
//         };
//       })
//       .filter(Boolean);

//   /* ------------------ HELPERS ------------------ */

//   const formatTime = (date) => {
//     if (!date) return '';
//     const mins = Math.floor((Date.now() - new Date(date)) / 60000);
//     if (mins < 60) return 'Just now';
//     if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
//     return `${Math.floor(mins / 1440)}d ago`;
//   };

//   const renderIcon = (type) => {
//     const map = {
//       success: ['check-circle', '#22c55e'],
//       message: ['message-text', '#2563eb'],
//       reminder: ['bell-ring', '#f59e0b'],
//       info: ['information', '#0ea5e9'],
//     };
//     const [name, color] = map[type] || ['bell', '#6b7280'];
//     return <Icon name={name} size={26} color={color} />;
//   };


//   const renderEmptyState = () => (
//   <ScrollView
//     contentContainerStyle={styles.emptyContainer}
//     showsVerticalScrollIndicator={false}
//   >
//     {/* INFO */}
//     <View style={styles.infoGlass}>
//       <Text style={styles.infoTitle}>Your Communication Center</Text>
//       <Text style={styles.infoText}>
//         Messages, replies, and consultation updates will appear here once your
//         care journey begins.
//       </Text>
//     </View>
//     {/* STORE */}
//     <View style={styles.storeGlass}>
//       <Text style={styles.storeTitle}>Get the full experience</Text>

//       <View style={styles.storeRow}>
//         <TouchableOpacity
//           activeOpacity={0.85}
//           style={styles.storeBadge}
//           onPress={() => Linking.openURL(IOS_APP_URL)}
//         >
//           <Icon name="apple" size={18} color="#000" />
//           <Text style={styles.storeBadgeText}>App Store</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           activeOpacity={0.85}
//           style={styles.storeBadge}
//           onPress={() => Linking.openURL(ANDROID_APP_URL)}
//         >
//           <Icon name="google-play" size={18} color="#34a853" />
//           <Text style={styles.storeBadgeText}>Google Play</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </ScrollView>
// );


//   /* ------------------ RENDER ------------------ */

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <Text style={styles.loading}>Loading updates…</Text>
//       ) : notifications.length === 0 ? (
//         renderEmptyState()
//       ) : (
//         <FlatList
//           data={notifications}
//           keyExtractor={item => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.notificationItem}>
//               {renderIcon(item.type)}
//               <View style={styles.textContainer}>
//                 <Text style={styles.title}>{item.title}</Text>
//                 <Text style={styles.body}>{item.body}</Text>
//                 <Text style={styles.time}>{item.time}</Text>
//               </View>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// export default NotificationsScreen;

// const styles = StyleSheet.create({
//    emptyContainer: {
//     padding: 24,
//     paddingBottom: 40,
//     backgroundColor: '#F8FAFC',
//   },
//   /* ABOUT */
// aboutCard: {
//   backgroundColor: '#ffffff',
//   borderRadius: 20,
//   padding: 20,
//   marginBottom: 24,

//   shadowColor: '#000',
//   shadowOpacity: 0.05,
//   shadowRadius: 14,
//   elevation: 3,
// },

// aboutTitle: {
//   fontSize: 17,
//   fontWeight: '700',
//   color: '#0f172a',
//   marginBottom: 10,
// },

// aboutText: {
//   fontSize: 14.5,
//   color: '#475569',
//   lineHeight: 22,
//   marginBottom: 8,
// },

// /* SUBSCRIBE CTA */
// subscribeButton: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',

//   backgroundColor: '#111827',
//   borderRadius: 16,
//   paddingVertical: 16,
//   marginBottom: 8,
// },

// subscribeText: {
//   marginLeft: 8,
//   fontSize: 16,
//   fontWeight: '600',
//   color: '#ffffff',
// },

// subscribeHint: {
//   textAlign: 'center',
//   fontSize: 12,
//   color: '#6b7280',
//   marginBottom: 30,
// },


//   /* HERO */
//   heroSection: {
//     alignItems: 'center',
//     marginBottom: 28,
//   },

//   heroAvatar: {
//     width: 140,
//     height: 140,
//     borderRadius: 70,
//     marginBottom: 14,
//   },

//   heroName: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#0F172A',
//   },

//   heroRole: {
//     fontSize: 14,
//     color: '#64748B',
//     marginTop: 4,
//   },

//   pillRow: {
//     flexDirection: 'row',
//     marginTop: 14,
//     gap: 10,
//   },

//   pill: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#EFF6FF',
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 999,
//   },

//   pillText: {
//     marginLeft: 6,
//     fontSize: 13,
//     color: '#2563EB',
//     fontWeight: '500',
//   },

//   /* INFO GLASS */
//   infoGlass: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 20,
//     marginBottom: 24,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 16,
//     elevation: 3,
//   },

//   infoTitle: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#0F172A',
//     marginBottom: 6,
//   },

//   infoText: {
//     fontSize: 14.5,
//     color: '#475569',
//     lineHeight: 22,
//   },

//   /* STORE */
//   storeGlass: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 16,
//     elevation: 3,
//   },

//   storeTitle: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#0F172A',
//     marginBottom: 14,
//   },

//   storeRow: {
//     flexDirection: 'row',
//     gap: 5,
//   },

//   storeBadge: {flex:1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F1F5F9',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderRadius: 14,
//   },

//   storeBadgeText: {
//     marginLeft: 8,
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#0F172A',
//   },
//   container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
//   loading: { textAlign: 'center', marginTop: 40, color: '#6b7280' },

//   notificationItem: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     padding: 14,
//     marginBottom: 12,
//     elevation: 2,
//   },

//   textContainer: { marginLeft: 12, flex: 1 },
//   title: { fontSize: 15, fontWeight: '600', color: '#111' },
//   body: { fontSize: 14, color: '#555', marginVertical: 4 },
//   time: { fontSize: 12, color: '#888' },

//   /* EMPTY */
 
//   heroCard: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 20,
//     alignItems: 'center',
//     marginBottom: 20,
//     elevation: 3,
//   },

//   heroImage: { width: 150, height: 150, borderRadius: 75, marginBottom: 12 },
 
//   badgeRow: { flexDirection: 'row', gap: 10 },
//   badge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#eef2ff',
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 999,
//   },
//   badgeText: { marginLeft: 6, fontSize: 12, color: '#4f46e5' },

//   infoCard: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 18,
//     marginBottom: 20,
//     elevation: 3,
//   },
  
//   storeCard: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 18,
//     elevation: 3,
//   },
  
//   storeButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     borderRadius: 12,
//     paddingVertical: 10,
//     paddingHorizontal: 14,
//   },
//   storeText: { marginLeft: 8, fontSize: 13 },
// });


import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Linking,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE } from '../../constants/Constant';

const IOS_APP_URL = 'https://apps.apple.com/app/vintageappointment';
const ANDROID_APP_URL =
  'https://play.google.com/store/apps/details?id=com.vintageappointment';

const NotificationsScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  /* ---------------- API ---------------- */

  const fetchNotifications = useCallback(async () => {
    try {
      setError(false);

      const [token, userId] = await Promise.all([
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('userId'),
      ]);

      if (!token || !userId) {
        setData([]);
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const [meetingsRes, chatsRes] = await Promise.all([
        fetch(`${API_BASE}/meetings?userId=${userId}`, { headers }),
        fetch(`${API_BASE}/chat/my-chats`, { headers }),
      ]);

      const meetingsJson = await meetingsRes.json();
      const chatsJson = await chatsRes.json();

      const notifications = [
        ...buildMeetingNotifications(meetingsJson?.meetings),
        ...buildChatNotifications(chatsJson?.data),
      ]
        .filter(Boolean)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setData(notifications);
    } catch {
      setError(true);
      setData([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  /* ---------------- BUILDERS ---------------- */

  const buildMeetingNotifications = (meetings = []) =>
    Array.isArray(meetings)
      ? meetings.map(m => {
          if (!m?._id) return null;

          const map = {
            pending: {
              title: 'Consultation Requested',
              type: 'reminder',
              body: `Topic: ${m.topic || 'Consultation'}`,
            },
            accepted: {
              title: 'Consultation Confirmed',
              type: 'success',
              body: `Scheduled on ${new Date(
                m.startTime
              ).toLocaleString()}`,
            },
            ended: {
              title: 'Consultation Completed',
              type: 'success',
              body: 'Your consultation was completed successfully.',
            },
            declined: {
              title: 'Consultation Declined',
              type: 'info',
              body: `Topic: ${m.topic || 'Consultation'}`,
            },
          };

          const config = map[m.status] || map.pending;

          return {
            id: `meeting-${m._id}`,
            title: config.title,
            body: config.body,
            type: config.type,
            date: m.updatedAt || m.startTime,
            time: timeAgo(m.updatedAt || m.startTime),
          };
        })
      : [];

  const buildChatNotifications = (chats = []) =>
    Array.isArray(chats)
      ? chats.map(chat => {
          const lastAdminMsg = chat?.messages
            ?.filter(m => m.sender === 'admin')
            ?.slice(-1)[0];

          if (!lastAdminMsg) return null;

          return {
            id: `chat-${chat._id}`,
            title: 'New Message',
            body:
              lastAdminMsg.message.length > 60
                ? `${lastAdminMsg.message.slice(0, 60)}…`
                : lastAdminMsg.message,
            type: 'message',
            date: lastAdminMsg.timestamp,
            time: timeAgo(lastAdminMsg.timestamp),
          };
        })
      : [];

  /* ---------------- HELPERS ---------------- */

  const timeAgo = date => {
    if (!date) return '';
    const diff = Math.floor((Date.now() - new Date(date)) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const iconMap = {
    success: ['check-circle', '#22c55e'],
    message: ['message-text', '#2563eb'],
    reminder: ['bell-ring', '#f59e0b'],
    info: ['information', '#0ea5e9'],
  };

  /* ---------------- UI ---------------- */

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading updates…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load notifications</Text>
        <TouchableOpacity onPress={fetchNotifications}>
          <Text style={styles.retry}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!data.length) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchNotifications} />
        }
        contentContainerStyle={styles.emptyContainer}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Your Communication Center</Text>
          <Text style={styles.subtitle}>
            Messages and consultation updates will appear here.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Get the full experience</Text>

          <View style={styles.storeRow}>
            <StoreButton
              icon="apple"
              label="App Store"
              onPress={() => Linking.openURL(IOS_APP_URL)}
            />
            <StoreButton
              icon="google-play"
              label="Google Play"
              onPress={() => Linking.openURL(ANDROID_APP_URL)}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchNotifications} />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        const [icon, color] = iconMap[item.type];
        return (
          <View style={styles.item}>
            <Icon name={icon} size={26} color={color} />
            <View style={styles.textWrap}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemBody}>{item.body}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        );
      }}
    />
  );
};

/* ---------------- COMPONENTS ---------------- */

const StoreButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.storeBtn} onPress={onPress}>
    <Icon name={icon} size={18} />
    <Text style={styles.storeText}>{label}</Text>
  </TouchableOpacity>
);

export default NotificationsScreen;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  list: { padding: 16, backgroundColor: '#f8fafc' },

  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },

  textWrap: { marginLeft: 12, flex: 1 },
  itemTitle: { fontSize: 15, fontWeight: '600', color: '#0f172a' },
  itemBody: { fontSize: 14, color: '#475569', marginVertical: 4 },
  time: { fontSize: 12, color: '#94a3b8' },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#64748b' },
  error: { fontSize: 15, color: '#dc2626' },
  retry: { marginTop: 8, color: '#2563eb', fontWeight: '600' },

  emptyContainer: { padding: 20, backgroundColor: '#f8fafc' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#64748b' },

  storeRow: { flexDirection: 'row', gap: 10 },
  storeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 14,
  },
  storeText: { marginLeft: 8, fontWeight: '500' },
});
