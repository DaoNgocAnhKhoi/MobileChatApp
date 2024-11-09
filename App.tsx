// src/App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "./src/context/theme-provider";
import Register from "./src/pages/Register";
import Login from "./src/pages/login";
import { useAppTheme } from "./src/hook/use-app-theme";
import DraggableThemeSwitchButton from "./src/components/DraggableThemeSwitchButton";
import { View, StyleSheet  } from "react-native";
const Stack = createStackNavigator();

export default function App() {
  const { navigationTheme } = useAppTheme();

  return (
    <ThemeProvider>
      <NavigationContainer theme={navigationTheme}>
        <View style={styles.container}>
          <Stack.Navigator initialRouteName="register">
            <Stack.Screen
              name="register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="login"
              component={Login}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </View>
        <DraggableThemeSwitchButton />
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', // Ensures the container takes up the full width
    justifyContent: "center",
    backgroundColor: "transparent", // Allow background color from theme
  },
});