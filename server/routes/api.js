const express = require("express");
const router = express.Router();
const { verifyAdminToken } = require("../middleware/authGuard");
router.use("/crm", require("../controller/auth"));
router.use(
  "/crm/purchase",
  verifyAdminToken,
  require("../controller/purchase")
);
router.use(
  "/crm/inventory",
  verifyAdminToken,
  require("../controller/purchase")
);
module.exports = router;
