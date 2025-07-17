import "../global.css";
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import DashboardLayout from "../layouts/DashboardLayout";

export default function Home() {
  const navigation = useNavigation();
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission denied", "Location permission is required to show your position.");
        setRegion({
          latitude: 14.5995,
          longitude: 120.9842,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setLoading(false);
    })();
  }, []);

  return (
    <DashboardLayout>
      <View className="flex-1 p-4 bg-white">
        <Text className="text-xl font-bold mb-4">Choose a Location</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#C15353" />
        ) : (
          <Pressable
            onPress={() => navigation.navigate('SelectLocation')}
            className="rounded-xl overflow-hidden shadow-md border border-gray-300"
          >
            <MapView
              style={{ width: '100%', height: 200 }}
              region={region}
              pointerEvents="none"
            >
              <Marker coordinate={region} />
            </MapView>
            <View className="absolute bottom-0 bg-black bg-opacity-50 w-full py-2">
              <Text className="text-white text-center">Tap to select location</Text>
            </View>
          </Pressable>
        )}
      </View>
    </DashboardLayout>
  );
}
