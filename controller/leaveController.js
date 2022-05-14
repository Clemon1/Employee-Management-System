const leave = require("../models/leave");
const employees = require("../models/employee");
const extend = require("extend");
//Leave Form
const isredirect = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/");
  }
};

const findLeave = async (req, res) => {
  try {
    res.render("leaveApply", {
      users: req.session.user,
      userId: req.session.userId,
      profileImage: req.session.image,
    });
  } catch (error) {
    res.json(error.message);
  }
};

const emp = async (req, res, next) => {
  try {
    req.employee = req.session.userId;
  } catch (err) {
    res.json(err.message);
  }

  next();
};

// Create Leave
const createLeave = async (req, res) => {
  try {
    const staff = await employees.findById(req.session.userId);
    const leaves = new leave({
      employee: req.employee,
      fromDate: new Date(req.body.fromDate),
      toDate: new Date(req.body.toDate),
      reason: req.body.reason,
    });
    const savingLeave = await leaves.save();
    staff.leave.leaveStatus.push(savingLeave);
    const staffSave = await staff.save();

    res.redirect("/user/dashboard");
  } catch (error) {
    res.json({ message: error.message });
  }
};

//delete Leave Status
const deleteLeave = async (req, res) => {
  const id = req.params.id;
  const removeLeave = await leave.findByIdAndRemove(id);
  res.json(removeLeave);
};
module.exports = {
  findLeave,
  createLeave,
  deleteLeave,
  emp,
  isredirect,
};
