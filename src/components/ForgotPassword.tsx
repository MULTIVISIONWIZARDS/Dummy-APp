
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_BASE } from '../constants/Constant';
import { AuthStackRoutes } from '../navigation/Routes';
import { useNavigation } from '@react-navigation/native';
import InlineMessage from './InlineMessage';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [inlineMessage, setInlineMessage] = useState({
    type: null, // 'error' | 'success'
    text: '',
  });

  const clearInlineMessage = () => {
    setInlineMessage({ type: null, text: '' });
  };

  /* Clear error when user edits */
  useEffect(() => {
    if (inlineMessage.type === 'error' && email) {
      clearInlineMessage();
    }
  }, [email]);

  const submit = async () => {
    clearInlineMessage();

    // Frontend validation
    if (!email) {
      setInlineMessage({
        type: 'error',
        text: 'Please enter your registered email address.',
      });
      return;
    }

    if (!email.includes('@')) {
      setInlineMessage({
        type: 'error',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setInlineMessage({
          type: 'error',
          text: data?.message || 'Email not found.',
        });
        return;
      }

      // Success
      setInlineMessage({
        type: 'success',
        text: 'OTP sent to your email. Please check your inbox.',
      });

      setTimeout(() => {
        // navigation.navigate(AuthStackRoutes.ResetPassword, { email });
        navigation.replace(AuthStackRoutes.ResetPassword, { email });

      }, 1000);
    } catch {
      setInlineMessage({
        type: 'error',
        text: 'Server error. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Icon */}
        <View style={styles.iconWrapper}>
          <Icon name="lock-reset" size={48} color="#1f2937" />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your registered email and we’ll send you a one-time password
          </Text>
        </View>

        {/* Inline Message */}
        <InlineMessage
          type={inlineMessage.type}
          text={inlineMessage.text}
          autoHide={inlineMessage.type === 'success'}
          hideAfter={2000}
          onHide={clearInlineMessage}
        />

        {/* Form Card */}
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Icon name="email-outline" size={20} color="#9ca3af" />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#9ca3af"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={submit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Send OTP</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Icon name="information-outline" size={18} color="#2563EB" />
          <Text style={styles.infoText}>
            Didn’t receive the email? Check your spam or junk folder.
          </Text>
        </View>

        {/* Back */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backLink}
        >
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;


const styles = StyleSheet.create({
    iconWrapper: {
  width: 80,
  height: 80,
  borderRadius: 20,
  backgroundColor: '#e5e7eb',
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 16,
},

infoBox: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#eff6ff',
  padding: 12,
  borderRadius: 12,
  marginTop: 20,
},

infoText: {
  marginLeft: 8,
  fontSize: 13,
  color: '#1e40af',
  flex: 1,
},

backLink: {
  marginTop: 24,
  alignItems: 'center',
},

backText: {
  fontSize: 14,
  color: '#3b82f6',
  fontWeight: '500',
},

  safe: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f9fafb',
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 6,
    textAlign: 'center',
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 14,
  },
  button: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
