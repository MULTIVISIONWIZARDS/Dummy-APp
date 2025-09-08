// import React from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import Footer from '../components/Footer';
// import LocationHeader from '../components/locationHeader/locationHeader';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const HomeScreen: React.FC<any> = ({ navigation }) => {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//        <LocationHeader/>
//       <View style={styles.content}>
//         <Text style={styles.title}>Welcome to AppointmentApp</Text>
//         <Text style={styles.subtitle}>Book appointments, start video consultations, and manage subscriptions.</Text>

//         <View style={{ marginTop: 20 }}>
//           <Button title="View Plans" onPress={() => navigation.navigate('Subscription')} />
//         </View>
//       </View>

//       <Footer />
//    </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   content: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
//   title: { fontSize: 24, fontWeight: '700' },
//   subtitle: { marginTop: 8, fontSize: 16, textAlign: 'center', color: '#444' },
// });

// export default HomeScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import LocationHeader from '../components/locationHeader/locationHeader';
import SearchBar from '../components/searchBar/SearchBar';
import Colors from '../constants/Colors';

const HomeScreen: React.FC<any> = ({ navigation }) => {
    const [query, setQuery] = useState('');
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
       <StatusBar
          animated={true}
          backgroundColor="#33afd1ff"
          barStyle={'dark-content'}
        
        />
      {/* Top Header */}
      <LocationHeader />
       <SearchBar
        placeholder="Search doctors, clinics..."
        value={query}
        onChangeText={setQuery}
        backgroundColor='#F5F5F5'
        iconColor={Colors.light_gray}
        placeholderTextColor={Colors.light_gray}

      />
      {/* Main Content */}
      <View style={styles.content}>
        

      </View>

      {/* Footer */}
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // use app background, not red
 
  },
  content: {
    flex: 1,
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
