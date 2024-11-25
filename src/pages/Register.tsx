import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { TextInput, RadioButton, Button, useTheme } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Container from "../components/Container";
import { Credentials } from "../api/accountApi";
import { UserInformations } from "../features/authenticationSlice";
import accountApi from "../api/accountApi";
// import { ObjectId } from "bson";
// import { v4 as uuidv4 } from "uuid";
import { generateObjectId } from "../utils/generatedObjectId";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required."),
  lastName: Yup.string().required("Last Name is required."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters.")
    .matches(/[A-Za-z]/, "Password must contain letters.")
    .matches(/\d/, "Password must contain numbers.")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match.")
    .required("Confirm Password is required."),
  birthDate: Yup.date()
    .required("Birth Date is required.")
    .max(new Date(), "Birth Date must be in the past."),
  gender: Yup.string()
    .oneOf(["male", "female"], "Please select a valid gender.")
    .required("Gender is required."),
});

export default function Register() {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigator = useNavigation<NavigationProp<any>>();
  const theme = useTheme();
  const { colors } = theme;

  // Sử dụng useForm từ React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthDate: Date;
    gender: "male" | "female"; // Đảm bảo kiểu chính xác
  }>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "12345678",
      confirmPassword: "12345678",
      birthDate: new Date("2000-01-01"),
      gender: "male", // Phải là "male" hoặc "female"
    },
  });
  

  const onSubmit = async (data: any) => {
    try {
      const credentials: Credentials = {
        username: data.email,
        password: data.password,
      };

      const userInformations: UserInformations = {
        id: generateObjectId(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender,
        birthDate: data.birthDate,
        active: true,
        updatedAt: new Date().toISOString(),
      };

      const response = await accountApi.fetchRegister(
        credentials,
        userInformations
      );

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

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../assets/peach.png")} style={styles.logo} />

        <Text style={[styles.title, { color: colors.onSurface }]}>
          Get Started With PeachZy
        </Text>

        {/* Sử dụng Controller cho từng trường */}
        <Controller
          name="firstName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="First Name"
              style={[styles.input, { backgroundColor: colors.surface }]}
              mode="outlined"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.firstName && (
          <Text style={styles.errorText}>{errors.firstName.message}</Text>
        )}

        <Controller
          name="lastName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Last Name"
              style={[styles.input, { backgroundColor: colors.surface }]}
              mode="outlined"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.lastName && (
          <Text style={styles.errorText}>{errors.lastName.message}</Text>
        )}

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Email Address"
              style={[styles.input, { backgroundColor: colors.surface }]}
              mode="outlined"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Password"
              style={[styles.input, { backgroundColor: colors.surface }]}
              mode="outlined"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Confirm Password"
              style={[styles.input, { backgroundColor: colors.surface }]}
              mode="outlined"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
        )}

        <Controller
          name="birthDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <Text
                style={[styles.dateDisplay, { color: colors.primary }]}
                onPress={() => setShowDatePicker(true)}
              >
                {value ? value.toISOString().split("T")[0] : "Select Date"}
              </Text>
              <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                onConfirm={(date) => {
                  onChange(date);
                  setShowDatePicker(false);
                }}
                onCancel={() => setShowDatePicker(false)}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
              />
            </>
          )}
        />
        {errors.birthDate && (
          <Text style={styles.errorText}>{errors.birthDate.message}</Text>
        )}

        <Controller
          name="gender"
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group
              onValueChange={(value) => onChange(value as "male" | "female")}
              value={value}
            >
              <View style={styles.radioGroup}>
                <View style={styles.radioOption}>
                  <RadioButton value="male" color={colors.primary} />
                  <Text style={styles.radioLabel}>Male</Text>
                </View>
                <View style={styles.radioOption}>
                  <RadioButton value="female" color={colors.primary} />
                  <Text style={styles.radioLabel}>Female</Text>
                </View>
              </View>
            </RadioButton.Group>
          )}
        />

        {errors.gender && (
          <Text style={styles.errorText}>{errors.gender.message}</Text>
        )}

        <Button
          mode="contained"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          Create Account
        </Button>
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    height: 16, // Chiều cao cố định cho lỗi
  },
});
