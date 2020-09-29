const verifyToken = require("../helpers/verifyToken");

const authGuard = {
  verifyAdminToken: async (req, res, next) => {
    let data = await verifyToken(req.headers.authorization);
    if (!data) {
      return res.status(200).json({ error: true, message: "unauthorized" });
    }
    if (data.user.role == "admin") {
      req.adminData = data;
      return next();
    }
    return res.status(200).json({ error: true, message: "unauthorized" });
  },
  verifyUserToken: async (req, res, next) => {
    let data = await verifyToken(req.headers.authorization);
    if (!data) {
      return res.status(200).json({ error: true, message: "unauthorized" });
    }
    if (data.user.role == "user") {
      req.crmUser = data;
      return next();
    }
    return res.status(200).json({ error: true, message: "unauthorized" });
  },
};

module.exports = authGuard;
