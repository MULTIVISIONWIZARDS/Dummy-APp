// // import React from 'react';
// // import { View, Text, StyleSheet, Button } from 'react-native';
// // import Footer from '../components/Footer';
// // import LocationHeader from '../components/locationHeader/locationHeader';
// // import { SafeAreaView } from 'react-native-safe-area-context';

// // const HomeScreen: React.FC<any> = ({ navigation }) => {
// //   return (
// //     <SafeAreaView style={{ flex: 1 }}>
// //       <View style={styles.content}>
// //         <Text style={styles.title}>Welcome to AppointmentApp</Text>
// //         <Text style={styles.subtitle}>Book appointments, start video consultations, and manage subscriptions.</Text>

// //         <View style={{ marginTop: 20 }}>
// //           <Button title="View Plans" onPress={() => navigation.navigate('Subscription')} />
// //         </View>
// //       </View>

// //       <Footer />
// //    </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   content: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
// //   title: { fontSize: 24, fontWeight: '700' },
// //   subtitle: { marginTop: 8, fontSize: 16, textAlign: 'center', color: '#444' },
// // });

// // export default HomeScreen;

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Button, StatusBar, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Footer from '../components/Footer';
// import LocationHeader from '../components/locationHeader/locationHeader';
// import SearchBar from '../components/searchBar/SearchBar';
// import Colors from '../constants/Colors';
// import BannerCarousel from '../components/Banner/BannerCarousel';
// import BrandHeader from '../components/BrandHeader/BrandHeader';
// import CategoryGrid from '../components/CategoryGrid/CategoryGrid';
// import Toast from 'react-native-toast-message';

// const HomeScreen: React.FC<any> = ({ navigation }) => {
//     const [query, setQuery] = useState('');
    
//   const banners = [
//   {
//     id: 1,
//     uri: "https://img.freepik.com/free-photo/portrait-smiling-medical-worker-girl-doctor-white-coat-with-stethoscope-pointing-fingers-left_1258-124585.jpg?t=st=1757314756~exp=1757318356~hmac=4c8364907281142f10bf00e264346fe9225b8da197cf5223c07bf7a16ee063a5&w=1480",
//     title: "Book Doctor Appointments",
//   },
//   {
//     id: 2,
//     uri: "https://img.freepik.com/free-vector/flat-design-medical-twitter-header_23-2149166238.jpg?t=st=1757314803~exp=1757318403~hmac=1482bc5917c7c0f0674a5934e99a9eae3dae2ed20231887fc0173ab7f796df91&w=1480",
//     title: "Online Consultation",
//   },
//   {
//     id: 3,
//     uri: "https://img.freepik.com/free-vector/gradient-medical-twitter-header_23-2149087651.jpg?t=st=1757314803~exp=1757318403~hmac=5a266d91ae68655455c3dfb09739be42c90815fac4bfaa9f714de6c6a3902689",
//     title: "Health Check-Ups",
//   },
 
// ];


//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
//        <StatusBar
//           animated={true}
//          // backgroundColor="#33afd1ff"
//           barStyle={'light-content'}
        
//         />
//          <BrandHeader/>
   
//       <LocationHeader />
//        <SearchBar
//         placeholder="Search doctors, clinics..."
//         value={query}
//         onChangeText={setQuery}
//         backgroundColor='#F5F5F5'
//         iconColor={Colors.light_gray}
//         placeholderTextColor={Colors.light_gray}
//       />
 
//       <BannerCarousel  data={banners} height={180} width={340} tickerOverlay   text="🎉 20% OFF on your first{red} doctor appointment!{/red} | 💊 Free health checkup for premium users | 🏥 Book now and get flat ₹100 discount!"
//         speed={60}/> 
//          <CategoryGrid onPressItem={item => console.log("pressed", item)} />
//       <View style={styles.content}>

//       </View>

//       {/* Footer */}
//       <Footer />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff', // use app background, not red
 
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   title: { fontSize: 24, fontWeight: '700' },
//   subtitle: {
//     marginTop: 8,
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#444',
//   },
// });

// export default HomeScreen;



import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import LocationHeader from '../components/locationHeader/locationHeader';
import SearchBar from '../components/searchBar/SearchBar';
import Colors from '../constants/Colors';
import BannerCarousel from '../components/Banner/BannerCarousel';
import BrandHeader from '../components/BrandHeader/BrandHeader';
import CategoryGrid from '../components/CategoryGrid/CategoryGrid';
import Toast from 'react-native-toast-message';
import WellnessShowcase from '../components/WellnessShowcase';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen: React.FC<any> = ({ navigation }) => {
  const [query, setQuery] = useState('');
 const banners = [
  {
    id: 1,
    uri: "https://img.freepik.com/free-photo/healthy-food-fruits-vegetables_53876-40332.jpg",
    title: "Daily Nutrition Tips",
  },
  {
    id: 2,
    uri: "https://img.freepik.com/free-photo/young-woman-exercising-gym_1303-12569.jpg",
    title: "Exercise & Fitness",
  },
  {
    id: 3,
    uri: "https://img.freepik.com/free-vector/dna-helix-science-background_23-2148993570.jpg",
    title: "Hormone Health Insights",
  },
  {
    id: 4,
    uri: "https://img.freepik.com/free-vector/medication-pills-supplements-concept_23-2148993296.jpg",
    title: "Supplement Spotlight",
  },
  {
    id: 5,
    uri: "https://img.freepik.com/free-photo/woman-sleeping-comfortable-bed_1150-47230.jpg",
    title: "Sleep & Recovery",
  },
  {
    id: 6,
    uri: "https://img.freepik.com/free-vector/stressed-businessman-concept_23-2148475452.jpg",
    title: "Stress Management",
  },
  {
    id: 7,
    uri: "https://img.freepik.com/free-vector/meditation-concept-illustration_23-2148475460.jpg",
    title: "Mindfulness & Relaxation",
  },
  {
    id: 8,
    uri: "https://img.freepik.com/free-photo/glass-water-with-lemon_1203-8495.jpg",
    title: "Hydration Tips",
  },
];


  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
   
      {/* <StatusBar animated={true} barStyle={'light-content'} /> */}
      
      <BrandHeader />

      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* <LocationHeader /> */}

        {/* <SearchBar
          placeholder="Search doctors, clinics..."
          value={query}
          onChangeText={setQuery}
          backgroundColor='#F5F5F5'
          iconColor={Colors.light_gray}
          placeholderTextColor={Colors.light_gray}
        /> */}

        <BannerCarousel
          data={banners}
          height={180}
          width={340}
          tickerOverlay
         text = "🎉 Daily Wellness Update: {green}Eat more veggies today!{/green} | 💪 Exercise: 10 push-ups | 🧘 Mindfulness: Take a 5-min break | 💧 Hydration: {green}Drink 2 liters of water {/green}"

          speed={60}
        />

        <CategoryGrid onPressItem={item => navigation.navigate("CategoryDetail", { item })} />

        {/* Optional extra content */}
       <WellnessShowcase/>
         {/* <View style={styles.content}>
          <TouchableOpacity onPress={()=>navigation.navigate('Subscription')}>
             <Text style={styles.title}>Welcome to AppointmentApp</Text>
          </TouchableOpacity>
        </View> */}

        {/* Add spacing before Footer */}
        <View style={{ height: 0 }} />
      </ScrollView>

      {/* Footer remains fixed at bottom */}
      <Footer />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
  },
});

export default HomeScreen;
