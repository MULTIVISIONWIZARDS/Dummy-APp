

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");
const testimonials = [
  {
    id: 1,
    text: `“Jennifer Mooneyham, 4 The Family. Jennifer and her team are
outstanding. Her knowledge saved me in so many ways. I would not
accomplished my health and weight goals without her. She has become
part of my family. God bless her and her team allowing them to
continue to make such a fantastic difference in people's life's. I
will always be her patient, no matter what part of the world life
takes me to.”`,
    signature: "– SB",
  },
  {
    id: 2,
    text: `“I was feeling like a big, swollen mess. As a middle-aged woman gaining weight rapidly and struggling with low energy, I felt desperate trying to keep up with work and family demands. I had tried to explain this to several medical professionals but never felt truly heard. A friend encouraged me to see Jennifer at 4 the Family Healthcare, and I’m so glad I did. Jennifer is kind, empathetic, and takes the time to explore different solutions to find what works best for you and your goals. While my hormones aren’t yet where they need to be, they’re improving, and I’m already starting to feel so much better. For the first time in a long time, I feel like I’m on the right track.”`,
    signature: "– JS",
  },
  {
    id: 3,
    text: `“I’m always traveling for work, so it can be tough to make it in for appointments. My online consultation was amazing! She was warm, kind, and quite frankly, brilliant. I’m so thankful for this experience!”`,
    signature: "– TM",
  },
    {
    id: 4,
    text: `“Hands down, one of the best doctors.  I truly enjoy having the one on one compassion that she delivers whether face to face or virtually. Genuinely cares for her patients and she goes above and beyond to help everyone that comes to her to reach their goals. She seeks the best possible outcomes for her patients “`,
    signature: "– Sk",
  },
    {
    id: 5,
    text: `It has been a journey for me over the past years due to losing my husband and many other family members. Your willingness to always give me the support not only as a doctor but a caring person. I can't thank you enough (Dr. Jennifer Mooneyham) for treating me with stomach and blood pressure issues. The kindness you show to your patients is truly a blessing. Thank you 🤩`,
    signature: "– AC",
  },
    {
    id: 6,
    text: `Jennifer Mooneyham has been the biggest blessing to my family!! Our entire family is under her care. She is understanding, caring, and a professional. Without her in our life I am not sure what we would do. From a stomach virus to heartburn she has treated our family like her family. I have never had a Doctor care for anyone like her. Thank you Jennifer Mooneyham for taking care of our entire family.`,
    signature: "– KC",
  },
    {
    id: 7,
    text: `I am so thankful for Jennifer snd the care I’ve received with hormone replacement therapy .  She really listened , explained e everything clearly ,  and helped me feel like myself again . I have more energy , and sleep better than i have in years .  I highly recommend`,
    signature: "– MB",
  },
    {
    id: 8,
    text: `Jennifer Mooneyham, 4 The Family.    Jennifer and her team are oustanding.  Her knowledge saved me in so many ways.  I would not acconplished my health and weight goals without her. She has become part of my family. God bless her and her team allowing them to continue to make such a fantastic difference in people's life's.  I will always be her patient, no matter what part of the world life takes me to.`,
    signature: "– SB",
  },
];

const PatientTestimonial = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>💬 Patient Testimony</Text>

      <ScrollView
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sliderContent}
      >
        {testimonials.map((item) => (
          <View key={item.id} style={styles.card}>
            <Icon name="format-quote-open" size={32} color="#10B981" style={{ marginBottom: 10 }} />

            {/* Auto scroll only if overflow */}
            <ScrollView
              style={styles.textScroll}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.text}>{item.text}</Text>
            </ScrollView>

            <Text style={styles.signature}>{item.signature}</Text>

            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="star" size={20} color="#FBBF24" />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.footerNote}>
        💚 Thank you to all our amazing patients for trusting 4 The family healthcare.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingVertical: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 20,
  },
  sliderContent: {
    paddingHorizontal: (width - width * 0.85) / 2,
  },
  card: {
    width: width * 0.85,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,

    // 👇 NEW: allow auto height but prevent too tall
    maxHeight: height * 0.65,marginBottom:10
  },
  textScroll: {
    flexGrow: 0,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
  },
  signature: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#6B7280",
    textAlign: "right",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  footerNote: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    color: "#6B7280",
  },
});

export default PatientTestimonial;


// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// const testimonials = [
//   {
//     id: 1,
//     text: `“Jennifer Mooneyham, 4 The Family. Jennifer and her team are outstanding...”`,
//     author: "– SB",
//     rating: 5,
//   },
//   {
//     id: 2,
//     text: `“Amazing support and care, my health improved drastically!”`,
//     author: "– John D.",
//     rating: 5,
//   },
// ];

// const PatientTestimonial = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>💬 Patient Testimony</Text>

//       {testimonials.map((item) => (
//         <View key={item.id} style={styles.card}>
//           <View style={styles.quoteIcon}>
//             <Icon name="format-quote-open" size={32} color="#10B981" />
//           </View>

//           <Text style={styles.text}>{item.text}</Text>

//           <Text style={styles.signature}>{item.author}</Text>

//           <View style={styles.ratingContainer}>
//             {Array.from({ length: item.rating }).map((_, i) => (
//               <Icon key={i} name="star" size={20} color="#FBBF24" />
//             ))}
//           </View>
//         </View>
//       ))}

//       <Text style={styles.footerNote}>
//         💚 Thank you to all our amazing patients for trusting 4 The Family.
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { backgroundColor: "#F9FAFB", padding: 20 },
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#111827",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   card: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//     width: "100%",
//     marginBottom: 20,
//   },
//   quoteIcon: { marginBottom: 10 },
//   text: {
//     fontSize: 16,
//     color: "#374151",
//     lineHeight: 24,
//     marginBottom: 12,
//   },
//   signature: {
//     fontSize: 15,
//     fontStyle: "italic",
//     color: "#6B7280",
//     textAlign: "right",
//     marginBottom: 8,
//   },
//   ratingContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 8,
//   },
//   footerNote: {
//     marginTop: 10,
//     textAlign: "center",
//     color: "#6B7280",
//     fontSize: 14,
//   },
// });

// export default PatientTestimonial;
