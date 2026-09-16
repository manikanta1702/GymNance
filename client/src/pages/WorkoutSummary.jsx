import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Dumbbell,
  Home,
  RotateCcw,
  Trophy,
} from "lucide-react";

export default function WorkoutSummary() {
  const location = useLocation();

  const summary = location.state?.summary || {
    workoutName: "Workout",
    exercisesCompleted: 0,
    totalExercises: 0,
    totalSets: 0,
    totalVolume: 0,
  };

  const completionPercentage =
    summary.totalExercises > 0
      ? Math.round(
          (summary.exercisesCompleted /
            summary.totalExercises) *
            100
        )
      : 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070609] px-5 py-8 text-[#F7F3EA] sm:px-8 lg:px-10">

      {/* Background */}
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-900/15 blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-200px] right-[-150px] h-[450px] w-[450px] rounded-full bg-[#D4AF37]/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* Success */}
        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 shadow-[0_0_60px_rgba(212,175,55,0.12)]">
            <Trophy
              size={34}
              className="text-[#D4AF37]"
            />
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            Workout Complete
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Great work.
          </h1>

          <p className="mt-3 text-sm text-[#8F8998]">
            You completed your{" "}
            {summary.workoutName} session.
          </p>

        </div>

        {/* Stats */}
        <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-center">

            <CheckCircle2
              size={20}
              className="mx-auto text-[#D4AF37]"
            />

            <p className="mt-3 text-2xl font-black">
              {summary.exercisesCompleted}
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-wider text-[#5E5964]">
              Exercises
            </p>

          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-center">

            <Dumbbell
              size={20}
              className="mx-auto text-[#D4AF37]"
            />

            <p className="mt-3 text-2xl font-black">
              {summary.totalSets}
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-wider text-[#5E5964]">
              Sets
            </p>

          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-center">

            <p className="text-2xl font-black text-[#D4AF37]">
              {summary.totalVolume}
            </p>

            <p className="mt-3 text-[9px] uppercase tracking-wider text-[#5E5964]">
              Volume
            </p>

          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-center">

            <p className="text-2xl font-black text-[#D4AF37]">
              {completionPercentage}%
            </p>

            <p className="mt-3 text-[9px] uppercase tracking-wider text-[#5E5964]">
              Completion
            </p>

          </div>

        </section>

        {/* Achievement */}
        <section className="relative mt-6 overflow-hidden rounded-3xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#D4AF37]/10 via-white/[0.025] to-purple-900/10 p-6 sm:p-8">

          <div className="pointer-events-none absolute right-[-80px] top-[-100px] h-64 w-64 rounded-full bg-purple-900/15 blur-[90px]" />

          <div className="relative z-10 text-center">

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              GymNance Achievement
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Session completed successfully.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#8F8998]">
              Every workout adds another step toward your
              goals. Keep your consistency going and build
              your streak.
            </p>

          </div>

        </section>

        {/* Actions */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">

          <Link
            to="/app/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3.5 text-sm font-bold text-[#070609] transition hover:bg-[#F3D58A]"
          >
            <Home size={16} />
            Dashboard
          </Link>

          <Link
            to="/app/workouts"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-3.5 text-sm font-semibold text-[#8F8998] transition hover:text-[#F7F3EA]"
          >
            <Dumbbell size={16} />
            Workouts
          </Link>

          <Link
            to="/app/exercises"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/15 bg-[#D4AF37]/5 px-5 py-3.5 text-sm font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
          >
            <RotateCcw size={16} />
            Exercises
          </Link>

        </div>

        <div className="flex justify-center py-8">

          <Link
            to="/app/workouts"
            className="inline-flex items-center gap-2 text-xs text-[#5E5964] transition hover:text-[#D4AF37]"
          >
            <ArrowLeft size={14} />
            Back to Workout Library
          </Link>

        </div>

      </div>
    </div>
  );
}