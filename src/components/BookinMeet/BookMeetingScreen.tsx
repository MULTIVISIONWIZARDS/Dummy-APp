// import React, {useState, useEffect, useRef} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   Platform,
//   PermissionsAndroid,
//   ActivityIndicator,
// } from 'react-native';
// import {
//   createAgoraRtcEngine,
//   IRtcEngine,
//   ChannelProfileType,
//   ClientRoleType,
//   RtcSurfaceView,
//   VideoSourceType,
// } from 'react-native-agora';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_BASE } from '../../constants/Constant';
// import SuccessModal from '../successModal/SuccessModal';

// // ==================== CONFIG ====================
// const CONFIG = {
//   BACKEND: `${API_BASE}/api/meetings`,
//   AUTH: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZThhNjdhMDZlMmIzODE0M2IxNjM3NyIsImlhdCI6MTc2MDA5MTk5MCwiZXhwIjoxNzYwNjk2NzkwfQ.J4TCIIgZIu6q_uFIXPWH4dUMp2RTmGVF1Ni-Ze0Susk',
//   USER_ID: '68ecd160a13a3100b0e5de25',
//   AGORA_APP_ID: 'e7ce3caec69347b3a47deaecc69d2699',
// };

// const api = axios.create({
//   baseURL: CONFIG.BACKEND,
//   headers: {'Content-Type': 'application/json', Authorization: CONFIG.AUTH},
// });

// // ==================== MAIN COMPONENT ====================
// export default function App() {
//   const [modalVisible, setModalVisible] = useState(false);

//   const [meeting, setMeeting] = useState<any>(null);
//   const [modalType, setModalType] = useState<'success' | 'error' | 'warning'>('success');
//   const [modalTitle, setModalTitle] = useState('');
//   const [modalMessage, setModalMessage] = useState('');
//   const [accepted, setAccepted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [inCall, setInCall] = useState(false);
//   const [joined, setJoined] = useState(false);
//   const [remoteUid, setRemoteUid] = useState(0);
//   const [muted, setMuted] = useState(false);
//   const [videoOff, setVideoOff] = useState(false);
//   const engine = useRef<IRtcEngine>();


//   // ==================== AsyncStorage ====================
//   const saveMeeting = async (data: any) => {
//     try {
//       await AsyncStorage.setItem('meeting', JSON.stringify(data));
//     } catch (err) {
//       console.log('Error saving meeting:', err);
//     }
//   };

//   const removeMeeting = async () => {
//     try {
//       await AsyncStorage.removeItem('meeting');
//     } catch (err) {
//       console.log('Error removing meeting:', err);
//     }
//   };

//   const loadMeeting = async () => {
//     try {
//       const storedMeeting = await AsyncStorage.getItem('meeting');
//       if (storedMeeting) {
//         const parsed = JSON.parse(storedMeeting);
//         setMeeting(parsed);
//         if (parsed.status === 'accepted') setAccepted(true);
//       }
//     } catch (err) {
//       console.log('Error loading meeting:', err);
//     }
//   };

//   useEffect(() => {
//     loadMeeting();
//   }, []);

//   // ==================== Permissions ====================
//   const requestPermissions = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//       ]);
//       return Object.values(granted).every(s => s === 'granted');
//     }
//     return true;
//   };

//   // ==================== Book Meeting ====================
//   const bookMeeting = async () => {
//     if (!(await requestPermissions())) {
//       setModalType('warning');
//       setModalTitle('Permissions needed');
//       setModalMessage('You need to allow permissions to book a meeting.');
//       setModalVisible(true);
//       return;
//     }

//     setLoading(true);
//     try {
//        const userId = await AsyncStorage.getItem('userId');
//       const { data } = await api.post('/book', {
//         userId: userId,
//         topic: 'Video Call',
//       });

//       if (data.success) {
//         setMeeting(data.meeting);
//         await saveMeeting(data.meeting);

//         setModalType('success');
//         setModalTitle('Meeting booked!');
//         setModalMessage('Waiting for approval...');
//         setModalVisible(true);
//       }
//     } catch (err: any) {
//       setModalType('error');
//       setModalTitle('Error');
//       setModalMessage(err.response?.data?.message || 'Failed to book meeting.');
//       setModalVisible(true);
//     }
//     setLoading(false);
//   };

//   // ==================== Poll for approval ====================
//   useEffect(() => {
//     if (!meeting || accepted) return;
//     const interval = setInterval(async () => {
//       try {
//         const { data } = await api.get(`/byid/${meeting._id}`);
//         if (data.meeting?.status === 'accepted') {
//           setMeeting(data.meeting);
//           setAccepted(true);
//           await saveMeeting(data.meeting);

//           setModalType('success');
//           setModalTitle('Approved!');
//           setModalMessage('You can join now.');
//           setModalVisible(true);

//           clearInterval(interval);
//         } else if (data.meeting?.status === 'declined') {
//           setModalType('error');
//           setModalTitle('Meeting declined!');
//           setModalMessage('Admin has declined the meeting.');
//           setModalVisible(true);

//           setMeeting(null);
//           setAccepted(false);
//           await removeMeeting();
//           clearInterval(interval);
//         }
//       } catch (err) {
//         console.log('Poll error:', err);
//       }
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [meeting, accepted]);

//   // ==================== Join Call ====================
//   const joinCall = async () => {
//     if (!meeting?.token || !meeting?.channelName) return Alert.alert('Meeting not ready');

//     try {
//       const rtc = createAgoraRtcEngine();
//       await rtc.initialize({
//         appId: CONFIG.AGORA_APP_ID,
//         channelProfile: ChannelProfileType.ChannelProfileCommunication,
//       });

//       rtc.registerEventHandler({
//         onJoinChannelSuccess: (connection, elapsed) => {
//           console.log('✅ Joined channel:', connection.channelId);
//           setJoined(true);
//         },
//         onUserJoined: (connection, uid, elapsed) => {
//           console.log('👤 Remote user joined:', uid);
//           setRemoteUid(uid);
//         },
//         onUserOffline: (connection, uid, reason) => {
//           console.log('👋 Remote user left:', uid);
//           setRemoteUid(0);
//         },
//         onError: (err, msg) => {
//           console.error('❌ Agora Error:', err, msg);
//         },
//       });

//       await rtc.enableVideo();
//       await rtc.enableAudio();
//       await rtc.startPreview();

//       await rtc.joinChannel(meeting.token, meeting.channelName, 0, {
//         clientRoleType: ClientRoleType.ClientRoleBroadcaster,
//         publishMicrophoneTrack: true,
//         publishCameraTrack: true,
//         autoSubscribeAudio: true,
//         autoSubscribeVideo: true,
//       });

//       engine.current = rtc;
//       setInCall(true);
//     } catch (err) {
//       console.error('Join error:', err);
//       Alert.alert('Error', 'Failed to join call');
//     }
//   };

//   // ==================== Leave Call ====================
//   const leaveCall = async () => {
//     try {
//       if (engine.current) {
//         await engine.current.leaveChannel();
//         engine.current.release();
//         engine.current = undefined;
//       }

//       setInCall(false);
//       setJoined(false);
//       setRemoteUid(0);
//       setMuted(false);
//       setVideoOff(false);

//       if (meeting) {
//         try {
//           await api.put(`/${meeting._id}/end`);
//           setMeeting(null);
//           setAccepted(false);
//           await removeMeeting();
//         } catch (err: any) {
//           console.error('Error ending meeting:', err.response?.data || err.message);
//         }
//       }
//     } catch (err) {
//       console.error('Leave error:', err);
//     }
//   };

//   // ==================== Controls ====================
//   const toggleMute = () => {
//     engine.current?.muteLocalAudioStream(!muted);
//     setMuted(!muted);
//   };

//   const toggleVideo = () => {
//     engine.current?.muteLocalVideoStream(!videoOff);
//     setVideoOff(!videoOff);
//   };

//   const switchCamera = () => {
//     engine.current?.switchCamera();
//   };

//   // ==================== RENDER ====================
//   return (
//     <View style={s.container}>
//       <Text style={s.title}>📅 Video Meeting</Text>

//       {!meeting && (
//         <TouchableOpacity style={s.btn} onPress={bookMeeting} disabled={loading}>
//           {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnTxt}>Book Meeting</Text>}
//         </TouchableOpacity>
//       )}

//       {meeting && (
//         <View style={s.card}>
//           <Text style={s.topic}>📌 {meeting.topic}</Text>
//           <Text style={s.status}>Status: {meeting.status}</Text>

//           {accepted ? (
//             <TouchableOpacity style={[s.btn, {backgroundColor: '#10b981'}]} onPress={joinCall}>
//               <Text style={s.btnTxt}>Join Call</Text>
//             </TouchableOpacity>
//           ) : (
//             <Text style={s.waiting}>⏳ Waiting for approval...</Text>
//           )}

//           <TouchableOpacity
//             style={[s.btn, {backgroundColor: '#ef4444', marginTop: 8}]}
//             onPress={async () => {
//               setMeeting(null);
//               setAccepted(false);
//               await removeMeeting();
//               setModalType('success');
//               setModalTitle('Meeting cancelled');
//               setModalMessage('Your meeting has been cancelled.');
//               setModalVisible(true);
//             }}>
//             <Text style={s.btnTxt}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Video Call Modal */}
//       <Modal visible={inCall} animationType="slide" onRequestClose={leaveCall}>
//         <View style={s.callContainer}>
//           <View style={s.remoteVideoContainer}>
//             {remoteUid !== 0 ? (
//               <RtcSurfaceView
//                 style={s.fullVideo}
//                 canvas={{
//                   uid: remoteUid,
//                   sourceType: VideoSourceType.VideoSourceRemote,
//                   renderMode: 1,
//                 }}
//               />
//             ) : (
//               <View style={s.waitingContainer}>
//                 <Text style={s.waitingText}>⏳ Waiting for remote user...</Text>
//               </View>
//             )}
//           </View>

//           <View style={s.localVideoContainer}>
//             <RtcSurfaceView
//               style={s.localVideo}
//               canvas={{
//                 uid: 0,
//                 sourceType: VideoSourceType.VideoSourceCamera,
//                 renderMode: 1,
//               }}
//               zOrderMediaOverlay={true}
//             />
//           </View>

//           <View style={s.statusBar}>
//             <Text style={s.statusText}>
//               {remoteUid ? '🟢 Connected' : '🟡 Connecting...'}
//             </Text>
//             {remoteUid !== 0 && (
//               <Text style={s.uidText}>Remote UID: {remoteUid}</Text>
//             )}
//           </View>

//           <View style={s.controls}>
//             <TouchableOpacity style={[s.ctrlBtn, muted && s.active]} onPress={toggleMute}>
//               <Text style={s.icon}>{muted ? '🔇' : '🎤'}</Text>
//               <Text style={s.label}>{muted ? 'Unmute' : 'Mute'}</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={[s.ctrlBtn, videoOff && s.active]} onPress={toggleVideo}>
//               <Text style={s.icon}>{videoOff ? '📷' : '🎥'}</Text>
//               <Text style={s.label}>{videoOff ? 'Video On' : 'Video Off'}</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={s.ctrlBtn} onPress={switchCamera}>
//               <Text style={s.icon}>🔄</Text>
//               <Text style={s.label}>Flip</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={[s.ctrlBtn, s.leave]} onPress={leaveCall}>
//               <Text style={s.icon}>📞</Text>
//               <Text style={s.label}>End</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       <SuccessModal
//         visible={modalVisible}
//         type={modalType}
//         title={modalTitle}
//         message={modalMessage}
//         onClose={() => setModalVisible(false)}
//       />
//     </View>
//   );
// }

// // ==================== STYLES ====================
// const s = StyleSheet.create({
//   container: {flex: 1, padding: 20, backgroundColor: '#f7f9fc'},
//   title: {fontSize: 28, fontWeight: '700', marginBottom: 20, color: '#1f2937'},
//   btn: {
//     backgroundColor: '#3b82f6',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   btnTxt: {color: '#fff', fontWeight: '700', fontSize: 16},
//   card: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 16,
//     marginTop: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   topic: {fontSize: 18, fontWeight: '600', marginBottom: 8, color: '#333'},
//   status: {fontSize: 14, color: '#666', marginBottom: 12},
//   waiting: {color: '#f59e0b', marginVertical: 12, fontSize: 14, textAlign: 'center'},
//   callContainer: {flex: 1, backgroundColor: '#000'},
//   remoteVideoContainer: {flex: 1},
//   fullVideo: {flex: 1},
//   waitingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1f2937',
//   },
//   waitingText: {fontSize: 18, color: '#fff'},
//   localVideoContainer: {
//     position: 'absolute',
//     top: 50,
//     right: 20,
//     width: 120,
//     height: 160,
//     borderRadius: 12,
//     overflow: 'hidden',
//     borderWidth: 2,
//     borderColor: '#fff',
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   localVideo: {flex: 1},
//   statusBar: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   statusText: {color: '#fff', fontSize: 14, fontWeight: '600'},
//   uidText: {color: '#9ca3af', fontSize: 12, marginTop: 2},
//   controls: {
//     position: 'absolute',
//     bottom: 40,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingHorizontal: 20,
//   },
//   ctrlBtn: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: '#374151',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   active: {backgroundColor: '#ef4444'},
//   leave: {backgroundColor: '#dc2626'},
//   icon: {fontSize: 24},
//   label: {fontSize: 10, color: '#fff', marginTop: 4, fontWeight: '600'},
// });



// import React, {useState, useEffect, useRef} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   Platform,
//   PermissionsAndroid,
//   ActivityIndicator,
//   TextInput,
//   ScrollView,
// } from 'react-native';
// import {
//   createAgoraRtcEngine,
//   IRtcEngine,
//   ChannelProfileType,
//   ClientRoleType,
//   RtcSurfaceView,
//   VideoSourceType,
// } from 'react-native-agora';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { API_BASE } from '../../constants/Constant';
// import SuccessModal from '../successModal/SuccessModal';

// // ==================== CONFIG ====================
// const CONFIG = {
//   BACKEND: `${API_BASE}/api/meetings`,
//   AUTH: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZThhNjdhMDZlMmIzODE0M2IxNjM3NyIsImlhdCI6MTc2MDA5MTk5MCwiZXhwIjoxNzYwNjk2NzkwfQ.J4TCIIgZIu6q_uFIXPWH4dUMp2RTmGVF1Ni-Ze0Susk',
//   AGORA_APP_ID: 'e7ce3caec69347b3a47deaecc69d2699',
// };

// const api = axios.create({
//   baseURL: CONFIG.BACKEND,
//   headers: {'Content-Type': 'application/json', Authorization: CONFIG.AUTH},
// });

// // ==================== MAIN COMPONENT ====================
// export default function App() {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [bookingModalVisible, setBookingModalVisible] = useState(false);

//   const [meeting, setMeeting] = useState<any>(null);
//   const [modalType, setModalType] = useState<'success' | 'error' | 'warning'>('success');
//   const [modalTitle, setModalTitle] = useState('');
//   const [modalMessage, setModalMessage] = useState('');
//   const [accepted, setAccepted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [inCall, setInCall] = useState(false);
//   const [joined, setJoined] = useState(false);
//   const [remoteUid, setRemoteUid] = useState(0);
//   const [muted, setMuted] = useState(false);
//   const [videoOff, setVideoOff] = useState(false);
  
//   // Booking form states
//   const [topic, setTopic] = useState('');
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedTime, setSelectedTime] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showTimePicker, setShowTimePicker] = useState(false);
  
//   const engine = useRef<IRtcEngine>();

//   // ==================== AsyncStorage ====================
//   const saveMeeting = async (data: any) => {
//     try {
//       await AsyncStorage.setItem('meeting', JSON.stringify(data));
//     } catch (err) {
//       console.log('Error saving meeting:', err);
//     }
//   };

//   const removeMeeting = async () => {
//     try {
//       await AsyncStorage.removeItem('meeting');
//     } catch (err) {
//       console.log('Error removing meeting:', err);
//     }
//   };

//   const loadMeeting = async () => {
//     try {
//       const storedMeeting = await AsyncStorage.getItem('meeting');
//       if (storedMeeting) {
//         const parsed = JSON.parse(storedMeeting);
        
//         // Check if meeting is still valid
//         const now = new Date();
//         const meetingStart = new Date(parsed.startTime);
//         const meetingEnd = new Date(meetingStart.getTime() + 30 * 60 * 1000); // 30 minutes after start
        
//         // If meeting has ended or was declined/ended, clear it
//         if (parsed.status === 'ended' || parsed.status === 'declined' || now > meetingEnd) {
//           await removeMeeting();
//           return;
//         }
        
//         setMeeting(parsed);
//         if (parsed.status === 'accepted') setAccepted(true);
//       }
//     } catch (err) {
//       console.log('Error loading meeting:', err);
//     }
//   };

//   useEffect(() => {
//     loadMeeting();
//   }, []);

//   // ==================== Permissions ====================
//   const requestPermissions = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//       ]);
//       return Object.values(granted).every(s => s === 'granted');
//     }
//     return true;
//   };

//   // ==================== Format Date/Time ====================
//   const formatDateTime = (date: Date) => {
//     return new Date(date).toLocaleString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   const canJoinMeeting = (startTime: string) => {
//     const now = new Date();
//     const meetingStart = new Date(startTime);
//     const meetingEnd = new Date(meetingStart.getTime() + 30 * 60 * 1000); // 30 minutes consultation window
    
//     // Allow joining 5 minutes before and up to 30 minutes after start time
//     const allowJoinFrom = new Date(meetingStart.getTime() - 5 * 60 * 1000);
    
//     return now >= allowJoinFrom && now <= meetingEnd;
//   };

//   // ==================== Book Meeting ====================
//   const openBookingModal = async () => {
//     if (!(await requestPermissions())) {
//       setModalType('warning');
//       setModalTitle('Permissions needed');
//       setModalMessage('You need to allow permissions to book a meeting.');
//       setModalVisible(true);
//       return;
//     }
    
//     setTopic('');
//     setSelectedDate(new Date());
//     setSelectedTime(new Date());
//     setBookingModalVisible(true);
//   };

//   const submitBooking = async () => {
//     if (!topic.trim()) {
//       Alert.alert('Error', 'Please enter a topic for the consultation');
//       return;
//     }

//     // Combine date and time
//     const startDateTime = new Date(selectedDate);
//     startDateTime.setHours(selectedTime.getHours());
//     startDateTime.setMinutes(selectedTime.getMinutes());
//     startDateTime.setSeconds(0);
//     startDateTime.setMilliseconds(0);

//     const now = new Date();

//     // Validate future time
//     if (startDateTime <= now) {
//       Alert.alert('Error', 'Please select a future date and time');
//       return;
//     }

//     // Must be scheduled at least 7 days in advance
//     const minAdvance = new Date();
//     minAdvance.setDate(minAdvance.getDate() + 7);
//     if (startDateTime < minAdvance) {
//       Alert.alert('Error', 'Face-to-face consultations must be scheduled at least 7 days in advance');
//       return;
//     }

//     // Validate not more than 30 days (1 month)
//     const maxDate = new Date();
//     maxDate.setDate(maxDate.getDate() + 30);
//     if (startDateTime > maxDate) {
//       Alert.alert('Error', 'You can only book consultations up to 30 days (1 month) in advance');
//       return;
//     }

//     setLoading(true);
//     setBookingModalVisible(false);
    
//     try {
//       const userId = await AsyncStorage.getItem('userId');
//       const { data } = await api.post('/book', {
//         userId: userId,
//         topic: topic.trim(),
//         startTime: startDateTime.toISOString(),
//       });

//       if (data.success) {
//         setMeeting(data.meeting);
//         await saveMeeting(data.meeting);

//         setModalType('success');
//         setModalTitle('Consultation Booked!');
//         setModalMessage(`Your 30-minute face-to-face consultation is scheduled for ${formatDateTime(data.meeting.startTime)}. Waiting for approval...`);
//         setModalVisible(true);
//       }
//     } catch (err: any) {
//       setModalType('error');
//       setModalTitle('Error');
//       setModalMessage(err.response?.data?.message || 'Failed to book meeting.');
//       setModalVisible(true);
//     }
//     setLoading(false);
//   };

//   // ==================== Poll for approval ====================
//   useEffect(() => {
//     if (!meeting || accepted) return;
    
//     const interval = setInterval(async () => {
//       try {
//         const { data } = await api.get(`/byid/${meeting._id}`);
        
//         if (data.meeting?.status === 'accepted') {
//           setMeeting(data.meeting);
//           setAccepted(true);
//           await saveMeeting(data.meeting);

//           setModalType('success');
//           setModalTitle('Approved!');
//           setModalMessage('Your consultation has been approved. You can join when it\'s time.');
//           setModalVisible(true);

//           clearInterval(interval);
//         } else if (data.meeting?.status === 'declined') {
//           setModalType('error');
//           setModalTitle('Consultation Declined');
//           setModalMessage('Admin has declined your consultation request.');
//           setModalVisible(true);

//           setMeeting(null);
//           setAccepted(false);
//           await removeMeeting();
//           clearInterval(interval);
//         } else if (data.meeting?.status === 'ended') {
//           setMeeting(null);
//           setAccepted(false);
//           await removeMeeting();
//           clearInterval(interval);
//         }
//       } catch (err) {
//         console.log('Poll error:', err);
//       }
//     }, 5000);
    
//     return () => clearInterval(interval);
//   }, [meeting, accepted]);

//   // ==================== Join Call ====================
//   const joinCall = async () => {
//     if (!meeting?.token || !meeting?.channelName) {
//       Alert.alert('Error', 'Meeting not ready');
//       return;
//     }

//     if (!canJoinMeeting(meeting.startTime)) {
//       const meetingStart = new Date(meeting.startTime);
//       const now = new Date();
      
//       if (now < meetingStart) {
//         const minutesUntil = Math.floor((meetingStart.getTime() - now.getTime()) / (1000 * 60));
//         const hoursUntil = Math.floor(minutesUntil / 60);
//         const daysUntil = Math.floor(hoursUntil / 24);
        
//         let timeMessage = '';
//         if (daysUntil > 0) {
//           timeMessage = `${daysUntil} day(s) and ${hoursUntil % 24} hour(s)`;
//         } else if (hoursUntil > 0) {
//           timeMessage = `${hoursUntil} hour(s) and ${minutesUntil % 60} minute(s)`;
//         } else {
//           timeMessage = `${minutesUntil} minute(s)`;
//         }
        
//         Alert.alert(
//           'Too Early',
//           `Your consultation starts in ${timeMessage}. You can join 5 minutes before the scheduled time.`
//         );
//       } else {
//         Alert.alert('Consultation Expired', 'The 30-minute consultation window has passed.');
//       }
//       return;
//     }

//     try {
//       const rtc = createAgoraRtcEngine();
//       await rtc.initialize({
//         appId: CONFIG.AGORA_APP_ID,
//         channelProfile: ChannelProfileType.ChannelProfileCommunication,
//       });

//       rtc.registerEventHandler({
//         onJoinChannelSuccess: (connection, elapsed) => {
//           console.log('✅ Joined channel:', connection.channelId);
//           setJoined(true);
//         },
//         onUserJoined: (connection, uid, elapsed) => {
//           console.log('👤 Remote user joined:', uid);
//           setRemoteUid(uid);
//         },
//         onUserOffline: (connection, uid, reason) => {
//           console.log('👋 Remote user left:', uid);
//           setRemoteUid(0);
//         },
//         onError: (err, msg) => {
//           console.error('❌ Agora Error:', err, msg);
//         },
//       });

//       await rtc.enableVideo();
//       await rtc.enableAudio();
//       await rtc.startPreview();

//       await rtc.joinChannel(meeting.token, meeting.channelName, 0, {
//         clientRoleType: ClientRoleType.ClientRoleBroadcaster,
//         publishMicrophoneTrack: true,
//         publishCameraTrack: true,
//         autoSubscribeAudio: true,
//         autoSubscribeVideo: true,
//       });

//       engine.current = rtc;
//       setInCall(true);
//     } catch (err) {
//       console.error('Join error:', err);
//       Alert.alert('Error', 'Failed to join call');
//     }
//   };

//   // ==================== Leave Call ====================
//   const leaveCall = async () => {
//     try {
//       if (engine.current) {
//         await engine.current.leaveChannel();
//         engine.current.release();
//         engine.current = undefined;
//       }

//       setInCall(false);
//       setJoined(false);
//       setRemoteUid(0);
//       setMuted(false);
//       setVideoOff(false);

//       if (meeting) {
//         try {
//           await api.put(`/${meeting._id}/end`);
//           setMeeting(null);
//           setAccepted(false);
//           await removeMeeting();
//         } catch (err: any) {
//           console.error('Error ending meeting:', err.response?.data || err.message);
//         }
//       }
//     } catch (err) {
//       console.error('Leave error:', err);
//     }
//   };
// const fetchUpcomingMeeting = async () => {
//   try {
//     const userId = await AsyncStorage.getItem("userId");
//     if (!userId) return;

//     const { data } = await api.get(`/user/${userId}/active`);

//     if (!data?.meeting) return; // no active meeting

//     const meeting = data.meeting;

//     setMeeting(meeting);
//     if (meeting.status === "accepted") setAccepted(true);

//     await saveMeeting(meeting);

//   } catch (err) {
//     console.log("Fetch error:", err);
//   }
// };

// useEffect(() => {
//   const init = async () => {
//     await loadMeeting(); // First try local AsyncStorage

//     // Always fetch latest from server to sync state
//     await fetchUpcomingMeeting();
//   };

//   init();
// }, []);


//   // ==================== Controls ====================
//   const toggleMute = () => {
//     engine.current?.muteLocalAudioStream(!muted);
//     setMuted(!muted);
//   };

//   const toggleVideo = () => {
//     engine.current?.muteLocalVideoStream(!videoOff);
//     setVideoOff(!videoOff);
//   };

//   const switchCamera = () => {
//     engine.current?.switchCamera();
//   };

//   // ==================== RENDER ====================
//   return (
//     <View style={s.container}>
//       <Text style={s.title}>👨‍⚕️ Face-to-Face Consultation</Text>
//       <Text style={s.subtitle}>30-minute consultation • Book 7 days in advance</Text>

//       {!meeting && (
//         <TouchableOpacity style={s.btn} onPress={openBookingModal} disabled={loading}>
//           {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnTxt}>Book Consultation</Text>}
//         </TouchableOpacity>
//       )}

//       {meeting && (
//         <View style={s.card}>
//           <Text style={s.topic}>📌 {meeting.topic}</Text>
//           <Text style={s.dateTime}>🕒 {formatDateTime(meeting.startTime)}</Text>
//           <Text style={s.status}>Status: {meeting.status}</Text>

//           {accepted ? (
//             <>
//               {canJoinMeeting(meeting.startTime) ? (
//                 <TouchableOpacity style={[s.btn, {backgroundColor: '#10b981'}]} onPress={joinCall}>
//                   <Text style={s.btnTxt}>Join Call</Text>
//                 </TouchableOpacity>
//               ) : (
//                 <View style={s.timeInfo}>
//                   <Text style={s.timeInfoText}>
//                     {new Date() < new Date(meeting.startTime)
//                       ? '⏰ Consultation not started yet'
//                       : '⏱️ Consultation window has passed'}
//                   </Text>
//                 </View>
//               )}
//             </>
//           ) : (
//             <Text style={s.waiting}>⏳ Waiting for approval...</Text>
//           )}

//           <TouchableOpacity
//             style={[s.btn, {backgroundColor: '#ef4444', marginTop: 8}]}
//             onPress={async () => {
//               setMeeting(null);
//               setAccepted(false);
//               await removeMeeting();
//               setModalType('success');
//               setModalTitle('Consultation Cancelled');
//               setModalMessage('Your consultation has been cancelled.');
//               setModalVisible(true);
//             }}>
//             <Text style={s.btnTxt}>Cancel Consultation</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Booking Modal */}
//       <Modal
//         visible={bookingModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setBookingModalVisible(false)}>
//         <View style={s.modalOverlay}>
//           <View style={s.bookingModal}>
//             <Text style={s.bookingTitle}>📅 Book a Meeting</Text>
            
//             <ScrollView style={s.formContainer}>
//               <Text style={s.label}>Topic / Reason for Consultation *</Text>
//               <TextInput
//                 style={s.input}
//                 placeholder="e.g., Health related, Follow-up visit, etc."
//                 value={topic}
//                 onChangeText={setTopic}
//                 multiline
//                 numberOfLines={2}
//               />

//               <Text style={s.label}>Date *</Text>
//               <TouchableOpacity
//                 style={s.dateButton}
//                 onPress={() => setShowDatePicker(true)}>
//                 <Text style={s.dateButtonText}>
//                   {selectedDate.toLocaleDateString('en-US', {
//                     month: 'long',
//                     day: 'numeric',
//                     year: 'numeric',
//                   })}
//                 </Text>
//               </TouchableOpacity>

//               {showDatePicker && (
//                 <DateTimePicker
//                   value={selectedDate}
//                   mode="date"
//                   minimumDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)} // 7 days from now
//                   maximumDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 days from now
//                   onChange={(event, date) => {
//                     setShowDatePicker(Platform.OS === 'ios');
//                     if (date) setSelectedDate(date);
//                   }}
//                 />
//               )}

//               <Text style={s.label}>Time *</Text>
//               <TouchableOpacity
//                 style={s.dateButton}
//                 onPress={() => setShowTimePicker(true)}>
//                 <Text style={s.dateButtonText}>
//                   {selectedTime.toLocaleTimeString('en-US', {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                   })}
//                 </Text>
//               </TouchableOpacity>

//               {showTimePicker && (
//                 <DateTimePicker
//                   value={selectedTime}
//                   mode="time"
//                   onChange={(event, time) => {
//                     setShowTimePicker(Platform.OS === 'ios');
//                     if (time) setSelectedTime(time);
//                   }}
//                 />
//               )}

//               <View style={s.modalButtons}>
//                 <TouchableOpacity
//                   style={[s.modalBtn, s.cancelBtn]}
//                   onPress={() => setBookingModalVisible(false)}>
//                   <Text style={s.btnTxt}>Cancel</Text>
//                 </TouchableOpacity>
                
//                 <TouchableOpacity
//                   style={[s.modalBtn, s.submitBtn]}
//                   onPress={submitBooking}
//                   disabled={loading}>
//                   {loading ? (
//                     <ActivityIndicator color="#fff" />
//                   ) : (
//                     <Text style={s.btnTxt}>Book</Text>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>

//       {/* Video Call Modal */}
//       <Modal visible={inCall} animationType="slide" onRequestClose={leaveCall}>
//         <View style={s.callContainer}>
//           <View style={s.remoteVideoContainer}>
//             {remoteUid !== 0 ? (
//               <RtcSurfaceView
//                 style={s.fullVideo}
//                 canvas={{
//                   uid: remoteUid,
//                   sourceType: VideoSourceType.VideoSourceRemote,
//                   renderMode: 1,
//                 }}
//               />
//             ) : (
//               <View style={s.waitingContainer}>
//                 <Text style={s.waitingText}>⏳ Waiting for remote user...</Text>
//               </View>
//             )}
//           </View>

//           <View style={s.localVideoContainer}>
//             <RtcSurfaceView
//               style={s.localVideo}
//               canvas={{
//                 uid: 0,
//                 sourceType: VideoSourceType.VideoSourceCamera,
//                 renderMode: 1,
//               }}
//               zOrderMediaOverlay={true}
//             />
//           </View>

//           <View style={s.statusBar}>
//             <Text style={s.statusText}>
//               {remoteUid ? '🟢 Connected' : '🟡 Connecting...'}
//             </Text>
//             {remoteUid !== 0 && (
//               <Text style={s.uidText}>Remote UID: {remoteUid}</Text>
//             )}
//           </View>

//          <View style={s.controls}>
//   <View style={s.controlItem}>
//     <TouchableOpacity style={[s.ctrlBtn, muted && s.active]} onPress={toggleMute}>
//       <Text style={s.icon}>{muted ? '🔇' : '🎤'}</Text>
//     </TouchableOpacity>
//     <Text style={s.ctrlLabel}>{muted ? 'Unmute' : 'Mute'}</Text>
//   </View>

//   <View style={s.controlItem}>
//     <TouchableOpacity style={[s.ctrlBtn, videoOff && s.active]} onPress={toggleVideo}>
//       <Text style={s.icon}>{videoOff ? '📷' : '🎥'}</Text>
//     </TouchableOpacity>
//     <Text style={s.ctrlLabel}>{videoOff ? 'Video On' : 'Video Off'}</Text>
//   </View>

//   <View style={s.controlItem}>
//     <TouchableOpacity style={s.ctrlBtn} onPress={switchCamera}>
//       <Text style={s.icon}>🔄</Text>
//     </TouchableOpacity>
//     <Text style={s.ctrlLabel}>Flip</Text>
//   </View>

//   <View style={s.controlItem}>
//     <TouchableOpacity style={[s.ctrlBtn, s.leave]} onPress={leaveCall}>
//       <Text style={s.icon}>📞</Text>
//     </TouchableOpacity>
//     <Text style={[s.ctrlLabel, {color: '#f87171'}]}>End</Text>
//   </View>
// </View>

//         </View>
//       </Modal>

//       <SuccessModal
//         visible={modalVisible}
//         type={modalType}
//         title={modalTitle}
//         message={modalMessage}
//         onClose={() => setModalVisible(false)}
//       />
//     </View>
//   );
// }

// // ==================== STYLES ====================
// const s = StyleSheet.create({
//   controls: {
//   position: 'absolute',
//   bottom: 45,
//   width: '100%',
//   flexDirection: 'row',
//   justifyContent: 'space-evenly',
//   alignItems: 'center',
//   paddingHorizontal: 16,
// },

// controlItem: {
//   alignItems: 'center',
// },

// ctrlBtn: {
//   width: 65,
//   height: 65,
//   borderRadius: 40,
//   backgroundColor: '#1f2937',
//   justifyContent: 'center',
//   alignItems: 'center',
// },

// ctrlLabel: {
//   marginTop: 6,
//   fontSize: 12,
//   color: '#fff',
//   fontWeight: '500',
//   opacity: 0.9,
// },

// active: {
//   backgroundColor: '#ef4444',
// },

// leave: {
//   backgroundColor: '#dc2626',
// },

// icon: {
//   fontSize: 26,
//   color: '#fff',
// },

//   container: {flex: 1, padding: 20, backgroundColor: '#f7f9fc'},
//   title: {fontSize: 28, fontWeight: '700', marginBottom: 8, color: '#1f2937'},
//   subtitle: {fontSize: 14, color: '#6b7280', marginBottom: 20},
//   btn: {
//     backgroundColor: '#3b82f6',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   btnTxt: {color: '#fff', fontWeight: '700', fontSize: 16},
//   card: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 16,
//     marginTop: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   topic: {fontSize: 18, fontWeight: '600', marginBottom: 8, color: '#333'},
//   dateTime: {fontSize: 16, color: '#3b82f6', marginBottom: 8, fontWeight: '500'},
//   status: {fontSize: 14, color: '#666', marginBottom: 12},
//   waiting: {color: '#f59e0b', marginVertical: 12, fontSize: 14, textAlign: 'center'},
//   timeInfo: {
//     backgroundColor: '#fef3c7',
//     padding: 12,
//     borderRadius: 8,
//     marginVertical: 12,
//   },
//   timeInfoText: {color: '#92400e', textAlign: 'center', fontSize: 14},
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bookingModal: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 24,
//     width: '90%',
//     maxHeight: '80%',
//   },
//   bookingHeader: {
//     marginBottom: 16,
//   },
//   bookingTitle: {fontSize: 24, fontWeight: '700', marginBottom: 8, color: '#1f2937'},
//   bookingSubtitle: {fontSize: 12, color: '#6b7280', fontStyle: 'italic'},
//   formContainer: {maxHeight: 400},
//   label: {fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 8, marginTop: 12},
//   input: {
//     backgroundColor: '#f3f4f6',
//     padding: 12,
//     borderRadius: 8,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//   },
//   dateButton: {
//     backgroundColor: '#f3f4f6',
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//   },
//   dateButtonText: {fontSize: 16, color: '#1f2937'},
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 24,
//     gap: 12,
//   },
//   modalBtn: {
//     flex: 1,
//     padding: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   cancelBtn: {backgroundColor: '#6b7280'},
//   submitBtn: {backgroundColor: '#3b82f6'},
//   callContainer: {flex: 1, backgroundColor: '#000'},
//   remoteVideoContainer: {flex: 1},
//   fullVideo: {flex: 1},
//   waitingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1f2937',
//   },
//   waitingText: {fontSize: 18, color: '#fff'},
//   localVideoContainer: {
//     position: 'absolute',
//     top: 50,
//     right: 20,
//     width: 120,
//     height: 160,
//     borderRadius: 12,
//     overflow: 'hidden',
//     borderWidth: 2,
//     borderColor: '#fff',
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   localVideo: {flex: 1},
//   statusBar: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   statusText: {color: '#fff', fontSize: 14, fontWeight: '600'},
//   uidText: {color: '#9ca3af', fontSize: 12, marginTop: 2},
//   controls: {
//     position: 'absolute',
//     bottom: 40,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingHorizontal: 20,
//   },
//   ctrlBtn: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: '#374151',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   active: {backgroundColor: '#ef4444'},
//   leave: {backgroundColor: '#dc2626'},
//   icon: {fontSize: 24},
//   // label: {fontSize: 10, color: '#fff', marginTop: 4, fontWeight: '600'},
// });


import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  RtcSurfaceView,
  VideoSourceType,
} from 'react-native-agora';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_BASE } from '../../constants/Constant';
import SuccessModal from '../successModal/SuccessModal';
import SoundPlayer from 'react-native-sound-player';
import Colors from '../../constants/Colors';

// // ==================== CONFIG ====================
// const CONFIG = {
//   BACKEND: `${API_BASE}/api/meetings`,
//   AUTH: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZThhNjdhMDZlMmIzODE0M2IxNjM3NyIsImlhdCI6MTc2MDA5MTk5MCwiZXhwIjoxNzYwNjk2NzkwfQ.J4TCIIgZIu6q_uFIXPWH4dUMp2RTmGVF1Ni-Ze0Susk',
//   AGORA_APP_ID: 'e7ce3caec69347b3a47deaecc69d2699',
// };

// const api = axios.create({
//   baseURL: CONFIG.BACKEND,
//   headers: {'Content-Type': 'application/json', Authorization: CONFIG.AUTH},
// });
const CONFIG = {
  BACKEND: `${API_BASE}/meetings`,
  AGORA_APP_ID: 'e7ce3caec69347b3a47deaecc69d2699',
};


/* ==================== AXIOS INSTANCE (JWT SAFE) ==================== */
const api = axios.create({
  baseURL: CONFIG.BACKEND,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('authToken'); // saved on login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==================== MAIN COMPONENT ====================
export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);

  const [meeting, setMeeting] = useState<any>(null);
  const [modalType, setModalType] = useState<'success' | 'error' | 'warning'>('success');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [joined, setJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState(0);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  
  // Booking form states
  const [topic, setTopic] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  // ⏱️ Time availability indicator
const [timeAvailability, setTimeAvailability] = useState<
  "available" | "unavailable" | null
>(null);

  // 🔒 Booked slots for selected date (avoid overlap UX)
const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const engine = useRef<IRtcEngine>();

  // ==================== AsyncStorage ====================
  const saveMeeting = async (data: any) => {
    try {
      await AsyncStorage.setItem('meeting', JSON.stringify(data));
    } catch (err) {
      console.log('Error saving meeting:', err);
    }
  };

  const removeMeeting = async () => {
    try {
      await AsyncStorage.removeItem('meeting');
    } catch (err) {
      console.log('Error removing meeting:', err);
    }
  };

  const loadMeeting = async () => {
    try {
      const storedMeeting = await AsyncStorage.getItem('meeting');
      if (storedMeeting) {
        const parsed = JSON.parse(storedMeeting);
        
        // Check if meeting is still valid
        const now = new Date();
        const meetingStart = new Date(parsed.startTime);
        const meetingEnd = new Date(meetingStart.getTime() + 30 * 60 * 1000); // 30 minutes after start
        
        // If meeting has ended or was declined/ended, clear it
        if (parsed.status === 'ended' || parsed.status === 'declined' || now > meetingEnd) {
          await removeMeeting();
          return;
        }
        
        setMeeting(parsed);
        if (parsed.status === 'accepted') setAccepted(true);
      }
    } catch (err) {
      console.log('Error loading meeting:', err);
    }
  };

  useEffect(() => {
    loadMeeting();
  }, []);
// 🔹 Fetch already booked slots for selected date
const fetchBookedSlots = async (date: Date) => {
  try {
    const yyyyMmDd = date.toISOString().split("T")[0];

    const { data } = await api.get(`${API_BASE}/meetings/slots?date=${yyyyMmDd}`);

    if (data?.success) {
      setBookedSlots(data.slots || []);
    }
  } catch (err) {
    console.log("Slot fetch error:", err);
  }
};
useEffect(() => {
  if (bookingModalVisible) {
    fetchBookedSlots(selectedDate);
  }
}, [selectedDate, bookingModalVisible]);
// 🔹 Check if selected time overlaps (30 min slot)
const SLOT_MINUTES = 30;

const isSlotBooked = (candidateStart: Date) => {
  const candidateEnd = new Date(candidateStart);
  candidateEnd.setMinutes(candidateEnd.getMinutes() + SLOT_MINUTES);

  return bookedSlots.some(slot => {
    const slotStart = new Date(slot.start);
    const slotEnd = new Date(slot.end);

    return (
      candidateStart < slotEnd &&
      candidateEnd > slotStart
    );
  });
};
const checkTimeAvailability = (date: Date, time: Date) => {
  const candidate = new Date(date);
  candidate.setHours(time.getHours());
  candidate.setMinutes(time.getMinutes());
  candidate.setSeconds(0);
  candidate.setMilliseconds(0);

  return isSlotBooked(candidate) ? "unavailable" : "available";
};


  // ==================== Permissions ====================
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      return Object.values(granted).every(s => s === 'granted');
    }
    return true;
  };

  // ==================== Format Date/Time ====================
  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const canJoinMeeting = (startTime: string) => {
    const now = new Date();
    const meetingStart = new Date(startTime);
    const meetingEnd = new Date(meetingStart.getTime() + 30 * 60 * 1000); // 30 minutes consultation window
    
    // Allow joining 5 minutes before and up to 30 minutes after start time
    const allowJoinFrom = new Date(meetingStart.getTime() - 5 * 60 * 1000);
    
    return now >= allowJoinFrom && now <= meetingEnd;
  };

  // ==================== Book Meeting ====================
  const openBookingModal = async () => {
    if (!(await requestPermissions())) {
      setModalType('warning');
      setModalTitle('Permissions needed');
      setModalMessage('You need to allow permissions to book a meeting.');
      setModalVisible(true);
      return;
    }
    
    setTopic('');
    setSelectedDate(new Date());
    setSelectedTime(new Date());
    setBookingModalVisible(true);
  };

  const submitBooking2 = async () => {
    if (!topic.trim()) {
      Alert.alert('Error', 'Please enter a topic for the consultation');
      return;
    }

    // Combine date and time
    const startDateTime = new Date(selectedDate);
    startDateTime.setHours(selectedTime.getHours());
    startDateTime.setMinutes(selectedTime.getMinutes());
    startDateTime.setSeconds(0);
    startDateTime.setMilliseconds(0);

    const now = new Date();

    // Validate future time
    if (startDateTime <= now) {
      Alert.alert('Error', 'Please select a future date and time');
      return;
    }

    // Must be scheduled at least 7 days in advance
    const minAdvance = new Date();
    minAdvance.setDate(minAdvance.getDate() + 7);
    if (startDateTime < minAdvance) {
      Alert.alert('Error', 'Face-to-face consultations must be scheduled at least 7 days in advance');
      return;
    }

    // Validate not more than 30 days (1 month)
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    if (startDateTime > maxDate) {
      Alert.alert('Error', 'You can only book consultations up to 30 days (1 month) in advance');
      return;
    }

    setLoading(true);
    setBookingModalVisible(false);
    // ❌ Block already booked slot (UX only)
if (isSlotBooked(startDateTime)) {
  Alert.alert(
    "Slot Unavailable",
    "This time is already booked. Please select another time."
  );
  return;
}

    try {
      const userId = await AsyncStorage.getItem('userId');
      const { data } = await api.post('/book', {
        userId: userId,
        topic: topic.trim(),
        startTime: startDateTime.toISOString(),
      });

      if (data.success) {
        setMeeting(data.meeting);
        await saveMeeting(data.meeting);

        setModalType('success');
        setModalTitle('Consultation Booked!');
        setModalMessage(`Your 30-minute face-to-face consultation is scheduled for ${formatDateTime(data.meeting.startTime)}. Waiting for approval...`);
        setModalVisible(true);
      }
    } catch (err: any) {
      setModalType('error');
      setModalTitle('Error');
      setModalMessage(err.response?.data?.message || 'Failed to book meeting.');
      setModalVisible(true);
    }
    setLoading(false);
  };
const submitBooking = async () => {
  if (!topic.trim()) {
    Alert.alert("Error", "Please enter a topic for the consultation");
    return;
  }

  const startDateTime = new Date(selectedDate);
  startDateTime.setHours(selectedTime.getHours());
  startDateTime.setMinutes(selectedTime.getMinutes());
  startDateTime.setSeconds(0);
  startDateTime.setMilliseconds(0);

  const now = new Date();

  if (startDateTime <= now) {
    Alert.alert("Error", "Please select a future date and time");
    return;
  }

  const minAdvance = new Date();
  minAdvance.setDate(minAdvance.getDate() + 7);
  if (startDateTime < minAdvance) {
    Alert.alert("Error", "Must be booked at least 7 days in advance");
    return;
  }

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  if (startDateTime > maxDate) {
    Alert.alert("Error", "You can only book up to 30 days in advance");
    return;
  }

  // 🔴 Slot unavailable → STOP before loading
  if (isSlotBooked(startDateTime)) {
    Alert.alert(
      "Slot Unavailable",
      "This time is unavailable. Please select one of the suggested slots."
    );
    return;
  }

  // ✅ Now start loading ONLY when API will be called
  setLoading(true);
  setBookingModalVisible(false);

  try {
    const userId = await AsyncStorage.getItem("userId");

    const { data } = await api.post("/book", {
      userId,
      topic: topic.trim(),
      startTime: startDateTime.toISOString(),
    });

    if (data.success) {
      setMeeting(data.meeting);
      await saveMeeting(data.meeting);

      setModalType("success");
      setModalTitle("Consultation Booked!");
      setModalMessage(
        `Your consultation is scheduled for ${formatDateTime(
          data.meeting.startTime
        )}.`
      );
      setModalVisible(true);
    }
  } catch (err: any) {
    setModalType("error");
    setModalTitle("Error");
    setModalMessage(
      err.response?.data?.message || "Failed to book meeting."
    );
    setModalVisible(true);
  } finally {
    // ✅ ALWAYS stops loader
    setLoading(false);
  }
};

  // ==================== Poll for approval ====================
  useEffect(() => {
    if (!meeting || accepted) return;
    
    const interval = setInterval(async () => {
      try {
        const { data } = await api.get(`/byid/${meeting._id}`);
        
        if (data.meeting?.status === 'accepted') {
          setMeeting(data.meeting);
          setAccepted(true);
          await saveMeeting(data.meeting);

          setModalType('success');
          setModalTitle('Approved!');
          setModalMessage('Your consultation has been approved. You can join when it\'s time.');
          setModalVisible(true);

          clearInterval(interval);
        } else if (data.meeting?.status === 'declined') {
          setModalType('error');
          setModalTitle('Consultation Declined');
          setModalMessage('Admin has declined your consultation request.');
          setModalVisible(true);

          setMeeting(null);
          setAccepted(false);
          await removeMeeting();
          clearInterval(interval);
        } else if (data.meeting?.status === 'ended') {
          setMeeting(null);
          setAccepted(false);
          await removeMeeting();
          clearInterval(interval);
        }
      } catch (err) {
        console.log('Poll error:', err);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [meeting, accepted]);
  const checkMeetingStatus = async () => {
  const { data } = await api.get(`${API_BASE}/meetings/status/${meeting._id}`);

  if (data?.expired) {
    await removeMeeting();
    setMeeting(null);
    setAccepted(false);

    Alert.alert("Expired", "Consultation ended");
    return false;
  }

  return true;
};

const checkMeetingStatus2 = async () => {
  try {
    if (!meeting?._id) return;

    const { data } = await api.get(`/join/${meeting._id}`);

    if (data?.success && data?.allowed) {
      // meeting still valid
      return true;
    }

    // ❌ Meeting expired → delete local and show booking button
    if (data?.expired) {
      await removeMeeting();
      setMeeting(null);
      setAccepted(false);

      setModalType("warning");
      setModalTitle("Meeting Expired");
      setModalMessage("Your consultation link expired. Please book again.");
      setModalVisible(true);
      return false;
    }

  } catch (error) {
    console.log("Check Meeting Error: ", error?.response?.data);
    return false;
  }

  return false;
};
// 🔥 Auto check every 30 seconds if meeting expired
useEffect(() => {
  if (!meeting) return;

  const interval = setInterval(async () => {
    const valid = await checkMeetingStatus();
    
    if (!valid) {
      // meeting expired → update UI
      setMeeting(null);
      setAccepted(false);
      await removeMeeting();
    }
  }, 30 * 1000); // check every 30 seconds

  return () => clearInterval(interval);
}, [meeting]);

  // ==================== Join Call ====================
  const joinCall2 = async () => {
     const valid = await checkMeetingStatus();
  if (!valid) return;
    // if (!meeting?.token || !meeting?.channelName) {
    //   Alert.alert('Error', 'Meeting not ready');
    //   return;
    // }

    if (!canJoinMeeting(meeting.startTime)) {
      const meetingStart = new Date(meeting.startTime);
      const now = new Date();
      
      if (now < meetingStart) {
        const minutesUntil = Math.floor((meetingStart.getTime() - now.getTime()) / (1000 * 60));
        const hoursUntil = Math.floor(minutesUntil / 60);
        const daysUntil = Math.floor(hoursUntil / 24);
        
        let timeMessage = '';
        if (daysUntil > 0) {
          timeMessage = `${daysUntil} day(s) and ${hoursUntil % 24} hour(s)`;
        } else if (hoursUntil > 0) {
          timeMessage = `${hoursUntil} hour(s) and ${minutesUntil % 60} minute(s)`;
        } else {
          timeMessage = `${minutesUntil} minute(s)`;
        }
        
        Alert.alert(
          'Too Early',
          `Your consultation starts in ${timeMessage}. You can join 5 minutes before the scheduled time.`
        );
      } else {
        Alert.alert('Consultation Expired', 'The 30-minute consultation window has passed.');
      }
      return;
    }

    try {
      const rtc = createAgoraRtcEngine();
      await rtc.initialize({
        appId: CONFIG.AGORA_APP_ID,
        channelProfile: ChannelProfileType.ChannelProfileCommunication,
      });

      rtc.registerEventHandler({
        onJoinChannelSuccess: (connection, elapsed) => {
          console.log('✅ Joined channel:', connection.channelId);
          setJoined(true);
        },
        onUserJoined: (connection, uid, elapsed) => {
          console.log('👤 Remote user joined:', uid);
          setRemoteUid(uid);
        },
        onUserOffline: (connection, uid, reason) => {
          console.log('👋 Remote user left:', uid);
          setRemoteUid(0);
        },
        onError: (err, msg) => {
          console.error('❌ Agora Error:', err, msg);
        },
      });

      await rtc.enableVideo();
      await rtc.enableAudio();
      await rtc.startPreview();

      await rtc.joinChannel(meeting.token, meeting.channelName, 0, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        publishMicrophoneTrack: true,
        publishCameraTrack: true,
        autoSubscribeAudio: true,
        autoSubscribeVideo: true,
      });

      engine.current = rtc;
      setInCall(true);
    } catch (err) {
      console.error('Join error:', err);
      Alert.alert('Error', 'Failed to join call');
    }
  };
  const plsy=()=>{
 SoundPlayer.playSoundFile("join", "mp3");
    return
  }
const joinCall= async () => {
   
  
  try {
    // 1️⃣ Ask backend for token JUST-IN-TIME
    const { data } = await api.get(`${API_BASE}/meetings/join/${meeting._id}`);

    if (!data?.success) {
      Alert.alert("Error", data?.message || "Unable to join");
      return;
    }

    const { token, channelName, appId } = data;

    // 2️⃣ Agora setup
    const rtc = createAgoraRtcEngine();
    await rtc.initialize({
      appId,
      channelProfile: ChannelProfileType.ChannelProfileCommunication,
    });

    rtc.registerEventHandler({
      onJoinChannelSuccess: () => setJoined(true),
      onUserJoined: (_, uid) => setRemoteUid(uid),
      onUserOffline: () => setRemoteUid(0),
      onError: (err) => console.log("Agora error:", err),
    });

    await rtc.enableVideo();
    await rtc.startPreview();

    // 3️⃣ JOIN using FRESH token
    await rtc.joinChannel(token, channelName, 0, {
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });

    engine.current = rtc;
    setInCall(true);
  } catch (err) {
    Alert.alert("Error", "Failed to join call");
  }
};

  // ==================== Leave Call ====================
  const lefaveCall = async () => {
    try {
      if (engine.current) {
        await engine.current.leaveChannel();
        engine.current.release();
        engine.current = undefined;
      }

      setInCall(false);
      setJoined(false);
      setRemoteUid(0);
      setMuted(false);
      setVideoOff(false);

      if (meeting) {
        try {
          await api.put(`/${meeting._id}/end`);
          setMeeting(null);
          setAccepted(false);
         await removeMeeting();
        } catch (err: any) {
          console.error('Error ending meeting:', err.response?.data || err.message);
        }
      }
    } catch (err) {
      console.error('Leave error:', err);
    }
  };
  const leaveCall = async () => {
  try {
    if (engine.current) {
      await engine.current.leaveChannel();
      engine.current.release();
      engine.current = undefined;
    }

    setInCall(false);
    setJoined(false);
    setRemoteUid(0);
    setMuted(false);
    setVideoOff(false);

    // ❌ DON'T end meeting here — just close the call
    // Keep meeting data so user can rejoin until expireAt
    setModalType("warning");
    setModalTitle("Call Disconnected");
    setModalMessage("You can rejoin anytime before the meeting expires.");
    setModalVisible(true);

  } catch (err) {
    console.error("Leave error:", err);
  }
};

const fetchUpcomingMeeting = async () => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) return;

    const { data } = await api.get(`/user/${userId}/active`);

    if (!data?.meeting) return; // no active meeting

    const meeting = data.meeting;

    setMeeting(meeting);
    if (meeting.status === "accepted") setAccepted(true);

    await saveMeeting(meeting);

  } catch (err) {
    console.log("Fetch error:", err);
  }
};

useEffect(() => {
  const init = async () => {
    await loadMeeting(); // First try local AsyncStorage

    // Always fetch latest from server to sync state
    await fetchUpcomingMeeting();
  };

  init();
}, []);


  // ==================== Controls ====================
  const toggleMute = () => {
    engine.current?.muteLocalAudioStream(!muted);
    setMuted(!muted);
  };

  const toggleVideo = () => {
    engine.current?.muteLocalVideoStream(!videoOff);
    setVideoOff(!videoOff);
  };

  const switchCamera = () => {
    engine.current?.switchCamera();
  };

  // ==================== RENDER ====================
  return (
    <View style={s.container}>
      <Text style={s.title}>👨‍⚕️ Face-to-Face Consultation</Text>
      <Text style={s.subtitle}>30-minute consultation • Book 7 days in advance</Text>

      {!meeting && (
        <TouchableOpacity style={s.btn} onPress={openBookingModal} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnTxt}>Book Consultation</Text>}
        </TouchableOpacity>
      )}

      {meeting && (
        <View style={s.card}>
          <Text style={s.topic}>📌 {meeting.topic}</Text>
          <Text style={s.dateTime}>🕒 {formatDateTime(meeting.startTime)}</Text>
          <Text style={s.status}>Status: {meeting.status}</Text>

          {accepted ? (
            <>
              {canJoinMeeting(meeting.startTime) ? (
                <TouchableOpacity style={[s.btn, {backgroundColor: '#10b981'}]} onPress={joinCall}>
                  <Text style={s.btnTxt}>Join Call</Text>
                </TouchableOpacity>
              ) : (
                <View style={s.timeInfo}>
                  <Text style={s.timeInfoText}>
                    {new Date() < new Date(meeting.startTime)
                      ? '⏰ Consultation not started yet'
                      : '⏱️ Consultation window has passed'}
                  </Text>
                </View>
              )}
            </>
          ) : (
            <Text style={s.waiting}>⏳ Waiting for approval...</Text>
          )}

          {/* <TouchableOpacity
            style={[s.btn, {backgroundColor: '#ef4444', marginTop: 8}]}
            onPress={async () => {
              setMeeting(null);
              setAccepted(false);
              await removeMeeting();
              setModalType('success');
              setModalTitle('Consultation Cancelled');
              setModalMessage('Your consultation has been cancelled.');
              setModalVisible(true);
            }}>
            <Text style={s.btnTxt}>Cancel Consultation</Text>
          </TouchableOpacity> */}
        </View>
      )}

      {/* Booking Modal */}
      <Modal
        visible={bookingModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setBookingModalVisible(false)}>
        <View style={s.modalOverlay}>
          <View style={s.bookingModal}>
            <Text style={s.bookingTitle}>Book a Meeting</Text>
            
            <ScrollView style={s.formContainer}>
              <Text style={s.label}>Topic / Reason for Consultation *</Text>
              <TextInput
                style={s.input}
                placeholder="e.g., Health related, Follow-up visit, etc."
                value={topic}
                placeholderTextColor={'black'}
                onChangeText={setTopic}
                multiline
                numberOfLines={2}
              />

              <Text style={s.label}>Date *</Text>
              <TouchableOpacity
                style={s.dateButton}
                onPress={() => setShowDatePicker(true)}>
                <Text style={s.dateButtonText}>
                  {selectedDate.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  minimumDate={new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)} // 7 days from now
                  maximumDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 days from now
                  onChange={(event, date) => {
                    setShowDatePicker(Platform.OS === 'ios');
                    if (date) setSelectedDate(date);
                  }}
                />
              )}

              <Text style={s.label}>Time *</Text>
              <TouchableOpacity
                style={s.dateButton}
                onPress={() => setShowTimePicker(true)}>
                <Text style={s.dateButtonText}>
                  {selectedTime.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </TouchableOpacity>

             {showTimePicker && (
  <DateTimePicker
    value={selectedTime}
    mode="time"
    onChange={(event, time) => {
      setShowTimePicker(Platform.OS === "ios");
      if (!time) return;

      setSelectedTime(time);

      // 🔥 Check availability instantly
      const status = checkTimeAvailability(selectedDate, time);
      setTimeAvailability(status);
    }}
  />
)}
{timeAvailability && (
  <View style={{ marginTop: 8 }}>
    {timeAvailability === "available" ? (
      <Text style={{ color: "#10b981", fontWeight: "600" }}>
        🟢 This time slot is available
      </Text>
    ) : (
      <Text style={{ color: "#ef4444", fontWeight: "600" }}>
       🔴 This time is unavailable. Please pick one of the suggested time slots below.

      </Text>
    )}
  </View>
)}


              <View style={s.modalButtons}>
                <TouchableOpacity
                  style={[s.modalBtn, s.cancelBtn]}
                  onPress={() => setBookingModalVisible(false)}>
                  <Text style={s.btnTxt}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[s.modalBtn, s.submitBtn]}
                  onPress={submitBooking}
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={s.btnTxt}>Book</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Video Call Modal */}
      <Modal visible={inCall} animationType="slide" onRequestClose={leaveCall}>
        <View style={s.callContainer}>
          <View style={s.remoteVideoContainer}>
            {remoteUid !== 0 ? (
              <RtcSurfaceView
                style={s.fullVideo}
                canvas={{
                  uid: remoteUid,
                  sourceType: VideoSourceType.VideoSourceRemote,
                  renderMode: 1,
                }}
              />
            ) : (
              <View style={s.waitingContainer}>
                <Text style={s.waitingText}>⏳ Waiting for remote user...</Text>
              </View>
            )}
          </View>

          <View style={s.localVideoContainer}>
            <RtcSurfaceView
              style={s.localVideo}
              canvas={{
                uid: 0,
                sourceType: VideoSourceType.VideoSourceCamera,
                renderMode: 1,
              }}
              zOrderMediaOverlay={true}
            />
          </View>

          <View style={s.statusBar}>
            <Text style={s.statusText}>
              {remoteUid ? '🟢 Connected' : '🟡 Connecting...'}
            </Text>
            {remoteUid !== 0 && (
              <Text style={s.uidText}>Remote UID: {remoteUid}</Text>
            )}
          </View>

         <View style={s.controls}>
  <View style={s.controlItem}>
    <TouchableOpacity style={[s.ctrlBtn, muted && s.active]} onPress={toggleMute}>
      <Text style={s.icon}>{muted ? '🔇' : '🎤'}</Text>
    </TouchableOpacity>
    <Text style={s.ctrlLabel}>{muted ? 'Unmute' : 'Mute'}</Text>
  </View>

  <View style={s.controlItem}>
    <TouchableOpacity style={[s.ctrlBtn, videoOff && s.active]} onPress={toggleVideo}>
      <Text style={s.icon}>{videoOff ? '📷' : '🎥'}</Text>
    </TouchableOpacity>
    <Text style={s.ctrlLabel}>{videoOff ? 'Video On' : 'Video Off'}</Text>
  </View>

  <View style={s.controlItem}>
    <TouchableOpacity style={s.ctrlBtn} onPress={switchCamera}>
      <Text style={s.icon}>🔄</Text>
    </TouchableOpacity>
    <Text style={s.ctrlLabel}>Flip</Text>
  </View>

  <View style={s.controlItem}>
    <TouchableOpacity style={[s.ctrlBtn, s.leave]} onPress={leaveCall}>
      <Text style={s.icon}>📞</Text>
    </TouchableOpacity>
    <Text style={[s.ctrlLabel, {color: '#f87171'}]}>End</Text>
  </View>
</View>

        </View>
      </Modal>

      <SuccessModal
        visible={modalVisible}
        type={modalType}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

// ==================== STYLES ====================
const s = StyleSheet.create({
  controls: {
  position: 'absolute',
  bottom: 45,
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  paddingHorizontal: 16,
},

controlItem: {
  alignItems: 'center',
},

ctrlBtn: {
  width: 65,
  height: 65,
  borderRadius: 40,
  backgroundColor: '#1f2937',
  justifyContent: 'center',
  alignItems: 'center',
},

ctrlLabel: {
  marginTop: 6,
  fontSize: 12,
  color: '#fff',
  fontWeight: '500',
  opacity: 0.9,
},

active: {
  backgroundColor: '#ef4444',
},

leave: {
  backgroundColor: '#dc2626',
},

icon: {
  fontSize: 26,
  color: '#fff',
},

  container: {flex: 1, padding: 20, backgroundColor: '#f7f9fc'},
  title: {fontSize: 28, fontWeight: '700', marginBottom: 8, color: '#1f2937'},
  subtitle: {fontSize: 14, color: '#6b7280', marginBottom: 20},
  btn: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnTxt: {color: '#fff', fontWeight: '700', fontSize: 16},
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  topic: {fontSize: 18, fontWeight: '600', marginBottom: 8, color: '#333'},
  dateTime: {fontSize: 16, color: '#3b82f6', marginBottom: 8, fontWeight: '500'},
  status: {fontSize: 14, color: '#666', marginBottom: 12},
  waiting: {color: '#f59e0b', marginVertical: 12, fontSize: 14, textAlign: 'center'},
  timeInfo: {
    backgroundColor: '#fef3c7',
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  timeInfoText: {color: '#92400e', textAlign: 'center', fontSize: 14},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingModal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
  },
  bookingHeader: {
    marginBottom: 16,
  },
  bookingTitle: {fontSize: 24, fontWeight: '700', marginBottom: 8, color: '#1f2937'},
  bookingSubtitle: {fontSize: 12, color: '#6b7280', fontStyle: 'italic'},
  formContainer: {maxHeight: 400},
  label: {fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 8, marginTop: 12},
  input: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',color:Colors.text_black
  },
  dateButton: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dateButtonText: {fontSize: 16, color: '#1f2937'},
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  modalBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelBtn: {backgroundColor: '#6b7280'},
  submitBtn: {backgroundColor: '#3b82f6'},
  callContainer: {flex: 1, backgroundColor: '#000'},
  remoteVideoContainer: {flex: 1},
  fullVideo: {flex: 1},
  waitingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2937',
  },
  waitingText: {fontSize: 18, color: '#fff'},
  localVideoContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 120,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  localVideo: {flex: 1},
  statusBar: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {color: '#fff', fontSize: 14, fontWeight: '600'},
  uidText: {color: '#9ca3af', fontSize: 12, marginTop: 2},
  controls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  ctrlBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {backgroundColor: '#ef4444'},
  leave: {backgroundColor: '#dc2626'},
  icon: {fontSize: 24},
  // label: {fontSize: 10, color: '#fff', marginTop: 4, fontWeight: '600'},
});