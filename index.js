const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello From Manufacture Car Parts!");
});

app.listen(port, () => {
  console.log(`Car Parts app listening on port ${port}`);
});
