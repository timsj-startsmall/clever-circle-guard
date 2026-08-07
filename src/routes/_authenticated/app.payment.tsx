import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, PhoneCall, Users, BookOpen } from "lucide-react";
import { AppShell, SoftCard } from "@/components/safe/app-shell";
import { RiskMeter, RiskPanel } from "@/components/safe/risk";
import { Button } from "@/components/ui/button";
import { PAYMENT_QUESTIONS, assessPayment, type PaymentAssessment } from "@/lib/safecircle-ai";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/app/payment")({
  head: () => ({
    meta: [
      { title: "Payment safety check — SafeCircle" },
      { name: "description", content: "Five simple questions before you send money, with a clear recommendation and who to call." },
      { property: "og:title", content: "Payment safety check — SafeCircle" },
      { property: "og:description", content: "Please pause before making a payment you weren't expecting." },
    ],
  }),
  component: PaymentWizard,
});

function PaymentWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<PaymentAssessment | null>(null);

  const question = PAYMENT_QUESTIONS[step];

  const answer = async (value: boolean) => {
    if (!question) return;
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    if (step + 1 < PAYMENT_QUESTIONS.length) {
      setStep(step + 1);
      return;
    }
    const assessment = assessPayment(next);
    setResult(assessment);
    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      await supabase.from("checks").insert({
        user_id: userData.user.id,
        kind: "payment",
        risk: assessment.risk,
        title: "Payment request check",
        summary: assessment.headline,
        details: next,
      });
    }
  };

  const progress = ((step + (result ? 1 : 0)) / PAYMENT_QUESTIONS.length) * 100;

  return (
    <AppShell title="Someone asked me for money" subtitle="Five quick questions, then a clear answer">
      {!result && question ? (
        <>
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Progress">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <SoftCard className="mt-4">
            <p className="text-sm font-semibold text-muted-foreground">
              Question {step + 1} of {PAYMENT_QUESTIONS.length}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-foreground">{question.question}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => answer(true)}
                className="flex min-h-16 items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card text-lg font-bold text-foreground transition-colors hover:border-caution hover:bg-caution-soft"
              >
                <Check className="size-6" aria-hidden /> Yes
              </button>
              <button
                type="button"
                onClick={() => answer(false)}
                className="flex min-h-16 items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card text-lg font-bold text-foreground transition-colors hover:border-safe hover:bg-safe-soft"
              >
                <X className="size-6" aria-hidden /> No
              </button>
            </div>
          </SoftCard>
        </>
      ) : null}

      {result ? (
        <div className="space-y-4">
          <RiskPanel risk={result.risk} headline={result.headline}>
            <p className="mt-2 text-lg text-foreground">{result.plainEnglish}</p>
            <div className="mt-4">
              <RiskMeter risk={result.risk} value={result.score} />
            </div>
          </RiskPanel>
          <SoftCard className="grid gap-3">
            <Link to="/app/trusted" className="inline-flex min-h-16 items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-lg font-bold text-primary-foreground">
              <Users className="size-6" aria-hidden /> Call Trusted Contact
            </Link>
            <a href="tel:08000556611" className="inline-flex min-h-16 items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card px-6 text-lg font-bold text-foreground">
              <PhoneCall className="size-6" aria-hidden /> Call Your Bank
            </a>
            <Link to="/app/learn" className="inline-flex min-h-16 items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card px-6 text-lg font-bold text-foreground">
              <BookOpen className="size-6" aria-hidden /> Learn More
            </Link>
          </SoftCard>
          <Button
            variant="ghost"
            onClick={() => {
              setStep(0);
              setAnswers({});
              setResult(null);
            }}
            className="min-h-12 w-full rounded-2xl font-bold"
          >
            Start again
          </Button>
        </div>
      ) : null}
    </AppShell>
  );
}
