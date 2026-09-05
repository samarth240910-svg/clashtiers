import Link from "next/link";
import Image from "next/image";
import { gamemodes } from "@/data/gamemodes";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <Image src="/logo.png" alt="Clash Tier" width={28} height={28} className="rounded-xl" />
              <span className="font-display font-bold text-base tracking-wide">
                CLASH<span className="text-red">TIER</span>
              </span>
            </div>
            <p className="text-sm text-text-muted max-w-sm leading-relaxed">
              A competitive Minecraft PvP tier-testing platform. Get evaluated by
              trusted testers, climb the rankings, and prove your skill across every gamemode.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Platform</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tierlist" className="text-text-secondary hover:text-text-primary transition-colors">Tierlist</Link></li>
              <li><Link href="/testers" className="text-text-secondary hover:text-text-primary transition-colors">Testers</Link></li>
              <li><Link href="/guide" className="text-text-secondary hover:text-text-primary transition-colors">Guide</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Gamemodes</div>
            <ul className="space-y-2 text-sm">
              {gamemodes.slice(0, 4).map((g) => (
                <li key={g.id}>
                  <Link href={`/tierlist/${g.id}`} className="text-text-secondary hover:text-text-primary transition-colors">
                    {g.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">© {new Date().getFullYear()} Clash Tier. Not affiliated with Mojang or Microsoft.</p>
          <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
            Join our Discord →
          </a>
        </div>
      </div>
    </footer>
  );
}
