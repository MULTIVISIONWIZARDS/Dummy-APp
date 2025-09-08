
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   FlatList,
//   Alert,
//   Platform,
//   Modal,
//   Image,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import Geolocation from 'react-native-geolocation-service';
// import Geocoder from 'react-native-geocoder-reborn';
// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import Colors from '../../constants/Colors';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

// const dummyAddresses = [
//   {
//     id: '1',
//     name: 'Rahul Sharma',
//     type: 'Home',
//     address: '22, MG Road, Bengaluru, Karnataka',
//   },
//   {
//     id: '2',
//     name: 'Anita Singh',
//     type: 'Work',
//     address: '12, Park Street, Kolkata, West Bengal',
//   },
//   {
//     id: '3',
//     name: 'Vikram Patel',
//     type: 'Home',
//     address: '45, Marine Drive, Mumbai, Maharashtra',
//   },
//   {
//     id: '4',
//     name: 'Sneha Reddy',
//     type: 'Work',
//     address: '78, Connaught Place, Delhi',
//   },
//   {
//     id: '5',
//     name: 'Arjun Kumar',
//     type: 'Home',
//     address: '56, Brigade Road, Bengaluru, Karnataka',
//   },
// ];

// const LocationHeader = ({loading=false}) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState({
//     ...dummyAddresses[0],
//     mode: 'saved', // saved | pincode | current
//   });
//   const [pincode, setPincode] = useState('');
//   const [showAllAddresses, setShowAllAddresses] = useState(false);

//   // Request location permission safely
//   const requestLocationPermission = async () => {
//     try {
//       const permission =
//         Platform.OS === 'android'
//           ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
//           : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

//       const result = await request(permission);
//       return result === RESULTS.GRANTED;
//     } catch (err) {
//       console.error('Permission error:', err);
//       return false;
//     }
//   };

//   // Handle "Use my current location"
//   const handleUseCurrentLocation = async () => {
//     const hasPermission = await requestLocationPermission();
//     if (!hasPermission) {
//       Alert.alert('Permission Denied', 'Location permission is required.');
//       return;
//     }

//     Geolocation.getCurrentPosition(
//       async position => {
//         try {
//           const { latitude, longitude } = position.coords;
//           const res = await Geocoder.geocodePosition({
//             lat: latitude,
//             lng: longitude,
//           });
//           const address =
//             res.length > 0 ? res[0].formattedAddress : 'Unknown Address';
//           setSelectedAddress({
//             id: Date.now().toString(),
//             name: 'My Location',
//             type: 'Current',
//             address,
//             mode: 'current',
//           });

//           setModalVisible(false);
//         } catch (err) {
//           console.error('Geocoder error', err);
//           Alert.alert('Error', 'Could not fetch address');
//         }
//       },
//       error => {
//         console.error('Location error', error);
//         Alert.alert('Error', 'Could not fetch location');
//       },
//       {
//         enableHighAccuracy: false, // safer for emulator
//         timeout: 20000,
//         maximumAge: 10000,
//       },
//     );
//   };

//   // Handle Pincode
//   const handleCheckPincode = () => {
//     if (pincode.length === 6) {
//       setSelectedAddress({
//         id: Date.now().toString(),
//         name: 'Guest',
//         type: 'Pincode',
//         address: pincode,
//         mode: 'pincode',
//       });
//       setModalVisible(false);
//       setPincode('');
//     } else {
//       Alert.alert('Invalid', 'Please enter a valid 6-digit pincode');
//     }
//   };

//   const displayedAddresses = showAllAddresses
//     ? dummyAddresses
//     : dummyAddresses.slice(0, 2);
//   if (loading) {
//     return (
//       <SkeletonPlaceholder
//         backgroundColor="#E1E9EE"
//         highlightColor="#F2F8FC"
//       >
//         <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, marginBottom: 15 }}>
//           <View style={{ width: 18, height: 18, borderRadius: 9 }} />
//           <View style={{ flex: 1, height: 16, borderRadius: 4, marginLeft: 6 }} />
//         </View>
//       </SkeletonPlaceholder>
//     );
//   }
//   return (
//     <>
//     <Text style={{paddingHorizontal:15,fontSize:14,fontWeight:"500",color:Colors.light_gray}}>
//         Location
//         </Text>
//       {/* Header */}
//       <TouchableOpacity
//         style={styles.header}
//         onPress={() => setModalVisible(true)}
//         activeOpacity={0.6}
//       >
//         <Icon
//           name={
//             selectedAddress.mode === 'saved' &&
//             selectedAddress.type.toLowerCase() === 'home'
//               ? 'home'
//               : 'map-pin'
//           }
//           size={18}
//           color={Colors.text_black}
         
//         />
//         <Text style={styles.address} numberOfLines={1}>
//           {selectedAddress.mode === 'pincode'
//             ? `${selectedAddress.address} • Select delivery location`
//             : `${selectedAddress.type} • ${selectedAddress.address}`}
//         </Text>
//         <Icon name="chevron-right" size={18} color={Colors.text_black} />
//       </TouchableOpacity>

//       {/* Modal */}
//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             {/* Header Row */}
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Select Delivery Address</Text>
//               <TouchableOpacity onPress={() => setModalVisible(false)}>
//                 <Icon name="x" size={22} color={Colors.text_black} />
//               </TouchableOpacity>
//             </View>

//             {/* Saved Addresses */}
//             <FlatList
//               data={displayedAddresses}
//               keyExtractor={item => item.id}
//               showsVerticalScrollIndicator={false}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.addressItem}
//                   onPress={() => {
//                     setSelectedAddress({ ...item, mode: 'saved' });
//                     setModalVisible(false);
//                   }}
//                 >
//                   <View style={styles.iconContainer}>
//                     <Icon name="map-pin" size={16} color={Colors.text_black} />
//                   </View>
//                   <View style={{ marginLeft: 8 }}>
//                     <Text style={styles.addressText}>{item.name}</Text>
//                     <Text style={styles.addressSubText}>
//                       {item.address} •{' '}
//                       <Text style={{ color: Colors.darkBlueP1 }}>
//                         {item.type}
//                       </Text>
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               )}
//               ListFooterComponent={
//                 <TouchableOpacity
//                   style={styles.seeMoreContainer}
//                   onPress={() => setShowAllAddresses(prev => !prev)}
//                 >
//                   <Text style={styles.seeMore}>
//                     {showAllAddresses ? 'Show less' : 'See more'}
//                   </Text>
//                   <Icon
//                     name={showAllAddresses ? 'chevron-up' : 'chevron-down'}
//                     size={16}
//                     color={Colors.darkBlueP1}
//                   />
//                 </TouchableOpacity>
//               }
//             />

//             {/* Pincode Input */}
//             <Text style={styles.modalTitle1}>
//               Use pincode to check delivery info
//             </Text>
//             <View style={styles.pincodeContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter Pincode"
//                 keyboardType="numeric"
//                 value={pincode}
//                 onChangeText={setPincode}
//                 maxLength={6}
//               />
//               <TouchableOpacity
//                 style={[
//                   styles.checkBtn,
//                   pincode.length !== 6 && {
//                     opacity: 0.7,
//                     backgroundColor: Colors.disabledBtn,
//                   },
//                 ]}
//                 onPress={handleCheckPincode}
//                 disabled={pincode.length !== 6}
//               >
//                 <Text style={styles.checkBtnText}>Submit</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Use Current Location */}
//             <TouchableOpacity
//               style={styles.locationBtn}
//               onPress={handleUseCurrentLocation}
//             >
//               <Image
//                 source={{uri:"https://cdn-icons-png.freepik.com/256/12004/12004644.png?uid=R210148761&ga=GA1.1.641802148.1754460082&semt=ais_white_label"}}
//                 style={{ height: 25, width: 25 }}
//               />
//               <Text style={styles.locationBtnText}>
//                 Use my current location
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };

// export default LocationHeader;

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 8,marginBottom:15
//   },
//   address: {
//     flex: 1,
//     marginHorizontal: 6,
//     fontSize: 14,
//     fontWeight: '500',
//     color: Colors.text_black,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: Colors.white,
//     padding: 16,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     maxHeight: '80%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   modalTitle: { fontSize: 16, fontWeight: '600' },
//   modalTitle1: { fontSize: 14, fontWeight: '600', marginTop: 12 },
//   addressItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   iconContainer: { width: 24, alignItems: 'center' },
//   addressText: { fontSize: 14, fontWeight: '500', color: Colors.text_black },
//   addressSubText: { fontSize: 12, color: Colors.text_grey, marginTop: 2 },
//   seeMoreContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     marginVertical: 8,
//   },
//   seeMore: {
//     color: Colors.darkBlueP1,
//     fontSize: 14,
//     marginRight: 4,
//     fontWeight: '500',
//   },
//   pincodeContainer: {
//     flexDirection: 'row',
//     marginTop: 12,
//     alignItems: 'center',
//   },
//   input: {
//     flex: 1,
//     borderWidth: 0,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.light_gray,
//     paddingVertical: 6,
//     fontSize: 14,
//   },
//   checkBtn: {
//     marginLeft: 8,
//     backgroundColor: Colors.darkBlueP1,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//   },
//   checkBtnText: { color: Colors.white, fontWeight: '500', letterSpacing: 0.5 },
//   locationBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderRadius: 8,
//     justifyContent: 'flex-start',
//     marginTop: 16,
//   },
//   locationBtnText: {
//     color: Colors.darkBlueP1,
//     fontWeight: '700',
//     letterSpacing: 0.8,
//     marginLeft: 8,
//   },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Alert,
  Platform,
  Modal,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder-reborn';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Colors from '../../constants/Colors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const dummyAddresses = [
  {
    id: '1',
    name: 'Rahul Sharma',
    type: 'Home',
    address: '22, MG Road, Bengaluru, Karnataka',
  },
  {
    id: '2',
    name: 'Anita Singh',
    type: 'Work',
    address: '12, Park Street, Kolkata, West Bengal',
  },
  {
    id: '3',
    name: 'Vikram Patel',
    type: 'Home',
    address: '45, Marine Drive, Mumbai, Maharashtra',
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    type: 'Work',
    address: '78, Connaught Place, Delhi',
  },
  {
    id: '5',
    name: 'Arjun Kumar',
    type: 'Home',
    address: '56, Brigade Road, Bengaluru, Karnataka',
  },
];

const LocationHeader = ({ loading = false }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({
    ...dummyAddresses[0],
    mode: 'saved', // saved | pincode | current
  });
  const [pincode, setPincode] = useState('');
  const [showAllAddresses, setShowAllAddresses] = useState(false);

  // Request location permission safely
  const requestLocationPermission = async () => {
    try {
      const permission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

      const result = await request(permission);
      return result === RESULTS.GRANTED;
    } catch (err) {
      console.error('Permission error:', err);
      return false;
    }
  };

  // Handle "Use my current location"
  const handleUseCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required.');
      return;
    }

    Geolocation.getCurrentPosition(
      async position => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await Geocoder.geocodePosition({
            lat: latitude,
            lng: longitude,
          });
          const address =
            res.length > 0 ? res[0].formattedAddress : 'Unknown Address';
          setSelectedAddress({
            id: Date.now().toString(),
            name: 'My Location',
            type: 'Current',
            address,
            mode: 'current',
          });

          setModalVisible(false);
        } catch (err) {
          console.error('Geocoder error', err);
          Alert.alert('Error', 'Could not fetch address');
        }
      },
      error => {
        console.error('Location error', error);
        Alert.alert('Error', 'Could not fetch location');
      },
      {
        enableHighAccuracy: false, // safer for emulator
        timeout: 20000,
        maximumAge: 10000,
      },
    );
  };

  // Handle Pincode
  const handleCheckPincode = () => {
    if (pincode.length === 6) {
      setSelectedAddress({
        id: Date.now().toString(),
        name: 'Guest',
        type: 'Pincode',
        address: pincode,
        mode: 'pincode',
      });
      setModalVisible(false);
      setPincode('');
    } else {
      Alert.alert('Invalid', 'Please enter a valid 6-digit pincode');
    }
  };

  const displayedAddresses = showAllAddresses
    ? dummyAddresses
    : dummyAddresses.slice(0, 2);

  if (loading) {
    return (
      <SkeletonPlaceholder backgroundColor="#E1E9EE" highlightColor="#F2F8FC">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 8,
            marginBottom: 15,
          }}
        >
          <View style={{ width: 18, height: 18, borderRadius: 9 }} />
          <View
            style={{
              flex: 1,
              height: 16,
              borderRadius: 4,
              marginLeft: 6,
            }}
          />
        </View>
      </SkeletonPlaceholder>
    );
  }

  return (
    <>
      <Text
        style={{
          paddingHorizontal: 15,
          fontSize: 14,
          fontWeight: '500',
          color: Colors.light_gray,
        }}
      >
        Location
      </Text>

      {/* Header Row */}
      <View style={styles.headerRow}>
        {/* Location Selector */}
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.6}
        >
          <Icon
            name={
              selectedAddress.mode === 'saved' &&
              selectedAddress.type.toLowerCase() === 'home'
                ? 'home'
                : 'map-pin'
            }
            size={18}
            color={Colors.text_black}
          />
          <Text style={styles.address} numberOfLines={1}>
            {selectedAddress.mode === 'pincode'
              ? `${selectedAddress.address} • Select delivery location`
              : `${selectedAddress.type} • ${selectedAddress.address}`}
          </Text>
          <Icon name="chevron-right" size={18} color={Colors.text_black} />
        </TouchableOpacity>

        {/* Notification Icon */}
        <TouchableOpacity
          style={styles.notificationBtn}
          onPress={() => Alert.alert('Notifications', 'Open notifications here')}
          activeOpacity={0.7}
        >
          <Icon name="bell" size={22} color={'#4B5563'} />
          {/* 🔔 Optional Badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}></Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header Row */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Delivery Address</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="x" size={22} color={Colors.text_black} />
              </TouchableOpacity>
            </View>

            {/* Saved Addresses */}
            <FlatList
              data={displayedAddresses}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.addressItem}
                  onPress={() => {
                    setSelectedAddress({ ...item, mode: 'saved' });
                    setModalVisible(false);
                  }}
                >
                  <View style={styles.iconContainer}>
                    <Icon name="map-pin" size={16} color={Colors.text_black} />
                  </View>
                  <View style={{ marginLeft: 8 }}>
                    <Text style={styles.addressText}>{item.name}</Text>
                    <Text style={styles.addressSubText}>
                      {item.address} •{' '}
                      <Text style={{ color: Colors.darkBlueP1 }}>
                        {item.type}
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.seeMoreContainer}
                  onPress={() => setShowAllAddresses(prev => !prev)}
                >
                  <Text style={styles.seeMore}>
                    {showAllAddresses ? 'Show less' : 'See more'}
                  </Text>
                  <Icon
                    name={showAllAddresses ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color={Colors.darkBlueP1}
                  />
                </TouchableOpacity>
              }
            />

            {/* Pincode Input */}
            <Text style={styles.modalTitle1}>
              Use pincode to check delivery info
            </Text>
            <View style={styles.pincodeContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Pincode"
                keyboardType="numeric"
                value={pincode}
                onChangeText={setPincode}
                maxLength={6}
              />
              <TouchableOpacity
                style={[
                  styles.checkBtn,
                  pincode.length !== 6 && {
                    opacity: 0.7,
                    backgroundColor: Colors.disabledBtn,
                  },
                ]}
                onPress={handleCheckPincode}
                disabled={pincode.length !== 6}
              >
                <Text style={styles.checkBtnText}>Submit</Text>
              </TouchableOpacity>
            </View>

            {/* Use Current Location */}
            <TouchableOpacity
              style={styles.locationBtn}
              onPress={handleUseCurrentLocation}
            >
              <Image
                source={{
                  uri: 'https://cdn-icons-png.freepik.com/256/12004/12004644.png',
                }}
                style={{ height: 25, width: 25 }}
              />
              <Text style={styles.locationBtnText}>
                Use my current location
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LocationHeader;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // space between location & notification
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  address: {
    flex: 1,
    marginHorizontal: 6,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text_black,
  },
  notificationBtn: {
    marginLeft: 12,
    padding: 6,backgroundColor:'#F3F4F6',borderRadius:20
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 8,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 7,
    height: 7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: { fontSize: 16, fontWeight: '600' },
  modalTitle1: { fontSize: 14, fontWeight: '600', marginTop: 12 },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconContainer: { width: 24, alignItems: 'center' },
  addressText: { fontSize: 14, fontWeight: '500', color: Colors.text_black },
  addressSubText: { fontSize: 12, color: Colors.text_grey, marginTop: 2 },
  seeMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 8,
  },
  seeMore: {
    color: Colors.darkBlueP1,
    fontSize: 14,
    marginRight: 4,
    fontWeight: '500',
  },
  pincodeContainer: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_gray,
    paddingVertical: 6,
    fontSize: 14,
  },
  checkBtn: {
    marginLeft: 8,
    backgroundColor: Colors.darkBlueP1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  checkBtnText: { color: Colors.white, fontWeight: '500', letterSpacing: 0.5 },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'flex-start',
    marginTop: 16,
  },
  locationBtnText: {
    color: Colors.darkBlueP1,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginLeft: 8,
  },
});
