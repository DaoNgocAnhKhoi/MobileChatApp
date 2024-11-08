// src/components/Container.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const Container = ({ children, style }) => {
    const theme = useTheme();
    const { colors } = theme;
  return (
    <View style={[styles.container, { backgroundColor: colors.background }, style]}>
        {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
});

export default Container;
