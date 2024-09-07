import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useIsNewDay = () => {
  const [isFirstCallOfDay, setIsFirstCallOfDay] = useState(false);

  useEffect(() => {
    const checkFirstCallOfDay = async () => {
      try {
        const lastCheckDate = await AsyncStorage.getItem("lastCheckDate");
        const today = new Date().toDateString();

        if (lastCheckDate !== today) {
          setIsFirstCallOfDay(true);
          await AsyncStorage.setItem("lastCheckDate", today);
        } else {
          setIsFirstCallOfDay(false);
        }
      } catch (error) {
        console.error("Error checking first call of day:", error);
      }
    };

    checkFirstCallOfDay();
  }, []);

  return { isFirstCallOfDay };
};
