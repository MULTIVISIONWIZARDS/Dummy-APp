import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  navigation?: any;
  back?: any;
  title?: string;
};

const AppHeader: React.FC<Props> = ({ navigation, back, title }) => {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        {back ? (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Icon name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
        ) : null}
      </View>

      <Text style={styles.title}>{title ?? 'AppointmentApp'}</Text>

      <View style={styles.right}>
        <TouchableOpacity onPress={() => navigation?.navigate?.('Profile')}>
          <Icon name="bell-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#1976D2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  left: { width: 40 },
  iconBtn: { padding: 6 },
  title: { flex: 1, textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: '600' },
  right: { width: 40, alignItems: 'flex-end' },
});

export default AppHeader;
