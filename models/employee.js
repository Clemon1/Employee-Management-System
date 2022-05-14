const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    name: {
      type: String,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "department",
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    age: {
      type: Number,
    },
    password: {
      type: String,
    },
    leave: {
      leaveStatus: [
        {
          type: Schema.Types.ObjectId,
          ref: "leave",
        },
      ],
    },
    image: {
      binData: Buffer,
      type: String,
    },
  },
  { timestamps: true },
);

employeeSchema.index({ name: "text", email: "text" });
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
