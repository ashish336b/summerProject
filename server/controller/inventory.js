const router = require("express").Router();
const inventoryModel = require("../models/inventoryModel");
const paginate = require("../helpers/paginate");
const prepareData = require("../helpers/prepareData");
/**
 * method : GET ok ok ok
 * url : /crm/inventory/paginate
 */
router.get("/paginate", async (req, res, next) => {
  let paginatedResult = await paginate(
    inventoryModel,
    {
      searchableField: ["productName", "manufacturer", "quantity", "mrp", "cp"],
      filterBy: prepareData.find({}, req),
    },
    req
  );
  res.json(paginatedResult);
});
module.exports = router;
