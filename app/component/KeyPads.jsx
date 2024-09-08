import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { layout } from "../utils";
import { pads } from "../constants/data";
import { colors } from "../constants";
import { CurrencyContext } from "../context/context";

export const KeyPads = () => {
  const {
    keyHandler,
    clearHandler,
    deleteHandler,
    flow,
    setFlow,
    currency,
    updateCurrency,
    valuesArray,
  } = useContext(CurrencyContext);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: layout.pixelSizeVertical(10),
        }}
        numColumns={4}
        data={flow ? valuesArray.slice(0, 12) : pads}
        renderItem={({ item, index }) =>
          flow ? (
            <TouchableOpacity
              disabled={
                item.label === currency.to || item.label === currency.from
                  ? true
                  : false
              }
              activeOpacity={0.9}
              key={index}
              style={[
                styles.buttonPress,
                {
                  backgroundColor:
                    item.label === currency.to || item.label === currency.from
                      ? colors.tertiary
                      : colors.secondary,

                  marginRight: index === pads.length ? 0 : "1%",
                },
              ]}
              onPress={() => {
                updateCurrency((prevCurrency) => {
                  const newCurrency = { ...prevCurrency, [flow]: item.label };
                  keyHandler({ id: " ", title: " ", newCurrency });

                  return newCurrency;
                });
                setFlow("");
              }}
            >
              <Text style={styles.padText}>{item.label}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.9}
              key={index}
              style={[
                styles.buttonPress,
                {
                  backgroundColor:
                    item.title === "E" ? colors.tertiary : colors.secondary,

                  marginRight: index === pads.length ? 0 : "1%",
                },
              ]}
              onPress={() => {
                keyHandler(item);
              }}
            >
              <Text style={styles.padText}>{item.title}</Text>
            </TouchableOpacity>
          )
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {}}
      />
      <View style={styles.bottomTabs}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => clearHandler()}
          style={styles.clearBtn}
        >
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            if (flow) {
              setFlow("");
            } else {
              deleteHandler();
            }
          }}
          style={styles.deleteBtn}
        >
          <Text style={styles.deleteText}>{`${
            flow ? "Switch" : "Delete"
          }`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: layout.pixelSizeVertical(50),
  },
  buttonPress: {
    backgroundColor: colors.secondary,
    width: "24%",
    paddingVertical: layout.size.isShortDevice
      ? layout.pixelSizeVertical(30)
      : layout.pixelSizeVertical(40),
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: layout.fontPixel(20),
  },
  padText: {
    color: colors.white,
    fontFamily: "Montserrat_700Bold",
    fontSize: layout.size.h2,
  },
  bottomTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: layout.pixelSizeVertical(10),
  },

  clearBtn: {
    backgroundColor: colors.secondary,
    width: "46%",
    paddingVertical: layout.size.isShortDevice
      ? layout.pixelSizeVertical(30)
      : layout.pixelSizeVertical(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: layout.fontPixel(24),
  },
  deleteBtn: {
    backgroundColor: colors.secondary,
    width: "46%",
    paddingVertical: layout.size.isShortDevice
      ? layout.pixelSizeVertical(30)
      : layout.pixelSizeVertical(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: layout.fontPixel(24),
  },
  deleteText: {
    color: colors.danger,
    fontFamily: "Montserrat_700Bold",
    fontSize: layout.size.h2,
  },
  clearText: {
    color: colors.warning,
    fontFamily: "Montserrat_700Bold",
    fontSize: layout.size.h2,
  },
});
