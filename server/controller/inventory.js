const router = require("express").Router();
const inventoryModel = require("../models/inventoryModel");
const paginate = require("../helpers/paginate");
const prepareData = require("../helpers/prepareData");
/**
 * method : GET
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
/**
 * method : GET
 * path : /crm/inventory/autoComplete
 */
router.get("/autoComplete", (req, res, next) => {
  const searchText = req.query.searchText;
  const displayEmpty = req.query.displayEmpty;
  const searchRegix = new RegExp(searchText, "i");

  let queryParams = {};

  if (displayEmpty == "Y") {
    queryParams = prepareData.find(
      {
        productName: searchRegix,
      },
      req
    );
  } else {
    queryParams = prepareData.find(
      {
        productName: searchRegix,
        quantity: { $gt: 0 },
      },
      req
    );
  }

  inventoryModel
    .find(queryParams)
    .select({})
    .then((result) => {
      ret = [];
      result.forEach((el) => {
        let unit = el.unit ? el.unit : "";
        let cp = el.cp ? el.cp : "";
        ret.push({
          value: el.mrp,
          label: `${el.productName} -- ${el.manufacturer} -- ${el.mrp}`,
          mrp: el.mrp,
          productName: el.productName,
          manufacturer: el.manufacturer,
          inventoryId: el._id,
          purchaseId: el.purchaseId,
          unit: unit,
          cp: cp,
        });
      });
      res.json(ret);
    });
});
module.exports = router;
