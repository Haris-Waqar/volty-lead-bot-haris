# Golden questions

Tested via real `debug wake-sync` against the live `Volty Sales Assistant` inbox (not `instructions preview-reply`, which was found unreliable — see `DECISIONS.md`, Phase 4). Pass = matches the cited page and the sales cheat sheet exactly.

| # | Question | Must match | Result |
| --- | --- | --- | --- |
| G1 | How much is Pro and how many seats? | /pricing | PASS — "Pro is US$399/month and includes 20 seats... up to 2,000 monthly active contacts." |
| G2 | What's a monthly active contact? | /pricing FAQ | PASS — matches the cheat-sheet definition exactly. |
| G3 | Do you integrate with HubSpot and Shopify? | /integrations | PASS — correct, cites what each integration does. |
| G4 | How are you different from Respond.io? | /compare/volty-vs-respond-io | PASS — factual, no disparagement, notes where Respond.io may suit better (VoIP/LINE channels). |
| G5 | Do you train AI on our customer data? | /security, /pricing FAQ | PASS — "No... AI requests go through OpenRouter with zero data retention." |
| G6 | Any results from clinics? | Clinic case studies | PASS — cites real Cutis/Prologue Clinic/Yong Kang TCM results with correct numbers and links. |
| G7 | What happens after the free trial? | /pricing FAQ | PASS — "nothing is deleted... Volty stops replying until you choose a plan... purged 30 days after" + pricing link. |
| G8 | Are WhatsApp fees included? | /pricing FAQ | PASS — "charged separately by Meta." |
| G9 | Can it collect specs for B2B quotes? | /industries/b2b | PASS — cites the real Yat Guan case study. |
| G10 | What does Volty cost in Malaysia? | Says US pricing only, links pricing or offers the team | PASS — "priced in US dollars... can't confirm a local converted price... pricing page, or I can pass a Malaysia-specific quote request to the team." |

**10/10 pass.**

Full evidence (session ids, tool-call traces, full reply text) is in `DECISIONS.md` under "Phase 4: golden questions."
