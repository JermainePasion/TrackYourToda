import "./global.css";
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from './components/SplashScreen';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });

  

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

  if (!fontsLoaded) {
    return null; // Or your own loading screen
  }

  // Your main app content:
  return (
    <View className="flex-1 items-right justify- bg-black">
      <Text className="font-bebas text-primary text-4xl">
  Hello world.
</Text>
      <StatusBar style="auto" />
    </View>
  );
}
