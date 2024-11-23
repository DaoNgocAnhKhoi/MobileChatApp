// src/App.js
import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "./src/context/theme-provider";
import Register from "./src/pages/Register";
import Login from "./src/pages/login";
import { useAppTheme } from "./src/hook/use-app-theme";
import DraggableThemeSwitchButton from "./src/components/DraggableThemeSwitchButton";
import { View, StyleSheet, AppState } from "react-native";
import ForgotPassword from "./src/pages/ForgotPassword";
import { AppDispatch, RootState, store } from "./src/configuration/redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import HomeScreen from "./src/pages/ItemPageOfTabHome/Home";
import { Message } from "./src/pages/Message";
import { StompContextProvider } from "./src/pages/ItemPageOfTabHome/StompContext";
import "text-encoding";
import { getToken } from "./src/utils/storeKeychain";
import { getUser } from "./src/features/authenticationSlice";
const Stack = createStackNavigator();

function Navigation() {
  const { navigationTheme } = useAppTheme();
  const { access_token, isAuthenticated, message, user } = useSelector(
    (state: RootState) => state.authentication
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const access_token = await getToken(); // Chờ kết quả trả về từ getToken()

        // Kiểm tra nếu token có hợp lệ
        if (access_token) {
          dispatch(getUser(access_token)); // Gọi dispatch với access_token là string
        }
      } catch (error) {
        console.error("Error fetching token", error);
      }
    };

    fetchToken(); // Gọi hàm async
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer theme={navigationTheme}>
        <View style={styles.container}>
          {isAuthenticated ? (
            <StompContextProvider>
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="Message" component={Message} />
              </Stack.Navigator>
            </StompContextProvider>
          ) : (
            <Stack.Navigator initialRouteName="login">
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
              <Stack.Screen
                name="forgotPassword"
                component={ForgotPassword}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </View>
        <DraggableThemeSwitchButton />
      </NavigationContainer>
    </ThemeProvider>
  );
}
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%", // Ensures the container takes up the full width
    justifyContent: "center",
    backgroundColor: "transparent", // Allow background color from theme
  },
});
