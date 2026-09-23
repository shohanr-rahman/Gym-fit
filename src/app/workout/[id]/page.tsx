"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { PlusCircle, Bookmark, Loader2 } from "lucide-react";
import { Workout } from "@/types/workout";
import { fetchWorkouts } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundFlag, setNotFoundFlag] = useState(false);

  const { addToPlan, addToSaved, isInPlan, isInSaved, todaysPlan } = usePlan();

  useEffect(() => {
    fetchWorkouts()
      .then((data) => {
        const found = data.find((w) => w.id === id);
        if (!found) {
          setNotFoundFlag(true);
        } else {
          setWorkout(found);
        }
      })
      .catch(() => setNotFoundFlag(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="flex-1 bg-black flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 text-[#ccff00] animate-spin" />
      </main>
    );
  }

  if (notFoundFlag || !workout) {
    notFound();
  }

  const alreadyInPlan = isInPlan(workout!.id);
  const alreadyInSaved = isInSaved(workout!.id);
  const planFull = todaysPlan.length >= 5;

  const handleAddToPlan = () => {
    if (alreadyInPlan) return;
    const success = addToPlan(workout!);
    if (success) {
      toast.success("Added to today's plan");
    } else {
      toast.error("Today's plan is full (max 5)");
    }
  };

  const handleSave = () => {
    if (alreadyInSaved) return;
    addToSaved(workout!);
    toast.success("Saved for later");
  };

  const specs: [string, string][] = [
    ["EQUIPMENT", workout!.equipment],
    ["DIFFICULTY", workout!.difficulty],
    ["SETS", String(workout!.sets)],
    ["REPS", workout!.reps],
    ["DURATION", `${workout!.duration} min`],
    ["CALORIES", `${workout!.caloriesBurned} kcal`],
    ["RATING", String(workout!.rating)],
  ];

  return (
    <main className="flex-1 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-10">
        {/* Left - image */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#111]">
          <Image
            src={workout!.image}
            alt={workout!.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right - content */}
        <div>
          <h1 className="uppercase text-3xl sm:text-4xl font-bold mb-3">
            {workout!.name}
          </h1>
          <p className="text-white/60 mb-4">{workout!.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {workout!.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="text-xs font-bold uppercase tracking-wide bg-white/10 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Key specs */}
          <div className="border border-white/10 rounded-xl overflow-hidden mb-8">
            {specs.map(([label, value], i) => (
              <div
                key={label}
                className={`flex justify-between px-4 py-3 text-sm ${
                  i % 2 === 0 ? "bg-[#0d0d0d]" : "bg-[#111]"
                }`}
              >
                <span className="text-white/50 font-medium">{label}</span>
                <span className="text-white font-semibold">{value}</span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <h2 className="uppercase font-bold text-lg mb-3">Instructions</h2>
          <ol className="space-y-3 mb-8">
            {workout!.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-white/70">
                <span className="text-[#ccff00] font-bold">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAddToPlan}
              disabled={alreadyInPlan || planFull}
              className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-sm px-6 py-3 rounded-full hover:bg-[#b8e600] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <PlusCircle className="w-4 h-4" />
              {alreadyInPlan ? "Added to plan" : "Add to today's plan"}
            </button>
            <button
              onClick={handleSave}
              disabled={alreadyInSaved}
              className="inline-flex items-center gap-2 border border-white/30 text-white font-bold text-sm px-6 py-3 rounded-full hover:border-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Bookmark className="w-4 h-4" />
              {alreadyInSaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}