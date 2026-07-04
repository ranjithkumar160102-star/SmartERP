import Item from "../models/Item.js";

// ==============================
// Get Stock Ledger
// ==============================
export const getStockLedger = async (req, res) => {
  try {
    const items = await Item.find().sort({ name: 1 });

    const stockData = items.map((item) => ({
      _id: item._id,
      itemName: item.name,
      itemCode: item.code,
      category: item.category,
      unit: item.unit,
      purchasePrice: item.purchasePrice,
      sellingPrice: item.sellingPrice,
      currentStock: item.openingStock,
      stockValue: item.openingStock * item.purchasePrice,
      status:
        item.openingStock === 0
          ? "Out of Stock"
          : item.openingStock < 5
          ? "Low Stock"
          : "In Stock",
    }));

    res.status(200).json({
      success: true,
      count: stockData.length,
      data: stockData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Single Item Stock
// ==============================
export const getStockById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    const stock = {
      _id: item._id,
      itemName: item.name,
      itemCode: item.code,
      category: item.category,
      unit: item.unit,
      purchasePrice: item.purchasePrice,
      sellingPrice: item.sellingPrice,
      currentStock: item.openingStock,
      stockValue: item.openingStock * item.purchasePrice,
      status:
        item.openingStock === 0
          ? "Out of Stock"
          : item.openingStock < 5
          ? "Low Stock"
          : "In Stock",
    };

    res.status(200).json({
      success: true,
      data: stock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Low Stock Items
// ==============================
export const getLowStockItems = async (req, res) => {
  try {
    const items = await Item.find({
      openingStock: { $lt: 5 },
    }).sort({ openingStock: 1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};