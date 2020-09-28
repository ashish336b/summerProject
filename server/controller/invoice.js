const router = require("express").Router();
const userModel = require("../models/userModel");
const inventoryModel = require("../models/inventoryModel");
const invoiceModel = require("../models/invoiceModel");
const prepareData = require("../helpers/prepareData");
const paginate = require("../helpers/paginate");
/**
 * method : GET
 * url : /crm/invoice/paginate/:type?
 */
router.get("/paginate/:type?", async (req, res, next) => {
  let params = prepareData.find({ isReturn: false }, req);
  if (req.params.type == "return") {
    params = prepareData.find({ isReturn: true }, req);
  }
  let paginatedResult = await paginate(
    inventoryModel,
    {
      searchableField: ["invoiceNumber", "name", "phoneNumber"],
      filterBy: params,
    },
    req
  );
  res.json(paginatedResult);
});
/**
 * method : POST
 * url : /crm/invoice
 */
router.post("/", async (req, res, next) => {
  // invoices are credit by default
  req.body.isCredit = true;
  let invoiceDataToSave = req.body;

  let netTotal = 0;
  invoiceDataToSave.item.forEach((item) => {
    let reduceQty = item.quantity;
    reduceQty = parseInt(reduceQty);

    let total = item.quantity * item.rate;
    let totalAfterDiscount = total - (total * item.discountRate) / 100;
    item.total = parseFloat(total).toFixed(2);
    item.totalAfterDiscount = parseFloat(totalAfterDiscount).toFixed(2);
    netTotal = netTotal + totalAfterDiscount;
    inventoryModel.findById(item.inventoryId, (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        let oldQty = parseInt(doc.quantity);
        let newQty = oldQty - reduceQty;
        doc.quantity = newQty;
        doc.save();
      }
    });
  });
  // grand total
  invoiceDataToSave.grandTotal = netTotal;
  // net total
  invoiceDataToSave.netTotal =
    netTotal - parseFloat(invoiceDataToSave.discountAmt);
  invoiceDataToSave.netTotal = parseFloat(invoiceDataToSave.netTotal).toFixed(
    2
  );
  //  discount amount
  invoiceDataToSave.discountAmt = parseFloat(
    invoiceDataToSave.discountAmt
  ).toFixed(2);
  // grand total
  invoiceDataToSave.grandTotal = parseFloat(
    invoiceDataToSave.grandTotal
  ).toFixed(2);

  new invoiceModel(prepareData.create(invoiceDataToSave, req))
    .save()
    .then(async (result) => {
      if (req.body.phoneNumber.trim()) {
        let oneUser = await userModel.find(
          prepareData.find({ phoneNumber: invoiceDataToSave.phoneNumber }, req)
        );
        let userObjToSave;
        if (oneUser) {
          let name = invoiceDataToSave.name.split(" ");
          if (name.length > 2) {
            userObjToSave = {
              firstName: name[0],
              lastName: name[2],
              middleName: name[1],
            };
          } else if (name.length == 2) {
            userObjToSave = {
              firstName: name[0],
              lastName: name[2],
            };
          }
          userObjToSave.role = "user";
          userObjToSave.phoneNumber = req.body.phoneNumber.trim();
          userObjToSave.address = req.body.address.trim();
          await new userModel(userObjToSave).save();
        }
      }
      res.json({
        error: null,
        data: result,
      });
    });
});
module.exports = router;
