import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { layout } from "../utils";
import { colors } from "../constants";
import { CurrencyContext } from "../context/context";
import { useNavigation } from "@react-navigation/native";

export const ConverterHeader = () => {
  const {
    amounts,
    updateTypingPosition,
    valueSwitch,
    currency,
    flow,
    setFlow,
    updateCurrency,
  } = useContext(CurrencyContext);

  const flowHandler = (type) => {
    setFlow(type);
  };
  const { goBack } = useNavigation();

  const newFrom = amounts.from.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
  const newTo = amounts.to.replace(/^\s+|\s+$|\s+(?=\s)/g, "");

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Pressable onPress={() => goBack()} style={styles.topIcontainer}>
          <Entypo
            name="chevron-left"
            size={layout.fontPixel(24)}
            color={colors.white}
          />
        </Pressable>
        <Text style={styles.title}>Converter</Text>
        <View style={styles.topIcontainer}>
          <MaterialCommunityIcons
            name="dots-hexagon"
            size={layout.fontPixel(24)}
            color={colors.white}
          />
        </View>
      </View>

      <View style={styles.displayContainer}>
        <Pressable
          onPress={() => {
            // updateTypingPosition("from");
          }}
          style={styles.fromContainer}
        >
          <Pressable
            onPress={() => {
              flowHandler("from");
            }}
            style={styles.leftFromContainer}
          >
            <Text style={styles.currency}>{currency?.from}</Text>
          </Pressable>
          <View style={styles.rightFromContainer}>
            <Text style={styles.flow}>From</Text>
            <Text
              style={[
                styles.amount,
                {
                  fontSize:
                    amounts.from.toString().length < 16
                      ? layout.size.h2
                      : layout.size.h3,
                },
              ]}
            >
              {newFrom}
            </Text>
          </View>
        </Pressable>

        <Pressable
          // onPress={() => updateTypingPosition("to")}
          style={styles.toContainer}
        >
          <Pressable
            onPress={() => flowHandler("to")}
            style={styles.leftToContainer}
          >
            <Text style={styles.currency}>{currency?.to}</Text>
          </Pressable>
          <View style={styles.rightToContainer}>
            <Text style={styles.flow}>To</Text>
            <Text
              style={[
                styles.amount,
                {
                  fontSize:
                    amounts.to.toString().length < 16
                      ? layout.size.h2
                      : layout.size.h3,
                },
              ]}
            >
              {newTo}
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => valueSwitch()}
          style={styles.swipeIconContainer}
        >
          <Ionicons
            name="swap-vertical"
            size={layout.fontPixel(24)}
            color={colors.white}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: layout.pixelSizeHorizontal(20),
    paddingTop: layout.pixelSizeVertical(15),
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: layout.size.h3,
    color: colors.white,
  },
  topIcontainer: {
    paddingVertical: layout.pixelSizeVertical(7),
    paddingHorizontal: layout.pixelSizeHorizontal(6),
    borderRadius: layout.fontPixel(20),
    backgroundColor: colors.secondary,
  },
  displayContainer: {
    marginTop: layout.pixelSizeVertical(28),
  },
  fromContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: layout.pixelSizeVertical(5),
    position: "relative",
  },
  toContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: -1,
  },
  leftFromContainer: {
    width: "19%",
    paddingVertical: layout.pixelSizeVertical(30),
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: layout.fontPixel(20),
  },
  rightFromContainer: {
    width: "80%",
    paddingVertical: layout.pixelSizeVertical(30),
    backgroundColor: colors.secondary,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: layout.pixelSizeHorizontal(16),
    borderRadius: layout.fontPixel(20),
    alignItems: "center",
  },
  leftToContainer: {
    width: "19%",
    paddingVertical: layout.pixelSizeVertical(30),
    backgroundColor: colors.tertiary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: layout.fontPixel(20),
  },
  rightToContainer: {
    width: "80%",
    paddingVertical: layout.pixelSizeVertical(30),
    backgroundColor: colors.tertiary,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: layout.pixelSizeHorizontal(16),
    borderRadius: layout.fontPixel(20),
    alignItems: "center",
  },
  currency: {
    fontFamily: "Montserrat_700Bold",
    fontSize: layout.size.h2,
    color: colors.white,
  },
  amount: {
    fontFamily: "Montserrat_700Bold",
    // fontSize: layout.size.h2,
    color: colors.white,
    width: "80%",
    textAlign: "right",
  },
  flow: {
    fontFamily: "Montserrat_400Regular",
    fontSize: layout.size.h4,
    color: colors.grayText,
    width: "20%",
  },
  swipeIconContainer: {
    position: "absolute",
    paddingVertical: layout.pixelSizeVertical(10),
    paddingHorizontal: layout.pixelSizeHorizontal(10),
    borderRadius: layout.fontPixel(25),
    backgroundColor: colors.tertiary,
    left: "14%",
    top: "34%",
    borderColor: colors.primary,
    borderWidth: layout.widthPixel(2),
  },
});
