import * as React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Container from "../components/Container";
import { useDispatch } from "react-redux";
import { login } from "../features/authenticationSlice";
import { AppDispatch } from "../configuration/redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email("Invalid email address.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

export default function Login() {
  const navigator = useNavigation<NavigationProp<any>>();
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = theme;

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    dispatch(login(data));
    console.log("Logging in with: ", data);
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../assets/peach.png")} style={styles.logo} />

        <Text style={[styles.title, { color: colors.onSurface }]}>
          Welcome Back to PeachZy
        </Text>

        <Text style={[styles.subtitle, { color: colors.onSurface }]}>
          Don't have an account?{" "}
          <Text
            style={[styles.signUpText, { color: colors.primary }]}
            onPress={() => {
              navigator.navigate("register");
            }}
          >
            Sign Up
          </Text>
        </Text>

        {/* Email Address */}
        <Controller
          name="username"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Email Address"
              style={[styles.input, { backgroundColor: colors.surface }]}
              mode="outlined"
              outlineColor={colors.primary}
              textColor={colors.onSurface}
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.username && (
          <Text style={styles.errorText}>{errors.username.message}</Text>
        )}

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Password"
              style={[styles.input, { backgroundColor: colors.surface }]}
              mode="outlined"
              outlineColor={colors.primary}
              textColor={colors.onSurface}
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <Button
          mode="contained"
          style={styles.button}
          buttonColor={colors.primary}
          textColor={colors.onPrimary}
          onPress={handleSubmit(onSubmit)} // Submit the form using handleSubmit
        >
          Login
        </Button>

        <Text
          style={[styles.forgotPasswordText, { color: colors.primary }]}
          onPress={() => {
            navigator.navigate("forgotPassword");
          }}
        >
          Forgot your password?
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
  },
  signUpText: {
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginBottom: 10, // Add some space between input and error text
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
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 10, // Space between error text and next input
  },
});
