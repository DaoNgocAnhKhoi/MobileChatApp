// src/components/Container.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";



const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
});
const Container = ({ children, style }) => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <View style={[styles.container, { backgroundColor: colors.background }, style]}>
      {children}
    </View>
  );
};

export default Container;
