import { MD3LightTheme as DefaultLightTheme, MD3DarkTheme as DefaultDarkTheme } from 'react-native-paper';

const PEACH = {
  lighter: '#FFE6E1',
  light: '#FFC1B6',
  main: '#FF8A75',
  dark: '#FF6450',
  darker: '#CC4E3D',
};

const GREY = {
  0: '#FFFFFF',
  900: '#161C24',
};

const palette = {
  light: {
    ...DefaultLightTheme,
    colors: {
      ...DefaultLightTheme.colors,
      primary: PEACH.main,
      background: PEACH.lighter,
      text: GREY[900], // Now explicitly part of MD3Colors
      surface: PEACH.light,
      button: {
        color: GREY[900],
        bgcolor: PEACH.main,
        hvbgcolor: PEACH.dark,
        hvcolor: GREY[900],
      },
    },
    mode: 'exact' as const,
  },

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
  },
};

export const lightTheme = palette.light;
export const darkTheme = palette.dark;
export default palette;
