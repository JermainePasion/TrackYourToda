import "../global.css";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import SelectLocation from "./SelectLocation";
import History from "../screens/History";
import Matrix from "../screens/Matrix";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="SelectLocation" component={SelectLocation} />
    </Stack.Navigator>
  );
}

export default function Navbar() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#D1D5DB",
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontFamily: "BebasNeue_400Regular",
          fontSize: 16,
          color: "#374151",
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Matrix" component={Matrix} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
