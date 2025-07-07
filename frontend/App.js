import "./global.css";

import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from './components/SplashScreen';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Splash stays visible ~3 seconds total
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  // Your main app content:
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl text-gray-800">This is your Home Page.</Text>
      <StatusBar style="auto" />
    </View>
  );
}
