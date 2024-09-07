import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./API_URL";
import { arrayConverter } from "../utils/utilFunctions";

export const currencyFetch = (
  setLoading,
  updateValues,
  updateValuesArray,
  currency,
  updateCurrency,
  setErrorMessage
) => {
  setLoading(true);
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(`${API_URL}e9f834f6474adbd09eeb4527/latest/usd`, requestOptions)
    .then((response) => response.text())
    .then(async (result) => {
      const toBeSaved = JSON.parse(result);
      if (toBeSaved.result === "success") {
        await AsyncStorage.setItem("currencies", JSON.stringify(toBeSaved))
          .then((e) => {
            const { currencyArray } = arrayConverter(toBeSaved);

            updateValuesArray(currencyArray);

            updateValues(toBeSaved);

            updateCurrency({
              ...currency,
              from: currencyArray[0].label,
              to: currencyArray[1].label,
            });

            setLoading(false);
          })
          .catch((e) => {
            console.warn(e);
          });
        setLoading(false);
      } else if (toBeSaved.result === "error") {
        setErrorMessage(toBeSaved);
        setLoading(false);
      }
    })
    .catch((error) => {
      setLoading(false);
      setErrorMessage(error);
      console.warn(error);
    });
};
