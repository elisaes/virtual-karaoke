const router = require("express").Router();
const User = require("../models/user.model");
//const passport = require("../lib/passportConfig");

router.get("/signup", (req, res) => {
  res.render("user/signup");
});
router.post("/signup", async (req, res) => {
  try {
    let { name, artistName, email, MusicalGenre, password } = req.body;
    let user = new User({
      name,
      artistName,
      email,
      MusicalGenre,
      password
    });
    let savedUser = await user.save();
    if (savedUser) {
      console.log(savedUser);
      res.redirect("/solo");
    }
  } catch (error) {
    req.flash("User already exist");
  }
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

// router.post(
//   "/login",
//   // (req,res)=>{
//   //   res.send("posted")
//   // }
//   passport.authenticate("local", {
//     succesRediect: "/solo",
//     failureRedirect: "/",
//     failureFlash: "Invalid email/Password, Please enter correct details"
//   }),
//   function(req, res) {
//     res.redirect("/solo");
//   }
// );

// router.get("/logout", (req, res) => {
//   req.logout();
//   req.flash("success", "oh!!! dont leave me!!!");
//   res.redirect("./kroom/home");
// });

module.exports = router;
