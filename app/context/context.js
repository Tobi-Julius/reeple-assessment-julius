import React, { createContext, useState, useEffect } from "react";
import {
  formatCurrency,
  removeLastChar,
  arrayConverter,
} from "../utils/utilFunctions";
import { currencyFetch } from "../services/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFindCurrencies, useIsNewDay } from "../customHooks";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [values, updateValues] = useState("");
  const [valuesArray, updateValuesArray] = useState([]);
  const [amounts, updateAmounts] = useState({
    from: "",
    to: "",
  });
  const [currency, updateCurrency] = useState({
    from: "",
    to: "",
  });
  const [typingPosition, updateTypingPosition] = useState("from");
  const [flow, setFlow] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { isFirstCallOfDay } = useIsNewDay();

  const keyHandler = (e) => {
    if (e.title === "E") return;
    let previousValue;
    let newValue;
    let formattedValue;

    const { from, to } = useFindCurrencies(
      e.newCurrency ? e.newCurrency?.from : currency.from,
      e.newCurrency ? e.newCurrency?.to : currency.to,
      valuesArray
    );

    if (typingPosition === "from") {
      previousValue = amounts.from || "";
      if (e.title === "." && previousValue.includes(".")) return;

      newValue = previousValue + e.title;
      formattedValue = formatCurrency(newValue).replace(
        /^\s+|\s+$|\s+(?=\s)/g,
        ""
      );

      const parsedFromValue = parseFloat(formattedValue) || 0;

      let conversionRate;
      if (from?.label === "USD") {
        conversionRate = to?.value || 1;
      } else if (to?.label === "USD") {
        conversionRate = 1 / (from?.value || 1);
      } else {
        conversionRate = (to?.value || 1) / (from?.value || 1);
      }

      updateAmounts({
        ...amounts,
        from: formattedValue,
        to: (parsedFromValue * conversionRate).toFixed(2),
      });
    } else if (typingPosition === "to") {
      previousValue = amounts.to || "";
      if (e.title === "." && previousValue.includes(".")) return;

      newValue = previousValue + e.title;
      formattedValue = formatCurrency(newValue);

      const parsedToValue = parseFloat(formattedValue) || 0;

      let conversionRate;
      if (to?.label === "USD") {
        conversionRate = from?.value || 1;
      } else if (from?.label === "USD") {
        conversionRate = 1 / (to?.value || 1);
      } else {
        conversionRate = (from?.value || 1) / (to?.value || 1);
      }

      updateAmounts({
        ...amounts,
        to: formattedValue,
        from: (parsedToValue * conversionRate).toFixed(2),
      });
    }
  };

  const valueSwitch = () => {
    updateAmounts({
      ...amounts,
      from: amounts.to,
      to: amounts.from,
    });
    updateCurrency({
      ...currency,
      from: currency.to,
      to: currency.from,
    });
  };

  const clearHandler = () => {
    updateAmounts({
      ...amounts,
      to: "",
      from: "",
    });
  };

  const deleteHandler = () => {
    const previousValue = amounts[typingPosition] || "";
    const updatedValue = removeLastChar(previousValue) || "0";

    const parsedUpdatedValue = parseFloat(updatedValue) || 0;

    const { from, to } = useFindCurrencies(
      currency.from,
      currency.to,
      valuesArray
    );

    let conversionRate;
    if (typingPosition === "from") {
      if (from?.label === "USD") {
        conversionRate = to?.value || 1;
      } else if (to?.label === "USD") {
        conversionRate = 1 / (from?.value || 1);
      } else {
        conversionRate = (to?.value || 1) / (from?.value || 1);
      }

      updateAmounts({
        ...amounts,
        from: updatedValue,
        to: (parsedUpdatedValue * conversionRate).toFixed(2),
      });
    } else if (typingPosition === "to") {
      if (to?.label === "USD") {
        conversionRate = from?.value || 1;
      } else if (from?.label === "USD") {
        conversionRate = 1 / (to?.value || 1);
      } else {
        conversionRate = (from?.value || 1) / (to?.value || 1);
      }

      updateAmounts({
        ...amounts,
        to: updatedValue,
        from: (parsedUpdatedValue * conversionRate).toFixed(2),
      });
    }
  };

  const rateFetch = () => {
    currencyFetch(
      setLoading,
      updateValues,
      updateValuesArray,
      currency,
      updateCurrency,
      setErrorMessage
    );
  };

  const valueFetch = async () => {
    const jsonValue = await AsyncStorage.getItem("currencies");

    const data = JSON.parse(jsonValue);
    if (isFirstCallOfDay) {
      rateFetch();
    } else {
      if (data) {
        const { currencyArray } = arrayConverter(data);
        updateValues(data);
        updateValuesArray(currencyArray);

        updateCurrency({
          ...currency,
          from: currencyArray[0].label,
          to: currencyArray[1].label,
        });
      } else {
        rateFetch();
      }
    }
  };

  useEffect(() => {
    let sub = true;
    if (sub) {
      valueFetch();
    }
    return () => (sub = false);
  }, []);

  return (
    <CurrencyContext.Provider
      value={{
        updateAmounts,
        amounts,
        keyHandler,
        typingPosition,
        updateTypingPosition,
        valueSwitch,
        clearHandler,
        deleteHandler,
        currency,
        updateCurrency,
        flow,
        setFlow,
        values,
        valuesArray,
        loading,
        setLoading,
        updateValuesArray,
        updateValues,
        errorMessage,
        setErrorMessage,
        rateFetch,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
