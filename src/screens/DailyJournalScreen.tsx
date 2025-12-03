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
import axios from 'axios';
import { API_BASE } from '../constants/Constant';

type SubscriptionTier = 'Free' | 'Tier1' | 'Tier2' | 'Tier3';
const dummySubscription: SubscriptionTier = 'Tier2';

const API_BASE_URL = `${API_BASE}/api/symptoms`;

const DailyJournalScreen = () => {
  const today = new Date().toISOString().split('T')[0];
  const [entries, setEntries] = useState<{ [key: string]: string }>({});
  const [selectedDate, setSelectedDate] = useState(today);
  const [text, setText] = useState('');

  // Load entries (Only fetch if local data does NOT exist)
  useEffect(() => {
    const loadEntries = async () => {
      const data = await AsyncStorage.getItem('journalEntries');

      if (data) {
        const parsed = JSON.parse(data);
        setEntries(parsed);

        if (parsed[today]) setText(parsed[today]);

        // 🔥 Stop here if local data exists
        return;
      }

      // 🟢 Only fetch if no local data is found
      fetchEntriesFromBackend();
    };

    loadEntries();
  }, []);

  const fetchEntriesFromBackend = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); 
      const res = await axios.get(`${API_BASE_URL}/my-journals`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const backendEntries: { [key: string]: string } = {};

        res.data.data.forEach((item: any) => {
          const date = new Date(item.date).toISOString().split('T')[0];
          backendEntries[date] = item.text;
        });

        setEntries(backendEntries);
        await AsyncStorage.setItem('journalEntries', JSON.stringify(backendEntries));
      }
    } catch (error: any) {
      console.log('Fetch failed', error?.message);
    }
  };

  const saveEntry = async () => {
    if (dummySubscription === 'Free') {
      Alert.alert('Upgrade Required', 'Journal access is available for Tier1 and above.');
      return;
    }

    const targetDate = selectedDate || today;
    const newEntries = { ...entries, [targetDate]: text };

    setEntries(newEntries);
    await AsyncStorage.setItem('journalEntries', JSON.stringify(newEntries));

    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        `${API_BASE_URL}/add`,
        { text, date: targetDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('Saved', `Entry for ${targetDate} saved.`);
    } catch (error) {
      Alert.alert('Error', 'Failed to sync with server. Saved locally.');
    }
  };

  const deleteEntry = async (date: string) => {
    const newEntries = { ...entries };
    delete newEntries[date];

    setEntries(newEntries);
    await AsyncStorage.setItem('journalEntries', JSON.stringify(newEntries));

    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert('Deleted', `Entry for ${date} deleted.`);
    } catch (error) {
      console.log('Delete failed', error?.message);
    }

    if (date === selectedDate) {
      setText('');
      setSelectedDate(today);
    }
  };

  const sortedEntries = Object.entries(entries).sort(
    ([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime()
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
          !text.trim() && { backgroundColor: '#ccc' },
        ]}
        onPress={saveEntry}
        disabled={!text.trim()}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          {entries[selectedDate] ? 'Update Entry' : 'Save Entry'}
        </Text>
      </TouchableOpacity>

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
                <Icon name="trash-outline" size={20} color="red" />
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
    backgroundColor: Colors.button_green,
    borderRadius: 8,
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
