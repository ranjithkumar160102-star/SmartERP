import Customer from "../models/Customer.js";
import Supplier from "../models/Supplier.js";
import Sale from "../models/Sale.js";
import Purchase from "../models/Purchase.js";

// ========================================
// Customer Ledger
// ========================================
export const getCustomerLedger = async (req, res) => {
  try {
    const { customerId } = req.params;

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const sales = await Sale.find({
      customer: customerId,
    }).sort({ saleDate: 1 });

    let runningBalance = customer.openingBalance || 0;

    const ledger = [];

    ledger.push({
      date: "",
      particular: "Opening Balance",
      debit: customer.openingBalance || 0,
      credit: 0,
      balance: runningBalance,
    });

    sales.forEach((sale) => {
      runningBalance += sale.grandTotal;

      ledger.push({
        date: sale.saleDate,
        particular: sale.invoiceNo,
        debit: sale.grandTotal,
        credit: 0,
        balance: runningBalance,
      });
    });

    res.status(200).json({
      success: true,
      customer: customer.name,
      openingBalance: customer.openingBalance || 0,
      closingBalance: runningBalance,
      count: ledger.length,
      data: ledger,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// Supplier Ledger
// ========================================
export const getSupplierLedger = async (req, res) => {
  try {
    const { supplierId } = req.params;

    const supplier = await Supplier.findById(supplierId);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }

    const purchases = await Purchase.find({
      supplier: supplierId,
    }).sort({ purchaseDate: 1 });

    let runningBalance = supplier.openingBalance || 0;

    const ledger = [];

    ledger.push({
      date: "",
      particular: "Opening Balance",
      debit: supplier.openingBalance || 0,
      credit: 0,
      balance: runningBalance,
    });

    purchases.forEach((purchase) => {
      runningBalance += purchase.grandTotal;

      ledger.push({
        date: purchase.purchaseDate,
        particular: purchase.invoiceNo,
        debit: purchase.grandTotal,
        credit: 0,
        balance: runningBalance,
      });
    });

    res.status(200).json({
      success: true,
      supplier: supplier.name,
      openingBalance: supplier.openingBalance || 0,
      closingBalance: runningBalance,
      count: ledger.length,
      data: ledger,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};