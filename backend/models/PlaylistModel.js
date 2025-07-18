const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PlaylistSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  imageURL: {
    type: String,
    trim: true,
    default: "", // cover image for playlist
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PlaylistModel = model("Playlist", PlaylistSchema);

module.exports = PlaylistModel;
