export const useFindCurrencies = (fromCurrency, toCurrency, currencyArray) => {
  const from = currencyArray.find((item) => item.label === fromCurrency);
  const to = currencyArray.find((item) => item.label === toCurrency);

  return { from, to };
};
