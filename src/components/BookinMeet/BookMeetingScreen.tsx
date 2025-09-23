import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

export default function BookMeetingScreen() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedMeeting, setBookedMeeting] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const navigation = useNavigation();

  const timeSlots = [
    "09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30",
    "13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00",
  ];

  // Load bookings on mount
  useEffect(() => {
    AsyncStorage.getItem("meetings").then((stored) => {
      if (stored) {
        const meetings = JSON.parse(stored);
        setBookings(meetings);
        if (meetings.length) setBookedMeeting(meetings[meetings.length - 1]);
      }
    });
  }, []);

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert("Select date and time first!");
      return;
    }

    if (bookedMeeting) {
      Alert.alert("You already have a booked meeting!");
      return;
    }

    const startTime = new Date(`${selectedDate}T${selectedTime}:00`);
    const meetingData = {
      id: Date.now().toString(),
      topic: "Wellness Consultation",
      start_time: startTime,
      duration: 30,
      join_url: "https://zoom.us/j/123456789",
    };

    try {
      const newBookings = [...bookings, meetingData];
      await AsyncStorage.setItem("meetings", JSON.stringify(newBookings));
      setBookedMeeting(meetingData);
      setBookings(newBookings);
      setShowCalendar(false);
      setSelectedDate(null);
      setSelectedTime(null);
      Alert.alert("✅ Meeting Booked!", "Your consultation has been scheduled.");
    } catch (err) {
      console.log(err);
    }
  };

  // Mark booked dates
  const markedDates: any = {};
  bookings.forEach((b) => {
    const dateKey = new Date(b.start_time).toISOString().split("T")[0];
    markedDates[dateKey] = { marked: true, dotColor: "red" };
  });
  if (selectedDate) {
    markedDates[selectedDate] = { ...(markedDates[selectedDate] || {}), selected: true, selectedColor: "#3b82f6" };
  }

  const bookedSlots = bookings
    .filter((b) => selectedDate && new Date(b.start_time).toISOString().split("T")[0] === selectedDate)
    .map((b) => new Date(b.start_time).toTimeString().slice(0,5));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📅 Video Call Booking</Text>

      {/* Booking Button */}
      {!bookedMeeting && (
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => setShowCalendar(!showCalendar)}
        >
          <Text style={styles.bookText}>{showCalendar ? "Close Calendar" : "Book a Video Call"}</Text>
        </TouchableOpacity>
      )}

      {/* Calendar */}
      {showCalendar && (
        <Calendar
          minDate={new Date().toISOString().split("T")[0]}
          maxDate={new Date(Date.now() + 15*24*60*60*1000).toISOString().split("T")[0]}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
        />
      )}

      {/* Time Slots */}
      {selectedDate && !bookedMeeting && (
        <>
          <Text style={styles.label}>Select Time Slot (30 min)</Text>
          <FlatList
            data={timeSlots}
            numColumns={4}
            keyExtractor={(item) => item}
            contentContainerStyle={{ marginBottom: 16 }}
            renderItem={({ item }) => {
              const disabled = bookedSlots.includes(item);
              const selected = item === selectedTime;
              return (
                <TouchableOpacity
                  disabled={disabled}
                  onPress={() => setSelectedTime(item)}
                  style={[
                    styles.timeSlot,
                    disabled && { backgroundColor: "#ccc" },
                    selected && { backgroundColor: "#3b82f6" },
                  ]}
                >
                  <Text style={[styles.timeText, selected && { color: "#fff" }]}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
          <TouchableOpacity style={styles.bookButton} onPress={handleConfirmBooking}>
            <Text style={styles.bookText}>Confirm Booking</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Booked Meeting Card */}
      {bookedMeeting && (
        <View style={[styles.card, { marginTop: 20, backgroundColor: "#e0f7fa" }]}>
          <Text style={styles.topic}>📌 {bookedMeeting.topic}</Text>
          <Text style={styles.time}>
            🕒 {new Date(bookedMeeting.start_time).toLocaleDateString()}{" "}
            {new Date(bookedMeeting.start_time).toLocaleTimeString()}
          </Text>
          <Text style={styles.duration}>Duration: {bookedMeeting.duration} min</Text>
          <TouchableOpacity
            style={[styles.bookButton, { backgroundColor: "#26a69a" }]}
            onPress={() =>
              navigation.navigate("Video", {
                topic: bookedMeeting.topic,
                onEndMeeting: () => setBookedMeeting(null), // hide card after meeting
              })
            }
          >
            <Text style={styles.bookText}>Join Meeting</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:"#f7f7f7", padding:16 },
  title: { fontSize:22, fontWeight:"700", marginBottom:10 },
  label: { fontSize:16, fontWeight:"600", marginTop:12, marginBottom:8 },
  timeSlot: {
    flex:1, margin:4, padding:12, backgroundColor:"#e8f0fe", borderRadius:8, alignItems:"center"
  },
  timeText: { fontSize:14, color:"#1a73e8" },
  bookButton: {
    backgroundColor:"#3b82f6", paddingVertical:12, borderRadius:8, alignItems:"center", marginBottom:12
  },
  bookText: { color:"#fff", fontWeight:"700", fontSize:16 },
  card: {
    borderRadius:12, padding:16, shadowColor:"#000", shadowOpacity:0.1, shadowRadius:6, elevation:3
  },
  topic: { fontSize:16, fontWeight:"600", marginBottom:6, color:"#333" },
  time: { fontSize:14, marginBottom:8, color:"#555" },
  duration: { fontSize:14, marginBottom:12, color:"#666" },
});
