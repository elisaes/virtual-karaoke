const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const passport = require("./lib/passportConfig");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const app = express();
const flash = require("connect-flash");

app.set("view engine", "ejs"); //view engine setuprs

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(expressLayouts);
app.use(methodOverride("_method"));
require("dotenv").config();

//-----------------------------------------sockets----------//
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.sockets.on("error", (error) => console.log(error));

let broadcaster;
io.sockets.on("connection", (socket) => {
  socket.on("broadcaster", () => {
    console.log("broadcaster")
    broadcaster = socket.id;
    socket.broadcast.emit("broadcaster");
  });
  socket.on("watcher", () => {
    console.log("watcher")

    socket.to(broadcaster).emit("watcher", {id:socket.id});
  });
  socket.on("disconnect", () => {
    console.log("disconnect")

    socket.to(broadcaster).emit("disconnectPeer", socket.id);
  });

  socket.on("offer", (payload) => {
    console.log("offer",payload.id)

    socket.to(payload.id).emit("offer", {id:socket.id, msg:payload.msg});
  });

  socket.on("answer", payload => {
    console.log("answer")

    socket.to(payload.id).emit("answer", {id:socket.id, msg:payload.msg});

    console.log("err")
  });
  socket.on("candidate", payload => {
    console.log("candidate")

    socket.to(payload.id).emit("candidate", {id:socket.id, msg:payload.msg});
  });
});
//-----------------------------

mongoose.connect(
  process.env.MONGODBURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) console.log("Error connecting to MDB", err);
    else console.log("MongoDB connected");
  }
);

app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({ url: process.env.MONGODBURL }),
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
app.use("/public", express.static("public"));

app.use("/songs", require("./routes/songs.route"));
app.use("/user", require("./routes/user.route"));
app.use("/auth", require("./routes/auth.route"));
app.use("/", require("./routes/home.route"));

http.listen(process.env.PORT, () => {
  console.log(`running on PORT ${process.env.PORT}`);
});
