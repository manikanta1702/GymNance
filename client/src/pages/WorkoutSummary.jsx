import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Dumbbell,
  Home,
  RotateCcw,
  Trophy,
} from "lucide-react";

import exercises from "../data/exercises";

export default function WorkoutSummary() {
  const location = useLocation();

  const summary = location.state?.summary || {
    workoutName: "Workout",
    exercisesCompleted: 0,
    totalExercises: 0,
    totalSets: 0,
    completedSets: 0,
    totalReps: 0,
    totalVolume: 0,
    exerciseSets: {},
  };

  const completionPercentage =
    summary.totalExercises > 0
      ? Math.round(
          (summary.exercisesCompleted /
            summary.totalExercises) *
            100
        )
      : 0;

  const exerciseBreakdown = Object.entries(
    summary.exerciseSets || {}
  )
    .map(([exerciseId, sets]) => {
      const exercise = exercises.find(
        (item) =>
          item.id === Number(exerciseId)
      );

      if (!exercise) return null;

      const completedSets = sets.filter(
        (set) => set.completed
      );

      const volume = sets.reduce(
        (total, set) => {
          const weight =
            Number(set.weight) || 0;

          const reps =
            Number(set.reps) || 0;

          return total + weight * reps;
        },
        0
      );

      return {
        exercise,
        sets,
        completedSets,
        volume,
      };
    })
    .filter(Boolean);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070609] px-5 py-8 text-[#F7F3EA] sm:px-8 lg:px-10">

      {/* Background */}
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-900/15 blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-200px] right-[-150px] h-[450px] w-[450px] rounded-full bg-[#D4AF37]/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-5xl">

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

        {/* Main stats */}
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
              {summary.completedSets}
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-wider text-[#5E5964]">
              Sets Done
            </p>

          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-center">

            <p className="text-2xl font-black text-[#D4AF37]">
              {summary.totalReps}
            </p>

            <p className="mt-3 text-[9px] uppercase tracking-wider text-[#5E5964]">
              Total Reps
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

        </section>

        {/* Completion */}
        <section className="mt-6 rounded-3xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#D4AF37]/10 via-white/[0.025] to-purple-900/10 p-6 sm:p-8">

          <div className="flex items-center justify-between gap-4">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                Session Progress
              </p>

              <h2 className="mt-2 text-xl font-black">
                {completionPercentage}% Complete
              </h2>

            </div>

            <p className="text-2xl font-black text-[#D4AF37]">
              {summary.exercisesCompleted}/
              {summary.totalExercises}
            </p>

          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/[0.06]">

            <div
              className="h-full rounded-full bg-[#D4AF37] transition-all"
              style={{
                width: `${completionPercentage}%`,
              }}
            />

          </div>

        </section>

        {/* Exercise breakdown */}
        <section className="mt-8">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Training Breakdown
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Exercise Summary
            </h2>

          </div>

          <div className="mt-5 space-y-3">

            {exerciseBreakdown.map(
              ({
                exercise,
                sets,
                completedSets,
                volume,
              }) => (

                <div
                  key={exercise.id}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/15 bg-[#D4AF37]/5">

                        <Dumbbell
                          size={18}
                          className="text-[#D4AF37]"
                        />

                      </div>

                      <div className="min-w-0">

                        <h3 className="truncate text-sm font-bold sm:text-base">
                          {exercise.name}
                        </h3>

                        <p className="mt-1 text-[10px] text-[#5E5964]">
                          {exercise.muscle}
                        </p>

                      </div>

                    </div>

                    <div className="text-right">

                      <p className="text-sm font-black text-[#D4AF37]">
                        {volume}
                      </p>

                      <p className="text-[9px] uppercase tracking-wider text-[#5E5964]">
                        Volume
                      </p>

                    </div>

                  </div>

                  {/* Set details */}
                  <div className="mt-4 space-y-2">

                    {sets.map(
                      (set, index) => (

                        <div
                          key={index}
                          className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${
                            set.completed
                              ? "border-[#D4AF37]/15 bg-[#D4AF37]/[0.04]"
                              : "border-white/[0.05] bg-black/20"
                          }`}
                        >

                          <span className="text-xs text-[#8F8998]">
                            Set {index + 1}
                          </span>

                          <span className="text-xs font-semibold">
                            {set.weight || 0} kg ×{" "}
                            {set.reps || 0} reps
                          </span>

                          <span>
                            {set.completed ? (
                              <CheckCircle2
                                size={16}
                                className="text-[#D4AF37]"
                              />
                            ) : (
                              <span className="text-[10px] text-[#5E5964]">
                                Not completed
                              </span>
                            )}
                          </span>

                        </div>

                      )
                    )}

                  </div>

                  <p className="mt-3 text-[10px] text-[#5E5964]">
                    {completedSets.length} of{" "}
                    {sets.length} sets completed
                  </p>

                </div>

              )
            )}

          </div>

        </section>

        {/* Achievement */}
        <section className="relative mt-8 overflow-hidden rounded-3xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#D4AF37]/10 via-white/[0.025] to-purple-900/10 p-6 sm:p-8">

          <div className="pointer-events-none absolute right-[-80px] top-[-100px] h-64 w-64 rounded-full bg-purple-900/15 blur-[90px]" />

          <div className="relative z-10 text-center">

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              GymNance Achievement
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Session logged successfully.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#8F8998]">
              Every completed set contributes to your
              progress. Keep training consistently and
              build your streak.
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