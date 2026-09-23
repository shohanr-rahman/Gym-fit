import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 bg-black text-white flex flex-col items-center justify-center text-center px-4 py-32">
      <h1 className="text-6xl font-bold text-[#ccff00] mb-4">404</h1>
      <p className="uppercase font-bold text-xl mb-2">Page not found</p>
      <p className="text-white/50 mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block bg-[#ccff00] text-black font-bold text-sm px-6 py-3 rounded-full hover:bg-[#b8e600] transition-colors"
      >
        Go to workouts
      </Link>
    </main>
  );
}