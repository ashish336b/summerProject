const express = require("express");
const router = express.Router();

router.use("/crm", require("../controller/auth"));
router.use("/crm/purchase", require("../controller/purchase"));
module.exports = router;
