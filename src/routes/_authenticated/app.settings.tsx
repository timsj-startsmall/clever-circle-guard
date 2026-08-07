import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { AppShell, SoftCard } from "@/components/safe/app-shell";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { usePreferences } from "@/lib/preferences";
import { sampleContacts } from "@/lib/sample-data";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — SafeCircle" },
      { name: "description", content: "Manage trusted contacts, notifications and accessibility options like large text, high contrast and read aloud." },
      { property: "og:title", content: "Settings — SafeCircle" },
      { property: "og:description", content: "Make SafeCircle comfortable for you." },
    ],
  }),
  component: Settings,
});

function Settings() {
  const { prefs, setPref } = usePreferences();
  const navigate = useNavigate();

  const toggles = [
    { key: "largeText" as const, label: "Large text", detail: "Bigger words across the whole app" },
    { key: "highContrast" as const, label: "High contrast", detail: "Stronger colours for easier reading" },
    { key: "darkMode" as const, label: "Dark mode", detail: "Softer on the eyes at night" },
    { key: "readAloud" as const, label: "Read results aloud", detail: "SafeCircle speaks the answer to you" },
  ];

  return (
    <AppShell title="Settings" subtitle="Make SafeCircle comfortable for you">
      <SoftCard>
        <h2 className="font-display text-lg font-bold text-foreground">Accessibility</h2>
        <ul className="mt-3 divide-y divide-border">
          {toggles.map((toggle) => (
            <li key={toggle.key} className="flex items-center justify-between gap-4 py-4">
              <div className="min-w-0">
                <p className="font-semibold text-foreground">{toggle.label}</p>
                <p className="text-sm text-muted-foreground">{toggle.detail}</p>
              </div>
              <Switch
                checked={prefs[toggle.key]}
                onCheckedChange={(value) => setPref(toggle.key, value)}
                aria-label={toggle.label}
              />
            </li>
          ))}
        </ul>
      </SoftCard>

      <SoftCard className="mt-4">
        <h2 className="font-display text-lg font-bold text-foreground">Trusted contacts</h2>
        <ul className="mt-3 divide-y divide-border">
          {sampleContacts.map((contact) => (
            <li key={contact.id} className="py-3">
              <p className="font-semibold text-foreground">{contact.name}</p>
              <p className="text-sm text-muted-foreground">
                {contact.relationship} · {contact.phone}
                {contact.isPrimary ? " · Primary" : ""}
              </p>
            </li>
          ))}
        </ul>
      </SoftCard>

      <Button
        variant="outline"
        className="mt-5 min-h-14 w-full rounded-2xl text-base font-bold"
        onClick={async () => {
          await supabase.auth.signOut();
          navigate({ to: "/auth", replace: true });
        }}
      >
        <LogOut className="size-5" aria-hidden /> Sign out
      </Button>
    </AppShell>
  );
}
