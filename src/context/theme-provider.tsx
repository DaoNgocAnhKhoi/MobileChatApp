// src/context/theme-provider.tsx
import React, { createContext, useContext, useMemo, useState, useEffect, ReactNode } from 'react';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, Theme as NavigationTheme } from '@react-navigation/native';
import { MD3DarkTheme as PaperDarkTheme, MD3LightTheme as PaperDefaultTheme, Provider as PaperProvider, MD3Theme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import merge from 'deepmerge';
import palette from '../theme/pallete';

interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  navigationTheme: NavigationTheme;
  paperTheme: MD3Theme;
}

const defaultThemeContext: ThemeContextType = { 
  isDarkTheme: false,
  toggleTheme: () => {},
  navigationTheme: NavigationDefaultTheme,
  paperTheme: PaperDefaultTheme,
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export const useAppTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const loadThemePreference = async () => {
      const savedTheme = await AsyncStorage.getItem('themePreference');
      setIsDarkTheme(savedTheme === 'dark');
    };
    loadThemePreference();
  }, []);

  const toggleTheme = async () => {
    setIsDarkTheme((prev) => !prev);
    await AsyncStorage.setItem('themePreference', !isDarkTheme ? 'dark' : 'light');
  };

  const themeValue = useMemo<ThemeContextType>(() => {
    const paperTheme: MD3Theme = isDarkTheme
      ? {
          ...PaperDarkTheme,
          colors: { ...PaperDarkTheme.colors, ...palette.dark.colors },
          dark: true,
          roundness: PaperDarkTheme.roundness,
          animation: PaperDarkTheme.animation,
        }
      : {
          ...PaperDefaultTheme,
          colors: { ...PaperDefaultTheme.colors, ...palette.light.colors },
          dark: false,
          roundness: PaperDefaultTheme.roundness,
          animation: PaperDefaultTheme.animation,
        };

    const navigationTheme = isDarkTheme
      ? { ...NavigationDarkTheme, colors: { ...NavigationDarkTheme.colors, primary: palette.dark.colors.primary } }
      : { ...NavigationDefaultTheme, colors: { ...NavigationDefaultTheme.colors, primary: palette.light.colors.primary } };

    return {
      isDarkTheme,
      toggleTheme,
      paperTheme,
      navigationTheme,
    };
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <PaperProvider theme={themeValue.paperTheme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};
