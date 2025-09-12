import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer: React.FC<{ brand?: string }> = ({ brand = "Vintage" }) => (
  <View style={styles.footer}>
    <Text style={styles.text}>  © {new Date().getFullYear()} {brand}. All rights reserved.</Text>
    
  </View>
);

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#f4f6f8',
    padding: 10,
    alignItems: 'center',
  },
  text: { fontSize: 12, color: '#666' },
});

export default Footer;
