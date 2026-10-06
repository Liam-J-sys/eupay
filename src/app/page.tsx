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

      {/* How it works */}
      <section className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
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
                Create a payment link
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Enter your wallet address, the amount, pick EURC or USDC, and
                describe the service. Takes 30 seconds.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg flex items-center justify-center font-semibold text-sm mb-3">
                2
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1.5 text-sm">
                Share with your client
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Send the link by email, WhatsApp, or wherever you communicate.
                Your client sees the amount and a QR code — no account needed.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg flex items-center justify-center font-semibold text-sm mb-3">
                3
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1.5 text-sm">
                Get paid, get your invoice
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Payment settles in seconds on Solana. A PDF invoice with
                on-chain transaction proof is ready to download.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why EUPay */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-10 text-center">
            Why freelancers use EUPay
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5">
              <p className="font-semibold text-slate-900 dark:text-white text-sm mb-1.5">
                Instant settlement
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                No more waiting 3–5 business days. Stablecoin payments settle
                in under a second on Solana, at less than $0.01 in fees.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5">
              <p className="font-semibold text-slate-900 dark:text-white text-sm mb-1.5">
                Automatic invoices
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Every payment generates a PDF invoice referencing the on-chain
                transaction — ready for your accountant and EU tax filings.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5">
              <p className="font-semibold text-slate-900 dark:text-white text-sm mb-1.5">
                No crypto knowledge required
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Your client just sees an amount and a pay button. They scan a QR
                code or connect their wallet — no technical setup.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5">
              <p className="font-semibold text-slate-900 dark:text-white text-sm mb-1.5">
                Euro-native payments
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Accept EURC — a regulated euro stablecoin issued by Circle.
                Your clients pay in euros, you receive euros. No FX fees.
              </p>
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
