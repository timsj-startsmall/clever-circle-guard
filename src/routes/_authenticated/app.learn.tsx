import { createFileRoute } from "@tanstack/react-router";
import { PlayCircle } from "lucide-react";
import { AppShell, SoftCard } from "@/components/safe/app-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { educationArticles } from "@/lib/sample-data";

export const Route = createFileRoute("/_authenticated/app/learn")({
  head: () => ({
    meta: [
      { title: "Scam education centre — SafeCircle" },
      { name: "description", content: "Short, friendly guides to banking, romance, delivery, investment, phone, QR, WhatsApp and AI voice scams." },
      { property: "og:title", content: "Scam education centre — SafeCircle" },
      { property: "og:description", content: "Two-minute guides to the scams doing the rounds." },
    ],
  }),
  component: LearnCentre,
});

function LearnCentre() {
  return (
    <AppShell title="Scam education centre" subtitle="Short guides, no jargon">
      <Accordion type="single" collapsible className="grid gap-3">
        {educationArticles.map((article) => (
          <AccordionItem key={article.slug} value={article.slug} className="rounded-3xl border border-border bg-card px-5 shadow-soft">
            <AccordionTrigger className="text-left">
              <span>
                <span className="block font-display text-lg font-bold text-foreground">{article.title}</span>
                <span className="block text-sm font-normal text-muted-foreground">
                  {article.summary} · {article.minutes} min read
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pb-2">
                {article.body.map((paragraph) => (
                  <p key={paragraph} className="text-base text-foreground">
                    {paragraph}
                  </p>
                ))}
                <div className="flex items-center gap-3 rounded-2xl bg-secondary p-4">
                  <PlayCircle className="size-8 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-semibold text-foreground">{article.video}</p>
                    <p className="text-sm text-muted-foreground">Video guide coming soon in this prototype.</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <SoftCard className="mt-5 bg-accent-soft">
        <h2 className="font-display text-lg font-bold text-foreground">Remember</h2>
        <p className="mt-1 text-foreground">
          Nobody genuine will ever rush you, ask you to keep a payment secret, or need a code from your phone. Pausing is always allowed.
        </p>
      </SoftCard>
    </AppShell>
  );
}
