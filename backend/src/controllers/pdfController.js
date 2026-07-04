import PDFDocument from "pdfkit";
import Sale from "../models/Sale.js";

export const downloadSaleInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await Sale.findById(id)
      .populate("customer")
      .populate("items.item");

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found",
      });
    }

    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${sale.invoiceNo}.pdf`
    );

    doc.pipe(res);

    // =========================================
    // Company Header
    // =========================================

    doc
  .fontSize(26)
  .text("SmartERP", {
    align: "center",
  });

doc.moveDown(0.8);

doc
  .font("Helvetica-Bold")
  .fontSize(22)
  .fillColor("#000")
  .text("SALES INVOICE", 0, 105, {
    align: "center",
  });

doc.moveDown();

doc
  .moveTo(40, doc.y)
  .lineTo(555, doc.y)
  .strokeColor("#2563EB")
  .lineWidth(2)
  .stroke();

doc.moveDown();

    doc
      .strokeColor("#2563EB")
      .lineWidth(2)
      .moveTo(40, 90)
      .lineTo(555, 90)
      .stroke();

    // =========================================
// Invoice Details
// =========================================

let detailsY = doc.y + 20;

doc
  .fontSize(12)
  .fillColor("black");

doc.text("Invoice No :", 50, detailsY);
doc.text(sale.invoiceNo, 150, detailsY);

doc.text("Date :", 50, detailsY + 20);
doc.text(
  new Date(sale.saleDate).toLocaleDateString(),
  150,
  detailsY + 20
);

doc.text("Customer :", 50, detailsY + 40);
doc.text(
  sale.customer.name,
  150,
  detailsY + 40
);

// Table starts below customer details
let startY = detailsY + 80;

    // =========================================
    // Table Header
    // =========================================

    doc
      .fillColor("#1E293B")
      .rect(40, startY, 515, 25)
      .fill();

    doc
      .fillColor("white")
      .fontSize(12);

    doc.text("Item", 50, startY + 7);
    doc.text("Qty", 290, startY + 7);
    doc.text("Price", 360, startY + 7);
    doc.text("Total", 470, startY + 7);

    let y = startY + 30;

    // =========================================
// Items
// =========================================

sale.items.forEach((row) => {

  doc
    .fillColor("black")
    .fontSize(11);

  doc.text(row.itemName, 50, y);

  doc.text(
    row.quantity.toString(),
    295,
    y
  );

  doc.text(
    `Rs. ${row.price}`,
    350,
    y
  );

  doc.text(
    `Rs. ${row.total}`,
    460,
    y
  );

  // Row Separator
  doc
    .moveTo(40, y + 20)
    .lineTo(555, y + 20)
    .strokeColor("#E5E7EB")
    .stroke();

  y += 30;

});

// =========================================
// Grand Total
// =========================================

const totalY = y + 20;

// Line before Grand Total
doc
  .moveTo(40, totalY - 10)
  .lineTo(555, totalY - 10)
  .strokeColor("#D1D5DB")
  .stroke();

// Grand Total Box
doc
  .roundedRect(300, totalY, 250, 60, 8)
  .fill("#E8F0FF");

doc
  .fillColor("#1E3A8A")
  .font("Helvetica-Bold")
  .fontSize(18)
  .text(
    `Grand Total : Rs. ${sale.grandTotal}`,
    320,
    totalY + 20
  );

// =========================================
// Footer
// =========================================

// Footer-ஐ page bottom
doc
  .font("Helvetica")
  .fontSize(15)
  .fillColor("#2563EB")
  .text(
    "Thank You! Visit Again",
    0,
    760,
    {
      align: "center",
    }
  );

doc.end();

} catch (error) {
  console.log(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};