"use client";

import { useRef, type ReactNode, type Ref } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";

function Node({
  ref,
  label,
  sub,
  large = false,
  children,
}: {
  ref: Ref<HTMLDivElement>;
  label: string;
  sub: string;
  large?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <div
        ref={ref}
        className={`z-10 flex items-center justify-center rounded-full border shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] ${
          large
            ? "size-16 bg-blue-600 border-blue-500 text-white"
            : "size-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
        }`}
      >
        {children}
      </div>
      <div className="relative z-10">
        <p className="text-xs font-semibold text-slate-900 dark:text-white">{label}</p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{sub}</p>
      </div>
    </div>
  );
}

const iconProps = {
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.6,
  className: "size-5",
  "aria-hidden": true,
} as const;

export default function PaymentFlowBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const walletRef = useRef<HTMLDivElement>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-10 sm:px-10"
      role="img"
      aria-label="Client pays a EUPay link in EURC or USDC; funds go straight to your wallet and a PDF invoice is generated."
    >
      <div className="grid grid-cols-3 items-center gap-4">
        <div className="flex justify-start">
          <Node ref={clientRef} label="Client" sub="Pays EURC/USDC">
            <svg {...iconProps}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
            </svg>
          </Node>
        </div>

        <div className="flex justify-center">
          <Node ref={linkRef} label="EUPay link" sub="Solana Pay" large>
            <svg {...iconProps} className="size-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          </Node>
        </div>

        <div className="flex flex-col items-end gap-10">
          <Node ref={walletRef} label="Your wallet" sub="Paid in seconds">
            <svg {...iconProps}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Node>
          <Node ref={invoiceRef} label="PDF invoice" sub="With tx proof">
            <svg {...iconProps}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </Node>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={clientRef} toRef={linkRef} duration={3} />
      <AnimatedBeam containerRef={containerRef} fromRef={linkRef} toRef={walletRef} curvature={30} duration={3} delay={0.8} />
      <AnimatedBeam containerRef={containerRef} fromRef={linkRef} toRef={invoiceRef} curvature={-30} duration={3} delay={1.2} />
    </div>
  );
}
