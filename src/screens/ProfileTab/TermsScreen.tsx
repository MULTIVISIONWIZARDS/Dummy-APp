// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Image,
//   Alert,
// } from 'react-native';
// import styles from '../ProfileTab/StyleSheet'
// const TermsScreen: React.FC = () => {
//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Terms and Conditions</Text>
//       <Text style={styles.termsText}>
//         Last updated: September 2025{'\n\n'}
        
//         Welcome to our app. By using our service, you agree to these terms.{'\n\n'}
        
//         1. Acceptance of Terms{'\n'}
//         By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.{'\n\n'}
        
//         2. Privacy Policy{'\n'}
//         Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service.{'\n\n'}
        
//         3. User Accounts{'\n'}
//         You are responsible for maintaining the confidentiality of your account and password.{'\n\n'}
        
//         4. Prohibited Uses{'\n'}
//         You may not use our service for any illegal or unauthorized purpose.{'\n\n'}
        
//         5. Termination{'\n'}
//         We may terminate or suspend your account at our sole discretion.{'\n\n'}
        
//         6. Contact Information{'\n'}
//         Questions about the Terms should be sent to us at support@example.com
//       </Text>
//     </ScrollView>
//   );
// };

// export default TermsScreen
 


import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';

const TermsScreen = () => {
  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* <Text style={styles.title}>Terms & Conditions</Text> */}

        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to Vintage AppointmentApp. These Terms & Conditions govern your use of our mobile application. 
          By using our app, you agree to comply with and be bound by these terms.
        </Text>

        <Text style={styles.sectionTitle}>2. User Responsibilities</Text>
        <Text style={styles.paragraph}>
          • You must provide accurate information during registration.{"\n"}
          • You are responsible for maintaining the confidentiality of your account.{"\n"}
          • You agree not to misuse the app for any unlawful activities.
        </Text>

        <Text style={styles.sectionTitle}>3. Appointments</Text>
        <Text style={styles.paragraph}>
          AppointmentApp acts as a platform to book, manage, and track appointments. 
        </Text>

        <Text style={styles.sectionTitle}>4. Payments</Text>
        <Text style={styles.paragraph}>
          Some services may require payments. All transactions are processed securely through third-party providers. 
          AppointmentApp does not store sensitive payment information.
        </Text>

        <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          AppointmentApp is not liable for indirect, incidental, or consequential damages arising from your use of the app. 
          Use the service at your own risk.
        </Text>

        <Text style={styles.sectionTitle}>6. Privacy Policy</Text>
        <Text style={styles.paragraph}>
          Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your data.
        </Text>

        <Text style={styles.sectionTitle}>7. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We reserve the right to update or modify these Terms at any time. Changes will be communicated through the app. 
          Continued use of the app means you accept the updated Terms.
        </Text>

        <Text style={styles.sectionTitle}>8. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions regarding these Terms & Conditions, please contact us at:{"\n\n"}
          📧 vinwithjenn@yahoo.com{"\n"}
        
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  scroll: { 
    paddingHorizontal: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: '700', 
    textAlign: 'center', 
    marginTop: 20, 
    marginBottom: 8, 
    color: '#1C1C1E' 
  },
  lastUpdated: {
    fontSize: 13,
    textAlign: 'center',
    color: '#8E8E93',
    marginBottom: 20,
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginTop: 16, 
    marginBottom: 8, 
    color: '#2E3A59' 
  },
  paragraph: { 
    fontSize: 15, 
    lineHeight: 22, 
    color: '#333', 
    marginBottom: 12, 
    textAlign: 'justify' 
  },
});

export default TermsScreen;




// import React, { useState } from "react";
// import { View, Button, Alert, ScrollView, StyleSheet, Text } from "react-native";
// import firestore from "@react-native-firebase/firestore";

// export default function UploadCategoriesScreen() {
//   const [uploading, setUploading] = useState(false);
//   const DATA = [
//   {
//     id: '1',
//     title: 'Diet',
//     icon: 'food-apple',
//     color: '#34d399ff',
//         hasUpdate: true,

//     description: 'Balanced nutrition fuels your energy and overall health.',
//     detailedContent: `Diet: The Foundation of Health...`,
//     subcategories: [
//       {
//         id: "1-1",
//         title: "Balanced Diet",
//         image: "https://westernnews.media.clients.ellingtoncms.com/img/photos/2018/08/09/Balanced-Diet.jpg",
//         shortDescription: "Fuel your energy & overall health.",
//         detailedContent: [
//           "Include all food groups in proper proportion.",
//           "Focus on whole grains, lean protein, healthy fats.",
//           "Eat colorful vegetables & fruits daily.",
//           "Stay hydrated: 2-3 liters per day.",
//         ],
//       },
//       {
//         id: "1-2",
//         title: "Keto Diet",
//         image: "https://img.freepik.com/free-photo/keto-diet-food_1098-18623.jpg",
//         shortDescription: "Low carb, high fat for energy & weight control.",
//         detailedContent: [
//           "High fats, moderate proteins, very low carbs.",
//           "Good for insulin sensitivity & fat loss.",
//           "Avoid sugars & processed carbs.",
//           "Include healthy fats: avocado, nuts, olive oil.",
//         ],
//       },
//       {
//         id: "1-3",
//         title: "Vegetarian Diet",
//         image: "https://images.unsplash.com/photo-1543353071-873f17a7a088",
//         shortDescription: "Plant-based nutrition for immunity & energy.",
//         detailedContent: [
//           "Include legumes, tofu, lentils, and dairy.",
//           "Ensure sufficient protein & iron.",
//           "Eat diverse colorful vegetables.",
//           "Combine with nuts & seeds for healthy fats.",
//         ],
//       },
//       {
//         id: "1-4",
//         title: "Vegan Diet",
//         image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
//         shortDescription: "Strictly plant-based for optimal health.",
//         detailedContent: [
//           "Eliminate all animal products.",
//           "Ensure protein and vitamin B12 intake.",
//           "Focus on grains, legumes, nuts, seeds, vegetables.",
//           "Consider fortified foods or supplements.",
//         ],
//       },
//       {
//         id: "1-5",
//         title: "Mediterranean Diet",
//         image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
//         shortDescription: "Heart-healthy diet rich in fruits, vegetables, & olive oil.",
//         detailedContent: [
//           "Emphasizes olive oil, fish, nuts, fruits, vegetables.",
//           "Supports longevity and heart health.",
//           "Moderate intake of dairy and lean meats.",
//           "Balanced and sustainable lifestyle diet.",
//         ],
//       },
//     ],
//   },
//   {
//     id: '2',
//     title: 'Exercise',
//     icon: 'dumbbell',
//     color: '#3b82f6ff',
//     description: 'Regular movement improves strength, mood, and longevity.',
//     detailedContent: `Exercise: Movement as Medicine...`,
//     subcategories: [
//       {
//         id: "2-1",
//         title: "Cardio",
//         image: "https://images.unsplash.com/photo-1554284126-cc0d2d6d3f05",
//         shortDescription: "Running, cycling, swimming for heart health.",
//         detailedContent: [
//           "Improves cardiovascular endurance.",
//           "Burns calories and boosts metabolism.",
//           "Enhances lung capacity and stamina.",
//         ],
//       },
//       {
//         id: "2-2",
//         title: "Strength Training",
//         image: "https://images.unsplash.com/photo-1594737625785-8a73b3f61dff",
//         shortDescription: "Weight lifting and resistance exercises.",
//         detailedContent: [
//           "Builds muscle and bone strength.",
//           "Improves posture and functional fitness.",
//           "Boosts metabolism and fat loss.",
//         ],
//       },
//       {
//         id: "2-3",
//         title: "Flexibility & Mobility",
//         image: "https://images.unsplash.com/photo-1594737625678-7f3b9b3f5f0d",
//         shortDescription: "Yoga, stretching, and mobility exercises.",
//         detailedContent: [
//           "Maintains range of motion.",
//           "Reduces risk of injury.",
//           "Improves circulation and posture.",
//         ],
//       },
//       {
//         id: "2-4",
//         title: "HIIT",
//         image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
//         shortDescription: "High-Intensity Interval Training for fat burn & endurance.",
//         detailedContent: [
//           "Short bursts of intense activity.",
//           "Efficient calorie burn in less time.",
//           "Improves cardiovascular fitness.",
//         ],
//       },
//     ],
//   },
//   {
//     id: '3',
//     title: 'Hormones',
//     icon: 'dna',
//     color: '#a855f7ff',
//     description: 'Hormones regulate mood, energy, sleep, and metabolism.',
//     detailedContent: `Hormones: Your Body's Chemical Messengers...`,
//     subcategories: [
//       {
//         id: "3-1",
//         title: "Insulin",
//         image: "https://images.unsplash.com/photo-1588776814546-7f92d889e230",
//         shortDescription: "Regulates blood sugar & fat storage.",
//         detailedContent: [
//           "Maintains blood glucose levels.",
//           "Supports energy utilization.",
//           "Works with diet and exercise for metabolic health.",
//         ],
//       },
//       {
//         id: "3-2",
//         title: "Cortisol",
//         image: "https://images.unsplash.com/photo-1588776814520-8c74fabe11d1",
//         shortDescription: "Stress hormone affecting metabolism & immunity.",
//         detailedContent: [
//           "Elevated during stress.",
//           "Influences fat storage & energy use.",
//           "Needs balance for overall health.",
//         ],
//       },
//       {
//         id: "3-3",
//         title: "Thyroid Hormones",
//         image: "https://images.unsplash.com/photo-1593529467227-71a8872e87e8",
//         shortDescription: "Regulate metabolism and energy production.",
//         detailedContent: [
//           "Control basal metabolic rate.",
//           "Influence weight, energy, and temperature regulation.",
//           "Support growth and development.",
//         ],
//       },
//     ],
//   },
//   {
//     id: '4',
//     title: 'Supplements',
//     icon: 'pill',
//     color: '#f59e0bff',
//     description: 'Smart supplementation supports diet and lifestyle.',
//     detailedContent: `Supplements: Filling the Gaps Wisely...`,
//     subcategories: [
//       {
//         id: "4-1",
//         title: "Vitamin D3",
//         image: "https://images.unsplash.com/photo-1588776814550-1c1b0a5a6b44",
//         shortDescription: "Supports bone health, immune function, and mood.",
//         detailedContent: [
//           "Most people are deficient.",
//           "Take with healthy fats for absorption.",
//           "Helps maintain strong bones.",
//         ],
//       },
//       {
//         id: "4-2",
//         title: "Omega-3",
//         image: "https://images.unsplash.com/photo-1588776814522-5cda82707aef",
//         shortDescription: "Supports brain and heart health.",
//         detailedContent: [
//           "Anti-inflammatory benefits.",
//           "Supports heart and brain function.",
//           "Found in fatty fish, flax, chia seeds.",
//         ],
//       },
//       {
//         id: "4-3",
//         title: "Probiotics",
//         image: "https://images.unsplash.com/photo-1588776814518-7f4a0a9b8eae",
//         shortDescription: "Supports gut health and immunity.",
//         detailedContent: [
//           "Helps maintain healthy gut microbiome.",
//           "Supports digestion and immunity.",
//           "Found in yogurt, kefir, fermented foods.",
//         ],
//       },
//     ],
//   },
//   {
//     id: '5',
//     title: 'Sleep',
//     icon: 'bed',
//     color: '#0ea5e9ff',
//     description: 'Deep rest restores body and mind for peak performance.',
//     detailedContent: `Sleep: Your Daily Reset Button...`,
//     subcategories: [
//       {
//         id: "5-1",
//         title: "Deep Sleep",
//         image: "https://images.unsplash.com/photo-1588776814540-2d9a6a89e22c",
//         shortDescription: "Restorative sleep for body repair and immunity.",
//         detailedContent: [
//           "Stage 3 of sleep cycle.",
//           "Supports physical restoration.",
//           "Boosts immune function and memory.",
//         ],
//       },
//       {
//         id: "5-2",
//         title: "REM Sleep",
//         image: "https://images.unsplash.com/photo-1588776814543-1e5f7c5d3e8b",
//         shortDescription: "Dream stage for memory consolidation and brain detox.",
//         detailedContent: [
//           "Rapid eye movement stage.",
//           "Essential for learning and memory.",
//           "Promotes mental health and emotional processing.",
//         ],
//       },
//     ],
//   },
//   {
//     id: '6',
//     title: 'Stress',
//     icon: 'brain',
//     color: '#f43f5eff',
//     description: 'Chronic stress drains health—learn to reset and recharge.',
//     detailedContent: `Stress: Understanding and Managing Your Body's Alarm System...`,
//     subcategories: [
//       {
//         id: "6-1",
//         title: "Acute Stress",
//         image: "https://images.unsplash.com/photo-1588776814524-3d5e8c2f3f7a",
//         shortDescription: "Short-term stress response.",
//         detailedContent: [
//           "Immediate response to challenges.",
//           "Can improve focus and reaction time.",
//           "Usually temporary and manageable.",
//         ],
//       },
//       {
//         id: "6-2",
//         title: "Chronic Stress",
//         image: "https://images.unsplash.com/photo-1588776814525-4f3d9c4e5b6a",
//         shortDescription: "Long-term stress impacting health.",
//         detailedContent: [
//           "Leads to hormonal imbalance.",
//           "Affects sleep, metabolism, and immunity.",
//           "Needs active management strategies.",
//         ],
//       },
//     ],
//   },
//   {
//     id: '7',
//     title: 'Mindfulness',
//     icon: 'meditation',
//     color: '#14b8a6ff',
//     description: 'Stay present, reduce anxiety, and increase focus.',
//     detailedContent: `Mindfulness: The Art of Present Moment Awareness...`,
//     subcategories: [
//       {
//         id: "7-1",
//         title: "Breathing Meditation",
//         image: "https://images.unsplash.com/photo-1588776814526-6e5b9c7f8c6d",
//         shortDescription: "Focus on breath to calm the mind.",
//         detailedContent: [
//           "Conscious awareness of inhalation & exhalation.",
//           "Reduces stress and anxiety.",
//           "Can be done anytime, anywhere.",
//         ],
//       },
//       {
//         id: "7-2",
//         title: "Body Scan",
//         image: "https://images.unsplash.com/photo-1588776814527-7f6a8c8f9d7e",
//         shortDescription: "Notice sensations throughout the body.",
//         detailedContent: [
//           "Enhances body awareness.",
//           "Promotes relaxation and stress reduction.",
//           "Helps release tension areas.",
//         ],
//       },
//     ],
//   },
//   {
//     id: '8',
//     title: 'Hydration',
//     icon: 'cup-water',
//     color: '#60a5faff',
//     description: 'Water fuels your cells, organs, and brain function.',
//     detailedContent: `Hydration: The Foundation of Life...`,
//     subcategories: [
//       {
//         id: "8-1",
//         title: "Daily Water Intake",
//         image: "https://images.unsplash.com/photo-1588776814528-8f7b9c9e0a8f",
//         shortDescription: "Maintain optimal hydration throughout the day.",
//         detailedContent: [
//           "Drink 2-3 liters daily depending on activity.",
//           "Monitor urine color for hydration status.",
//           "Avoid excessive sugary drinks.",
//         ],
//       },
//       {
//         id: "8-2",
//         title: "Electrolyte Balance",
//         image: "https://images.unsplash.com/photo-1588776814529-9f8c9d0b1b9a",
//         shortDescription: "Maintain sodium, potassium & magnesium levels.",
//         detailedContent: [
//           "Important during exercise or heat.",
//           "Supports muscle function & hydration.",
//           "Include natural sources like fruits, veggies, and salts.",
//         ],
//       },
//     ],
//   },
// ];
//   // Cleanup duplicates before upload
//   const cleanupDuplicates = async () => {
//     try {
//       // Cleanup categories
//       const categoriesSnap = await firestore().collection("categories").get();
//       const seenCategories = new Set();
//       for (const doc of categoriesSnap.docs) {
//         const title = doc.data().title;
//         if (seenCategories.has(title)) {
//           await doc.ref.delete();
//           console.log("Deleted duplicate category:", title);
//         } else {
//           seenCategories.add(title);
//         }
//       }

//       // Cleanup subcategories
//       const subSnap = await firestore().collection("subcategories").get();
//       const seenSubcategories = new Set();
//       for (const doc of subSnap.docs) {
//         const data = doc.data();
//         const key = `${data.categoryId}-${data.title}`;
//         if (seenSubcategories.has(key)) {
//           await doc.ref.delete();
//           console.log("Deleted duplicate subcategory:", data.title);
//         } else {
//           seenSubcategories.add(key);
//         }
//       }

//       console.log("Cleanup complete!");
//     } catch (err) {
//       console.log("Error cleaning duplicates:", err);
//     }
//   };

//   const uploadCategories = async () => {
//     try {
//       setUploading(true);

//       // Step 1: Cleanup duplicates first
//       await cleanupDuplicates();

//       // Step 2: Upload categories & subcategories safely
//       for (const category of DATA) {
//         const existingCategory = await firestore()
//           .collection("categories")
//           .where("title", "==", category.title)
//           .get();

//         let categoryRef;
//         if (existingCategory.empty) {
//           categoryRef = await firestore().collection("categories").add({
//             title: category.title,
//             icon: category.icon,
//             color: category.color,
//             description: category.description,
//             detailedContent: category.detailedContent,
//             hasUpdate: category.hasUpdate ?? true,
//             createdAt: firestore.FieldValue.serverTimestamp(),
//             updatedAt: firestore.FieldValue.serverTimestamp(),
//           });
//           console.log("Category uploaded:", category.title);
//         } else {
//           categoryRef = existingCategory.docs[0].ref;
//           console.log("Category exists, using existing:", category.title);
//         }

//         // Upload subcategories
//         if (category.subcategories?.length) {
//           for (const sub of category.subcategories) {
//             const existingSub = await firestore()
//               .collection("subcategories")
//               .where("title", "==", sub.title)
//               .where("categoryId", "==", categoryRef.id)
//               .get();

//             if (existingSub.empty) {
//               await firestore().collection("subcategories").add({
//                 categoryId: categoryRef.id,
//                 title: sub.title,
//                 image: sub.image,
//                 shortDescription: sub.shortDescription,
//                 detailedContent: sub.detailedContent,
//                 createdAt: firestore.FieldValue.serverTimestamp(),
//                 updatedAt: firestore.FieldValue.serverTimestamp(),
//               });
//               console.log("Subcategory uploaded:", sub.title);
//             } else {
//               console.log("Subcategory exists, skipping:", sub.title);
//             }
//           }
//         }
//       }

//       Alert.alert("Success", "Categories & subcategories cleaned and uploaded!");
//     } catch (err) {
//       console.log("Error uploading data:", err);
//       Alert.alert("Error", err.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Upload Categories & Subcategories</Text>
//       <Button
//         title={uploading ? "Processing..." : "Clean & Upload"}
//         onPress={uploadCategories}
//         disabled={uploading}
//       />
//       <Text style={styles.note}>
//         ⚠️ Press this button only once. It will remove duplicates and upload fresh data.
//       </Text>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   note: {
//     marginTop: 15,
//     fontSize: 14,
//     color: "#555",
//     textAlign: "center",
//   },
// });
