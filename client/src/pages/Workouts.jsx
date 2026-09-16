import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  Dumbbell,
  Flame,
  Search,
  Target,
  Users,
} from "lucide-react";

import workouts from "../data/workouts";

const filters = [
  "All",
  "Full Body",
  "Push",
  "Pull",
  "Legs",
  "Upper Body",
  "Core",
  "Strength",
  "Home",
];

export default function Workouts() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredWorkouts = useMemo(() => {
    return workouts.filter((workout) => {
      const matchesFilter =
        activeFilter === "All" || workout.category === activeFilter;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        workout.name.toLowerCase().includes(searchText) ||
        workout.description.toLowerCase().includes(searchText) ||
        workout.focus.some((item) =>
          item.toLowerCase().includes(searchText)
        );

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070609] px-5 py-8 text-[#F7F3EA] sm:px-8 lg:px-10">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute right-[-180px] top-[-180px] h-[450px] w-[450px] rounded-full bg-purple-900/15 blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-220px] left-[-180px] h-[500px] w-[500px] rounded-full bg-[#D4AF37]/5 blur-[160px]" />

      <div className="pointer-events-none absolute left-1/2 top-[40%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-purple-700/[0.03] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <section>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                GymNance Training
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                Workout Library
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#8F8998] sm:text-base">
                Choose a structured workout plan designed to help you train
                consistently, build strength, and make measurable progress.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-center">
                <Dumbbell
                  size={16}
                  className="mx-auto text-[#D4AF37]"
                />
                <p className="mt-2 text-lg font-black">{workouts.length}</p>
                <p className="text-[9px] uppercase tracking-wider text-[#5E5964]">
                  Plans
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-center">
                <Flame
                  size={16}
                  className="mx-auto text-[#D4AF37]"
                />
                <p className="mt-2 text-lg font-black">50+</p>
                <p className="text-[9px] uppercase tracking-wider text-[#5E5964]">
                  Exercises
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-center">
                <Target
                  size={16}
                  className="mx-auto text-[#D4AF37]"
                />
                <p className="mt-2 text-lg font-black">AI</p>
                <p className="text-[9px] uppercase tracking-wider text-[#5E5964]">
                  Coach
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="mt-8">
          <div className="relative max-w-2xl">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#5E5964]"
            />

            <input
              type="text"
              placeholder="Search workouts, muscles, goals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.025] py-3.5 pl-11 pr-4 text-sm text-[#F7F3EA] outline-none transition placeholder:text-[#5E5964] focus:border-[#D4AF37]/30 focus:bg-white/[0.04]"
            />
          </div>
        </section>

        {/* Filters */}
        <section className="mt-5 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-2">
            {filters.map((filter) => {
              const active = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                    active
                      ? "bg-[#D4AF37] text-[#070609] shadow-[0_0_25px_rgba(212,175,55,0.12)]"
                      : "border border-white/[0.07] bg-white/[0.025] text-[#8F8998] hover:border-[#D4AF37]/20 hover:text-[#F7F3EA]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </section>

        {/* Workout Grid */}
        <section className="mt-7">
          {filteredWorkouts.length === 0 ? (
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] px-6 py-16 text-center">
              <Dumbbell
                size={38}
                className="mx-auto text-[#D4AF37]"
              />

              <h2 className="mt-5 text-xl font-bold">
                No workouts found
              </h2>

              <p className="mt-2 text-sm text-[#8F8998]">
                Try another search or choose a different category.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/20 hover:bg-white/[0.04] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                >
                  {/* Glow */}
                  <div className="pointer-events-none absolute right-[-70px] top-[-70px] h-40 w-40 rounded-full bg-purple-700/10 blur-[60px] transition group-hover:bg-purple-700/20" />

                  {/* Top row */}
                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D4AF37]/15 bg-[#D4AF37]/5">
                      <Dumbbell
                        size={21}
                        className="text-[#D4AF37]"
                      />
                    </div>

                    <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#8F8998]">
                      {workout.level}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="relative mt-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                      {workout.category}
                    </p>

                    <h2 className="mt-2 text-xl font-black tracking-tight">
                      {workout.name}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-[#8F8998]">
                      {workout.description}
                    </p>
                  </div>

                  {/* Workout meta */}
                  <div className="relative mt-5 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
                      <Clock3
                        size={15}
                        className="text-[#D4AF37]"
                      />

                      <p className="mt-2 text-[9px] uppercase tracking-wider text-[#5E5964]">
                        Duration
                      </p>

                      <p className="mt-1 text-xs font-semibold">
                        {workout.duration}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
                      <Users
                        size={15}
                        className="text-[#D4AF37]"
                      />

                      <p className="mt-2 text-[9px] uppercase tracking-wider text-[#5E5964]">
                        Schedule
                      </p>

                      <p className="mt-1 text-xs font-semibold">
                        {workout.daysPerWeek}
                      </p>
                    </div>
                  </div>

                  {/* Focus */}
                  <div className="relative mt-5">
                    <p className="text-[9px] uppercase tracking-wider text-[#5E5964]">
                      Training Focus
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {workout.focus.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[10px] text-[#8F8998]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="relative mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
                    <span className="text-xs text-[#5E5964]">
                      {workout.exercises.length} exercises
                    </span>

                    <Link
                      to={`/app/workouts/${workout.id}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] transition group-hover:text-[#F3D58A]"
                    >
                      View Workout
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="relative mt-8 overflow-hidden rounded-3xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#D4AF37]/10 via-white/[0.025] to-purple-900/10 p-6 sm:p-8">
          <div className="pointer-events-none absolute right-[-100px] top-[-120px] h-72 w-72 rounded-full bg-purple-900/15 blur-[100px]" />

          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                Coming Next
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Build your own workout.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#8F8998]">
                Create custom routines, choose your exercises, set your reps
                and weights, and track every session.
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-6 py-3.5 text-sm font-bold text-[#D4AF37] transition hover:bg-[#D4AF37]/15"
            >
              Custom Workout — Coming Soon
            </button>
          </div>
        </section>

        <div className="h-8" />
      </div>
    </div>
  );
}