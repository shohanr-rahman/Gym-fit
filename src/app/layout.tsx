import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "A dark, no-nonsense gym companion. Pick a lift, lock it into today's plan, and track your week's work.",
  keywords: ["workout", "gym", "fitness", "exercise tracker", "fitlog"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PlanProvider>
          <Navbar />

          {children}

          <Footer />

          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: "#111",
                color: "#fff",
                border: "1px solid #333",
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}