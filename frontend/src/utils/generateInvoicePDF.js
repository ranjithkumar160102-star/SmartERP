import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (sale) => {
  const doc = new jsPDF();

  // ===========================
  // Header
  // ===========================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(25, 50, 120);

  doc.text("SmartERP", 105, 20, {
    align: "center",
  });

  doc.setFontSize(18);

  doc.text("SALES INVOICE", 105, 32, {
    align: "center",
  });

  doc.setDrawColor(100);

  doc.line(20, 40, 190, 40);

  // ===========================
  // Invoice Details
  // ===========================

  doc.setFontSize(12);
  doc.setTextColor(0);

  doc.text(`Invoice No : ${sale.invoiceNo}`, 20, 50);

  doc.text(
    `Date : ${new Date(
      sale.saleDate
    ).toLocaleDateString()}`,
    20,
    58
  );

  doc.text(
    `Customer : ${sale.customer.name}`,
    20,
    66
  );

  // ===========================
  // Item Table
  // ===========================

  autoTable(doc, {
    startY: 75,

    head: [
      [
        "Item Name",
        "Qty",
        "Price",
        "Total",
      ],
    ],

    body: sale.items.map((item) => [
      item.itemName,
      item.quantity,
      `Rs. ${item.price}`,
      `Rs. ${item.total}`,
    ]),

    theme: "grid",

    headStyles: {
      fillColor: [30, 41, 59],
      textColor: 255,
      halign: "center",
    },

    bodyStyles: {
      halign: "center",
    },
  });

  // ===========================
  // Grand Total
  // ===========================

  const finalY = doc.lastAutoTable.finalY + 15;

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");

  doc.text(
    `Grand Total : Rs. ${sale.grandTotal}`,
    190,
    finalY,
    {
      align: "right",
    }
  );

  // ===========================
  // Footer
  // ===========================

  doc.setFontSize(13);

  doc.setFont("times", "italic");

  doc.setTextColor(30, 70, 160);

  doc.text(
    "Thank You Visit Again",
    105,
    finalY + 20,
    {
      align: "center",
    }
  );

  // ===========================
  // Save PDF
  // ===========================

  doc.save(`${sale.invoiceNo}.pdf`);
};