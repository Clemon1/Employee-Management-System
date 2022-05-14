const express = require("express");
const router = express.Router();
const leaveRequest = require("../models/leave");

const isredirect = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/");
  }
};

// View Leave in Admin Dashboard
router.get("/", async (req, res, next) => {
  try {
    const requestLeave = await leaveRequest.find().populate("employee").exec();
    res.render("viewLeave", { requestLeave, username: req.session.fullname });
  } catch (err) {
    res.json(err.message);
  }
});

// Approve or Reject Leave

router.post("/viewLeave/:id/check", async (req, res) => {
  try {
    const responseToLeave = await leaveRequest.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
    );
    res.redirect("/allLeave");
  } catch (err) {
    res.json(err.message);
  }
});

// getting  single leave request detail
router.get("/viewLeave/:id", async (req, res) => {
  const leave = await leaveRequest
    .findById(req.params.id)
    .populate("employee")
    .exec();
  res.render("approveLeave", {
    leave,
    username: req.session.fullname,
  });
});

module.exports = router;
