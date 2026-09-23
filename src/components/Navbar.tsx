"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Dumbbell } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { todaysPlan, saved } = usePlan();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Workout", href: "/" },
    { name: "My Plan", href: "/my-plan" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo - left */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Dumbbell className="w-6 h-6 text-[#ccff00]" />
          <span className="text-white font-bold text-lg tracking-wide">
            FITLOG
          </span>
        </Link>

        {/* Nav links - middle (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? "text-[#ccff00]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Badges - right (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold text-black"
          >
            Plan <span>{todaysPlan.length}</span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-white/30 px-3 py-1 text-xs font-bold text-white"
          >
            Saved <span>{saved.length}</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 px-4 pb-4 pt-2 flex flex-col gap-4 bg-black">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium ${
                  isActive ? "text-[#ccff00]" : "text-white/70"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="flex items-center gap-3">
            <Link
              href="/my-plan"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1.5 rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold text-black"
            >
              Plan <span>{todaysPlan.length}</span>
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1.5 rounded-full border border-white/30 px-3 py-1 text-xs font-bold text-white"
            >
              Saved <span>{saved.length}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}