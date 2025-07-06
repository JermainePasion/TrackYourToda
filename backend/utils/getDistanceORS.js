const axios = require("axios");

async function getDistanceKmORS(startCoords, endCoords, apiKey) {
  const url = "https://api.openrouteservice.org/v2/directions/driving-car";

  const body = {
    coordinates: [startCoords, endCoords]
  };

  const response = await axios.post(url, body, {
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json"
    }
  });

  const summary = response.data.routes[0].summary;

  const distanceKm = summary.distance / 1000; // meters → km
  const durationMinutes = summary.duration / 60; // seconds → minutes

  return {
    distanceKm,
    durationMinutes
  };
}

module.exports = { getDistanceKmORS };
