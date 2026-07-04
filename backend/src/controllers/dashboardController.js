import Customer from "../models/Customer.js";
import Supplier from "../models/Supplier.js";
import Item from "../models/Item.js";
import Sale from "../models/Sale.js";
import Purchase from "../models/Purchase.js";

// ==============================
// Get Dashboard Statistics
// ==============================
export const getDashboardStats = async (req, res) => {
  try {
    // Count Documents
    const totalCustomers = await Customer.countDocuments();
    const totalSuppliers = await Supplier.countDocuments();
    const totalItems = await Item.countDocuments();
    const totalSales = await Sale.countDocuments();
    const totalPurchases = await Purchase.countDocuments();

    // Revenue
    const sales = await Sale.find();

    const totalRevenue = sales.reduce(
      (sum, sale) => sum + sale.grandTotal,
      0
    );

    // Purchase Amount
    const purchases = await Purchase.find();

    const totalPurchaseAmount = purchases.reduce(
      (sum, purchase) => sum + purchase.grandTotal,
      0
    );

   // Profit / Loss
const profit = totalRevenue - totalPurchaseAmount;

    // Low Stock (<5)
    const lowStockItems = await Item.countDocuments({
      openingStock: { $lt: 5 },
    });

    // Recent Sales
    const recentSales = await Sale.find()
      .populate("customer", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent Purchases
    const recentPurchases = await Purchase.find()
      .populate("supplier", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      data: {
        totalCustomers,
        totalSuppliers,
        totalItems,
        totalSales,
        totalPurchases,

        totalRevenue,
        totalPurchaseAmount,
        profit,

        lowStockItems,

        recentSales,
        recentPurchases,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};