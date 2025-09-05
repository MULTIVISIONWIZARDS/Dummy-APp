import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1200));
    if (credentials.email === 'test@test.com' && credentials.password === '123456') {
      return { id: '1', name: 'Test User', email: credentials.email };
    }
    return thunkAPI.rejectWithValue('Invalid credentials');
  } catch {
    return thunkAPI.rejectWithValue('Login failed');
  }
});

export const signupUser = createAsyncThunk<
  User,
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/signupUser', async (payload, thunkAPI) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return { id: '2', name: payload.name, email: payload.email };
  } catch {
    return thunkAPI.rejectWithValue('Signup failed');
  }
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => { state.loading = false; state.user = action.payload; })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload ?? 'Login error'; })
      .addCase(signupUser.pending, state => { state.loading = true; state.error = null; })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<User>) => { state.loading = false; state.user = action.payload; })
      .addCase(signupUser.rejected, (state, action) => { state.loading = false; state.error = action.payload ?? 'Signup error'; });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;
