// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, ScrollView, Alert, StyleSheet } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Colors from '../constants/Colors';

// type SubscriptionTier = 'Free' | 'Tier1' | 'Tier2' | 'Tier3';
// const dummySubscription: SubscriptionTier = 'Tier2';

// const DailyJournalScreen = () => {
//   const [entries, setEntries] = useState<{ [key: string]: string }>({});
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split('T')[0]
//   );
//   const [text, setText] = useState('');

//   useEffect(() => {
//     const loadEntries = async () => {
//       const data = await AsyncStorage.getItem('journalEntries');
//       if (data) setEntries(JSON.parse(data));
//     };
//     loadEntries();
//   }, []);

//   const saveEntry = async () => {
//     if (dummySubscription === 'Free') {
//       Alert.alert('Upgrade Required', 'Journal access is available for Tier1 and above.');
//       return;
//     }
//     const newEntries = { ...entries, [selectedDate]: text };
//     setEntries(newEntries);
//     await AsyncStorage.setItem('journalEntries', JSON.stringify(newEntries));
//     setText('');
//     Alert.alert('Saved', `Entry for ${selectedDate} saved.`);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>Add your symptoms</Text>
//      <Calendar
//   // Only allow dates from today onwards
//   minDate={new Date().toISOString().split('T')[0]}
  
//   // Optional: limit to a certain number of months in the future
//   maxDate={new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0]}

//   onDayPress={(day) => {
//     setSelectedDate(day.dateString);
//     setText(entries[day.dateString] || '');
//   }}
//   markedDates={{
//     ...Object.keys(entries).reduce((acc, date) => {
//       acc[date] = { marked: true };
//       return acc;
//     }, {} as any),
//     [selectedDate]: { selected: true, selectedColor: Colors.darkBlueP1 },
//   }}
// />

//       <Text style={styles.label}>Entry for {selectedDate}:</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Type your symptoms here..."
//         value={text}
//         onChangeText={setText}
//         multiline
//       />
//       <Text style={styles.saveButton} onPress={saveEntry}>
//         Save Entry
//       </Text>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { padding: 10, flexGrow: 1, backgroundColor: '#fff' },
//   header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
//   label: { marginTop: 10, fontWeight: 'bold' },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     padding: 10,
//     minHeight: 100,
//     marginTop: 5,
//     textAlignVertical: 'top',
//   },
//   saveButton: {
//     marginTop: 10,
//     backgroundColor: Colors.darkBlueP1,
//     color: '#fff',
//     padding: 10,
//     textAlign: 'center',
//     borderRadius: 5,
//     fontWeight: 'bold',
//   },
// });

// export default DailyJournalScreen;



import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

type SubscriptionTier = 'Free' | 'Tier1' | 'Tier2' | 'Tier3';
const dummySubscription: SubscriptionTier = 'Tier2';

const DailyJournalScreen = () => {
  const today = new Date().toISOString().split('T')[0];
  const [entries, setEntries] = useState<{ [key: string]: string }>({});
  const [selectedDate, setSelectedDate] = useState(today);
  const [text, setText] = useState('');

  useEffect(() => {
    const loadEntries = async () => {
      const data = await AsyncStorage.getItem('journalEntries');
      if (data) {
        const parsed = JSON.parse(data);
        setEntries(parsed);
        if (parsed[today]) {
          setText(parsed[today]);
        }
      }
    };
    loadEntries();
  }, []);

  const saveEntry = async () => {
    if (dummySubscription === 'Free') {
      Alert.alert(
        'Upgrade Required',
        'Journal access is available for Tier1 and above.'
      );
      return;
    }

    // ✅ Always use today for first-time save
    const targetDate = selectedDate || today;

    const newEntries = { ...entries, [targetDate]: text };
    setEntries(newEntries); // update local state immediately
    await AsyncStorage.setItem('journalEntries', JSON.stringify(newEntries));
    setSelectedDate(targetDate); // ensure date is set
    Alert.alert('Saved', `Entry for ${targetDate} saved.`);
  };

  const deleteEntry = async (date: string) => {
    const newEntries = { ...entries };
    delete newEntries[date];
    setEntries(newEntries);
    await AsyncStorage.setItem('journalEntries', JSON.stringify(newEntries));
    Alert.alert('Deleted', `Entry for ${date} deleted.`);
    if (date === selectedDate) {
      setText('');
      setSelectedDate(today);
    }
  };

  // ✅ Sort entries ascending
  const sortedEntries = Object.entries(entries).sort(
    ([dateA], [dateB]) =>
      new Date(dateA).getTime() - new Date(dateB).getTime()
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add your symptoms</Text>

      <Text style={styles.label}>Entry for {selectedDate}:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your symptoms here..."
        value={text}
        onChangeText={setText}
        multiline
      />
<TouchableOpacity
  style={[
    styles.saveButton,
    !text.trim() && { backgroundColor: '#ccc' }, // gray when disabled
  ]}
  onPress={saveEntry}
  disabled={!text.trim()} // disable if empty
>
  <Text
    style={{
      color: '#fff',
      textAlign: 'center',
      borderRadius: 5,
      fontWeight: 'bold',
    }}
  >
    {entries[selectedDate] ? 'Update Entry' : 'Save Entry'}
  </Text>
</TouchableOpacity>


      {/* ✅ Show all entries */}
      <Text style={styles.listHeader}>Your Journal Entries</Text>
      {sortedEntries.length === 0 ? (
        <Text style={styles.emptyText}>No entries yet.</Text>
      ) : (
        sortedEntries.map(([date, entry]) => (
          <TouchableOpacity
            key={date}
            style={[
              styles.entryCard,
              date === selectedDate && styles.selectedCard,
            ]}
            onPress={() => {
              setSelectedDate(date);
              setText(entry);
            }}
          >
            <View style={styles.entryHeader}>
              <Text style={styles.entryDate}>{date}</Text>
              <TouchableOpacity onPress={() => deleteEntry(date)}>
                <Icon name="trash-outline" size={20} color="red"/>
              </TouchableOpacity>
            </View>
            <Text style={styles.entryText} numberOfLines={2}>
              {entry}
            </Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, flexGrow: 1, backgroundColor: '#fff' },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
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
    
    padding: 10,
    backgroundColor: Colors.button_green,borderRadius:8
   
   
  },
  listHeader: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  entryCard: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedCard: {
    borderColor: Colors.darkBlueP1,
    borderWidth: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  entryDate: {
    fontWeight: 'bold',
    color: Colors.darkBlueP1,
  },
  entryText: { fontSize: 14, color: '#333' },
  emptyText: { marginTop: 10, fontStyle: 'italic', color: '#999' },
});

export default DailyJournalScreen;
