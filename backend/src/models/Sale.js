import mongoose from "mongoose";

const saleItemSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },

    itemName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const saleSchema = new mongoose.Schema(
  {
    invoiceNo: {
      type: String,
      required: true,
      unique: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    saleDate: {
      type: Date,
      default: Date.now,
    },

    items: [saleItemSchema],

    grandTotal: {
      type: Number,
      required: true,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Paid",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Sale", saleSchema);