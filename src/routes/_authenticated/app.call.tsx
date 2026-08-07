import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, SoftCard } from "@/components/safe/app-shell";
import { RiskMeter, RiskPanel } from "@/components/safe/risk";
import { Button } from "@/components/ui/button";
import { CALL_QUESTIONS, assessCall, type CallAssessment } from "@/lib/safecircle-ai";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/app/call")({
  head: () => ({
    meta: [
      { title: "I received a phone call — SafeCircle" },
      { name: "description", content: "Tell SafeCircle what the caller said and get a calm, plain-English view on whether it sounds like a scam." },
      { property: "og:title", content: "I received a phone call — SafeCircle" },
      { property: "og:description", content: "A few gentle questions about the call, then a clear answer." },
    ],
  }),
  component: CallChecker,
});

function CallChecker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CallAssessment | null>(null);

  const question = CALL_QUESTIONS[step];

  const choose = async (option: string) => {
    if (!question) return;
    const next = { ...answers, [question.id]: option };
    setAnswers(next);
    if (step + 1 < CALL_QUESTIONS.length) {
      setStep(step + 1);
      return;
    }
    const assessment = assessCall(next);
    setResult(assessment);
    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      await supabase.from("checks").insert({
        user_id: userData.user.id,
        kind: "call",
        risk: assessment.risk,
        title: `Call from ${next['who'] ?? "someone"}`,
        summary: assessment.headline,
        details: next,
      });
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <AppShell title="I received a phone call" subtitle="Let's talk it through together">
      {!result && question ? (
        <>
          <SoftCard className="bg-primary-soft">
            <p className="text-foreground">
              Take your time. There are {CALL_QUESTIONS.length} short questions and nothing is shared unless you choose to.
            </p>
          </SoftCard>
          <SoftCard className="mt-4">
            <p className="text-sm font-semibold text-muted-foreground">
              Question {step + 1} of {CALL_QUESTIONS.length}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-foreground">{question.question}</h2>
            <div className="mt-4 grid gap-3">
              {question.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => choose(option)}
                  className="min-h-14 rounded-2xl border-2 border-border bg-card px-5 text-left text-base font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary-soft"
                >
                  {option}
                </button>
              ))}
            </div>
          </SoftCard>
        </>
      ) : null}

      {result ? (
        <div className="space-y-4">
          <RiskPanel risk={result.risk} headline={result.headline}>
            <p className="mt-2 text-foreground">{result.plainEnglish}</p>
            <div className="mt-4">
              <RiskMeter risk={result.risk} value={result.likelihood} />
            </div>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">Scam likelihood: {result.likelihood}%</p>
          </RiskPanel>
          <SoftCard>
            <h3 className="font-display text-lg font-bold text-foreground">What we'd do next</h3>
            <ul className="mt-3 space-y-2">
              {result.actions.map((action) => (
                <li key={action} className="flex items-start gap-2.5 text-foreground">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" aria-hidden />
                  {action}
                </li>
              ))}
            </ul>
            <Button variant="outline" onClick={restart} className="mt-5 min-h-14 w-full rounded-2xl text-base font-bold">
              Check another call
            </Button>
          </SoftCard>
        </div>
      ) : null}
    </AppShell>
  );
}
