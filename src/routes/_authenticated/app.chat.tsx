import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send } from "lucide-react";
import { AppShell, SoftCard } from "@/components/safe/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { askAssistant } from "@/lib/safecircle-ai";

export const Route = createFileRoute("/_authenticated/app/chat")({
  head: () => ({
    meta: [
      { title: "Ask SafeCircle — AI assistant" },
      { name: "description", content: "Ask anything about a message, caller or payment request and get a calm answer in plain English." },
      { property: "og:title", content: "Ask SafeCircle — AI assistant" },
      { property: "og:description", content: "A friendly assistant that explains things without jargon." },
    ],
  }),
  component: ChatAssistant,
});

type Message = { id: number; from: "you" | "ai"; text: string };

const SUGGESTIONS = ["Is this genuine?", "Someone says they're from HMRC.", "Should I send this money?"];

function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "ai", text: "Hello! I'm here to help you think things through. Tell me what's happened, or paste a message you've received. There's no rush." },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    const you: Message = { id: Date.now(), from: "you", text };
    setMessages((current) => [...current, you]);
    setInput("");
    // Placeholder API boundary for a real conversational model.
    setTimeout(() => {
      setMessages((current) => [...current, { id: Date.now() + 1, from: "ai", text: askAssistant(text) }]);
    }, 600);
  };

  return (
    <AppShell title="Ask SafeCircle" subtitle="A friendly second opinion, any time">
      <div className="space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[85%] rounded-3xl px-5 py-4 text-base shadow-soft ${
              message.from === "ai" ? "bg-card text-foreground" : "ml-auto bg-primary text-primary-foreground"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => send(suggestion)}
            className="min-h-11 rounded-2xl border border-border bg-card px-4 text-sm font-semibold text-foreground shadow-soft"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <SoftCard className="sticky bottom-24 mt-4">
        <form
          className="flex items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            send(input);
          }}
        >
          <label htmlFor="chat" className="sr-only">
            Your message
          </label>
          <Input id="chat" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type your question…" className="min-h-14 rounded-2xl text-base" />
          <Button type="submit" size="icon" aria-label="Send message" className="size-14 shrink-0 rounded-2xl">
            <Send className="size-5" aria-hidden />
          </Button>
        </form>
      </SoftCard>
    </AppShell>
  );
}
