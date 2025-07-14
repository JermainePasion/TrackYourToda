import "../global.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home"; 
import Settings from "../screens/Settings";
import Matrix from "../screens/Matrix";
import History from "../screens/History";


const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
    <NavigationContainer independent={true}>
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
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Matrix" component={Matrix} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
