import { StyleSheet, Text, View, Alert, Pressable } from "react-native";
import React, { useContext } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { layout } from "../utils";
import { colors } from "../constants";
import { CurrencyContext } from "../context/context";
import { useFormattedDate } from "../customHooks";

export const BottomComponent = () => {
  const { values, rateFetch } = useContext(CurrencyContext);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => rateFetch()}>
        <MaterialIcons
          name="refresh"
          size={layout.fontPixel(24)}
          color={colors.white}
        />
      </Pressable>
      <View style={styles.textContainer}>
        <Text style={styles.time}>
          {useFormattedDate(values.time_last_update_unix)}
        </Text>
        <Text style={styles.rate}>Last Update</Text>
      </View>
      <Pressable
        onPress={() => {
          Alert.alert(
            "Conversion Rate Data",
            "On free pro plan, data are updated daily"
          );
        }}
      >
        <Ionicons
          name="information-circle-outline"
          size={layout.fontPixel(24)}
          color={colors.white}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: layout.heightPixel(73),
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: layout.pixelSizeHorizontal(20),
    alignItems: "center",
    marginTop: layout.pixelSizeVertical(15),
  },
  time: {
    color: colors.white,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: layout.size.h3,
  },
  rate: {
    color: colors.white,
    fontFamily: "Montserrat_500Medium",
    fontSize: layout.size.h4,
  },
  textContainer: {
    alignItems: "center",
  },
});
