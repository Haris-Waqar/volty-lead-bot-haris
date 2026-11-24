import CopyPrompt from "./copy-prompt";

type Persona = {
  who: string;
  prompt: string;
  outcome: "hot" | "warm" | "nurture" | "cold";
  outcomeLabel: string;
};

const personas: Persona[] = [
  {
    who: "A 35-person clinic group",
    prompt:
      "We're a 35-person clinic group in Singapore, about 4,000 patients message us monthly, we're on Respond.io and want to switch this month. We need HubSpot.",
    outcome: "hot",
    outcomeLabel: "hot lead",
  },
  {
    who: "A small cake shop",
    prompt:
      "I run a 4-person cake shop. We get messages on WhatsApp and Instagram, about 1,500 customers a month. Looking to set something up in the next 2 to 3 months.",
    outcome: "warm",
    outcomeLabel: "warm lead",
  },
  {
    who: "A tutoring startup, just exploring",
    prompt:
      "I have a 3-person tutoring startup, about 200 messages a month, just exploring options right now.",
    outcome: "nurture",
    outcomeLabel: "nurture",
  },
  {
    who: "Someone asking about a job",
    prompt: "Are you hiring engineers?",
    outcome: "cold",
    outcomeLabel: "not a lead",
  },
];

const outcomeColor: Record<Persona["outcome"], string> = {
  hot: "var(--hot)",
  warm: "var(--warm)",
  nurture: "var(--nurture)",
  cold: "var(--cold)",
};

export default function Home() {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-16 sm:px-8 sm:py-24">
      <header className="mb-14 border-l-2 border-rule pl-6 sm:pl-8">
        <p className="font-sans text-[13px] tracking-wide text-ink-soft">
          an independent demo by Haris Waqar
        </p>
        <h1 className="mt-3 font-serif text-[2rem] leading-[1.15] sm:text-[2.5rem]">
          A lead-qualification assistant for voltade.com
        </h1>
        <p className="mt-5 max-w-[46ch] font-serif text-lg leading-relaxed text-ink-soft">
          Open the chat in the bottom corner. It qualifies you the way
          Voltade&rsquo;s own sales team would, then hands you a plan, a
          matching customer story, and the right next step.
        </p>
      </header>

      <section className="border-l-2 border-rule pl-6 sm:pl-8">
        <h2 className="font-serif text-xl italic text-ink-soft">Try it as</h2>
        <div className="mt-6 flex flex-col gap-5">
          {personas.map((p) => (
            <article
              key={p.who}
              className="flex flex-col gap-3 border border-rule bg-paper-raised px-5 py-4"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-lg leading-snug">{p.who}</h3>
                <span
                  className="mt-1 shrink-0 font-sans text-[12px] tracking-wide"
                  style={{ color: outcomeColor[p.outcome] }}
                >
                  {p.outcomeLabel}
                </span>
              </div>
              <p className="font-serif text-[15px] leading-relaxed text-ink-soft">
                &ldquo;{p.prompt}&rdquo;
              </p>
              <CopyPrompt text={p.prompt} />
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 border-l-2 border-rule pl-6 sm:pl-8">
        <h2 className="font-serif text-xl italic text-ink-soft">How it works</h2>
        <ol className="mt-6 flex flex-col gap-5">
          <li className="flex gap-4">
            <span className="font-serif text-ink-soft">01</span>
            <p className="font-serif text-[15px] leading-relaxed">
              <strong className="font-semibold">Tap.</strong> One question,
              four buttons — no typing needed to get started.
            </p>
          </li>
          <li className="flex gap-4">
            <span className="font-serif text-ink-soft">02</span>
            <p className="font-serif text-[15px] leading-relaxed">
              <strong className="font-semibold">Qualify.</strong> A few quick
              questions about your business, skipping anything you&rsquo;ve
              already said.
            </p>
          </li>
          <li className="flex gap-4">
            <span className="font-serif text-ink-soft">03</span>
            <p className="font-serif text-[15px] leading-relaxed">
              <strong className="font-semibold">Route.</strong> A plan, a
              matching case study, and whichever next step fits: a trial, a
              comparison, or the team.
            </p>
          </li>
        </ol>
        <a
          href="https://github.com/Haris-Waqar/volty-lead-bot-haris"
          className="mt-6 inline-block font-sans text-[13px] tracking-wide text-ink-soft underline decoration-rule decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          Read the build notes on GitHub
        </a>
      </section>

      <footer className="mt-20 border-l-2 border-rule pl-6 sm:pl-8">
        <p className="font-sans text-[13px] leading-relaxed text-ink-soft">
          Independent demo for Voltade&rsquo;s hiring task. Not an official
          Voltade page.
        </p>
      </footer>
    </div>
  );
}
