var express = require("express");
var router = express.Router();

router.get("/register", (req, res, next) => {});

router.get("/login", (req, res, next) => {
  res.json({ success: true, message: "successfully login ok" });
});

module.exports = router;
