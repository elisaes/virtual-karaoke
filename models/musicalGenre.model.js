const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MusicalGenreSchema = Schema({
  genre: {
    type: String,
    required: true
  },

  songs: [
    {
      title: "",
      singer: ""
    }
  ]
});
const MusicalGenre = mongoose.model("MusicalGenre", MusicalGenreSchema);
module.exports = MusicalGenre;
