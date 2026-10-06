"use client";

import { Suspense, use } from "react";
import PaymentPage from "@/components/PaymentPage";
import { useSearchParams } from "next/navigation";

function PayPageContent({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const isCreator = searchParams.get("created") === "true";
  const encodedData = searchParams.get("d");

  return (
    <PaymentPage paymentId={id} isCreator={isCreator} encodedData={encodedData} />
  );
}

function PayPageFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading payment…</p>
      </div>
    </div>
  );
}

export default function PayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <Suspense fallback={<PayPageFallback />}>
        <PayPageContent id={id} />
      </Suspense>
    </div>
  );
}
