const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String, 
      required: true,
    },
    doctorInfo: {
      type: Object,
      required: true, 
    },
    userInfo: {
      type: Object,
      required: true,
    },
    fname:{
      type: Object,
      required: true,
    },
    lname:{
      type: Object,
      required: true,
    },
    phone:{
      type: Object,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    method: {
      type: String,
      required: true,
      default: "-",
    },
    
    pay:{
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model("appointmenst", appointmentSchema);
module.exports = appointmentModel;
