// src/screens/EnterOTP.tsx
import * as React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import Container from "../components/Container";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export default function EnterOTP() {
  const theme = useTheme();
  const { colors } = theme;
  const navigator = useNavigation<NavigationProp<any>>();

  const [otp, setOtp] = React.useState("");
  const [error, setError] = React.useState("");
  const [timer, setTimer] = React.useState(30); // 30 seconds timer
  const [isResendDisabled, setIsResendDisabled] = React.useState(true);

  React.useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleVerifyOTP = () => {
    if (otp.length !== 6) { // Assuming a 6-digit OTP
      setError("OTP must be 6 digits.");
      return;
    }
    setError("");
    // Logic to verify OTP (e.g., API call) goes here
  };

  const handleResendOTP = () => {
    setTimer(30); // Reset timer to 30 seconds
    setIsResendDisabled(true);
    setOtp("");
    // Logic to resend OTP (e.g., API call) goes here
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Title */}
        <Text style={[styles.title, { color: colors.onSurface }]}>Enter OTP</Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: colors.onSurface }]}>
          Please enter the OTP sent to your email or phone number.
        </Text>

        {/* OTP Input */}
        <TextInput
          label="OTP"
          value={otp}
          onChangeText={setOtp}
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          outlineColor={colors.primary}
          textColor={colors.onSurface}
          keyboardType="numeric"
          maxLength={6}
        />

        {/* Error Message */}
        {error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}

        {/* Verify OTP Button */}
        <Button
          mode="contained"
          style={styles.button}
          buttonColor={colors.primary}
          textColor={colors.onPrimary}
          onPress={handleVerifyOTP}
        >
          Verify OTP
        </Button>

        {/* Resend OTP Link */}
        <View style={styles.resendContainer}>
          <Text style={[styles.resendText, { color: colors.primary }]} onPress={handleResendOTP} disabled={isResendDisabled}>
            Resend OTP
          </Text>
          {isResendDisabled && <Text style={{ color: colors.onSurface }}> ({timer}s)</Text>}
        </View>
        
        {/* Back to Login Link */}
        <Text
          style={[styles.backToLoginText, { color: colors.primary }]}
          onPress={() => {
            navigator.navigate("login");
          }}
        >
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
  errorText: {
    marginBottom: 10,
    textAlign: "center",
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  resendText: {
    textDecorationLine: "underline",
  },
  backToLoginText: {
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
