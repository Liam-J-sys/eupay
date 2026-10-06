import CreatePaymentForm from "@/components/CreatePaymentForm";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
          <span>🇪🇺</span>
          <span>MiCA-Compliant</span>
          <span>·</span>
          <span>Powered by Solana</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Get paid in stablecoins
        </h1>
        <p className="text-slate-600">
          Create a payment link, share it with your client, get paid in EURC or
          USDC on Solana. Instant settlement, EU-compliant invoices.
        </p>
      </div>

      {/* Form card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <CreatePaymentForm />
      </div>

      {/* Trust badges */}
      <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <span>⚡</span>
          <span>Instant settlement</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>🔗</span>
          <span>On-chain verification</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>📄</span>
          <span>Auto-generated invoices</span>
        </div>
      </div>
    </div>
  );
}
