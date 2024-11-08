// src/palette.ts
import { MD3LightTheme as DefaultLightTheme, MD3DarkTheme as DefaultDarkTheme } from 'react-native-paper';

type CustomTheme = typeof DefaultLightTheme & {
  colors: {
    button: {
      color: string;
      bgcolor: string;
      hvbgcolor: string;
      hvcolor?: string;
    };
  };
  mode: 'exact' | 'adaptive';
};

// Giữ lại bảng màu PEACH đã thiết kế
const PEACH = {
  lighter: '#FFE6E1',  // Lightest peach shade for backgrounds
  light: '#FFC1B6',    // Lighter peach for light theme surfaces
  main: '#FF8A75',     // Main peach color for primary elements
  dark: '#FF6450',     // Darker peach for dark theme buttons
  darker: '#CC4E3D',   // Darkest peach for high contrast
};
const GREY = {
  0: '#FFFFFF',
  900: '#161C24',
};

// Define light and dark themes
const palette = {
  light: {
    ...DefaultLightTheme,
    colors: {
      ...DefaultLightTheme.colors,
      primary: PEACH.main,
      background: PEACH.lighter,
      text: GREY[900],
      surface: PEACH.light,
      button: {
        color: GREY[900],
        bgcolor: PEACH.main,
        hvbgcolor: PEACH.dark,
        hvcolor: GREY[900],
      },
    },
    mode: 'exact' as const,
  } as CustomTheme,
  
  dark: {
    ...DefaultDarkTheme,
    colors: {
      ...DefaultDarkTheme.colors,
      primary: PEACH.main,
      background: GREY[900],
      text: GREY[0],
      surface: PEACH.darker,
      button: {
        color: GREY[0],
        bgcolor: PEACH.dark,
        hvbgcolor: PEACH.darker,
      },
    },
    mode: 'exact' as const,
  } as CustomTheme,
};

export const lightTheme = palette.light;
export const darkTheme = palette.dark;
export default palette;
