/**
 * SafeCircle analysis service.
 *
 * All analysis here is deterministic mock logic for the prototype. Each export
 * is a placeholder API boundary so a real provider can be dropped in later:
 *   analyzeMessage -> LLM (OpenAI) + scam intelligence feeds
 *   checkWebsite   -> URL reputation / domain WHOIS services
 *   assessCall     -> LLM conversational triage
 *   assessPayment  -> bank fraud / APP scam scoring systems
 *   askAssistant   -> LLM chat
 *
 * SafeCircle never declares something definitively safe. The lowest outcome is
 * "no clear warning signs" together with sensible next steps.
 */

export type Risk = "low" | "medium" | "high";

export type Signal = {
  label: string;
  phrase: string;
  explanation: string;
};

export type MessageAnalysis = {
  risk: Risk;
  headline: string;
  plainEnglish: string;
  signals: Signal[];
  actions: string[];
};

const SIGNAL_RULES: Array<{
  label: string;
  explanation: string;
  patterns: RegExp[];
  weight: number;
}> = [
  {
    label: "Urgency",
    explanation: "Real organisations give you time. Pressure to act immediately is a common scam tactic.",
    patterns: [/urgent/i, /immediately/i, /within \d+ ?(hours|hrs|minutes)/i, /final (notice|warning)/i, /expires? today/i, /act now/i],
    weight: 25,
  },
  {
    label: "Payment request",
    explanation: "You're being asked to pay or share card details after an unexpected message.",
    patterns: [/pay(ment)?/i, /£\s?\d/, /fee/i, /invoice/i, /card details/i, /bank details/i, /transfer/i, /refund/i],
    weight: 25,
  },
  {
    label: "Unusual link",
    explanation: "The web address doesn't match the organisation it claims to be from.",
    patterns: [/https?:\/\/[^\s]+/i, /bit\.ly/i, /tinyurl/i, /\.(xyz|top|click|info|shop)\b/i, /click here/i],
    weight: 20,
  },
  {
    label: "Impersonation",
    explanation: "The sender claims to be a bank, delivery firm or government body you didn't contact.",
    patterns: [/hmrc/i, /royal ?mail/i, /dpd/i, /evri/i, /hermes/i, /dvla/i, /your bank/i, /fraud team/i, /nationwide|barclays|lloyds|halifax|natwest|santander|monzo/i, /amazon|netflix|paypal|apple support/i],
    weight: 20,
  },
  {
    label: "Emotional pressure",
    explanation: "Messages that create worry, guilt or secrecy are designed to stop you checking.",
    patterns: [/mum|mom|dad|it'?s me/i, /don'?t tell/i, /keep this (between|secret)/i, /i('| a)m in trouble/i, /help me/i, /lost my phone/i, /new number/i, /love/i],
    weight: 20,
  },
  {
    label: "Unusual verification request",
    explanation: "You're asked for a code, password or to install software — genuine staff never do this.",
    patterns: [/one[- ]time (code|passcode)/i, /otp/i, /verification code/i, /password/i, /pin\b/i, /anydesk|teamviewer|remote access/i, /install/i],
    weight: 25,
  },
];

function riskFromScore(score: number): Risk {
  if (score >= 55) return "high";
  if (score >= 25) return "medium";
  return "low";
}

function findPhrase(text: string, patterns: RegExp[]): string | null {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[0];
  }
  return null;
}

export function analyzeMessage(text: string): MessageAnalysis {
  const signals: Signal[] = [];
  let score = 0;

  for (const rule of SIGNAL_RULES) {
    const phrase = findPhrase(text, rule.patterns);
    if (phrase) {
      score += rule.weight;
      signals.push({ label: rule.label, phrase, explanation: rule.explanation });
    }
  }

  const risk = riskFromScore(score);

  const headline =
    risk === "high"
      ? "This message has several signs of a scam"
      : risk === "medium"
        ? "A few things here are worth double checking"
        : "No clear warning signs — but stay careful";

  const plainEnglish =
    risk === "high"
      ? "Messages like this are often sent by criminals pretending to be someone you trust. Please don't reply, tap any links, or send money. There's no rush — take your time."
      : risk === "medium"
        ? "There isn't enough here to be sure. A couple of details are the kind of thing scammers use, so it's worth checking with the organisation directly before you do anything."
        : "We couldn't spot the usual warning signs, though that doesn't guarantee it's genuine. If it asks you to pay, share details or act quickly, check independently first.";

  const actions =
    risk === "low"
      ? ["Reply only if you were expecting this message", "Find the company's number yourself if you need to check", "Ask someone you trust if anything feels off"]
      : [
          "Don't reply to the message",
          "Verify independently using a number you already have",
          risk === "high" ? "Call your bank on the number on your card" : "Check the sender's details carefully",
          "Let a trusted contact know",
        ];

  return { risk, headline, plainEnglish, signals, actions };
}

export type WebsiteAnalysis = {
  risk: Risk;
  domain: string;
  headline: string;
  plainEnglish: string;
  score: number;
  facts: Array<{ label: string; value: string; tone: Risk }>;
  indicators: string[];
};

const KNOWN_BRANDS = ["hmrc", "royalmail", "amazon", "paypal", "barclays", "lloyds", "natwest", "santander", "monzo", "apple", "netflix", "dvla"];

export function checkWebsite(rawUrl: string): WebsiteAnalysis {
  const cleaned = rawUrl.trim().replace(/^https?:\/\//i, "");
  const domain = cleaned.split("/")[0]?.toLowerCase() ?? cleaned.toLowerCase();
  const isHttps = /^https:\/\//i.test(rawUrl.trim());
  const suspiciousTld = /\.(xyz|top|click|info|shop|live|online|buzz)$/i.test(domain);
  const hyphenHeavy = (domain.match(/-/g)?.length ?? 0) >= 2;
  const lookalike = KNOWN_BRANDS.find((brand) => domain.includes(brand) && !domain.endsWith(`${brand}.co.uk`) && !domain.endsWith(`${brand}.com`));
  const numeric = /\d{3,}/.test(domain);

  // Deterministic pseudo domain age so the demo stays stable per URL.
  const seed = [...domain].reduce((total, char) => total + char.charCodeAt(0), 0);
  const ageDays = lookalike || suspiciousTld ? (seed % 40) + 3 : (seed % 3000) + 400;

  let score = 0;
  if (!isHttps) score += 20;
  if (suspiciousTld) score += 20;
  if (hyphenHeavy) score += 15;
  if (lookalike) score += 35;
  if (numeric) score += 10;
  if (ageDays < 90) score += 25;

  const risk = riskFromScore(score);
  const indicators: string[] = [];
  if (!isHttps) indicators.push("The address doesn't use a secure connection");
  if (lookalike) indicators.push(`The name looks similar to ${lookalike.toUpperCase()}, but isn't their official address`);
  if (suspiciousTld) indicators.push("The ending of the web address is unusual for a UK organisation");
  if (hyphenHeavy) indicators.push("Lots of dashes in the name — often used to copy a real brand");
  if (numeric) indicators.push("Unusual run of numbers in the address");
  if (ageDays < 90) indicators.push("The site was set up very recently");
  if (indicators.length === 0) indicators.push("Nothing unusual stood out in the address itself");

  return {
    risk,
    domain,
    score: Math.min(score, 100),
    headline:
      risk === "high"
        ? "This website looks unsafe to use"
        : risk === "medium"
          ? "A few things about this website need checking"
          : "No clear warning signs on this website",
    plainEnglish:
      risk === "high"
        ? "We'd suggest closing this page and not entering any details. If you were sent here by a message, treat that message as suspicious too."
        : risk === "medium"
          ? "This might be genuine, but we can't be sure. Try reaching the organisation by typing their address in yourself or using their app."
          : "We didn't find the usual warning signs. Still avoid entering bank details unless you went to the site yourself.",
    facts: [
      { label: "Secure connection (HTTPS)", value: isHttps ? "Yes" : "No", tone: isHttps ? "low" : "high" },
      {
        label: "Website age",
        value: ageDays < 90 ? `About ${ageDays} days old` : `About ${Math.round(ageDays / 365)} years old`,
        tone: ageDays < 90 ? "high" : ageDays < 400 ? "medium" : "low",
      },
      { label: "Reputation reports", value: risk === "high" ? "Reported by other people" : risk === "medium" ? "Very little history" : "No reports found", tone: risk },
      { label: "Similar to a known brand", value: lookalike ? `Looks like ${lookalike.toUpperCase()}` : "No close match", tone: lookalike ? "high" : "low" },
    ],
    indicators,
  };
}

export type CallQuestion = { id: string; question: string; options: string[] };

export const CALL_QUESTIONS: CallQuestion[] = [
  { id: "who", question: "Who did they say they were?", options: ["My bank", "A government office like HMRC", "A company such as Amazon or a delivery firm", "A family member or friend", "Someone else"] },
  { id: "contact", question: "Did they call you out of the blue?", options: ["Yes, I wasn't expecting it", "No, I called them", "I'm not sure"] },
  { id: "ask", question: "What did they ask you to do?", options: ["Move money to a 'safe account'", "Read out a code or password", "Install something on my computer or phone", "Confirm some personal details", "Nothing yet"] },
  { id: "pressure", question: "How did they make you feel?", options: ["Rushed or worried", "Told to keep it private", "Calm and unhurried", "I'd rather not say"] },
];

export type CallAssessment = { risk: Risk; likelihood: number; headline: string; plainEnglish: string; actions: string[] };

export function assessCall(answers: Record<string, string>): CallAssessment {
  let score = 0;
  if (answers['contact']?.startsWith("Yes")) score += 25;
  if (answers['who'] === "My bank" || answers['who']?.includes("HMRC")) score += 15;
  if (answers['ask']?.includes("safe account")) score += 40;
  if (answers['ask']?.includes("code or password")) score += 35;
  if (answers['ask']?.includes("Install")) score += 35;
  if (answers['ask']?.includes("personal details")) score += 15;
  if (answers['pressure']?.includes("Rushed")) score += 15;
  if (answers['pressure']?.includes("private")) score += 20;

  const likelihood = Math.min(score, 96);
  const risk = riskFromScore(score);
  return {
    risk,
    likelihood,
    headline:
      risk === "high"
        ? "This sounds very much like a scam call"
        : risk === "medium"
          ? "This call has some worrying signs"
          : "Nothing here stands out as a scam",
    plainEnglish:
      risk === "high"
        ? "Your bank will never ask you to move money, read out a code, or install anything. Please hang up. If you already shared something, ring your bank on the number on your card."
        : risk === "medium"
          ? "It's hard to say for certain. The safest thing is to end the call and ring the organisation back on a number you already have — never one they gave you."
          : "This doesn't match the usual scam patterns. It's still fine to hang up and call back on a number you trust if you'd feel better.",
    actions:
      risk === "low"
        ? ["Call back on a number you already have if you're unsure", "Never share a one-time code with anyone"]
        : ["Hang up and wait five minutes before using the phone again", "Ring your bank on the number on your card", "Tell a trusted contact what happened", "Report it to Action Fraud if money was taken"],
  };
}

export type PaymentQuestion = { id: string; question: string; weight: number };

export const PAYMENT_QUESTIONS: PaymentQuestion[] = [
  { id: "unexpected", question: "Did they contact you unexpectedly?", weight: 20 },
  { id: "urgent", question: "Are they asking for urgent payment?", weight: 20 },
  { id: "secret", question: "Have they asked you not to tell anyone?", weight: 25 },
  { id: "safeaccount", question: "Are they asking you to move money to keep it safe?", weight: 25 },
  { id: "software", question: "Have they asked you to install software?", weight: 20 },
];

export type PaymentAssessment = { risk: Risk; score: number; headline: string; plainEnglish: string };

export function assessPayment(answers: Record<string, boolean>): PaymentAssessment {
  const score = PAYMENT_QUESTIONS.reduce((total, question) => (answers[question.id] ? total + question.weight : total), 0);
  const risk = riskFromScore(score);
  return {
    risk,
    score,
    headline:
      risk === "high"
        ? "Please pause before making this payment."
        : risk === "medium"
          ? "Please take a moment before you pay."
          : "Nothing obvious stands out — pay only if you're sure.",
    plainEnglish:
      risk === "high"
        ? "Several answers match how scams usually work. Genuine organisations are happy for you to take your time and check. Speak to someone you trust or your bank before sending anything."
        : risk === "medium"
          ? "A couple of answers are the kind of thing scammers rely on. Checking with your bank or a trusted contact costs nothing and takes minutes."
          : "You didn't flag the common warning signs. If anything changes — a rush, a secret, a new account number — stop and check again.",
  };
}

const ASSISTANT_REPLIES: Array<{ patterns: RegExp[]; reply: string }> = [
  {
    patterns: [/hmrc/i, /tax/i, /refund/i],
    reply:
      "HMRC will never ring, text or email you about a refund or a fine, and they'll never ask for payment by voucher or bank transfer. If you're worried, log into your HMRC account yourself or call them on the number from GOV.UK. Would you like me to look at the exact wording of the message?",
  },
  {
    patterns: [/bank/i, /safe account/i, /transfer/i],
    reply:
      "Your bank will never ask you to move money to a 'safe account' — that phrase is one of the clearest signs of a scam. Hang up, wait a few minutes, then ring the number printed on your bank card. I can walk you through the payment safety check if that would help.",
  },
  {
    patterns: [/money/i, /pay/i, /send/i],
    reply:
      "Before sending money it's worth pausing on three things: did they contact you first, are they rushing you, and have they asked you to keep it quiet? If any of those are true, please speak to someone you trust first. I can run the payment check with you step by step.",
  },
  {
    patterns: [/delivery/i, /parcel/i, /royal mail/i, /dpd|evri/i],
    reply:
      "Delivery texts asking for a small fee are one of the most common scams around. Delivery companies don't usually ask for payment by text link. If you're expecting a parcel, check using the retailer's own app or website instead of the link.",
  },
  {
    patterns: [/voice/i, /grandchild|grandson|granddaughter|son|daughter/i, /it'?s me/i],
    reply:
      "Criminals can now copy voices convincingly, so hearing a familiar voice isn't proof. Agree a family password you can ask for, and always call the person back on the number you already have saved. Shall I help you notify a trusted contact?",
  },
  {
    patterns: [/genuine|real|legit|safe/i],
    reply:
      "I can't promise anything is definitely genuine — but I can tell you what stands out. Paste the message or the web address and I'll explain in plain English what looks normal and what doesn't, plus what I'd do next.",
  },
];

export function askAssistant(message: string): string {
  const match = ASSISTANT_REPLIES.find((entry) => entry.patterns.some((pattern) => pattern.test(message)));
  if (match) return match.reply;
  return "Thanks for telling me. There's no rush at all. Could you share a little more — who contacted you, how they got in touch, and what they're asking you to do? You can also paste the message itself and I'll go through it with you.";
}
