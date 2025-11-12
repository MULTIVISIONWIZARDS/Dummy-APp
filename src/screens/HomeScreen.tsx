// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons';

// import Footer from '../components/Footer';
// import BannerCarousel from '../components/Banner/BannerCarousel';
// import BrandHeader from '../components/BrandHeader/BrandHeader';
// import CategoryGrid from '../components/CategoryGrid/CategoryGrid';
// import WellnessShowcase from '../components/WellnessShowcase';
// import DailyInfoScreen from './DailyInfoScreen';
// import SubscriptionScreen from './SubscriptionScreen';
// import Colors from '../constants/Colors';
// import VideoPlayer from '../components/VideoPlayer';
// import MoodTracker from '../components/MoodTracker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Greeting from '../components/Greeting';
// import { useAppSelector } from '../store/hooks';
// import BookMeetingScreen from '../components/BookinMeet/BookMeetingScreen';

// const HomeScreen: React.FC<any> = ({ navigation }) => {
// const [chatCount, setChatCount] = useState(0);
//    const [hasSubscription, setHasSubscription] = useState(false);
//   const user = useAppSelector((state) => state.auth.user); 

//   useEffect(() => {
//     const checkSubscription = async () => {
//       const data = await AsyncStorage.getItem('subscriptionDetails');
//       if (data) {
//         const subscription = JSON.parse(data);
//         const now = new Date();
//         const expiry = new Date(subscription.expiryDate);
//         if (expiry > now) {
//           setHasSubscription(true); // user has active subscription
//         }
//       }
//     };
//     checkSubscription();
//   }, []);

//   const banners = [
//     { id: 1, uri: 'https://img.freepik.com/free-photo/healthy-food-fruits-vegetables_53876-40332.jpg', title: 'Daily Nutrition Tips' },
//     { id: 2, uri: 'https://img.freepik.com/free-photo/young-woman-exercising-gym_1303-12569.jpg', title: 'Exercise & Fitness' },
//     { id: 3, uri: 'https://img.freepik.com/free-vector/dna-helix-science-background_23-2148993570.jpg', title: 'Hormone Health Insights' },
//     { id: 4, uri: 'https://img.freepik.com/free-vector/medication-pills-supplements-concept_23-2148993296.jpg', title: 'Supplement Spotlight' },
//     { id: 5, uri: 'https://img.freepik.com/free-photo/woman-sleeping-comfortable-bed_1150-47230.jpg', title: 'Sleep & Recovery' },
//     { id: 6, uri: 'https://img.freepik.com/free-vector/stressed-businessman-concept_23-2148475452.jpg', title: 'Stress Management' },
//     { id: 7, uri: 'https://img.freepik.com/free-vector/meditation-concept-illustration_23-2148475460.jpg', title: 'Mindfulness & Relaxation' },
//     { id: 8, uri: 'https://img.freepik.com/free-photo/glass-water-with-lemon_1203-8495.jpg', title: 'Hydration Tips' },
//   ];
//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
//       {/* Header */}
//       <BrandHeader onMessagePress={()=>navigation.navigate('Consults')} chatCount={chatCount}/>
//  {/* onPress={() => navigation.navigate('Journal')}  */}
//       {/* Scrollable content */}
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//        {user?.name&& <Greeting/>}
//         <BannerCarousel
//           data={banners}
//           height={180}
//           width={Dimensions.get('window').width - 20}
//           tickerOverlay
//           text="🎉 Daily Wellness Update: Eat more veggies today! | Exercise: 10 push-ups | Mindfulness: 5-min break | Drink 2 liters of water"
//           speed={60}
//           />

//           <BookMeetingScreen/>
//         <CategoryGrid onPressItem={(item) => navigation.navigate('CategoryDetail', { item })} />
// <MoodTracker />
//         <WellnessShowcase />
//            {!hasSubscription && <SubscriptionScreen />}
//         {/* Add spacing before footer */}
//         <View style={{ height: 100 }} />
//       </ScrollView>
  
//       <TouchableOpacity
//         // style={styles.floatingButton}
//         style={styles.floatingButtonCom}
//         activeOpacity={0.9}
//         onPress={() => navigation.navigate('Journal')} // Navigate to Journal screen
//       >
//         <Icon name="book" size={24} color="#fff" />
//         {/* <Text style={styles.buttonText}>Journal</Text> */}
//       </TouchableOpacity>

//       {/* Footer remains fixed at bottom */}
//       <Footer />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContent: {
//     paddingBottom: 20,
//   },
//   floatingButton: {
//     position: 'absolute',
//     right: 20,
//     bottom: 40, // Adjust according to Footer height
//     backgroundColor: Colors.darkBlueP1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 30,
//     elevation: 5, // shadow for Android
//     shadowColor: '#000', // shadow for iOS
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3
//   },
//    floatingButtonCom: {
//     position: 'absolute',
//     right: 20,
//     bottom: 40, // Adjust according to Footer height
//     backgroundColor: Colors.darkBlueP1,
//     flexDirection: 'row',
//     alignItems: 'center',justifyContent:'center',
//     //paddingHorizontal: 14,
//     //paddingVertical: 8,
//     borderRadius: 30,
//     elevation: 5, // shadow for Android
//     shadowColor: '#000', // shadow for iOS
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,height:50,width:50
//   },
//   buttonText: {
//     color: '#fff',
//     marginLeft: 8,
//     fontWeight: 'bold',
//   },
// });

// export default HomeScreen;



import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import Footer from "../components/Footer";
import BannerCarousel from "../components/Banner/BannerCarousel";
import BrandHeader from "../components/BrandHeader/BrandHeader";
import CategoryGrid from "../components/CategoryGrid/CategoryGrid";
import WellnessShowcase from "../components/WellnessShowcase";
import SubscriptionScreen from "./SubscriptionScreen";
import Colors from "../constants/Colors";
import MoodTracker from "../components/MoodTracker";
import Greeting from "../components/Greeting";
import BookMeetingScreen from "../components/BookinMeet/BookMeetingScreen";
import { useAppSelector } from "../store/hooks";
import CommonSubscription from "../components/CommonSubscription";
import { AuthStackRoutes, MainTabRoutes } from "../navigation/Routes";
import VideoCarousel from "../components/VideoPlayer";
import { LogBox } from 'react-native';
import PatientTestimonial from "./PatientTestimonial";

LogBox.ignoreLogs(['Text strings must be rendered within a <Text> component']);

const CHAT_STORAGE_KEY = "user_chat_messages";

const HomeScreen: React.FC<any> = () => {
  const [chatCount, setChatCount] = useState(0);
  const [hasSubscription, setHasSubscription] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const navigation = useNavigation();

  // 🔹 load subscription
  const checkSubscription = async () => {
    try {
      const data = await AsyncStorage.getItem("subscriptionDetails");
      if (data) {
        const subscription = JSON.parse(data);
        const now = new Date();
        const expiry = new Date(subscription.expiryDate);
        if (expiry > now) {
          setHasSubscription(true);
        } else {
          setHasSubscription(false);
        }
      }
    } catch (e) {
      console.log("Error loading subscription:", e);
    }
  };

  // 🔹 load chat count
  const loadChatCount = async () => {
    try {
      const savedChat = await AsyncStorage.getItem(CHAT_STORAGE_KEY);
      if (savedChat) {
        const parsed = JSON.parse(savedChat);
        setChatCount(parsed.length);
      } else {
        setChatCount(0);
      }
    } catch (e) {
      console.log("Error loading chat count:", e);
    }
  };

  // 🔹 refresh whenever screen is focused
  useFocusEffect(
    useCallback(() => {
      checkSubscription();
      loadChatCount();
    }, [])
  );
const banner = [
  { 
    id: 1, 
    videoUri: "https://videos.pexels.com/video-files/33818382/14352759_2560_1440_60fps.mp4", 
    title: "Daily Nutrition Tips" 
  },
  { 
    id: 2, 
    videoUri: "https://www.pexels.com/download/video/4536085/", 
    title: "Daily Nutrition Tips" 
  },
 
];
  const banners = [
    { id: 1, uri: "https://img.freepik.com/free-photo/healthy-food-fruits-vegetables_53876-40332.jpg", title: "Daily Nutrition Tips" },
    { id: 2, uri: "https://img.freepik.com/free-photo/young-woman-exercising-gym_1303-12569.jpg", title: "Exercise & Fitness" },
    { id: 3, uri: "https://img.freepik.com/free-vector/dna-helix-science-background_23-2148993570.jpg", title: "Hormone Health Insights" },
    { id: 4, uri: "https://img.freepik.com/free-vector/medication-pills-supplements-concept_23-2148993296.jpg", title: "Supplement Spotlight" },
    { id: 5, uri: "https://img.freepik.com/free-photo/woman-sleeping-comfortable-bed_1150-47230.jpg", title: "Sleep & Recovery" },
    { id: 6, uri: "https://img.freepik.com/free-vector/stressed-businessman-concept_23-2148475452.jpg", title: "Stress Management" },
    { id: 7, uri: "https://img.freepik.com/free-vector/meditation-concept-illustration_23-2148475460.jpg", title: "Mindfulness & Relaxation" },
    { id: 8, uri: "https://img.freepik.com/free-photo/glass-water-with-lemon_1203-8495.jpg", title: "Hydration Tips" },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      
      <BrandHeader
      title ="Vintage"
      subtitle ="Care Rooted in Experience. Centered on You."
      // subtitle ="Your Health, Our Priority"
        onMessagePress={() => navigation.navigate(MainTabRoutes.Consults)}
        chatCount={chatCount}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        <Greeting />

       
        <VideoCarousel data={banner}/>
        {/* <BannerCarousel
          data={banners}
          height={180}
          width={Dimensions.get("window").width - 20}
          tickerOverlay
          text="🎉 Daily Wellness Update: Eat more veggies today! | Exercise: 10 push-ups | Mindfulness: 5-min break | Drink 2 liters of water"
          speed={60}
        /> */}
        <BookMeetingScreen />
        <CategoryGrid
          onPressItem={(item) =>
            navigation.navigate(AuthStackRoutes.CategoryDetail, { item })
          }
        />
        <MoodTracker />
        <WellnessShowcase />

      
        {/* {!hasSubscription && <SubscriptionScreen />}
         */}
        {!hasSubscription && <CommonSubscription/>}

        {/* <View style={{ height: 0 }} /> */}
        {/* <View style={{ height: 100 }} /> */}
      <Footer />
      <PatientTestimonial/>
      </ScrollView>

      
      <TouchableOpacity
        style={styles.floatingButtonCom}
        activeOpacity={0.9}
        onPress={() => navigation.navigate(AuthStackRoutes.Journal)}
      >
        <Icon name="book" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  ); 
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom:0,
    // paddingBottom: 20,
  },
  floatingButtonCom: {
    position: "absolute",
    right: 20,
    bottom: 40,
    backgroundColor: Colors.darkBlueP1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    height: 50,
    width: 50,
  },
});

export default HomeScreen;
