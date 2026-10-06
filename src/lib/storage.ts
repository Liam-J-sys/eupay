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
