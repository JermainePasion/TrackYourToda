const mongoose = require('mongoose');
const Terminal = require('../models/Terminal');
const terminals = require('../data/terminals');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("✅ Connected to MongoDB");

  // Optional: clear the collection first
  await Terminal.deleteMany({});
  console.log("🗑️ Existing terminals cleared.");

  // Insert new data
  await Terminal.insertMany(terminals);
  console.log("🚀 Terminals seeded successfully!");

  process.exit();
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
