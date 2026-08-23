import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  MessageSquareText,
  Globe,
  PhoneCall,
  Banknote,
  Users,
  BellRing,
  Check,
  Quote,
  ArrowRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs, pricing, testimonials } from "@/lib/sample-data";
import heroImage from "@/assets/hero-safecircle.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SafeCircle — Stay Independent. Stay Protected." },
      {
        name: "description",
        content:
          "AI-powered scam detection for you and your family. Check messages, websites, calls and payment requests in plain English, with trusted family support.",
      },
      { property: "og:title", content: "SafeCircle — Stay Independent. Stay Protected." },
      {
        property: "og:description",
        content: "A calm second opinion whenever something feels off. AI scam protection for older adults and their families.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: MessageSquareText, title: "Check suspicious messages", body: "Paste a text or upload a screenshot and we'll explain what looks wrong — and what to do." },
  { icon: Globe, title: "Verify websites", body: "See how old a site is, whether it copies a real brand, and whether people have reported it." },
  { icon: PhoneCall, title: "Analyse scam phone calls", body: "Tell us what was said. We ask a few gentle questions and give you a clear answer." },
  { icon: Banknote, title: "Ask AI before sending money", body: "Five simple questions before any payment, with a clear recommendation to pause or proceed." },
  { icon: Users, title: "Family support", body: "Ask someone you trust to take a look, in one tap. They see only what you share." },
  { icon: BellRing, title: "Scam alerts", body: "Friendly heads-ups about the scams doing the rounds where you live." },
];

const steps = [
  { number: "1", title: "Something arrives", body: "A text, a call, an email or a request for money that doesn't feel quite right." },
  { number: "2", title: "Ask SafeCircle", body: "Paste it, photograph it, or just describe it. No jargon, no forms, no rush." },
  { number: "3", title: "Get a clear answer", body: "Plain English on what stands out, what it means, and exactly what to do next." },
  { number: "4", title: "Bring in family", body: "Share the check with a trusted contact who can reassure you in a moment." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground" aria-hidden>
              <ShieldCheck className="size-6" />
            </span>
            <span className="truncate font-display text-xl font-extrabold text-foreground">SafeCircle</span>
          </div>
          <nav className="flex shrink-0 items-center gap-2">
            <Link
              to="/enterprise"
              className="hidden min-h-11 items-center rounded-2xl px-4 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:inline-flex"
            >
              For organisations
            </Link>
            <Link
              to="/check"
              className="inline-flex min-h-11 items-center rounded-2xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-accent">
              <ShieldCheck className="size-4" aria-hidden /> A second opinion, whenever you need one
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Stay Independent.
              <br />
              Stay Protected.
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              AI-powered scam detection for you and your family. Check anything that feels off — and get a calm, plain-English
              answer in seconds.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/auth"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-3xl bg-primary px-8 text-lg font-bold text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5"
              >
                Get Started <ArrowRight className="size-5" aria-hidden />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex min-h-14 items-center justify-center rounded-3xl border border-border bg-card px-8 text-lg font-bold text-foreground shadow-soft transition-transform hover:-translate-y-0.5"
              >
                See How It Works
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Free forever for the core checks. No card needed. We never claim something is definitely safe — we explain the risk.
            </p>
          </div>
          <img
            src={heroImage}
            alt="An older woman checking a message on her phone while a family member waves from a video call"
            width={1200}
            height={1008}
            className="w-full rounded-[2.5rem] shadow-lift"
          />
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">Six ways SafeCircle helps</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Everything explained the way a patient friend would explain it.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1">
                <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary" aria-hidden>
                  <feature.icon className="size-6" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-20 bg-primary-soft/60 py-14">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">How it works</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <article key={step.number} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft font-display text-lg font-extrabold text-accent">
                    {step.number}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">People feel calmer with SafeCircle</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <Quote className="size-7 text-primary" aria-hidden />
                <blockquote className="mt-3 text-lg text-foreground">{item.quote}</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-muted-foreground">
                  {item.name} · {item.place}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-20 bg-secondary/60 py-14">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">Simple pricing</h2>
            <p className="mt-2 text-muted-foreground">One plan covers the whole family. Cancel any time.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {pricing.map((plan) => (
                <article
                  key={plan.name}
                  className={`rounded-3xl border p-6 shadow-soft ${plan.featured ? "border-primary bg-card ring-2 ring-primary/25" : "border-border bg-card"}`}
                >
                  {plan.featured ? (
                    <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                      Most chosen
                    </span>
                  ) : null}
                  <h3 className="mt-3 font-display text-2xl font-extrabold text-foreground">{plan.name}</h3>
                  <p className="mt-1 text-muted-foreground">{plan.tagline}</p>
                  <p className="mt-4">
                    <span className="font-display text-4xl font-extrabold text-foreground">{plan.price}</span>{" "}
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-foreground">
                        <Check className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/auth"
                    className={`mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-6 font-bold transition-transform hover:-translate-y-0.5 ${
                      plan.featured ? "bg-primary text-primary-foreground" : "border border-border bg-background text-foreground"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">Questions people ask</h2>
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger className="text-left text-lg font-semibold">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground" aria-hidden>
                <ShieldCheck className="size-6" />
              </span>
              <span className="font-display text-xl font-extrabold text-foreground">SafeCircle</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              A calm companion for staying independent and protected online.
            </p>
          </div>
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">Product</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#how-it-works" className="text-foreground hover:text-primary">How it works</a></li>
              <li><a href="#pricing" className="text-foreground hover:text-primary">Pricing</a></li>
              <li><Link to="/enterprise" className="text-foreground hover:text-primary">For banks & insurers</Link></li>
              <li><Link to="/auth" className="text-foreground hover:text-primary">Sign in</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">If you're worried now</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Ring your bank on the number on your card</li>
              <li>Report a scam to Action Fraud on 0300 123 2040</li>
              <li>Forward suspicious texts to 7726, free of charge</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} SafeCircle. Prototype with sample data. SafeCircle explains risk — it never guarantees safety.
        </div>
      </footer>
    </div>
  );
}
