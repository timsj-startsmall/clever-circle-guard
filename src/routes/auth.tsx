import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, HeartHandshake, UserRound, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in to SafeCircle" },
      { name: "description", content: "Create your SafeCircle account to protect yourself, or to help a family member stay safe from scams." },
      { property: "og:title", content: "Sign in to SafeCircle" },
      { property: "og:description", content: "Protect yourself, or help a family member stay safe from scams." },
    ],
  }),
  component: AuthPage,
});

type Role = "protected" | "family";

function AuthPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("protected");
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: role === "family" ? "/app/family" : "/app/dashboard" });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const afterAuth = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      await supabase.from("profiles").update({ role, display_name: name || undefined }).eq("id", data.user.id);
    }
    navigate({ to: role === "family" ? "/app/family" : "/app/dashboard" });
  };

  const handleEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin, data: { display_name: name } },
        });
        if (error) throw error;
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          toast.success("Almost there — please check your email to confirm your account.");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      await afterAuth();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleSocial = async (provider: "google" | "apple") => {
    setBusy(true);
    try {
      window.localStorage.setItem("safecircle:role", role);
      const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin });
      if (result.error) {
        toast.error("We couldn't sign you in just then. Please try again.");
        return;
      }
      if (result.redirected) return;
      await afterAuth();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto w-full max-w-md">
        <Link to="/" className="mx-auto flex w-fit items-center gap-2.5">
          <span className="grid size-11 place-items-center rounded-2xl bg-primary text-primary-foreground" aria-hidden>
            <ShieldCheck className="size-6" />
          </span>
          <span className="font-display text-2xl font-extrabold text-foreground">SafeCircle</span>
        </Link>

        <h1 className="mt-8 text-center font-display text-3xl font-extrabold text-foreground">
          {mode === "signup" ? "Let's get you set up" : "Welcome back"}
        </h1>
        <p className="mt-2 text-center text-muted-foreground">It only takes a minute. No jargon, promise.</p>

        <fieldset className="mt-7">
          <legend className="mb-3 font-display text-lg font-bold text-foreground">Which sounds like you?</legend>
          <div className="grid gap-3">
            <RoleOption
              selected={role === "protected"}
              onSelect={() => setRole("protected")}
              icon={<UserRound className="size-6" aria-hidden />}
              title="I want to protect myself"
              description="Check messages, calls and payments whenever something feels off."
            />
            <RoleOption
              selected={role === "family"}
              onSelect={() => setRole("family")}
              icon={<HeartHandshake className="size-6" aria-hidden />}
              title="I want to help a family member"
              description="See alerts, respond to requests and offer reassurance."
            />
          </div>
        </fieldset>

        <div className="mt-6 grid gap-3">
          <Button type="button" variant="outline" className="min-h-14 rounded-2xl text-base font-bold" onClick={() => handleSocial("google")} disabled={busy}>
            Continue with Google
          </Button>
          <Button type="button" variant="outline" className="min-h-14 rounded-2xl text-base font-bold" onClick={() => handleSocial("apple")} disabled={busy}>
            Continue with Apple
          </Button>
        </div>

        <div className="my-6 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or use your email
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleEmail} className="grid gap-4">
          {mode === "signup" ? (
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-base">Your first name</Label>
              <Input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Margaret" className="min-h-14 rounded-2xl text-base" />
            </div>
          ) : null}
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-base">Email address</Label>
            <Input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="min-h-14 rounded-2xl text-base" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-base">Password</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} className="min-h-14 rounded-2xl text-base" />
          </div>
          <Button type="submit" disabled={busy} className="min-h-14 rounded-2xl text-base font-bold">
            {busy ? <Loader2 className="size-5 animate-spin" aria-hidden /> : mode === "signup" ? "Create my account" : "Sign in"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          {mode === "signup" ? "Already with us?" : "New to SafeCircle?"}{" "}
          <button type="button" className="font-bold text-primary underline-offset-4 hover:underline" onClick={() => setMode(mode === "signup" ? "signin" : "signup")}>
            {mode === "signup" ? "Sign in instead" : "Create an account"}
          </button>
        </p>
      </div>
    </div>
  );
}

function RoleOption({
  selected,
  onSelect,
  icon,
  title,
  description,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex min-h-[84px] items-center gap-4 rounded-3xl border-2 p-4 text-left transition-all ${
        selected ? "border-primary bg-primary-soft shadow-soft" : "border-border bg-card hover:border-primary/40"
      }`}
    >
      <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${selected ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-lg font-bold text-foreground">{title}</span>
        <span className="block text-sm text-muted-foreground">{description}</span>
      </span>
    </button>
  );
}
