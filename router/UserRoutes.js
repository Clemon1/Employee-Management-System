const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const employees = require("../models/employee");
const leave = require("../models/leave");

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/user");
  }
};

router.get("/", (req, res) => {
  res.render("userLogin");
});

// Employee  user Login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await employees
      .findOne({ email })
      .populate("department")
      .exec();
    if (!user) {
      return res
        .status(400)
        .render("userLogin", { message: "User does not exits" });
    }
    const dbPassword = user.password;
    const match = await bcrypt.compare(password, dbPassword);
    if (!match) {
      res.status(400).render("userLogin", { message: "Invalid Credentails " });
    }
    req.session.user = user.email;
    req.session.userId = user.id;
    req.session.fullname = user.name;
    req.session.image = user.image;
    req.session.department = user.department.name;
    req.session.isAuth = true;
    req.flash("message", "Logged in Successfully");
    res.redirect("/user/dashboard");
  } catch (error) {
    res.json(error.message);
  }
});

// Logout

router.get("/logOut", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/user");
  });
});

// Employee DashBoard route

router.get("/dashboard", isAuth, async (req, res, next) => {
  try {
    const employ = await leave.find();

    console.log(employ);
    res.render("employee", {
      employ,
      useid: req.session.userId,
      users: req.session.user,
      userFullname: req.session.fullname,
      profileImage: req.session.image,
      department: req.session.department,
      message: req.flash("message"),
    });
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;
