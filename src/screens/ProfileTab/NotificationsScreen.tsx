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

// import Icon from 'react-native-vector-icons/MaterialIcons';
// import styles from './StyleSheet'


// // screens/NotificationsScreen.tsx
// const NotificationsScreen: React.FC = () => {
//   const [pushEnabled, setPushEnabled] = useState(true);
//   const [emailEnabled, setEmailEnabled] = useState(false);
  
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.settingItem}>
//         <Text style={styles.settingText}>Push Notifications</Text>
//         <TouchableOpacity 
//           style={[styles.toggle, pushEnabled && styles.toggleActive]}
//           onPress={() => setPushEnabled(!pushEnabled)}
//         >
//           <View style={[styles.toggleThumb, pushEnabled && styles.toggleThumbActive]} />
//         </TouchableOpacity>
//       </View>
      
//       <View style={styles.settingItem}>
//         <Text style={styles.settingText}>Email Notifications</Text>
//         <TouchableOpacity 
//           style={[styles.toggle, emailEnabled && styles.toggleActive]}
//           onPress={() => setEmailEnabled(!emailEnabled)}
//         >
//           <View style={[styles.toggleThumb, emailEnabled && styles.toggleThumbActive]} />
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };
// export default NotificationsScreen;


import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Appointment Confirmed',
      body: 'Your appointment with Dr. Smith is confirmed for 10 Sep, 3:00 PM.',
      time: '2h ago',
      type: 'success',
    },
    {
      id: '2',
      title: 'New Message',
      body: 'You have a new message from Dr. Patel.',
      time: '3h ago',
      type: 'message',
    },
    {
      id: '3',
      title: 'Appointment Reminder',
      body: 'Reminder: Your appointment with Dr. Khan is tomorrow at 11:00 AM.',
      time: '1d ago',
      type: 'reminder',
    },
    {
      id: '4',
      title: 'Discount Offer',
      body: 'Get 20% off on your next health checkup. Limited time offer!',
      time: '2d ago',
      type: 'offer',
    },
  ]);

  const renderIcon = (type) => {
    switch (type) {
      case 'success':
        return <Icon name="check-circle" size={28} color="#28a745" />;
      case 'message':
        return <Icon name="message-text" size={28} color="#007bff" />;
      case 'reminder':
        return <Icon name="bell-ring" size={28} color="#ffc107" />;
      case 'offer':
        return <Icon name="tag" size={28} color="#ff5722" />;
      default:
        return <Icon name="bell" size={28} color="#333" />;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={styles.iconContainer}>{renderIcon(item.type)}</View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <Text style={styles.noNotif}>No notifications yet</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  textContainer: { flex: 1, paddingLeft: 12 },
  title: { fontWeight: 'bold', fontSize: 16, color: '#333', marginBottom: 2 },
  body: { fontSize: 14, color: '#555', marginBottom: 4 },
  time: { fontSize: 12, color: '#888' },
  noNotif: { textAlign: 'center', marginTop: 50, color: 'gray', fontSize: 16 },
});

export default NotificationsScreen;
