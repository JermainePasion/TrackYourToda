import React, { useRef } from "react";
import { WebView } from "react-native-webview";
import { View, StyleSheet } from "react-native";

export default function MapPicker({ onLocationSelected }) {
  const webViewRef = useRef();

  const handleMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.lat && data.lng) {
      onLocationSelected(data);  // { lat, lng }
    }
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Map Picker</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
          html, body, #map { height: 100%; margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
          var map = L.map('map').setView([14.5995, 120.9842], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(map);

          var marker;

          map.on('click', function(e) {
            const { lat, lng } = e.latlng;
            if (marker) {
              marker.setLatLng(e.latlng);
            } else {
              marker = L.marker(e.latlng).addTo(map);
            }
            // Send selected location to React Native
            window.ReactNativeWebView.postMessage(JSON.stringify({ lat, lng }));
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html }}
        onMessage={handleMessage}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}
