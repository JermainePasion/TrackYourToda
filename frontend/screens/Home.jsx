import "../global.css";
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import {View, Text, Pressable, ActivityIndicator, Alert, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import DashboardLayout from "../layouts/DashboardLayout";
import axios from 'axios';



export default function Home() {
  const navigation = useNavigation();
  const route = useRoute();
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startLocation, setStartLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [fareData, setFareData] = useState(null);

  useEffect(() => {
    const { selectedLocation, type } = route.params || {};

    const BASE_URL = 'http://192.168.100.36:3000/api/fare/estimate'; 

    const estimateFare = async (startLocation, endLocation, isDiscounted = false) => {
      try {
        const response = await axios.post(BASE_URL, {
          startLat: startLocation.latitude,
          startLng: startLocation.longitude,
          endLat: endLocation.latitude,
          endLng: endLocation.longitude,
          isDiscounted,
        });

        setFareData(response.data);
      } catch (error) {
        console.error('Fare estimate failed:', error.response?.data || error.message);
        Alert.alert("Fare Estimate Failed", error.response?.data?.error || error.message);
      }
    };

    if (selectedLocation && type === 'start') {
      setStartLocation(selectedLocation);
    } else if (selectedLocation && type === 'destination') {
      setDestinationLocation(selectedLocation);
    }

    if (!region) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Permission denied", "Location permission is required.");
          setRegion({
            latitude: 14.5995,
            longitude: 120.9842,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        } else {
          let location = await Location.getCurrentPositionAsync({});
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
        setLoading(false);
      })();
    }
  }, [route.params]);

  useEffect(() => {
  if (route.params?.existingStart) {
    setStartLocation(route.params.existingStart);
  }

  if (route.params?.existingDestination) {
    setDestinationLocation(route.params.existingDestination);
  }
}, [route.params]);

  useEffect(() => {
    if (startLocation && destinationLocation) {
      const fetchFare = async () => {
        try {
          const response = await axios.post('http://192.168.100.36:3000/api/fare/estimate', {
            startLat: startLocation.latitude,
            startLng: startLocation.longitude,
            endLat: destinationLocation.latitude,
            endLng: destinationLocation.longitude,
            isDiscounted: false,
          });

          setFareData(response.data); // You had setFareEstimate, but you're using fareData
        } catch (error) {
          console.error(error);
          Alert.alert("Error", "Could not estimate fare");
        }
      };

      fetchFare();
    }
  }, [startLocation, destinationLocation]);



  return (
    <DashboardLayout>
      <ScrollView className="flex-1 p-4 bg-white">
        <Text className="text-xl font-bold mb-4">Select Route</Text>

        {loading || !region ? (
          <ActivityIndicator size="large" color="#C15353" />
        ) : (
          <MapView
            style={{ width: '100%', height: 250 }}
            region={region}
          >
            {startLocation && <Marker coordinate={startLocation} title="Start" pinColor="green" />}
            {destinationLocation && <Marker coordinate={destinationLocation} title="Destination" />}
          </MapView>
        )}

        <View style={styles.cardContainer}>
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate('MapPicker', {
                type: 'start',
                existingStart: startLocation,
                existingDestination: destinationLocation,
              })
            }
          >
            <Text style={styles.cardText}>
              {startLocation
                ? `Start: ${startLocation.latitude.toFixed(4)}, ${startLocation.longitude.toFixed(4)}`
                : 'Select Starting Point'}
            </Text>
          </Pressable>

            <Pressable
              style={styles.card}
              onPress={() =>
                navigation.navigate('MapPicker', {
                  type: 'destination',
                  existingStart: startLocation,
                  existingDestination: destinationLocation,
                })
              }
            >
            <Text style={styles.cardText}>
              {destinationLocation
                ? `Destination: ${destinationLocation.latitude.toFixed(4)}, ${destinationLocation.longitude.toFixed(4)}`
                : 'Select Destination'}
            </Text>
          </Pressable>
          {fareData && (
  <View style={{ marginTop: 20, padding: 10, backgroundColor: '#eee', borderRadius: 10 }}>
    <Text style={{ fontWeight: 'bold' }}>Estimated Fare</Text>
    <Text>Distance: {fareData.distanceKm} km</Text>
    <Text>Duration: {fareData.durationMinutes} minutes</Text>
    <Text>Regular Fare: ₱{fareData.regularFare.toFixed(2)}</Text>
    <Text>Discounted Fare: ₱{fareData.discountFare.toFixed(2)}</Text>
    <Text style={{ fontWeight: 'bold', color: 'green' }}>To Charge: ₱{fareData.fareToCharge.toFixed(2)}</Text>
  </View>
)}
        </View>
      </ScrollView>
    </DashboardLayout>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
