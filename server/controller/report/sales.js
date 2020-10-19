const router = require("express").Router();
const prepareData = require("../../helpers/prepareData");
const { Report } = require("../../helpers/Report");
const invoiceModel = require("../../models/invoiceModel");
/**
 * method : GET
 * url : /crm/report/sales/
 */
router.get("/allSales/:type", async (req, res, next) => {
  const type = req.params.type;
  const dbFieldForPaidSales = { date: "paidDate", total: "netTotal" };
  const queryParamsForPaidSales = prepareData.find(
    {
      isCredit: false,
      $or: [
        {
          isReturn: false,
        },
        {
          isReturn: null,
        },
      ],
    },
    req
  );
  const todayTimeStamp = new Date(new Date().toLocaleDateString());
  const lastMonthTimeStamp = new Date() - 30 * 24 * 60 * 60 * 1000;
  const lastWeekTimeStamp = new Date() - 7 * 24 * 60 * 60 * 100;
  const allSalesReport = new Report(invoiceModel, queryParamsForPaidSales);
  if (type == "allTime") {
    res.json({
      paidSales: await allSalesReport.getMonthyReport(dbFieldForPaidSales),
    });
  }
  if (type == "lastWeek") {
    res.json({
      paidSales: await allSalesReport.getDailyReport(
        lastWeekTimeStamp,
        dbFieldForPaidSales
      ),
    });
  }
  if (type == "lastMonth") {
    res.json({
      paidSales: await allSalesReport.getDailyReport(
        lastMonthTimeStamp,
        dbFieldForPaidSales
      ),
    });
  }
  if (type == "today") {
    res.json({
      paidSales: await allSalesReport.getDailyReport(
        todayTimeStamp,
        dbFieldForPaidSales
      ),
    });
  }
});
module.exports = router;
