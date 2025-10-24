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
//   const [meeting, setMeeting] = useState<any>(null);

// const [modalType, setModalType] = useState<'success' | 'error' | 'warning'>('success');
// const [modalTitle, setModalTitle] = useState('');
// const [modalMessage, setModalMessage] = useState('');

//   const [accepted, setAccepted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [inCall, setInCall] = useState(false);
//   const [joined, setJoined] = useState(false);
//   const [remoteUid, setRemoteUid] = useState(0);
//   const [muted, setMuted] = useState(false);
//   const [videoOff, setVideoOff] = useState(false);
//   const engine = useRef<IRtcEngine>();
//  const [modalVisible, setModalVisible] = useState(false);
//   // Request permissions
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

// const bookMeeting = async () => {
//   if (!(await requestPermissions())) {
//     setModalType('warning');
//     setModalTitle('Permissions needed');
//     setModalMessage('You need to allow permissions to book a meeting.');
//     setModalVisible(true);
//     return;
//   }

//   setLoading(true);
//   try {
//     const { data } = await api.post('/book', {
//       userId: CONFIG.USER_ID,
//       topic: 'Video Call',
//     });

//     if (data.success) {
//       setMeeting(data.meeting);

//       // Success modal
//       setModalType('success');
//       setModalTitle(' Meeting booked!');
//       setModalMessage('Waiting for approval...');
//       setModalVisible(true);
//     }
//   } catch (err: any) {
//     // Error modal
//     setModalType('error');
//     setModalTitle(' Error');
//     setModalMessage(err.response?.data?.message || 'Failed to book meeting.');
//     setModalVisible(true);
//   }
//   setLoading(false);
// };


//   // Poll for approval
//   useEffect(() => {
//     if (!meeting || accepted) return;
//     const interval = setInterval(async () => {
//       try {
//         const {data} = await api.get(`/byid/${meeting._id}`);
//         if (data.meeting?.status === 'accepted') {
//           setMeeting(data.meeting);
//           setAccepted(true);
//            setModalType('success');
//       setModalTitle('Approved!');
//       setModalMessage('You can join now.');
//       setModalVisible(true);
        
//           clearInterval(interval);
//         } else if (data.meeting?.status === 'declined') {
//             setModalType('error');
//           setModalTitle('Meeting declined!');
//       setModalMessage('Admin is meeting declined');
//       setModalVisible(true);
       
//           setMeeting(null);
//           clearInterval(interval);
//         }
//       } catch (err) {
//         console.log('Poll error:', err);
//       }
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [meeting, accepted]);

//   // Setup video call
//   const joinCall = async () => {
//     if (!meeting?.token || !meeting?.channelName) return Alert.alert('Meeting not ready');
    
//     try {
//       const rtc = createAgoraRtcEngine();
//       await rtc.initialize({
//         appId: CONFIG.AGORA_APP_ID,
//         channelProfile: ChannelProfileType.ChannelProfileCommunication,
//       });

//       // Register event handlers BEFORE enabling video
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

//       // Enable video and audio
//       await rtc.enableVideo();
//       await rtc.enableAudio();
      
//       // IMPORTANT: Start preview AFTER initialization
//       await rtc.startPreview();

//       // Join channel
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

//   // Leave call
//   // const leaveCall = async () => {
//   //   try {
//   //     if (engine.current) {
//   //       await engine.current.leaveChannel();
//   //       engine.current.release();
//   //       engine.current = undefined;
//   //     }
//   //     setInCall(false);
//   //     setJoined(false);
//   //     setRemoteUid(0);
//   //     setMuted(false);
//   //     setVideoOff(false);
//   //   } catch (err) {
//   //     console.error('Leave error:', err);
//   //   }
//   // };
// const leaveCall = async () => {
//   try {
//     if (engine.current) {
//       await engine.current.leaveChannel();
//       engine.current.release();
//       engine.current = undefined;
//     }

//     setInCall(false);
//     setJoined(false);
//     setRemoteUid(0);
//     setMuted(false);
//     setVideoOff(false);

//     // Notify backend that call ended
//     if (meeting) {
//       try {
//         await api.put(`/${meeting._id}/end`);
//         // Optionally remove from frontend list
//         setMeeting(null);
//         setAccepted(false);
//       } catch (err: any) {
//         console.error('Error ending meeting:', err.response?.data || err.message);
//       }
//     }
//   } catch (err) {
//     console.error('Leave error:', err);
//   }
// };

//   // Toggle mute
//   const toggleMute = () => {
//     engine.current?.muteLocalAudioStream(!muted);
//     setMuted(!muted);
//   };

//   // Toggle video
//   const toggleVideo = () => {
//     engine.current?.muteLocalVideoStream(!videoOff);
//     setVideoOff(!videoOff);
//   };

//   // Switch camera
//   const switchCamera = () => {
//     engine.current?.switchCamera();
//   };

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
//             onPress={() => {
//               setMeeting(null);
//               setAccepted(false);
              
//                  setModalType('success');
//       setModalTitle('Successfully Meeting cancel');
//       setModalMessage('Your meeting is cancel.');
//       setModalVisible(true);
//             }}>
//             <Text style={s.btnTxt}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Video Call Modal */}
//       <Modal visible={inCall} animationType="slide" onRequestClose={leaveCall}>
//         <View style={s.callContainer}>
//           {/* Remote Video (Full Screen) */}
//           <View style={s.remoteVideoContainer}>
//             {remoteUid !== 0 ? (
//               <RtcSurfaceView
//                 style={s.fullVideo}
//                 canvas={{
//                   uid: remoteUid,
//                   sourceType: VideoSourceType.VideoSourceRemote,
//                   renderMode: 1, // Hidden mode
//                 }}
//               />
//             ) : (
//               <View style={s.waitingContainer}>
//                 <Text style={s.waitingText}>⏳ Waiting for remote user...</Text>
//               </View>
//             )}
//           </View>

//           {/* Local Video (Small, Top Right) */}
//           <View style={s.localVideoContainer}>
//             <RtcSurfaceView
//               style={s.localVideo}
//               canvas={{
//                 uid: 0,
//                 sourceType: VideoSourceType.VideoSourceCamera,
//                 renderMode: 1, // Hidden mode
//               }}
//               zOrderMediaOverlay={true}
//             />
//           </View>

//           {/* Status Bar */}
//           <View style={s.statusBar}>
//             <Text style={s.statusText}>
//               {remoteUid ? '🟢 Connected' : '🟡 Connecting...'}
//             </Text>
//             {remoteUid !== 0 && (
//               <Text style={s.uidText}>Remote UID: {remoteUid}</Text>
//             )}
//           </View>

//           {/* Controls */}
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
//   visible={modalVisible}
//   type={modalType}
//   title={modalTitle}
//   message={modalMessage}
//   onClose={() => setModalVisible(false)}
 
// />

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
import { API_BASE } from '../../constants/Constant';
import SuccessModal from '../successModal/SuccessModal';

// ==================== CONFIG ====================
const CONFIG = {
  BACKEND: `${API_BASE}/api/meetings`,
  AUTH: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZThhNjdhMDZlMmIzODE0M2IxNjM3NyIsImlhdCI6MTc2MDA5MTk5MCwiZXhwIjoxNzYwNjk2NzkwfQ.J4TCIIgZIu6q_uFIXPWH4dUMp2RTmGVF1Ni-Ze0Susk',
  USER_ID: '68ecd160a13a3100b0e5de25',
  AGORA_APP_ID: 'e7ce3caec69347b3a47deaecc69d2699',
};

const api = axios.create({
  baseURL: CONFIG.BACKEND,
  headers: {'Content-Type': 'application/json', Authorization: CONFIG.AUTH},
});

// ==================== MAIN COMPONENT ====================
export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

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

  // ==================== Book Meeting ====================
  const bookMeeting = async () => {
    if (!(await requestPermissions())) {
      setModalType('warning');
      setModalTitle('Permissions needed');
      setModalMessage('You need to allow permissions to book a meeting.');
      setModalVisible(true);
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/book', {
        userId: CONFIG.USER_ID,
        topic: 'Video Call',
      });

      if (data.success) {
        setMeeting(data.meeting);
        await saveMeeting(data.meeting);

        setModalType('success');
        setModalTitle('Meeting booked!');
        setModalMessage('Waiting for approval...');
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
          setModalMessage('You can join now.');
          setModalVisible(true);

          clearInterval(interval);
        } else if (data.meeting?.status === 'declined') {
          setModalType('error');
          setModalTitle('Meeting declined!');
          setModalMessage('Admin has declined the meeting.');
          setModalVisible(true);

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

  // ==================== Join Call ====================
  const joinCall = async () => {
    if (!meeting?.token || !meeting?.channelName) return Alert.alert('Meeting not ready');

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

  // ==================== Leave Call ====================
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
      <Text style={s.title}>📅 Video Meeting</Text>

      {!meeting && (
        <TouchableOpacity style={s.btn} onPress={bookMeeting} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnTxt}>Book Meeting</Text>}
        </TouchableOpacity>
      )}

      {meeting && (
        <View style={s.card}>
          <Text style={s.topic}>📌 {meeting.topic}</Text>
          <Text style={s.status}>Status: {meeting.status}</Text>

          {accepted ? (
            <TouchableOpacity style={[s.btn, {backgroundColor: '#10b981'}]} onPress={joinCall}>
              <Text style={s.btnTxt}>Join Call</Text>
            </TouchableOpacity>
          ) : (
            <Text style={s.waiting}>⏳ Waiting for approval...</Text>
          )}

          <TouchableOpacity
            style={[s.btn, {backgroundColor: '#ef4444', marginTop: 8}]}
            onPress={async () => {
              setMeeting(null);
              setAccepted(false);
              await removeMeeting();
              setModalType('success');
              setModalTitle('Meeting cancelled');
              setModalMessage('Your meeting has been cancelled.');
              setModalVisible(true);
            }}>
            <Text style={s.btnTxt}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

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
            <TouchableOpacity style={[s.ctrlBtn, muted && s.active]} onPress={toggleMute}>
              <Text style={s.icon}>{muted ? '🔇' : '🎤'}</Text>
              <Text style={s.label}>{muted ? 'Unmute' : 'Mute'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[s.ctrlBtn, videoOff && s.active]} onPress={toggleVideo}>
              <Text style={s.icon}>{videoOff ? '📷' : '🎥'}</Text>
              <Text style={s.label}>{videoOff ? 'Video On' : 'Video Off'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.ctrlBtn} onPress={switchCamera}>
              <Text style={s.icon}>🔄</Text>
              <Text style={s.label}>Flip</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[s.ctrlBtn, s.leave]} onPress={leaveCall}>
              <Text style={s.icon}>📞</Text>
              <Text style={s.label}>End</Text>
            </TouchableOpacity>
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
  container: {flex: 1, padding: 20, backgroundColor: '#f7f9fc'},
  title: {fontSize: 28, fontWeight: '700', marginBottom: 20, color: '#1f2937'},
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
  status: {fontSize: 14, color: '#666', marginBottom: 12},
  waiting: {color: '#f59e0b', marginVertical: 12, fontSize: 14, textAlign: 'center'},
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
  label: {fontSize: 10, color: '#fff', marginTop: 4, fontWeight: '600'},
});
