import { useMemo } from "react";

export const useFormattedDate = (timestamp) => {
  return useMemo(() => {
    if (!timestamp) return "";

    const date = new Date(timestamp * 1000);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Format the date as "MM/DD/YYYY, HH:MM"
    return `${month}/${day}/${year}, ${hours}:${minutes}`;
  }, [timestamp]);
};
