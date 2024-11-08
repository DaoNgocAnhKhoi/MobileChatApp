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

// Common and primary color definitions (same as before)
const PRIMARY = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#0162C4',
  dark: '#007B55',
  darker: '#005249',
};
const PEACH = {
  lighter: "#ffa690",
  light: "#ffa690",
  main: "#ffa690",
  dark: "#ff9378",
  darker: "#ff7957",
};
const GREY = {
  0: '#FFFFFF',
  900: '#161C24',
};

// Define light, dark, and peach themes
const palette = {
  light: {
    ...DefaultLightTheme,
    colors: {
      ...DefaultLightTheme.colors,
      primary: PRIMARY.main,
      background: '#F8FAFF',
      text: GREY[900],
      surface: '#e2e5e9',
      button: {
        color: GREY[900],
        bgcolor: PEACH.dark,
        hvbgcolor: PEACH.darker,
        hvcolor: GREY[900],
      },
    },
    mode: 'exact' as const,
  } as CustomTheme,
  
  dark: {
    ...DefaultDarkTheme,
    colors: {
      ...DefaultDarkTheme.colors,
      primary: PRIMARY.main,
      background: GREY[900],
      text: GREY[0],
      surface: GREY[900],
      button: {
        color: GREY[0],
        bgcolor: PEACH.darker,
        hvbgcolor: PEACH.dark,
      },
    },
    mode: 'exact' as const,
  } as CustomTheme,

  peach: {
    ...DefaultLightTheme,
    colors: {
      ...DefaultLightTheme.colors,
      primary: PEACH.main,
      background: PEACH.light,
      text: GREY[900],
      surface: PEACH.lighter,
      button: {
        color: GREY[900],
        bgcolor: PEACH.main,
        hvbgcolor: PEACH.dark,
      },
    },
    mode: 'exact' as const,
  } as CustomTheme,
};

export const lightTheme = palette.light;
export const darkTheme = palette.dark;
export const peachTheme = palette.peach;
export default palette;
