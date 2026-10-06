"use client";

import { use } from "react";
import PaymentPage from "@/components/PaymentPage";
import { useSearchParams } from "next/navigation";

export default function PayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const isCreator = searchParams.get("created") === "true";

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <PaymentPage paymentId={id} isCreator={isCreator} />
    </div>
  );
}
