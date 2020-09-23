const Songs = require("../models/songs.model");
const fs = require("fs");
const Lyrics = require("../models/songs.model");
const { checkAdminAuthenticated, checkAuthenticated } = require("../lib/auth");

const router = require("express").Router();
//const musicController = require("../controller/musicController");
const multer = require("../config/multer");
//console.log(multer);
// router.get("/", (req, res) => {
//   res.render("./songs/list");
// });

router.get("/", checkAdminAuthenticated, async (req, res) => {
  try {
    // console.log("song /", req.user);
    let songs = await Songs.find();
    res.render("./songs/new", { songs });
    //console.log("songs from find", songs);
  } catch (error) {
    console.log(error);
  }
});

router.get("/show/:id", checkAuthenticated, async (req, res) => {
  console.log("req.body show id",req.params.id)
  try {
    let eachSong = await Songs.findById(req.params.id);
      // console.log("eachSong", eachSong);

    const lyrics = eachSong.lyric;
    console.log(lyrics)
    res.render("songs/show", { eachSong, lyrics, username: req.user.name });
  } catch (error) {
    console.log(error);
  }
});

router.get("/song/:id", checkAuthenticated, async (req, res) => {
  console.log("req.body show id",req.params.id)
  try {
    let eachSong = await Songs.findById(req.params.id);
    const songFile = Buffer.from(eachSong.music,"binary")
    console.log("eachSong", songFile);
   
      res.writeHead(200,{"Content-Type":"audio/mpeg","Content-Length":songFile.byteLength});
    res.end(   songFile   )
  } catch (error) {
    console.log(error);
  }
});

router.get("/guest/:id", async (req, res) => {
  //console.log("req.body show id",req.params.id)
  try {
    let eachSong = await Songs.findById(req.params.id);
    //  console.log("eachSong", eachSong);

    const lyrics = eachSong.lyric;
    //  console.log(lyrics);
    // console.log(eachSong);


    res.render("songs/show", { eachSong, lyrics });
  } catch (error) {
    console.log(error);
  }
});

router.get("/watch/:id", checkAuthenticated, async (req, res) => {
  // console.log("in watch req.body show id", req.params.id);
  try {
    let eachSong = await Songs.findById(req.params.id);

    const lyrics = fs.readFileSync("./uploads/" + eachSong.lyric).toString();
    //  console.log(lyrics);
    // console.log(eachSong);

    res.render("songs/watch", { eachSong, lyrics });
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/new",
  checkAdminAuthenticated,
  multer.fields([
    { name: "music", maxCount: 1 },
    { name: "lyric", maxCount: 1 },
  ]),
  (req, res) => {
    try {
      const song = new Songs({
        title: req.body.title,
        music: fs.readFileSync(`./uploads/${req.files.music[0].filename}`,{encoding:"binary"}),
        lyric: fs.readFileSync(`./uploads/${req.files.lyric[0].filename}`),
        artist: req.body.artist,
      });
      song.save().then((doc) => {
        res.redirect("/songs");
      });
    } catch (err) {
      res.render(err);
    }
  }
);

router.delete("/:id", checkAdminAuthenticated, async (req, res) => {
  Songs.findById(req.params.id).then((song) => {
    fs.unlinkSync("./uploads/" + song.music);
    fs.unlinkSync("./uploads/" + song.lyric);

    song.remove();

    res.redirect("/songs");
  });
});

module.exports = router;
