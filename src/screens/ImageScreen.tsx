// // import React, { useRef, useState } from 'react';
// // import {
// //   View,
// //   Dimensions,
// //   Image,
// //   TouchableOpacity,
// //   Text,
// //   StatusBar,
// //   StyleSheet,
// //   FlatList
// // } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // import  Colors  from '../constants/Colors';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // const { width, height } = Dimensions.get('window');

// // const slides = [
// //   {
// //     id: '1',
// //     image: "https://img.freepik.com/free-photo/healthcare-workers-preventing-virus-quarantine-campaign-concept-cheerful-friendly-asian-female-physician-doctor-with-clipboard-daily-checkup-standing-white-background_1258-107867.jpg?uid=R210148761&ga=GA1.1.641802148.1754460082&semt=ais_incoming&w=740&q=80", // Trusted Sellers image
// //     title: 'Meet Doctors Online',
     
// //     subtitle: 'Connect with Specialized Doctors Online for',
// //     subtitle1:"Convenient and Comprehensive Medical Consultations.",
// //     button: 'Next',
// //   },
// //   {
// //     id: '2',
// //     image: "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?uid=R210148761&ga=GA1.1.641802148.1754460082&semt=ais_incoming&w=740&q=80", // Easy Payments image
// //     title: 'Connect with Specialists',
// //      subtitle: 'Connect with Specialized Doctors Online for',
// //     subtitle1:"Convenient and Comprehensive Medical Consultations.",
// //     button: 'Next',
// //   },
// //   {
// //     id: '3',
// //     image: "https://img.freepik.com/free-photo/portrait-smiling-medical-worker-girl-doctor-white-coat-with-stethoscope-pointing-fingers-left-showing-medical-clinic-advertisement-torquoise-background_1258-87675.jpg?uid=R210148761&ga=GA1.1.641802148.1754460082&semt=ais_incoming&w=740&q=80", 
// //     title: 'Thousands of Online Specialists',
// //     subtitle: 'Connect with Specialized Doctors Online for',
// //     subtitle1:"Convenient and Comprehensive Medical Consultations.",
// //     button: 'Get Started',
// //   },
// // ];

// // const ImageScreen = ({ navigation }) => {
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const flatListRef = useRef(null);

// //   const onViewRef = useRef(({ viewableItems }) => {
// //     if (viewableItems.length > 0) {
// //       setCurrentIndex(viewableItems[0].index);
// //     }
// //   });

// //   const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

// //   const nextSlide = async () => {
// //     if (currentIndex === slides.length - 1) {
// //       await AsyncStorage.setItem('hasOnboarded', 'true');
// //       navigation.replace('Main'); // Change to your home/auth screen
// //       // navigation.replace('Auth'); // Change to your home/auth screen
      
// //       return;
// //     }
// //     flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
// //   };

// //  const renderIndicator = () => (
// //   <SafeAreaView style={styles.indicatorContainer}>
// //     {slides.map((_, index) => (
// //       <View
// //         key={index}
// //         style={[
// //           styles.indicator,
// //           currentIndex === index
// //             ? styles.activeIndicator
// //             : styles.inactiveIndicator
// //         ]}
// //       />
// //     ))}
   
// //   </SafeAreaView>
// // );


// //  const renderItem = ({ item }) => (
// //   <View style={styles.slide}>
// //     {/* Top Image */}
// //     <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />

// //     {/* Bottom Content */}
// //     <View style={styles.contentContainer}>
// //       <Text style={styles.title}>{item.title}</Text>
// //       <Text style={styles.subtitle}>{item.subtitle}</Text>
// //       <Text style={styles.subtitle1}>{item.subtitle1}</Text>

// //       {/* Indicators */}

// //       {/* Button */}
// //       <TouchableOpacity onPress={nextSlide} activeOpacity={0.9}>
// //         <View style={styles.button}>
// //           <Text style={styles.buttonText}>{item.button}</Text>
// //         </View>
// //       </TouchableOpacity>
// //       {renderIndicator()}
// //         <TouchableOpacity  activeOpacity={0.7} >
// //           <Text style={{color:Colors.grayPRI,fontSize:16,fontWeight:"500"}}>Skip</Text>

// //       </TouchableOpacity>
// //     </View>
// //   </View>
// // );


// //   return (
// //     <>
// //       <StatusBar
// //         backgroundColor="transparent"
// //         barStyle="dark-content"
// //         animated
// //         translucent
// //       />
// //       <View style={styles.container}>
       
// //         <FlatList
// //           ref={flatListRef}
// //           data={slides}
// //           keyExtractor={(item) => item.id}
// //           horizontal
// //           pagingEnabled
// //           showsHorizontalScrollIndicator={false}
// //           renderItem={renderItem}
// //           onViewableItemsChanged={onViewRef.current}
// //           viewabilityConfig={viewConfigRef.current}
// //         />
// //         {/* <View style={styles.buttonContainer}>
// //           <TouchableOpacity onPress={nextSlide} activeOpacity={0.9}>
// //             <View style={styles.button}>
// //               <View style={styles.buttonContent}>
// //                 <Text style={styles.buttonText}>
// //                   {slides[currentIndex].button}
// //                 </Text>
             
// //               </View>
// //             </View>
// //           </TouchableOpacity>  
// //         </View> */}
// //       </View>
 
// //     </>
// //   );
// // };

// // export default ImageScreen;
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //   },
// //   slide: {
// //     width,
// //     flex: 1,
// //   },
// //   image: {
// //     width: '100%',
// //     height: height * 0.55, // 55% for image
// //   },
// //   contentContainer: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     paddingHorizontal: 20,
// //     paddingVertical: 30,
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: '700',
// //     color: Colors.darkBlueP1,
// //     marginBottom: 10,
// //     textAlign: 'center',
// //   },
// //   subtitle: {
// //     fontSize: 15,
// //     color: Colors.darkBlueP1,
// //     textAlign: 'center',
// //   },
// //   subtitle1: {
// //     fontSize: 15,
// //     color: Colors.darkBlueP1,
// //     textAlign: 'center',
// //     marginBottom: 20,
// //   },
// //   indicatorContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     marginVertical: 20,
// //   },
// //   indicator: {
// //     height: 8,
// //     borderRadius: 40,
// //     marginHorizontal: 5,
// //   },
// //   activeIndicator: {
// //     width: 27,
// //     backgroundColor: Colors.darkBlueP1,
// //   },
// //   inactiveIndicator: {
// //     width: 7,
// //     backgroundColor: '#ccc',
// //   },
// //   button: {
// //     height: 48,
// //     width: 311,
// //     backgroundColor: Colors.darkBlueP1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     borderRadius: 25,
// //   },
// //   buttonText: {
// //     fontSize: 16,
// //     color: '#fff',
// //     fontWeight: 'bold',
// //   },
// // });



// // import React, { useRef, useState } from "react";
// // import {
// //   View,
// //   Dimensions,
// //   Image,
// //   TouchableOpacity,
// //   Text,
// //   StatusBar,
// //   StyleSheet,
// //   FlatList,
// // } from "react-native";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import Colors from "../constants/Colors";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { AuthStackRoutes } from "../navigation/Routes";

// // const { width, height } = Dimensions.get("window");

// // // const slides = [
// // //   {
// // //     id: "1",
// // //     image:
// // //       "https://img.freepik.com/free-vector/girl-practicing-yoga-healthy-icons_18591-77150.jpg?t=st=1758187381~exp=1758190981~hmac=dc18732273e093c4daf1ec3808f45b868b5bcc98c6ee6dc404a3705b4498a8f0&w=1480",
// // //     title: "Meet Doctors Online",
// // //     subtitle: "Connect with Specialized Doctors Online for",
// // //     subtitle1:
// // //       "Convenient and Comprehensive Medical Consultations.",
// // //     button: "Next",
// // //   },
// // //   {
// // //     id: "2",
// // //     image:
// // //       "https://img.freepik.com/free-vector/people-yoga-outdoor-flat-style_24908-57669.jpg?t=st=1758187224~exp=1758190824~hmac=1208d5e9ad19489acea0f7d417835b42d968647d3382c1c55bbe59d405c3d64c&w=1480",
// // //     title: "Connect with Specialists",
// // //     subtitle: "Connect with Specialized Doctors Online for",
// // //     subtitle1:
// // //       "Convenient and Comprehensive Medical Consultations.",
// // //     button: "Next",
// // //   },
// // //   {
// // //     id: "3",
// // //     image:
// // //       "https://img.freepik.com/free-vector/mother-daughter-doing-fitness-outdoors_74855-5893.jpg?t=st=1758187131~exp=1758190731~hmac=69340f685cbfae5059431e71a316f47136ccda5158b9ee2410f51c3fc3437532&w=1480",
// // //     title: "Thousands of Online Specialists",
// // //     subtitle: "Connect with Specialized Doctors Online for",
// // //     subtitle1:
// // //       "Convenient and Comprehensive Medical Consultations.",
// // //     button: "Get Started",
// // //   },
// // // ];
 
// // const slides = [
// //   {
// //     id: "1",
// //     image:require('../assets/logo1.jpg'),
// //     title: "Subscribe to daily updates on wellness",
// //     subtitle: "hormone replacement and supplements and optional ",
// //     subtitle1:'consults with a real nurse practitioner of 27 years of'
// //       ,
// //       subtitle2:" experience to help you navigate your wellness and or hormone replacement journey",
// //     button: "Next",
// //   },
// //   {
// //     id: "2",
// //     image:
// //     require('../assets/logo2.jpg'),
// //     title: "Subscribe to daily updates on wellness",
// //     subtitle: "hormone replacement and supplements and optional ",
// //     subtitle1:'consults with a real nurse practitioner of 27 years of'
// //       ,
// //       subtitle2:" experience to help you navigate your wellness and or hormone replacement journey",
// //     button: "Next",
// //   },
// //   // {
// //   //   id: "3",
// //   //   image:
// //   //     require('../assets/imggg.jpg'),
// //   //   title: "Thousands of Online Specialists",
// //   //   subtitle: "Connect with Specialized Doctors Online for",
// //   //   subtitle1:
// //   //     "Convenient and Comprehensive Medical Consultations.",
// //   //   button: "Get Started",
// //   // },
// // ];

// // const ImageScreen = ({ navigation }) => {
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const flatListRef = useRef(null);

// //   const onViewRef = useRef(({ viewableItems }) => {
// //     if (viewableItems.length > 0) {
// //       setCurrentIndex(viewableItems[0].index);
// //     }
// //   });

// //   const viewConfigRef = useRef({
// //     viewAreaCoveragePercentThreshold: 50,
// //   });

// //   const nextSlide = async () => {
// //     if (currentIndex === slides.length - 1) {
// //       await AsyncStorage.setItem("hasOnboarded", "true");
// //       navigation.replace(AuthStackRoutes.Login);
// //       return;
// //     }
// //     flatListRef.current.scrollToIndex({
// //       index: currentIndex + 1,
// //     });
// //   };
// // const skip=async()=>{
// //    await AsyncStorage.setItem("hasOnboarded", "true");
// //          navigation.replace(AuthStackRoutes.Login);
// // }
// //   const renderIndicator = () => (
// //     <View style={styles.indicatorContainer}>
// //       {slides.map((_, index) => (
// //         <View
// //           key={index}
// //           style={[
// //             styles.indicator,
// //             currentIndex === index
// //               ? styles.activeIndicator
// //               : styles.inactiveIndicator,
// //           ]}
// //         />
// //       ))}
// //     </View>
// //   );

// //   const renderItem = ({ item }) => (
// //     <View style={styles.slide}>
// //       {/* Top Image */}
// //       <Image
// //         source={  item.image }
// //         style={styles.image}
// //         resizeMode="cover"
// //       />

// //       {/* Bottom Card */}
// //       <View style={styles.card}>
// //         <Text style={styles.title}>{item.title}</Text>
// //         <Text style={styles.subtitle}>{item.subtitle}</Text>
// //         <Text style={styles.subtitle1}>{item.subtitle1}</Text>
// //         <Text style={styles.subtitle2}>{item.subtitle2}</Text>

// //         {/* Button */}
// //         <TouchableOpacity onPress={nextSlide} activeOpacity={0.9}>
// //           <View style={styles.button}>
// //             <Text style={styles.buttonText}>{item.button}</Text>
// //           </View>
// //         </TouchableOpacity>
// // {/* <View style={styles.bottomSection}>
// //   {renderIndicator()}
// //   <TouchableOpacity activeOpacity={0.7} onPress={skip}>
// //     <Text style={styles.skipText}>Skip</Text>
// //   </TouchableOpacity>
// // </View> */}

// //         {/* Indicators */}
// //         {renderIndicator()}

// //         {/* Skip */}
// //         <TouchableOpacity activeOpacity={0.7} onPress={skip}>
// //           <Text style={styles.skipText}>Skip</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );

// //   return (
// //     <>
// //     {/* cmd */}
// //       {/* <StatusBar
// //         //backgroundColor="transparent"
// //         barStyle="light-content"
// //         translucent
// //       /> */}
// //       <FlatList
// //         ref={flatListRef}
// //         data={slides}
// //         keyExtractor={(item) => item.id}
// //         horizontal
// //         pagingEnabled
// //         showsHorizontalScrollIndicator={false}
// //         renderItem={renderItem}
// //         onViewableItemsChanged={onViewRef.current}
// //         viewabilityConfig={viewConfigRef.current}
// //       />
// //     </>
// //   );
// // };

// // export default ImageScreen;

// // const styles = StyleSheet.create({
// //   slide: {
// //     width,
// //     flex: 1,
// //     backgroundColor: "#fff",
// //   },
// //   image: {
// //     width: "100%",
// //     height: height * 0.55,
// //   },
// //   card: {
// //   flex: 1,
// //   backgroundColor: "#fff",
// //   borderTopLeftRadius: 30,
// //   borderTopRightRadius: 30,
// //   paddingHorizontal: 25,
// //   paddingVertical: 25,
// //   marginTop: -30,
// //   justifyContent: "space-between",
// //   alignItems: "center",
// // },

// //   title: {
// //     fontSize: 20,
// //     fontWeight: "700",
// //     color: Colors.darkBlueP1,
// //     marginBottom: 10,
// //     textAlign: "center",
// //   },
// //   subtitle: {
// //     fontSize: 14,
// //     color: Colors.darkBlueP1,
// //     textAlign: "center",
// //   },
// //   subtitle1: {
// //     fontSize: 14,
// //     color: Colors.darkBlueP1,
// //     textAlign: "center",
// //     marginBottom: 10,
// //   },
// //    subtitle2: {
// //     fontSize: 14,
// //     color: Colors.darkBlueP1,
// //     textAlign: "center",
// //     // marginBottom: 20,
// //   },
// //   button: {
// //     height: 48,
// //     width: 311,
// //     backgroundColor: Colors.darkBlueP1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     borderRadius: 25,
// //     marginTop: 10,
// //   },
// //   buttonText: {
// //     fontSize: 16,
// //     color: "#fff",
// //     fontWeight: "600",
// //   },
// //   indicatorContainer: {
// //     flexDirection: "row",
// //     justifyContent: "center",
// //     marginVertical: 20,
// //   },
// //   indicator: {
// //     height: 8,
// //     borderRadius: 40,
// //     marginHorizontal: 4,
// //   },
// //   activeIndicator: {
// //     width: 25,
// //     backgroundColor: Colors.darkBlueP1,
// //   },
// //   inactiveIndicator: {
// //     width: 8,
// //     backgroundColor: "#ccc",
// //   },
// //   skipText: {
// //     color: Colors.grayPRI,
// //     fontSize: 15,
// //     fontWeight: "500",
// //   },
// // });



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
import Colors from "../constants/Colors";
import { AuthStackRoutes } from "../navigation/Routes";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../assets/logo1.jpg"),
    title: "Subscribe to daily updates on wellness",
    subtitle: "hormone replacement and supplements and optional ",
    subtitle1: "consults with a real nurse practitioner of 27 years of",
    subtitle2:
      " experience to help you navigate your wellness and or hormone replacement journey",
    button: "Next",
  },
  {
    id: "2",
    image: require("../assets/logo2.jpg"),
    title: "Exclusive, personalized guidance ",
    subtitle:
      "that unites biohacking with modern and traditional medicine.",
    button: "Next",
  },
  {
    id: "3",
    image: require("../assets/ddd1.jpg"),
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
          resizeMode="cover"
        />

        {!isLast && (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>

            {/* ---- FIX APPLIED ONLY FOR SLIDE 2 ---- */}
            {item.id === "2" ? (
              <Text style={[styles.subtitle2Line, { marginTop: 15 }]}>
                {item.subtitle}
              </Text>
            ) : (
              <>
                {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
                {item.subtitle1 ? <Text style={styles.subtitle1}>{item.subtitle1}</Text> : null}
                {item.subtitle2 ? <Text style={styles.subtitle2}>{item.subtitle2}</Text> : null}
              </>
            )}
          </View>
        )}

        <TouchableOpacity onPress={nextSlide} activeOpacity={0.9}>
          <View style={[styles.button, isLast && styles.lastButton]}>
            <Text style={styles.buttonText}>{item.button}</Text>
          </View>
        </TouchableOpacity>

        {renderIndicator()}

        <TouchableOpacity activeOpacity={0.7} onPress={skip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
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
    backgroundColor: "#ffffffff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    height: height * 0.55,
  },
  fullImage: {
    height: "100%",
  },
  lastSlide: {
    backgroundColor: "#f7ecd6ff",
  },
  card: {
  width: "100%",
  backgroundColor: "#fff",
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  paddingHorizontal: 25,
  paddingVertical: 25,
  marginTop: -30,
  alignItems: "center",
  justifyContent: "center",

  minHeight: height * 0.32, // 👈 keeps consistency on all slides
},


  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.darkBlueP1,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.darkBlueP1,
    textAlign: "center",
  },
  subtitle1: {
    fontSize: 14,
    color: Colors.darkBlueP1,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle2: {
    fontSize: 14,
    color: Colors.darkBlueP1,
    textAlign: "center",
  },
  subtitle2Line: {
    fontSize: 15,
    textAlign: "center",
    color: Colors.darkBlueP1,
    lineHeight: 22,
    paddingHorizontal: 15,
  },
  button: {
    height: 48,
    width: 311,
    backgroundColor: Colors.darkBlueP1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 15,
  },
  lastButton: {
    marginBottom: 5,
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
    backgroundColor: Colors.darkBlueP1,
  },
  inactiveIndicator: {
    width: 8,
    backgroundColor: "#ccc",
  },
  skipText: {
    color: Colors.grayPRI,
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 55,
  },
});
