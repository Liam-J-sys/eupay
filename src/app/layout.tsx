import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "EUPay — Stablecoin Payment Links for EU Freelancers",
  description:
    "Create MiCA-compliant payment links. Accept EURC and USDC on Solana. Get paid in seconds, not days.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
