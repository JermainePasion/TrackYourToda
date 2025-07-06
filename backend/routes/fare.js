const express = require("express");
const router = express.Router();
const { calculateFare } = require("../fareCalculator");

router.post("/estimate", (req, res) => {
  const { distanceKm, isDiscounted } = req.body;

  if (typeof distanceKm !== "number" || distanceKm <= 0) {
    return res.status(400).json({ error: "Invalid distance" });
  }

  const result = calculateFare(distanceKm, isDiscounted);

  if (!result.fareToCharge) {
    return res.status(400).json({ error: result.message });
  }

  return res.json({
    distanceKm,
    regularFare: result.regularFare,
    discountFare: result.discountFare,
    fareToCharge: result.fareToCharge
  });
});

module.exports = router;
