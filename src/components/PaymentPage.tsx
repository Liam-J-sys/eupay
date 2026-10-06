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
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
            Payment link not found
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This link may have expired or doesn&apos;t exist.
          </p>
        </div>
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
  const currencySymbol = payment.currency === "EURC" ? "€" : "$";

  return (
    <div className="min-h-[80vh] flex items-start justify-center pt-8 pb-16">
      <div className="w-full max-w-md">
        {/* Creator banner */}
        {isCreator && !isPaid && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 mb-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-0.5">
                  Payment link created
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  Share this link with your client to receive payment.
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={copyLink}
                className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <button
                onClick={shareLink}
                className="flex-1 bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 text-sm py-2 rounded-lg font-medium border border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
              >
                Share
              </button>
            </div>
          </div>
        )}

        {/* Payment card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm">
          {/* Status header */}
          <div className={`px-6 py-4 border-b ${isPaid ? "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800" : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700"}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 tracking-wide">
                  {isPaid ? "Payment received" : "Payment request"}
                </p>
                <p className="text-sm text-slate-800 dark:text-slate-200 mt-0.5">
                  From <span className="font-semibold">{payment.freelancerName}</span>
                </p>
              </div>
              <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                isPaid ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400" : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400"
              }`}>
                {isPaid ? "Paid" : "Pending"}
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="px-6 py-8 text-center">
            <p className="text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              {currencySymbol}{payment.amount.toFixed(2)}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
              {payment.currency === "EURC" ? "Euro Coin" : "USD Coin"} on Solana
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">{payment.description}</p>
            {payment.clientName && (
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Billed to {payment.clientName}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="mx-6 border-t border-slate-100 dark:border-slate-700" />

          {/* QR code or paid confirmation */}
          <div className="px-6 py-6">
            {isPaid ? (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  Payment confirmed
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                  Verified on the Solana blockchain.
                </p>
                {payment.transactionSignature &&
                  payment.transactionSignature !== "demo-transaction-signature" && (
                    <a
                      href={getExplorerUrl(payment.transactionSignature, SOLANA_NETWORK)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mb-5"
                    >
                      View on Solana Explorer
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </a>
                  )}
                <button
                  onClick={downloadInvoice}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                >
                  Download Invoice (PDF)
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Scan with a Solana wallet to pay
                </p>
                <div className="inline-block p-4 bg-white border-2 border-slate-100 dark:border-slate-600 rounded-2xl">
                  <QRCodeSVG
                    value={solanaPayUrl}
                    size={200}
                    bgColor="#ffffff"
                    fgColor="#0f172a"
                    level="M"
                    includeMargin={false}
                  />
                </div>

                <div className="mt-5 space-y-2">
                  <a
                    href={solanaPayUrl}
                    className="flex items-center justify-center gap-2 w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.05 4.91A9.816 9.816 0 0012.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01z" />
                    </svg>
                    Pay with Solana Wallet
                  </a>

                  <button
                    onClick={markAsPaid}
                    className="w-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-2.5 rounded-xl text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Demo: Mark as Paid
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-2 justify-center">
                  {polling && (
                    <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  )}
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Listening for payment...
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">EU</span>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  EUPay
                </span>
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500">Powered by Solana</span>
            </div>
          </div>
        </div>

        {/* Actions below card */}
        {!isPaid && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={copyLink}
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
            >
              {copied ? "Copied" : "Copy Link"}
            </button>
            <button
              onClick={downloadInvoice}
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
            >
              Download Invoice
            </button>
          </div>
        )}

        {showShareToast && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-xl text-sm shadow-lg">
            Link copied to clipboard
          </div>
        )}
      </div>
    </div>
  );
}
