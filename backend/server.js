const express = require("express");
const app = express();
require("dotenv").config();
const fareRoute = require("./routes/fare");
const destinationRoutes = require("./routes/destinations");

app.use(express.json()); 



app.use("/api/fare", fareRoute);

app.get("/", (req, res) => {
  res.send("TYT server running!");
});

app.use("/api/destinations", destinationRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});