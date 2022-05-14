const express = require("express");
const router = express.Router();
const path = require("path");
const EmployeeController = require("../controller/employeeController");
const Employee = require("../models/employee");
const department = require("../models/department");
const multer = require("multer");
const storage = multer.diskStorage({
  // Destination for files
  destination: (req, file, cb) => {
    cb(null, "./public/upload");
  },
  // Add back the extension
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 4,
  },
});

router.get("/", EmployeeController.index);

router.get("/create", async (req, res) => {
  const departments = await department.find({});
  const employees = new Employee();
  res.render("add", {
    departments: departments,
    employees: employees,
    username: req.session.fullname,
    Employee: " Create New Employee",
  });
});

router.post("/", upload.single("image"), EmployeeController.store);

router.get("/edit/:id", async (req, res) => {
  const results = await Employee.findById(req.params.id);
  res.render("edit", {
    Employee: results,
    username: req.session.fullname,
    Employ: "Edit Staff Details",
  });
});

router.post("/search", EmployeeController.search);
router.post("/:id", EmployeeController.update);
router.get("/delete/:id", EmployeeController.remove);
module.exports = router;
