import "../global.css";
import React, { useContext } from "react";
import { View, Text, Switch } from "react-native";
import DashboardLayout from "../layouts/DashboardLayout";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <DashboardLayout>
      <View className={`flex-1 items-center justify-center ${isDark ? 'bg-[#131929]' : 'bg-white'}`}>

        <View className="mt-6 items-center">
          <Text className={`${isDark ? 'text-white' : 'text-black'} mb-2`}>
            Dark Mode
          </Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>
      </View>
    </DashboardLayout>
  );
}
