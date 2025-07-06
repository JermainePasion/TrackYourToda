const express = require("express");
const router = express.Router();
const { calculateFare } = require("../fareCalculator");
const { getDistanceKmORS } = require("../utils/getDistanceORS");

const ORS_API_KEY = process.env.ORS_API_KEY;

router.post("/estimate", async (req, res) => {
  const { startLat, startLng, endLat, endLng, isDiscounted } = req.body;

  if (!startLat || !startLng || !endLat || !endLng) {
    return res.status(400).json({ error: "Coordinates are required." });
  }

  try {
    const startCoords = [startLng, startLat]; // ORS expects [lon, lat]
    const endCoords = [endLng, endLat];

    const { distanceKm, durationMinutes } = await getDistanceKmORS(startCoords, endCoords, ORS_API_KEY);

    const result = calculateFare(distanceKm, isDiscounted);

    if (!result.fareToCharge) {
      return res.status(400).json({ error: result.message });
    }

    return res.json({
      start: { lat: startLat, lng: startLng },
      end: { lat: endLat, lng: endLng },
      distanceKm: distanceKm.toFixed(2),
      durationMinutes: durationMinutes.toFixed(1),
      regularFare: result.regularFare,
      discountFare: result.discountFare,
      fareToCharge: result.fareToCharge
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get distance from ORS." });
  }
});

module.exports = router;