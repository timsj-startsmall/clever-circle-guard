import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ActionTile({
  to,
  icon: Icon,
  title,
  description,
  tone = "primary",
}: {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: "primary" | "accent";
}) {
  return (
    <Link
      to={to}
      className="group flex min-h-[112px] items-center gap-4 rounded-3xl border border-border bg-card p-5 text-left shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
    >
      <span
        className={cn(
          "grid size-14 shrink-0 place-items-center rounded-2xl",
          tone === "primary" ? "bg-primary-soft text-primary" : "bg-accent-soft text-accent",
        )}
        aria-hidden
      >
        <Icon className="size-7" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-xl font-bold text-foreground">{title}</span>
        <span className="mt-0.5 block text-sm text-muted-foreground">{description}</span>
      </span>
      <ChevronRight className="size-6 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}
