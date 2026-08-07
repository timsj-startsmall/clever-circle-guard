import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Phone, MessageCircle, UserPlus } from "lucide-react";
import { AppShell, SoftCard } from "@/components/safe/app-shell";
import { sampleContacts } from "@/lib/sample-data";

export const Route = createFileRoute("/_authenticated/app/trusted")({
  head: () => ({
    meta: [
      { title: "Ask someone I trust — SafeCircle" },
      { name: "description", content: "Share a check with a family member or friend, or give them a ring straight away." },
      { property: "og:title", content: "Ask someone I trust — SafeCircle" },
      { property: "og:description", content: "Your trusted circle, one tap away." },
    ],
  }),
  component: TrustedContacts,
});

function TrustedContacts() {
  return (
    <AppShell title="Ask someone I trust" subtitle="They're happy to help — that's why they're here">
      <div className="grid gap-3">
        {sampleContacts.map((contact) => (
          <SoftCard key={contact.id}>
            <div className="flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary-soft font-display text-lg font-bold text-primary" aria-hidden>
                {contact.name.split(" ").map((part) => part[0]).join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-bold text-foreground">{contact.name}</p>
                <p className="text-sm text-muted-foreground">
                  {contact.relationship} · {contact.phone}
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-4 font-bold text-primary-foreground">
                <Phone className="size-5" aria-hidden /> Call {contact.name.split(" ")[0]}
              </a>
              <button
                type="button"
                onClick={() => toast.success(`${contact.name} has been asked to take a look.`)}
                className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card px-4 font-bold text-foreground"
              >
                <MessageCircle className="size-5" aria-hidden /> Ask for help
              </button>
            </div>
          </SoftCard>
        ))}
      </div>

      <button
        type="button"
        onClick={() => toast.info("Adding contacts is coming next in this prototype.")}
        className="mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card px-4 font-bold text-foreground"
      >
        <UserPlus className="size-5" aria-hidden /> Add a trusted contact
      </button>
    </AppShell>
  );
}
