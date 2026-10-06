import CreatePaymentForm from "@/components/CreatePaymentForm";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 pt-16 pb-20 text-center">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4 tracking-wide">
            Solana Pay for EU freelancers
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-5">
            Send a link,<br />get paid in seconds
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
            Create a payment link for any invoice. Your client pays in EURC or
            USDC on Solana — you get the money instantly, with a
            invoice with on-chain proof generated automatically.
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

      {/* Why EUPay — Traditional vs EUPay comparison */}
      <section className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-10 text-center">
            Why EUPay?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Traditional */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
                Traditional
              </p>
              <div className="space-y-3">
                {["Create invoice", "Wait for bank transfer", "Reconcile payment", "Verify manually"].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center text-xs flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{step}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">3–5 business days</p>
            </div>

            {/* EUPay */}
            <div className="bg-blue-600 rounded-xl p-6">
              <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider mb-4">
                EUPay
              </p>
              <div className="space-y-3">
                {["Create invoice", "Send payment link", "Client pays USDC/EURC", "Verified on-chain"].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm text-white">{step}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-blue-200 mt-4">Under a second</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
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
                Client pays with EURC/USDC. EUPay automatically verifies the
                transaction and marks the invoice paid.
              </p>
            </div>
          </div>
          <div className="text-center mt-10">
            <a
              href="#create"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
            >
              Try a demo invoice
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Built for Europe */}
      <section className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 text-center">
            Built for Europe&apos;s stablecoin economy
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-lg mx-auto mb-10 leading-relaxed">
            EUPay makes it easier for European freelancers to accept stablecoin
            payments while keeping invoices and payment records connected.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "EURC", desc: "Euro-denominated stablecoin by Circle" },
              { label: "USDC", desc: "Dollar-denominated stablecoin by Circle" },
              { label: "EUR invoices", desc: "Invoices denominated in euros" },
              { label: "On-chain verification", desc: "Every payment verified on Solana" },
              { label: "Invoice records", desc: "PDF invoices with transaction proof" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4"
              >
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why stablecoins? */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 text-center">
            Why stablecoins?
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md mx-auto mb-10 leading-relaxed">
            Why not just use Stripe or SEPA?
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5">
              <p className="font-semibold text-slate-900 dark:text-white text-sm mb-1.5">
                Global clients
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Get paid by clients anywhere without needing them to navigate your
                local banking system.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5">
              <p className="font-semibold text-slate-900 dark:text-white text-sm mb-1.5">
                Fast settlement
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Payments settle on-chain rather than waiting for traditional
                payment rails.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5">
              <p className="font-semibold text-slate-900 dark:text-white text-sm mb-1.5">
                Verifiable
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Every payment has publicly verifiable transaction data on the
                Solana blockchain.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5">
              <p className="font-semibold text-slate-900 dark:text-white text-sm mb-1.5">
                Dollar/euro-denominated
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                USDC and EURC reduce the volatility problem associated with
                paying directly in assets like SOL.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For freelancers / For clients */}
      <section className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Freelancers */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">
                For freelancers
              </p>
              <div className="space-y-3">
                {["Create an invoice.", "Share one link.", "Receive verified payment."].map((step) => (
                  <div key={step} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-sm text-slate-700 dark:text-slate-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clients */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">
                For clients
              </p>
              <div className="space-y-3">
                {["No account required.", "Open the link.", "Connect wallet.", "Pay."].map((step) => (
                  <div key={step} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
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

      {/* Roadmap */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-10 text-center">
            Roadmap
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Today */}
            <div>
              <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-4">
                Today
              </p>
              <div className="space-y-3">
                {[
                  "Stablecoin payment links",
                  "Automatic invoice generation",
                  "On-chain payment verification",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next */}
            <div>
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">
                Next
              </p>
              <div className="space-y-3">
                {[
                  "Automatic payment reconciliation",
                  "EUR off-ramp",
                  "Accounting integrations",
                  "Recurring invoices",
                  "Multi-chain support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create form */}
      <section id="create" className="bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-xl px-4 py-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Create a payment link
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Fill in the details below. You&apos;ll get a shareable link and QR
              code your client can pay with any Solana wallet.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <CreatePaymentForm />
          </div>
        </div>
      </section>
    </div>
  );
}
