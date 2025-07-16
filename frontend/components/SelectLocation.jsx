import "../global.css";
import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import MapPicker from "../components/MapPicker";

export default function SelectLocation({ navigation }) {
  const [coords, setCoords] = useState(null);

  return (
    <View style={{ flex: 1 }}>
      {!coords ? (
        <MapPicker
          onLocationSelected={(coords) => setCoords(coords)}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>Selected Location:</Text>
          <Text style={{ fontSize: 16 }}>
            {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
          </Text>
          <Button
            title="Confirm and Go Back"
            onPress={() => navigation.goBack()}
          />
        </View>
      )}
    </View>
  );
}
