import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { layout } from "../utils";

export const Error = ({ retry, info, errorMsg }) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>
        Oops! Something went wrong while processing your request. Please try
        again in a moment.
      </Text>
      {errorMsg && <Text style={styles.errorMsg}>{`Error: ${errorMsg}`}</Text>}
      {info && <Text style={styles.errorMsg}>{`Info: ${info}`}</Text>}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.reportBtn}
          onPress={() => retry()}
        >
          <Text style={styles.reportText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.reloadBtn}
          onPress={() => {
            retry();
          }}
        >
          <Text style={styles.tryAgainText}>Try again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: layout.pixelSizeHorizontal(36),
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: layout.pixelSizeVertical(20),
  },
  reloadBtn: {
    paddingVertical: layout.pixelSizeVertical(10),
    paddingHorizontal: layout.pixelSizeHorizontal(30),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#169FED",
    borderRadius: layout.fontPixel(10),
  },
  reportText: {
    color: "#169FED",
    fontFamily: "Montserrat_400Regular",
    fontSize: layout.fontPixel(15),
    lineHeight: layout.fontPixel(22),
    textAlign: "center",
  },
  tryAgainText: {
    color: "#fff",
    fontFamily: "Montserrat_400Regular",
    fontSize: layout.fontPixel(15),
    lineHeight: layout.fontPixel(22),
    textAlign: "center",
  },
  reportBtn: {
    backgroundColor: "transparent",
    paddingVertical: layout.pixelSizeVertical(10),
    paddingHorizontal: layout.pixelSizeHorizontal(30),
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#169FED",
    borderWidth: 1,
    borderRadius: layout.fontPixel(10),
  },
  errorText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: layout.fontPixel(15),
    lineHeight: layout.fontPixel(22),
    textAlign: "center",
    marginVertical: layout.pixelSizeVertical(4),
    color: "#808080",
  },
  errorMsg: {
    fontFamily: "Montserrat_500Medium",
    fontSize: layout.fontPixel(15),
    lineHeight: layout.fontPixel(22),
    textAlign: "center",
    marginVertical: layout.pixelSizeVertical(4),
    color: "#808080",
  },
});
