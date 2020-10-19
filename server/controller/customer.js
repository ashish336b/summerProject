const router = require("express").Router();
const userModel = require("../models/userModel");
const prepareData = require("../helpers/prepareData");
const invoiceModel = require("../models/invoiceModel");
const numberFormat = require("../helpers/numberFormat");
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
/**
 * method : GET
 * url : /crm/customer/profile/:id
 */
router.get("/profile/:id", async (req, res, next) => {
  userModel
    .findById(req.params.id)
    .then((customer) => {
      invoiceModel
        .find(
          prepareData.find(
            {
              phoneNumber: customer.phoneNumber,
              $or: [{ isReturn: false }, { isReturn: null }],
            },
            req
          )
        )
        .then(async (invoices) => {
          let returnInvoices = await invoiceModel.find(
            prepareData.find(
              {
                phoneNumber: customer.phoneNumber,
                isReturn: true,
              },
              req
            )
          );
          let allReturnItems = [];
          if (returnInvoices.length > 0) {
            allReturnItems = returnInvoices
              .map((el) => el.item)
              .reduce((acc, curr) => {
                acc = [...acc, ...curr];
                return acc;
              });
          }
          let credit = 0;
          let totalPaid = 0;
          let allInvoiceItem = invoices
            .map((el) => el.item)
            .reduce((acc, curr) => {
              acc = [...acc, ...curr];
              return acc;
            }, []);
          invoices = invoices.map((invoice) => {
            if (invoice.isCredit) {
              credit += invoice.netTotal;
            } else {
              totalPaid += invoice.netTotal;
            }

            return {
              _id: invoice._id,
              isCredit: invoice.isCredit,
              netTotal: invoice.netTotal,
              date: invoice.date,
              paidDate: invoice.paidDate,
            };
          });

          const params = {
            customer: customer,
            invoices,
            returnInvoices,
            allInvoiceItem,
            allReturnItems,
            credit: numberFormat(credit),
            totalPaid: numberFormat(totalPaid),
          };
          res.json({ params, error: null });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
