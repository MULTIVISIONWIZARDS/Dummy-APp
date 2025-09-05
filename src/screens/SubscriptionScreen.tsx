import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SubscriptionScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plans</Text>
      <Text>Basic | Standard | Premium (dummy cards — integrate Stripe/Razorpay)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 12 },
});

export default SubscriptionScreen;
