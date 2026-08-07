# SafeCircle — AI Scam Prevention Companion

A calm, mobile-first prototype: soft blues/greens, white space, rounded cards, large touch targets, WCAG AA contrast. No fear-based language; risk is always explained in plain English with next steps, never "this is safe".

## Phase 1 — Foundation & Marketing
- Design system in `src/styles.css`: soft blue/green/white token palette, generous radii, soft shadows, friendly rounded typography, light + dark themes.
- Reusable components: RiskBadge (green/amber/red), BigActionTile, RoundedCard, ScoreRing, SectionHeader, StepWizard, ChatBubble.
- Landing page at `/`: hero ("Stay Independent. Stay Protected."), Get Started / See How It Works, 6 feature cards, testimonials, FAQ accordion, pricing (Free vs Premium Family), footer. Generated friendly illustrations.

## Phase 2 — Accounts
- Lovable Cloud enabled for auth + database.
- `/auth`: email sign-in plus Google and Apple sign-in.
- Onboarding role choice: "I want to protect myself" vs "I want to help a family member" — stored on a profile record and used to route to the right dashboard.
- Protected routes live under an authenticated layout.

## Phase 3 — Older-adult experience
- Dashboard: time-aware greeting, five large tiles (Check a Message, Check a Website, Phone Call, Someone Asked Me For Money, Ask Someone I Trust), recent activity timeline, tip of the day, persistent "I'm Unsure" emergency button.
- Message Scanner: paste text, upload or drag-and-drop screenshot; analysis screen with risk indicator, highlighted phrases (urgency, payment requests, unusual links, impersonation, emotional pressure), suggested actions, Notify Trusted Contact.
- Website Checker: URL input; domain age, HTTPS, reputation, brand-similarity, indicators, risk meter.
- Phone Call Checker: conversational interface with follow-up questions, then likelihood + explanation + next steps.
- Payment Safety Check: 5-question wizard, risk score, large "Please pause before making this payment" card, Call Trusted Contact / Call Your Bank / Learn More.
- AI Chat Assistant: plain-English companion chat.
- Scam Education Centre: 8 category cards with short articles and video placeholders.
- Settings: trusted contacts, notification preferences, accessibility (large text, high contrast, voice mode, read aloud, dark mode) applied app-wide.

## Phase 4 — Scam Shield Score & trends
- Score out of 100 with reassuring headline, monthly insight list, positive-reinforcement recommendations.
- Interactive charts: score over time, attempts blocked per week, common categories, risk trends, monthly protection summary.

## Phase 5 — Family & Enterprise dashboards
- Family: per-relative Shield Score, recent checks, alerts, help requests, weekly summaries, improvement suggestions, reassurance message / call / acknowledge actions, notification feed.
- Enterprise/Bank analytics: KPI grid, charts (scam types, money saved, fraud trends, regional heatmap, engagement, success rates), filters for period / scam type / segment / region / risk level. Anonymised sample data, executive-presentation polish.

## Technical notes
- TanStack Start + TypeScript + Tailwind v4 + shadcn; Recharts for charts.
- Lovable Cloud: profiles, trusted_contacts, checks, alerts, shield_score_history, education content. RLS scoped to the user and their linked family members.
- AI analysis is deterministic mock logic behind a single service module (`analyzeMessage`, `checkUrl`, `assessCall`, `assessPayment`, `chat`) so real OpenAI / URL reputation / scam-intel / bank-fraud providers can drop in later. Enterprise data is static sample data.
- Realistic seeded sample data (Margaret's history, family alerts, enterprise metrics) so every screen demos well.
