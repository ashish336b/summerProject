const express = require("express");
const router = express.Router();
const { verifyAdminToken } = require("../middleware/authGuard");
router.use("/crm", require("../controller/auth"));
router.use(
  "/crm/customer",
  verifyAdminToken,
  require("../controller/customer")
);
router.use(
  "/crm/purchase",
  verifyAdminToken,
  require("../controller/purchase")
);
router.use(
  "/crm/inventory",
  verifyAdminToken,
  require("../controller/inventory")
);
router.use("/crm/invoice", verifyAdminToken, require("../controller/invoice"));
router.use("/crm/vendor", verifyAdminToken, require("../controller/vendor"));
module.exports = router;
