const express = require("express");
const connectDB = require("./db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
