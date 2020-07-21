const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");

/*
 * Passport "serializes" objects to make them easy to store, converting the
 * user to an identifier (id)
 */
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

/*
 * Passport "deserializes" objects by taking the user's serialization (id)
 * and looking it up in the database
 */
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      console.log("here",email,password)
      console.log(done)
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("err")

          return done(err);
        }
        if (!user) {
          console.log("no usr")

          return done(null, false, { message: "Incorrect username." });
        }
       
        if (!user.validPassword(password)) {
          console.log(user)
          console.log("bad password",password)

          return done(null, false, { message: "Incorrect password." });
        }
        console.log("god")

        return done(null,user);
      });
    }
  )
);

module.exports = passport;
