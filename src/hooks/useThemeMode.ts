
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { toggleTheme } from '@/store/slices/themeSlice';

export const useThemeMode = () => {
  const { theme } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  return {
    theme,
    toggleTheme: () => dispatch(toggleTheme()),
  };
};
