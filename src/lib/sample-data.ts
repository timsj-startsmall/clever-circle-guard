/**
 * Realistic sample data used across the SafeCircle prototype so every screen
 * demonstrates well. Replace with live data when the relevant services land.
 */

import type { Risk } from "./safecircle-ai";

export type ActivityItem = {
  id: string;
  kind: "message" | "website" | "call" | "payment" | "family";
  title: string;
  detail: string;
  risk: Risk;
  when: string;
};

export const recentActivity: ActivityItem[] = [
  { id: "a1", kind: "message", title: "Text about a missed parcel", detail: "Asked for a £1.45 redelivery fee", risk: "high", when: "Today, 9:12am" },
  { id: "a2", kind: "call", title: "Caller said they were from the bank", detail: "Wanted to move money to a new account", risk: "high", when: "Yesterday, 4:40pm" },
  { id: "a3", kind: "website", title: "hmrc-refund-claim.xyz", detail: "Site set up 11 days ago", risk: "high", when: "Yesterday, 1:05pm" },
  { id: "a4", kind: "payment", title: "Payment to a builder", detail: "You checked before paying — well done", risk: "low", when: "Mon, 11:20am" },
  { id: "a5", kind: "family", title: "Sarah reviewed a message for you", detail: "She agreed it looked suspicious", risk: "medium", when: "Sun, 6:32pm" },
  { id: "a6", kind: "message", title: "WhatsApp from an unknown number", detail: "Claimed to be your daughter with a new phone", risk: "medium", when: "Sat, 8:15pm" },
];

export const dailyTips: string[] = [
  "Your bank will never ask you to move money to a 'safe account'. If you hear that phrase, it's a scam.",
  "Agree a family password with your loved ones. If a call feels odd, ask for it.",
  "A one-time code is like a key to your account. Nobody genuine will ever ask you for it.",
  "If a message rushes you, that's the moment to slow down. Genuine organisations can wait.",
  "Hang up, wait five minutes, then ring back on the number printed on your card.",
];

export type ShieldInsight = { text: string; tone: "positive" | "neutral" | "action" };

export const shieldScore = {
  score: 92,
  change: 8,
  headline: "You're staying safe online",
  insights: [
    { text: "You've received 12 suspicious delivery text messages this month.", tone: "neutral" },
    { text: "3 callers have claimed to be from your bank.", tone: "neutral" },
    { text: "You haven't verified your trusted contacts recently.", tone: "action" },
    { text: "You've successfully avoided 5 potential scams this month.", tone: "positive" },
    { text: "Your score has improved by 8 points since last week.", tone: "positive" },
  ] as ShieldInsight[],
  recommendations: [
    { title: "Verify your trusted contacts", detail: "A quick check that Sarah and Tom's numbers are up to date.", to: "/app/settings" },
    { title: "Read the latest AI voice scam guidance", detail: "Two minutes on how to spot a copied voice.", to: "/app/learn" },
    { title: "Turn on extra protection", detail: "Get a nudge whenever a new number messages you.", to: "/app/settings" },
    { title: "Keep checking payment requests", detail: "You've done this 5 times this month — it's working.", to: "/app/payment" },
  ],
};

export const scoreHistory = [
  { week: "9 wks", score: 71 },
  { week: "8 wks", score: 74 },
  { week: "7 wks", score: 73 },
  { week: "6 wks", score: 78 },
  { week: "5 wks", score: 80 },
  { week: "4 wks", score: 79 },
  { week: "3 wks", score: 83 },
  { week: "2 wks", score: 84 },
  { week: "Last wk", score: 84 },
  { week: "Now", score: 92 },
];

export const blockedPerWeek = [
  { week: "W1", blocked: 3 },
  { week: "W2", blocked: 5 },
  { week: "W3", blocked: 2 },
  { week: "W4", blocked: 6 },
  { week: "W5", blocked: 4 },
  { week: "W6", blocked: 5 },
];

export const categoryBreakdown = [
  { name: "Delivery", value: 12 },
  { name: "Banking", value: 8 },
  { name: "HMRC", value: 5 },
  { name: "Family impersonation", value: 4 },
  { name: "Shopping", value: 3 },
];

export const riskTrend = [
  { month: "Mar", high: 6, medium: 9, low: 14 },
  { month: "Apr", high: 5, medium: 11, low: 16 },
  { month: "May", high: 4, medium: 8, low: 19 },
  { month: "Jun", high: 3, medium: 7, low: 22 },
  { month: "Jul", high: 2, medium: 6, low: 25 },
  { month: "Aug", high: 2, medium: 4, low: 27 },
];

export const monthlySummary = [
  { label: "Checks completed", value: "33" },
  { label: "Scams avoided", value: "5" },
  { label: "Money protected", value: "£1,240" },
  { label: "Family responses", value: "9" },
];

export type EducationArticle = {
  slug: string;
  title: string;
  minutes: number;
  summary: string;
  body: string[];
  video: string;
};

export const educationArticles: EducationArticle[] = [
  {
    slug: "banking-scams",
    title: "Banking scams",
    minutes: 3,
    summary: "Why 'your account is at risk' calls are almost always fake.",
    body: [
      "A banking scam usually starts with a call, text or email saying there's a problem with your account. The person sounds professional and often knows a little about you, which makes it feel real.",
      "The giveaway is what they ask for next: moving money to a 'safe account', reading out a code, or letting them onto your computer. No bank does any of these things, ever.",
      "If it happens, hang up, wait five minutes so the line clears, then ring the number printed on your bank card. Your bank will not mind you checking.",
    ],
    video: "Spotting a fake bank call (2:14)",
  },
  {
    slug: "romance-scams",
    title: "Romance scams",
    minutes: 4,
    summary: "When someone lovely you've never met starts asking for money.",
    body: [
      "Romance scams build slowly. Someone warm and attentive gets in touch online, chats every day, and becomes an important part of your week.",
      "Then comes a problem: a stuck payment, medical bills, a flight home. The request for money always arrives after the affection does, and there's always a reason you can't meet.",
      "Talk to a friend or family member before sending anything. Feeling embarrassed is normal — but the person to be embarrassed about is the one doing this, not you.",
    ],
    video: "How romance scams unfold (3:02)",
  },
  {
    slug: "delivery-scams",
    title: "Delivery scams",
    minutes: 2,
    summary: "The missed parcel text that costs far more than £1.45.",
    body: [
      "You get a text saying a parcel couldn't be delivered and a small fee is owed. The link goes to a convincing copy of a delivery company's website.",
      "The fee isn't the point — your card details are. Once entered, they're used for much larger payments or a follow-up call pretending to be your bank.",
      "Check any delivery through the retailer's own app or website. Delivery firms don't chase small fees by text link.",
    ],
    video: "Inside a fake delivery text (1:48)",
  },
  {
    slug: "investment-scams",
    title: "Investment scams",
    minutes: 4,
    summary: "Guaranteed returns are the oldest warning sign there is.",
    body: [
      "Investment scams promise high, guaranteed returns with little risk, often in cryptocurrency or 'green energy bonds'.",
      "They may show you a professional website and a portfolio that grows nicely — until you try to withdraw, when fees and delays appear.",
      "Check the firm on the FCA register yourself, and never rush. A genuine opportunity will still be there next week.",
    ],
    video: "Why 'guaranteed' means trouble (2:35)",
  },
  {
    slug: "phone-scams",
    title: "Phone scams",
    minutes: 3,
    summary: "Numbers can be faked, so caller display proves nothing.",
    body: [
      "Scammers can make any number appear on your phone, including your bank's real number. Seeing a familiar number is not proof of who is calling.",
      "The safest habit is simple: never act on an incoming call. Hang up and dial back on a number you already have.",
      "If someone stays on the line pressuring you, that pressure is itself the warning sign.",
    ],
    video: "Number spoofing explained (2:05)",
  },
  {
    slug: "qr-code-scams",
    title: "QR code scams",
    minutes: 2,
    summary: "Stickers over real codes in car parks and cafés.",
    body: [
      "Criminals print their own QR codes and stick them over genuine ones on parking machines, menus and posters.",
      "Scanning takes you to a copycat payment page that captures your card details.",
      "Check for a sticker edge, and prefer the official app or the number on the machine when paying.",
    ],
    video: "Checking a QR code (1:30)",
  },
  {
    slug: "whatsapp-scams",
    title: "WhatsApp scams",
    minutes: 3,
    summary: "'Hi Mum, this is my new number' — and then a favour.",
    body: [
      "The message comes from an unknown number, says a phone was lost or broken, and asks you to save the new one.",
      "Within a day or two there's an urgent bill that can't wait, and a request to transfer money.",
      "Ring the person on their old number before doing anything. If they don't answer, ring another family member.",
    ],
    video: "The 'Hi Mum' scam (2:20)",
  },
  {
    slug: "ai-voice-scams",
    title: "AI voice scams",
    minutes: 4,
    summary: "A familiar voice is no longer proof of who's calling.",
    body: [
      "A few seconds of someone's voice from social media is enough to create a convincing copy that can say anything.",
      "These calls are short, distressed and urgent — designed to stop you thinking. Often the 'family member' hands over to a 'police officer' or 'solicitor'.",
      "Agree a family password now, while everything is calm. If a call is real, they'll know it. If it isn't, the call ends there.",
    ],
    video: "Hearing a cloned voice (3:11)",
  },
];

export type FamilyMember = {
  id: string;
  name: string;
  relationship: string;
  score: number;
  change: number;
  lastActive: string;
  alerts: number;
  summary: string;
};

export const protectedRelatives: FamilyMember[] = [
  { id: "margaret", name: "Margaret", relationship: "Mum", score: 92, change: 8, lastActive: "12 minutes ago", alerts: 1, summary: "Checked 6 messages this week and avoided 2 likely scams." },
  { id: "arthur", name: "Arthur", relationship: "Dad", score: 74, change: -3, lastActive: "2 days ago", alerts: 2, summary: "Two high-risk calls this week. Hasn't opened the AI voice guidance yet." },
  { id: "joan", name: "Joan", relationship: "Aunt", score: 88, change: 2, lastActive: "Yesterday", alerts: 0, summary: "Steady week. Verified her trusted contacts on Tuesday." },
];

export type FamilyAlert = {
  id: string;
  person: string;
  title: string;
  detail: string;
  risk: Risk;
  when: string;
  needsResponse: boolean;
};

export const familyAlerts: FamilyAlert[] = [
  { id: "f1", person: "Margaret", title: "Margaret has asked for help reviewing a suspicious message", detail: "A text claiming a parcel fee is owed to Royal Mail.", risk: "high", when: "12 minutes ago", needsResponse: true },
  { id: "f2", person: "Arthur", title: "High-risk payment detected", detail: "Arthur started a £900 transfer after an unexpected call.", risk: "high", when: "1 hour ago", needsResponse: true },
  { id: "f3", person: "Margaret", title: "Suspicious website checked", detail: "hmrc-refund-claim.xyz — created 11 days ago.", risk: "medium", when: "Yesterday", needsResponse: false },
  { id: "f4", person: "Joan", title: "Weekly summary ready", detail: "Joan completed 4 checks and avoided 1 scam.", risk: "low", when: "Yesterday", needsResponse: false },
];

export const notifications = [
  { id: "n1", title: "Margaret has asked for help reviewing a suspicious message", when: "12 minutes ago", risk: "high" as Risk },
  { id: "n2", title: "High-risk payment detected", when: "1 hour ago", risk: "high" as Risk },
  { id: "n3", title: "Suspicious website checked", when: "Yesterday", risk: "medium" as Risk },
  { id: "n4", title: "Your Scam Shield Score went up by 8 points", when: "2 days ago", risk: "low" as Risk },
];

export const sampleContacts = [
  { id: "c1", name: "Sarah Whitfield", relationship: "Daughter", phone: "07700 900412", isPrimary: true },
  { id: "c2", name: "Tom Whitfield", relationship: "Son", phone: "07700 900188", isPrimary: false },
  { id: "c3", name: "Nationwide Fraud Line", relationship: "Bank", phone: "0800 055 6611", isPrimary: false },
];

/* ---------- Enterprise / bank analytics sample data (anonymised) ---------- */

export const enterpriseKpis = [
  { label: "Scam attempts detected", value: "184,320", change: "+12.4%", positive: true },
  { label: "Customer money protected", value: "£41.7m", change: "+£3.2m", positive: true },
  { label: "Average Shield Score", value: "86.4", change: "+4.1", positive: true },
  { label: "High-risk customers", value: "3,942", change: "-8.7%", positive: true },
  { label: "AI detection accuracy", value: "94.6%", change: "+1.2pts", positive: true },
  { label: "Avg response to alerts", value: "3m 12s", change: "-41s", positive: true },
  { label: "Trusted contact engagement", value: "71%", change: "+6pts", positive: true },
  { label: "90-day retention", value: "88.3%", change: "+2.4pts", positive: true },
];

export const enterpriseMoneySaved = [
  { month: "Feb", saved: 3.1, prevented: 240 },
  { month: "Mar", saved: 4.4, prevented: 320 },
  { month: "Apr", saved: 5.2, prevented: 361 },
  { month: "May", saved: 6.8, prevented: 402 },
  { month: "Jun", saved: 7.4, prevented: 455 },
  { month: "Jul", saved: 8.1, prevented: 498 },
  { month: "Aug", saved: 9.3, prevented: 531 },
];

export const enterpriseByCategory = [
  { name: "Bank impersonation", value: 42600 },
  { name: "Delivery", value: 38100 },
  { name: "Purchase", value: 27400 },
  { name: "Investment", value: 24800 },
  { name: "Romance", value: 18300 },
  { name: "AI voice", value: 16900 },
  { name: "HMRC", value: 16220 },
];

export const enterpriseFraudTrend = [
  { month: "Feb", detected: 19200, escalated: 2100, confirmed: 1480 },
  { month: "Mar", detected: 21400, escalated: 2380, confirmed: 1610 },
  { month: "Apr", detected: 23900, escalated: 2510, confirmed: 1555 },
  { month: "May", detected: 26100, escalated: 2680, confirmed: 1490 },
  { month: "Jun", detected: 28400, escalated: 2740, confirmed: 1402 },
  { month: "Jul", detected: 31200, escalated: 2810, confirmed: 1335 },
  { month: "Aug", detected: 34120, escalated: 2905, confirmed: 1288 },
];

export const enterpriseRegions = [
  { region: "London", attempts: 41200, protected: 9.8, risk: 72 },
  { region: "South East", attempts: 32800, protected: 7.6, risk: 64 },
  { region: "North West", attempts: 26400, protected: 5.9, risk: 61 },
  { region: "Midlands", attempts: 24100, protected: 5.2, risk: 58 },
  { region: "Scotland", attempts: 18700, protected: 4.1, risk: 49 },
  { region: "Wales", attempts: 12900, protected: 2.8, risk: 44 },
  { region: "Yorkshire", attempts: 16300, protected: 3.6, risk: 52 },
  { region: "South West", attempts: 11900, protected: 2.7, risk: 38 },
];

export const enterpriseEngagement = [
  { month: "Feb", active: 42, checks: 61 },
  { month: "Mar", active: 48, checks: 69 },
  { month: "Apr", active: 53, checks: 76 },
  { month: "May", active: 58, checks: 84 },
  { month: "Jun", active: 63, checks: 91 },
  { month: "Jul", active: 68, checks: 97 },
  { month: "Aug", active: 72, checks: 104 },
];

export const enterpriseSuccess = [
  { stage: "Detected", rate: 100 },
  { stage: "Customer warned", rate: 96 },
  { stage: "Payment paused", rate: 81 },
  { stage: "Family notified", rate: 64 },
  { stage: "Loss prevented", rate: 89 },
];

export const testimonials = [
  { quote: "I nearly paid a parcel fee that wasn't real. SafeCircle told me why it looked wrong in words I actually understood.", name: "Margaret, 74", place: "Sheffield" },
  { quote: "Dad rings me less worried now. I can see he's checked something and reassure him in seconds.", name: "Sarah", place: "Daughter, Leeds" },
  { quote: "It doesn't treat you like you're daft. It just explains things and lets you decide.", name: "Arthur, 81", place: "Cardiff" },
];

export const faqs = [
  { q: "Does SafeCircle tell me if something is definitely safe?", a: "No — and we think that's important. Nobody can promise that. SafeCircle explains what looks unusual, what looks normal, and what we'd do next, so you stay in control of the decision." },
  { q: "Do my family see everything I do?", a: "Only what you choose to share. Trusted contacts see the checks you send them and any alerts you turn on. Your messages stay yours." },
  { q: "Do I need to be good with technology?", a: "Not at all. Big buttons, plain English and no jargon. If you can take a photo or paste a message, you can use SafeCircle." },
  { q: "What does it cost?", a: "The core checks are free forever. Premium Family adds alerts, family dashboards and unlimited history for £7.99 a month for the whole family." },
  { q: "What happens if I've already sent money?", a: "SafeCircle shows you exactly who to ring first, in order, and can notify your trusted contact at the same time. Acting quickly gives the best chance of recovery." },
];

export const pricing = [
  {
    name: "Free",
    price: "£0",
    period: "forever",
    tagline: "Everything you need for a second opinion.",
    features: ["Check messages, websites and calls", "Payment safety check", "Plain-English explanations", "Scam education centre", "One trusted contact"],
    cta: "Get started free",
    featured: false,
  },
  {
    name: "Premium Family",
    price: "£7.99",
    period: "per month, whole family",
    tagline: "Protection you share with the people you love.",
    features: ["Everything in Free", "Scam Shield Score & trends", "Family dashboard and alerts", "Unlimited trusted contacts", "Priority AI checks and history", "Reassurance messages and calls"],
    cta: "Start 30 days free",
    featured: true,
  },
];
