// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import Toast from 'react-native-toast-message';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { API_BASE } from '../constants/Constant';
// import { AuthStackRoutes } from '../navigation/Routes';
// import InlineMessage from './InlineMessage';

// const ResetPasswordOtpScreen = ({ route, navigation }) => {
//   const { email } = route.params;
//   const [otp, setOtp] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
// const [inlineMessage, setInlineMessage] = useState({
//   type: null, // 'error' | 'success'
//   text: '',
// });
// const clearInlineMessage = () => {
//   setInlineMessage({ type: null, text: '' });
// };
// const getPasswordStrength = password => {
//   let score = 0;

//   if (password.length >= 8) score++;
//   if (/[A-Z]/.test(password)) score++;
//   if (/[0-9]/.test(password)) score++;
//   if (/[^A-Za-z0-9]/.test(password)) score++;

//   if (score <= 1) return { label: 'Weak', color: '#ef4444', level: 1 };
//   if (score <= 3) return { label: 'Medium', color: '#f59e0b', level: 2 };
//   return { label: 'Strong', color: '#22c55e', level: 3 };
// };

// const submit = async () => {
//   setInlineMessage({ type: null, text: '' });

//   if (!otp) {
//     setInlineMessage({
//       type: 'error',
//       text: 'Please enter the 6-digit OTP sent to your email.',
//     });
//     return;
//   }

//   if (otp.length < 6) {
//     setInlineMessage({
//       type: 'error',
//       text: 'OTP must be exactly 6 digits.',
//     });
//     return;
//   }

//   if (!password) {
//     setInlineMessage({
//       type: 'error',
//       text: 'Please enter a new password.',
//     });
//     return;
//   }

//   if (password.length < 6) {
//     setInlineMessage({
//       type: 'error',
//       text: 'Password must be at least 6 characters long.',
//     });
//     return;
//   }

//   try {
//     setLoading(true);

//     const res = await fetch(`${API_BASE}/auth/reset-password`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, otp, password }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setInlineMessage({
//         type: 'error',
//         text: data.message || 'Invalid OTP. Please try again.',
//       });
//       return;
//     }

//     setInlineMessage({
//       type: 'success',
//       text: 'Password changed successfully. Redirecting to login…',
//     });

//     setTimeout(() => {
//       navigation.reset({
//         index: 0,
//         routes: [{ name: AuthStackRoutes.Login }],
//       });
//     }, 800);
//   } catch {
//     setInlineMessage({
//       type: 'error',
//       text: 'Server error. Please try again later.',
//     });
//   } finally {
//     setLoading(false);
//   }
// };
// const maskEmail = email => {
//   if (!email) return '';
//   const [name, domain] = email.split('@');
//   if (!domain) return email;

//   const maskedName =
//     name.length <= 2
//       ? `${name[0]}*`
//       : `${name.slice(0, 3)}***`;

//   return `${maskedName}@${domain}`;
// };


// //   const submit = async () => {
// //   if (!otp) {
// //   Toast.show({
// //     type: 'error',
// //     text1: 'OTP is required',
// //     text2: 'Please enter the 6-digit OTP sent to your email',
// //   });
// //   return;
// // }

// // if (otp.length < 6) {
// //   Toast.show({
// //     type: 'error',
// //     text1: 'Invalid OTP',
// //     text2: 'OTP must be 6 digits',
// //   });
// //   return;
// // }

// // if (!password) {
// //   Toast.show({
// //     type: 'error',
// //     text1: 'Password is required',
// //     text2: 'Please enter a new password',
// //   });
// //   return;
// // }

// // if (password.length < 6) {
// //   Toast.show({
// //     type: 'error',
// //     text1: 'Password too short',
// //     text2: 'Password must be at least 6 characters',
// //   });
// //   return;
// // }


// //     try {
// //       setLoading(true);

// //       const res = await fetch(`${API_BASE}/auth/reset-password`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, otp, password }),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         Toast.show({ type: 'error', text1: data.message });
// //         return;
// //       }

// //       Toast.show({ type: 'success', text1: 'Password changed successfully' });

// //       navigation.reset({
// //         index: 0,
// //         routes: [{ name: AuthStackRoutes.Login }],
// //       });
// //     } catch {
// //       Toast.show({ type: 'error', text1: 'Server error. Try again.' });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

//   return (
//     <View style={styles.safe}>
//       <View style={styles.container}>
//         {/* Icon */}
//         <View style={styles.iconWrapper}>
//           <Icon name="shield-lock-outline" size={48} color="#1f2937" />
//         </View>

//         {/* Header */}
//         <Text style={styles.title}>Reset Password</Text>
//        <Text style={styles.subtitle}>
//   Enter the OTP sent to{' '}
//   <Text style={{ fontWeight: '600', color: '#111827' }}>
//     {maskEmail(email)}
//   </Text>{' '}
//   and create a new password
// </Text>

// <InlineMessage
//   type={inlineMessage.type}
//   text={inlineMessage.text}
//   autoHide={inlineMessage.type === 'success'}
//   hideAfter={2000}
//   onHide={clearInlineMessage}
// />


//         {/* Card */}
//         <View style={styles.card}>
//           {/* OTP */}
//           <View style={styles.inputContainer}>
//             <Icon name="numeric" size={20} color="#9ca3af" />
//             <TextInput
//               placeholder="6-digit OTP"
//               placeholderTextColor="#9ca3af"
//               keyboardType="number-pad"
//               value={otp}
//               onChangeText={setOtp}
//               style={styles.input}
//               maxLength={6}
//             />
//           </View>

//           {/* Password with eye toggle */}
//           <View style={styles.inputContainer}>
//             <Icon name="lock-outline" size={20} color="#9ca3af" />

//             <TextInput
//               placeholder="New password"
//               placeholderTextColor="#9ca3af"
//               secureTextEntry={!showPassword}
//               value={password}
//               onChangeText={setPassword}
//               style={styles.input}
//             />

//             <TouchableOpacity
//               onPress={() => setShowPassword(!showPassword)}
//               hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//             >
//               <Icon
//                 name={showPassword ? 'eye-off-outline' : 'eye-outline'}
//                 size={22}
//                 color="#6b7280"
//               />
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity
//             style={[styles.button, loading && styles.buttonDisabled]}
//             onPress={submit}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>Reset Password</Text>
//             )}
//           </TouchableOpacity>
//         </View>

//         {/* Info */}
//         <View style={styles.infoBox}>
//           <Icon name="information-outline" size={18} color="#2563EB" />
//           <Text style={styles.infoText}>
//             OTP is valid for 10 minutes. Please don’t share it with anyone.
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default ResetPasswordOtpScreen;


// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: '#f9fafb',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 24,
//     backgroundColor: '#f9fafb',
//   },
//   iconWrapper: {
//     width: 80,
//     height: 80,
//     borderRadius: 20,
//     backgroundColor: '#e5e7eb',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#111827',
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#6b7280',
//     textAlign: 'center',
//     marginTop: 6,
//     marginBottom: 24,
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 24,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//     elevation: 4,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f3f4f6',
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     borderRadius: 16,
//     paddingHorizontal: 16,
//     marginBottom: 12,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: '#111827',
//     paddingVertical: 14,
//     marginLeft: 6,
//   },
//   button: {
//     backgroundColor: '#1f2937',
//     borderRadius: 16,
//     paddingVertical: 16,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   buttonDisabled: {
//     opacity: 0.6,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 15,
//     fontWeight: '600',
//   },
//   infoBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#eff6ff',
//     padding: 12,
//     borderRadius: 12,
//     marginTop: 20,
//   },
//   infoText: {
//     marginLeft: 8,
//     fontSize: 13,
//     color: '#1e40af',
//     flex: 1,
//   },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_BASE } from '../constants/Constant';
import { AuthStackRoutes } from '../navigation/Routes';
import InlineMessage from './InlineMessage';

const ResetPasswordOtpScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
const [inlineMessage, setInlineMessage] = useState({
  type: null, // 'error' | 'success'
  text: '',
});
const clearInlineMessage = () => {
  setInlineMessage({ type: null, text: '' });
};
const getPasswordStrength = password => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: 'Weak', color: '#ef4444', level: 1 };
  if (score <= 3) return { label: 'Medium', color: '#f59e0b', level: 2 };
  return { label: 'Strong', color: '#22c55e', level: 3 };
};

const submit = async () => {
  setInlineMessage({ type: null, text: '' });

  if (!otp) {
    setInlineMessage({
      type: 'error',
      text: 'Please enter the 6-digit OTP sent to your email.',
    });
    return;
  }

  if (otp.length < 6) {
    setInlineMessage({
      type: 'error',
      text: 'OTP must be exactly 6 digits.',
    });
    return;
  }

  if (!password) {
    setInlineMessage({
      type: 'error',
      text: 'Please enter a new password.',
    });
    return;
  }

  if (password.length < 6) {
    setInlineMessage({
      type: 'error',
      text: 'Password must be at least 6 characters long.',
    });
    return;
  }

  try {
    setLoading(true);

    const res = await fetch(`${API_BASE}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setInlineMessage({
        type: 'error',
        text: data.message || 'Invalid OTP. Please try again.',
      });
      return;
    }

    setInlineMessage({
      type: 'success',
      text: 'Password changed successfully. Redirecting to login…',
    });

    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: AuthStackRoutes.Login }],
      });
    }, 800);
  } catch {
    setInlineMessage({
      type: 'error',
      text: 'Server error. Please try again later.',
    });
  } finally {
    setLoading(false);
  }
};
const maskEmail = email => {
  if (!email) return '';
  const [name, domain] = email.split('@');
  if (!domain) return email;

  const maskedName =
    name.length <= 2
      ? `${name[0]}*`
      : `${name.slice(0, 3)}***`;

  return `${maskedName}@${domain}`;
};


//   const submit = async () => {
//   if (!otp) {
//   Toast.show({
//     type: 'error',
//     text1: 'OTP is required',
//     text2: 'Please enter the 6-digit OTP sent to your email',
//   });
//   return;
// }

// if (otp.length < 6) {
//   Toast.show({
//     type: 'error',
//     text1: 'Invalid OTP',
//     text2: 'OTP must be 6 digits',
//   });
//   return;
// }

// if (!password) {
//   Toast.show({
//     type: 'error',
//     text1: 'Password is required',
//     text2: 'Please enter a new password',
//   });
//   return;
// }

// if (password.length < 6) {
//   Toast.show({
//     type: 'error',
//     text1: 'Password too short',
//     text2: 'Password must be at least 6 characters',
//   });
//   return;
// }


//     try {
//       setLoading(true);

//       const res = await fetch(`${API_BASE}/auth/reset-password`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, otp, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         Toast.show({ type: 'error', text1: data.message });
//         return;
//       }

//       Toast.show({ type: 'success', text1: 'Password changed successfully' });

//       navigation.reset({
//         index: 0,
//         routes: [{ name: AuthStackRoutes.Login }],
//       });
//     } catch {
//       Toast.show({ type: 'error', text1: 'Server error. Try again.' });
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <View style={styles.safe}>
      <View style={styles.container}>
        {/* Icon */}
        <View style={styles.iconWrapper}>
          <Icon name="shield-lock-outline" size={48} color="#1f2937" />
        </View>

        {/* Header */}
        <Text style={styles.title}>Reset Password</Text>
       <Text style={styles.subtitle}>
  Enter the OTP sent to{' '}
  <Text style={{ fontWeight: '600', color: '#111827' }}>
    {maskEmail(email)}
  </Text>{' '}
  and create a new password
</Text>

<InlineMessage
  type={inlineMessage.type}
  text={inlineMessage.text}
  autoHide={inlineMessage.type === 'success'}
  hideAfter={2000}
  onHide={clearInlineMessage}
/>


        {/* Card */}
        <View style={styles.card}>
          {/* OTP */}
          <View style={styles.inputContainer}>
            <Icon name="numeric" size={20} color="#9ca3af" />
            <TextInput
              placeholder="6-digit OTP"
              placeholderTextColor="#9ca3af"
              keyboardType="number-pad"
              value={otp}
              // onChangeText={setOtp}
                onChangeText={text => {
    setOtp(text);
    clearInlineMessage(); // ✅ FIX
  }}
              style={styles.input}
              maxLength={6}
            />
          </View>

          {/* Password with eye toggle */}
          {/* <View style={styles.inputContainer}>
            <Icon name="lock-outline" size={20} color="#9ca3af" />

            <TextInput
              placeholder="New password"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#6b7280"
              />
            </TouchableOpacity>
          </View> */}
{/* Password with eye toggle */}
<View style={styles.inputContainer}>
  <Icon name="lock-outline" size={20} color="#9ca3af" />

  <TextInput
    placeholder="New password"
    placeholderTextColor="#9ca3af"
    secureTextEntry={!showPassword}
    value={password}
    // onChangeText={setPassword}
               onChangeText={text => {
    setPassword(text);
    clearInlineMessage(); // ✅ FIX
  }}
    style={styles.input}
  />

  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    <Icon
      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
      size={22}
      color="#6b7280"
    />
  </TouchableOpacity>
</View>

{/* ✅ PASSWORD STRENGTH */}
{password.length > 0 && (() => {
  const strength = getPasswordStrength(password);

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
    </View>
  );
})()}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={submit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Reset Password</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View style={styles.infoBox}>
          <Icon name="information-outline" size={18} color="#2563EB" />
          <Text style={styles.infoText}>
            OTP is valid for 10 minutes. Please don’t share it with anyone.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ResetPasswordOtpScreen;


const styles = StyleSheet.create({
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
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
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
    marginLeft: 6,
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
  },strengthContainer: {
  marginBottom: 12,
},

barRow: {
  flexDirection: 'row',
  gap: 6,
  marginBottom: 4,
},

strengthBar: {
  flex: 1,
  height: 5,
  borderRadius: 6,
},

strengthText: {
  fontSize: 12,
  fontWeight: '600',
},

});
