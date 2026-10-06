import jsPDF from "jspdf";
import { PaymentLink } from "./types";

/**
 * Generate an invoice PDF with on-chain payment proof
 */
export function generateInvoice(payment: PaymentLink): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Colors
  const primary = [15, 23, 42]; // slate-900
  const secondary = [100, 116, 139]; // slate-500
  const accent = [59, 130, 246]; // blue-500

  // Header
  doc.setFillColor(accent[0], accent[1], accent[2]);
  doc.rect(0, 0, pageWidth, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("EUPay", 20, 25);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Stablecoin Payment Invoice", pageWidth - 20, 20, {
    align: "right",
  });
  doc.text("Powered by Solana", pageWidth - 20, 28, { align: "right" });

  // Invoice details
  let y = 55;

  doc.setTextColor(primary[0], primary[1], primary[2]);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 20, y);

  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(secondary[0], secondary[1], secondary[2]);
  doc.text(`Invoice #: ${payment.id.slice(0, 8).toUpperCase()}`, 20, y);
  y += 6;
  doc.text(
    `Date: ${new Date(payment.createdAt).toLocaleDateString("en-EU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`,
    20,
    y
  );

  if (payment.paidAt) {
    y += 6;
    doc.text(
      `Paid: ${new Date(payment.paidAt).toLocaleDateString("en-EU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`,
      20,
      y
    );
  }

  // Status badge
  y += 6;
  if (payment.status === "paid") {
    doc.setFillColor(34, 197, 94);
    doc.roundedRect(20, y - 4, 30, 8, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("PAID", 27, y + 1);
  } else {
    doc.setFillColor(234, 179, 8);
    doc.roundedRect(20, y - 4, 36, 8, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("PENDING", 27, y + 1);
  }

  // From / To section
  y += 20;
  doc.setTextColor(primary[0], primary[1], primary[2]);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("FROM", 20, y);
  doc.text("TO", pageWidth / 2 + 10, y);

  y += 7;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(payment.freelancerName, 20, y);
  if (payment.clientName) {
    doc.text(payment.clientName, pageWidth / 2 + 10, y);
  }

  if (payment.freelancerEmail) {
    y += 6;
    doc.setTextColor(secondary[0], secondary[1], secondary[2]);
    doc.text(payment.freelancerEmail, 20, y);
  }

  // Divider
  y += 15;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(20, y, pageWidth - 20, y);

  // Items table header
  y += 12;
  doc.setFillColor(248, 250, 252);
  doc.rect(20, y - 5, pageWidth - 40, 10, "F");

  doc.setTextColor(primary[0], primary[1], primary[2]);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("DESCRIPTION", 25, y + 1);
  doc.text("CURRENCY", pageWidth - 95, y + 1);
  doc.text("AMOUNT", pageWidth - 25, y + 1, { align: "right" });

  // Item row
  y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(primary[0], primary[1], primary[2]);

  // Word wrap description
  const maxDescWidth = pageWidth - 130;
  const descLines = doc.splitTextToSize(payment.description, maxDescWidth);
  doc.text(descLines, 25, y);

  doc.text(payment.currency, pageWidth - 95, y);
  doc.text(
    `${payment.amount.toFixed(2)}`,
    pageWidth - 25,
    y,
    { align: "right" }
  );

  // Total
  y += descLines.length * 6 + 10;
  doc.setDrawColor(226, 232, 240);
  doc.line(pageWidth - 100, y, pageWidth - 20, y);

  y += 10;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL", pageWidth - 100, y);
  doc.text(
    `${payment.amount.toFixed(2)} ${payment.currency}`,
    pageWidth - 25,
    y,
    { align: "right" }
  );

  // Transaction details (if paid)
  if (payment.transactionSignature) {
    y += 20;
    doc.setDrawColor(226, 232, 240);
    doc.line(20, y, pageWidth - 20, y);

    y += 12;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primary[0], primary[1], primary[2]);
    doc.text("Payment Verification", 20, y);

    y += 8;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(secondary[0], secondary[1], secondary[2]);
    doc.text("Blockchain: Solana", 20, y);
    y += 5;
    doc.text(`Transaction: ${payment.transactionSignature}`, 20, y);
    y += 5;
    doc.text(
      `Verify: https://explorer.solana.com/tx/${payment.transactionSignature}`,
      20,
      y
    );
  }

  // Regulatory context footer
  y = doc.internal.pageSize.getHeight() - 30;
  doc.setDrawColor(226, 232, 240);
  doc.line(20, y, pageWidth - 20, y);

  y += 8;
  doc.setFontSize(7);
  doc.setTextColor(secondary[0], secondary[1], secondary[2]);
  doc.text(
    "This invoice documents a stablecoin payment settled on the Solana blockchain.",
    20,
    y
  );
  y += 4;
  doc.text(
    `Payment settled in ${payment.currency} — an electronic money token issued by Circle.`,
    20,
    y
  );
  y += 4;
  doc.text(
    "Generated by EUPay — Stablecoin payment infrastructure for EU freelancers.",
    20,
    y
  );

  return doc;
}
