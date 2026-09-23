"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Workout } from "@/types/workout";

interface PlanContextType {
  todaysPlan: Workout[];
  saved: Workout[];
  doneIds: number[];
  loaded: boolean;
  addToPlan: (workout: Workout) => boolean;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);
const PLAN_LIMIT = 5;

export function PlanProvider({ children }: { children: ReactNode }) {
  const [todaysPlan, setTodaysPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem("fitlog-plan");
      const s = localStorage.getItem("fitlog-saved");
      const d = localStorage.getItem("fitlog-done");
      if (p) setTodaysPlan(JSON.parse(p));
      if (s) setSaved(JSON.parse(s));
      if (d) setDoneIds(JSON.parse(d));
    } catch (e) {
      console.error("Failed to load plan data", e);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("fitlog-plan", JSON.stringify(todaysPlan));
  }, [todaysPlan, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem("fitlog-done", JSON.stringify(doneIds));
  }, [doneIds, loaded]);

  const addToPlan = (workout: Workout) => {
    if (todaysPlan.some((w) => w.id === workout.id)) return true;
    if (todaysPlan.length >= PLAN_LIMIT) return false;
    setTodaysPlan((prev) => [...prev, workout]);
    return true;
  };

  const addToSaved = (workout: Workout) => {
    setSaved((prev) =>
      prev.some((w) => w.id === workout.id) ? prev : [...prev, workout]
    );
  };

  const removeFromPlan = (id: number) =>
    setTodaysPlan((prev) => prev.filter((w) => w.id !== id));

  const removeFromSaved = (id: number) =>
    setSaved((prev) => prev.filter((w) => w.id !== id));

  const markAsDone = (id: number) =>
    setDoneIds((prev) => (prev.includes(id) ? prev : [...prev, id]));

  const isInPlan = (id: number) => todaysPlan.some((w) => w.id === id);
  const isInSaved = (id: number) => saved.some((w) => w.id === id);
  const isDone = (id: number) => doneIds.includes(id);

  return (
    <PlanContext.Provider
      value={{
        todaysPlan,
        saved,
        doneIds,
        loaded,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        isInPlan,
        isInSaved,
        isDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}