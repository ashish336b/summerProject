const _ = require("lodash");
const numberFormat = require("./numberFormat");
const dateHelper = require("./dateAndTime");

/** Makes data-api for Reports
 *  @author: Atul Nepal
 *  @author: codera21
 */
class Report {
  /**
   * @param {*} modelObj   object of Mongoose Model
   * @param {*} queryParams mongoose select query paramaters to fetch relevant info
   */
  constructor(modelObj, queryParams) {
    this.modelObj = modelObj;
    this.queryParams = queryParams;
  }
  /** Gets month by month date and total sum with other info
   *  @retun Object with relevant date and  sum, average , grand total , min and max amount
   */
  async getMonthyReport(dbField) {
    var sort = {};
    sort[`${dbField.date}`] = -1;
    const allResults = await this.modelObj
      .find(this.queryParams)
      .select([dbField.total, dbField.date])
      .sort(sort);

    const distinctMonths = _.chain(allResults)
      .map((el) => dateHelper.getMonthYearString(el[`${dbField.date}`]))
      .uniq()
      .value();

    const result = [];
    let grandTotal = 0;
    distinctMonths.forEach((date) => {
      const sum = _.chain(allResults)
        .filter(
          (el) => date === dateHelper.getMonthYearString(el[`${dbField.date}`])
        )
        .map((el) => parseFloat(el[`${dbField.total}`]))
        .sum()
        .value();
      grandTotal = grandTotal + sum;
      result.push({ date: date, sum: numberFormat(sum.toFixed(2)) });
    });

    return {
      result: result,
      gt: numberFormat(grandTotal.toFixed(2)),
      min: numberFormat(
        Math.min(
          ...result.map((el) => (el = parseFloat(el.sum.replace(",", ""))))
        )
      ),
      max: numberFormat(
        Math.max(...result.map((el) => (el = el.sum.replace(",", ""))))
      ),
      avg: numberFormat(grandTotal / result.length),
    };
  }
  /** Gets day by day date and total sum with other info
   *  @retun Object with relevant date and  sum, average , grand total , min and max amount
   */
  async getDailyReport(formDate, dbField) {
    const queryParams = this.queryParams;
    queryParams[`${dbField.date}`] = { $gte: formDate };
    const sort = {};
    sort[`${dbField.date}`] = -1;
    const allResults = await this.modelObj
      .find(queryParams)
      .select([dbField.total, dbField.date])
      .sort(sort);

    const distinctDate = _.chain(allResults)
      .map((el) => dateHelper.getDateInString(el[`${dbField.date}`]))
      .uniq()
      .value();

    const result = [];
    let grandTotal = 0;
    distinctDate.forEach((date) => {
      const sum = _.chain(allResults)
        .filter(
          (el) => date === dateHelper.getDateInString(el[`${dbField.date}`])
        )
        .map((el) => parseFloat(el[`${dbField.total}`]))
        .sum()
        .value();
      grandTotal = grandTotal + sum;
      result.push({ date: date, sum: numberFormat(sum.toFixed(2)) });
    });

    return {
      result: result,
      gt: numberFormat(grandTotal.toFixed(2)),
      min: numberFormat(
        Math.min(
          ...result.map((el) => (el = parseFloat(el.sum.replace(",", ""))))
        )
      ),
      max: numberFormat(
        Math.max(...result.map((el) => (el = el.sum.replace(",", ""))))
      ),
      avg: numberFormat(grandTotal / result.length),
    };
  }
}

module.exports = {
  Report: Report,
};
