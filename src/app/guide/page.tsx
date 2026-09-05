import type { Metadata } from "next";
import Link from "next/link";
import { gamemodes } from "@/data/gamemodes";
import { tierOrder, tiers } from "@/data/tiers";
import TierBadge from "@/components/TierBadge";
import GamemodeIcon from "@/components/GamemodeIcon";

export const metadata: Metadata = {
  title: "Guide — Clash Tier",
  description: "Everything you need to know about Clash Tier testing, queues, tiers, and rules.",
};

const sections = [
  { id: "how-it-works", label: "How Testing Works" },
  { id: "joining-queue", label: "Joining a Queue" },
  { id: "tier-definitions", label: "Tier Definitions" },
  { id: "gamemodes", label: "Gamemodes" },
  { id: "tester-rules", label: "Tester Rules" },
  { id: "player-rules", label: "Player Rules" },
  { id: "testing-process", label: "Testing Process" },
  { id: "faq", label: "FAQ" },
];

export default function GuidePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-subtle">
        <div className="absolute inset-0 bg-grid" />
        <div className="glow-blob w-[460px] h-[300px] -left-32 top-0 bg-amber/12" />
        <div className="glow-blob w-[380px] h-[280px] -right-24 top-10 bg-rose/10" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-border-strong" />
            <span className="text-xs font-semibold tracking-[0.2em] text-amber uppercase">Field Manual</span>
            <span className="h-px w-8 bg-border-strong" />
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-6xl leading-tight">
            <span className="text-text-primary">The complete</span>
            <br />
            <span className="text-gradient-brand">field manual</span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-text-secondary max-w-xl mx-auto">
            Everything it takes to earn your tier — how testing works, what each rank means,
            and the rules that keep it fair across every gamemode.
          </p>
          <a
            href="#gamemodes"
            className="inline-block mt-7 bg-surface hover:bg-surface-hover border border-border-subtle text-text-primary font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
          >
            Explore the gamemodes ↓
          </a>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8 bg-border-strong" />
            <span className="text-xs font-semibold tracking-[0.2em] text-amber uppercase">Choose your arena</span>
            <span className="h-px w-8 bg-border-strong" />
          </div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-center">
            <span className="text-text-primary">{gamemodes.length} disciplines. </span>
            <span className="text-gradient-brand">One rulebook.</span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
            {gamemodes.map((g) => (
              <Link
                key={g.id}
                href={`/tierlist/${g.id}`}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border border-border-subtle bg-surface/60 hover:border-border-strong transition-colors"
                style={{ color: g.color }}
              >
                <GamemodeIcon icon={g.icon} className="w-4 h-4" />
                <span className="text-sm font-medium text-text-primary">{g.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-0.5">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block px-3 py-2 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="space-y-14 min-w-0">
          <section id="how-it-works" className="scroll-mt-24">
            <h2 className="font-display font-bold text-2xl mb-3">How Testing Works</h2>
            <div className="text-sm text-text-secondary leading-relaxed space-y-3 max-w-2xl">
              <p>
                Clash Tier testers open queues in the Discord server for a specific
                region and gamemode. Players join the queue, get pulled into a private
                testing channel, and play a short set against the tester.
              </p>
              <p>
                Once the test finishes, the tester submits a result: your new tier,
                your previous tier, and feedback on your gameplay. Your profile and
                the public tierlist update immediately.
              </p>
            </div>
          </section>

          <section id="joining-queue" className="scroll-mt-24">
            <h2 className="font-display font-bold text-2xl mb-3">Joining a Queue</h2>
            <div className="text-sm text-text-secondary leading-relaxed max-w-2xl">
              <ol className="list-decimal list-inside space-y-2">
                <li>Head to your region&apos;s queue channel in the Discord server.</li>
                <li>Check which gamemode the open queue is testing.</li>
                <li>Press <span className="text-text-primary font-medium">Join Queue</span> on the panel.</li>
                <li>Wait for a tester to pull you into a private testing channel.</li>
                <li>Play your set — you can leave the queue any time before you&apos;re called.</li>
              </ol>
            </div>
          </section>

          <section id="tier-definitions" className="scroll-mt-24">
            <h2 className="font-display font-bold text-2xl mb-3">Tier Definitions</h2>
            <p className="text-sm text-text-secondary max-w-2xl mb-4">
              Each gamemode has 10 tiers across 5 divisions. HT (High Tier) sits above
              LT (Low Tier) within the same division — HT1 is the highest tier overall.
            </p>
            <div className="border border-border-subtle rounded-3xl overflow-hidden">
              {tierOrder.map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-4 px-4 py-2.5 border-b border-border-subtle last:border-b-0 bg-surface/40"
                >
                  <TierBadge tier={t} />
                  <span className="text-xs text-text-muted">
                    Division {tiers[t].division} · {tiers[t].isHigh ? "High Tier" : "Low Tier"} · {tiers[t].points} pts
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section id="gamemodes" className="scroll-mt-24">
            <h2 className="font-display font-bold text-2xl mb-3">Gamemodes</h2>
            <div className="grid sm:grid-cols-2 gap-2.5 max-w-2xl">
              {gamemodes.map((g) => (
                <div key={g.id} className="flex items-start gap-3 border border-border-subtle rounded-2xl p-3 bg-surface/40">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${g.color}22`, color: g.color }}
                  >
                    <GamemodeIcon icon={g.icon} className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{g.label}</div>
                    <div className="text-xs text-text-muted mt-0.5">{g.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="tester-rules" className="scroll-mt-24">
            <h2 className="font-display font-bold text-2xl mb-3">Tester Rules</h2>
            <ul className="text-sm text-text-secondary leading-relaxed max-w-2xl list-disc list-inside space-y-2">
              <li>Testers may only run one active queue at a time.</li>
              <li>Every result must include honest, specific feedback — no copy-paste comments.</li>
              <li>Testers cannot test players they have a conflict of interest with.</li>
              <li>Daily test limits are enforced per tester and reset at a configured time.</li>
              <li>Abuse of testing privileges results in a review by staff and possible removal.</li>
            </ul>
          </section>

          <section id="player-rules" className="scroll-mt-24">
            <h2 className="font-display font-bold text-2xl mb-3">Player Rules</h2>
            <ul className="text-sm text-text-secondary leading-relaxed max-w-2xl list-disc list-inside space-y-2">
              <li>One account per player — duplicate profiles will be merged or restricted.</li>
              <li>No third-party clients or unfair advantages during a test.</li>
              <li>Be respectful to testers; disputes go through staff, not the tester directly.</li>
              <li>Cracked (offline-mode) accounts are supported using your Minecraft username.</li>
            </ul>
          </section>

          <section id="testing-process" className="scroll-mt-24">
            <h2 className="font-display font-bold text-2xl mb-3">Testing Process</h2>
            <div className="max-w-2xl border border-border-subtle rounded-3xl bg-surface/40 p-4 space-y-3">
              {[
                "Tester opens a queue for a region and gamemode",
                "Player joins the queue and waits to be called",
                "Tester pulls the player into a private testing channel",
                "Player and tester play the test set",
                "Tester submits a result with tier, feedback, and tip",
                "Player's profile, tier roles, and the public tierlist update",
              ].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-surface-2 border border-border-subtle text-xs flex items-center justify-center font-display font-semibold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-text-secondary">{step}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="faq" className="scroll-mt-24">
            <h2 className="font-display font-bold text-2xl mb-3">FAQ</h2>
            <div className="max-w-2xl space-y-4">
              {[
                { q: "How often can I get retested?", a: "Retest cooldowns are configurable per server. Check the queue channel topic for the current cooldown." },
                { q: "Do I need a premium Minecraft account?", a: "No — Clash Tier supports both premium and cracked (offline-mode) accounts using your username." },
                { q: "What happens if I disagree with a result?", a: "Open a ticket with staff. Testers' results stand unless staff finds a clear error or rule violation." },
                { q: "How are overall points calculated?", a: "Each tier is worth a fixed number of points; your overall score is the sum across every gamemode you've been tested in." },
              ].map((item) => (
                <div key={item.q} className="border border-border-subtle rounded-2xl p-4 bg-surface/40">
                  <div className="text-sm font-medium text-text-primary">{item.q}</div>
                  <div className="text-sm text-text-secondary mt-1.5">{item.a}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
    </div>
  );
}