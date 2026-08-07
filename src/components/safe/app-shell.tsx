import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Bell, Home, LifeBuoy, MessageCircleHeart, Settings, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/app/dashboard", label: "Home", icon: Home },
  { to: "/app/score", label: "Shield", icon: ShieldCheck },
  { to: "/app/chat", label: "Ask AI", icon: MessageCircleHeart },
  { to: "/app/learn", label: "Learn", icon: LifeBuoy },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function AppShell({
  title,
  subtitle,
  showBack = true,
  children,
  action,
}: {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  children: ReactNode;
  action?: ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-3xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
          {showBack ? (
            <button
              type="button"
              onClick={() => router.history.back()}
              aria-label="Go back"
              className="grid size-11 shrink-0 place-items-center rounded-2xl border border-border bg-card text-foreground transition-colors hover:bg-secondary"
            >
              <ArrowLeft className="size-5" aria-hidden />
            </button>
          ) : (
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground" aria-hidden>
              <ShieldCheck className="size-6" />
            </span>
          )}
          <div className="min-w-0">
            <h1 className="truncate font-display text-xl font-bold text-foreground">{title}</h1>
            {subtitle ? <p className="truncate text-sm text-muted-foreground">{subtitle}</p> : null}
          </div>
          {action ?? (
            <Link
              to="/app/notifications"
              aria-label="Notifications"
              className="relative grid size-11 shrink-0 place-items-center rounded-2xl border border-border bg-card text-foreground transition-colors hover:bg-secondary"
            >
              <Bell className="size-5" aria-hidden />
              <span className="absolute right-2.5 top-2.5 size-2.5 rounded-full bg-alert" aria-hidden />
            </Link>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-5">{children}</main>

      <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 backdrop-blur">
        <ul className="mx-auto flex max-w-3xl items-stretch justify-between px-2 py-1.5">
          {navItems.map((item) => (
            <li key={item.to} className="flex-1">
              <Link
                to={item.to}
                className="flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-2xl px-1 py-1.5 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-secondary"
                activeProps={{ className: "text-primary bg-primary-soft" }}
              >
                <item.icon className="size-6" aria-hidden />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export function SoftCard({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={cn("rounded-3xl border border-border bg-card p-5 shadow-soft", className)}>{children}</section>;
}
