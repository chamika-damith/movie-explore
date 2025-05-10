
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  username: string;
  isAuthenticated: boolean;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

// Get initial user from localStorage if available
const getSavedUser = (): User | null => {
  const savedUser = localStorage.getItem('movieExplorerUser');
  return savedUser ? JSON.parse(savedUser) : null;
};

const initialState: AuthState = {
  user: getSavedUser(),
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
      localStorage.setItem('movieExplorerUser', JSON.stringify(action.payload));
    },
    logoutSuccess: (state) => {
      state.user = null;
      localStorage.removeItem('movieExplorerUser');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, logoutSuccess, setLoading } = authSlice.actions;
export default authSlice.reducer;
