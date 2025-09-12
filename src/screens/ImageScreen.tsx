// import React, { useRef, useState } from 'react';
// import {
//   View,
//   Dimensions,
//   Image,
//   TouchableOpacity,
//   Text,
//   StatusBar,
//   StyleSheet,
//   FlatList
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import  Colors  from '../constants/Colors';
// import { SafeAreaView } from 'react-native-safe-area-context';
// const { width, height } = Dimensions.get('window');

// const slides = [
//   {
//     id: '1',
//     image: "https://img.freepik.com/free-photo/healthcare-workers-preventing-virus-quarantine-campaign-concept-cheerful-friendly-asian-female-physician-doctor-with-clipboard-daily-checkup-standing-white-background_1258-107867.jpg?uid=R210148761&ga=GA1.1.641802148.1754460082&semt=ais_incoming&w=740&q=80", // Trusted Sellers image
//     title: 'Meet Doctors Online',
     
//     subtitle: 'Connect with Specialized Doctors Online for',
//     subtitle1:"Convenient and Comprehensive Medical Consultations.",
//     button: 'Next',
//   },
//   {
//     id: '2',
//     image: "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?uid=R210148761&ga=GA1.1.641802148.1754460082&semt=ais_incoming&w=740&q=80", // Easy Payments image
//     title: 'Connect with Specialists',
//      subtitle: 'Connect with Specialized Doctors Online for',
//     subtitle1:"Convenient and Comprehensive Medical Consultations.",
//     button: 'Next',
//   },
//   {
//     id: '3',
//     image: "https://img.freepik.com/free-photo/portrait-smiling-medical-worker-girl-doctor-white-coat-with-stethoscope-pointing-fingers-left-showing-medical-clinic-advertisement-torquoise-background_1258-87675.jpg?uid=R210148761&ga=GA1.1.641802148.1754460082&semt=ais_incoming&w=740&q=80", 
//     title: 'Thousands of Online Specialists',
//     subtitle: 'Connect with Specialized Doctors Online for',
//     subtitle1:"Convenient and Comprehensive Medical Consultations.",
//     button: 'Get Started',
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

//   const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

//   const nextSlide = async () => {
//     if (currentIndex === slides.length - 1) {
//       await AsyncStorage.setItem('hasOnboarded', 'true');
//       navigation.replace('Main'); // Change to your home/auth screen
//       // navigation.replace('Auth'); // Change to your home/auth screen
      
//       return;
//     }
//     flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
//   };

//  const renderIndicator = () => (
//   <SafeAreaView style={styles.indicatorContainer}>
//     {slides.map((_, index) => (
//       <View
//         key={index}
//         style={[
//           styles.indicator,
//           currentIndex === index
//             ? styles.activeIndicator
//             : styles.inactiveIndicator
//         ]}
//       />
//     ))}
   
//   </SafeAreaView>
// );


//  const renderItem = ({ item }) => (
//   <View style={styles.slide}>
//     {/* Top Image */}
//     <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />

//     {/* Bottom Content */}
//     <View style={styles.contentContainer}>
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.subtitle}>{item.subtitle}</Text>
//       <Text style={styles.subtitle1}>{item.subtitle1}</Text>

//       {/* Indicators */}

//       {/* Button */}
//       <TouchableOpacity onPress={nextSlide} activeOpacity={0.9}>
//         <View style={styles.button}>
//           <Text style={styles.buttonText}>{item.button}</Text>
//         </View>
//       </TouchableOpacity>
//       {renderIndicator()}
//         <TouchableOpacity  activeOpacity={0.7} >
//           <Text style={{color:Colors.grayPRI,fontSize:16,fontWeight:"500"}}>Skip</Text>

//       </TouchableOpacity>
//     </View>
//   </View>
// );


//   return (
//     <>
//       <StatusBar
//         backgroundColor="transparent"
//         barStyle="dark-content"
//         animated
//         translucent
//       />
//       <View style={styles.container}>
       
//         <FlatList
//           ref={flatListRef}
//           data={slides}
//           keyExtractor={(item) => item.id}
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           renderItem={renderItem}
//           onViewableItemsChanged={onViewRef.current}
//           viewabilityConfig={viewConfigRef.current}
//         />
//         {/* <View style={styles.buttonContainer}>
//           <TouchableOpacity onPress={nextSlide} activeOpacity={0.9}>
//             <View style={styles.button}>
//               <View style={styles.buttonContent}>
//                 <Text style={styles.buttonText}>
//                   {slides[currentIndex].button}
//                 </Text>
             
//               </View>
//             </View>
//           </TouchableOpacity>  
//         </View> */}
//       </View>
 
//     </>
//   );
// };

// export default ImageScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   slide: {
//     width,
//     flex: 1,
//   },
//   image: {
//     width: '100%',
//     height: height * 0.55, // 55% for image
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: Colors.darkBlueP1,
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 15,
//     color: Colors.darkBlueP1,
//     textAlign: 'center',
//   },
//   subtitle1: {
//     fontSize: 15,
//     color: Colors.darkBlueP1,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   indicatorContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginVertical: 20,
//   },
//   indicator: {
//     height: 8,
//     borderRadius: 40,
//     marginHorizontal: 5,
//   },
//   activeIndicator: {
//     width: 27,
//     backgroundColor: Colors.darkBlueP1,
//   },
//   inactiveIndicator: {
//     width: 7,
//     backgroundColor: '#ccc',
//   },
//   button: {
//     height: 48,
//     width: 311,
//     backgroundColor: Colors.darkBlueP1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 25,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });



import React, { useRef, useState } from "react";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image:
      "https://img.freepik.com/free-photo/healthcare-workers-preventing-virus-quarantine-campaign-concept-cheerful-friendly-asian-female-physician-doctor-with-clipboard-daily-checkup-standing-white-background_1258-107867.jpg?w=740&q=80",
    title: "Meet Doctors Online",
    subtitle: "Connect with Specialized Doctors Online for",
    subtitle1:
      "Convenient and Comprehensive Medical Consultations.",
    button: "Next",
  },
  {
    id: "2",
    image:
      "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=740&q=80",
    title: "Connect with Specialists",
    subtitle: "Connect with Specialized Doctors Online for",
    subtitle1:
      "Convenient and Comprehensive Medical Consultations.",
    button: "Next",
  },
  {
    id: "3",
    image:
      "https://img.freepik.com/free-photo/portrait-smiling-medical-worker-girl-doctor-white-coat-with-stethoscope-pointing-fingers-left-showing-medical-clinic-advertisement-torquoise-background_1258-87675.jpg?w=740&q=80",
    title: "Thousands of Online Specialists",
    subtitle: "Connect with Specialized Doctors Online for",
    subtitle1:
      "Convenient and Comprehensive Medical Consultations.",
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
      navigation.replace("Login");
      return;
    }
    flatListRef.current.scrollToIndex({
      index: currentIndex + 1,
    });
  };
const skip=async()=>{
   await AsyncStorage.setItem("hasOnboarded", "true");
         navigation.replace("Login");
}
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

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      {/* Top Image */}
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Bottom Card */}
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.subtitle1}>{item.subtitle1}</Text>

        {/* Button */}
        <TouchableOpacity onPress={nextSlide} activeOpacity={0.9}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{item.button}</Text>
          </View>
        </TouchableOpacity>

        {/* Indicators */}
        {renderIndicator()}

        {/* Skip */}
        <TouchableOpacity activeOpacity={0.7} onPress={skip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
    {/* cmd */}
      {/* <StatusBar
        //backgroundColor="transparent"
        barStyle="light-content"
        translucent
      /> */}
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
    </>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  slide: {
    width,
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: height * 0.65,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 30,
    alignItems: "center",
    marginTop: -20, // overlaps image slightly for smooth effect
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
    marginBottom: 20,
  },
  button: {
    height: 48,
    width: 311,
    backgroundColor: Colors.darkBlueP1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
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
  },
});
