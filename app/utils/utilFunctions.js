export const formatCurrency = (value) => {
  const sanitizedValue = value?.replace(/^0+(?=\d)/, "");

  const decimalIndex = sanitizedValue.indexOf(".");
  if (decimalIndex !== -1) {
    const integerPart = sanitizedValue.slice(0, decimalIndex);
    const decimalPart = sanitizedValue
      .slice(decimalIndex + 1)
      .replace(/\./g, "");

    return `${integerPart}.${decimalPart}`;
  }

  return sanitizedValue;
};

export const removeLastChar = (str) => {
  return str.length > 0 ? str.slice(0, -1) : str;
};

export const arrayConverter = (data) => {
  let map = new Map(Object.entries(data?.conversion_rates));

  const currencyArray = Array.from(map, ([key, value]) => ({
    label: key,
    value: value,
  }));

  return { currencyArray };
};
