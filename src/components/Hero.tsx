import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        {/* Left - text content */}
        <div>
          <p className="text-[#ccff00] text-sm font-bold tracking-[0.2em] mb-4">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-[Oswald,sans-serif] uppercase text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="text-white/60 text-base sm:text-lg mb-8 max-w-md">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <Link
            href="#library"
            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-sm tracking-wide px-6 py-3 rounded-full hover:bg-[#b8e600] transition-colors"
          >
            BROWSE WORKOUTS
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right - hero image */}
        <div className="relative w-full aspect-square md:aspect-[4/5]">
          <Image
            src="/hero-image.png"
            alt="Athlete training"
            fill
            priority
            className="object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}