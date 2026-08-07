import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/safe/app-shell";
import { RiskBadge } from "@/components/safe/risk";
import { notifications } from "@/lib/sample-data";

export const Route = createFileRoute("/_authenticated/app/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — SafeCircle" },
      { name: "description", content: "Requests for help, high-risk payment alerts and recent website checks, all in one calm list." },
      { property: "og:title", content: "Notifications — SafeCircle" },
      { property: "og:description", content: "Everything that needs a moment of your attention." },
    ],
  }),
  component: Notifications,
});

function Notifications() {
  return (
    <AppShell title="Notifications" subtitle="Nothing urgent right now">
      <ol className="space-y-3">
        {notifications.map((item) => (
          <li key={item.id} className="flex items-start gap-3 rounded-3xl border border-border bg-card p-4 shadow-soft">
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.when}</p>
            </div>
            <RiskBadge risk={item.risk} />
          </li>
        ))}
      </ol>
    </AppShell>
  );
}
