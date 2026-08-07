import { cn } from "@/lib/utils";

export function ScoreRing({
  score,
  size = 180,
  label,
  className,
}: {
  score: number;
  size?: number;
  label?: string;
  className?: string;
}) {
  const stroke = size / 11;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, Math.min(score, 100)) / 100);
  const tone = score >= 80 ? "stroke-safe" : score >= 55 ? "stroke-caution" : "stroke-alert";

  return (
    <div className={cn("relative inline-grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" role="img" aria-label={`Scam Shield Score ${score} out of 100`}>
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} className="fill-none stroke-muted" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn("fill-none transition-[stroke-dashoffset] duration-1000 ease-out", tone)}
        />
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-4xl font-extrabold leading-none text-foreground">{score}</div>
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label ?? "out of 100"}</div>
      </div>
    </div>
  );
}
