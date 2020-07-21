const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LyricsSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});
const Lyrics = mongoose.model("Lyrics", LyricsSchema);
module.exports = Lyrics;
