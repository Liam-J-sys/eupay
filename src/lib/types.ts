export interface PaymentLink {
  id: string;
  recipientWallet: string;
  amount: number;
  currency: "EURC" | "USDC";
  description: string;
  freelancerName: string;
  freelancerEmail?: string;
  clientName?: string;
  createdAt: string;
  status: "pending" | "paid" | "expired";
  transactionSignature?: string;
  paidAt?: string;
}

export interface CreatePaymentLinkForm {
  recipientWallet: string;
  amount: string;
  currency: "EURC" | "USDC";
  description: string;
  freelancerName: string;
  freelancerEmail?: string;
  clientName?: string;
}
