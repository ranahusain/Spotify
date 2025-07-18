const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const users = require("./routes/UserRoutes");
const songs = require("./routes/SongsRoutes");
const playlists = require("./routes/PlaylistRoutes");

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the Spotify backend API!");
});

app.use("/api", users);
app.use("/api", songs);
app.use("/api", playlists);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
