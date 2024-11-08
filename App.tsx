// src/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './src/context/theme-provider';
import Login from './src/pages/login';
import { useAppTheme } from './src/hook/use-app-theme';
import DraggableThemeSwitchButton from './src/components/DraggableThemeSwitchButton';
const Stack = createStackNavigator();

export default function App() {
  const { navigationTheme } = useAppTheme();

  return (
    <ThemeProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
        <DraggableThemeSwitchButton/>
      </NavigationContainer>
    </ThemeProvider>
  );
}
