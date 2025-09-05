import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/authSlice';

const ProfileScreen: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(s => s.auth.user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user ? (
        <>
          <Text style={styles.text}>Name: {user.name}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Button title="Logout" onPress={() => dispatch(logout())} />
        </>
      ) : (
        <Text style={styles.text}>No user data</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 12 },
  text: { fontSize: 16, marginTop: 6 },
});

export default ProfileScreen;
