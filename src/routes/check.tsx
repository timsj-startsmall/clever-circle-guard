import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, Loader2, Send, ImageIcon, ShieldCheck } from "lucide-react";
import { SoftCard } from "@/components/safe/app-shell";
import { RiskPanel } from "@/components/safe/risk";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analyzeMessage, type MessageAnalysis } from "@/lib/safecircle-ai";
import { useSpeak } from "@/lib/preferences";

export const Route = createFileRoute("/check")({
  head: () => ({
    meta: [
      { title: "Check a message free — SafeCircle" },
      {
        name: "description",
        content:
          "Paste a suspicious text or upload a screenshot and get a plain-English second opinion in seconds. No account needed.",
      },
      { property: "og:title", content: "Check a message free — SafeCircle" },
      {
        property: "og:description",
        content: "A calm, plain-English second opinion on any suspicious message. No sign-in required.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PublicMessageScanner,
});

const SAMPLE =
  "ROYAL MAIL: Your parcel is waiting. A redelivery fee of £1.45 is required. Pay urgently within 24 hours to avoid return: https://royalmail-redelivery.top/pay";

function PublicMessageScanner() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<MessageAnalysis | null>(null);
  const speak = useSpeak();

  const runCheck = async (content: string) => {
    if (!content.trim()) {
      toast.error("Please paste the message first, or upload a screenshot.");
      return;
    }
    setBusy(true);
    // Placeholder API boundary: swap analyzeMessage for a real AI call later.
    await new Promise((resolve) => setTimeout(resolve, 900));
    const analysis = analyzeMessage(content);
    setResult(analysis);
    setBusy(false);
    speak(`${analysis.headline}. ${analysis.plainEnglish}`);
    // Anonymous checks are never saved.
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setFileName(file.name);
    // Placeholder for OCR / vision analysis. The prototype uses a realistic sample.
    setText(SAMPLE);
    toast.success("Screenshot read. Check the text below, then tap Check this message.");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground" aria-hidden>
              <ShieldCheck className="size-6" />
            </span>
            <span className="truncate font-display text-xl font-extrabold text-foreground">SafeCircle</span>
          </Link>
          <Link
            to="/auth"
            className="inline-flex min-h-11 shrink-0 items-center rounded-2xl border border-border bg-card px-4 text-sm font-bold text-foreground shadow-soft"
          >
            Sign in
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-5">
        <h1 className="font-display text-3xl font-extrabold text-foreground">Check a message</h1>
        <p className="mt-1 text-muted-foreground">Paste it, or upload a photo of it. No account needed.</p>

        <SoftCard className="mt-5">
          <label htmlFor="message" className="font-display text-lg font-bold text-foreground">
            The message you received
          </label>
          <Textarea
            id="message"
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={6}
            placeholder="Paste the text, email or WhatsApp message here…"
            className="mt-3 rounded-2xl text-base"
          />
          <button type="button" onClick={() => setText(SAMPLE)} className="mt-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
            Try it with an example message
          </button>

          <div
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              handleFile(event.dataTransfer.files[0]);
            }}
            className="mt-4 rounded-3xl border-2 border-dashed border-border bg-secondary/50 p-6 text-center"
          >
            <ImageIcon className="mx-auto size-8 text-muted-foreground" aria-hidden />
            <p className="mt-2 font-semibold text-foreground">Drag a screenshot here</p>
            <p className="text-sm text-muted-foreground">{fileName ? `Added: ${fileName}` : "Or choose a photo from your phone"}</p>
            <label className="mt-3 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-2xl border border-border bg-card px-5 font-bold text-foreground shadow-soft">
              <Upload className="size-5" aria-hidden />
              Upload screenshot
              <input type="file" accept="image/*" className="sr-only" onChange={(event) => handleFile(event.target.files?.[0])} />
            </label>
          </div>

          <Button onClick={() => runCheck(text)} disabled={busy} className="mt-5 min-h-14 w-full rounded-2xl text-base font-bold">
            {busy ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <Send className="size-5" aria-hidden />}
            {busy ? "Looking at it carefully…" : "Check this message"}
          </Button>
        </SoftCard>

        {result ? (
          <div className="mt-5 space-y-4">
            <RiskPanel risk={result.risk} headline={result.headline}>
              <p className="mt-2 text-foreground">{result.plainEnglish}</p>
            </RiskPanel>

            {result.signals.length > 0 ? (
              <SoftCard>
                <h2 className="font-display text-lg font-bold text-foreground">What stood out</h2>
                <ul className="mt-3 space-y-3">
                  {result.signals.map((signal) => (
                    <li key={signal.label} className="rounded-2xl bg-secondary p-4">
                      <p className="font-bold text-foreground">{signal.label}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        In the message: <mark className="rounded bg-caution-soft px-1.5 py-0.5 text-caution">{signal.phrase}</mark>
                      </p>
                      <p className="mt-1.5 text-foreground">{signal.explanation}</p>
                    </li>
                  ))}
                </ul>
              </SoftCard>
            ) : null}

            <SoftCard>
              <h2 className="font-display text-lg font-bold text-foreground">What we'd do next</h2>
              <ul className="mt-3 space-y-2">
                {result.actions.map((action) => (
                  <li key={action} className="flex items-start gap-2.5 text-foreground">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" aria-hidden />
                    {action}
                  </li>
                ))}
              </ul>
              <Link
                to="/auth"
                className="mt-5 inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-primary px-6 text-base font-bold text-primary-foreground"
              >
                Create an account to notify a trusted contact
              </Link>
            </SoftCard>
          </div>
        ) : null}
      </main>
    </div>
  );
}
