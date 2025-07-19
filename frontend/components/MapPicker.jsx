import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';

export default function MapPicker() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { type, existingStart, existingDestination } = route.params || {};// 'start' or 'destination'

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Location permission not granted");
        setInitialRegion({
          latitude: 14.5995,
          longitude: 120.9842,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const confirmLocation = () => {
    if (!selectedLocation) {
      Alert.alert("No location selected");
      return;
    }
    navigation.navigate('HomeMain', {
      type,
      selectedLocation,
      existingStart: type === 'destination' ? existingStart : selectedLocation,
      existingDestination: type === 'start' ? existingDestination : selectedLocation,
    });
  };

  if (!initialRegion) return null;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        onPress={handleMapPress}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>

      <Pressable
        onPress={confirmLocation}
        style={{
          position: 'absolute',
          bottom: 30,
          left: 20,
          right: 20,
          backgroundColor: '#C15353',
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          Confirm Location
        </Text>
      </Pressable>
    </View>
  );
}
