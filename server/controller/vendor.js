const router = require("express").Router();
const vendorModel = require("../models/vendorModel");
const prepareData = require("../helpers/prepareData");
/**
 * method : GET
 * url : /crm/vendor/search
 */
router.get("/search", (req, res, next) => {
  let searchRegix = new RegExp(req.query.searchText, "i");
  vendorModel
    .find(
      prepareData.find(
        {
          vendorName: searchRegix,
        },
        req
      )
    )
    .select({})
    .then((result) => {
      ret = [];
      result.forEach((el) => {
        ret.push({
          label: el.vendorName,
          address: el.address,
          phoneNumber: el.phoneNumber,
          ddaNumber: el.ddaNumber,
          panNumber: el.panNumber,
        });
      });
      res.json(ret);
    });
});
module.exports = router;
