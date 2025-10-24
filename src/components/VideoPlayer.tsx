import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";
import Video from "react-native-video";

const { width: screenWidth } = Dimensions.get("window");

const VideoCarousel = ({ data = [], autoPlayDuration = 30000 }) => {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start autoplay timer
  const startTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const nextIndex = (activeIndex + 1) % data.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, autoPlayDuration);
  };

  useEffect(() => {
    if (data.length > 0) {
      startTimer();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, data.length]);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={styles.videoWrapper}>
        <Video
          source={{ uri: item.videoUri }}
          style={styles.video}
          resizeMode="cover"
          paused={index !== activeIndex} // only play active video
          repeat
          muted
        />
        {/* <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
        </View> */}
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      onMomentumScrollEnd={(e) => {
        const newIndex = Math.round(
          e.nativeEvent.contentOffset.x / screenWidth
        );
        setActiveIndex(newIndex);
      }}
    />
  );
};

const styles = StyleSheet.create({
  videoWrapper: {
    width: screenWidth,
    height: screenWidth * 0.47, // 16:9 ratio
    backgroundColor: "#000",
    marginTop:10
  
  },
  video: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 20,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 6,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VideoCarousel;
