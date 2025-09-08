
import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  Text,
} from "react-native";
import TextTicker from "react-native-text-ticker";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Colors from "../../constants/Colors";

const { width: screenWidth } = Dimensions.get("window");
const DOT_WIDTH_INACTIVE = 12;
const DOT_WIDTH_ACTIVE = 48;
const DOT_HEIGHT = 4;

export default function BannerCarousel({
  data = [],
  onPress = () => {},
  showText,
  text = false,
  autoPlayInterval = 7000,
  width = screenWidth,
  height,
  loading = false,
  topDot = null,tickDuration=20000,
  
  tickerOverlay = false, // new prop → true = overlay ticker inside image
}) {
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const bannerHeight = height || width / 2.2;

  // parse {red}..{/red}
  const parts = [];
  const regex = /\{red\}(.*?)\{\/red\}/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), color: "white" });
    }
    parts.push({ text: match[1], color: "red" });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), color: "white" });
  }

  // ticker memoized → will not restart
  const ticker = useMemo(() => {
    if (!text) return null;
    return (
      <View
        style={[
          styles.Tcontainer,
          tickerOverlay && {
            position: "absolute",
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
          },
        ]}
      >
        <TextTicker
          style={styles.tickerText}
          duration={tickDuration}
          loop
          bounce={false}
          repeatSpacer={0 }
          marqueeDelay={0}
          isRTL={false}
          scrollSpeed={30}
        >

          {parts.map((part, index) => (
            <Text
              key={index}
              style={part.color === "red" ? styles.red : styles.white}
            >
              {part.text}
            </Text>
          ))}
        </TextTicker>
      </View>
    );
  }, [text]);

  // progress bar animation
  const startProgress = () => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: autoPlayInterval,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (loading || data.length <= 1) return;

    startProgress();
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % data.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
      startProgress();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [activeIndex, data.length, loading]);

  // skeleton
  const renderSkeleton = () => (
    <SkeletonPlaceholder
      backgroundColor="#E0E0E0"
      highlightColor="#F5F5F5"
      
      //borderRadius={8}
    >
      <View
        style={{
          
          height: bannerHeight,
          //borderRadius: 12,
          marginHorizontal: (screenWidth - width) / 2,
        }}
      />
    </SkeletonPlaceholder>
  );

  // render each banner
  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress(item)}
      style={{ width: screenWidth, alignItems: "center" }}
    >
      <View
        style={{
          width,
          height: bannerHeight,
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: item.uri }}
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />

        {/* optional overlay title/subtitle */}
        {showText && (item.title || item.subtitle) ? (
          <View style={styles.overlay}>
            {item.title ? <Text style={styles.title}>{item.title}</Text> : null}
            {item.subtitle ? (
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            ) : null}
          </View>
        ) : null}

        {/* ticker overlay mode */}
        {tickerOverlay && ticker}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        renderSkeleton()
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            data={data}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(
                e.nativeEvent.contentOffset.x / screenWidth
              );
              setActiveIndex(newIndex);
              startProgress();
            }}
          />
          {/* ticker strip below banners (only if not overlay mode) */}
          {!tickerOverlay && ticker}

          {/* dots */}
          <View style={[styles.dotContainer, { top: topDot }]}>
            {data.map((_, i) => {
              const isActive = i === activeIndex;
              return (
                <View
                  key={i}
                  style={[
                    styles.dotBackground,
                    { width: isActive ? DOT_WIDTH_ACTIVE : DOT_WIDTH_INACTIVE },
                  ]}
                >
                  {isActive ? (
                    <Animated.View
                      style={{
                        height: "100%",
                        backgroundColor: Colors.bg_black,
                        width: progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["0%", "100%"],
                        }),
                      }}
                    />
                  ) : null}
                </View>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  white: {
    color: Colors.white,
  },
  red: {
    color: Colors.bg_orange,
    fontWeight: "600",
  },
  Tcontainer: {
    width: screenWidth,
    backgroundColor: Colors.bg_black,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  tickerText: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: "500",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  container: { marginTop: 0 },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    paddingBottom: 10,
    position: "relative",
  },
  dotBackground: {
    height: DOT_HEIGHT,
    backgroundColor: "#ccc",
    borderRadius: DOT_HEIGHT / 2,
    marginHorizontal: 3,
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    color: Colors.white,
    fontSize: 13,
    marginTop: 3,
  },
});
