// import React, { useEffect } from 'react';
// import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
// import { loginUser } from '../store/authSlice';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { AuthStackParamList } from '../navigation/Routes';

// type NavProp = StackNavigationProp<AuthStackParamList, 'Login'>;
// interface Props { navigation: NavProp; }

// type FormData = {
//   emailOrPhone: string;
//   password: string;
// };

// const LoginScreen: React.FC<Props> = ({ navigation }) => {
//   const dispatch = useAppDispatch();
//   const { user, loading, error } = useAppSelector(s => s.auth);

//   const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

//   useEffect(() => {
//     if (user) navigation.replace('Main');
//   }, [user, navigation]);

//   const onSubmit = (data: FormData) => {
//     dispatch(loginUser({ email: data.emailOrPhone, password: data.password }));
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>

//       <Controller
//         control={control}
//         name="emailOrPhone"
//         rules={{ required: 'Email or phone is required' }}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <TextInput
//             style={styles.input}
//             placeholder="Email or Phone"
//             keyboardType="email-address"
//             autoCapitalize="none"
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//           />
//         )}
//       />
//       {errors.emailOrPhone && <Text style={styles.error}>{errors.emailOrPhone.message}</Text>}

//       <Controller
//         control={control}
//         name="password"
//         rules={{ required: 'Password is required' }}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             secureTextEntry
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//           />
//         )}
//       />
//       {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

//       {loading ? (
//         <ActivityIndicator size="large" style={{ marginVertical: 10 }} />
//       ) : (
//         <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>
//       )}

//       {error && <Text style={styles.error}>{error}</Text>}

//       <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//         <Text style={styles.link}>Don't have an account? Signup</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, justifyContent: 'center' },
//   title: { fontSize: 22, textAlign: 'center', marginBottom: 20 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 5,
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     borderRadius: 5,
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
//   link: { textAlign: 'center', marginTop: 12, color: 'black' },
//   error: { color: 'red', textAlign: 'center', marginBottom: 5 },
// });

// export default LoginScreen;

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const { width } = Dimensions.get('window');

// const LoginScreen = ({ navigation }) => {
//   const [loading, setLoading] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       name: '',
//       email: '',
//       password: '',
//     },
//   });

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       console.log('Account creation data:', data);
//       Alert.alert('Success', 'Account created successfully!');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to create account. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignup = () => {
//     Alert.alert('Google Signup', 'Google authentication would be implemented here');
//   };

//   const handleFacebookSignup = () => {
//     Alert.alert('Facebook Signup', 'Facebook authentication would be implemented here');
//   };

//   const handleSignIn = () => {
//     // navigation.navigate('Login');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         {/* Logo */}
//         <View style={styles.logoContainer}>
//           <View style={styles.logoBackground}>
//             <Icon name="heart-pulse" size={32} color="#fff" />
//           </View>
//         </View>

//         <Text style={styles.brandName}>HealthPal</Text>
//         <Text style={styles.title}>Create Account</Text>
//         <Text style={styles.subtitle}>We are here to help you!</Text>

//         {/* Form */}
//         <View style={styles.formContainer}>
//           {/* Name Input */}
//           <View style={styles.inputContainer}>
//             <Icon name="account" size={20} color="#9ca3af" />
//             <Controller
//               control={control}
//               name="name"
//               rules={{
//                 required: 'Name is required',
//                 minLength: { value: 2, message: 'Name must be at least 2 characters' },
//               }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   style={styles.textInput}
//                   placeholder="Your Name"
//                   placeholderTextColor="#9ca3af"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   autoCapitalize="words"
//                 />
//               )}
//             />
//           </View>
//           {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

//           {/* Email Input */}
//           <View style={styles.inputContainer}>
//             <Icon name="email" size={20} color="#9ca3af" />
//             <Controller
//               control={control}
//               name="email"
//               rules={{
//                 required: 'Email is required',
//                 pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email' },
//               }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   style={styles.textInput}
//                   placeholder="Your Email"
//                   placeholderTextColor="#9ca3af"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                 />
//               )}
//             />
//           </View>
//           {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

//           {/* Password Input */}
//           <View style={styles.inputContainer}>
//             <Icon name="lock" size={20} color="#9ca3af" />
//             <Controller
//               control={control}
//               name="password"
//               rules={{
//                 required: 'Password is required',
//                 minLength: { value: 6, message: 'Password must be at least 6 characters' },
//               }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   style={styles.textInput}
//                   placeholder="Password"
//                   placeholderTextColor="#9ca3af"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   secureTextEntry
//                 />
//               )}
//             />
//           </View>
//           {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

//           {/* Create Account Button */}
//           <TouchableOpacity
//             style={[styles.createButton, loading && styles.createButtonDisabled]}
//             onPress={handleSubmit(onSubmit)}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator size="small" color="#ffffff" />
//             ) : (
//               <Text style={styles.createButtonText}>Create Account</Text>
//             )}
//           </TouchableOpacity>
//         </View>

//         {/* Divider */}
//         <View style={styles.dividerContainer}>
//           <View style={styles.dividerLine} />
//           <Text style={styles.dividerText}>or</Text>
//           <View style={styles.dividerLine} />
//         </View>

//         {/* Social Login Buttons */}
//         <View style={styles.socialContainer}>
//           <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignup}>
//             <FontAwesome name="google" size={20} color="#4285f4" />
//             <Text style={styles.socialButtonText}>Continue with Google</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.socialButton} onPress={handleFacebookSignup}>
//             <FontAwesome name="facebook" size={20} color="#1877f2" />
//             <Text style={styles.socialButtonText}>Continue with Facebook</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Sign In Link */}
//         <View style={styles.signInContainer}>
//           <Text style={styles.signInText}>Do you have an account? </Text>
//           <TouchableOpacity onPress={handleSignIn}>
//             <Text style={styles.signInLink}>Sign In</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f9fafb' },
//   content: { flex: 1, paddingHorizontal: 24, paddingTop: 32 },
//   logoContainer: { alignItems: 'center', marginBottom: 16 },
//   logoBackground: {
//     width: 64,
//     height: 64,
//     backgroundColor: '#1f2937',
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   brandName: { fontSize: 24, fontWeight: '500', color: '#6b7280', textAlign: 'center', marginBottom: 8 },
//   title: { fontSize: 24, fontWeight: '600', color: '#111827', textAlign: 'center', marginBottom: 8 },
//   subtitle: { fontSize: 16, color: '#6b7280', textAlign: 'center', marginBottom: 32 },
//   formContainer: { marginBottom: 24 },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f3f4f6',
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     borderRadius: 16,
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     marginBottom: 16,
//   },
//   textInput: { flex: 1, fontSize: 16, color: '#111827', paddingVertical: 0 },
//   errorText: { color: '#ef4444', fontSize: 14, marginBottom: 8, marginLeft: 4 },
//   createButton: { backgroundColor: '#1f2937', borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
//   createButtonDisabled: { opacity: 0.6 },
//   createButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
//   dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
//   dividerLine: { flex: 1, height: 1, backgroundColor: '#e5e7eb' },
//   dividerText: { color: '#9ca3af', fontSize: 14, paddingHorizontal: 16 },
//   socialContainer: { marginBottom: 32 },
//   socialButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     borderRadius: 16,
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//     marginBottom: 12,
//   },
//   socialButtonText: { fontSize: 16, fontWeight: '500', color: '#374151', marginLeft: 12 },
//   signInContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
//   signInText: { fontSize: 16, color: '#6b7280' },
//   signInLink: { fontSize: 16, color: '#3b82f6', fontWeight: '600' },
// });

// export default LoginScreen;



import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { loginUser, signupUser } from '../store/authSlice';
import { useDispatch } from 'react-redux';
const AuthScreen = ({ navigation }) => {
  const dispatch=useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

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

  //   useEffect(() => {
  //   const checkLogin = async () => {
  //     const userId = await AsyncStorage.getItem('userId');
  //     const subscribed = await AsyncStorage.getItem(`subscription_${userId}`);
  //     if (userId && subscribed === 'true') {
  //       navigation.replace('Main');
  //     } else if (userId) {
  //       navigation.replace('Subscription', { userId });
  //     }
  //   };
  //   checkLogin();
  // }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (isSignUp) {
        const result = await dispatch(signupUser(data));
        if (signupUser.fulfilled.match(result)) {
          const user = result.payload;
          await AsyncStorage.setItem('userId', user.id);
          await AsyncStorage.setItem('isLoggedIn', 'true');
          Toast.show({ type: 'success', text1: 'Account created successfully!' });
          navigation.replace('Subscription', { userId: user.id });
        } else {
          Toast.show({ type: 'error', text1: result.payload || 'Signup failed' });
        }
      } else {
        const result = await dispatch(loginUser({ email: data.email, password: data.password }));
        if (loginUser.fulfilled.match(result)) {
          const user = result.payload;
          await AsyncStorage.setItem('userId', user.id);
          await AsyncStorage.setItem('isLoggedIn', 'true');

          const subscribed = await AsyncStorage.getItem(`subscription_${user.id}`);
         // Toast.show({ type: 'success', text1: 'Signed in successfully!',position:"bottom" });
          if (subscribed === 'true') {
            navigation.replace('Main');
          } else {
            navigation.replace('Subscription', { userId: user.id });
          }
        } else {
          //Toast.show({ type: 'error', text1: result.payload || 'Login failed',position:"bottom" });
        }
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  // const onSubmit = async (data) => {
  //   console.log("::::::::::::::::::data::::::::::::",data);
    
  //   setLoading(true);
  //   try {
  //     await new Promise(resolve => setTimeout(resolve, 1500));

  //     // if (isSignUp) {
  //     //  // Alert.alert('Success', '');
  //     //   Toast.show({
  //     //     type:"success",
  //     //     text1:"Account created successfully!"
  //     //   })
  //     // } else {
  //     //  // Alert.alert('Welcome Back!', '');
  //     //    Toast.show({
  //     //     type:"success",
  //     //     text1:"Signed in successfully!"
  //     //   })
  //     // }
  //     if (isSignUp) {
  //     const result = await dispatch(signupUser(data));
  //     if (signupUser.fulfilled.match(result)) {
  //       Toast.show({ type: 'success', text1: 'Account created successfully!' });
  //       navigation.replace('Main');
  //        await AsyncStorage.setItem('isLoggedIn', 'true');
  //     } else {
  //       Toast.show({ type: 'error', text1: result.payload || 'Signup failed' });
  //     }
  //   } else {
  //     const result = await dispatch(loginUser({ email: data.email, password: data.password }));
  //     if (loginUser.fulfilled.match(result)) {
  //       Toast.show({ type: 'success', text1: 'Signed in successfully!' });
  //       navigation.replace('Main');
  //        await AsyncStorage.setItem('isLoggedIn', 'true');
  //     } else {
  //       Toast.show({ type: 'error', text1: result.payload || 'Login failed' });
  //     }
  //   }
  //     //navigation.replace('Main');
     
  //   } catch (error) {
  //     //Alert.alert('Error', 'Something went wrong. Please try again.');
  //     Toast.show({
  //       type:"error",
  //       text1:"Something went wrong. Please try again."
  //     })
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              <Icon name="heart-pulse" size={32} color="#fff" />
            </View>
          </View>

          <Text style={styles.brandName}>HealthPal</Text>
          <Text style={styles.title}>{isSignUp ? 'Create Account' : 'Sign In'}</Text>
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
                  />
                )}
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="#9ca3af" />
              <Controller
                control={control}
                name="password"
                rules={{
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="#9ca3af"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                  />
                )}
              />
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

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
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="google" size={20} color="#4285f4" />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="facebook" size={20} color="#1877f2" />
              
              <Text style={styles.socialButtonText}>Continue with Facebook</Text>
            </TouchableOpacity>
          </View>

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logoContainer: { alignItems: 'center', marginBottom: 16 },
  logoBackground: {
    width: 64,
    height: 64,
    backgroundColor: '#1f2937',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandName: { fontSize: 24, fontWeight: '500', color: '#6b7280', textAlign: 'center', marginBottom: 8 },
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
  textInput: { flex: 1, fontSize: 16, color: '#111827' },
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
});

export default AuthScreen;
