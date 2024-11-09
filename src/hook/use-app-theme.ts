// src/hook/useAppTheme.js
import { useContext } from 'react';
import { ThemeContext } from '../context/theme-provider';

export const useAppTheme = () => useContext(ThemeContext);
