import Hero from "@/components/Hero";
import Library from "@/components/Library";

export default function Home() {
  return (
    <main className="flex-1 bg-black">
      <Hero />
      <Library />
    </main>
  );
}