// // VideoPlayer.js
// import React from "react";
// import { View, StyleSheet, ActivityIndicator } from "react-native";
// import Video from "react-native-video";

// const VideoPlayer = ({
//   source,           // video URL or local require()
//   style,            // optional styling
//   paused = false,   // play/pause state
//   loop = false,     // loop video
//   onEnd = () => {}, // callback when video ends
//   onLoad = () => {},// callback when video loads
// }) => {
//   return (
//     <View style={[styles.container, style]}>
//       <Video
//         source={source}
//         style={StyleSheet.absoluteFill}
//         resizeMode="contain"
//         paused={paused}
//         repeat={loop}
//         onEnd={onEnd}
//         onLoad={onLoad}
        
//         controls={true} // show native controls
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     aspectRatio: 16 / 9, // keeps 16:9 ratio by default
//     backgroundColor: "#000",
//     borderRadius: 10,
//     overflow: "hidden",
//   },
// });

// export default VideoPlayer;

// VideoPlayer.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import Video from "react-native-video";
import Icon from "react-native-vector-icons/Ionicons";

const VideoPlayer = ({
  source,
  style,
  autoplay = true,
  loop = true,
  initiallyMuted = true,
  onEnd = () => {},
  onLoad = () => {},
}) => {
  const [paused, setPaused] = useState(!autoplay);
  const [muted, setMuted] = useState(initiallyMuted);
  const [showIcon, setShowIcon] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const hideTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  const showTemporaryIcon = () => {
    setShowIcon(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 140,
      useNativeDriver: true,
    }).start();

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowIcon(false));
    }, 900);
  };

  const togglePlayPause = () => {
    setPaused(prev => {
      const next = !prev;
      return next;
    });
    showTemporaryIcon();
  };

  return (
    <View style={[styles.container, style]}>
      {/* Video (bottom layer) */}
      <Video
        source={source}
        style={StyleSheet.absoluteFill}
        resizeMode="contain"
        paused={paused}
        repeat={!paused && loop}
        muted={muted}
        onEnd={onEnd}
        onLoad={onLoad}
        playWhenInactive={false}
        playInBackground={false}
        // Helps iOS autoplay behaviour
        ignoreSilentSwitch={"ignore"}
      />

      {/* Pressable overlay to capture taps anywhere on the video.
          It is placed BEFORE the icon and mute button in the tree so that
          those later children render above it and receive touches too. */}
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={togglePlayPause}
        android_ripple={{ color: "rgba(255,255,255,0.06)" }}
      >
        {/* empty; the Pressable simply captures the tap */}
      </Pressable>

      {/* Center play/pause icon (fades in/out) */}
      {showIcon && (
        <Animated.View style={[styles.iconContainer, { opacity: fadeAnim }]}>
          <Icon
            name={paused ? "play-circle-outline" : "pause-circle-outline"}
            size={72}
            color="#fff"
          />
        </Animated.View>
      )}

      {/* Mute / Unmute button (top-most so it receives taps) */}
      <TouchableOpacity
        style={styles.muteButton}
        onPress={() => setMuted(m => !m)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon
          name={muted ? "volume-mute-outline" : "volume-high-outline"}
          size={22}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  muteButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 8,
    borderRadius: 20,
  },
});

export default VideoPlayer;

//  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <VideoPlayer
      
//         source={{ uri: "https://assets.mixkit.co/videos/46655/46655-720.mp4" }}
//         // source={{ uri: "https://www.pexels.com/download/video/4536085/" }}
//         paused={paused}
//         loop={true}
//         style={{ width: "90%" }}
//        // onEnd={() => Alert.alert("Video ended")}
//       />

     
//     </View>