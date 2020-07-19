const express = require("express");
const router = express.Router();

router.use("/api/auth", require("../controller/auth"));

module.exports = router;
