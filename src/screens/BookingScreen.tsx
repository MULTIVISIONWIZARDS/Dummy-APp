import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your appointments will appear here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  text: { fontSize: 18 },
});

export default BookingScreen;
