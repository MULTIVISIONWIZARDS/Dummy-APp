// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_BASE } from "../constants/Constant";
// import axios from "axios";
// import Colors from "../constants/Colors";

// const ExtraFeeScreen = ({ route, navigation }) => {
//   const { fee } = route.params;

//   const handlePayment = async () => {
   
    
//     // Fake success logic (just for now)
//     const token = await AsyncStorage.getItem("token");
//     await axios.patch(`${API_BASE}/api/admin/extrafee/${fee._id}/pay`, {}, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     await AsyncStorage.removeItem("extraFee");

//     navigation.replace("Main");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Extra Payment Required</Text>
//       <Text style={styles.amount}>${fee.amount}</Text>
//       <Text style={styles.desc}>
//         Your admin assigned a mandatory extra fee. Please complete the payment to continue using the app.
//       </Text>

//       <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
//         <Text style={styles.btnText}>Pay Now</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ExtraFeeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 25,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: Colors.darkBlueP1,
//     textAlign: "center",
//   },
//   amount: {
//     fontSize: 45,
//     textAlign: "center",
//     fontWeight: "bold",
//     marginVertical: 20,
//     color: "black",
//   },
//   desc: {
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 40,
//     color: "#444",
//   },
//   payBtn: {
//     backgroundColor: Colors.darkBlueP1,
//     paddingVertical: 15,
//     borderRadius: 10,
//   },
//   btnText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });


import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE } from "../constants/Constant";
import Colors from "../constants/Colors";

const ExtraFeeScreen = ({ route, navigation }) => {
  const { fee } = route.params;
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");

      await axios.patch(
        `${API_BASE}/admin/extrafee/${fee._id}/pay`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await AsyncStorage.removeItem("extraFee");

      navigation.replace("Main");

    } catch (error) {
    //   alert("Payment failed. Try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Loader Overlay */}
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={Colors.darkBlueP1} />
          <Text style={{ marginTop: 10, color: Colors.darkBlueP1, fontSize: 16 }}>
            Processing Payment...
          </Text>
        </View>
      )}

      <Text style={styles.title}>Extra Payment Required</Text>
      <Text style={styles.amount}>${fee.amount}</Text>

      <Text style={styles.desc}>
        Your admin has assigned an extra fee. Please pay to continue using the app.
      </Text>

      <TouchableOpacity
        style={[styles.payBtn, loading && { opacity: 0.5 }]}
        onPress={handlePayment}
        disabled={loading}
      >
        <Text style={styles.btnText}>
          {loading ? "Processing..." : "Pay Now"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExtraFeeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: Colors.darkBlueP1,
  },
  amount: {
    fontSize: 45,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 20,
    color: "black",
  },
  desc: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    color: "#444",
  },
  payBtn: {
    backgroundColor: Colors.darkBlueP1,
    paddingVertical: 15,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  loaderOverlay: {
    position: "absolute",
    zIndex: 999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
});
