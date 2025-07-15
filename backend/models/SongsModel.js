const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SongSchema = new Schema({
  songname: {
    type: String,
    required: true,
    trimr: true,
  },
  artistname: {
    type: String,
    required: true,
    trimr: true,
  },
  image: {
    type: String,
    required: true,
    trimr: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SongModel = model("Song", SongSchema);

module.exports = SongModel;
