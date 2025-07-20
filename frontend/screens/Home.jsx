import "../global.css";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";
import useLocationLogic from "../hooks/useLocationLogic";

export default function Home() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    region,
    loading,
    startLocation,
    destinationLocation,
    fareData,
    setStartLocation,
    setDestinationLocation,
  } = useLocationLogic();


  return (
    <DashboardLayout>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="p-4 bg-white"
      >
        {fareData && (
        <View className=" flex-row flex-wrap justify-between space-x-8 ">
          <View className="flex-1 min-w-[48%] p-6 bg-gray-100 rounded-xl mb-4 mr-3 items-center">
            <Text style={{
              fontFamily: 'BebasNeue_400Regular',
              color: 'black',
            }} >DISTANCE:</Text>
            <Text className= "mb-3 text-3xl text-[#643502]" >{fareData.distanceKm} KM</Text>
            <Text>Duration:</Text>
            <Text className= "mb-3 text-3xl text-[#643502]">{fareData.durationMinutes} MINS</Text>
          </View>
    
          <View className="flex-1 min-w-[48%] p-6 bg-gray-100 rounded-xl mb-4 items-center">
            <Text className="font-bold mb-1 ">AMOUNT</Text>
            <Text className="font-bold text-green-700 text-4xl leading-[48px] tracking-wide">
              ₱{fareData.fareToCharge.toFixed(2)}
            </Text>
          </View>
        </View>
        )}  

        <Text className="text-xl font-bold mb-4">Select Route!</Text>

        {loading || !region ? (
          <ActivityIndicator size="large" color="#C15353" />
        ) : (
          <MapView
            style={{ width: "100%", height: 250 }}
            region={region}
          >
            {startLocation && (
              <Marker coordinate={startLocation} title="Start" pinColor="green" />
            )}
            {destinationLocation && (
              <Marker coordinate={destinationLocation} title="Destination" />
            )}
          </MapView>
        )}

        <View className="mt-5">
          <Pressable
            className="bg-white rounded-xl p-4 mb-3 border border-gray-300 shadow"
            onPress={() =>
              navigation.navigate("MapPicker", {
                type: "start",
                existingStart: startLocation,
                existingDestination: destinationLocation,
              })
            }
          >
            <Text className="text-base font-medium">
              {startLocation
                ? `Start: ${startLocation.name}`
                : "Select Starting Point"}
            </Text>
          </Pressable>

          <Pressable
            className="bg-white rounded-xl p-4 mb-3 border border-gray-300 shadow"
            onPress={() =>
              navigation.navigate("MapPicker", {
                type: "destination",
                existingStart: startLocation,
                existingDestination: destinationLocation,
              })
            }
          >
            <Text className="text-base font-medium">
              {destinationLocation
                ? `Destination: ${destinationLocation.name}`
                : "Select Destination"}
            </Text>
          </Pressable>

          
        </View>
      </ScrollView>
    </DashboardLayout>
  );
}
