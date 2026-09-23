import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-[#ccff00]" />
          <span className="text-white font-bold tracking-wide">FITLOG</span>
        </div>
        <p className="text-white/40 text-sm text-center">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}