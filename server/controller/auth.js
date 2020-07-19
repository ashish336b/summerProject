const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { verifyToken } = require("../middleware/verifyToken");
const paginate = require("../middleware/paginate");
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
  var token = await jwt.sign({ user: user }, "12helloworld12", {
    expiresIn: "3h",
  });
  res.json({ token: token, error: null });
});

/**
 * method : get
 * url : /api/auth/me
 */
router.get("/me", verifyToken, (req, res, next) => {
  res.send("Welcome Ashish");
});

/**
 * method : get
 * url : /api/auth/list
 */
router.get(
  "/list",
  paginate(userModel, {
    searchableField: ["name"],
    filterBy: { isDeleted: false },
    select: [],
  }),
  (req, res, next) => {
    res.json(res.paginatedResults);
  }
);

/**
 * method : GET
 * url : /api/auth/generateUser
 */
/* router.get("/generateUser", async (req, res, next) => {
  const axios = require("axios");
  for (let i = 0; i <= 100; i++) {
    await axios.post("http://localhost:3000/api/auth/register", {
      firstName: "Ashish",
      lastName: "Bhandari",
      role: "admin",
      address: "balkot",
      username: "ashish336b" + i,
      password: "11111111",
      confirmPassword: "11111111",
    });
  }
  res.send("success");
}); */
module.exports = router;
