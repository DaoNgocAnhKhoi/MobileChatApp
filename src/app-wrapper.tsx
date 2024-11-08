// src/AppWrapper.js
import React from 'react';
import { ThemeProvider } from './context/theme-provider';
import Main from './main';

export default function AppWrapper() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}
