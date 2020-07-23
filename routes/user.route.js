const User = require("../models/user.model");
const Songs = require("../models/songs.model");
const { checkAuthenticated } = require("../lib/auth");

const router = require("express").Router();

router.get("/", checkAuthenticated, (req, res) => {
  res.render("kroom/solo");
});

router.get("/guest", async (req, res) => {
  try {
    let songs = await Songs.find();
    res.render("user/guest", { songs });
  } catch (error) {
    console.log(error);
  }
});

router.get("/watcher", async (req, res) => {
  try {
    let users = await User.find();
    let songs = await Songs.find();
    res.render("user/watcher", { users, songs });
  } catch (error) {
    console.log(error);
  }
});

router.get("/broadcaster", checkAuthenticated, async (req, res) => {
  try {
    let users = await User.find();
    let songs = await Songs.find();

    res.render("user/broadcaster", { users, songs });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
