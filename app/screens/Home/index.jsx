import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useContext } from "react";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { CurrencyContext } from "../../context/context";
import { Loading } from "../../component/Loading";
import { layout } from "../../utils";
import { Error } from "../../component/Error";

export const Home = () => {
  const { navigate } = useNavigation();
  const { loading, valuesArray, errorMessage, rateFetch } =
    useContext(CurrencyContext);

  return (
    <View style={styles.container}>
      {loading ? <Loading /> : null}
      {errorMessage ? (
        <Error
          errorMsg={errorMessage["error-type"]}
          info={errorMessage["extra-info"]}
          retry={rateFetch}
        />
      ) : (
        <SafeAreaView style={styles.innerContainer}>
          <FlatList
            data={valuesArray}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <Text style={styles.label}>
                    {item.label}:{"   "}
                    <Text style={styles.value}>{item.value}</Text>
                  </Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {}}
            contentContainerStyle={{
              paddingHorizontal: layout.pixelSizeHorizontal(20),
            }}
          />
          <View style={styles.bottom}>
            <TouchableOpacity
              onPress={() => navigate("CurrencyConverter")}
              style={styles.btn}
              activeOpacity={0.9}
            >
              <Text style={styles.btnText}>Currency Converter</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};
