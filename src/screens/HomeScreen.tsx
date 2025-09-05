import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Footer from '../components/Footer';

const HomeScreen: React.FC<any> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to AppointmentApp</Text>
        <Text style={styles.subtitle}>Book appointments, start video consultations, and manage subscriptions.</Text>

        <View style={{ marginTop: 20 }}>
          <Button title="View Plans" onPress={() => navigation.navigate('Subscription')} />
        </View>
      </View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { marginTop: 8, fontSize: 16, textAlign: 'center', color: '#444' },
});

export default HomeScreen;
