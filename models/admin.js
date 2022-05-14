const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const adminSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastname: {
      type: String,
      required: [true, "Last Name is required"],
    },
    email: {
      type: String,
      unique: true,
      lowercase:true,
      required: [true, "Your Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: [6, "Password should not be less than 6 Characters"],
    },
    image: {
      binData:Buffer,
      type:String,
    }
  },
  { timestamps: true }
);

const admin = mongoose.model("Admin", adminSchema);

module.exports = admin;
