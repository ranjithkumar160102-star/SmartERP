import Purchase from "../models/Purchase.js";
import Item from "../models/Item.js";

// ==============================
// Create Purchase
// ==============================
export const createPurchase = async (req, res) => {
  try {
    const { supplier, items, notes, status } = req.body;

    // Generate Invoice Number
    const lastPurchase = await Purchase.findOne().sort({ createdAt: -1 });

    let invoiceNo = "PUR0001";

    if (lastPurchase) {
      const lastNumber = parseInt(
        lastPurchase.invoiceNo.replace("PUR", "")
      );

      invoiceNo =
        "PUR" + String(lastNumber + 1).padStart(4, "0");
    }

    let grandTotal = 0;
    const purchaseItems = [];

    for (const item of items) {
      const dbItem = await Item.findById(item.item);

      if (!dbItem) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }

      const total = item.quantity * item.price;

      grandTotal += total;

      purchaseItems.push({
        item: dbItem._id,
        itemName: dbItem.name,
        quantity: item.quantity,
        price: item.price,
        total,
      });

      // Increase Stock
      dbItem.openingStock += item.quantity;

      await dbItem.save();
    }

    const purchase = await Purchase.create({
      invoiceNo,
      supplier,
      items: purchaseItems,
      grandTotal,
      notes,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Purchase Created Successfully",
      data: purchase,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get All Purchases
// ==============================
export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate("supplier", "name mobile")
      .populate("items.item", "name code")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: purchases.length,
      data: purchases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Purchase By ID
// ==============================
export const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id)
      .populate("supplier", "name mobile")
      .populate("items.item", "name code");

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }

    res.status(200).json({
      success: true,
      data: purchase,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update Purchase
// ==============================
export const updatePurchase = async (req, res) => {
  try {

    const { supplier, items, notes, status } = req.body;

    const purchase = await Purchase.findById(req.params.id);

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }

    // ==================================
    // Restore Old Stock
    // ==================================

    for (const oldItem of purchase.items) {

      const dbItem = await Item.findById(oldItem.item);

      if (dbItem) {

        dbItem.openingStock -= oldItem.quantity;

        if (dbItem.openingStock < 0) {
          dbItem.openingStock = 0;
        }

        await dbItem.save();

      }

    }

    // ==================================
    // Add New Stock
    // ==================================

    let grandTotal = 0;
    const purchaseItems = [];

    for (const item of items) {

      const dbItem = await Item.findById(item.item);

      if (!dbItem) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }

      const total = item.quantity * item.price;

      grandTotal += total;

      purchaseItems.push({
        item: dbItem._id,
        itemName: dbItem.name,
        quantity: item.quantity,
        price: item.price,
        total,
      });

      dbItem.openingStock += item.quantity;

      await dbItem.save();

    }

    // ==================================
    // Update Purchase
    // ==================================

    purchase.supplier = supplier;
    purchase.items = purchaseItems;
    purchase.grandTotal = grandTotal;
    purchase.notes = notes;
    purchase.status = status;

    await purchase.save();

    res.status(200).json({
      success: true,
      message: "Purchase Updated Successfully",
      data: purchase,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==============================
// Delete Purchase
// ==============================
export const deletePurchase = async (req, res) => {
  try {

    const purchase = await Purchase.findById(req.params.id);

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }

    // Restore Stock
    for (const purchaseItem of purchase.items) {

      const item = await Item.findById(purchaseItem.item);

      if (item) {

        item.openingStock -= purchaseItem.quantity;

        if (item.openingStock < 0) {
          item.openingStock = 0;
        }

        await item.save();

      }

    }

    await Purchase.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Purchase Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};