import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';

type Props = {
  navigation?: any;
  back?: boolean;
  title?: string;
  showBackButton?: boolean;
  rightIcon?: string;
  onRightPress?: () => void;
};

const AppHeader: React.FC<Props> = ({
  navigation,
  back,
  title,
  showBackButton = false,
  rightIcon,
  onRightPress
}) => {
  const insets = useSafeAreaInsets();

  return (
    <>
    {/* cmd */}
      {/* <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.darkBlueP1}
        translucent={false}
      /> */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.left}>
          {(back || showBackButton) && (
            <TouchableOpacity
              onPress={() => navigation?.goBack?.()}
              style={styles.iconBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.title} numberOfLines={1}>
          {title ?? 'AppointmentApp'}
        </Text>

        <View style={styles.right}>
          {rightIcon && (
            <TouchableOpacity
              onPress={onRightPress}
              style={styles.iconBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name={rightIcon} size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    minHeight: 56,
    backgroundColor: Colors.darkBlueP1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  left: { width: 48, justifyContent: 'center' },
  iconBtn: { padding: 8, borderRadius: 20 },
  title: { flex: 1, textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: '600', marginHorizontal: 16 },
  right: { width: 48, alignItems: 'flex-end', justifyContent: 'center' },
});

export default AppHeader;
