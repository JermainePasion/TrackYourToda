// utils/history.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveSearchToHistory = async (startName, destinationName) => {
  try {
    const newEntry = {
      startName,
      destinationName,
      timestamp: new Date().toISOString(),
    };

    const stored = await AsyncStorage.getItem("searchHistory");
    const history = stored ? JSON.parse(stored) : [];

    const updatedHistory = [newEntry, ...history].slice(0, 10); // Keep last 10
    await AsyncStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Failed to save search to history:", error);
  }

  console.log("Saving search:", startName, destinationName, new Date().toISOString());
};
