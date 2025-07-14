import "./global.css";
import DashboardLayout from "./layouts/DashboardLayout";
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from './components/SplashScreen';
import { StatusBar } from 'expo-status-bar';
import Header from "./components/Header";


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

 
  return (
    <DashboardLayout>
    </DashboardLayout>
  );
}