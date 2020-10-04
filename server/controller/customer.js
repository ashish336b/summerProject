const router = require("express").Router();
const userModel = require("../models/userModel");
const prepareData = require("../helpers/prepareData");
/**
 * method : GET
 * url : /crm/customer/autocomplete
 */
router.get("/autocomplete", async (req, res, next) => {
  var searchRegix = new RegExp(req.query.searchText, "i");
  userModel
    .find(
      prepareData.find(
        {
          $or: [
            { firstName: searchRegix },
            { middleName: searchRegix },
            { lastName: searchRegix },
          ],
          role: "customer",
        },
        req
      )
    )
    .select({})
    .then((result) => {
      ret = [];
      result.forEach((el) => {
        let fullName = undefined;
        if (el.middleName) {
          fullName = `${el.firstName} ${el.middleName} ${el.lastName}`;
        } else {
          fullName = `${el.firstName} ${el.lastName}`;
        }
        ret.push({
          label: fullName,
          address: el.address,
          phoneNumber: el.phoneNumber,
        });
      });
      res.json(ret);
    });
});
module.exports = router;
