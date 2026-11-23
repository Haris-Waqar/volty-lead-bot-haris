# CLAUDE.md — Volty Lead-Qualification Web Chatbot (Voltade round 1)

Follow PRD.md (the file "PRD — Volty Lead-Qualification Web Chatbot for voltade.com.md"); stop at every phase gate in section 14 and wait for Haris's go-ahead.

## Rules for Claude Code (PRD section 1)

1. Stay inside the PRD. Locked decisions (section 2) are not up for change. If blocked, stop, report findings and 2–3 options, and wait.
2. Volty runs everything at run time. Do not build a custom chatbot, backend, database or LLM integration. The only code we own is the demo page and the Volty project files the CLI pulls.
3. Never guess CLI flags. Run `volty <op> --help` before every op marked "verify", and before any op not used yet.
4. Pull, dry-run, push. Always `volty pull` before editing project files, `volty push --dry-run` before `volty push`. Never force past a stale-push refusal; pull and reconcile instead.
5. Held changes: after any op that may be held, run `volty changes` and tell Haris exactly what to approve in the app.
6. Destructive ops (`--confirm`, deletes, `channels disconnect`, `sources remove`, `sandbox-cleanup`) need Haris's explicit yes in chat first.
7. Facts: every price, plan limit, case-study number or security claim must come from the sales cheat sheet (section 6), which itself must match the live voltade.com pages.
8. Log as you go: append every decision, deviation and verification result to DECISIONS.md.
9. Work phase by phase (section 14) and stop at each verification gate with a short report.
10. The demo page is clearly a demo. No Voltade logo, no copied layout, no pretending to be voltade.com.

## Locked decisions (PRD section 2)

| # | Decision | Choice |
| --- | --- | --- |
| D1 | Chatbot platform | Volty web chat widget, configured from Claude Code via the `volty` CLI |
| D2 | Where the link points | One-page Next.js app on Vercel with the Volty widget script tag |
| D3 | Who scores leads | Volty's AI agent only; no scoring automation |
| D4 | Scoring rubric | Points rubric in section 9, approved as drafted |
| D5 | Hot-lead hand-off | Volty inbox + WhatsApp alert to Haris |
| D6 | Knowledge | voltade.com website source + sales cheat sheet file; numbers only from the cheat sheet |
| D7 | Opening | One-step quick path to triage intent; agent does all qualification with cards |
| D8 | Extras in scope | Revised 2026-11-24: no Leads table — contact attributes + labels are the source of truth; pipeline view = contacts filtered by `lead_bucket`. Plus DECISIONS.md / README.md |
| D9 | Extras out of scope | Google Analytics events, external webhook |
| D10 | Language | Reply in the visitor's language (Volty default) |
| D11 | Prices | Quote US$ list prices only, labelled as US pricing; other markets → pricing page or team |
