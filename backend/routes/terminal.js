const express = require('express');
const router = express.Router();
const Terminal = require('../models/terminal');

// Get all terminalss
router.get('/', async (req, res) => {
  try {
    const terminals = await Terminal.find();
    res.json(terminals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;