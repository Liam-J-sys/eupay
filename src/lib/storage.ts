// Simple localStorage-based storage for the MVP
// In production, this would be a database

import { PaymentLink } from "./types";

const STORAGE_KEY = "eupay_payment_links";

export function getPaymentLinks(): PaymentLink[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getPaymentLink(id: string): PaymentLink | null {
  const links = getPaymentLinks();
  return links.find((link) => link.id === id) || null;
}

export function savePaymentLink(link: PaymentLink): void {
  const links = getPaymentLinks();
  const existingIndex = links.findIndex((l) => l.id === link.id);
  if (existingIndex >= 0) {
    links[existingIndex] = link;
  } else {
    links.push(link);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

export function updatePaymentStatus(
  id: string,
  status: PaymentLink["status"],
  transactionSignature?: string
): void {
  const links = getPaymentLinks();
  const link = links.find((l) => l.id === id);
  if (link) {
    link.status = status;
    if (transactionSignature) {
      link.transactionSignature = transactionSignature;
    }
    if (status === "paid") {
      link.paidAt = new Date().toISOString();
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  }
}

/**
 * Encode payment data into a URL-safe base64 string.
 * This lets payment links work across devices without a backend.
 */
export function encodePaymentData(link: PaymentLink): string {
  const compact = {
    w: link.recipientWallet,
    a: link.amount,
    c: link.currency,
    d: link.description,
    n: link.freelancerName,
    e: link.freelancerEmail || "",
    cl: link.clientName || "",
    t: link.createdAt,
  };
  // Use encodeURIComponent to handle Unicode characters (em dashes, accents, etc.)
  // that btoa() alone cannot encode (Latin1 range only)
  return btoa(encodeURIComponent(JSON.stringify(compact)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Decode payment data from a URL-safe base64 string.
 * Returns a full PaymentLink or null if decoding fails.
 */
export function decodePaymentData(
  id: string,
  encoded: string
): PaymentLink | null {
  try {
    const padded = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(atob(padded));
    const compact = JSON.parse(json);
    return {
      id,
      recipientWallet: compact.w,
      amount: compact.a,
      currency: compact.c,
      description: compact.d,
      freelancerName: compact.n,
      freelancerEmail: compact.e || undefined,
      clientName: compact.cl || undefined,
      createdAt: compact.t,
      status: "pending",
    };
  } catch {
    return null;
  }
}
