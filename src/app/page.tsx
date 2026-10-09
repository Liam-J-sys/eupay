"use client";

import { useState } from "react";
import CreatePaymentForm from "@/components/CreatePaymentForm";
import Link from "next/link";
import { BackgroundPaths } from "@/components/ui/background-paths";
import PaymentFlowBeam from "@/components/PaymentFlowBeam";

export default function HomePage() {
  const [demoMode, setDemoMode] = useState(false);

  function handleTryDemo() {
    setDemoMode(true);
    // Small delay to let state propagate before scrolling
    setTimeout(() => {
      document.getElementById("create")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <BackgroundPaths />
        <div className="relative z-10 mx-auto max-w-3xl px-4 pt-16 pb-20 text-center">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4 tracking-wide">
            Solana Pay for EU freelancers
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-5">
            Send a link,<br />get paid in seconds
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
            Create a payment link for any invoice. Your client pays in EURC or
            USDC on Solana — you get paid instantly with an invoice and
            on-chain proof generated automatically.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="#create"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
            >
              Create a payment link
            </a>
            <Link
              href="/dashboard"
              className="text-slate-600 dark:text-slate-300 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm"
            >
              View dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Why EUPay — Visual flow comparison */}
      <section id="why" className="scroll-mt-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-10 text-center">
            Why EUPay?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Traditional */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-5">
                Traditional
              </p>
              <div className="space-y-1">
                {["Create invoice", "Wait for bank transfer", "Reconcile payment", "Verify manually"].map((step, i, arr) => (
                  <div key={i}>
                    <div className="flex items-center gap-3 py-2">
                      <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center text-xs flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">{step}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="ml-3 h-4 border-l-2 border-dashed border-slate-200 dark:border-slate-700" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400 dark:text-slate-500">3–5 business days</p>
              </div>
            </div>

            {/* EUPay */}
            <div className="bg-blue-600 rounded-xl p-6">
              <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider mb-5">
                With EUPay
              </p>
              <div className="space-y-1">
                {["Create invoice", "Send payment link", "Client pays USDC/EURC", "Verified on-chain"].map((step, i, arr) => (
                  <div key={i}>
                    <div className="flex items-center gap-3 py-2">
                      <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm text-white font-medium">{step}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="ml-3 h-4 border-l-2 border-blue-400/40" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-blue-500/30">
                <p className="text-xs text-blue-200 font-medium">Under a second</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-10 text-center">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg flex items-center justify-center font-semibold text-sm mb-3">
                1
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1.5 text-sm">
                Create
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Enter the invoice amount, currency, and description.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg flex items-center justify-center font-semibold text-sm mb-3">
                2
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1.5 text-sm">
                Share
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Send your payment link to the client.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg flex items-center justify-center font-semibold text-sm mb-3">
                3
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1.5 text-sm">
                Get paid
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Client pays with EURC/USDC. EUPay verifies the
                transaction and marks the invoice paid.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <PaymentFlowBeam />
          </div>
          <div className="text-center mt-10">
            <button
              onClick={handleTryDemo}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm cursor-pointer"
            >
              Try a demo invoice
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Built for Europe + Why stablecoins — consolidated */}
      <section id="europe" className="scroll-mt-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 text-center">
            Built for Europe&apos;s stablecoin economy
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-lg mx-auto mb-12 leading-relaxed">
            Stablecoin payments remove the friction of cross-border banking.
            EUPay connects them to invoices and on-chain verification so
            freelancers have a complete payment record.
          </p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
            {[
              {
                title: "Global clients",
                desc: "Get paid by clients anywhere without needing them to navigate your local banking system.",
              },
              {
                title: "Fast settlement",
                desc: "Payments settle on-chain in seconds, not 3–5 business days.",
              },
              {
                title: "Verifiable",
                desc: "Every payment has publicly verifiable transaction data on the Solana blockchain.",
              },
              {
                title: "Euro and dollar denominated",
                desc: "EURC and USDC reduce the volatility problem of paying directly in assets like SOL.",
              },
              {
                title: "Automatic invoices",
                desc: "Every payment generates a PDF invoice with the on-chain transaction as proof.",
              },
              {
                title: "EURC and USDC",
                desc: "Accept regulated stablecoins issued by Circle — euro or dollar denominated.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For freelancers / For clients */}
      <section id="benefits" className="scroll-mt-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-10 text-center">
            Zero friction for both sides
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Freelancers */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">
                For freelancers
              </p>
              <div className="space-y-3">
                {["Create an invoice.", "Share one link.", "Receive verified payment."].map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs flex-shrink-0 font-medium">
                      {i + 1}
                    </span>
                    <span className="text-sm text-slate-700 dark:text-slate-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clients */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">
                For clients
              </p>
              <div className="space-y-3">
                {["No account required.", "Open the link.", "Connect wallet and pay."].map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs flex-shrink-0 font-medium">
                      {i + 1}
                    </span>
                    <span className="text-sm text-slate-700 dark:text-slate-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-slate-900 dark:bg-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-white">$835M</p>
              <p className="text-xs text-slate-400 mt-1">Euro stablecoin market</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">&lt;1s</p>
              <p className="text-xs text-slate-400 mt-1">Settlement time</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">&lt;$0.01</p>
              <p className="text-xs text-slate-400 mt-1">Per transaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap — with timeline */}
      <section id="roadmap" className="scroll-mt-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 text-center">
            Roadmap
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md mx-auto mb-10 leading-relaxed">
            We deliberately scoped the MVP. We know where this goes next.
          </p>
          <div className="grid sm:grid-cols-2 gap-10">
            {/* Today */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                  Shipped
                </p>
              </div>
              <div className="relative pl-5 border-l-2 border-green-200 dark:border-green-900 space-y-4">
                {[
                  "Stablecoin payment links",
                  "Automatic invoice generation",
                  "On-chain payment verification",
                ].map((item) => (
                  <div key={item} className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-slate-900" />
                    <p className="text-sm text-slate-700 dark:text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                  Coming next
                </p>
              </div>
              <div className="relative pl-5 border-l-2 border-blue-200 dark:border-blue-900 space-y-4">
                {[
                  "Automatic payment reconciliation",
                  "EUR off-ramp",
                  "Accounting integrations",
                  "Recurring invoices",
                  "Multi-chain support",
                ].map((item) => (
                  <div key={item} className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 border-blue-400 dark:border-blue-500 bg-white dark:bg-slate-900" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create form */}
      <section id="create" className="scroll-mt-20 bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-xl px-4 py-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {demoMode ? "Demo invoice" : "Create a payment link"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {demoMode
                ? "We've pre-filled a sample invoice. Hit \"Create Payment Link\" to see the full flow."
                : "Fill in the details below. You'll get a shareable link and QR code your client can pay with any Solana wallet."}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <CreatePaymentForm demoMode={demoMode} onDemoConsumed={() => setDemoMode(false)} />
          </div>
        </div>
      </section>
    </div>
  );
}
