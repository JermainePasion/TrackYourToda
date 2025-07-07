import React, { useEffect, useRef } from 'react';
import { Animated, View, Text } from 'react-native';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      className="flex-1 items-center justify-center bg-blue-600"
      style={{ opacity: fadeAnim }}
    >
      <Text className="text-white text-3xl font-bold">
        Welcome to TYT!
      </Text>
    </Animated.View>
  );
}
