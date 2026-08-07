import type { Risk } from "@/lib/safecircle-ai";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";

export const riskCopy: Record<Risk, { label: string; short: string }> = {
  low: { label: "No clear warning signs", short: "Low concern" },
  medium: { label: "Worth checking", short: "Some concern" },
  high: { label: "Likely a scam", short: "High concern" },
};

const riskStyles: Record<Risk, string> = {
  low: "bg-safe-soft text-safe border-safe/25",
  medium: "bg-caution-soft text-caution border-caution/25",
  high: "bg-alert-soft text-alert border-alert/25",
};

const RiskIcon = { low: CheckCircle2, medium: AlertTriangle, high: ShieldAlert };

export function RiskBadge({ risk, className, label }: { risk: Risk; className?: string; label?: string }) {
  const Icon = RiskIcon[risk];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold",
        riskStyles[risk],
        className,
      )}
    >
      <Icon className="size-4 shrink-0" aria-hidden />
      {label ?? riskCopy[risk].short}
    </span>
  );
}

export function RiskMeter({ risk, value }: { risk: Risk; value: number }) {
  const fill = risk === "high" ? "bg-alert" : risk === "medium" ? "bg-caution" : "bg-safe";
  return (
    <div className="space-y-2">
      <div
        className="h-4 w-full overflow-hidden rounded-full bg-muted"
        role="meter"
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Risk level"
      >
        <div className={cn("h-full rounded-full transition-all duration-700", fill)} style={{ width: `${Math.max(6, Math.min(value, 100))}%` }} />
      </div>
      <div className="flex justify-between text-xs font-medium text-muted-foreground">
        <span>No clear signs</span>
        <span>Worth checking</span>
        <span>Likely a scam</span>
      </div>
    </div>
  );
}

export function RiskPanel({ risk, headline, children }: { risk: Risk; headline: string; children?: React.ReactNode }) {
  const tone = risk === "high" ? "bg-alert-soft border-alert/25" : risk === "medium" ? "bg-caution-soft border-caution/25" : "bg-safe-soft border-safe/25";
  return (
    <section className={cn("rounded-3xl border p-5 sm:p-6", tone)} aria-live="polite">
      <RiskBadge risk={risk} />
      <h2 className="mt-3 text-2xl font-bold text-foreground">{headline}</h2>
      {children}
    </section>
  );
}
