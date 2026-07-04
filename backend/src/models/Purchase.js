import mongoose from "mongoose";

// ==============================
// Purchase Item Schema
// ==============================
const purchaseItemSchema = new mongoose.Schema({
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
    min: 0,
  },
});

// ==============================
// Purchase Schema
// ==============================
const purchaseSchema = new mongoose.Schema(
  {
    invoiceNo: {
      type: String,
      required: true,
      unique: true,
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    purchaseDate: {
      type: Date,
      default: Date.now,
    },

    items: [purchaseItemSchema],

    grandTotal: {
      type: Number,
      required: true,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Paid",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Purchase", purchaseSchema);