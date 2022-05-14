const express = require("express");
const router = express.Router();
const leaveController = require("../controller/leaveController");

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/user");
  }
};

// find all leave status
router.get("/", isAuth, leaveController.findLeave);

// create leave status
router.post("/create", leaveController.emp, leaveController.createLeave);

// delete a single leave status
router.post("/delete/:id", leaveController.deleteLeave);

module.exports = router;
