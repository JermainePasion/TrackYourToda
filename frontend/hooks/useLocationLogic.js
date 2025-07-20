// hooks/useLocationLogic.js
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import axios from "axios";


const BASE_URL = "http://192.168.100.36:3000/api/fare/estimate";

export default function useLocationLogic() {
  const navigation = useNavigation();
  const route = useRoute();

  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startLocation, setStartLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [fareData, setFareData] = useState(null);

    const setStartLocationWithName = async (location) => {
    const name = await reverseGeocode(location.latitude, location.longitude);
    setStartLocation({ ...location, name });
    };

    const setDestinationLocationWithName = async (location) => {
    const name = await reverseGeocode(location.latitude, location.longitude);
    setDestinationLocation({ ...location, name });
    };


  useEffect(() => {
    const { selectedLocation, type } = route.params || {};

    if (selectedLocation && type === "start") {
      setStartLocationWithName(selectedLocation);
    } else if (selectedLocation && type === "destination") {
      setDestinationLocationWithName(selectedLocation);
    }

    if (!region) {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission denied", "Location permission is required.");
          setRegion({
            latitude: 14.5995,
            longitude: 120.9842,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        } else {
          const location = await Location.getCurrentPositionAsync({});
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
  setStartLocationWithName(route.params.existingStart);
    }
    if (route.params?.existingDestination) {
    setDestinationLocationWithName(route.params.existingDestination);
    }
  }, [route.params]);

 
  useEffect(() => {
    if (startLocation && destinationLocation) {
      const fetchFare = async () => {
        try {
          const response = await axios.post(BASE_URL, {
            startLat: startLocation.latitude,
            startLng: startLocation.longitude,
            endLat: destinationLocation.latitude,
            endLng: destinationLocation.longitude,
            isDiscounted: false,
          });
          setFareData(response.data);
        } catch (error) {
          console.error("Fare estimate failed:", error.response?.data || error.message);
          Alert.alert("Error", "Could not estimate fare");
        }
      };

      fetchFare();
    }
  }, [startLocation, destinationLocation]);

  const reverseGeocode = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: {
          "User-Agent": "YourAppName/1.0 (your@email.com)", 
        },
      }
    );

    const data = await response.json();
    return data.display_name || "Unknown location";
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    return "Unknown location";
  }
};

  return {
    navigation,
    region,
    loading,
    startLocation,
    destinationLocation,
    fareData,
    setStartLocation,
    setDestinationLocation,
  };
}
