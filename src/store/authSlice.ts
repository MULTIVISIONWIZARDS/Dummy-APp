import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Login
export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (credentials.email === 'test@test.com' && credentials.password === '123456') {
      const user = { id: '1', name: 'Joe Doe', email: credentials.email };
      await AsyncStorage.setItem('user', JSON.stringify(user));
      return user;
    }
    return thunkAPI.rejectWithValue('Invalid credentials');
  } catch {
    return thunkAPI.rejectWithValue('Login failed');
  }
});

// Signup
export const signupUser = createAsyncThunk<
  User,
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/signupUser', async (payload, thunkAPI) => {
  console.log(":::::::::::::::::authAlice:::::",payload.name);
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const user = { id: '1', name: payload.name, email: payload.email };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch {
    return thunkAPI.rejectWithValue('Signup failed');
  }
});

// Update Profile
export const updateProfile = createAsyncThunk<
  User,
  { id: string; name: string; email: string ,phone:Number},
  { rejectValue: string }
>('auth/updateProfile', async (payload, thunkAPI) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await AsyncStorage.setItem('user', JSON.stringify(payload));
    return payload;
  } catch {
    return thunkAPI.rejectWithValue('Update failed');
  }
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      AsyncStorage.removeItem('user');
    },
    setUserFromStorage(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload ?? 'Login error'; })
      .addCase(signupUser.pending, state => { state.loading = true; state.error = null; })
      .addCase(signupUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(signupUser.rejected, (state, action) => { state.loading = false; state.error = action.payload ?? 'Signup error'; })
      .addCase(updateProfile.pending, state => { state.loading = true; })
      .addCase(updateProfile.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(updateProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload ?? 'Update error'; });
  },
});

export const { logout, setUserFromStorage } = slice.actions;
export default slice.reducer;
