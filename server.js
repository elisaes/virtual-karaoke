const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const app = express();
const flash = require("connect-flash");

require("dotenv").config();

mongoose.connect(
  process.env.MONGODBURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    UseFindAndModify: false
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
    cookie: { maxAge: 360000 }
  })
);

app.use(flash());

app.set("view engine", "ejs"); //view engine setuprs

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(expressLayouts);

app.use("/user", require("./routes/auth.route"));
app.use("/", require("./routes/home.route"));

app.listen(process.env.PORT, () => {
  console.log(`running on PORT ${process.env.PORT}`);
});
