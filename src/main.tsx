// src/Main.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import App from "../App";
import { useAppTheme } from "./context/theme-provider";
import { Provider } from "react-redux";
import { store } from "./configuration/redux";

export default function Main() {
  console.log("A")
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  );
}

// ThemedApp uses `useAppTheme` to get `paperTheme` and `navigationTheme`
function ThemedApp() {
  const { paperTheme, navigationTheme } = useAppTheme();
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navigationTheme}>
        <App />
      </NavigationContainer>
    </PaperProvider>
  );
}
