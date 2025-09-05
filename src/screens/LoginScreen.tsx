import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/Routes';

type NavProp = StackNavigationProp<AuthStackParamList, 'Login'>;
interface Props { navigation: NavProp; }

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector(s => s.auth);

  useEffect(() => {
    if (user) navigation.replace('Main');
  }, [user, navigation]);

  const handleLogin = (values: Record<string, string>) => {
    dispatch(loginUser({ email: values['Email or Phone'] ?? '', password: values['Password'] ?? '' }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <AuthForm
        fields={[
            { placeholder: 'Email or Phone', secure: false, keyboardType: 'email-address' as any },
            { placeholder: 'Password', secure: true },
        ]}
        buttonText="Login"
        onSubmit={handleLogin}
      />

      {loading && <ActivityIndicator size="large" />}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don't have account? Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, textAlign: 'center', marginBottom: 20 },
  link: { textAlign: 'center', marginTop: 12, color: '#1976D2' },
  error: { color: 'red', textAlign: 'center' },
});

export default LoginScreen;
