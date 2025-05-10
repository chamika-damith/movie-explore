
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
}

// Initialize state from localStorage if available, otherwise use dark theme
const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('movieExplorerTheme') as Theme | null;
  if (savedTheme) {
    return savedTheme;
  }
  
  // Default to system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

// Set the initial theme class on document
const initialTheme = getInitialTheme();
document.documentElement.classList.toggle('dark', initialTheme === 'dark');

const initialState: ThemeState = {
  theme: initialTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      localStorage.setItem('movieExplorerTheme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
