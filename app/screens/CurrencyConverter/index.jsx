import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ConverterHeader, KeyPads, BottomComponent } from "../../component";
import { styles } from "./styles";
import { CurrencyContext } from "../../context/context";
import { Loading } from "../../component/Loading";
import { Error } from "../../component/Error";

export const CurrencyConverter = () => {
  const { loading, errorMessage } = useContext(CurrencyContext);

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
        <SafeAreaView>
          <ConverterHeader />
          <KeyPads />
          <BottomComponent />
        </SafeAreaView>
      )}
    </View>
  );
};
