"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Workout } from "@/types/workout";
import { fetchWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";

type SortKey = "duration" | "caloriesBurned" | "rating";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "caloriesBurned", label: "Calories" },
  { key: "rating", label: "Rating" },
];

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchWorkouts()
      .then(setWorkouts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => b[sortKey] - a[sortKey]);

  return (
    <section id="library" className="bg-black text-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="uppercase text-3xl sm:text-4xl font-bold mb-2">
              The Library
            </h2>
            <p className="text-white/50">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort dropdown */}
          <div className="relative">
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

        {loading && (
          <div className="flex justify-center py-20 text-white/60 animate-pulse">
            Loading workouts…
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-20 text-white/60">
            Something went wrong. Please try again later.
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}