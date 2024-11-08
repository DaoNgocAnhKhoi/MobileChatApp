import * as React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, RadioButton, Button, useTheme } from 'react-native-paper';

export default function Login() {
  const theme = useTheme();
  const { colors } = theme;

  const [gender, setGender] = React.useState('male'); // Default selected value

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={require('../assets/peach.png')} style={styles.logo} />
      
      {/* Title with peach color */}
        <Text style={[styles.title, { color: colors.text }]}>Get Started With PeachZy</Text>
      
      {/* Subtitle with peach color */}
      <Text style={styles.subtitle}>
        Already have an account?{' '}
        <Text style={[styles.signInText, { color: colors.primary }]}>Sign In</Text>
      </Text>

      {/* Form Inputs */}
      <TextInput label="First Name" style={styles.input} mode="outlined" />
      <TextInput label="Last Name" style={styles.input} mode="outlined" />

      {/* Gender Selection */}
      <View style={styles.radioGroup}>
        <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
          <View style={styles.radioOption}>
            <RadioButton value="male" color={colors.primary} />
            <Text style={[styles.radioLabel, { color: colors.primary }]}>Male</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="female" color={colors.primary} />
            <Text style={[styles.radioLabel, { color: colors.primary }]}>Female</Text>
          </View>
        </RadioButton.Group>
      </View>

      {/* Date of Birth and Email Address */}
      <TextInput label="Day of Birth" style={styles.input} mode="outlined" keyboardType="numeric" />
      <TextInput label="Email Address" style={styles.input} mode="outlined" keyboardType="email-address" />
      <TextInput label="Password" style={styles.input} mode="outlined" secureTextEntry />
      <TextInput label="Confirm Password" style={styles.input} mode="outlined" secureTextEntry />

      {/* Create Account Button */}
      <Button mode="contained" style={styles.button} buttonColor={colors.primary} onPress={() => {}}>
        Create Account
      </Button>

      {/* Footer Text with links in peach color */}
      <Text style={styles.footerText}>
        I agree to <Text style={[styles.linkText, { color: colors.primary }]}>Terms of Service</Text> and{' '}
        <Text style={[styles.linkText, { color: colors.primary }]}>Privacy Policy</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,
  },
  signInText: {
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 5,
  },
  button: {
    width: '100%',
    paddingVertical: 8,
    marginBottom: 20,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 10,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
});
