const department = require("../models/department");

// Find all Department
const findDepartment = async (req, res) => {
  const departments = await department.find();
  res.render("department", { departments, username: req.session.fullname });
};

const isredirect = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/");
  }
};
// create department
const addDepartment = async (req, res) => {
  // checking if department already exist
  try {
    const duplicate = await department.findOne({ name: req.body.name });
    if (duplicate) {
      return res.status(501).send("Name already exist");
    }

    const departments = new department({
      name: req.body.name,
    });
    const depth = await departments.save();
    res.redirect("/department");
  } catch (error) {
    res.send("Error creating department");
  }
};
// delete department
const deleteDepartment = async (req, res) => {
  const id = req.params.id;
  const departments = await findByIdAndDelete(id);

  res.json(departments);
};

module.exports = {
  findDepartment,
  addDepartment,
  deleteDepartment,
  isredirect,
};
