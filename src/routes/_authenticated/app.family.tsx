import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Video, MessageCircle, BellRing } from "lucide-react";
import { AppShell, SoftCard } from "@/components/safe/app-shell";
import { ScoreRing } from "@/components/safe/score-ring";
import { RiskBadge } from "@/components/safe/risk";
import { recentActivity, shieldScore } from "@/lib/sample-data";

export const Route = createFileRoute("/_authenticated/app/family")({
  head: () => ({
    meta: [
      { title: "Family dashboard — SafeCircle" },
      { name: "description", content: "See recent checks, alerts and weekly summaries for the people you look out for." },
      { property: "og:title", content: "Family dashboard — SafeCircle" },
      { property: "og:description", content: "Peace of mind for families, without looking over anyone's shoulder." },
    ],
  }),
  component: FamilyDashboard,
});

function FamilyDashboard() {
  return (
    <AppShell title="Family dashboard" subtitle="Margaret is doing well this week">
      <SoftCard className="flex items-center gap-5 bg-gradient-to-br from-primary-soft to-accent-soft">
        <ScoreRing score={shieldScore.score} size={110} />
        <div>
          <p className="font-display text-xl font-bold text-foreground">Margaret Hughes</p>
          <p className="text-muted-foreground">{shieldScore.headline}</p>
          <p className="mt-1 text-sm text-muted-foreground">5 scams avoided this month · 1 alert to review</p>
        </div>
      </SoftCard>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <button type="button" onClick={() => toast.success("Reassurance message sent to Margaret.")} className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-4 font-bold text-primary-foreground">
          <MessageCircle className="size-5" aria-hidden /> Send reassurance
        </button>
        <button type="button" onClick={() => toast.info("Starting a video call…")} className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card px-4 font-bold text-foreground">
          <Video className="size-5" aria-hidden /> Start video call
        </button>
        <button type="button" onClick={() => toast.success("Alert acknowledged.")} className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card px-4 font-bold text-foreground">
          <BellRing className="size-5" aria-hidden /> Acknowledge alert
        </button>
      </div>

      <section className="mt-6">
        <h2 className="font-display text-xl font-bold text-foreground">Recent checks</h2>
        <ol className="mt-3 space-y-3">
          {recentActivity.map((item) => (
            <li key={item.id} className="flex items-start gap-3 rounded-3xl border border-border bg-card p-4 shadow-soft">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.when}</p>
              </div>
              <RiskBadge risk={item.risk} />
            </li>
          ))}
        </ol>
      </section>

      <SoftCard className="mt-5 bg-accent-soft">
        <h2 className="font-display text-lg font-bold text-foreground">Ways to help this week</h2>
        <ul className="mt-3 space-y-2">
          {shieldScore.recommendations.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-foreground">
              <span className="mt-2 size-2 shrink-0 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </SoftCard>
    </AppShell>
  );
}
