import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SoftCard } from "@/components/safe/app-shell";
import { ScoreRing } from "@/components/safe/score-ring";
import { scoreHistory, shieldScore } from "@/lib/sample-data";

export const Route = createFileRoute("/_authenticated/app/score")({
  head: () => ({
    meta: [
      { title: "Your Scam Shield Score — SafeCircle" },
      { name: "description", content: "See how your everyday safety habits are going, with gentle suggestions and your score over time." },
      { property: "og:title", content: "Your Scam Shield Score — SafeCircle" },
      { property: "og:description", content: "A digital wellbeing score for staying safe online." },
    ],
  }),
  component: ScorePage,
});

function ScorePage() {
  const max = Math.max(...scoreHistory.map((point) => point.score));
  return (
    <AppShell title="Scam Shield Score" subtitle="How your safety habits are going">
      <SoftCard className="flex items-center gap-5 bg-gradient-to-br from-primary-soft to-accent-soft">
        <ScoreRing score={shieldScore.score} size={120} />
        <div>
          <p className="font-display text-xl font-bold text-foreground">{shieldScore.headline}</p>
          <p className="mt-1 text-muted-foreground">Up {shieldScore.change} points since last week.</p>
        </div>
      </SoftCard>

      <SoftCard className="mt-4">
        <h2 className="font-display text-lg font-bold text-foreground">This month so far</h2>
        <ul className="mt-3 space-y-2">
          {shieldScore.insights.map((insight) => (
            <li key={insight.text} className="flex items-start gap-2.5 text-foreground">
              <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" aria-hidden />
              {insight.text}
            </li>
          ))}
        </ul>
      </SoftCard>

      <SoftCard className="mt-4">
        <h2 className="font-display text-lg font-bold text-foreground">Your score over time</h2>
        <div className="mt-4 flex h-40 items-end gap-2">
          {scoreHistory.map((point) => (
            <div key={point.week} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-xl bg-primary/80"
                style={{ height: `${(point.score / max) * 100}%` }}
                role="img"
                aria-label={`${point.week}: ${point.score} out of 100`}
              />
              <span className="text-xs text-muted-foreground">{point.week}</span>
            </div>
          ))}
        </div>
      </SoftCard>

      <SoftCard className="mt-4 bg-accent-soft">
        <h2 className="font-display text-lg font-bold text-foreground">Gentle suggestions</h2>
        <ul className="mt-3 space-y-2">
          {shieldScore.recommendations.map((item) => (
            <li key={item.title} className="flex items-start gap-2.5 text-foreground">
              <span className="mt-2 size-2 shrink-0 rounded-full bg-accent" aria-hidden />
              <span><span className="font-semibold">{item.title}</span> — {item.detail}</span>
            </li>
          ))}
        </ul>
      </SoftCard>
    </AppShell>
  );
}
