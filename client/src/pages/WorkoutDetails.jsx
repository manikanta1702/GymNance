import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Dumbbell,
  Play,
  Target,
  Users,
} from "lucide-react";

import workouts from "../data/workouts";
import exercises from "../data/exercises";

export default function WorkoutDetails() {
  const { id } = useParams();

  const workout = useMemo(() => {
    return workouts.find((item) => item.id === Number(id));
  }, [id]);

  const workoutExercises = useMemo(() => {
    if (!workout) return [];

    return workout.exercises
      .map((exerciseId) =>
        exercises.find((exercise) => exercise.id === exerciseId)
      )
      .filter(Boolean);
  }, [workout]);

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#070609] px-5 py-10 text-[#F7F3EA] sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Dumbbell size={40} className="mx-auto text-[#D4AF37]" />

          <h1 className="mt-5 text-3xl font-black">
            Workout not found
          </h1>

          <p className="mt-3 text-sm text-[#8F8998]">
            The workout you're looking for doesn't exist.
          </p>

          <Link
            to="/app/workouts"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#070609] transition hover:bg-[#F3D58A]"
          >
            <ArrowLeft size={16} />
            Back to Workouts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070609] px-5 py-8 text-[#F7F3EA] sm:px-8 lg:px-10">
      {/* Background glow */}
      <div className="pointer-events-none absolute right-[-180px] top-[-180px] h-[450px] w-[450px] rounded-full bg-purple-900/15 blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-200px] left-[-150px] h-[450px] w-[450px] rounded-full bg-[#D4AF37]/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Back */}
        <Link
          to="/app/workouts"
          className="inline-flex items-center gap-2 text-sm text-[#8F8998] transition hover:text-[#D4AF37]"
        >
          <ArrowLeft size={16} />
          Back to Workout Library
        </Link>

        {/* Hero */}
        <section className="mt-7 overflow-hidden rounded-3xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#D4AF37]/10 via-white/[0.025] to-purple-900/10 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                {workout.category}
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                {workout.name}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#8F8998] sm:text-base">
                {workout.description}
              </p>

              {/* Focus */}
              <div className="mt-6 flex flex-wrap gap-2">
                {workout.focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-[#D4AF37]/15 bg-[#D4AF37]/5 px-3 py-2 text-xs font-medium text-[#D4AF37]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
                <Clock3 size={19} className="text-[#D4AF37]" />

                <p className="mt-4 text-[10px] uppercase tracking-wider text-[#5E5964]">
                  Duration
                </p>

                <p className="mt-1 text-lg font-bold">
                  {workout.duration}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
                <Target size={19} className="text-[#D4AF37]" />

                <p className="mt-4 text-[10px] uppercase tracking-wider text-[#5E5964]">
                  Level
                </p>

                <p className="mt-1 text-lg font-bold">
                  {workout.level}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
                <Users size={19} className="text-[#D4AF37]" />

                <p className="mt-4 text-[10px] uppercase tracking-wider text-[#5E5964]">
                  Schedule
                </p>

                <p className="mt-1 text-sm font-bold">
                  {workout.daysPerWeek}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
                <Dumbbell size={19} className="text-[#D4AF37]" />

                <p className="mt-4 text-[10px] uppercase tracking-wider text-[#5E5964]">
                  Exercises
                </p>

                <p className="mt-1 text-lg font-bold">
                  {workoutExercises.length}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Exercise list */}
        <section className="mt-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                Workout Plan
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Exercises
              </h2>
            </div>

            <span className="text-xs text-[#5E5964]">
              {workoutExercises.length} movements
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {workoutExercises.map((exercise, index) => (
              <Link
                key={exercise.id}
                to={`/app/exercises/${exercise.id}`}
                className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-[#D4AF37]/20 hover:bg-white/[0.04]"
              >
                {/* Number */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/15 bg-[#D4AF37]/5 text-sm font-black text-[#D4AF37]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Icon */}
                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/[0.06] sm:flex">
                  <Dumbbell
                    size={18}
                    className="text-[#8F8998]"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold sm:text-base">
                    {exercise.name}
                  </h3>

                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-[#5E5964]">
                    <span>{exercise.muscle}</span>
                    <span>•</span>
                    <span>{exercise.difficulty}</span>
                    <span>•</span>
                    <span>{exercise.duration}</span>
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight
                  size={18}
                  className="shrink-0 text-[#5E5964] transition group-hover:translate-x-1 group-hover:text-[#D4AF37]"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Start Workout */}
        <section className="relative mt-8 overflow-hidden rounded-3xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#D4AF37]/10 via-white/[0.025] to-purple-900/10 p-6 sm:p-8">
          <div className="pointer-events-none absolute right-[-80px] top-[-100px] h-64 w-64 rounded-full bg-purple-900/15 blur-[90px]" />

          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                Ready?
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Start your workout.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#8F8998]">
                Follow the exercises in order and track your sets, reps,
                weight, and progress.
              </p>
            </div>

            <Link
              to={`/app/workouts/${workout.id}/session`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-[#070609] transition hover:bg-[#F3D58A]"
            >
              <Play size={16} fill="currentColor" />
              Start Workout
            </Link>
          </div>
        </section>

        {/* Bottom navigation */}
        <div className="flex justify-between gap-4 py-8">
          <Link
            to="/app/workouts"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm text-[#8F8998] transition hover:text-[#F7F3EA]"
          >
            <ArrowLeft size={16} />
            All Workouts
          </Link>

          <Link
            to="/app/exercises"
            className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37]/15 bg-[#D4AF37]/5 px-4 py-3 text-sm text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
          >
            Exercise Library
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}