import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  colors: typeof themeColors.light;
}

const themeColors = {
  light: {
    background: '#f2f2f2',
    cardBackground: '#ffffff',
    text: '#111',
    textSecondary: '#666',
    border: '#ddd',
  },
  dark: {
    background: '#121212',
    cardBackground: '#1e1e1e',
    text: '#fff',
    textSecondary: '#aaa',
    border: '#333',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  const loadTheme = useCallback(async () => {
    const storedTheme = await AsyncStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setMode(storedTheme);
    }
  }, []);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  const toggleTheme = async () => {
    const newTheme = mode === 'light' ? 'dark' : 'light';
    setMode(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleTheme,
        colors: themeColors[mode],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useTheme must be used inside ThemeProvider'
    );
  }
  return context;
};
