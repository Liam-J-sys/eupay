"use client";

import { useState, useEffect, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { buildSolanaPayUrl, checkForPayment, getExplorerUrl } from "@/lib/solana";
import { getPaymentLink, updatePaymentStatus } from "@/lib/storage";
import { generateInvoice } from "@/lib/invoice";
import { SOLANA_NETWORK } from "@/lib/constants";
import type { PaymentLink } from "@/lib/types";

interface PaymentPageProps {
  paymentId: string;
  isCreator?: boolean;
}

export default function PaymentPage({ paymentId, isCreator }: PaymentPageProps) {
  const [payment, setPayment] = useState<PaymentLink | null>(null);
  const [copied, setCopied] = useState(false);
  const [polling, setPolling] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  useEffect(() => {
    const link = getPaymentLink(paymentId);
    setPayment(link);
  }, [paymentId]);

  // Poll for payment
  const pollPayment = useCallback(async () => {
    if (!payment || payment.status === "paid" || polling) return;

    setPolling(true);
    try {
      const result = await checkForPayment(
        payment.recipientWallet,
        payment.currency,
        payment.amount
      );

      if (result.found && result.signature) {
        updatePaymentStatus(payment.id, "paid", result.signature);
        setPayment((prev) =>
          prev
            ? {
                ...prev,
                status: "paid",
                transactionSignature: result.signature,
                paidAt: new Date().toISOString(),
              }
            : null
        );
      }
    } catch (error) {
      console.error("Payment polling error:", error);
    }
    setPolling(false);
  }, [payment, polling]);

  useEffect(() => {
    if (!payment || payment.status === "paid") return;
    const interval = setInterval(pollPayment, 5000);
    return () => clearInterval(interval);
  }, [payment, pollPayment]);

  if (!payment) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Payment link not found
        </h2>
        <p className="text-slate-600">
          This payment link may have expired or doesn&apos;t exist.
        </p>
      </div>
    );
  }

  const solanaPayUrl = buildSolanaPayUrl({
    recipient: payment.recipientWallet,
    amount: payment.amount,
    currency: payment.currency,
    label: `EUPay — ${payment.freelancerName}`,
    message: payment.description,
    memo: payment.id.slice(0, 8),
  });

  const paymentPageUrl = typeof window !== "undefined" ? window.location.href.split("?")[0] : "";

  function copyLink() {
    navigator.clipboard.writeText(paymentPageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function shareLink() {
    if (navigator.share) {
      navigator.share({
        title: `Payment request from ${payment!.freelancerName}`,
        text: `Pay ${payment!.amount} ${payment!.currency} for: ${payment!.description}`,
        url: paymentPageUrl,
      });
    } else {
      copyLink();
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  }

  function downloadInvoice() {
    if (!payment) return;
    const doc = generateInvoice(payment);
    doc.save(`eupay-invoice-${payment.id.slice(0, 8)}.pdf`);
  }

  // Mark payment as paid manually (for demo purposes)
  function markAsPaid() {
    if (!payment) return;
    updatePaymentStatus(payment.id, "paid", "demo-transaction-signature");
    setPayment({
      ...payment,
      status: "paid",
      transactionSignature: "demo-transaction-signature",
      paidAt: new Date().toISOString(),
    });
  }

  const isPaid = payment.status === "paid";

  return (
    <div className="max-w-lg mx-auto">
      {/* Creator banner */}
      {isCreator && !isPaid && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 font-medium mb-2">
            ✅ Payment link created! Share it with your client.
          </p>
          <div className="flex gap-2">
            <button
              onClick={copyLink}
              className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button
              onClick={shareLink}
              className="flex-1 bg-white text-blue-600 text-sm py-2 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors"
            >
              Share
            </button>
          </div>
        </div>
      )}

      {/* Payment card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Status header */}
        <div
          className={`px-6 py-4 ${
            isPaid ? "bg-green-50" : "bg-slate-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                {isPaid ? "Payment received" : "Payment request"}
              </p>
              <p className="text-sm text-slate-700 mt-1">
                From{" "}
                <span className="font-medium">{payment.freelancerName}</span>
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isPaid
                  ? "bg-green-100 text-green-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {isPaid ? "✓ Paid" : "⏳ Pending"}
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="px-6 py-8 text-center border-b border-slate-100">
          <p className="text-4xl font-bold text-slate-900">
            {payment.amount.toFixed(2)}{" "}
            <span className="text-2xl text-slate-500">
              {payment.currency}
            </span>
          </p>
          <p className="text-sm text-slate-600 mt-2">{payment.description}</p>
          {payment.clientName && (
            <p className="text-xs text-slate-400 mt-1">
              Billed to: {payment.clientName}
            </p>
          )}
        </div>

        {/* QR code or paid confirmation */}
        <div className="px-6 py-6">
          {isPaid ? (
            <div className="text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Payment Confirmed
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                This payment has been verified on the Solana blockchain.
              </p>
              {payment.transactionSignature &&
                payment.transactionSignature !== "demo-transaction-signature" && (
                  <a
                    href={getExplorerUrl(
                      payment.transactionSignature,
                      SOLANA_NETWORK
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View on Solana Explorer →
                  </a>
                )}
              <div className="mt-4">
                <button
                  onClick={downloadInvoice}
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  📄 Download Invoice (PDF)
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-4">
                Scan with a Solana wallet to pay
              </p>
              <div className="inline-block p-4 bg-white border-2 border-slate-200 rounded-xl">
                <QRCodeSVG
                  value={solanaPayUrl}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#0f172a"
                  level="M"
                  includeMargin={false}
                />
              </div>

              <div className="mt-4 space-y-2">
                <a
                  href={solanaPayUrl}
                  className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Pay with Solana Wallet
                </a>

                {/* Demo button */}
                <button
                  onClick={markAsPaid}
                  className="block w-full bg-slate-100 text-slate-600 py-2 rounded-lg text-sm hover:bg-slate-200 transition-colors"
                >
                  Demo: Mark as Paid
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2 justify-center">
                {polling && (
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
                <p className="text-xs text-slate-400">
                  Listening for payment...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">EU</span>
              </div>
              <span className="text-xs text-slate-500">
                EUPay · MiCA-compliant
              </span>
            </div>
            <span className="text-xs text-slate-400">Powered by Solana</span>
          </div>
        </div>
      </div>

      {/* Actions below card */}
      {!isPaid && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={copyLink}
            className="flex-1 bg-white border border-slate-200 text-slate-700 text-sm py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            {copied ? "✓ Copied" : "Copy Link"}
          </button>
          <button
            onClick={downloadInvoice}
            className="flex-1 bg-white border border-slate-200 text-slate-700 text-sm py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Download Invoice
          </button>
        </div>
      )}

      {showShareToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm shadow-lg">
          Link copied to clipboard
        </div>
      )}
    </div>
  );
}
