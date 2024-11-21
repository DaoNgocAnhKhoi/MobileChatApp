import * as React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Container from "../components/Container";
import { useDispatch } from "react-redux";
import { login } from "../features/authenticationSlice";
import { AppDispatch } from "../configuration/redux";

export default function Login() {
  const navigator = useNavigation<NavigationProp<any>>();
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = theme;
  const credentials = React.useRef({ username: "", password: "" });

 // Default selected value
 const handleLogin = (e: any) => {
  e.preventDefault();
  dispatch(login(credentials.current));
  console.log("handle")

};
  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../assets/peach.png")} style={styles.logo} />

        {/* Title with text color */}
        <Text style={[styles.title, { color: colors.onSurface }]}>Welcome Back to PeachZy</Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: colors.onSurface }]}>Don't have an account?{" "}
          <Text style={[styles.signUpText, { color: colors.primary }]} onPress={() => {
              navigator.navigate("register");
          }}>Sign Up</Text>
        </Text>

        {/* Form Inputs */}
        <TextInput
          label="Email Address"
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          outlineColor={colors.primary}
          textColor={colors.onSurface}
          keyboardType="email-address"
          onChangeText={(text: string) => {
            credentials.current.username = text;
          }}
        />
        <TextInput
          label="Password"
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          outlineColor={colors.primary}
          textColor={colors.onSurface}
          secureTextEntry
          onChangeText={(text:string) => {
            credentials.current.password = text;
          }}
        />

        {/* Login Button */}
        <Button
          mode="contained"
          style={styles.button}
          buttonColor={colors.primary}
          textColor={colors.onPrimary}
          onPress={(e:any)=>{handleLogin(e)}}
        >
          Login
        </Button>

        {/* Forgot Password Link */}
        <Text style={[styles.forgotPasswordText, { color: colors.primary }]} onPress={() => {
            navigator.navigate("forgotPassword");
        }
        }>Forgot your password?</Text>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,
  },
  signUpText: {
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginBottom: 15,
  },
  button: {
    width: "100%",
    paddingVertical: 8,
    marginBottom: 20,
    marginTop: 10,
  },
  forgotPasswordText: {
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
