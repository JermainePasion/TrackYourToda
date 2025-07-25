// utils/history.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveSearchToHistory = async (start, end) => {
  const newEntry = {
    startName: start.name,
    destinationName: end.name,
    date: new Date().toISOString(),
  };

  try {
    const existing = await AsyncStorage.getItem("searchHistory");
    let history = existing ? JSON.parse(existing) : [];

    history.unshift(newEntry); // add to start
    if (history.length > 10) history = history.slice(0, 10); // keep only 10

    await AsyncStorage.setItem("searchHistory", JSON.stringify(history));
  } catch (e) {
    console.error("Failed to save history:", e);
  }
};
