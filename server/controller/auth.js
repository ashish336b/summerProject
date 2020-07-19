const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const {verifyToken} = require("../middleware/verifyToken");
/**
 * method : POST
 * url : /api/auth/login
 */
router.post("/register", async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword)
    return res.send({
      error: true,
      message: "Password does not Match",
    });
  /* check if phoneNumber already exits */
  var getUser = await userModel.findOne({
    username: req.body.username,
  });
  if (getUser)
    return res.send({
      error: true,
      message: "User with this username already Exits",
    });
  /* hash password to store */
  const hashedPassword = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );

  new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    address: req.body.address,
    username: req.body.username,
    password: hashedPassword,
  })
    .save()
    .then((result) => {
      res.json({
        error: null,
        message: "User Registered Successfully",
        user: result,
      });
    });
});
/**
 * method : POST
 * url : /api/auth/login
 */
router.post("/login", async (req, res, next) => {
  const jwt = require("jsonwebtoken");
  const user = await userModel.findOne({
    username: req.body.username,
    isDeleted: false,
    role: "admin",
  });
  if (!user) {
    return res.status(403).json({
      error: true,
      message: "Password Or username doesn't Match",
    });
  }
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(403).json({
      error: true,
      message: "Password Or username doesn't Match",
    });
  }
  user.password = null;
  var token = await jwt.sign({ user: user }, "12helloworld12",{expiresIn : '3h'});
  res.json({ token: token, error: null });
});

/**
 * method : get
 * url : /api/auth/me
 */
router.get("/me", verifyToken ,(req , res , next)=>{
    res.send("Welcome Ashish");
})

module.exports = router;
