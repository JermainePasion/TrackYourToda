import "../global.css";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DashboardLayout from "../layouts/DashboardLayout";
import { format } from "date-fns"; // Optional, for formatting timestamp

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const stored = await AsyncStorage.getItem("searchHistory");
        if (stored) {
          setHistory(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load history:", error);
      }
    };

    loadHistory();
  }, []);

  const renderItem = ({ item }) => (
    <View className="p-4 border-b border-gray-200">
      <Text className="text-lg font-bold text-primary">
        {item.startName} → {item.destinationName}
      </Text>
      <Text className="text-sm text-gray-500">
        {item.timestamp ? format(new Date(item.timestamp), "PPpp") : "Unknown date"}
      </Text>
    </View>
  );

  return (
    <DashboardLayout>
      <View className="flex-1 bg-white">
        <Text className="text-2xl font-bebas text-primary p-4">History</Text>
        <FlatList
          data={history}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-10">
              No recent searches yet.
            </Text>
          }
        />
      </View>
    </DashboardLayout>
  );
}
