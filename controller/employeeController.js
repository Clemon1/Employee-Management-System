const Employee = require("../models/employee");
const department = require("../models/department");
const leave = require("../models/leave");
const bcrypt = require("bcrypt");

const isredirect = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/");
  }
};

// Show all Employees
const index = async (req, res, next) => {
  try {
    const response = await Employee.find().populate("department");
    res.render("index", {
      message: req.flash("message"),
      employee: response,
      Employee: "Employee Management System",
      username: req.session.fullname,
    });
  } catch (error) {
    res.status(404).json({ messages: "Error in Looking for data" });
  }
};

// Count number of number of employees

const count = async (req, res, next) => {
  try {
    const response = await Employee.count();
    const position = await department.count();
    const leaveStatus = await leave.count();

    const adminName = req.flash("user");
    res.render("home", {
      message: req.flash("message"),
      leaveStatus,
      total: response,
      totalDepartments: position,
      adminName,
      username: req.session.fullname,
    });
  } catch (err) {
    res.json({ message: "Error in getting total number of employees" });
  }
};

// Search an Employee
const search = async (req, res, next) => {
  try {
    let searchTerm = req.body.searchTerm;
    let response = await Employee.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    })
      .populate("department")
      .exec();
    console.log(response);
    res.render("search", {
      employee: searchTerm,
      employee: response,
      title: "Employee - Search",
    });
  } catch (err) {
    res.status(500).json({ message: "Error Occured" });
  }
};

// Create New Employee

const store = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let employee = new Employee({
      name: req.body.name,
      age: req.body.age,
      image: req.file.filename,
      department: req.body.department,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
    });
    const response = await employee.save();
    req.flash("message", "Saved Successfully");
    res.redirect("/employee");
  } catch (err) {
    console.log(err.message);
  }
};

// UPDATE EMPLOYEE

const update = async (req, res, next) => {
  try {
    let employeeID = req.params.id;
    const response = await Employee.findByIdAndUpdate(employeeID, {
      $set: req.body,
    });
    req.flash("message", "Updated Successfully");
    res.redirect("/employee");
  } catch (err) {
    res.json({ message: "Error in Updating Data" });
  }
};
// Delete a single Employee
const remove = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    req.flash("message", "Deleted Successfully");
    res.redirect("/employee");
  } catch (err) {
    res.json({ response: "Error in deleting data" });
  }
};

module.exports = {
  index,
  search,
  store,
  update,
  count,
  remove,
  isredirect,
};
