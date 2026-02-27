// // import React from "react";
// // import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
// // import Icon from "react-native-vector-icons/MaterialIcons";
// // import { useRoute, useNavigation } from "@react-navigation/native";
// // import LinearGradient from "react-native-linear-gradient";

// // const { width } = Dimensions.get("window");

// // export default function SubscriptionDetailsScreen() {
// //   const route = useRoute();
// //   const navigation = useNavigation();
// //   const { plan, isYearly, userId } = route.params;

 
// //   // const extraBejnefits = [
// //   //   "Priority customer support",
// //   //   "Access to premium tutorials",
// //   //   "Exclusive webinars and workshops",
// //   //   "Downloadable resources & guides",
// //   //   "Early access to new features",
// //   // ];

// //   const faqs = [
// //     { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time from your account settings." },
// //     { q: "Is there a free trial?", a: "We offer a 7-day trial for new users before charging." },
// //     { q: "Can I switch plans?", a: "Yes, you can upgrade or downgrade your plan at any time." },
// //   ];
// // const extraBenefits=plan.extraBenefits
// //   return (
// //     <LinearGradient colors={['#f3f7ff', '#d0eaff']} style={{ flex: 1 }}>
// //       <ScrollView contentContainerStyle={styles.card}>
    

// //         {/* Plan Card */}
// //         <View style={[styles.card]}>
// //           <View style={[styles.iconWrap, { backgroundColor: plan.color + "20" }]}>
// //             <Icon name={plan.icon} size={36} color={plan.color} />
// //           </View>
// //           <Text style={styles.title}>{plan.name} Plan</Text>
// //           <Text style={styles.description}>{plan.description}</Text>

// //           <Text style={styles.price}>
// //             ${isYearly ? plan.yearlyPrice : plan.price}/{isYearly ? "year" : "month"}
// //           </Text>
// //           {isYearly && (
// //             <Text style={styles.saveText}>
// //               Save ${(plan.price * 12 - plan.yearlyPrice).toFixed(0)} yearly
// //             </Text>
// //           )}

// //           {/* Features */}
// //           <View style={{ marginTop: 20 }}>
// //             <Text style={styles.sectionTitle}>Included Features:</Text>
// //             {plan.features.map((f, i) => (
// //               <View key={i} style={styles.featureItem}>
// //                 <Icon name="check-circle" size={20} color="#10B981" />
// //                 <Text style={styles.featureText}>{f}</Text>
// //               </View>
// //             ))}
// //           </View>

// //           {/* Extra Benefits */}
// //           <View style={{ marginTop: 20 }}>
// //             <Text style={styles.sectionTitle}>Extra Benefits:</Text>
// //             {extraBenefits.map((f, i) => (
// //               <View key={i} style={styles.featureItem}>
// //                 <Icon name="star" size={20} color="#F59E0B" />
// //                 <Text style={styles.featureText}>{f}</Text>
// //               </View>
// //             ))}
// //           </View>

// //           {/* FAQs */}
// //           <View style={{ marginTop: 20 }}>
// //             <Text style={styles.sectionTitle}>FAQs:</Text>
// //             {faqs.map((faq, i) => (
// //               <View key={i} style={{ marginBottom: 10 }}>
// //                 <Text style={styles.faqQ}>{faq.q}</Text>
// //                 <Text style={styles.faqA}>{faq.a}</Text>
// //               </View>
// //             ))}
// //           </View>

// //           {/* Subscribe Button */}
// //           <TouchableOpacity
// //             style={[styles.subscribeBtn, { backgroundColor: plan.color }]}
// //             onPress={() =>
// //               navigation.navigate("PaymentWebView", {
// //                 paymentUrl: plan.paymentUrl,
// //                 planId: plan.id,
// //                 planName: plan.name,
// //                 userId,
// //               })
// //             }
// //           >
// //             <Text style={styles.subscribeBtnText}>Subscribe Now</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </ScrollView>
// //     </LinearGradient>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 20,
// //     minHeight: "100%",
// //   },
// //   backBtn: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     marginBottom: 20,
// //   },
// //   backText: {
// //     color: "#374151",
// //     fontSize: 16,
// //     marginLeft: 6,
// //   },
// //   card: {

// //     backgroundColor: "#fff",
// //     borderRadius: 20,
// //     padding: 20,
// //     alignSelf: "center",
// //   },
// //   iconWrap: {
// //     alignSelf: "center",
// //     padding: 16,
// //     borderRadius: 50,
// //     marginBottom: 16,
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: "bold",
// //     textAlign: "center",
// //     color: "#111827",
// //     marginBottom: 10,
// //   },
// //   description: {
// //     fontSize: 16,
// //     color: "#6B7280",
// //     textAlign: "center",
// //     marginBottom: 15,
// //   },
// //   price: {
// //     fontSize: 22,
// //     fontWeight: "bold",
// //     textAlign: "center",
// //     marginBottom: 10,
// //   },
// //   saveText: {
// //     fontSize: 14,
// //     color: "#10B981",
// //     textAlign: "center",
// //     marginBottom: 20,
// //   },
// //   sectionTitle: {
// //     fontSize: 18,
// //     fontWeight: "600",
// //     marginBottom: 10,
// //     color: "#111827",
// //   },
// //   featureItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
// //   featureText: { marginLeft: 8, color: "#374151", fontSize: 15 },
// //   faqQ: { fontWeight: "600", fontSize: 15, color: "#111827" },
// //   faqA: { fontSize: 14, color: "#6B7280", marginLeft: 10 },
// //   subscribeBtn: {
// //     marginTop: 30,
// //     padding: 16,
// //     borderRadius: 12,
// //     alignItems: "center",
// //   },
// //   subscribeBtnText: {
// //     color: "#fff",
// //     textAlign: "center",
// //     fontWeight: "bold",
// //     fontSize: 16,
// //   },
// // });


// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, LayoutAnimation, UIManager, Platform } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import LinearGradient from "react-native-linear-gradient";
// import { AuthStackRoutes } from "../navigation/Routes";

// const { width } = Dimensions.get("window");

// // Enable LayoutAnimation for Android
// if (Platform.OS === "android") {
//   UIManager.setLayoutAnimationEnabledExperimental?.(true);
// }

// export default function SubscriptionDetailsScreen() {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { plan, isYearly, userId } = route.params;

//   const extraBenefits = plan.extraBenefits || [];

//   const faqs = [
//     { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time from your account settings." },
//     { q: "Is there a free trial?", a: "We offer a 7-day trial for new users before charging." },
//     { q: "Can I switch plans?", a: "Yes, you can upgrade or downgrade your plan at any time." },
//   ];

//   const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

//   const toggleFaq = (index: number) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     if (expandedFaqs.includes(index)) {
//       setExpandedFaqs(expandedFaqs.filter(i => i !== index));
//     } else {
//       setExpandedFaqs([...expandedFaqs, index]);
//     }
//   };

//   return (
//     <LinearGradient colors={['#f3f7ff', '#d0eaff']} style={{ flex: 1 }}>
//       <ScrollView contentContainerStyle={styles.card}>
//         {/* Plan Card */}
      
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
//           {extraBenefits.length > 0 && (
//             <View style={{ marginTop: 20 }}>
//               <Text style={styles.sectionTitle}>Extra Benefits:</Text>
//               {extraBenefits.map((f, i) => (
//                 <View key={i} style={styles.featureItem}>
//                   <Icon name="star" size={20} color="#F59E0B" />
//                   <Text style={styles.featureText}>{f}</Text>
//                 </View>
//               ))}
//             </View>
//           )}

//           {/* FAQs with collapsible answers */}
//           <View style={{ marginTop: 20 }}>
//             <Text style={styles.sectionTitle}>Frequently Asked Questions:</Text>
//             {faqs.map((faq, i) => {
//               const isExpanded = expandedFaqs.includes(i);
//               return (
//                 <View key={i} style={{ marginBottom: 8, borderBottomWidth: 0.5, borderBottomColor: "#E5E7EB", paddingBottom: 8 }}>
//                   <TouchableOpacity onPress={() => toggleFaq(i)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//                     <Text style={styles.faqQ}>{faq.q}</Text>
//                     <Icon name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="#374151" />
//                   </TouchableOpacity>
//                   {isExpanded && <Text style={styles.faqA}>{faq.a}</Text>}
//                 </View>
//               );
//             })}
//           </View>

//           {/* Subscribe Button */}
//           <TouchableOpacity
//             style={[styles.subscribeBtn, { backgroundColor: plan.color }]}
//             activeOpacity={0.8}
//             onPress={() =>
//               navigation.navigate(AuthStackRoutes.PaymentWebView, {
//                 paymentUrl: plan.paymentUrl,
//                 planId: plan.id,
//                 planName: plan.name,
//                 userId,
//               })
//             }
//           >
//             <Text style={styles.subscribeBtnText}>Subscribe Now</Text>
//           </TouchableOpacity>
        
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     minHeight: "100%",
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 32,
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
//   faqQ: { fontWeight: "600", fontSize: 15, color: "#111827", flex: 1 },
//   faqA: { fontSize: 14, color: "#6B7280", marginTop: 4, marginLeft: 8 },
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


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
  Alert,
  Linking,
  ActivityIndicator,
  AppState,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRoute, useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { AuthStackRoutes } from "../navigation/Routes";
import API from "../utils/apiClient";
// import RazorpayCheckout from "react-native-razorpay";
const { width } = Dimensions.get("window");
import InAppBrowser from "react-native-inappbrowser-reborn";
// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function SubscriptionDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const { plan, isYearly, userId , extraAmount,
        totalAmount,extraAmountT} = route.params as {
    plan: {
      id: string;
      name: string;
      description: string;
      price: number;
      yearlyPrice: number;
      period: string;
      color: string;
      icon: string;
      features: string[];
      extraBenefits?: string[];
      paymentUrl: string;
    };
    isYearly: boolean;
    userId: string;
    extraAmount:string,
        finalPrice:string
  };

  const extraBenefits = plan.extraBenefits || [];

  const faqs = [
    {
      q: "Can I cancel anytime?",
      a: "Yes, you can cancel your subscription at any time from your account settings.",
    },
    {
      q: "Is there a free trial?",
      a: "We offer a 7-day trial for new users before charging.",
    },
    {
      q: "Can I switch plans?",
      a: "Yes, you can upgrade or downgrade your plan at any time.",
    },
  ];

  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
const startRazorpayPayments = async () => {
  try {
    // 1️⃣ Create order from backend
    const res = await API.post("/subscriptions/razorpay-order", {
      subscriptionId: plan._id || plan.id, // use Mongo _id if available
    });

    const { orderId, amount, key } = res.data;

    // 2️⃣ Open Razorpay checkout
    RazorpayCheckout.open({
      key,
      order_id: orderId,
      amount,
      currency: "INR",
      name: "Health Wellness",
      description: plan.name,
      prefill: {
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: { color: plan.color },
    })
      .then(() => {
        Alert.alert(
          "Payment Successful",
          "Your subscription will be activated shortly",
          [
            {
              text: "OK",
              onPress: () => navigation.replace("PaymentSuccess"),
            },
          ]
        );
      })
      .catch(() => {
        Alert.alert("Payment Cancelled");
      });
  } catch (err) {
    console.log(err);
    Alert.alert("Error", "Unable to start payment");
  }
};
const startRazorpayPayment = async () => {
  try {
    console.log("👉 START PAYMENT FOR PLAN:", plan._id);

    // 1️⃣ Create Razorpay order from backend
    const res = await API.post("/subscriptions/razorpay-order", {
      subscriptionId: plan._id, // MUST be Mongo _id
    });

    console.log("✅ ORDER RESPONSE:", res.data);

    const { orderId, amount, key } = res.data;

    if (!orderId || !amount || !key) {
      throw new Error("Invalid order response");
    }

    // 2️⃣ Open Razorpay checkout
    await RazorpayCheckout.open({
      key,
      order_id: orderId,
      amount, // already in paise from backend
      currency: "INR",
      name: "Vintage Appointment",
      description: plan.name,
      prefill: {
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: { color: plan.color || "#10B981" },
    });

    // ✅ DO NOTHING HERE
    // Webhook will activate subscription

    Alert.alert(
      "Payment Successful",
      "Your subscription will be activated shortly",
      [
        {
          text: "OK",
          onPress: () => navigation.replace("PaymentSuccess"),
        },
      ]
    );

  } catch (err: any) {
    console.log("❌ PAYMENT ERROR:", err?.description || err);
    Alert.alert("Payment Failed", "Unable to start payment");
  }
};


const startStripePayment = async (currency = "usd") => {
  if (paymentLoading) {
    console.log("[Stripe] Payment already in progress");
    return;
  }

  console.log("[Stripe] Starting payment", {
    planId: plan?._id,
    currency,
  });

  try {
    setPaymentLoading(true);

    console.log("[Stripe] Calling checkout API...");
    const res = await API.post("/subscriptions/stripe-checkout", {
      subscriptionId: plan._id,
      currency,
    });

    console.log("[Stripe] API response:", res?.data);

    const url = res?.data?.url;
    if (!url) {
      console.error("[Stripe] Checkout URL missing", res?.data);
      throw new Error("Checkout URL not received");
    }

    console.log("[Stripe] Checkout URL received:", url);

    const isBrowserAvailable = await InAppBrowser.isAvailable();
    console.log("[Stripe] InAppBrowser available:", isBrowserAvailable);

    if (isBrowserAvailable) {
      console.log("[Stripe] Opening InAppBrowser...");
      await InAppBrowser.open(url, {
        dismissButtonStyle: "close",
        preferredBarTintColor: "#ffffff",
        preferredControlTintColor: "#000000",
        enableUrlBarHiding: true,
        showTitle: false,
      });
    } else {
      console.log("[Stripe] Falling back to Linking.openURL");
      await Linking.openURL(url);
    }

    console.log("[Stripe] Payment flow opened successfully");
  } catch (err) {
    console.error("[Stripe] Payment start failed ❌", {
      message: err?.message,
      status: err?.response?.status,
      apiError: err?.response?.data,
      stack: err?.stack,
    });

    Alert.alert(
      "Payment Error",
      err?.response?.data?.message || "Unable to start payment"
    );
  } finally {
    setPaymentLoading(false);
    console.log("[Stripe] Payment loading reset");
  }
};

  const toggleFaq = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandedFaqs.includes(index)) {
      setExpandedFaqs(expandedFaqs.filter((i) => i !== index));
    } else {
      setExpandedFaqs([...expandedFaqs, index]);
    }
  };
 useEffect(() => {
  const subscription = AppState.addEventListener("change", (state) => {
    if (state === "active") {
      // User returned from payment screen
      setPaymentLoading(false);
    }
  });

  return () => subscription.remove();
}, []);


  return (
   
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }} showsVerticalScrollIndicator={false}>
        {/* Card */}
        <View style={ { width: width - 32 ,marginBottom:60}}>
          {/* Plan Icon */}
          <View style={[styles.iconWrap, { backgroundColor: plan.color + "20" }]}>
            <Icon name={plan.icon} size={36} color={plan.color} />
          </View>

          {/* Plan Title */}
          <Text style={styles.title}>{plan.name} Plan</Text>
          <Text style={styles.description}>{plan.description}</Text>

          {/* Price */}
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

          {/* FAQs */}
          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions:</Text>
            {faqs.map((faq, i) => {
              const isExpanded = expandedFaqs.includes(i);
              return (
                <View
                  key={i}
                  style={{
                    marginBottom: 8,
                    borderBottomWidth: 0.5,
                    borderBottomColor: "#E5E7EB",
                    paddingBottom: 8,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => toggleFaq(i)}
                    style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <Text style={styles.faqQ}>{faq.q}</Text>
                    <Icon name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="#374151" />
                  </TouchableOpacity>
                  {isExpanded && <Text style={styles.faqA}>{faq.a}</Text>}
                </View>
              );
            })}
          </View>
           <View style={styles.divider} />
         <View style={{ marginBottom: 15 }}>
  <Text style={styles.sectionTitle}>Price Breakdown:</Text>

  <View style={styles.row}>
    <Text style={styles.breakdownLabel}>Plan Price:</Text>
    <Text style={styles.breakdownValue}>${isYearly ? plan.yearlyPrice : plan.price}</Text>
  </View>

<View style={styles.row}>
  {/* Left side: Label + Icon inline */}
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Text style={styles.breakdownLabel}>Extra Fee</Text>

   <TouchableOpacity
  style={{ marginLeft: 6 }}
  activeOpacity={0.7}
  onPress={() =>
    Alert.alert(
      "Why Extra Fee?",
      extraAmountT?.trim() || "This fee includes additional video consultation , telemedicine call."
    )
  }
>

      <Icon name="info-outline" size={18} color="#6B7280" />
    </TouchableOpacity>
  </View>

  {/* Right side: Value */}
  <Text style={styles.breakdownValue}>${extraAmount ?? 0}</Text>
</View>





  <View style={styles.divider} />

  <View style={styles.row}>
    <Text style={[styles.breakdownLabel, { fontWeight: "bold", fontSize: 18 }]}>Total:</Text>
    <Text style={[styles.breakdownValue, { fontWeight: "bold", fontSize: 18, color: "#10B981" }]}>
      {/* ${totalAmount} {plan.price+extraAmount}   */}
       ${totalAmount} 
    </Text>
  </View>
</View>
<TouchableOpacity
  style={[
    styles.subscribeBtn,
    {
      backgroundColor: plan.color,
      opacity: paymentLoading ? 0.7 : 1,
    },
  ]}
  disabled={paymentLoading}
  onPress={() => startStripePayment("usd")}
>
  {paymentLoading ? (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <ActivityIndicator color="#fff" size="small" />
      <Text style={[styles.subscribeBtnText, { marginLeft: 10 }]}>
        Redirecting to payment…
      </Text>
    </View>
  ) : (
    <Text style={styles.subscribeBtnText}>Continue to Payment</Text>
  )}
</TouchableOpacity>



          {/* Subscribe Button */}
          {/* <TouchableOpacity
            style={[styles.subscribeBtn, { backgroundColor: plan.color }]}
            activeOpacity={0.8}
            
             onPress={() => startStripePayment("usd")}
          >
            <Text style={styles.subscribeBtnText}>Continue to Payment</Text>
          
          </TouchableOpacity> */}
        </View>
      </ScrollView>
 
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
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
  },row: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 6,
},

breakdownLabel: {
  fontSize: 16,
  color: "#374151",
},

breakdownValue: {
  fontSize: 16,
  color: "#111827",
},

divider: {
  height: 1,
  backgroundColor: "#E5E7EB",
  marginVertical: 8,
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
