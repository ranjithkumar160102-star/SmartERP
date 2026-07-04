import Sale from "../models/Sale.js";
import Purchase from "../models/Purchase.js";
import Item from "../models/Item.js";

export const getDashboardReport = async (req, res) => {
  try {
    const totalSales = await Sale.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$grandTotal" }
        }
      }
    ]);

    const totalPurchase = await Purchase.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$grandTotal" }
        }
      }
    ]);

    const totalItems = await Item.countDocuments();

    const lowStock = await Item.find({
      openingStock: { $lte: 10 }
    });

    res.status(200).json({
      success: true,
      data: {
        totalSales:
          totalSales.length > 0 ? totalSales[0].total : 0,

        totalPurchase:
          totalPurchase.length > 0
            ? totalPurchase[0].total
            : 0,

        totalItems,

        lowStock,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};