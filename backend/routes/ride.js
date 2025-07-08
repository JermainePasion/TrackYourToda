const express = require('express');
const router = express.Router();
const Ride = require('../models/ride');

// @route   POST /api/rides
// @desc    Save one ride
router.post('/', async (req, res) => {
  try {
    const ride = new Ride(req.body);
    await ride.save();
    res.status(201).json(ride);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save ride', details: err });
  }
});

// @route   POST /api/rides/bulk
// @desc    Save multiple rides
router.post('/bulk', async (req, res) => {
  try {
    const rides = await Ride.insertMany(req.body);
    res.status(201).json(rides);
  } catch (err) {
    res.status(400).json({ error: 'Bulk insert failed', details: err });
  }
});

// @route   GET /api/rides
// @desc    Get all rides (optional filter by user later)
router.get('/', async (req, res) => {
  try {
    const rides = await Ride.find().sort({ date: -1 });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rides' });
  }
});

module.exports = router;
