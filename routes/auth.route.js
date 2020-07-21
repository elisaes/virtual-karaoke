const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("../lib/passportConfig");

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.get("/admin", (req, res) => {
  res.render("auth/admin");
});

router.post("/signup", async (req, res) => {
  try {
    let { name, artistName, email, MusicalGenre, isAdmin, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log("hre", req.body);
    let user = new User({
      name,
      artistName,
      email,
      MusicalGenre,
      isAdmin,
      password: hashedPassword
    });
    let savedUser = await user.save();
    if (savedUser) {
      console.log("saved", savedUser);
      res.redirect("/user");
    }
  } catch (error) {
    console.log(error);
    //req.flash("User already exist"); HOW TO DISPLAY THE MSG TO THE USER????
  }
});

router.get("/login", (req, res) => {

  res.render("auth/login");
});

router.post(
  "/login",


  passport.authenticate("local", {
    succesRediect: "/user",
    failureRedirect: "/auth/login",
    failureFlash: "Invalid email/Password, Please enter correct details"
  }),
  function(req, res) {
    console.log("kakakak",req.body);
    if (req.body.isAdmin === "true"){
      res.redirect("/songs")
    } else {
    res.redirect("/user");
  }}

);

// router.get("/logout", (req, res) => {
//   req.logout();
//   req.flash("success", "oh!!! dont leave me!!!");
//   res.redirect("./kroom/home");
// });

module.exports = router;
