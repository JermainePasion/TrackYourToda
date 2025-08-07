import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme(); // 'light' or 'dark'
  const [theme, setTheme] = useState(systemColorScheme || 'light');

  useEffect(() => {
    setTheme(systemColorScheme);
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}
