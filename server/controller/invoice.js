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
  let params = prepareData.find(
    { $or: [{ isReturn: false }, { isReturn: null }] },
    req
  );
  if (req.params.type == "return") {
    params = prepareData.find({ isReturn: true }, req);
  }
  let paginatedResult = await paginate(
    invoiceModel,
    {
      searchableField: ["name", "phoneNumber"],
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
  try {
    invoiceDataToSave.item.forEach(async (item) => {
      let reduceQty = item.quantity;
      reduceQty = parseInt(reduceQty);

      let total = item.quantity * item.rate;
      let totalAfterDiscount = total - (total * item.discountRate) / 100;
      item.total = parseFloat(total).toFixed(2);
      item.totalAfterDiscount = parseFloat(totalAfterDiscount).toFixed(2);
      netTotal = netTotal + totalAfterDiscount;
      let invDoc = await inventoryModel.findById(item.inventoryId);
      let oldQty = parseInt(invDoc.quantity);
      let newQty = oldQty - reduceQty;
      newQty = newQty <= 0 ? 0 : newQty;
      invDoc.quantity = newQty;
      await invDoc.save();
    });
    // grand total
    invoiceDataToSave.grandTotal = netTotal;
    // net total
    invoiceDataToSave.netTotal =
      netTotal - parseFloat(invoiceDataToSave.discountAmt);
    invoiceDataToSave.netTotal = parseFloat(invoiceDataToSave.netTotal)
      .toFixed(2)
      .toString();
    //  discount amount
    invoiceDataToSave.discountAmt = parseFloat(invoiceDataToSave.discountAmt)
      .toFixed(2)
      .toString();
    // grand total
    invoiceDataToSave.grandTotal = parseFloat(invoiceDataToSave.grandTotal)
      .toFixed(2)
      .toString();

    var result = await new invoiceModel(
      prepareData.create(invoiceDataToSave, req)
    ).save();
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
            lastName: name[1],
          };
        }
        userObjToSave.role = "customer";
        userObjToSave.phoneNumber = req.body.phoneNumber.trim();
        userObjToSave.address = req.body.address.trim();
        await new userModel(userObjToSave).save();
        res.json({
          error: null,
          data: result,
        });
      }
    }
  } catch (error) {
    console.log("error sdf sdf sdfffffffffffffffffffffffffffffffffffff");
    console.log(error);
  }
});
/**
 * method : GET
 * url : /crm/invoice/:id
 */
router.get("/:id", async (req, res, next) => {
  res.json(await invoiceModel.findById(req.params.id));
});
/**
 * method : GET
 * url : /crm/invoice/invoiceNumber/:invoiceNumber
 */
router.get("/invoiceNumber/:invoiceNumber", async (req, res, next) => {
  res.json(
    await invoiceModel.findOne({ invoiceNumber: req.params.invoiceNumber })
  );
});
/**
 * type: POST
 * path: crm/invoice/return
 */
router.post("/return", (req, res, next) => {});
module.exports = router;
