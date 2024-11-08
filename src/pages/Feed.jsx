import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
export default function Feed() {
  const [text, setText] = React.useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Email"
        value={text}
        onChangeText={(text) => setText(text)}
        style={{
          width: "80%",
          marginHorizontal: "auto",
        }}
        left={<TextInput.Icon icon="account" />}
      />

      <TextInput
        label="Password"
        secureTextEntry
        value={text}
        onChangeText={(text) => setText(text)}
        style={{
          width: "80%",
          marginTop: 30,
          marginHorizontal: "auto",
        }}
        left={<TextInput.Icon icon="lock" />}
        right={<TextInput.Icon icon="eye" />}
      />
      <Button
        mode="contained"
        onPress={() => console.log("Pressed")}
        style={{backgroundColor: 'black', width: '60%', marginHorizontal: 'auto', marginVertical: 30}}
      >
       LOGIN
      </Button>
      <Text style={{ textAlign: "center", fontSize: 17, fontWeight: "bold"}}>
        For got your password?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 100,
    textTransform: "uppercase",
  },

  container: {
    backgroundColor: "#FBCB00",
    height: "100%",
  },
});
