const express = require("express");
const router = express.Router();

const destinations = require("../data/destinations");

router.get("/", (req, res) => {
  res.json(destinations);
});

module.exports = router;
