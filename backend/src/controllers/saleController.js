import Sale from "../models/Sale.js";
import Item from "../models/Item.js";

// ==============================
// Create Sale
// ==============================
export const createSale = async (req, res) => {
  try {
    console.log("========== SALE REQUEST ==========");
    console.log(req.body);
    console.log("Customer:", req.body.customer);
    console.log("Items:", req.body.items);
    console.log("==================================");

    const { customer, items, notes, status } = req.body;

    // Validate Items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please add at least one item",
      });
    }

    // Generate Invoice Number
    const lastSale = await Sale.findOne().sort({ createdAt: -1 });

    let invoiceNo = "INV0001";

    if (lastSale) {
      const lastNumber = parseInt(
        lastSale.invoiceNo.replace("INV", "")
      );

      invoiceNo =
        "INV" + String(lastNumber + 1).padStart(4, "0");
    }

    let grandTotal = 0;
    const saleItems = [];

    for (const item of items) {
      const dbItem = await Item.findById(item.item);

      if (!dbItem) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }

      if (dbItem.openingStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${dbItem.name} stock not available`,
        });
      }

      const total = item.quantity * item.price;

      grandTotal += total;

      saleItems.push({
        item: dbItem._id,
        itemName: dbItem.name,
        quantity: item.quantity,
        price: item.price,
        total,
      });

      // Reduce Stock
      dbItem.openingStock -= item.quantity;
      await dbItem.save();
    }

    const sale = await Sale.create({
      invoiceNo,
      customer,
      items: saleItems,
      grandTotal,
      notes,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Sale Created Successfully",
      data: sale,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get All Sales
// ==============================
export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("customer", "name mobile")
      .populate("items.item", "name code")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sales.length,
      data: sales,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Single Sale
// ==============================
export const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate("customer", "name mobile")
      .populate("items.item", "name code");

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found",
      });
    }

    res.status(200).json({
      success: true,
      data: sale,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update Sale
// ==============================
export const updateSale = async (req, res) => {
  try {
    const { customer, items, notes, status } = req.body;

    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found",
      });
    }

    // ==========================
    // Restore Previous Stock
    // ==========================

    for (const oldItem of sale.items) {
      const dbItem = await Item.findById(oldItem.item);

      if (dbItem) {
        dbItem.openingStock += oldItem.quantity;
        await dbItem.save();
      }
    }

    // ==========================
    // Create Updated Items
    // ==========================

    let grandTotal = 0;
    const saleItems = [];

    for (const item of items) {

      const dbItem = await Item.findById(item.item);

      if (!dbItem) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }

      if (dbItem.openingStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${dbItem.name} stock not available`,
        });
      }

      const total = item.quantity * item.price;

      grandTotal += total;

      saleItems.push({
        item: dbItem._id,
        itemName: dbItem.name,
        quantity: item.quantity,
        price: item.price,
        total,
      });

      // Reduce Stock
      dbItem.openingStock -= item.quantity;

      await dbItem.save();
    }

    // ==========================
    // Save Updated Sale
    // ==========================

    sale.customer = customer;
    sale.items = saleItems;
    sale.grandTotal = grandTotal;
    sale.notes = notes;
    sale.status = status;

    await sale.save();

    res.status(200).json({
      success: true,
      message: "Sale Updated Successfully",
      data: sale,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Delete Sale
// ==============================
export const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found",
      });
    }

    // Restore Stock
    for (const saleItem of sale.items) {
      const item = await Item.findById(saleItem.item);

      if (item) {
        item.openingStock += saleItem.quantity;
        await item.save();
      }
    }

    await Sale.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Sale Deleted Successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};