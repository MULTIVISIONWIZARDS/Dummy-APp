import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE } from '../constants/Constant';

const API = axios.create({
  baseURL: `${API_BASE}`, // ⚠️ Replace with your backend IP:port
  timeout: 10000,
});

API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token'); // assuming you store JWT here
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
