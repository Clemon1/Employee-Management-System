const express = require("express");
const router = express.Router();
const departments = require("../controller/department");

router.get("/", departments.findDepartment, departments.isredirect);
router.post("/create", departments.addDepartment);
router.post("/delete/:id", departments.deleteDepartment);

module.exports = router;
