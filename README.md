# FitLog — Workout Library

FitLog is a no-nonsense gym companion built with Next.js. Browse a library of 12 workouts, view detailed instructions, build today's workout plan, save lifts for later, and track your progress — all in a clean, responsive interface.

## 🛠️ Technologies Used

- **Next.js 16** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **lucide-react** — icons
- **react-hot-toast** — toast notifications
- **localStorage** — persisting plan/saved data

## ✨ Key Features

1. **Workout Library** — 12 workouts from a live API, shown in a responsive 3x4 grid with tags, equipment, duration, calories, rating.
2. **Workout Detail Pages** — dynamic routes (`/workout/[id]`) with full instructions, key specs, Add to Plan / Save for Later.
3. **My Plan Page** — live stats (Exercises, Minutes, Calories), tabbed Today's Plan / Saved, Mark as Done / Remove.
4. **Sort by Duration, Calories, or Rating** — on both Library and My Plan pages.
5. **Search** — filter workouts by name or muscle group on the Library page.
6. **Persistent State** — plan/saved data stored in `localStorage`, survives page reload.
7. **Toast Notifications & Custom 404** — feedback on every action, plus a custom not-found page.

## 🚀 Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000).

## 🌐 Live Demo

[https://gym-fit-nu.vercel.app](https://gym-fit-nu.vercel.app)