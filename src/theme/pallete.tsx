import { MD3LightTheme as DefaultLightTheme, MD3DarkTheme as DefaultDarkTheme } from 'react-native-paper';

const PEACH = {
  lighter: '#FFEFEA',  // Light background in light mode
  light: '#FFD1C6',    // Input surfaces in light mode
  main: '#FF8A75',     // Primary peach color for buttons, highlights
  dark: '#FF6B52',     // Primary accent for dark mode
  darker: '#CC4A3A',   // Darker peach for high contrast elements in dark mode
};

const GREY = {
  lightText: '#333333',     // Dark text for light mode
  darkText: '#EAEAEA',      // Slightly softened light text for dark mode
  background: '#121212',    // Soft black for dark mode background
  surface: '#FAFAFA',       // Light surface for light mode
  darkSurface: '#1E1E1E',   // Darker surface for dark mode
};

const palette = {
  light: {
    ...DefaultLightTheme,
    colors: {
      ...DefaultLightTheme.colors,
      primary: PEACH.main,
      background: PEACH.lighter,  // Light mode background
      surface: GREY.surface,      // Light mode surface color
      onSurface: GREY.lightText,  // Text color in light mode
      text: GREY.darkText,     // Dark text for light mode
      button: {
        color: GREY.lightText,
        bgcolor: PEACH.main,
        hvbgcolor: PEACH.dark,
        hvcolor: GREY.lightText,
      },
    },
    mode: 'exact' as const,
  },

  dark: {
    ...DefaultDarkTheme,
    colors: {
      ...DefaultDarkTheme.colors,
      primary: PEACH.main,        // Main peach color as the primary
      background: GREY.background, // Dark mode background
      surface: GREY.darkSurface,   // Darker surface color for dark mode
      onSurface: GREY.darkText,    // Softened light text for readability
      text: GREY.lightText,      // Dark text for light mode
      button: {
        color: GREY.darkText,
        bgcolor: PEACH.dark,
        hvbgcolor: PEACH.darker,
      },
    },
    mode: 'exact' as const,
  },
};

export const lightTheme = palette.light;
export const darkTheme = palette.dark;
export default palette;
