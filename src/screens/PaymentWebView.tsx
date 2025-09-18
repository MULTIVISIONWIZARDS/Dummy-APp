// import React from 'react';
// import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, StatusBar } from 'react-native';
// import { WebView } from 'react-native-webview';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import Colors from '../constants/Colors';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export default function PaymentWebView() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { paymentUrl, planId, planName } = route.params;

//   const handleBack = () => navigation.goBack();

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor={Colors.darkBlueP1} barStyle="light-content" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleBack}>
//           <Text style={styles.backText}>← Back</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>{planName} Plan</Text>
//         <View style={{ width: 50 }} /> {/* Placeholder for alignment */}
//       </View>

//       {/* WebView */}
//       <WebView
//         source={{ uri: paymentUrl }}
//         startInLoadingState={true}
//         renderLoading={() => (
//           <View style={styles.loading}>
//             <ActivityIndicator size="large" color={Colors.darkBlueP1} />
//             <Text style={{ marginTop: 10, color: '#374151' }}>Loading payment...</Text>
//           </View>
//         )}
//         onNavigationStateChange={async (navState) => {
//           // Detect your custom success URL
//           if (navState.url.includes('success')) {
//             await AsyncStorage.setItem('subscriptionTier', planId); // Save subscription
//             navigation.replace('PaymentSuccessScreen'); // Show custom thank-you screen
//           }
//         }}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F3F4F6' },
//   header: {
//     height: 60,
//     backgroundColor: Colors.darkBlueP1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     borderBottomLeftRadius: 12,
//     borderBottomRightRadius: 12,
//   },
//   backText: { color: '#fff', fontSize: 18, fontWeight: '600' },
//   headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
//   loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// });

import React, { useRef } from 'react';
import {  StyleSheet, ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentWebView() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { paymentUrl, planId,planName,userId } = route.params; // pass plan info

  const hasRedirectedRef = useRef(false);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: paymentUrl }}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={Colors.darkBlueP1} />
          </View>
        )}
        onNavigationStateChange={async (navState) => {
            console.log(":::::::::::::::::::",navState);
            
          // Detect your custom success URL
         if (navState.url.includes('/success') && !hasRedirectedRef.current) {
  hasRedirectedRef.current = true;

  // Dummy subscription details
  const subscriptionData = {
    planId: planId,              // e.g., 'gold'
    planName: planName,
    startDate: new Date().toISOString(),
    expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(), // 1-month dummy
  };

  await AsyncStorage.setItem('subscriptionDetails', JSON.stringify(subscriptionData));
await AsyncStorage.setItem(`subscription_${userId}`, 'true');
  // Navigate to main screen
 // navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  navigation.reset({ index: 0, routes: [{ name: 'PaymentSuccess' }] });
}

        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
