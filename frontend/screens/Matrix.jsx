import "../global.css";
import React from "react";
import { View, Text } from "react-native";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Matrix() {
  return (
    <DashboardLayout>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-2xl font-bebas text-primary">This is your Matrix Page</Text>
      </View>
    </DashboardLayout>
  );
}