import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { layout } from "../utils";
import { colors } from "../constants";

export const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={layout.fontPixel(50)} color={colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    zIndex: 10,
  },
});
