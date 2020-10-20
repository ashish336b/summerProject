const router = require("express").Router();
const vendorModel = require("../models/vendorModel");
const purchaseModel = require("../models/purchaseModel");
const prepareData = require("../helpers/prepareData");
const paginate = require("../helpers/paginate");
/**
 * method : GET
 * url : /crm/vendor/paginate
 */
router.get("/paginate", async (req, res, next) => {
  var paginatedResult = await paginate(
    vendorModel,
    { searchableField: ["name"], filterBy: prepareData.find({}, req) },
    req
  );
  res.json(paginatedResult);
});
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
/**
 * method : GET
 * url : /crm/vendor/profile/:id
 */
router.get("/profile/:id", async (req, res, next) => {
  let vendor = await vendorModel.findById(req.params.id);
  let vendorPurchase = await purchaseModel.find(
    prepareData.find(
      {
        vendorName: vendor.vendorName,
        isReturn: false,
      },
      req
    )
  );
  let vendorPurchaseReturn = await purchaseModel.find(
    prepareData.find({ vendorName: vendor.vendorName, isReturn: true }, req)
  );
  let creditPurchase = vendorPurchase
    .filter((el) => {
      if (el.isCredit) return el;
    })
    .reduce((acc, curr) => {
      return !curr.netTotal ? acc + 0 : acc + parseFloat(curr.netTotal);
    }, 0);
  let totalPurchasedAmount = vendorPurchase.reduce((acc, curr) => {
    return !curr.netTotal ? acc + 0 : acc + parseFloat(curr.netTotal);
  }, 0);
  let allItemPurchased = vendorPurchase
    .map((el) => el.item)
    .reduce((acc, curr) => {
      return [...acc, ...curr];
    }, []);
  let returnItem;
  if (vendorPurchaseReturn.length > 0) {
    returnItem = vendorPurchaseReturn
      .map((el) => el.item)
      .reduce((acc, curr) => {
        return [...acc, ...curr];
      });
  } else {
    returnItem = [];
  }
  res.json({
    allPurchase: totalPurchasedAmount,
    cashPurchase: totalPurchasedAmount - creditPurchase,
    creditPurchase: creditPurchase,
    vendorPurchase: vendorPurchase,
    vendorPurchaseReturn,
    vendorDetails: vendor,
    item: allItemPurchased,
    returnItem: returnItem,
  });
});
module.exports = router;
