import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InlineMessage = ({
  type = 'error',
  text,
  autoHide = false,
  hideAfter = 3000,
  onHide,
}) => {
  const timerRef = useRef(null);

  useEffect(() => {
    // Clear any previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Start timer only if allowed
    if (autoHide && text && typeof onHide === 'function') {
      timerRef.current = setTimeout(() => {
        onHide();
      }, hideAfter);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [text, autoHide, hideAfter, onHide]);

  if (!text) return null;

  const isSuccess = type === 'success';

  return (
    <View
      style={[
        styles.container,
        isSuccess ? styles.successBox : styles.errorBox,
      ]}
    >
      <Text
        style={[
          styles.text,
          isSuccess ? styles.successText : styles.errorText,
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

export default InlineMessage;



const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',marginBottom:10
  },

  successBox: {
    backgroundColor: '#E6F9F0',
    borderWidth: 1,
    borderColor: '#2ECC71',
  },

  errorBox: {
    backgroundColor: '#FDECEA',
    borderWidth: 1,
    borderColor: '#E74C3C',
  },

  text: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center'
  },

  successText: {
    color: '#2ECC71',
  },

  errorText: {
    color: '#E74C3C',
  },
});
