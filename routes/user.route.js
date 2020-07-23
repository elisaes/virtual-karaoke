const User = require("../models/user.model");
const Songs = require("../models/songs.model");
const {checkAuthenticated} = require("../lib/auth")

const router = require("express").Router();

router.get("/",checkAuthenticated, (req, res) => {
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

router.get("/couple",checkAuthenticated, async (req, res) => {
  try {
    let users = await User.find();
    res.render("user/indexCouple", { users });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
