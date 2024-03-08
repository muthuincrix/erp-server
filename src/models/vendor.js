const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    companyNama: {
      type: String,
    },
    orgId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Org"
    },
    companyDetails: {
      companyNama: {
        type: String,
      },
      GSTPin: {
        type: String,
        max: 15,
        min: 15,
      },
    },
    billingAddress: {
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipCode: {
        type: String,
      },
    },
    shippingAddress: [
      {
        address: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
        zipCode: {
          type: String,
        },
      },
    ],
    balance: {
      openingBalance: {
        type: Number,
      },
      currentBalance: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("vendor", schema);