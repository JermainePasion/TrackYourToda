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
import MapView, { Marker, Polyline } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
            <Text className= "mb-3 text-3xl text-[#643502]">{fareData.durationMinutes} MIN</Text>
          </View>
    
          <View className="flex-1 min-w-[48%] p-6 bg-gray-100 rounded-xl mb-4 items-center">
            <Text className="font-bold mb-1 ">AMOUNT</Text>
            <Text className="font-bold text-green-700 text-4xl leading-[48px] tracking-wide">
              ₱{fareData.fareToCharge.toFixed(2)}
            </Text>
          </View>
        </View>
        )}  


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

  {startLocation && destinationLocation && (
    <Polyline
      coordinates={[startLocation, destinationLocation]}
      strokeColor="#000" // black line
      strokeWidth={3}
    />
  )}
</MapView>
        )}

          <View className="mt-5 flex-row justify-between space-x-4">

            <Pressable
              className="bg-gray-100 rounded-2xl p-4 w-44 items-center"
              onPress={() =>
                navigation.navigate("MapPicker", {
                  type: "start",
                  existingStart: startLocation,
                  existingDestination: destinationLocation,
                })
              }
            >
              <Ionicons name="location-sharp" size={24} color="red" />
              <Text className="text-xs font-bold text-center mt-1">
                TODA /{"\n"}CURRENT LOCATION
              </Text>
              <View className="bg-yellow-200 rounded-lg px-4 py-2 mt-3">
                <Text className="text-red-600 font-bold text-sm text-center"
                numberOfLines={3}
                ellipsizeMode="tail"
                >
                  {startLocation ? startLocation.name.toUpperCase() : "SELECT START POINT"}
                </Text>
              </View>
            </Pressable>


            <Pressable
              className="bg-gray-100 rounded-2xl p-4 w-44 items-center"
              onPress={() =>
                navigation.navigate("MapPicker", {
                  type: "destination",
                  existingStart: startLocation,
                  existingDestination: destinationLocation,
                })
              }
            >
              <Ionicons name="location-sharp" size={24} color="red" />
              <Text className="text-xs font-bold text-center mt-1">
                TODA /{"\n"}DESTINATION
              </Text>
              <View className="bg-yellow-200 rounded-lg px-4 py-2 mt-3">
                <Text className="text-red-600 font-bold text-sm text-center"
                numberOfLines={3}
                ellipsizeMode="tail"
                >
                  {destinationLocation
                    ? destinationLocation.name.toUpperCase()
                    : "SELECT DESTINATION"}
                </Text>
              </View>
            </Pressable>
          </View>

      </ScrollView>
    </DashboardLayout>
  );
}
