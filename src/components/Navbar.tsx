"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import GlobalSearch from "./GlobalSearch";

const links = [
  { href: "/", label: "Home" },
  { href: "/tierlist", label: "Tierlist" },
  { href: "/testers", label: "Testers" },
  { href: "/guide", label: "Guide" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-bg/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="rounded-xl overflow-hidden ring-1 ring-white/10 shadow-[0_0_18px_rgba(239,59,77,0.25)] group-hover:shadow-[0_0_22px_rgba(239,59,77,0.4)] transition-shadow">
              <Image src="/logo.png" alt="Clash Tier" width={34} height={34} />
            </div>
            <span className="font-display font-bold text-lg tracking-wide text-text-primary">
              CLASH<span className="text-gradient-brand">TIER</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-surface/60 border border-border-subtle rounded-full p-1">
            {links.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    active
                      ? "text-bg bg-gradient-to-r from-red to-amber shadow-[0_0_14px_rgba(239,59,77,0.3)]"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block w-64">
            <GlobalSearch compact />
          </div>

          <div className="hidden md:block">
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red to-rose hover:brightness-110 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all shadow-lg shadow-red-glow/20"
            >
              Discord
            </a>
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 text-text-secondary"
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border-subtle bg-bg px-4 py-4 space-y-3">
          <GlobalSearch compact />
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red to-rose text-white text-sm font-semibold px-4 py-2.5 rounded-full"
            >
              Join Discord
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
