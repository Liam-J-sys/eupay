import DashboardComponent from "@/components/Dashboard";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Track your payment links and invoices
        </p>
      </div>
      <DashboardComponent />
    </div>
  );
}
