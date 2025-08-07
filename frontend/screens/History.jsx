import "../global.css";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DashboardLayout from "../layouts/DashboardLayout";
import { format } from "date-fns"; 
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from "../contexts/ThemeContext";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
  const loadHistory = async () => {
    const stored = await AsyncStorage.getItem("searchHistory");
    if (stored) setHistory(JSON.parse(stored));
  };

  loadHistory();
}, []);

  const { theme } = useTheme(); // ✅ Use theme
  const isDark = theme === 'dark'; // ✅ Same logic as Settings

  const renderItem = ({ item }) => (
     <View className= {` bg-gray-200 rounded-2xl p-4 mb-4 mx-4 shadow-sm`}>
    <View className="flex-row items-center mb-2">
      <Ionicons name="location-sharp" size={20} color="red" />
      <Text className="ml-2 text-base font-medium text-gray-800 flex-1">
        {item.startName}
      </Text>
    </View>
    <View className="flex-row items-center mb-2">
      <Ionicons name="location-sharp" size={20} color="green" />
      <Text className="ml-2 text-base font-medium text-gray-800 flex-1">
        {item.destinationName}
      </Text>
    </View>
    <Text className="text-sm text-gray-500 text-right">
      {item.date ? format(new Date(item.date), "PPpp") : "Unknown date"}
    </Text>
  </View>
  );

  return (
    <DashboardLayout>
      <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <Text className={`text-2xl font-bebas ${isDark ? 'text-white' : 'text-black'} font-bold p-4`}>HISTORY</Text>
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
