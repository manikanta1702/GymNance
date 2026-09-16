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
  TriangleAlert,
} from "lucide-react";

import exercises from "../data/exercises";

export default function ExerciseDetails() {
  const { id } = useParams();

  const exercise = useMemo(() => {
    return exercises.find((item) => item.id === Number(id));
  }, [id]);

  if (!exercise) {
    return (
      <div className="min-h-screen bg-[#070609] px-5 py-10 text-[#F7F3EA] sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Dumbbell
            size={40}
            className="mx-auto text-[#D4AF37]"
          />

          <h1 className="mt-5 text-3xl font-black">
            Exercise not found
          </h1>

          <p className="mt-3 text-sm text-[#8F8998]">
            The exercise you're looking for doesn't exist.
          </p>

          <Link
            to="/app/exercises"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#070609] transition hover:bg-[#F3D58A]"
          >
            <ArrowLeft size={16} />
            Back to Exercises
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070609] px-5 py-8 text-[#F7F3EA] sm:px-8 lg:px-10">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute right-[-180px] top-[-180px] h-[450px] w-[450px] rounded-full bg-purple-900/15 blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-200px] left-[-150px] h-[450px] w-[450px] rounded-full bg-[#D4AF37]/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Back */}
        <Link
          to="/app/exercises"
          className="inline-flex items-center gap-2 text-sm text-[#8F8998] transition hover:text-[#D4AF37]"
        >
          <ArrowLeft size={16} />
          Back to Exercise Library
        </Link>

        {/* Hero */}
        <section className="mt-7 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">

          {/* Video / Visual */}
          <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#D4AF37]/10 via-white/[0.025] to-purple-900/10">

            <div className="aspect-video flex items-center justify-center">

              {exercise.videoUrl ? (
                <iframe
                  src={exercise.videoUrl}
                  title={`${exercise.name} demonstration`}
                  className="h-full w-full"
                  allowFullScreen
                />
              ) : (
                <div className="px-6 text-center">

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 shadow-[0_0_45px_rgba(212,175,55,0.08)]">
                    <Play
                      size={28}
                      fill="currentColor"
                      className="ml-1 text-[#D4AF37]"
                    />
                  </div>

                  <p className="mt-5 text-lg font-bold">
                    Exercise Demonstration
                  </p>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#8F8998]">
                    A demonstration video for this exercise will be available
                    here.
                  </p>

                  <span className="mt-4 inline-block rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-[#5E5964]">
                    Video coming soon
                  </span>

                </div>
              )}

            </div>

          </div>

          {/* Exercise Summary */}
          <div className="flex flex-col justify-center">

            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
              {exercise.muscle}
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              {exercise.name}
            </h1>

            <p className="mt-5 text-sm leading-relaxed text-[#8F8998] sm:text-base">
              {exercise.description}
            </p>

            {/* Info */}
            <div className="mt-7 grid grid-cols-2 gap-3">

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <Dumbbell
                  size={18}
                  className="text-[#D4AF37]"
                />

                <p className="mt-3 text-[10px] uppercase tracking-wider text-[#5E5964]">
                  Equipment
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {exercise.equipment}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <Clock3
                  size={18}
                  className="text-[#D4AF37]"
                />

                <p className="mt-3 text-[10px] uppercase tracking-wider text-[#5E5964]">
                  Duration
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {exercise.duration}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <Target
                  size={18}
                  className="text-[#D4AF37]"
                />

                <p className="mt-3 text-[10px] uppercase tracking-wider text-[#5E5964]">
                  Difficulty
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {exercise.difficulty}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <Dumbbell
                  size={18}
                  className="text-[#D4AF37]"
                />

                <p className="mt-3 text-[10px] uppercase tracking-wider text-[#5E5964]">
                  Category
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {exercise.category}
                </p>
              </div>

            </div>

            {/* Future action */}
            <button
              type="button"
              className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-5 py-3.5 text-sm font-bold text-[#D4AF37] transition hover:bg-[#D4AF37]/15"
            >
              Add to Workout
              <ArrowRight size={17} />
            </button>

          </div>

        </section>

        {/* Main Content */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* Muscle Focus */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-7">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/15 bg-[#D4AF37]/5">
                <Target
                  size={19}
                  className="text-[#D4AF37]"
                />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
                  Muscle Focus
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  What does it train?
                </h2>
              </div>
            </div>

            <div className="mt-6">

              <p className="text-[10px] uppercase tracking-wider text-[#5E5964]">
                Primary Muscles
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {exercise.primaryMuscles?.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-lg border border-[#D4AF37]/15 bg-[#D4AF37]/5 px-3 py-2 text-xs font-medium text-[#D4AF37]"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

            </div>

            <div className="mt-5">

              <p className="text-[10px] uppercase tracking-wider text-[#5E5964]">
                Secondary Muscles
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {exercise.secondaryMuscles?.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-lg bg-white/[0.04] px-3 py-2 text-xs text-[#8F8998]"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

            </div>

            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-black/20 p-4">
              <p className="text-sm leading-relaxed text-[#8F8998]">
                {exercise.muscleExplanation}
              </p>
            </div>

          </div>

          {/* How To Perform */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-7">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/15 bg-[#D4AF37]/5">
                <CheckCircle2
                  size={19}
                  className="text-[#D4AF37]"
                />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
                  Technique
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  How to perform
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {exercise.steps?.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-xl border border-white/[0.06] bg-black/20 p-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-xs font-bold text-[#D4AF37]">
                    {index + 1}
                  </span>

                  <p className="pt-1 text-sm leading-relaxed text-[#8F8998]">
                    {step}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </section>

        {/* Tips + Mistakes */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* Form Tips */}
          <div className="rounded-3xl border border-purple-400/10 bg-purple-500/[0.035] p-6 sm:p-7">

            <p className="text-[10px] uppercase tracking-[0.2em] text-purple-300">
              Form Tips
            </p>

            <h2 className="mt-2 text-xl font-bold">
              Train with control
            </h2>

            <div className="mt-5 space-y-3">
              {exercise.tips?.map((tip, index) => (
                <div
                  key={index}
                  className="flex gap-3"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-[#D4AF37]"
                  />

                  <p className="text-sm leading-relaxed text-[#8F8998]">
                    {tip}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Common Mistakes */}
          <div className="rounded-3xl border border-red-400/10 bg-red-400/[0.025] p-6 sm:p-7">

            <p className="text-[10px] uppercase tracking-[0.2em] text-red-300">
              Avoid These
            </p>

            <h2 className="mt-2 text-xl font-bold">
              Common mistakes
            </h2>

            <div className="mt-5 space-y-3">
              {exercise.commonMistakes?.map((mistake, index) => (
                <div
                  key={index}
                  className="flex gap-3"
                >
                  <TriangleAlert
                    size={17}
                    className="mt-0.5 shrink-0 text-red-300"
                  />

                  <p className="text-sm leading-relaxed text-[#8F8998]">
                    {mistake}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </section>

        {/* AI Coach */}
        <section className="relative mt-6 overflow-hidden rounded-3xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#D4AF37]/10 via-white/[0.025] to-purple-900/10 p-6 sm:p-8">

          <div className="pointer-events-none absolute right-[-80px] top-[-100px] h-64 w-64 rounded-full bg-purple-900/15 blur-[90px]" />

          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
                GymNance AI Coach
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Check your form with AI.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#8F8998]">
                Use your camera to receive movement feedback and technique
                guidance while you exercise.
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-xl bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-[#070609] transition hover:bg-[#F3D58A]"
            >
              AI Form Check — Coming Soon
            </button>

          </div>

        </section>

        {/* Bottom Navigation */}
        <div className="flex justify-between gap-4 py-8">

          <Link
            to="/app/exercises"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm text-[#8F8998] transition hover:text-[#F7F3EA]"
          >
            <ArrowLeft size={16} />
            All Exercises
          </Link>

          <Link
            to="/app/workouts"
            className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37]/15 bg-[#D4AF37]/5 px-4 py-3 text-sm text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
          >
            Workouts
            <ArrowRight size={16} />
          </Link>

        </div>

      </div>
    </div>
  );
}