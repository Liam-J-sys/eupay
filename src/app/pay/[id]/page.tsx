"use client";

import { use } from "react";
import PaymentPage from "@/components/PaymentPage";

export default function PayPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = use(params);
  const sp = use(searchParams);
  const isCreator = sp.created === "true";
  const encodedData = typeof sp.d === "string" ? sp.d : null;

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <PaymentPage paymentId={id} isCreator={isCreator} encodedData={encodedData} />
    </div>
  );
}
