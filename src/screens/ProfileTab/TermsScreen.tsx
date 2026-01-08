
import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Linking } from 'react-native';
import Colors from '../../constants/Colors';

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
       <View style={styles.linkCard}>
  <Text style={styles.linkTitle}>Legal Information</Text>

  <Text
    style={styles.linkItem}
    onPress={() => Linking.openURL('https://multivisionwizards.com/privacy')}
  >
    🔒 Privacy Policy
  </Text>

  <View style={styles.divider} />

  <Text
    style={styles.linkItem}
    onPress={() => Linking.openURL('https://multivisionwizards.com/terms')}
  >
    📄 Terms & Conditions
  </Text>
</View>


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
  linkCard: {
  backgroundColor: '#F8FAFC',
  borderRadius: 12,
  padding: 16,
  marginTop: 10,
  marginBottom: 20,
  borderWidth: 1,
  borderColor: '#E5E7EB',
},

linkTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#1F2937',
  marginBottom: 12,
},

linkItem: {
  fontSize: 15,
  fontWeight: '600',
  color: Colors.darkBlueP1,
  paddingVertical: 10,
},

divider: {
  height: 1,
  backgroundColor: '#E5E7EB',
},

});

export default TermsScreen;