# Safe Circle Family

Build a modern, mobile-first web application called SafeCircle – an AI-powered scam prevention platform designed to help older adults stay safe online while giving trusted family members peace of mind.

The design should feel reassuring, simple and friendly rather than technical. Think Apple Health, Monzo and Calm combined. Large buttons, high contrast, accessibility-first, minimal text and clear visual feedback.

Overall Goal

SafeCircle acts as a “second opinion” whenever someone receives a suspicious message, email, phone call or payment request.

The app should never state that something is definitely safe. Instead it explains risk in plain English and recommends sensible next steps.

Use soft blues, greens and white with subtle illustrations and rounded cards.



Landing Page

Create a beautiful marketing homepage with:

Hero section:

Stay Independent. Stay Protected.

AI-powered scam detection for you and your family.

Buttons:

Get Started

See How It Works

Include feature cards:

Check suspicious messages

Verify websites

Analyse scam phone calls

Ask AI before sending money

Family support

Scam alerts

Testimonials section.

FAQ section.

Pricing section:

Free

Premium Family

Footer.



Login / Registration

Users choose:

I want to protect myself

I want to help a family member

Support Google and Apple sign in.



Main Dashboard (Older Adult)

Large friendly tiles.

Greeting:

“Good Morning Margaret”

Main actions:

📷 Check a Message

🔗 Check a Website

📞 I Received a Phone Call

💷 Someone Asked Me For Money

👨‍👩‍👧 Ask Someone I Trust

Recent activity timeline underneath.

Scam awareness tip of the day.

Emergency button:

“I’m Unsure”



Message Scanner

Allow users to:

Upload screenshot

Paste text

Drag and drop image

Show an AI analysis screen.

Risk indicator:

Green

Amber

Red

Explain:

Why the AI thinks it may be suspicious.

Highlight phrases such as:

urgency

payment requests

unusual links

impersonation

emotional pressure

Suggested actions:

Don’t reply

Verify independently

Call your bank

Contact family

Button:

Notify Trusted Contact



Website Checker

Input field.

User pastes a URL.

Show:

Domain age

HTTPS

Reputation

Similarity to known brands

Suspicious indicators.

Risk meter.



Phone Call Checker

Conversational AI interface.

User types or speaks:

“Someone claiming to be my bank called…”

AI asks follow-up questions.

Produces:

Scam likelihood

Explanation

Next steps.



Payment Safety Check

Wizard interface.

Ask:

Did they contact you unexpectedly?

Are they asking for urgent payment?

Have they asked you not to tell anyone?

Are they asking you to move money to keep it safe?

Have they asked you to install software?

Produce:

Overall risk score.

Large recommendation card.

“Please pause before making this payment.”

Buttons:

Call Trusted Contact

Call Your Bank

Learn More



Family Dashboard

Family members can:

View recent scam checks

Receive notifications

View risk history

Respond to requests

Start video call

Send reassurance message

Recent alerts displayed as cards.



Notifications

Examples:

Margaret has asked for help reviewing a suspicious message.

High-risk payment detected.

Suspicious website checked.



AI Chat Assistant

Friendly conversational assistant.

User can ask:

“Is this genuine?”

“Someone says they’re from HMRC.”

“Should I send this money?”

AI explains everything using plain English.

Avoid technical cybersecurity language.



Scam Education Centre

Cards for:

Banking scams

Romance scams

Delivery scams

Investment scams

Phone scams

QR code scams

WhatsApp scams

AI voice scams

Include short articles and videos.



Settings

Manage trusted contacts.

Notification preferences.

Accessibility options:

Large text

High contrast

Voice mode

Read aloud

Dark mode



Design Requirements

Mobile-first responsive design.

WCAG AA accessibility.

Large touch targets.

Rounded cards.

Soft shadows.

Friendly illustrations.

Simple onboarding.

Modern animations.

Premium feel.

Avoid fear-based messaging.

Build reusable React components.

Use TypeScript.

Tailwind CSS.

Supabase authentication.

Supabase database.

Mock AI responses for the prototype.

Include placeholder APIs for future integration with OpenAI, scam intelligence feeds, URL reputation services and bank fraud systems.

Include realistic sample data throughout the application.

The finished prototype should look polished enough to present to banks, insurance companies, telecom providers and potential investors

Scam Shield Score (Core Differentiator)

Build a unique feature called Scam Shield Score that provides users with an ongoing view of their digital safety rather than simply checking individual messages.

The Scam Shield Score should analyse user activity over time and generate a dynamic score out of 100, helping users understand their overall scam risk in a simple, reassuring way.

Example:

Scam Shield Score
92/100 – You’re staying safe online

Display a friendly dashboard showing insights such as:

You’ve received 12 suspicious delivery text messages this month.

3 callers have claimed to be from your bank.

You haven’t verified your trusted contacts recently.

You’ve successfully avoided 5 potential scams this month.

Your score has improved by 8 points since last week.

Provide personalised, non-alarming recommendations such as:

Verify your trusted contacts.

Review the latest AI voice scam guidance.

Enable additional protection features.

Continue checking unexpected payment requests before sending money.

Use positive reinforcement to encourage safer digital habits rather than fear-based messaging. The score should evolve over time, making SafeCircle feel like a digital wellbeing companion instead of a one-time scam checker.

Historical Trends

Include interactive charts showing:

Scam Shield Score over time.

Scam attempts blocked each week.

Most common scam categories encountered.

Risk level trends.

Monthly protection summary.



Family Safety Dashboard

Create a dashboard for trusted family members showing:

Overall Scam Shield Score for each protected relative.

Recent scam checks.

Alerts requiring attention.

Requests for help.

Weekly activity summaries.

Suggestions for improving protection.

Family members should be able to send reassurance messages, initiate a phone or video call, and acknowledge alerts.



Enterprise & Bank Analytics Dashboard

Create a separate dashboard designed for banks, insurers, telecom providers, and enterprise customers.

Use realistic but anonymised sample data to demonstrate measurable impact.

Include KPIs such as:

Total scam attempts detected.

Estimated customer money protected.

Average Scam Shield Score across customers.

High-risk customers requiring additional support.

Most common scam types.

Monthly trends.

AI detection accuracy.

Average response time to alerts.

Trusted contact engagement.

Customer adoption and retention.

Include charts showing:

Scam attempts by category.

Money saved over time.

Fraud trends.

Geographic heatmaps (using sample data).

User engagement.

Protection success rates.

Allow filtering by:

Time period.

Scam type.

Customer segment.

Region.

Risk level.

The dashboard should look polished enough for executive presentations and demonstrate the tangible value SafeCircle could provide to banks, insurers, telecom companies and government organisations through reduced fraud, improved customer protection and measurable financial savings.



Product Vision

SafeCircle should not feel like a cybersecurity application.

It should feel like a trusted companion that empowers people to stay independent, confident and protected online.

Every interaction should be calm, reassuring and easy to understand, avoiding technical jargon or fear-based messaging. The product should combine AI-powered protection with human support through trusted contacts, making users feel informed and in control while giving families confidence that their loved ones are safer online.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f0af48c9-e04c-4b6d-b017-cc8f6b56c5be).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
