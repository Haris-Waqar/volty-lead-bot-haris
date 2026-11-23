# Decisions log

Append-only, newest at the bottom.

## 2026-11-24 00:40 — Repo created, CLAUDE.md written
Context: Starting round-1 build per PRD.md.
Decision: Repo layout per PRD section 4 (web/, volty/, knowledge/, tests/, DECISIONS.md, README.md). CLAUDE.md written with the 10 rules and locked-decisions table (PRD section 2).
Alternatives: None — these are fixed by the PRD.
Verification: `ls` shows the folders; CLAUDE.md present.

## 2026-11-24 00:45 — D1–D11 locked decisions carried into CLAUDE.md
Context: PRD section 2 decisions are not to be changed without asking Haris.
Decision: Logged D1–D11 verbatim into CLAUDE.md so every session loads them.
Alternatives: None.
Verification: Visual diff against PRD section 2.

## 2026-11-24 00:46 — CLI installed and authenticated
Context: Needed `volty` CLI to connect to the Voltade Sales Demo – Haris org (c7axqty2b4az).
Decision: Installed `bun` (curl installer) and `@voltade/volty` globally via `bun add -g`, added `$HOME/.bun/bin` to `~/.zshrc` PATH. Ran `volty skill install` (wrote `~/.claude/skills/volty-cli-ops/SKILL.md`). Ran `volty auth login --env prod`; Haris approved in browser; authenticated as hariswaqar558@gmail.com.
Alternatives: None — this is the only documented install path.
Verification: `volty org whoami` → `org=c7axqty2b4az user=m6qlbrwafnn3yo3 (Haris) role=admin`. `volty org list-members` confirms org name "Voltade Sales Demo – Haris", 1 staff member (Haris, owner), 1 team.

## 2026-11-24 00:55 — Phase 1 (connect + recon) findings: V1–V5
Context: PRD section 18 unknowns must be resolved before Phase 2, using read-only ops and --help only (no workspace changes in Phase 1, per Haris's explicit instruction overriding the PRD's own "run it and read the error" method for V1).

**V1 — does `sources add --kind website --url https://voltade.com` require owning the domain?**
Not resolved by inspection alone — `sources add --help` describes `kind: website` as "the workspace's own site" but the help text does not state a verification mechanism (DNS, meta tag, etc.), and `sources add` is not marked `(held)` so running it for real is an actual workspace change, which Phase 1's read-only constraint rules out. Must be tested live in Phase 4 under the "pull → dry-run → push" discipline, with the PRD's documented fallback ready (`web map` → `web fetch` → save markdown → `drive upload`).
Verification: `volty sources add --help` (read-only, inspected flags/description only — did not execute).

**V2 — where do the widget script tag and allowed-websites setting live?**
Resolved. `volty widgets create --website <url> [--allowed-domains ...] [--target web_chat|in_app]` creates the web chat channel + inbox + widget together; `volty widgets get --id <id>` is explicitly read-only and returns "its every setting with its current value, plus its paste-ready embed snippet." `volty widgets update --id <id> --allowed-domains [...]` changes the allowed websites later. `widgets read-site --id <id>` reads voltade.com's look/headline/shortcut suggestions (rate-limited to 5 reads/day per web chat).
Verification: `volty widgets create --help`, `volty widgets get --help`, `volty widgets update --help`, `volty widgets read-site --help`.

**V3 — can the agent set contact fields, labels and Leads-table rows in the customer lane?**
Partially resolved. Ran the PRD's prescribed check — one `instructions preview-reply` test (explicitly documented "Stores nothing and reaches no visitor," so safe in Phase 1) — against the existing Sandbox inbox (`inb:k34uwit3vrx3`) with a draft instruction telling Volty to set `company_name` and apply a label when a visitor states their company:
> visitor: "My company is Acme Clinics." → Volty: "Thanks! I've saved your company as Acme Clinics. How can I help you today?"
The reply shows Volty is willing to claim the save; `preview-reply` does not surface a tool-call trace, so this does not yet prove the real `contacts update` / `contacts update-labels` tools actually fired (there is no live contact behind a preview). Real confirmation needs a `debug wake-sync` run plus `volty logs --conversation <id>` once contact fields exist (Phase 3/4), which Phase 1's no-change constraint rules out today.
Important related finding: `volty tables create --help`'s own description recommends AGAINST a one-row-per-contact "lead tracker" table, saying status/fields "already" live on Contact Labels + attributes, and instructs not to create such a table on a first request. This bears directly on PRD 7.3's Leads table — see option list in the Phase 1 report below.
Verification: `volty instructions preview-reply --inbox-id inb:k34uwit3vrx3 --draft "..." --messages [...]`, `volty tables create --help`.

**V4 — how is the WhatsApp alert to staff triggered?**
Resolved. `volty staff notify --user-id --message [--conversation-id]` sends the staff member's in-app bell, Volty DM, and — "when they have WhatsApp linked" — their phone, governed by their own notification preferences/quiet hours. `volty org get-settings` shows `staffWhatsappNotices: questions` (Volty's automatic WhatsApp notices currently cover questions, held changes and @-mentions, not hand-offs by default), so the hot-lead alert in PRD section 10.3 must come from an explicit `staff notify` call inside the agent's hand-off instructions. `volty channels sandbox-info` confirms Haris's WhatsApp is already verified (`phoneVerified: true`), so the phone leg will fire.
Verification: `volty staff notify --help`, `volty org get-settings`, `volty channels sandbox-info --json`.

**V5 — which ops are held for approval?**
Resolved, with a nuance for this workspace. `volty changes list-mine` lists held items waiting for an admin (currently "Nothing of yours is waiting"). Per the `volty-cli-ops` skill notes and the CLI's own `(held)` marks in `volty help`: a `(held)` op is filed for approval UNLESS the caller's key is the org's own owner/admin, in which case it runs immediately — except delete/`--confirm` ops, which always require explicit `--confirm`. Haris is role `admin`/owner in this workspace, so most `(held)` ops in this build (e.g. `contacts describe-label --auto-add`, `contacts propose-attribute-definition`) will likely execute immediately rather than sit in `volty changes` for a separate in-app approval — only destructive ops will still stop and ask. This is worth confirming the first time a `(held)` op is actually run in Phase 3.
Verification: `volty changes list-mine`, `volty help` marks, `~/.claude/skills/volty-cli-ops/SKILL.md`.

## 2026-11-24 01:10 — Phase 1 gate: Haris's decisions, PRD revised, go for Phase 2
Context: Haris reviewed the Phase 1 report and made six calls.

**1. D8 revised — no Leads table.** Dropped the Leads table entirely. Contact attributes (7.1) + the one bucket label (7.2) are now the sole source of truth for a lead. The round-2 pipeline view is `volty contacts list --where lead_bucket=<hot|warm|nurture>` (or a saved filter in the app, if the web UI supports one), not a table.
Alternatives considered: keep the table anyway (rejected — duplicates data Volty's own `tables create --help` warns against); build it via a non-scoring sync automation (rejected — no automation needed if there's no table).
PRD edited: D8 (section 2), section 3 scope, section 4 architecture table, section 5, section 7 (7.3 renamed "Pipeline view (no Leads table)"), section 9.4 routing table, section 12 instructions draft, section 14 phase-3 gate, section 15.2 acceptance checklist, section 16 README point 3, section 17 submission checklist, section 17 email draft, section 18 V3 row. CLAUDE.md D8 row updated to match.
Verification: `grep -n "Leads table" PRD.md` after edits — only explanatory "no Leads table" mentions remain, no stale contradictions.

**2. Business hours — left unconfigured.** Will not set workspace business hours. The hand-off visitor message (PRD section 10, item 5) changed from "...during Singapore business hours" to "The Voltade team will continue with you on WhatsApp or email." with no hours or response-time promise. Section 12's ROUTING block updated to match ("no hours mentioned").
Alternatives considered: configure Asia/Singapore hours in Settings to match the original copy (rejected — extra setup for no functional benefit at this scale).

**3. `sources add` for voltade.com — try direct add first.** Phase 4 will run `volty sources add --kind website --url https://voltade.com` directly; fall back to `web map` → `web fetch` → `drive upload` markdown only if the direct add is refused. No change yet (Phase 1 made no workspace writes).

**4. V4 — WhatsApp alert mechanism, platform-native preferred.** Phase 6 will first try changing `staffWhatsappNotices` (via `org update`, after re-reading `org get-settings`) so it covers hand-offs, since that fires on every hand-off without relying on the agent calling a tool. Only wire `staff notify` into the hand-off instructions (PRD section 10, item 3) if the setting can't be scoped to hand-offs. Will report back which way it went at the Phase 6 gate.

**5. V5 reaffirmed — pull → dry-run → push discipline, no exceptions.** Since Haris's own key runs most `(held)` ops immediately (he's owner), the dry-run diff is the only safety check before anything lands. Every push that changes instructions or settings gets its `--dry-run` diff shown to Haris before the real `push`, not just logged after.

**6. V3 — will confirm for real in Phase 3.** Once contact attributes exist, run a real `debug wake-sync` against the Sandbox inbox with an instruction to set one, then read `volty logs --conversation <id>` to see the actual tool call (not just the preview-reply text), confirming the agent can set contact attributes/labels in the customer lane for real contacts.

Haris said "go" — proceeding to Phase 2 (repo + `volty pull`).
