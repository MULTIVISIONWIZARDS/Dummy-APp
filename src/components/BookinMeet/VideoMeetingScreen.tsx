import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function VideoMeetingScreen({ route, navigation }: any) {
  const { topic, participant, onEndMeeting } = route.params;
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Participant Video */}
      <View style={styles.videoContainer}>
        <Text style={styles.videoText}>{participant}</Text>
      </View>

      {/* Your own video overlay */}
      <View style={styles.selfVideo}>
        <Text style={styles.videoText}>You</Text>
      </View>

      {/* Topic + Timer */}
      <Text style={styles.topic}>📌 {topic}</Text>
      <Text style={styles.timer}>⏱ {Math.floor(timer / 60)}:{("0"+timer%60).slice(-2)}</Text>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlText}>🎤</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlText}>📹</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: "#f44336" }]}
          onPress={() => {
            onEndMeeting?.(); // hide card
            navigation.goBack();
          }}
        >
          <Text style={styles.controlText}>✖ End</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:"#000", justifyContent:"center", alignItems:"center" },
  videoContainer: { width: width * 0.9, height: height * 0.6, backgroundColor:"#222", borderRadius:12, justifyContent:"center", alignItems:"center" },
  selfVideo: { position:"absolute", width:100, height:140, bottom:120, right:16, backgroundColor:"#444", borderRadius:12, justifyContent:"center", alignItems:"center" },
  videoText: { color:"#fff", fontSize:18, fontWeight:"700" },
  topic: { color:"#fff", fontSize:20, fontWeight:"700", marginTop:16 },
  timer: { color:"#fff", fontSize:16, marginTop:4 },
  controls: { flexDirection:"row", justifyContent:"space-around", width:"80%", marginTop:24 },
  controlButton: { backgroundColor:"#555", padding:16, borderRadius:50 },
  controlText: { color:"#fff", fontSize:18, fontWeight:"700" },
});
