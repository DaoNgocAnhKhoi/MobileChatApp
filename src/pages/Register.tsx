import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { TextInput, RadioButton, Button, useTheme } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Container from "../components/Container";
import { Credentials, UserInformations } from "../api/accountApi";
import accountApi from "../api/accountApi";

export default function Register() {
  const navigator = useNavigation<NavigationProp<any>>();
  const theme = useTheme();
  const { colors } = theme;

  // State cho các trường form
  const [firstName, setFirstName] = useState("John"); // Giá trị mặc định
  const [lastName, setLastName] = useState("Doe"); // Giá trị mặc định
  const [email, setEmail] = useState("johndoe@example.com"); // Giá trị mặc định
  const [password, setPassword] = useState("12345678"); // Giá trị mặc định
  const [confirmPassword, setConfirmPassword] = useState("12345678"); // Giá trị mặc định
  const [birthDate, setBirthDate] = useState<Date | null>(new Date("2000-01-01")); // Giá trị mặc định
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState<"male" | "female">("male"); // Giá trị mặc định

  // Hàm xử lý sự kiện tạo tài khoản
  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword || !birthDate) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      const credentials: Credentials = {
        username: email,
        password,
      };

      const userInformations: UserInformations = {
        firstName,
        lastName, // Thêm lastName để đồng bộ với backend
        email,
        gender,
        birthDate: birthDate.toISOString().split("T")[0], // Chuyển sang định dạng YYYY-MM-DD
      };

      const response = await accountApi.fetchRegister(credentials, userInformations);

      if (response && response.message === "User registered successfully") {
        Alert.alert("Success", response.message);
        navigator.navigate("login");
      } else {
        Alert.alert("Error", response.message || "Unknown error occurred");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  // Hàm xử lý khi chọn ngày
  const onDateConfirm = (selectedDate: Date) => {
    setBirthDate(selectedDate); // Lưu ngày đã chọn
    setShowDatePicker(false); // Ẩn modal
  };

  const onDateCancel = () => {
    setShowDatePicker(false); // Ẩn modal khi bấm Cancel
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../assets/peach.png")} style={styles.logo} />

        <Text style={[styles.title, { color: colors.onSurface }]}>
          Get Started With PeachZy
        </Text>

        <Text style={[styles.subtitle, { color: colors.onSurface }]}>
          Already have an account?{" "}
          <Text
            style={[styles.signInText, { color: colors.primary }]}
            onPress={() => navigator.navigate("login")}
          >
            Sign In
          </Text>
        </Text>

        <TextInput
          label="First Name"
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          label="Last Name"
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={[styles.genderLabel, { color: colors.onSurface }]}>Gender</Text>
        <View style={styles.radioGroup}>
          <RadioButton.Group onValueChange={(value) => setGender(value as "male" | "female")} value={gender}>
            <View style={styles.radioOption}>
              <RadioButton value="male" color={colors.primary} />
              <Text style={[styles.radioLabel, { color: colors.onSurface }]}>Male</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="female" color={colors.primary} />
              <Text style={[styles.radioLabel, { color: colors.onSurface }]}>Female</Text>
            </View>
          </RadioButton.Group>
        </View>

        {/* Date Picker */}
        <Text style={[styles.dateLabel, { color: colors.onSurface }]}>Date of Birth:</Text>
        <Text
          style={[styles.dateDisplay, { color: colors.primary }]}
          onPress={() => setShowDatePicker(true)}
        >
          {birthDate ? birthDate.toISOString().split("T")[0] : "Select Date"}
        </Text>
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          onConfirm={onDateConfirm}
          onCancel={onDateCancel}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
        />

        <TextInput
          label="Email Address"
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          label="Password"
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          label="Confirm Password"
          style={[styles.input, { backgroundColor: colors.surface }]}
          mode="outlined"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Button mode="contained" style={styles.button} onPress={handleRegister}>
          Create Account
        </Button>

        <Text style={[styles.footerText, { color: colors.onSurface }]}>
          I agree to{" "}
          <Text style={[styles.linkText, { color: colors.primary }]}>Terms of Service</Text> and{" "}
          <Text style={[styles.linkText, { color: colors.primary }]}>Privacy Policy</Text>
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
  dateLabel: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
    alignSelf: "flex-start",
  },
  dateDisplay: {
    fontSize: 16,
    marginBottom: 15,
    textDecorationLine: "underline",
  },
});
