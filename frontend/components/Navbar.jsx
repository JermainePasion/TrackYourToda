import "../global.css";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import SelectLocation from "./SelectLocation";
import History from "../screens/History";
import Matrix from "../screens/Matrix";
import Settings from "../screens/Settings";
import MapPicker from "./MapPicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../contexts/ThemeContext"; // ✅ Import theme

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="SelectLocation" component={SelectLocation} />
      <Stack.Screen name="MapPicker" component={MapPicker} />
    </Stack.Navigator>
  );
}

export default function Navbar() {
  const { theme } = useTheme(); // ✅ Get theme
  const isDark = theme === "dark";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#111827" : "#fff", // ✅ Dark/Light background
          borderTopColor: isDark ? "#374151" : "#D1D5DB",
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontFamily: "BebasNeue_400Regular",
          fontSize: 16,
        },
        tabBarIcon: ({ focused, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "History") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Matrix") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? "#C15353" : isDark ? "#D1D5DB" : "#374151"}
            />
          );
        },
        tabBarActiveTintColor: "#C15353", // ✅ Red accent
        tabBarInactiveTintColor: isDark ? "#D1D5DB" : "#374151", // ✅ Adjusted for dark mode
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Matrix" component={Matrix} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
