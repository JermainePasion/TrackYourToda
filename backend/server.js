const express = require("express");
const app = express();
require("dotenv").config();
const fareRoute = require("./routes/fare");
const destinationRoutes = require("./routes/destinations");
const MONGODB_URI = process.env.MONGODB_URI;
const rideRoutes = require('./routes/ride');
const terminalRoutes = require('./routes/terminal');

const mongoose = require('mongoose');

mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log('✅ MongoDB connected!'))
.catch((err) => console.error('MongoDB connection error:', err));


app.use(express.json()); 


app.get("/", (req, res) => {
  res.send("TYT server running!");
});

app.use("/api/fare", fareRoute);
app.use("/api/destinations", destinationRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/terminals', terminalRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});