"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPaymentLinks } from "@/lib/storage";
import { generateInvoice } from "@/lib/invoice";
import type { PaymentLink } from "@/lib/types";

export default function Dashboard() {
  const [links, setLinks] = useState<PaymentLink[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "paid">("all");

  useEffect(() => {
    setLinks(getPaymentLinks().reverse()); // newest first
  }, []);

  const filtered =
    filter === "all" ? links : links.filter((l) => l.status === filter);

  const totalPaid = links
    .filter((l) => l.status === "paid")
    .reduce((sum, l) => sum + l.amount, 0);

  const totalPending = links
    .filter((l) => l.status === "pending")
    .reduce((sum, l) => sum + l.amount, 0);

  function downloadInvoice(payment: PaymentLink) {
    const doc = generateInvoice(payment);
    doc.save(`eupay-invoice-${payment.id.slice(0, 8)}.pdf`);
  }

  function copyLink(id: string) {
    const url = `${window.location.origin}/pay/${id}`;
    navigator.clipboard.writeText(url);
  }

  if (links.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📭</div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          No payment links yet
        </h2>
        <p className="text-slate-600 mb-6">
          Create your first payment link to get started.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Create Payment Link
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            Total Links
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {links.length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            Received
          </p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            €{totalPaid.toFixed(0)}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            Pending
          </p>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            €{totalPending.toFixed(0)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {(["all", "pending", "paid"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== "all" && (
              <span className="ml-1.5 text-xs opacity-70">
                {links.filter((l) => l.status === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Links list */}
      <div className="space-y-3">
        {filtered.map((link) => (
          <div
            key={link.id}
            className="bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-900 truncate">
                    {link.description}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      link.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {link.status === "paid" ? "✓ Paid" : "Pending"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {link.clientName ? `${link.clientName} · ` : ""}
                  {new Date(link.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-lg font-bold text-slate-900 ml-4">
                {link.amount.toFixed(2)}{" "}
                <span className="text-sm text-slate-500">{link.currency}</span>
              </p>
            </div>

            <div className="flex gap-2 mt-3">
              <Link
                href={`/pay/${link.id}`}
                className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors"
              >
                View
              </Link>
              <button
                onClick={() => copyLink(link.id)}
                className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Copy Link
              </button>
              <button
                onClick={() => downloadInvoice(link)}
                className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Invoice PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
