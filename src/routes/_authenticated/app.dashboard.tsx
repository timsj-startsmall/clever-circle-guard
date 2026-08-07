import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Camera,
  Globe,
  PhoneCall,
  Banknote,
  Users,
  Lightbulb,
  HelpCircle,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { AppShell, SoftCard } from "@/components/safe/app-shell";
import { ActionTile } from "@/components/safe/action-tile";
import { RiskBadge } from "@/components/safe/risk";
import { ScoreRing } from "@/components/safe/score-ring";
import { supabase } from "@/integrations/supabase/client";
import { dailyTips, recentActivity, shieldScore } from "@/lib/sample-data";
import type { Risk } from "@/lib/safecircle-ai";

export const Route = createFileRoute("/_authenticated/app/dashboard")({
  head: () => ({
    meta: [
      { title: "Your SafeCircle home" },
      { name: "description", content: "Check a message, website, phone call or payment request, and see your recent safety activity." },
      { property: "og:title", content: "Your SafeCircle home" },
      { property: "og:description", content: "Check anything that feels off, in a few taps." },
    ],
  }),
  component: Dashboard,
});

const kindIcon: Record<string, typeof Camera> = {
  message: MessageSquareText,
  website: Globe,
  call: PhoneCall,
  payment: Banknote,
  family: Users,
};

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function Dashboard() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return null;
      const { data } = await supabase.from("profiles").select("display_name").eq("id", userData.user.id).maybeSingle();
      return data;
    },
  });

  const { data: myChecks } = useQuery({
    queryKey: ["recent-checks"],
    queryFn: async () => {
      const { data } = await supabase
        .from("checks")
        .select("id, kind, risk, title, summary, created_at")
        .order("created_at", { ascending: false })
        .limit(4);
      return data ?? [];
    },
  });

  const name = profile?.display_name ?? "there";
  const tip = dailyTips[new Date().getDate() % dailyTips.length];

  return (
    <AppShell title={`${greeting()}, ${name}`} subtitle="What would you like to check?" showBack={false}>
      <SoftCard className="flex items-center gap-5 bg-gradient-to-br from-primary-soft to-accent-soft">
        <ScoreRing score={shieldScore.score} size={110} />
        <div className="min-w-0">
          <h2 className="font-display text-xl font-bold text-foreground">Scam Shield Score</h2>
          <p className="text-sm text-muted-foreground">{shieldScore.headline} — up {shieldScore.change} points this week.</p>
          <Link to="/app/score" className="mt-2 inline-flex min-h-11 items-center rounded-2xl bg-card px-4 text-sm font-bold text-primary shadow-soft">
            See your insights
          </Link>
        </div>
      </SoftCard>

      <div className="mt-5 grid gap-3">
        <ActionTile to="/app/message" icon={Camera} title="Check a Message" description="Paste it or upload a screenshot" />
        <ActionTile to="/app/website" icon={Globe} title="Check a Website" description="Is this web address genuine?" />
        <ActionTile to="/app/call" icon={PhoneCall} title="I Received a Phone Call" description="Tell us what they said" />
        <ActionTile to="/app/payment" icon={Banknote} title="Someone Asked Me For Money" description="Five questions before you pay" tone="accent" />
        <ActionTile to="/app/trusted" icon={Users} title="Ask Someone I Trust" description="Share this with your family" tone="accent" />
      </div>

      <SoftCard className="mt-5 bg-accent-soft">
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-0.5 size-6 shrink-0 text-accent" aria-hidden />
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">Today's tip</h2>
            <p className="mt-1 text-foreground">{tip}</p>
          </div>
        </div>
      </SoftCard>

      <section className="mt-6">
        <h2 className="font-display text-xl font-bold text-foreground">Recent activity</h2>
        <ol className="mt-3 space-y-3">
          {(myChecks ?? []).map((check) => {
            const Icon = kindIcon[check.kind] ?? ShieldCheck;
            return (
              <li key={check.id} className="flex items-start gap-3 rounded-3xl border border-border bg-card p-4 shadow-soft">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary" aria-hidden>
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground">{check.title}</p>
                  <p className="text-sm text-muted-foreground">{check.summary}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{new Date(check.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</p>
                </div>
                <RiskBadge risk={check.risk as Risk} />
              </li>
            );
          })}
          {recentActivity.map((item) => {
            const Icon = kindIcon[item.kind] ?? ShieldCheck;
            return (
              <li key={item.id} className="flex items-start gap-3 rounded-3xl border border-border bg-card p-4 shadow-soft">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary" aria-hidden>
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.when}</p>
                </div>
                <RiskBadge risk={item.risk} />
              </li>
            );
          })}
        </ol>
      </section>

      <Link
        to="/app/unsure"
        className="fixed bottom-24 right-4 z-30 inline-flex min-h-14 items-center gap-2 rounded-3xl bg-alert px-6 font-display text-lg font-extrabold text-alert-foreground shadow-lift transition-transform hover:-translate-y-0.5"
      >
        <HelpCircle className="size-6" aria-hidden />
        I'm Unsure
      </Link>
    </AppShell>
  );
}
