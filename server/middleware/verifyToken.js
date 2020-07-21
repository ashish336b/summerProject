const jwt = require("jsonwebtoken");

const authGuard = {
  verifyAdminToken: (req, res, next) => {
    if (typeof req.headers.authorization === "undefined")
      return res.status(403).json({ error: true, message: "unauthorized" });
    var token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "12helloworld12", (err, authdata) => {
      if (err) {
        return res.status(403).json({ error: true, message: "unauthorized" });
      } else {
        if (authdata.user.role == "admin") {
          req.adminData = authdata;
          return next();
        } else {
          return res.status(403).json({ error: true, message: "unauthorized" });
        }
      }
    });
  },
  verifyUserToken: (req, res, next) => {
    if (typeof req.headers.authorization === "undefined")
      return res.status(403).json({ error: true, message: "unauthorized" });
    var token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "12helloworld12", (err, authdata) => {
      if (err) {
        return res.status(403).json({ error: true, message: "unauthorized" });
      } else {
        if (authdata.user.role == "user") {
          req.userData = authdata;
          return next();
        } else {
          return res.status(403).json({ error: true, message: "unauthorized" });
        }
      }
    });
  },
};

module.exports = authGuard;
