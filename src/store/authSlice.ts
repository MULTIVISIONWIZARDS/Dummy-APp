import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE } from '../constants/Constant';

export interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
  token?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const API_URL = `${API_BASE}/api/auth`; // 👈 use your LAN IP (not localhost)
const APIRL = `${API_BASE}/api/users`; // 👈 use your LAN IP (not localhost)

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// ✅ REGISTER USER
export const signupUser = createAsyncThunk<
  User,
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/signupUser', async (payload, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/register`, payload);

    const { token, user } = response.data;
    // Store token + user
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));

    return { ...user, token };
  } catch (error: any) {
    console.log('REGISTER ERROR:', error.response?.data);
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.msg ||
      'Signup failed';
    return thunkAPI.rejectWithValue(message);
  }
});


// export const loginUser = createAsyncThunk<
//   User,
//   { email: string; password: string },
//   { rejectValue: string }
// >('auth/loginUser', async (credentials, thunkAPI) => {
//   try {
//     const response = await axios.post(`${API_URL}/login`, credentials);

//     const { token, user } = response.data;
//     await AsyncStorage.setItem('token', token);
//     await AsyncStorage.setItem('user', JSON.stringify(user));

//     return { ...user, token };
//   } catch (error: any) {
//     console.log('LOGIN ERROR:', error.response?.data);
//     const message =
//       error.response?.data?.message ||
//       error.response?.data?.errors?.[0]?.msg ||
//       'Login failed';
//     return thunkAPI.rejectWithValue(message);
//   }
// });

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const { email, password } = credentials;

    // Dummy login check before API call
    // if (email === 'test@test.com' && password === '123456') {
    //   const dummyUser = {
    //     id: 'dummy_id_001',
    //     name: 'Test User',
    //     email: 'test@test.com'
    //   };

    //   await AsyncStorage.setItem('token', 'dummy_token_123');
    //   await AsyncStorage.setItem('user', JSON.stringify(dummyUser));

    //   return { ...dummyUser, token: 'dummy_token_123' };
    // }

    // If not dummy login, proceed with real API
    const response = await axios.post(`${API_URL}/login`, credentials);

    const { token, user } = response.data;
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));

    return { ...user, token };

  } catch (error: any) {
    console.log('LOGIN ERROR:', error.response?.data);
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.msg ||
      'Login failed';
    return thunkAPI.rejectWithValue(message);
  }
});

// ✅ FETCH CURRENT USER (from token)
export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/fetchCurrentUser', async (_, thunkAPI) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) return thunkAPI.rejectWithValue('No token found');

    const response = await axios.get(`${APIRL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { user } = response.data;
    return { ...user, token };
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to load user';
    return thunkAPI.rejectWithValue(message);
  }
});

// ✅ UPDATE PROFILE (requires token)
export const updateProfile = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string }
>('auth/updateProfile', async (payload, thunkAPI) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) return thunkAPI.rejectWithValue('No token found');

    const response = await axios.put(`${APIRL}/profile`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const updatedUser = response.data.user;
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

    return { ...updatedUser, token };
  } catch (error: any) {
    const message = error.response?.data?.message || 'Update failed';
    return thunkAPI.rejectWithValue(message);
  }
});

// ✅ Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      AsyncStorage.removeItem('user');
      AsyncStorage.removeItem('token');
    },
    setUserFromStorage(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Login
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login failed';
      })

      // Signup
      .addCase(signupUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Signup failed';
      })

      // Fetch Current User
      .addCase(fetchCurrentUser.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch user';
      })

      // Update Profile
      .addCase(updateProfile.pending, state => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Update failed';
      });
  },
});

export const { logout, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
