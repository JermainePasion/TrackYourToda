const express = require("express");
const app = express();

const fareRoute = require("./routes/fare");

app.use(express.json()); 

// Mount under /api/fare
app.use("/api/fare", fareRoute);

app.get("/", (req, res) => {
  res.send("TYT server running!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});