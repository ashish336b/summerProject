const router = require("express").Router();
const inventoryModel = require("../models/inventoryModel");
const paginate = require("../helpers/paginate");
/**
 * method : GET
 * url : /crm/inventory/paginate
 */
router.get("/paginate", async (req, res, next) => {
  res.json("success");
});
module.exports = router;
