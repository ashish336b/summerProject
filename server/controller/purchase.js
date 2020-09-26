const router = require("express").Router();
const purchaseModel = require("../models/purchaseModel");
/**
 * method : GET
 * url : /crm/purchase/paginate
 */
router.get("/paginate", async (req, res, next) => {
  return res.json("success");
});
/**
 * method : POST
 * url : /crm/purchase
 */
router.post("/", async (req, res, next) => {
  const items = req.body.item;
  delete req.body.item;
  var addPurchase = new purchaseModel(req.body);
  addPurchase.item.push(...items);
  await addPurchase.save();
  res.json("success");
});
module.exports = router;
