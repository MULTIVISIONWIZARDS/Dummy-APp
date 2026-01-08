import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from "../constants/Constant";

export const checkExtraFeeStatus = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.get(`${API_BASE}/admin/user/extra-fee/latest`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const fee = res.data?.data || null;

    // Cache so UI loads instantly
    await AsyncStorage.setItem("extraFee", JSON.stringify(fee));
    
    return fee;
  } catch (err) {
    console.log("Fee Check Error:", err);
    return null;
  }
};
