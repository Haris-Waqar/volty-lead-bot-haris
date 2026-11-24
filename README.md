# Volty lead-qualification web chatbot — for voltade.com

**Live demo:** https://volty-lead-bot-haris.vercel.app

Try these prompts (also on the demo page, with copy-to-clipboard buttons):

1. *"We're a 35-person clinic group in Singapore, about 4,000 patients message us monthly, we're on Respond.io and want to switch this month. We need HubSpot."* — expect a **hot** lead, recommended **Max**.
2. *"I run a 4-person cake shop. We get messages on WhatsApp and Instagram, about 1,500 customers a month. Looking to set something up in the next 2 to 3 months."* — expect a **warm** lead, recommended **Pro**.
3. *"I have a 3-person tutoring startup, about 200 messages a month, just exploring options right now."* — expect a **nurture** lead, recommended **Plus**.
4. *"Are you hiring engineers?"* — expect **not a lead**, routed to team@voltade.com.

## What it is

A lead-qualification assistant for voltade.com, built entirely on [Volty](https://volty.voltade.com) and configured by Claude Code through the `volty` CLI. It triages intent in one tap, qualifies visitors with interactive cards (industry, team size, channels, volume, current tool, timeline), answers product/security/comparison questions from a live crawl of voltade.com, scores the lead, recommends a plan with a matching customer story, and routes it: hot leads are handed to the Sales team with a written summary, warm leads get the Sandbox Trial, others get the right resources.

## How it works

1. **Tap.** One opening question, four reply buttons — no typing needed to start (Volty's Flow: Level 1 quick path).
2. **Qualify.** The agent asks a few quick questions (industry, seats, channels, volume, current tool, timeline), skipping anything already said, using Choice and Form cards.
3. **Route.** A plan card, a matching case study, and the right next step: a hand-off to the Sales team (hot), the Sandbox Trial (warm), or links and an offer to follow up (nurture). Job/vendor/partner messages and existing-customer support issues are routed without being scored as leads.

**Where the data lives:**
- Every lead is a Volty **contact** with typed attributes (`lead_score`, `lead_bucket`, `recommended_plan`, `industry`, `team_seats`, etc.) and exactly one bucket label (`lead-hot` / `lead-warm` / `lead-nurture` / `not-a-lead`), plus an industry label and `src-voltade-webchat`.
- There is **no separate Leads table** — Volty's own tooling treats a one-row-per-contact tracker as a duplicate of the contact record it already holds, so the pipeline view is the contacts list filtered by `lead_bucket` (a saved filter in the app), not a table.
- Hot leads are handed to a **Sales** team inside the Volty inbox, with a written hand-off note (score, plan, company, industry, seats/contacts, channels, current tool, timeline, needs, why hot, contact). The AI agent stops selling once a human takes over.
- The knowledge base is a live **website source** (voltade.com, crawled and searched by Volty) plus a curated **Sales Cheat Sheet** (uploaded to Volty's Drive) that every price, plan limit, trial term, case-study number and competitor fact must come from.

## How it was built

Claude Code, driving the `volty` CLI end to end — no custom backend, database, or direct LLM calls. Volty runs everything at runtime; the only code in this repo is this demo page (`web/`, a static Next.js app with no API routes or env vars) and the versioned Volty project files (`volty/`) that `volty pull`/`push` manage.

Volty features used: website sources, Drive file uploads, contact attribute definitions, Contact Labels (with auto-add), a web chat widget and site widget settings, a Flow: Level 1 quick path, inbox instructions (with `instructions compile-cards` suggestions), a staff team with a hand-off rule, hand-off topics, `staffWhatsappNotices`, and extensive use of `debug wake-sync` / `volty logs` / `debug llm-io` for real, verifiable end-to-end testing rather than the (unreliable, see `DECISIONS.md`) `instructions preview-reply`.

## What I'd do next with more time

- **Scoring automation.** D3 kept scoring inside the AI agent for speed; a deterministic scoring function (automation) would remove the small run-to-run variance I observed in testing (the same input scored 4 points on one run and 2 on an identical repeat — same bucket boundary, different result).
- **Calendar booking.** Not built — voltade.com has no "book a demo" CTA today, so this would need a new CTA on their side first.
- **Analytics and webhooks.** Deliberately out of scope for this round (D9); Google Analytics events on the widget and a CRM webhook would be natural next steps.
- **A connected WhatsApp Business channel.** The trial workspace has no connected WhatsApp number, so the hand-off alert currently reaches Haris's in-app bell and DM but not his phone — connecting a real number would complete the "team gets pinged on WhatsApp" loop demoed in the PRD.
- **Investigate a one-off false hand-off claim.** During testing, a single messy browser session (mixed history from two different test personas) produced a reply that *claimed* a hand-off happened when it hadn't. A clean, deliberate attempt to reproduce it afterward did not reproduce — worth a closer look with more time, logged in `DECISIONS.md`.

## No secrets

No phone numbers, API keys, or credentials are committed anywhere in this repo. Volty reads real phone numbers and emails as `pii:` tokens even to an admin's own CLI key; the workspace's underlying contact data stays in Volty, not in this repo.
