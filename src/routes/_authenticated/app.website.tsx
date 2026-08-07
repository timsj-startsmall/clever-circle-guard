import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Search } from "lucide-react";
import { AppShell, SoftCard } from "@/components/safe/app-shell";
import { RiskMeter, RiskPanel } from "@/components/safe/risk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkWebsite, type WebsiteAnalysis } from "@/lib/safecircle-ai";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/app/website")({
  head: () => ({
    meta: [
      { title: "Check a website — SafeCircle" },
      { name: "description", content: "Paste a web address and see its age, security, reputation and how closely it copies a real brand." },
      { property: "og:title", content: "Check a website — SafeCircle" },
      { property: "og:description", content: "Is this web address genuine? A plain-English check." },
    ],
  }),
  component: WebsiteChecker,
});

const toneText = { low: "text-safe", medium: "text-caution", high: "text-alert" } as const;

function WebsiteChecker() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<WebsiteAnalysis | null>(null);

  const run = async () => {
    if (!url.trim()) {
      toast.error("Please paste the web address first.");
      return;
    }
    setBusy(true);
    // Placeholder API boundary for a real URL reputation service.
    await new Promise((resolve) => setTimeout(resolve, 800));
    const analysis = checkWebsite(url);
    setResult(analysis);
    setBusy(false);

    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      await supabase.from("checks").insert({
        user_id: userData.user.id,
        kind: "website",
        risk: analysis.risk,
        title: analysis.domain,
        summary: analysis.headline,
        details: { indicators: analysis.indicators },
      });
    }
  };

  return (
    <AppShell title="Check a website" subtitle="Paste the address you were sent">
      <SoftCard>
        <label htmlFor="url" className="font-display text-lg font-bold text-foreground">
          Web address
        </label>
        <Input
          id="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://…"
          inputMode="url"
          className="mt-3 min-h-14 rounded-2xl text-base"
        />
        <button type="button" onClick={() => setUrl("http://hmrc-refund-claim.xyz/verify")} className="mt-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
          Try it with an example address
        </button>
        <Button onClick={run} disabled={busy} className="mt-5 min-h-14 w-full rounded-2xl text-base font-bold">
          {busy ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <Search className="size-5" aria-hidden />}
          {busy ? "Checking the address…" : "Check this website"}
        </Button>
      </SoftCard>

      {result ? (
        <div className="mt-5 space-y-4">
          <RiskPanel risk={result.risk} headline={result.headline}>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">{result.domain}</p>
            <p className="mt-2 text-foreground">{result.plainEnglish}</p>
            <div className="mt-4">
              <RiskMeter risk={result.risk} value={result.score} />
            </div>
          </RiskPanel>

          <SoftCard>
            <h3 className="font-display text-lg font-bold text-foreground">What we found</h3>
            <dl className="mt-3 divide-y divide-border">
              {result.facts.map((fact) => (
                <div key={fact.label} className="flex items-center justify-between gap-3 py-3">
                  <dt className="text-foreground">{fact.label}</dt>
                  <dd className={`text-right font-bold ${toneText[fact.tone]}`}>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </SoftCard>

          <SoftCard>
            <h3 className="font-display text-lg font-bold text-foreground">Things to be aware of</h3>
            <ul className="mt-3 space-y-2">
              {result.indicators.map((indicator) => (
                <li key={indicator} className="flex items-start gap-2.5 text-foreground">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" aria-hidden />
                  {indicator}
                </li>
              ))}
            </ul>
          </SoftCard>
        </div>
      ) : null}
    </AppShell>
  );
}
