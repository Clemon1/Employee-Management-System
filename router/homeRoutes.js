const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const EmployeeController = require("../controller/employeeController");
const Employee = require("../models/employee");

router.get("/", EmployeeController.count);

module.exports = router;
