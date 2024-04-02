const mongoose = require("mongoose");

const schema = mongoose.Schema({
  orgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Org",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerDetails: {
    customerName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  companyDetails: {
    companyName: {
      type: String,
   
    },
    GSTIN: {
      type: Number,
      maxLength:15,
      minLength:15,
    },
  },
  billingDetails: {
    payMode: {
      type: String,
      enum: ["card", "cash", "upi", "credit"],
    },
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  additionalCharges: {
    pakage: {
      type: Number,
    },
    delivery: {
      type: Number,
    },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: {
      type: String,
      enum: ["amount", "persentage"],
    },
    value: {
      type: Number,
    },
  },
  tax: {
    type: Number,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed", "cancelled", "partial"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
