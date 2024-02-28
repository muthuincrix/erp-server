const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    OTP: {
      code: {
        type: String,
        require: true,
        max: 6,
        min: 6,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", schema);