import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Users, MessageSquareText, BookOpen } from "lucide-react";
import { AppShell, SoftCard } from "@/components/safe/app-shell";

export const Route = createFileRoute("/_authenticated/app/unsure")({
  head: () => ({
    meta: [
      { title: "I'm unsure — SafeCircle" },
      { name: "description", content: "Feeling unsure about something? Pause here and pick the next simple step." },
      { property: "og:title", content: "I'm unsure — SafeCircle" },
      { property: "og:description", content: "It's always okay to stop and check." },
    ],
  }),
  component: Unsure,
});

function Unsure() {
  return (
    <AppShell title="You did the right thing" subtitle="Let's take this one step at a time">
      <SoftCard className="bg-primary-soft">
        <p className="text-lg text-foreground">
          Pausing is always allowed. Nobody genuine will mind you taking a few minutes to check.
        </p>
      </SoftCard>
      <div className="mt-4 grid gap-3">
        <Link to="/app/trusted" className="flex min-h-16 items-center gap-3 rounded-3xl bg-primary px-5 text-lg font-bold text-primary-foreground">
          <Users className="size-6" aria-hidden /> Call someone I trust
        </Link>
        <a href="tel:159" className="flex min-h-16 items-center gap-3 rounded-3xl border-2 border-border bg-card px-5 text-lg font-bold text-foreground">
          <Phone className="size-6" aria-hidden /> Call my bank on 159
        </a>
        <Link to="/app/chat" className="flex min-h-16 items-center gap-3 rounded-3xl border-2 border-border bg-card px-5 text-lg font-bold text-foreground">
          <MessageSquareText className="size-6" aria-hidden /> Talk it through with SafeCircle
        </Link>
        <Link to="/app/learn" className="flex min-h-16 items-center gap-3 rounded-3xl border-2 border-border bg-card px-5 text-lg font-bold text-foreground">
          <BookOpen className="size-6" aria-hidden /> Read about common scams
        </Link>
      </div>
    </AppShell>
  );
}
