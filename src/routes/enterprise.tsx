import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import {
  enterpriseKpis,
  enterpriseByCategory,
  enterpriseMoneySaved,
  enterpriseFraudTrend,
  enterpriseRegions,
  enterpriseEngagement,
  enterpriseSuccess,
} from "@/lib/sample-data";

export const Route = createFileRoute("/enterprise")({
  head: () => ({
    meta: [
      { title: "SafeCircle for banks, insurers and telecoms" },
      { name: "description", content: "Anonymised analytics showing scam attempts detected, customer money protected and measurable fraud reduction." },
      { property: "og:title", content: "SafeCircle for banks, insurers and telecoms" },
      { property: "og:description", content: "Measurable fraud reduction and customer protection, in one dashboard." },
    ],
  }),
  component: Enterprise,
});

function Bars({ data, labelKey, valueKey, unit = "" }: { data: Record<string, string | number>[]; labelKey: string; valueKey: string; unit?: string }) {
  const max = Math.max(...data.map((row) => Number(row[valueKey])));
  return (
    <ul className="mt-4 space-y-3">
      {data.map((row) => (
        <li key={String(row[labelKey])}>
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-foreground">{String(row[labelKey])}</span>
            <span className="text-muted-foreground">
              {unit}
              {Number(row[valueKey]).toLocaleString("en-GB")}
            </span>
          </div>
          <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${(Number(row[valueKey]) / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

function Enterprise() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground" aria-hidden>
              <ShieldCheck className="size-6" />
            </span>
            <div className="min-w-0">
              <h1 className="truncate font-display text-2xl font-extrabold text-foreground sm:text-3xl">Enterprise analytics</h1>
              <p className="text-sm text-muted-foreground">Anonymised sample data · Last 12 months</p>
            </div>
          </div>
          <Link to="/" className="inline-flex min-h-11 items-center rounded-2xl border border-border bg-card px-4 text-sm font-bold text-foreground">
            Back to site
          </Link>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {enterpriseKpis.map((kpi) => (
            <div key={kpi.label} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-foreground">{kpi.value}</p>
              <p className="mt-1 text-sm font-semibold text-safe">{kpi.change}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Panel title="Scam attempts by category">
            <Bars data={enterpriseByCategory} labelKey="category" valueKey="attempts" />
          </Panel>
          <Panel title="Customer money protected (£000s)">
            <Bars data={enterpriseMoneySaved} labelKey="month" valueKey="amount" unit="£" />
          </Panel>
          <Panel title="Fraud trend (attempts per week)">
            <Bars data={enterpriseFraudTrend} labelKey="week" valueKey="attempts" />
          </Panel>
          <Panel title="Regional distribution">
            <Bars data={enterpriseRegions} labelKey="region" valueKey="attempts" />
          </Panel>
          <Panel title="Customer engagement">
            <Bars data={enterpriseEngagement} labelKey="month" valueKey="active" />
          </Panel>
          <Panel title="Protection success rate">
            <Bars data={enterpriseSuccess} labelKey="month" valueKey="rate" />
          </Panel>
        </div>
      </div>
    </main>
  );
}
