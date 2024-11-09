import * as React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { TextInput, RadioButton, Button, useTheme } from "react-native-paper";
import Container from "../components/Container";

export default function Login() {
  const theme = useTheme();
  const { colors } = theme;

  const [gender, setGender] = React.useState("male"); // Default selected value

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../assets/peach.png")} style={styles.logo} />

        {/* Title with text color */}
        <Text style={[styles.title, { color: colors.onSurface }]}>
          Get Started With PeachZy
        </Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: colors.onSurface }]}>
          Already have an account?{" "}
          <Text style={[styles.signInText, { color: colors.primary }]}>
            Sign In
          </Text>
        </Text>

        {/* Form Inputs */}
        <TextInput
          label="First Name"
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          outlineColor={colors.primary}
          textColor={colors.onSurface}
        />
        <TextInput
          label="Last Name"
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          outlineColor={colors.primary}
          textColor={colors.onSurface}
        />

        {/* Gender Selection */}
        <Text style={[styles.genderLabel, { color: colors.onSurface }]}>Gender</Text>
        <View style={styles.radioGroup}>
          <RadioButton.Group
            onValueChange={(value) => setGender(value)}
            value={gender}
          >
            <View style={styles.radioOption}>
              <RadioButton value="male" color={colors.primary} />
              <Text style={[styles.radioLabel, { color: colors.onSurface }]}>
                Male
              </Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="female" color={colors.primary} />
              <Text style={[styles.radioLabel, { color: colors.onSurface }]}>
                Female
              </Text>
            </View>
          </RadioButton.Group>
        </View>

        {/* Additional Inputs */}
        <TextInput
          label="Day of Birth"
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          outlineColor={colors.primary}
          textColor={colors.onSurface}
          keyboardType="numeric"
        />
        <TextInput
          label="Email Address"
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          outlineColor={colors.primary}
          textColor={colors.onSurface}
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          outlineColor={colors.primary}
          textColor={colors.onSurface}
          secureTextEntry
        />
        <TextInput
          label="Confirm Password"
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          outlineColor={colors.primary}
          textColor={colors.onSurface}
          secureTextEntry
        />

        {/* Create Account Button */}
        <Button
          mode="contained"
          style={styles.button}
          buttonColor={colors.primary}
          textColor={colors.onPrimary}
          onPress={() => {}}
        >
          Create Account
        </Button>

        {/* Footer Text */}
        <Text style={[styles.footerText, { color: colors.onSurface }]}>
          I agree to{" "}
          <Text style={[styles.linkText, { color: colors.primary }]}>
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text style={[styles.linkText, { color: colors.primary }]}>
            Privacy Policy
          </Text>
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
  signInText: {
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginBottom: 15,
  },
  genderLabel: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioLabel: {
    marginLeft: 5,
  },
  button: {
    width: "100%",
    paddingVertical: 8,
    marginBottom: 20,
    marginTop: 10,
  },
  footerText: {
    textAlign: "center",
    marginTop: 10,
  },
  linkText: {
    textDecorationLine: "underline",
  },
});
