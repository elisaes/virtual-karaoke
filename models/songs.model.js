const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongsSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  music: {
    type: String,
    required: true,
  },
  lyric:{
    type: String,
    required:true,
  },
  artist: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});
const Songs = mongoose.model("Songs", SongsSchema);
module.exports = Songs;
