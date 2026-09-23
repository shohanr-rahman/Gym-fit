import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types/workout";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#ccff00]/50 transition-colors flex flex-col"
    >
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold uppercase tracking-wide bg-white/10 text-white/80 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-white font-bold uppercase text-sm leading-snug">
          {workout.name}
        </h3>
        <p className="text-white/50 text-xs">{workout.equipment}</p>
        <div className="mt-auto pt-2 flex items-center gap-4 text-white/60 text-xs">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-[#ccff00]" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}