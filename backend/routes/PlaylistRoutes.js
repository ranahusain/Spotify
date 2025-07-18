const express = require("express");
const router = express.Router();
const Playlist = require("../models/PlaylistModel");

router.post("/playlists", async (req, res) => {
  try {
    const { name, imageURL, owner, songs } = req.body;

    const newplaylist = new Playlist({
      name,
      imageURL,
      owner,
      songs,
    });

    await newplaylist.save();

    await newplaylist.populate("owner songs"); //get the info of owner that is user and songs that is song in other table

    res.status(200).json({
      success: true,
      message: "Song added successfully",
      playlist: newplaylist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getplaylists", async (req, res) => {
  try {
    const playlist = await Playlist.find().populate("owner songs");
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
