const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leaveSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },

    fromDate: {
      type: Date,
    },

    toDate: {
      type: Date,
    },
    reason: {
      type: String,
      required: true,
    },
    leaveStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const leaveModel = mongoose.model("leave", leaveSchema);
module.exports = leaveModel;
