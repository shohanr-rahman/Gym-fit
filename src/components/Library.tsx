"use client";

import { useEffect, useState } from "react";
import { Workout } from "@/types/workout";
import { fetchWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchWorkouts()
      .then(setWorkouts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="library" className="bg-black text-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="uppercase text-3xl sm:text-4xl font-bold mb-2">
          The Library
        </h2>
        <p className="text-white/50 mb-10">
          Twelve lifts covering every major muscle group.
        </p>

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
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}