const User = require("../models/user.model");
const Songs = require("../models/songs.model");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("kroom/solo");
});

router.get("/single", async (req, res) => {
  try {
    let users = await User.find();

    let songs = await Songs.find();
    res.render("user/indexSingle", { users,songs });
  } catch (error) {
    console.log(error);
  }
});

router.get("/couple", async (req, res) => {
  try {
    let users = await User.find();
    res.render("user/indexCouple", { users });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
