"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";
import { Clock, Flame, Star, CheckCircle2, X, ChevronDown } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";
import Image from "next/image";

type Tab = "plan" | "saved";
type SortKey = "duration" | "caloriesBurned" | "rating";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "caloriesBurned", label: "Calories" },
  { key: "rating", label: "Rating" },
];

export default function MyPlanPage() {
  const [tab, setTab] = useState<Tab>("plan");
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {
    todaysPlan,
    saved,
    loaded,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    isDone,
  } = usePlan();

  const rawList = tab === "plan" ? todaysPlan : saved;
  const list = [...rawList].sort((a, b) => b[sortKey] - a[sortKey]);

  const totalMinutes = todaysPlan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = todaysPlan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const handleRemove = (w: Workout) => {
    if (tab === "plan") removeFromPlan(w.id);
    else removeFromSaved(w.id);
    toast.success("Removed");
  };

  const handleMarkDone = (id: number) => {
    markAsDone(id);
    toast.success("Marked as done");
  };

  return (
    <main className="flex-1 bg-black text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="uppercase text-3xl sm:text-4xl font-bold mb-2">
          My Plan
        </h1>
        <p className="text-white/50 mb-8">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-[#111] border border-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-[#ccff00]">{todaysPlan.length}</p>
            <p className="text-xs text-white/50 uppercase mt-1">Exercises</p>
          </div>
          <div className="bg-[#111] border border-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-[#ccff00]">{totalMinutes}</p>
            <p className="text-xs text-white/50 uppercase mt-1">Minutes</p>
          </div>
          <div className="bg-[#111] border border-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-[#ccff00]">{totalCalories}</p>
            <p className="text-xs text-white/50 uppercase mt-1">Calories</p>
          </div>
        </div>

        {/* Tabs + Sort row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-white/10 pb-0">
          <div className="flex gap-2">
            <button
              onClick={() => setTab("plan")}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wide border-b-2 ${
                tab === "plan"
                  ? "border-[#ccff00] text-[#ccff00]"
                  : "border-transparent text-white/50"
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              onClick={() => setTab("saved")}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wide border-b-2 ${
                tab === "saved"
                  ? "border-[#ccff00] text-[#ccff00]"
                  : "border-transparent text-white/50"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Sort dropdown */}
          <div className="relative mb-3 sm:mb-0">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 hover:border-white/50 transition-colors"
            >
              Sort By:{" "}
              <span className="text-[#ccff00] font-bold">
                {sortOptions.find((o) => o.key === sortKey)?.label}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#111] border border-white/10 rounded-lg overflow-hidden z-10">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setSortKey(opt.key);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 ${
                      sortKey === opt.key ? "text-[#ccff00]" : "text-white/80"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Loading state */}
        {!loaded && (
          <div className="text-center py-20 text-white/60 animate-pulse">
            Loading workouts…
          </div>
        )}

        {/* Empty state */}
        {loaded && list.length === 0 && (
          <div className="text-center py-20">
            <p className="uppercase font-bold text-xl mb-2">Nothing here yet</p>
            <p className="text-white/50 mb-6">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#ccff00] text-black font-bold text-sm px-6 py-3 rounded-full hover:bg-[#b8e600] transition-colors"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {/* List */}
        {loaded && list.length > 0 && (
          <div className="flex flex-col gap-4">
            {list.map((w) => (
              <div
                key={w.id}
                className="flex items-center gap-4 bg-[#111] border border-white/10 rounded-xl p-4"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <Image src={w.image} alt={w.name} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold uppercase text-sm truncate">
                    {w.name}
                    {tab === "plan" && isDone(w.id) && (
                      <span className="ml-2 text-[#ccff00] text-xs">✓ Done</span>
                    )}
                  </h3>
                  <p className="text-white/50 text-xs">{w.equipment}</p>
                  <div className="flex gap-3 mt-1 text-white/50 text-xs">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {w.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3" /> {w.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#ccff00]" /> {w.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/workout/${w.id}`}
                    className="text-xs font-bold border border-white/30 px-3 py-2 rounded-full hover:border-white transition-colors"
                  >
                    View Details
                  </Link>
                  {tab === "plan" && !isDone(w.id) && (
                    <button
                      onClick={() => handleMarkDone(w.id)}
                      title="Mark as Done"
                      aria-label="Mark as done"
                      className="p-2 rounded-full border border-white/30 hover:border-[#ccff00] hover:text-[#ccff00] transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleRemove(w)}
                    title="Remove"
                    aria-label="Remove from list"
                    className="p-2 rounded-full border border-white/30 hover:border-red-400 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}