"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const SECTIONS = [
  { href: "/#why", label: "Why EUPay", hint: "Bank transfer vs. payment link" },
  { href: "/#how-it-works", label: "How it works", hint: "Create, share, get paid" },
  { href: "/#europe", label: "Built for Europe", hint: "Fast, verifiable cross-border payments" },
  { href: "/#benefits", label: "For freelancers and clients", hint: "What each side gets" },
  { href: "/#roadmap", label: "Roadmap", hint: "What's shipped and what's next" },
];

const APP_LINKS = [
  { href: "/#create", label: "Create a payment link" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape or a click outside the panel; move focus into the panel on open
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onClick(e: MouseEvent) {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="relative mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1" onClick={close}>
          <Image src="/logo.png" alt="EUPay" width={120} height={36} className="h-8 w-auto dark:brightness-0 dark:invert" priority />
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4" aria-label="Main">
          <Link
            href="/dashboard"
            className="hidden sm:inline text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/#create"
            className="hidden sm:inline text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Payment Link
          </Link>
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </nav>

        {open && (
          <div
            ref={panelRef}
            id="site-menu"
            className="absolute right-4 left-4 sm:left-auto top-full mt-2 sm:w-80 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl p-2 motion-safe:animate-[menu-in_150ms_ease-out]"
          >
            <p className="px-3 pt-2 pb-1 text-xs font-medium text-slate-400 dark:text-slate-500">On this page</p>
            <ul>
              {SECTIONS.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    onClick={close}
                    className="block rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:bg-slate-100 dark:focus-visible:bg-slate-800 outline-none"
                  >
                    <span className="block text-sm font-medium text-slate-900 dark:text-white">{s.label}</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">{s.hint}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="my-2 border-t border-slate-100 dark:border-slate-800" />
            <ul className="space-y-1">
              {APP_LINKS.map((l, i) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={close}
                    className={
                      i === 0
                        ? "block text-center rounded-lg px-3 py-2.5 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                        : "block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:bg-slate-100 dark:focus-visible:bg-slate-800 outline-none"
                    }
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
