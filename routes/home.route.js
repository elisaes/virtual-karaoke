const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("./kroom/home");
});

module.exports = router;
