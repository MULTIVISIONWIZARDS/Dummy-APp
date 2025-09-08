import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SearchBar = ({
  placeholder = 'Search...',
  borderRadius = 8,
  borderColor = Colors.fa,
  iconColor = Colors.fa,
  iconSize = 22,
  borderWidth = 0.7,
  backgroundColor = '#fff',
  placeholderTextColor = Colors.fa,
  loading = false,
  onChangeText, // ✅ callback when user types
  value,
}) => {
 
  return (
    <View
      style={[
        styles.container,
        { backgroundColor, borderRadius, borderWidth, borderColor },
      ]}
    >
      <Ionicons
        name="search"
        size={iconSize}
        color={iconColor}
        style={styles.icon}
      />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        editable={!loading}
      />

      {loading && <ActivityIndicator size="small" color={Colors.darkBlueP1} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 50
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: Colors.text_black,
  },
});

export default SearchBar;
