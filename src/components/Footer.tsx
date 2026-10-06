import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-[9px]">EU</span>
            </div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">EUPay</span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Stablecoin payments on Solana
            </span>
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              Dashboard
            </Link>
            <a
              href="https://www.circle.com/eurc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              About EURC
            </a>
            <a
              href="https://solanapay.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              Solana Pay
            </a>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Built for the Colosseum Crypto World&apos;s Fair Hackathon &mdash; Superteam Netherlands Track
          </p>
        </div>
      </div>
    </footer>
  );
}
