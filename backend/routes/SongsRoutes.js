const express = require("express");
const router = express.Router();
const Song = require("../models/SongsModel");

router.post("/addsong", async (req, res) => {
  try {
    const { songname, artistname, image } = req.body;
    const existingSong = await Song.findOne({ songname });
    if (existingSong) {
      return res.status(409).json({
        success: false,
        message: "Song already exists with this name",
      });
    }
    const newSong = new Song({ songname, artistname, image });
    await newSong.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error while adding song:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
