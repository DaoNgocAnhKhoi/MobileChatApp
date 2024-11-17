import * as React from "react";
import { Text, StyleSheet, Image, ScrollView } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import Container from "../components/Container";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export default function ForgotPassword() {
  const theme = useTheme();
  const { colors } = theme;
  const navigator = useNavigation<NavigationProp<any>>();

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../assets/peach.png")} style={styles.logo} />

        {/* Title with text color */}
        <Text style={[styles.title, { color: colors.onSurface }]}>Forgot Your Password?</Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: colors.onSurface }]}>Enter your email address and we'll send you a link to reset your password.</Text>

        {/* Email Input */}
        <TextInput
          label="Email Address"
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          outlineColor={colors.primary}
          textColor={colors.onSurface}
          keyboardType="email-address"
        />

        {/* Send Reset Link Button */}
        <Button
          mode="contained"
          style={styles.button}
          buttonColor={colors.primary}
          textColor={colors.onPrimary}
          onPress={() => {
            // Logic to handle sending reset link goes here
          }}
        >
          Send Reset Link
        </Button>

        {/* Back to Login Link */}
        <Text
          style={[styles.backToLoginText, { color: colors.primary }]}
          onPress={() => {
            navigator.navigate("login");
        }}>
          Back to Login
        </Text>
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
    textAlign: "center",
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
  backToLoginText: {
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});