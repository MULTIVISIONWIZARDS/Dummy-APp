// src/utils/toastConfig.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Images from '../assets/image'; // ensure this exports { success: require(...), error: require(...), info: require(...) }
import Toast from 'react-native-toast-message';
import Colors from '../constants/Colors';


// ICONS: use local require objects (do NOT wrap in { uri: ... } )
const ICONS = {
  success: Images.success, // expect: require('../assets/success.png')
  error: Images.error,
  info: Images.info,
};

const COLORS = {
  success: Colors.success, // green
  error: Colors.error,   // red
  info: Colors.info,    // blue
  textOnColor: '#ffffff',
};

const ToastLayout = ({ type = 'info', text1, text2, onPress }) => {
  const backgroundColor = COLORS[type] || COLORS.info;
  const iconSource = ICONS[type] || ICONS.info;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        onPress && onPress();
        // hide the toast if you want:
        Toast.hide?.(); // safe call; newer versions support Toast.hide()
      }}
      style={[styles.container, { backgroundColor }]}
    >
      {iconSource ? (
        <Image
          source={iconSource}
          style={styles.icon}
          // remove tintColor if using colored icons:
          // tintColor: '#fff'
        />
      ) : null}
      <View style={styles.textContainer}>
        {text1 ? <Text style={[styles.title, { color: COLORS.textOnColor }]}>{text1}</Text> : null}
        {text2 ? <Text style={[styles.message, { color: COLORS.textOnColor }]}>{text2}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

const toastConfig = {
  success: (props) => <ToastLayout type="success" text1={props.text1} text2={props.text2} />,
  error: (props) => <ToastLayout type="error" text1={props.text1} text2={props.text2} />,
  info: (props) => <ToastLayout type="info" text1={props.text1} text2={props.text2} />,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 12,
    // remove tintColor if icons are colored:
    // tintColor: '#fff',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  message: {
    fontSize: 13,
    opacity: 0.95,
  },
});

export default toastConfig;
