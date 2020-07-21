const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const passport = require("./lib/passportConfig");
const session = require("express-session");
const app = express();
const flash = require("connect-flash");

app.set("view engine", "ejs"); //view engine setuprs

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(expressLayouts);
require("dotenv").config();

mongoose.connect(
  process.env.MONGODBURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("MongoDB connected");
  }
);

app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    //cookie: { maxAge: 360000 }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function (req, res, moveOn) {
  res.locals.alerts = req.flash(); //for ejs files
  res.locals.currentUser = req.user;
  moveOn();
});

app.use("/uploads", express.static("uploads"));

app.use("/songs", require("./routes/songs.route"));
app.use("/user", require("./routes/user.route"));
app.use("/auth", require("./routes/auth.route"));
app.use("/", require("./routes/home.route"));

app.listen(process.env.PORT, () => {
  console.log(`running on PORT ${process.env.PORT}`);
});
