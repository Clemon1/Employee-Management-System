const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const { validateUserSignUp } = require("../middlewares/validation/users");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", adminController.login);

// SignUp Routes

router.get("/SignUp", (req, res) => {
  res.render("signup");
});

router.post("/SignUp", validateUserSignUp, adminController.createAdmin);

router.get("/SignOut", adminController.logOut);

module.exports = router;
