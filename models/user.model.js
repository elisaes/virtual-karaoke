const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  artistName: String,
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  isAdmin: {
    type: Boolean,
    default: false
  },
  MusicalGenre: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "musicalGenre"
    }
  ]
});

//compare the password that the user gave in the firsst plce and compare with the one that is entering now
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
