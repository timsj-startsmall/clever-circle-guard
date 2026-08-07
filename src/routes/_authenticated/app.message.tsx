import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, Loader2, Send, ImageIcon } from "lucide-react";
import { AppShell, SoftCard } from "@/components/safe/app-shell";
import { RiskPanel } from "@/components/safe/risk";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analyzeMessage, type MessageAnalysis } from "@/lib/safecircle-ai";
import { supabase } from "@/integrations/supabase/client";
import { useSpeak } from "@/lib/preferences";

export const Route = createFileRoute("/_authenticated/app/message")({
  head: () => ({
    meta: [
      { title: "Check a message — SafeCircle" },
      { name: "description", content: "Paste a suspicious text or upload a screenshot and SafeCircle explains what looks wrong and what to do next." },
      { property: "og:title", content: "Check a message — SafeCircle" },
      { property: "og:description", content: "A plain-English second opinion on any suspicious message." },
    ],
  }),
  component: MessageScanner,
});

const SAMPLE =
  "ROYAL MAIL: Your parcel is waiting. A redelivery fee of £1.45 is required. Pay urgently within 24 hours to avoid return: https://royalmail-redelivery.top/pay";

function MessageScanner() {
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

    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      await supabase.from("checks").insert({
        user_id: userData.user.id,
        kind: "message",
        risk: analysis.risk,
        title: content.slice(0, 60) + (content.length > 60 ? "…" : ""),
        summary: analysis.headline,
        details: { signals: analysis.signals.map((signal) => signal.label) },
      });
    }
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setFileName(file.name);
    // Placeholder for OCR / vision analysis. The prototype uses a realistic sample.
    setText(SAMPLE);
    toast.success("Screenshot read. Check the text below, then tap Check this message.");
  };

  return (
    <AppShell title="Check a message" subtitle="Paste it, or upload a photo of it">
      <SoftCard>
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
              <h3 className="font-display text-lg font-bold text-foreground">What stood out</h3>
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
            <h3 className="font-display text-lg font-bold text-foreground">What we'd do next</h3>
            <ul className="mt-3 space-y-2">
              {result.actions.map((action) => (
                <li key={action} className="flex items-start gap-2.5 text-foreground">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" aria-hidden />
                  {action}
                </li>
              ))}
            </ul>
            <Link to="/app/trusted" className="mt-5 inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-primary px-6 text-base font-bold text-primary-foreground">
              Notify Trusted Contact
            </Link>
          </SoftCard>
        </div>
      ) : null}
    </AppShell>
  );
}
