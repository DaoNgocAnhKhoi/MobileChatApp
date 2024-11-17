// src/screens/ChangePassword.tsx
import * as React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import Container from "../components/Container";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export default function ChangePassword() {
  const theme = useTheme();
  const { colors } = theme;
  const navigator = useNavigation<NavigationProp<any>>();

  // State for password fields
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  // Function to handle password change
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    setError("");
    // Logic to handle password change (e.g., API call) goes here
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Title */}
        <Text style={[styles.title, { color: colors.onSurface }]}>Change Password</Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: colors.onSurface }]}>
          Please enter your current password and choose a new password.
        </Text>

        {/* Old Password Input */}
        <TextInput
          label="Current Password"
          value={oldPassword}
          onChangeText={setOldPassword}
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          secureTextEntry
          outlineColor={colors.primary}
          textColor={colors.onSurface}
        />

        {/* New Password Input */}
        <TextInput
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          secureTextEntry
          outlineColor={colors.primary}
          textColor={colors.onSurface}
        />

        {/* Confirm New Password Input */}
        <TextInput
          label="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          secureTextEntry
          outlineColor={colors.primary}
          textColor={colors.onSurface}
        />

        {/* Error Message */}
        {error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}

        {/* Change Password Button */}
        <Button
          mode="contained"
          style={styles.button}
          buttonColor={colors.primary}
          textColor={colors.onPrimary}
          onPress={handleChangePassword}
        >
          Change Password
        </Button>

        {/* Back to Settings Link */}
        <Text
          style={[styles.backToSettingsText, { color: colors.primary }]}
          onPress={() => {
            navigator.navigate("settings");
          }}
        >
          Back to Settings
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
  backToSettingsText: {
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
