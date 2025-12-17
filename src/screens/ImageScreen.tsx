// import React, { useRef, useState } from "react";
// import {
//   View,
//   Dimensions,
//   Image,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   FlatList,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Colors from "../constants/Colors";
// import { AuthStackRoutes } from "../navigation/Routes";

// const { width, height } = Dimensions.get("window");

// const slides = [
//   {
//     id: "1",
//     image: require("../assets/logo1.jpg"),
//     title: "Subscribe to daily updates on wellness",
//     subtitle: "hormone replacement and supplements and optional ",
//     subtitle1: "consults with a real nurse practitioner of 27 years of",
//     subtitle2:
//       " experience to help you navigate your wellness and or hormone replacement journey",
//     button: "Next",
//   },
//   {
//     id: "2",
//     image: require("../assets/logo2.jpg"),
//     title: "Subscribe to daily updates on wellness",
//     subtitle: "hormone replacement and supplements and optional ",
//     subtitle1: "consults with a real nurse practitioner of 27 years of",
//     subtitle2:
//       " experience to help you navigate your wellness and or hormone replacement journey",
//     button: "Next",
//   },
//   {
//     id: "3",
//     image: require("../assets/ddd1.jpg"),
//     button: "Get Started", // no text for this slide
//   },
// ];

// const ImageScreen = ({ navigation }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const flatListRef = useRef(null);

//   const onViewRef = useRef(({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       setCurrentIndex(viewableItems[0].index);
//     }
//   });

//   const viewConfigRef = useRef({
//     viewAreaCoveragePercentThreshold: 50,
//   });

//   const nextSlide = async () => {
//     if (currentIndex === slides.length - 1) {
//       await AsyncStorage.setItem("hasOnboarded", "true");
//       navigation.replace(AuthStackRoutes.Login);
//       return;
//     }
//     flatListRef.current.scrollToIndex({
//       index: currentIndex + 1,
//     });
//   };

//   const skip = async () => {
//     await AsyncStorage.setItem("hasOnboarded", "true");
//     navigation.replace(AuthStackRoutes.Login);
//   };

//   const renderIndicator = () => (
//     <View style={styles.indicatorContainer}>
//       {slides.map((_, index) => (
//         <View
//           key={index}
//           style={[
//             styles.indicator,
//             currentIndex === index
//               ? styles.activeIndicator
//               : styles.inactiveIndicator,
//           ]}
//         />
//       ))}
//     </View>
//   );

//  const renderItem = ({ item, index }) => {
//   const isLast = index === slides.length - 1;

//   return (
//     <View style={[styles.slide, isLast && styles.lastSlide]}>
//       <Image
//         source={item.image}
//         style={[styles.image, isLast && styles.fullImage]}
//         resizeMode="cover"
//       />

//       {!isLast && (
//         <View style={styles.card}>
//           {item.title ? <Text style={styles.title}>{item.title}</Text> : null}
//           {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
//           {item.subtitle1 ? <Text style={styles.subtitle1}>{item.subtitle1}</Text> : null}
//           {item.subtitle2 ? <Text style={styles.subtitle2}>{item.subtitle2}</Text> : null}
//         </View>
//       )}

//       <TouchableOpacity onPress={nextSlide} activeOpacity={0.9}>
//         <View style={[styles.button, isLast && styles.lastButton]}>
//           <Text style={styles.buttonText}>{item.button}</Text>
//         </View>
//       </TouchableOpacity>

//       {renderIndicator()}

//       <TouchableOpacity activeOpacity={0.7} onPress={skip}>
//         <Text style={styles.skipText}>Skip</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };


//   return (
//     <FlatList
//       ref={flatListRef}
//       data={slides}
//       keyExtractor={(item) => item.id}
//       horizontal
//       pagingEnabled
//       showsHorizontalScrollIndicator={false}
//       renderItem={renderItem}
//       onViewableItemsChanged={onViewRef.current}
//       viewabilityConfig={viewConfigRef.current}
//     />
//   );
// };

// export default ImageScreen;

// const styles = StyleSheet.create({
//   slide: {
//     width,
//     flex: 1,
//     backgroundColor: "#ffffffff",
//     alignItems: "center",
//     justifyContent: "flex-end",
//   },
//   image: {
//     width: "100%",
//     height: height * 0.55,
//   },
//   fullImage: {
//     height: "100%", // fullscreen on last slide
//   },lastSlide: {
//   backgroundColor: "#f7ecd6ff", 
//   // backgroundColor: "#F3E8D3", 
// },

//   card: {
//     width: "100%",
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 25,
//     paddingVertical: 25,
//     marginTop: -30,
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: Colors.darkBlueP1,
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: Colors.darkBlueP1,
//     textAlign: "center",
//   },
//   subtitle1: {
//     fontSize: 14,
//     color: Colors.darkBlueP1,
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   subtitle2: {
//     fontSize: 14,
//     color: Colors.darkBlueP1,
//     textAlign: "center",
//   },
//   button: {
//     height: 48,
//     width: 311,
//     backgroundColor: Colors.darkBlueP1,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 25,
//     marginTop: 15,
//   },
//   lastButton: {
//     marginBottom: 5, // lifted above bottom for full-screen slide
//   },
//   buttonText: {
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "600",
//   },
//   indicatorContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginVertical: 15,
//   },
//   indicator: {
//     height: 8,
//     borderRadius: 40,
//     marginHorizontal: 4,
//   },
//   activeIndicator: {
//     width: 25,
//     backgroundColor: Colors.darkBlueP1,
//   },
//   inactiveIndicator: {
//     width: 8,
//     backgroundColor: "#ccc",
//   },
//   skipText: {
//     color: Colors.grayPRI,
//     fontSize: 15,
//     fontWeight: "500",
//     marginBottom: 25,
//   },
// });

import React, { useRef, useState } from "react";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStackRoutes } from "../navigation/Routes";

const { width, height } = Dimensions.get("window");


const slides = [
  {
    id: "1",
    image: require("../assets/logo1.jpg"),
    paragraph:
      "Stay informed and empowered with daily updates covering wellness, hormone replacement, and supplement support. If you want deeper guidance, optional consults are available with a Nurse Practitioner who brings 28 years of experience and real-life understanding to help you navigate your transition, your symptoms, and your goals with clarity and confidence.",
    button: "Next",
  },
  {
    id: "2",
    image: require("../assets/logo2.jpg"),
    paragraph:
      "Exclusive, personalized guidance that unites Biohacking with modern and traditional medicine.",
    button: "Next",
  },
  {
    id: "3",
  image: require("../assets/immm.jpg"),
    paragraph: "",
    button: "Get Started",
  },
];

const ImageScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const nextSlide = async () => {
    if (currentIndex === slides.length - 1) {
      await AsyncStorage.setItem("hasOnboarded", "true");
      navigation.replace(AuthStackRoutes.Login);
      return;
    }
    flatListRef.current.scrollToIndex({
      index: currentIndex + 1,
    });
  };

  const skip = async () => {
    await AsyncStorage.setItem("hasOnboarded", "true");
    navigation.replace(AuthStackRoutes.Login);
  };

  const renderIndicator = () => (
    <View style={styles.indicatorContainer}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            currentIndex === index
              ? styles.activeIndicator
              : styles.inactiveIndicator,
          ]}
        />
      ))}
    </View>
  );

  const renderItem = ({ item, index }) => {
    const isLast = index === slides.length - 1;

    return (
      <View style={[styles.slide, isLast && styles.lastSlide]}>
        <Image
          source={item.image}
          style={[styles.image, isLast && styles.fullImage]}
          // resizeMode="cover"
        />

        {!isLast && (
          <View style={styles.card}>
            {/* ---- SINGLE PARAGRAPH ---- */}
            {item.paragraph ? (
              // <Text style={styles.paragraph}>{item.paragraph}</Text>
              <Text style={styles.paragraph}>
  {item.paragraph.charAt(0).toUpperCase()+ item.paragraph.slice(1)}
</Text>

            ) : null}
          </View>
        )}

        <TouchableOpacity onPress={nextSlide} activeOpacity={0.9}>
          <View style={[styles.button, isLast && styles.lastButton]}>
            <Text style={styles.buttonText}>{item.button}</Text>
          </View>
        </TouchableOpacity>

        {renderIndicator()}

       {(index !== slides.length - 1 || item.paragraph === "") && (
  <TouchableOpacity activeOpacity={0.7} onPress={skip}>
    <Text style={styles.skipText}>Skip</Text>
  </TouchableOpacity>
)}

      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={slides}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
    />
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  slide: {
    width,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    // height: height * 0.55,
    height: height * 0.45,
  },
  fullImage: {
    height: "100%",resizeMode:"contain"
  },
  lastSlide: {
    backgroundColor: "#f7ecd6ff",paddingTop:150
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 25,
    marginTop: -30,
    minHeight: height * 0.40,
    justifyContent: "center",
    alignItems: "center",
  },
//  paragraph: {
//   fontSize: 17,
//   color: "#1f2937",
//   textAlign: "center",
//   lineHeight: 25,
//   paddingHorizontal: 10,  textTransform: "capitalize",width:340,fontWeight:"500"
// },
paragraph: {
  fontSize: 17,
  color: "#181f2aff",
  textAlign: "center",
  lineHeight: 26,
  width: 340,
  fontWeight: "500",
  // textTransform: "capitalize",

},



  button: {
    height: 48,
    width: 311,
    backgroundColor: "#1f2937",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 15,
  },
  lastButton: {
    marginBottom: 0,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  indicator: {
    height: 8,
    borderRadius: 40,
    marginHorizontal: 4,
  },
  activeIndicator: {
    width: 25,
    backgroundColor: "#1f2937",
  },
  inactiveIndicator: {
    width: 8,
    backgroundColor: "#ccc",
  },
  skipText: {
    color: "grey",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 40,
  },
});
