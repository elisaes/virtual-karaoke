const Songs = require("../models/songs.model");
const fs = require("fs");
const Lyrics = require("../models/songs.model");
const router = require("express").Router();
//const musicController = require("../controller/musicController");
const multer = require("../config/multer");
//console.log(multer);
// router.get("/", (req, res) => {
//   res.render("./songs/list");
// });

router.get("/", async (req, res) => {
  try {
    let songs = await Songs.find();
    res.render("./songs/new", { songs });
    console.log("songs from find", songs);
  } catch (error) {
    console.log(error);
  }
});

router.get("/show/:id", async (req, res) => {
  //console.log("req.body show id",req.params.id)
  try {
    //Populate only includes the data from  cuisine collection and ownedBy collection
    let eachSong = await Songs.findById(req.params.id);

    const lyrics = fs.readFileSync("./uploads/"+eachSong.lyric).toString();
    console.log(lyrics)
    console.log(eachSong);

    res.render("songs/show", { eachSong,lyrics });
  } catch (error) {
    console.log(error);
  }
});

router.post("/new", multer.fields([{ name: 'music', maxCount: 1 }, { name: 'lyric', maxCount: 1 }]), (req, res) => {
  console.log("saving in db",req.files.lyric[0].data);
  try {
    const song = new Songs({
      title: req.body.title,
      music: req.files.music[0].filename,
      lyric: req.files.lyric[0].filename,
      artist: req.body.artist,
    
    });
    song.save().then((doc) => {
      res.redirect("/songs");
    });
  } catch (err) {
    res.render(err);
  }
});

// router.post("/new/lyrics", (req, res) => {
//   console.log("saving in db");
//   try {
//     const lyrics = new Lyrics({
//       title: req.body.title,
//     });
//     lyrics.save().then((doc) => {
//       res.redirect("/new");
//     });
//   } catch (err) {
//     res.render(err);
//   }
// });

// router.get("/test",(req,res)=>{

//   Songs.find().then(
//     docs=>{
//       console.log(docs)
//       const first = docs[0]
//       const path  = "./upload/"+first.music
//       console.log(path)
//     }
//   )

// })

// router.post("/new", async (req, res) => {
//   console.log(req.body);
//   try {
//     const song = new Songs({
//       title: req.body.title,
//       music: req.file,
//       artist: req.body.artist,
//     });

//     let savedSong = await song.save();
//     //  console.log(savedSong);
//     if (savedSong) {
//       res.render("./songs/list");
//     }
//   } catch (err) {
//     res.render(err);
//   }
// });

router.delete("/", async (req, res) => {
  try {
    const id = req.params._id;
    const result = await Music.remove(id);
    res.render("./songs/list");
  } catch (err) {
    res.render(err);
  }
});

// router.get("/", musicController.getAllMusics);
// router.post("/", upload.upload.single("music"), musicController.addNewMusic);
// router.delete("/:musicId", musicController.deleteMusic);

module.exports = router;
