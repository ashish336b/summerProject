const router = require("express").Router();
const purchaseModel = require("../models/purchaseModel");
const vendorModel = require("../models/vendorModel");
const inventoryModel = require("../models/inventoryModel");
const prepareData = require("../helpers/prepareData");
const paginate = require("../helpers/paginate");
/**
 * method : GET
 * url : /crm/purchase/paginate
 */
router.get("/paginate", async (req, res, next) => {
  var paginatedResult = await paginate(
    purchaseModel,
    {
      searchableField: ["invoiceNumber", "vendorName"],
      filterBy: prepareData.find(
        { $or: [{ isReturn: false }, { isReturn: null }] },
        req
      ),
    },
    req
  );
  res.json(paginatedResult);
});
/**
 * method : POST
 * url : /crm/purchase
 */
router.post("/", async (req, res, next) => {
  req.body = prepareData.create(req.body, req);
  req.body.isCredit = false;
  req.body.paidDate = Date.now();

  /* Map each item with id */
  req.body.item.map((el) => {
    el.productName = el.productName.trim();
  });
  /* if vendor is not added already, then add */
  if (req.body.panNumber.trim()) {
    var vendorResult = await vendorModel.find(
      prepareData.find(
        {
          panNumber: req.body.panNumber.trim(),
        },
        req
      )
    );
    if (!vendorResult[0]) {
      await new vendorModel(
        prepareData.create(
          {
            vendorName: req.body.vendorName,
            phoneNumber: req.body.phoneNumber.trim(),
            address: req.body.address,
            panNumber: req.body.panNumber,
          },
          req
        )
      ).save();
    }
  }

  /* save purchase invoice and update the inventory */
  new purchaseModel(req.body).save().then((result) => {
    req.body.item.forEach(async (item) => {
      item.purchaseId = result._id.toString();
      item.space = "";
      item.purchasedFrom = req.body.vendorName;
      item.createdBy = req.body.createdBy;

      new inventoryModel(prepareData.create(item, req))
        .save()
        .then((res) => {});
    });
    res.json({ error: false, message: "Purchase Created" });
  });
});
module.exports = router;
