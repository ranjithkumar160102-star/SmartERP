import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      default: "",
    },

    gst: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    openingBalance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;