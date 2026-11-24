# Volty sales cheat sheet

Source of truth for every price, plan limit, trial term, case-study number, security claim and key link the agent uses. Checked against the live voltade.com pages on 2026-11-24. Re-check before submission (PRD section 17).

## 1. Plans (US pricing, monthly)

| Plan | Price | Seats | Monthly active contacts | AI replies/mo (est.) | Adds over the plan below |
| --- | --- | --- | --- | --- | --- |
| Plus | US$159/mo | 6 | 1,000 | ~750–1,500 | Every channel, shared inbox, AI agent, automations, custom web apps, every integration |
| Pro | US$399/mo | 20 | 2,000 | ~1,500–3,000 | Custom roles, deals pipeline with companies, WhatsApp loyalty, click-to-WhatsApp ad attribution, broadcast A/B tests and retargeting |
| Max | US$799/mo | 40 | 5,000 | ~3,000–7,500 | Row rules (each person sees only their rows), approve right, audit export, single sign-on, developer testing in CI on an anonymised workspace copy |
| Enterprise | Custom (talk to us) | Custom | Custom | Custom | User provisioning from the company directory, two-person approval, one pool of usage across workspaces, own AI gateway with zero-retention AI providers, custom contract and invoicing, dedicated account team |

All plans include: every channel (WhatsApp, web chat, email, Instagram, Messenger), AI agent, automations, custom web apps/mini-apps, and every integration (no integration tiers).

Support: Plus/Pro = AI support any hour + human chat weekdays. Max = adds priority human support. Enterprise = dedicated account team.

## 2. Pay as you go (every plan)

| Add-on | Price |
| --- | --- |
| Extra seat | US$17 per seat / month |
| Extra active contacts | US$10 per 100 active contacts / month |
| Extra AI credits | US$12 per 1,000 AI credits |
| Extra Volty requests | US$9 per 100,000 Volty requests |

If a lead is slightly over a plan's seat/contact limit, mention pay-as-you-go add-ons as an alternative to jumping to the next plan.

## 3. Trial

7-day Sandbox Trial, no credit card required. When it ends: nothing is deleted — messages keep arriving and everything stays saved — but Volty stops replying until a plan is chosen. A canceled workspace is purged 30 days after it ends.

## 4. Definitions

- **Monthly active contact:** a contact who sends or receives at least one message in the billing month counts once, however many messages they exchange; the count resets each month.
- **AI credit use per reply:** an AI agent reply or action uses 2–5 AI credits; a draft/prompt/summary for the team uses 1 credit.
- **Volty request:** an automation or custom web app uses 1 Volty request each time it reads from or writes to another system (CRM lookup, booking write-back, sync). Automation runs, apps and their users are not charged separately.
- **WhatsApp fees:** NOT included in any Volty plan. Meta charges its own WhatsApp messaging fees separately, against the business's own WhatsApp Business account.

## 5. Plan mapping rule

Recommend the smallest plan that covers both seats and monthly active contacts:

| Plan | Seats up to | Monthly active contacts up to |
| --- | --- | --- |
| Plus | 6 | 1,000 |
| Pro | 20 | 2,000 |
| Max | 40 | 5,000 |
| Enterprise | Above Max, or any Enterprise-only need | — |

If slightly over a limit, mention pay-as-you-go add-ons as an alternative to the next plan. A Max-only need (row rules, approve right, audit export, SSO, CI testing) → recommend at least Max. An Enterprise-only need (directory provisioning, two-person approval, own AI gateway, custom contract) → recommend Enterprise.

## 6. Case studies by industry (one headline result + link each)

| Industry | Customer | Headline result | Link |
| --- | --- | --- | --- |
| Education | EtonHouse | 90% time savings on lesson planning, $1M+ saved every year | https://voltade.com/case-studies/etonhouse |
| Clinics & Spas | Cutis Medical Laser Clinics | 24-second first reply, ~100% of patient messages sent as the agent wrote them | https://voltade.com/case-studies/cutis |
| Clinics & Spas | Prologue Clinic | 70% conversion rate from Volty replies; inquiry time cut from 3 hours to 30 minutes | https://voltade.com/case-studies/prologue-clinic |
| Clinics & Spas | Yong Kang TCM | 20% more bookings; peak-period reply time down from 30 minutes to under 5, absorbing 60% more traffic with no new headcount | https://voltade.com/case-studies/yong-kang-tcm |
| B2B | Yat Guan | Custom quotes 3x faster (3 days → 1 day) at 95% accuracy | https://voltade.com/case-studies/yat-guan |
| Ecommerce & Retail | Cake Inspiration | 75% fewer leads lost; 91% of conversations resolved by Volty without a human | https://voltade.com/case-studies/cake-inspiration |
| Ecommerce & Retail | Happy Fish | 1,800+ messages/day automated with instant replies, 3x inquiry capacity | https://voltade.com/case-studies/happy-fish |
| Multi-app builders | Sgcarmart | 5-person, non-technical team launched 16+ apps and automations in days, switching from SleekFlow | https://voltade.com/case-studies/sgcarmart |

## 7. Competitor one-liners (factual only, no disparagement)

- **SleekFlow:** Volty's Plus/Pro plans include more seats and cheaper additional active contacts than SleekFlow's comparable plans, and every Volty plan's AI agent can act (look up orders, book slots) — SleekFlow needs its Premium plan for that. https://voltade.com/compare/volty-vs-sleekflow
- **Respond.io:** Volty includes every integration on every plan and AI that calls other systems on every plan; Respond.io has no integrations on its Starter plan and needs its Advanced plan for AI/HTTP actions. https://voltade.com/compare/volty-vs-respond-io
- **Wati:** Volty's AI agent is included in every plan (15,000 AI credits/mo on Plus); Wati's AI agent (Astra) is a separate product with its own subscription, and Wati limits integrations by plan (2 on Growth, 5 on Pro). https://voltade.com/compare/volty-vs-wati
- **Twilio:** Volty is a ready inbox, CRM and AI agent out of the box; Twilio is a messaging API a business's own developers build and host on top of (Flex, or custom code), with no inbox or CRM included. https://voltade.com/compare/volty-vs-twilio

## 8. Security facts

- Hosted on AWS in Singapore (ap-southeast-1); customer data (database, files, backups) stored and backed up in Singapore.
- Encrypted in transit (TLS 1.2/1.3) and at rest (AES-256).
- No training on customer data: every AI model request goes through OpenRouter with zero data retention enforced; Volty does not fine-tune or store client data in AI models (RAG architecture, queries the knowledge base at runtime).
- CSA Cyber Essentials Mark (certified by Singapore's Cyber Security Agency).
- CASA Tier 2 (App Defense Alliance Cloud Application Security Assessment), independently assessed by TAC Security against the OWASP ASVS standard, valid through April 15, 2027.
- No data breaches since founding in 2023 (per the security page's stated track record).

## 9. Channels and integrations

Every plan includes: WhatsApp, Messenger, Instagram, web chat and email — all answered by the same AI agent from one shared inbox. No channel tiers.

Named integrations relevant to this demo's scope: HubSpot, Google Calendar, Notion, Slack, Shopify, Plato Medical, plus any system with an API (custom key) or MCP server. (Volty's integrations page lists 272+ total tools; the above are the ones named in PRD section 6.2.)

## 10. Key links

- Signup / Sandbox Trial: https://volty.voltade.com/signup
- Pricing: https://voltade.com/pricing
- Compare: https://voltade.com/compare
- Case studies: https://voltade.com/case-studies
- Contact (careers/vendor/partnership pitches, Enterprise talk-to-us): team@voltade.com
