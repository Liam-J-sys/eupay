"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPaymentLinks } from "@/lib/storage";
import { generateInvoice } from "@/lib/invoice";
import type { PaymentLink } from "@/lib/types";

export default function Dashboard() {
  const [links, setLinks] = useState<PaymentLink[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "paid">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setLinks(getPaymentLinks().reverse());
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
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (links.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
          <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.818-1.5l4.5-4.5a4.5 4.5 0 00-6.364-6.364l-1.757 1.757" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-slate-900 mb-1">
          No payment links yet
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Create your first link to start getting paid.
        </p>
        <Link
          href="/"
          className="inline-flex bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
        >
          Create Payment Link
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Total links</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {links.length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Received</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {"€"}{totalPaid.toFixed(0)}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Pending</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {"€"}{totalPending.toFixed(0)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 mb-4 bg-slate-100 p-1 rounded-lg w-fit">
        {(["all", "pending", "paid"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === f
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== "all" && (
              <span className={`ml-1.5 text-xs ${filter === f ? "text-slate-500" : "text-slate-400"}`}>
                {links.filter((l) => l.status === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Links list */}
      <div className="space-y-2">
        {filtered.map((link) => (
          <div
            key={link.id}
            className="bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-900 truncate">
                    {link.description}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                      link.status === "paid"
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {link.status === "paid" ? "Paid" : "Pending"}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {link.clientName ? `${link.clientName} · ` : ""}
                  {new Date(link.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <p className="text-lg font-bold text-slate-900 tabular-nums">
                {link.amount.toFixed(2)}{" "}
                <span className="text-xs font-medium text-slate-400">
                  {link.currency}
                </span>
              </p>
            </div>

            <div className="flex gap-1.5 mt-3">
              <Link
                href={`/pay/${link.id}`}
                className="text-xs text-slate-600 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors font-medium"
              >
                View
              </Link>
              <button
                onClick={() => copyLink(link.id)}
                className="text-xs text-slate-600 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors font-medium"
              >
                {copiedId === link.id ? "Copied" : "Copy Link"}
              </button>
              <button
                onClick={() => downloadInvoice(link)}
                className="text-xs text-slate-600 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors font-medium"
              >
                Invoice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
