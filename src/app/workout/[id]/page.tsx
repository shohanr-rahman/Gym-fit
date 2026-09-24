import { fetchWorkouts } from "@/lib/api";
import WorkoutDetail from "./WorkoutDetail";

export async function generateStaticParams() {
  const workouts = await fetchWorkouts();

  return workouts.map((workout) => ({
    id: String(workout.id),
  }));
}

export default function WorkoutPage() {
  return <WorkoutDetail />;
}