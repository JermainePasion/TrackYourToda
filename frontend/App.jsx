import "./global.css";
import { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from './components/SplashScreen';
import MapPicker from "./components/MapPicker";
import Navbar from "./components/Navbar"; // This is your Tab Navigator
import { StatusBar } from 'expo-status-bar';
import SelectLocation from "./components/SelectLocation";

const Stack = createNativeStackNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={Navbar} />
        <Stack.Screen name="MapPicker" component={MapPicker} />
        <Stack.Screen name="SelectLocation" component={SelectLocation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
