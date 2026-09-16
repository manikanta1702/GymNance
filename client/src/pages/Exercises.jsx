import { useMemo, useState } from "react";
import {Link} from "react-router-dom";
import {
  Search,
  Dumbbell,
  Clock3,
  Target,
  ChevronRight,
  X,
} from "lucide-react";

import exercises from "../data/exercises";

const filters = [
  "All",
  "Chest",
  "Back",
  "Legs",
  "Shoulders",
  "Arms",
  "Core",
  "Full Body"
];

export default function Exercises() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedExercise, setSelectedExercise] = useState(null);

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      const matchesFilter =
        activeFilter === "All" || exercise.muscle === activeFilter;

      const searchText = search.toLowerCase();

      const matchesSearch =
        exercise.name.toLowerCase().includes(searchText) ||
        exercise.muscle.toLowerCase().includes(searchText) ||
        exercise.equipment.toLowerCase().includes(searchText);

      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070609] px-5 py-8 text-[#F7F3EA] sm:px-8 lg:px-10">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute right-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-purple-900/15 blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-200px] left-[-150px] h-[420px] w-[420px] rounded-full bg-[#D4AF37]/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
            Exercise Library
          </p>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                Train with{" "}
                <span className="text-[#D4AF37]">purpose.</span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#8F8998] sm:text-base">
                Explore exercises, discover new movements, and build stronger
                workouts with GymNance.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#5E5964]">
              <Dumbbell size={15} className="text-[#D4AF37]" />
              {filteredExercises.length} exercises
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="mb-5">
          <div className="relative max-w-2xl">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5E5964]"
            />

            <input
              type="text"
              placeholder="Search exercises, muscles, equipment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-14 w-full rounded-2xl border border-white/[0.08] bg-white/[0.025] pl-12 pr-5 text-sm text-[#F7F3EA] outline-none backdrop-blur-xl transition-all placeholder:text-[#5E5964] focus:border-[#D4AF37]/30 focus:bg-white/[0.04]"
            />
          </div>
        </section>

        {/* Filters */}
        <section className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                activeFilter === filter
                  ? "border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]"
                  : "border-white/[0.08] bg-white/[0.02] text-[#8F8998] hover:border-white/[0.15] hover:text-[#F7F3EA]"
              }`}
            >
              {filter}
            </button>
          ))}
        </section>

        {/* Exercise Grid */}
        {filteredExercises.length > 0 ? (
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredExercises.map((exercise) => (
              <Link
                key={exercise.id}
                to={`/app/exercises/${exercise.id}`}
                className="group text-left"
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/25 hover:bg-white/[0.04]">
                  {/* Glow */}
                  <div className="pointer-events-none absolute right-[-60px] top-[-60px] h-32 w-32 rounded-full bg-purple-900/10 blur-3xl transition-all duration-300 group-hover:bg-purple-900/20" />

                  <div className="relative z-10">
                    {/* Top row */}
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4AF37]/10 bg-[#D4AF37]/5">
                        <Dumbbell
                          size={21}
                          className="text-[#D4AF37]"
                        />
                      </div>

                      <span className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1 text-[10px] text-[#8F8998]">
                        {exercise.difficulty}
                      </span>
                    </div>

                    {/* Name */}
                    <h2 className="mt-5 text-lg font-bold transition-colors group-hover:text-[#D4AF37]">
                      {exercise.name}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#8F8998]">
                      {exercise.description}
                    </p>

                    {/* Info */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[10px] text-[#8F8998]">
                        {exercise.muscle}
                      </span>

                      <span className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[10px] text-[#8F8998]">
                        {exercise.equipment}
                      </span>
                    </div>

                    {/* Footer */}
                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                      <span className="flex items-center gap-1.5 text-xs text-[#5E5964]">
                        <Clock3 size={14} />
                        {exercise.duration}
                      </span>

                      <span className="flex items-center gap-1 text-xs font-semibold text-[#D4AF37]">
                        View
                        <ChevronRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-12 text-center">
            <Dumbbell
              size={34}
              className="mx-auto text-[#5E5964]"
            />

            <h2 className="mt-4 text-xl font-bold">
              No exercises found
            </h2>

            <p className="mt-2 text-sm text-[#8F8998]">
              Try another exercise name, muscle group, or equipment.
            </p>
          </div>
        )}
      </div>

      {/* Exercise Details Modal */}
      {selectedExercise && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-md"
          onClick={() => setSelectedExercise(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[#D4AF37]/15 bg-[#0C0B10] p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedExercise(null)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-[#8F8998] transition hover:text-[#F7F3EA]"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/15 bg-[#D4AF37]/5">
              <Dumbbell size={24} className="text-[#D4AF37]" />
            </div>

            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
              {selectedExercise.muscle}
            </p>

            <h2 className="mt-2 pr-10 text-2xl font-black sm:text-3xl">
              {selectedExercise.name}
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-[#8F8998]">
              {selectedExercise.description}
            </p>
            {/* How To Perform */}
<div className="mt-7">
  <div className="flex items-center gap-3">
    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D4AF37]/15 bg-[#D4AF37]/5">
      <span className="text-sm font-bold text-[#D4AF37]">01</span>
    </div>

    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
        Technique
      </p>

      <h3 className="text-lg font-bold">
        How to perform
      </h3>
    </div>
  </div>

  <div className="mt-5 space-y-3">
    {selectedExercise.steps.map((step, index) => (
      <div
        key={index}
        className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
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

{/* Form Tips */}
<div className="mt-7 rounded-2xl border border-purple-400/10 bg-purple-500/[0.04] p-5">
  <p className="text-[10px] uppercase tracking-[0.2em] text-purple-300">
    Form Tips
  </p>

  <div className="mt-4 space-y-2">
    {selectedExercise.tips.map((tip, index) => (
      <p
        key={index}
        className="flex gap-2 text-sm leading-relaxed text-[#8F8998]"
      >
        <span className="text-[#D4AF37]">•</span>
        {tip}
      </p>
    ))}
  </div>
</div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <Target size={17} className="text-[#D4AF37]" />
                <p className="mt-3 text-[10px] uppercase tracking-wider text-[#5E5964]">
                  Muscle
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {selectedExercise.muscle}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <Dumbbell size={17} className="text-[#D4AF37]" />
                <p className="mt-3 text-[10px] uppercase tracking-wider text-[#5E5964]">
                  Equipment
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {selectedExercise.equipment}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <Clock3 size={17} className="text-[#D4AF37]" />
                <p className="mt-3 text-[10px] uppercase tracking-wider text-[#5E5964]">
                  Duration
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {selectedExercise.duration}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <Target size={17} className="text-[#D4AF37]" />
                <p className="mt-3 text-[10px] uppercase tracking-wider text-[#5E5964]">
                  Level
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {selectedExercise.difficulty}
                </p>
              </div>
            </div>
            {/* Muscle Information */}
<div className="mt-7">
  <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
    Muscle Focus
  </p>

  <h3 className="mt-2 text-lg font-bold">
    What muscles does it train?
  </h3>

  <div className="mt-4 grid gap-3 sm:grid-cols-2">
    <div className="rounded-2xl border border-[#D4AF37]/10 bg-[#D4AF37]/[0.03] p-4">
      <p className="text-[10px] uppercase tracking-wider text-[#5E5964]">
        Primary
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {selectedExercise.primaryMuscles?.map((muscle) => (
          <span
            key={muscle}
            className="rounded-lg border border-[#D4AF37]/10 bg-[#D4AF37]/5 px-2.5 py-1.5 text-xs text-[#D4AF37]"
          >
            {muscle}
          </span>
        ))}
      </div>
    </div>

    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
      <p className="text-[10px] uppercase tracking-wider text-[#5E5964]">
        Secondary
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {selectedExercise.secondaryMuscles?.map((muscle) => (
          <span
            key={muscle}
            className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-xs text-[#8F8998]"
          >
            {muscle}
          </span>
        ))}
      </div>
    </div>
  </div>

  <div className="mt-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
    <p className="text-sm leading-relaxed text-[#8F8998]">
      {selectedExercise.muscleExplanation}
    </p>
  </div>
</div>

{/* Common Mistakes */}
<div className="mt-7">
  <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
    Technique
  </p>

  <h3 className="mt-2 text-lg font-bold">
    Common mistakes
  </h3>

  <div className="mt-4 space-y-2">
    {selectedExercise.commonMistakes?.map((mistake, index) => (
      <div
        key={index}
        className="flex gap-3 rounded-xl border border-red-400/10 bg-red-400/[0.03] p-3"
      >
        <span className="text-red-300">×</span>

        <p className="text-sm leading-relaxed text-[#8F8998]">
          {mistake}
        </p>
      </div>
    ))}
  </div>
</div>

{/* Video */}
<div className="mt-7">
  <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
    Demonstration
  </p>

  <h3 className="mt-2 text-lg font-bold">
    Watch how to perform
  </h3>

  <div className="mt-4 flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40">
    {selectedExercise.videoUrl ? (
      <iframe
        src={selectedExercise.videoUrl}
        title={`${selectedExercise.name} demonstration`}
        className="h-full w-full"
        allowFullScreen
      />
    ) : (
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10">
          <Dumbbell size={22} className="text-[#D4AF37]" />
        </div>

        <p className="mt-4 text-sm font-semibold">
          Video demonstration coming soon
        </p>

        <p className="mt-1 text-xs text-[#5E5964]">
          GymNance exercise videos will be added here.
        </p>
      </div>
    )}
  </div>
</div>
            <button
              onClick={() => setSelectedExercise(null)}
              className="mt-6 w-full rounded-xl bg-[#D4AF37] py-3.5 text-sm font-bold text-[#070609] transition hover:bg-[#F3D58A]"
            >
              Close Exercise
            </button>
          </div>
        </div>
      )}
    </div>
  );
}