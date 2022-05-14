const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

const isredirect = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/");
  }
};
// Create New Admin
const createAdmin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      res.render("signup", { alert });
      return next();
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPass) => {
      if (err) {
        res.json({
          error: err,
        });
      }

      const admin = new Admin({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPass,
      });

      req.session.firstname = admin.firstname;

      const newAdmin = await admin.save();

      res.redirect("/home");
    });
  } catch (err) {
    res.json({ message: "Error in creating Admin" });
  }
};

// Login Login
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });
  if (!user) {
    return res.status(400).render("login", { message: "User does not exits" });
  }
  const dbPassword = user.password;
  const match = await bcrypt.compare(password, dbPassword);
  if (!match) {
    res.status(400).render("login", { message: "Invalid Credentails " });
  }
  req.session.fullname = user.firstname;
  req.session.isredirect = true;
  req.flash("message", "Logged in Successfully");
  res.redirect("/home");
};

const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
};

module.exports = {
  createAdmin,
  login,
  logOut,
  isredirect,
};
