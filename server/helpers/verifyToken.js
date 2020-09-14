var verifyToken = async (token) => {
  const jwt = require("jsonwebtoken");
  if (typeof token === "undefined") {
    return false;
  }
  var t = token.split(" ")[1];
  try {
    var authData = await jwt.verify(t, "12helloworld12");
    return authData;
  } catch (error) {
    return false;
  }
};
module.exports = verifyToken;
