const router = require("express").Router();
const prepareData = require("../../helpers/prepareData");
const { Report } = require("../../helpers/Report");
const purchaseModel = require("../../models/purchaseModel");
/**
 * method : GET
 * url : /crm/report/purchase/allPurchases/:type
 */
router.get("/:type", async (req, res, next) => {
  const type = req.params.type;
  const dbField = { date: "paidDate", total: "netTotal" };
  const queryParams = prepareData.find(
    {
      isCredit: false,
      isReturn: false,
    },
    req
  );
  const report = new Report(purchaseModel, queryParams);
  if (type == "allTime") {
    res.json(await report.getMonthyReport(dbField));
  } else if (type == "lastWeek") {
    res.json(
      await report.getDailyReport(new Date() - 7 * 24 * 60 * 60 * 1000, dbField)
    );
  } else if (type == "lastMonth") {
    res.json(
      await report.getDailyReport(
        new Date() - 30 * 24 * 60 * 60 * 1000,
        dbField
      )
    );
  } else if (type == "today") {
    res.json(
      await report.getDailyReport(
        new Date(new Date().toLocaleDateString()),
        dbField
      )
    );
  } else {
    res.json({ status: 500, err: "Invalid params" });
  }
});
module.exports = router;
