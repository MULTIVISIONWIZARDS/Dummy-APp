import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Alert, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';

type SubscriptionTier = 'Free' | 'Tier1' | 'Tier2' | 'Tier3';
const dummySubscription: SubscriptionTier = 'Tier2';

const DailyJournalScreen = () => {
  const [entries, setEntries] = useState<{ [key: string]: string }>({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [text, setText] = useState('');

  useEffect(() => {
    const loadEntries = async () => {
      const data = await AsyncStorage.getItem('journalEntries');
      if (data) setEntries(JSON.parse(data));
    };
    loadEntries();
  }, []);

  const saveEntry = async () => {
    if (dummySubscription === 'Free') {
      Alert.alert('Upgrade Required', 'Journal access is available for Tier1 and above.');
      return;
    }
    const newEntries = { ...entries, [selectedDate]: text };
    setEntries(newEntries);
    await AsyncStorage.setItem('journalEntries', JSON.stringify(newEntries));
    setText('');
    Alert.alert('Saved', `Entry for ${selectedDate} saved.`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add your symptoms</Text>
     <Calendar
  // Only allow dates from today onwards
  minDate={new Date().toISOString().split('T')[0]}
  
  // Optional: limit to a certain number of months in the future
  maxDate={new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0]}

  onDayPress={(day) => {
    setSelectedDate(day.dateString);
    setText(entries[day.dateString] || '');
  }}
  markedDates={{
    ...Object.keys(entries).reduce((acc, date) => {
      acc[date] = { marked: true };
      return acc;
    }, {} as any),
    [selectedDate]: { selected: true, selectedColor: Colors.darkBlueP1 },
  }}
/>

      <Text style={styles.label}>Entry for {selectedDate}:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your symptoms here..."
        value={text}
        onChangeText={setText}
        multiline
      />
      <Text style={styles.saveButton} onPress={saveEntry}>
        Save Entry
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, flexGrow: 1, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  label: { marginTop: 10, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
    marginTop: 5,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: Colors.darkBlueP1,
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
  },
});

export default DailyJournalScreen;
