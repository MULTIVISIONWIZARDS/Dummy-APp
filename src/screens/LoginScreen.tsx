import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { loginUser, signupUser } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { AuthStackRoutes } from '../navigation/Routes';
import Colors from '../constants/Colors';
const AuthScreen = ({ navigation }) => {
  const dispatch=useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [show, setShow] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  


const emailHintRef = useRef(null);


const scrollRef = useRef(null);
const onSubmit = async (data) => {
  setLoading(true);
  try {
    let result;

    if (isSignUp) {
      // SIGN UP LOGIC
      result = await dispatch(signupUser(data));

      if (signupUser.fulfilled.match(result)) {
        const user = result.payload;

        // Only allow if role is 'user'
        if (user.role && user.role.toLowerCase() !== 'user') {
          Toast.show({
            type: 'error',
            text1: 'Admin cannot login.',
            position: 'bottom',
          });
          setLoading(false);
          return;
        }

        const userId = user._id || user.id;

        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('token', user.token || '');

        // Toast.show({
        //   type: 'success',
        //   text1: 'Account created successfully!',
        //   position: 'bottom',
        // });

        navigation.replace(AuthStackRoutes.Main);
      } else {
        Toast.show({
          type: 'error',
          text1: result.payload || 'Signup failed',
          position: 'bottom',
        });
      }
    } else {
      // LOGIN LOGIC
      result = await dispatch(
        loginUser({ email: data.email, password: data.password })
      );

      if (loginUser.fulfilled.match(result)) {
        const user = result.payload;

        // Only allow if role is 'user'
        if (user.role && user.role.toLowerCase() !== 'user') {
          Toast.show({
            type: 'error',
            text1: 'Invalid credential',
            position: 'bottom',
          });
          setLoading(false);
          return;
        }

        const userId = user._id || user.id;

        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('token', user.token || '');

        // Toast.show({
        //   type: 'success',
        //   text1: 'Signed in successfully!',
        //   position: 'bottom',
        // });

        const subscribed = await AsyncStorage.getItem(`subscription_${userId}`);

        if (subscribed === 'true') {
          navigation.replace(AuthStackRoutes.Main);
        } else {
          navigation.replace(AuthStackRoutes.Main);
        }
      } else {
        Toast.show({
          type: 'error',
          text1: result.payload || 'Login failed',
          position: 'bottom',
        });
      }
    }
  } catch (error) {
    console.error('Auth Error:', error);
    Toast.show({
      type: 'error',
      text1: 'Something went wrong. Please try again.',
      position: 'bottom',
    });
  } finally {
    setLoading(false);
  }
};
const scrollToInput = (y = 0) => {
  setTimeout(() => {
    scrollRef.current?.scrollTo({
      y,
      animated: true,
    });
  }, 100);
};

const getPasswordStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: 'Weak', color: '#ef4444', level: 1 };
  if (score === 2 || score === 3)
    return { label: 'Medium', color: '#f59e0b', level: 2 };
  return { label: 'Strong', color: '#22c55e', level: 3 };
};

  return (
   <SafeAreaView style={styles.container}>
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
  >
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >


          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              {/* <Icon name="heart-pulse" size={32} color="#fff" />
               */}
               <Image source={require('../assets/applogo.jpg')} style={{height:115,width:115}}/>
            </View>
          </View>

          <Text style={styles.brandName}>Vintage</Text>
          {/* <Text style={styles.brandName}>HealthPal</Text> */}
          <Text style={styles.title}>{isSignUp ? 'Create Account' : 'Sign In'}</Text>
          {/* <Text style={styles.title}>{isSignUp ? 'Create Account' : 'Sign In'}</Text> */}
          <Text style={styles.subtitle}>
            {isSignUp ? 'We are here to help you!' : 'Welcome back, login to continue'}
          </Text>

          {/* Form */}
          <View style={styles.formContainer}>
            {isSignUp && (
              <>
                {/* Name Input */}
                <View style={styles.inputContainer}>
                  <Icon name="account" size={20} color="#9ca3af" />
                  <Controller
                    control={control}
                    name="name"
                    rules={{
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.textInput}
                        placeholder="Your Name"
                        placeholderTextColor="#9ca3af"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </View>
                {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
              </>
            )}

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Icon name="email" size={20} color="#9ca3af" />
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email' },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.textInput}
                    placeholder="Your Email"
                    placeholderTextColor="#9ca3af"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                      onFocus={() => scrollToInput(220)}
                  />
                )}
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

    <View>
  <View style={styles.inputContainer}>
    <Icon name="lock" size={20} color="#9ca3af" />

    <Controller
      control={control}
      name="password"
      rules={{
        required: 'Password is required',
        minLength: { value: 6, message: 'Minimum 8 characters required' },
      }}
      render={({ field: { onChange, onBlur, value = '' } }) => {
        const strength = getPasswordStrength(value);

        return (
          <>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!show}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              onFocus={() => scrollToInput(220)}
            />

            <TouchableOpacity onPress={() => setShow(!show)}>
              <Icon name={show ? 'eye' : 'eye-off'} size={22} />
            </TouchableOpacity>
          </>
        );
      }}
    />
  </View>

  {/* ✅ Strength Meter ONLY for signup */}
  {isSignUp && (
    <Controller
      control={control}
      name="password"
      render={({ field: { value = '' } }) => {
        if (!value) return null;

        const strength = getPasswordStrength(value);

        return (
          <View style={styles.strengthContainer}>
            <View style={styles.barRow}>
              {[1, 2, 3].map(i => (
                <View
                  key={i}
                  style={[
                    styles.strengthBar,
                    {
                      backgroundColor:
                        strength.level >= i ? strength.color : '#e5e7eb',
                    },
                  ]}
                />
              ))}
            </View>

            <Text style={[styles.strengthText, { color: strength.color }]}>
              {strength.label} password
            </Text>

            <View style={styles.rules}>
              <Rule text="At least 8 characters" ok={value.length >= 8} />
              <Rule text="One uppercase letter" ok={/[A-Z]/.test(value)} />
              <Rule text="One number" ok={/[0-9]/.test(value)} />
              <Rule
                text="One special character"
                ok={/[^A-Za-z0-9]/.test(value)}
              />
            </View>
          </View>
        );
      }}
    />
  )}
</View>


            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
{/* Forgot Password (Login only) */}
{!isSignUp && (
  <TouchableOpacity
    onPress={() => navigation.navigate(AuthStackRoutes.ForgotPassword)}
    style={styles.forgotPasswordContainer}
  >
    <Text style={styles.forgotPasswordText}>
      Forgot Password?
    </Text>
  </TouchableOpacity>
)}

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.createButton, loading && styles.createButtonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.createButtonText}>{isSignUp ? 'Create Account' : 'Sign In'}</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Divider */}
          {/* <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View> */}

          {/* Social Login Buttons */}
          {/* <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
              <FontAwesome name="google" size={20} color="#4285f4" />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="facebook" size={20} color="#1877f2" />
              
              <Text style={styles.socialButtonText}>Continue with Facebook</Text>
            </TouchableOpacity>
          </View> */}

          {/* Toggle between SignUp & SignIn */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsSignUp(!isSignUp);
                reset();
              }}
            >
              <Text style={styles.signInLink}>{isSignUp ? 'Sign In' : 'Create Account'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const Rule = ({ text, ok }: { text: string; ok: boolean }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
    <Icon
      name={ok ? 'check-circle' : 'close-circle'}
      size={14}
      color={ok ? '#22c55e' : '#9ca3af'}
    />
    <Text
      style={{
        marginLeft: 6,
        fontSize: 12,
        color: ok ? '#22c55e' : '#6b7280',
      }}
    >
      {text}
    </Text>
  </View>
);


const styles = StyleSheet.create({
  strengthContainer: {
  marginTop: 6,

  marginBottom: 8,
},

barRow: {
  flexDirection: 'row',
  gap: 6,
  marginBottom: 6,
},

strengthBar: {
  flex: 1,
  height: 5,
  borderRadius: 6,
},

strengthText: {
  fontSize: 12,
  fontWeight: '600',
   marginTop: 4,
},

rules: {
  marginTop: 6,
},

  container: { flex: 1, backgroundColor: '#f9fafb' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logoContainer: { alignItems: 'center', marginBottom: 20 },
  logoBackground: {
    width: 125,
    height: 125,
    backgroundColor: '#151111ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandName: { fontSize: 28, fontWeight: '500', color: '#6b7280', textAlign: 'center', marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '600', color: '#111827', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6b7280', textAlign: 'center', marginBottom: 32 },
  formContainer: { marginBottom: 24 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    //paddingVertical: 16,
    marginBottom: 12,
  },
  textInput: { flex: 1, fontSize: 16, color: '#111827',paddingVertical:Platform.OS==='ios'?14:14 },
  errorText: { color: '#ef4444', fontSize: 14, marginBottom: 2, marginLeft: 4 },
  createButton: { backgroundColor: '#1f2937', borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  createButtonDisabled: { opacity: 0.6 },
  createButtonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#e5e7eb' },
  dividerText: { color: '#9ca3af', fontSize: 14, paddingHorizontal: 16 },
  socialContainer: { marginBottom: 32 },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  socialButtonText: { fontSize: 16, fontWeight: '500', color: '#374151', marginLeft: 12 },
  signInContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 32 },
  signInText: { fontSize: 16, color: '#6b7280' },
  signInLink: { fontSize: 16, color: '#3b82f6', fontWeight: '600' },
  forgotPasswordContainer: {
  alignSelf: 'flex-end',
  marginBottom: 12,
  marginTop: 4,
},

forgotPasswordText: {
  color: Colors.darkBlueP1,
  fontSize: 14,
  fontWeight: '500'
},

});

export default AuthScreen;
