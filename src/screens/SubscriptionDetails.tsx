// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import LinearGradient from "react-native-linear-gradient";

// const { width } = Dimensions.get("window");

// export default function SubscriptionDetailsScreen() {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { plan, isYearly, userId } = route.params;

 
//   // const extraBejnefits = [
//   //   "Priority customer support",
//   //   "Access to premium tutorials",
//   //   "Exclusive webinars and workshops",
//   //   "Downloadable resources & guides",
//   //   "Early access to new features",
//   // ];

//   const faqs = [
//     { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time from your account settings." },
//     { q: "Is there a free trial?", a: "We offer a 7-day trial for new users before charging." },
//     { q: "Can I switch plans?", a: "Yes, you can upgrade or downgrade your plan at any time." },
//   ];
// const extraBenefits=plan.extraBenefits
//   return (
//     <LinearGradient colors={['#f3f7ff', '#d0eaff']} style={{ flex: 1 }}>
//       <ScrollView contentContainerStyle={styles.card}>
    

//         {/* Plan Card */}
//         <View style={[styles.card]}>
//           <View style={[styles.iconWrap, { backgroundColor: plan.color + "20" }]}>
//             <Icon name={plan.icon} size={36} color={plan.color} />
//           </View>
//           <Text style={styles.title}>{plan.name} Plan</Text>
//           <Text style={styles.description}>{plan.description}</Text>

//           <Text style={styles.price}>
//             ${isYearly ? plan.yearlyPrice : plan.price}/{isYearly ? "year" : "month"}
//           </Text>
//           {isYearly && (
//             <Text style={styles.saveText}>
//               Save ${(plan.price * 12 - plan.yearlyPrice).toFixed(0)} yearly
//             </Text>
//           )}

//           {/* Features */}
//           <View style={{ marginTop: 20 }}>
//             <Text style={styles.sectionTitle}>Included Features:</Text>
//             {plan.features.map((f, i) => (
//               <View key={i} style={styles.featureItem}>
//                 <Icon name="check-circle" size={20} color="#10B981" />
//                 <Text style={styles.featureText}>{f}</Text>
//               </View>
//             ))}
//           </View>

//           {/* Extra Benefits */}
//           <View style={{ marginTop: 20 }}>
//             <Text style={styles.sectionTitle}>Extra Benefits:</Text>
//             {extraBenefits.map((f, i) => (
//               <View key={i} style={styles.featureItem}>
//                 <Icon name="star" size={20} color="#F59E0B" />
//                 <Text style={styles.featureText}>{f}</Text>
//               </View>
//             ))}
//           </View>

//           {/* FAQs */}
//           <View style={{ marginTop: 20 }}>
//             <Text style={styles.sectionTitle}>FAQs:</Text>
//             {faqs.map((faq, i) => (
//               <View key={i} style={{ marginBottom: 10 }}>
//                 <Text style={styles.faqQ}>{faq.q}</Text>
//                 <Text style={styles.faqA}>{faq.a}</Text>
//               </View>
//             ))}
//           </View>

//           {/* Subscribe Button */}
//           <TouchableOpacity
//             style={[styles.subscribeBtn, { backgroundColor: plan.color }]}
//             onPress={() =>
//               navigation.navigate("PaymentWebView", {
//                 paymentUrl: plan.paymentUrl,
//                 planId: plan.id,
//                 planName: plan.name,
//                 userId,
//               })
//             }
//           >
//             <Text style={styles.subscribeBtnText}>Subscribe Now</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     minHeight: "100%",
//   },
//   backBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   backText: {
//     color: "#374151",
//     fontSize: 16,
//     marginLeft: 6,
//   },
//   card: {

//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 20,
//     alignSelf: "center",
//   },
//   iconWrap: {
//     alignSelf: "center",
//     padding: 16,
//     borderRadius: 50,
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#111827",
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     color: "#6B7280",
//     textAlign: "center",
//     marginBottom: 15,
//   },
//   price: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   saveText: {
//     fontSize: 14,
//     color: "#10B981",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 10,
//     color: "#111827",
//   },
//   featureItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
//   featureText: { marginLeft: 8, color: "#374151", fontSize: 15 },
//   faqQ: { fontWeight: "600", fontSize: 15, color: "#111827" },
//   faqA: { fontSize: 14, color: "#6B7280", marginLeft: 10 },
//   subscribeBtn: {
//     marginTop: 30,
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   subscribeBtnText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });


import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, LayoutAnimation, UIManager, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRoute, useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

const { width } = Dimensions.get("window");

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function SubscriptionDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { plan, isYearly, userId } = route.params;

  const extraBenefits = plan.extraBenefits || [];

  const faqs = [
    { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time from your account settings." },
    { q: "Is there a free trial?", a: "We offer a 7-day trial for new users before charging." },
    { q: "Can I switch plans?", a: "Yes, you can upgrade or downgrade your plan at any time." },
  ];

  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandedFaqs.includes(index)) {
      setExpandedFaqs(expandedFaqs.filter(i => i !== index));
    } else {
      setExpandedFaqs([...expandedFaqs, index]);
    }
  };

  return (
    <LinearGradient colors={['#f3f7ff', '#d0eaff']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.card}>
        {/* Plan Card */}
      
          <View style={[styles.iconWrap, { backgroundColor: plan.color + "20" }]}>
            <Icon name={plan.icon} size={36} color={plan.color} />
          </View>
          <Text style={styles.title}>{plan.name} Plan</Text>
          <Text style={styles.description}>{plan.description}</Text>

          <Text style={styles.price}>
            ${isYearly ? plan.yearlyPrice : plan.price}/{isYearly ? "year" : "month"}
          </Text>
          {isYearly && (
            <Text style={styles.saveText}>
              Save ${(plan.price * 12 - plan.yearlyPrice).toFixed(0)} yearly
            </Text>
          )}

          {/* Features */}
          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionTitle}>Included Features:</Text>
            {plan.features.map((f, i) => (
              <View key={i} style={styles.featureItem}>
                <Icon name="check-circle" size={20} color="#10B981" />
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>

          {/* Extra Benefits */}
          {extraBenefits.length > 0 && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.sectionTitle}>Extra Benefits:</Text>
              {extraBenefits.map((f, i) => (
                <View key={i} style={styles.featureItem}>
                  <Icon name="star" size={20} color="#F59E0B" />
                  <Text style={styles.featureText}>{f}</Text>
                </View>
              ))}
            </View>
          )}

          {/* FAQs with collapsible answers */}
          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions:</Text>
            {faqs.map((faq, i) => {
              const isExpanded = expandedFaqs.includes(i);
              return (
                <View key={i} style={{ marginBottom: 8, borderBottomWidth: 0.5, borderBottomColor: "#E5E7EB", paddingBottom: 8 }}>
                  <TouchableOpacity onPress={() => toggleFaq(i)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.faqQ}>{faq.q}</Text>
                    <Icon name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="#374151" />
                  </TouchableOpacity>
                  {isExpanded && <Text style={styles.faqA}>{faq.a}</Text>}
                </View>
              );
            })}
          </View>

          {/* Subscribe Button */}
          <TouchableOpacity
            style={[styles.subscribeBtn, { backgroundColor: plan.color }]}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("PaymentWebView", {
                paymentUrl: plan.paymentUrl,
                planId: plan.id,
                planName: plan.name,
                userId,
              })
            }
          >
            <Text style={styles.subscribeBtnText}>Subscribe Now</Text>
          </TouchableOpacity>
        
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    minHeight: "100%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 32,
    alignSelf: "center",
  },
  iconWrap: {
    alignSelf: "center",
    padding: 16,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 15,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  saveText: {
    fontSize: 14,
    color: "#10B981",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#111827",
  },
  featureItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  featureText: { marginLeft: 8, color: "#374151", fontSize: 15 },
  faqQ: { fontWeight: "600", fontSize: 15, color: "#111827", flex: 1 },
  faqA: { fontSize: 14, color: "#6B7280", marginTop: 4, marginLeft: 8 },
  subscribeBtn: {
    marginTop: 30,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  subscribeBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
