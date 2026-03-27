// import React, { useRef, useState, useEffect } from "react";
// import {
//   View,
//   FlatList,
//   Dimensions,
//   StyleSheet,
//   Text,
// } from "react-native";
// import Video from "react-native-video";

// const { width: screenWidth } = Dimensions.get("window");

// const VideoCarousel = ({ data = [], autoPlayDuration = 30000 }) => {
//   const flatListRef = useRef<FlatList>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   // Start autoplay timer
//   const startTimer = () => {
//     if (timerRef.current) clearTimeout(timerRef.current);
//     timerRef.current = setTimeout(() => {
//       const nextIndex = (activeIndex + 1) % data.length;
//       flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
//       setActiveIndex(nextIndex);
//     }, autoPlayDuration);
//   };

//   useEffect(() => {
//     if (data.length > 0) {
//       startTimer();
//     }
//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, [activeIndex, data.length]);

//   const renderItem = ({ item, index }: { item: any; index: number }) => {
//     return (
//       <View style={styles.videoWrapper}>
//         <Video
//           source={{ uri: item.videoUri }}
//           style={styles.video}
//           resizeMode="cover"
//           paused={index !== activeIndex} // only play active video
//           repeat
//           muted
//         />
//         {/* <View style={styles.overlay}>
//           <Text style={styles.title}>{item.title}</Text>
//         </View> */}
//       </View>
//     );
//   };

//   return (
//     <FlatList
//       ref={flatListRef}
//       data={data}
//       renderItem={renderItem}
//       horizontal
//       pagingEnabled
//       showsHorizontalScrollIndicator={false}
//       keyExtractor={(item) => item.id.toString()}
//       onMomentumScrollEnd={(e) => {
//         const newIndex = Math.round(
//           e.nativeEvent.contentOffset.x / screenWidth
//         );
//         setActiveIndex(newIndex);
//       }}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   videoWrapper: {
//     width: screenWidth,
//     height: screenWidth * 0.47, // 16:9 ratio
//     backgroundColor: "#000",
//     marginTop:10
  
//   },
//   video: {
//     width: "100%",
//     height: "100%",
//   },
//   overlay: {
//     position: "absolute",
//     bottom: 20,
//     left: 10,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     padding: 8,
//     borderRadius: 6,
//   },
//   title: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default VideoCarousel;


// import React, { useRef, useState, useEffect, useCallback } from "react";
// import {
//   View,
//   FlatList,
//   Dimensions,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import Video from "react-native-video";
// import Icon from "react-native-vector-icons/Ionicons";

// const { width: screenWidth } = Dimensions.get("window");

// interface VideoCarouselProps {
//   data?: any[];
//   autoPlayDuration?: number; // Not used for video completion, kept for compatibility
//   showControls?: boolean;
//   onVideoIndexChange?: (index: number) => void;
// }

// const VideoCarousel = ({ 
//   data = [], 
//   showControls = true,
//   onVideoIndexChange 
// }: VideoCarouselProps) => {
//   const flatListRef = useRef<FlatList>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [videoDuration, setVideoDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEndReached, setIsEndReached] = useState(false);
  
//   const videoRef = useRef<Video>(null);
//   const isManualSlideRef = useRef(false);

//   // Handle video progress
//   const handleProgress = (progressData: any) => {
//     setCurrentTime(progressData.currentTime);
    
//     // Auto slide when video ends
//     if (!isManualSlideRef.current) {
//       // Check if video is near the end (within 0.1 seconds)
//       if (videoDuration - progressData.currentTime < 0.1 && videoDuration > 0 && !isEndReached) {
//         setIsEndReached(true);
//         goToNextVideo();
//       }
//     }
//   };

//   // Handle video load
//   const handleLoad = (loadData: any) => {
//     setVideoDuration(loadData.duration);
//     setIsLoading(false);
//     setIsPlaying(true);
//     setIsEndReached(false);
//     console.log(`🎬 Video ${activeIndex + 1} loaded, duration: ${loadData.duration}s`);
//   };

//   // Handle video end (fallback for when progress doesn't catch the end)
//   const handleEnd = () => {
//     if (!isManualSlideRef.current) {
//       goToNextVideo();
//     }
//   };

//   // Handle video error
//   const handleError = (error: any) => {
//     console.log(`❌ Video ${activeIndex + 1} error:`, error);
//     setIsLoading(false);
//     // Try to go to next video after error
//     setTimeout(() => {
//       goToNextVideo();
//     }, 2000);
//   };

//   // Go to next video
//   const goToNextVideo = useCallback(() => {
//     if (data.length > 0) {
//       const nextIndex = (activeIndex + 1) % data.length;
//       flatListRef.current?.scrollToIndex({ 
//         index: nextIndex, 
//         animated: true 
//       });
//       setActiveIndex(nextIndex);
//       onVideoIndexChange?.(nextIndex);
//       setIsPlaying(true);
//       setIsEndReached(false);
//     }
//   }, [activeIndex, data.length, onVideoIndexChange]);

//   // Go to previous video
//   const goToPreviousVideo = useCallback(() => {
//     if (data.length > 0) {
//       const prevIndex = activeIndex === 0 ? data.length - 1 : activeIndex - 1;
//       flatListRef.current?.scrollToIndex({ 
//         index: prevIndex, 
//         animated: true 
//       });
//       setActiveIndex(prevIndex);
//       onVideoIndexChange?.(prevIndex);
//       setIsPlaying(true);
//       setIsEndReached(false);
//     }
//   }, [activeIndex, data.length, onVideoIndexChange]);

//   // Toggle play/pause
//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   // Handle manual scroll
//   const handleScrollEnd = (e: any) => {
//     const newIndex = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
//     if (newIndex !== activeIndex) {
//       isManualSlideRef.current = true;
//       setActiveIndex(newIndex);
//       onVideoIndexChange?.(newIndex);
//       setIsPlaying(true);
//       setIsEndReached(false);
      
//       // Reset manual slide flag after a short delay
//       setTimeout(() => {
//         isManualSlideRef.current = false;
//       }, 500);
//     }
//   };

//   // Reset video state when active index changes
//   useEffect(() => {
//     setCurrentTime(0);
//     setVideoDuration(0);
//     setIsLoading(true);
//     setIsEndReached(false);
//   }, [activeIndex]);

//   // Format time in mm:ss
//   const formatTime = (seconds: number) => {
//     if (isNaN(seconds)) return "0:00";
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const renderItem = ({ item, index }: { item: any; index: number }) => {
//     const isActive = index === activeIndex;
//     const progressPercent = videoDuration > 0 ? (currentTime / videoDuration) * 100 : 0;
    
//     return (
//       <View style={styles.videoWrapper}>
//         <Video
//           ref={isActive ? videoRef : undefined}
//           source={{ uri: item.videoUri }}
//           style={styles.video}
//           resizeMode="cover"
//           paused={!isActive || !isPlaying}
//           repeat={false}
//           muted={false}
//           onLoad={isActive ? handleLoad : undefined}
//           onProgress={isActive ? handleProgress : undefined}
//           onEnd={isActive ? handleEnd : undefined}
//           onError={handleError}
//           bufferConfig={{
//             minBufferMs: 15000,
//             maxBufferMs: 50000,
//             bufferForPlaybackMs: 2500,
//             bufferForPlaybackAfterRebufferMs: 5000,
//           }}
//         />
        
//         {/* Loading Indicator */}
//         {isActive && isLoading && (
//           <View style={styles.loadingOverlay}>
//             <ActivityIndicator size="large" color="#fff" />
//           </View>
//         )}
        
//         {/* Video Controls */}
//         {showControls && isActive && !isLoading && (
//           <>
//             <TouchableOpacity 
//               style={styles.previousButton}
//               onPress={goToPreviousVideo}
//               activeOpacity={0.7}
//             >
//               <Icon name="chevron-back" size={30} color="#fff" />
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={styles.playButton}
//               onPress={togglePlayPause}
//               activeOpacity={0.7}
//             >
//               <Icon 
//                 name={isPlaying ? "pause" : "play"} 
//                 size={40} 
//                 color="#fff" 
//               />
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={styles.nextButton}
//               onPress={goToNextVideo}
//               activeOpacity={0.7}
//             >
//               <Icon name="chevron-forward" size={30} color="#fff" />
//             </TouchableOpacity>
//           </>
//         )}
        
//         {/* Progress Bar */}
//         {isActive && videoDuration > 0 && !isLoading && (
//           <View style={styles.progressContainer}>
//             <View style={styles.progressBarBackground}>
//               <View 
//                 style={[
//                   styles.progressBarFill,
//                   { width: `${progressPercent}%` }
//                 ]} 
//               />
//             </View>
//             <View style={styles.timeInfo}>
//               <Text style={styles.timeText}>
//                 {formatTime(currentTime)}
//               </Text>
//               <Text style={styles.timeText}>
//                 {formatTime(videoDuration)}
//               </Text>
//             </View>
//           </View>
//         )}
        
//         {/* Video Title */}
//         {item.title && (
//           <View style={styles.overlay}>
//             <Text style={styles.title} numberOfLines={1}>
//               {item.title}
//             </Text>
//           </View>
//         )}
//       </View>
//     );
//   };

//   if (!data || data.length === 0) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Icon name="videocam-outline" size={48} color="#999" />
//         <Text style={styles.emptyText}>No videos available</Text>
//       </View>
//     );
//   }

//   return (
//     <>
//       <FlatList
//         ref={flatListRef}
//         data={data}
//         renderItem={renderItem}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
//         onMomentumScrollEnd={handleScrollEnd}
//         getItemLayout={(data, index) => ({
//           length: screenWidth,
//           offset: screenWidth * index,
//           index,
//         })}
//       />
      
//       {/* Pagination Dots */}
//       <View style={styles.pagination}>
//         {data.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.paginationDot,
//               index === activeIndex && styles.paginationDotActive,
//             ]}
//           />
//         ))}
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   videoWrapper: {
//     width: screenWidth,
//     height: screenWidth * 0.47, // 16:9 ratio
//     backgroundColor: "#000",
//     marginTop: 10,
//     position: 'relative',
//   },
//   video: {
//     width: "100%",
//     height: "100%",
//   },
//   loadingOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   previousButton: {
//     position: 'absolute',
//     left: 15,
//     top: '50%',
//     transform: [{ translateY: -25 }],
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 10,
//   },
//   playButton: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: [{ translateX: -30 }, { translateY: -30 }],
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 10,
//   },
//   nextButton: {
//     position: 'absolute',
//     right: 15,
//     top: '50%',
//     transform: [{ translateY: -25 }],
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 10,
//   },
//   progressContainer: {
//     position: 'absolute',
//     bottom: 50,
//     left: 20,
//     right: 20,
//     zIndex: 10,
//   },
//   progressBarBackground: {
//     height: 3,
//     backgroundColor: 'rgba(255,255,255,0.3)',
//     borderRadius: 2,
//     overflow: 'hidden',
//   },
//   progressBarFill: {
//     height: '100%',
//     backgroundColor: '#fff',
//     borderRadius: 2,
//   },
//   timeInfo: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 5,
//   },
//   timeText: {
//     color: '#fff',
//     fontSize: 10,
//   },
//   overlay: {
//     position: "absolute",
//     bottom: 15,
//     left: 15,
//     right: 15,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     padding: 8,
//     borderRadius: 8,
//     zIndex: 10,
//   },
//   title: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "bold",
//     textAlign: 'center',
//   },
//   pagination: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 8,
//     marginBottom: 8,
//   },
//   paginationDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: '#ccc',
//     marginHorizontal: 4,
//   },
//   paginationDotActive: {
//     width: 20,
//     backgroundColor: '#007AFF',
//   },
//   emptyContainer: {
//     height: 200,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     margin: 10,
//     borderRadius: 12,
//   },
//   emptyText: {
//     marginTop: 10,
//     fontSize: 14,
//     color: '#999',
//   },
// });

// export default VideoCarousel;

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