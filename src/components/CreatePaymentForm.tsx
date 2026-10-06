"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { SUPPORTED_CURRENCIES } from "@/lib/constants";
import { isValidSolanaAddress } from "@/lib/solana";
import { savePaymentLink, encodePaymentData } from "@/lib/storage";
import type { PaymentLink, CreatePaymentLinkForm } from "@/lib/types";

const DEMO_DATA: CreatePaymentLinkForm = {
  recipientWallet: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  amount: "2500",
  currency: "EURC",
  description: "Website redesign — homepage, 3 inner pages, and mobile responsive version",
  freelancerName: "Maria van der Berg",
  freelancerEmail: "maria@example.com",
  clientName: "Acme Corp",
};

interface CreatePaymentFormProps {
  demoMode?: boolean;
  onDemoConsumed?: () => void;
}

export default function CreatePaymentForm({ demoMode, onDemoConsumed }: CreatePaymentFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [demoApplied, setDemoApplied] = useState(false);

  const [form, setForm] = useState<CreatePaymentLinkForm>({
    recipientWallet: "",
    amount: "",
    currency: "EURC",
    description: "",
    freelancerName: "",
    freelancerEmail: "",
    clientName: "",
  });

  // Apply demo data when demoMode turns on
  if (demoMode && !demoApplied) {
    setForm(DEMO_DATA);
    setDemoApplied(true);
    setErrors({});
    onDemoConsumed?.();
  }

  function updateField(field: keyof CreatePaymentLinkForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!form.freelancerName.trim()) {
      newErrors.freelancerName = "Your name is required";
    }

    if (!form.recipientWallet.trim()) {
      newErrors.recipientWallet = "Wallet address is required";
    } else if (!isValidSolanaAddress(form.recipientWallet.trim())) {
      newErrors.recipientWallet = "Invalid Solana wallet address";
    }

    const amount = parseFloat(form.amount);
    if (!form.amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = "Enter a valid amount greater than 0";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required for the invoice";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const paymentLink: PaymentLink = {
      id: uuidv4(),
      recipientWallet: form.recipientWallet.trim(),
      amount: parseFloat(form.amount),
      currency: form.currency,
      description: form.description.trim(),
      freelancerName: form.freelancerName.trim(),
      freelancerEmail: form.freelancerEmail?.trim() || undefined,
      clientName: form.clientName?.trim() || undefined,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    savePaymentLink(paymentLink);
    const data = encodePaymentData(paymentLink);
    router.push(`/pay/${paymentLink.id}?created=true&d=${data}`);
  }

  const inputBase = "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Your details */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">
          Your Details
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="freelancerName"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Your Name *
            </label>
            <input
              id="freelancerName"
              type="text"
              value={form.freelancerName}
              onChange={(e) => updateField("freelancerName", e.target.value)}
              placeholder="e.g. Maria van der Berg"
              className={`${inputBase} ${
                errors.freelancerName ? "border-red-400" : "border-slate-300 dark:border-slate-600"
              }`}
            />
            {errors.freelancerName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.freelancerName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="freelancerEmail"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Your Email (optional)
            </label>
            <input
              id="freelancerEmail"
              type="email"
              value={form.freelancerEmail}
              onChange={(e) => updateField("freelancerEmail", e.target.value)}
              placeholder="maria@example.com"
              className={`${inputBase} border-slate-300 dark:border-slate-600`}
            />
          </div>

          <div>
            <label
              htmlFor="recipientWallet"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Your Solana Wallet Address *
            </label>
            <input
              id="recipientWallet"
              type="text"
              value={form.recipientWallet}
              onChange={(e) => updateField("recipientWallet", e.target.value)}
              placeholder="e.g. 7xKX..."
              className={`${inputBase} font-mono ${
                errors.recipientWallet ? "border-red-400" : "border-slate-300 dark:border-slate-600"
              }`}
            />
            {errors.recipientWallet && (
              <p className="text-red-500 text-xs mt-1">
                {errors.recipientWallet}
              </p>
            )}
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              This is where you&apos;ll receive the payment
            </p>
          </div>
        </div>
      </div>

      {/* Payment details */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">
          Payment Details
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="clientName"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Client Name (optional)
            </label>
            <input
              id="clientName"
              type="text"
              value={form.clientName}
              onChange={(e) => updateField("clientName", e.target.value)}
              placeholder="e.g. Acme Corp"
              className={`${inputBase} border-slate-300 dark:border-slate-600`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Amount *
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                value={form.amount}
                onChange={(e) => updateField("amount", e.target.value)}
                placeholder="250.00"
                className={`${inputBase} ${
                  errors.amount ? "border-red-400" : "border-slate-300 dark:border-slate-600"
                }`}
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="currency"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Currency *
              </label>
              <select
                id="currency"
                value={form.currency}
                onChange={(e) =>
                  updateField("currency", e.target.value)
                }
                className={`${inputBase} border-slate-300 dark:border-slate-600`}
              >
                {SUPPORTED_CURRENCIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.icon} {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Description / Service *
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="e.g. Website design — homepage and 3 inner pages"
              rows={3}
              className={`${inputBase} resize-none ${
                errors.description ? "border-red-400" : "border-slate-300 dark:border-slate-600"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Creating..." : "Create Payment Link"}
      </button>
    </form>
  );
}
