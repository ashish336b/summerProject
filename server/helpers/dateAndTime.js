const dateHelper = {
  getDate: (dateObject) => {
    const dateObj = new Date(dateObject);
    const months = dateObj.getUTCMonth() + 1;
    const monthYear = `${dateObj.getUTCFullYear()}/${months}/${dateObj.getDate()}`;
    return monthYear;
  },

  getDifference: (initialDateObject, finalDateObject) => {
    var diffInMiliSecond = Math.abs(finalDateObject - initialDateObject),
      hours = Math.floor(diffInMiliSecond / 3600000),
      remainingHours = diffInMiliSecond % 3600000,
      minutes = Math.floor(remainingHours / 60000),
      remainingMinutes = remainingHours % 60000,
      second = Math.floor(remainingMinutes / 1000);
    if (initialDateObject > finalDateObject) {
      return `${hours} hours ${minutes} minutes ${second} seconds (initial is greater)`;
    }
    return `${hours} hours ${minutes} minutes ${second} seconds`;
  },

  getDateInString: (timeStamp) => {
    //return eg. "April 9 2020"
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var monthsIndex = new Date(timeStamp).getMonth();
    var fullYear = new Date(timeStamp).getFullYear();
    var date = new Date(timeStamp).getDate();
    return `${months[monthsIndex]} ${date} ${fullYear}`;
  },

  getMonthYear: (timeStamp, splitter) => {
    return `${new Date(timeStamp).getFullYear()}${splitter}${new Date(
      timeStamp
    ).getMonth()}`;
  },

  getMonthYearString: (timeStamp) => {
    const date = new Date(timeStamp);
    const monthsArr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currMonth = monthsArr[date.getMonth()];
    return `${currMonth} ${date.getFullYear()}`;
  },

  formatAMPM: (hours) => {
    var AMorPM = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}${AMorPM}`;
  },
};
module.exports = dateHelper;
