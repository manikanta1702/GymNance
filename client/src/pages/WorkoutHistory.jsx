import { useEffect, useState } from "react";
import {
  Activity,
  CalendarDays,
  ChevronRight,
  Dumbbell,
  Flame,
  RefreshCw,
  Trophy,
} from "lucide-react";

export default function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWorkoutHistory = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login to view your workout history.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/workouts/history",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load workout history"
        );
      }

      setWorkouts(data.workouts || []);
    } catch (err) {
      console.error("Workout history error:", err);
      setError(
        err.message || "Unable to load workout history."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkoutHistory();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";

    return new Date(dateString).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";

    return new Date(dateString).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const totalWorkouts = workouts.length;

  const totalVolume = workouts.reduce(
    (total, workout) =>
      total + Number(workout.total_volume || 0),
    0
  );

  const totalReps = workouts.reduce(
    (total, workout) =>
      total + Number(workout.total_reps || 0),
    0
  );

  const totalSets = workouts.reduce(
    (total, workout) =>
      total + Number(workout.total_sets || 0),
    0
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070609] px-4 py-7 text-[#F7F3EA] sm:px-8 lg:px-10">

      {/* Background glow */}
      <div className="pointer-events-none absolute right-[-180px] top-[-160px] h-[450px] w-[450px] rounded-full bg-purple-900/15 blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-180px] left-[-160px] h-[450px] w-[450px] rounded-full bg-[#D4AF37]/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Header */}
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              Your Training
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Workout History
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#8F8998]">
              Every session you complete is recorded here.
              Track your consistency and see how your training
              builds over time.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchWorkoutHistory}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-xs font-semibold text-[#8F8998] transition hover:border-[#D4AF37]/20 hover:text-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RefreshCw
              size={15}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

        </section>

        {/* Stats */}
        <section className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
            <div className="flex items-center justify-between">
              <Activity
                size={18}
                className="text-[#D4AF37]"
              />

              <span className="text-[9px] uppercase tracking-wider text-[#5E5964]">
                Sessions
              </span>
            </div>

            <p className="mt-4 text-2xl font-black">
              {totalWorkouts}
            </p>

            <p className="mt-1 text-xs text-[#8F8998]">
              Completed workouts
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
            <div className="flex items-center justify-between">
              <Dumbbell
                size={18}
                className="text-[#D4AF37]"
              />

              <span className="text-[9px] uppercase tracking-wider text-[#5E5964]">
                Sets
              </span>
            </div>

            <p className="mt-4 text-2xl font-black">
              {totalSets}
            </p>

            <p className="mt-1 text-xs text-[#8F8998]">
              Total sets logged
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
            <div className="flex items-center justify-between">
              <Flame
                size={18}
                className="text-[#D4AF37]"
              />

              <span className="text-[9px] uppercase tracking-wider text-[#5E5964]">
                Reps
              </span>
            </div>

            <p className="mt-4 text-2xl font-black">
              {totalReps}
            </p>

            <p className="mt-1 text-xs text-[#8F8998]">
              Total repetitions
            </p>
          </div>

          <div className="rounded-2xl border border-[#D4AF37]/15 bg-[#D4AF37]/[0.045] p-5">
            <div className="flex items-center justify-between">
              <Trophy
                size={18}
                className="text-[#D4AF37]"
              />

              <span className="text-[9px] uppercase tracking-wider text-[#5E5964]">
                Volume
              </span>
            </div>

            <p className="mt-4 text-2xl font-black text-[#D4AF37]">
              {totalVolume}
            </p>

            <p className="mt-1 text-xs text-[#8F8998]">
              Total training volume
            </p>
          </div>

        </section>

        {/* Loading */}
        {loading && (
          <section className="mt-8 rounded-3xl border border-white/[0.07] bg-white/[0.025] p-10 text-center">

            <RefreshCw
              size={28}
              className="mx-auto animate-spin text-[#D4AF37]"
            />

            <p className="mt-4 text-sm font-semibold">
              Loading workout history...
            </p>

            <p className="mt-1 text-xs text-[#8F8998]">
              Fetching your training sessions.
            </p>

          </section>
        )}

        {/* Error */}
        {!loading && error && (
          <section className="mt-8 rounded-3xl border border-red-400/10 bg-red-500/[0.035] p-10 text-center">

            <p className="text-sm font-bold">
              Couldn't load your history
            </p>

            <p className="mt-2 text-xs text-[#8F8998]">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchWorkoutHistory}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 text-xs font-bold text-[#070609]"
            >
              <RefreshCw size={14} />
              Try Again
            </button>

          </section>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          workouts.length === 0 && (
            <section className="mt-8 rounded-3xl border border-white/[0.07] bg-white/[0.025] p-12 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10">
                <Dumbbell
                  size={26}
                  className="text-[#D4AF37]"
                />
              </div>

              <h2 className="mt-5 text-xl font-black">
                No workouts yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-[#8F8998]">
                Complete your first workout and your
                training history will appear here.
              </p>

            </section>
          )}

        {/* Workout list */}
        {!loading &&
          !error &&
          workouts.length > 0 && (
            <section className="mt-8">

              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#5E5964]">
                  Recent Sessions
                </p>

                <h2 className="mt-1 text-xl font-black">
                  Training Log
                </h2>
              </div>

              <div className="space-y-3">

                {workouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-[#D4AF37]/20 hover:bg-[#D4AF37]/[0.025] sm:p-6"
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      {/* Workout information */}
                      <div className="flex items-start gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10">
                          <Dumbbell
                            size={21}
                            className="text-[#D4AF37]"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg font-black">
                            {workout.workout_name}
                          </h3>

                          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#8F8998]">

                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays size={13} />
                              {formatDate(
                                workout.completed_at
                              )}
                            </span>

                            <span>
                              {formatTime(
                                workout.completed_at
                              )}
                            </span>

                          </div>
                        </div>

                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:min-w-[420px]">

                        <div className="rounded-xl border border-white/[0.06] bg-black/20 px-3 py-3 text-center">
                          <p className="text-sm font-black text-[#D4AF37]">
                            {workout.total_sets}
                          </p>

                          <p className="mt-1 text-[9px] uppercase tracking-wider text-[#5E5964]">
                            Sets
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/[0.06] bg-black/20 px-3 py-3 text-center">
                          <p className="text-sm font-black text-[#D4AF37]">
                            {workout.total_reps}
                          </p>

                          <p className="mt-1 text-[9px] uppercase tracking-wider text-[#5E5964]">
                            Reps
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/[0.06] bg-black/20 px-3 py-3 text-center">
                          <p className="text-sm font-black text-[#D4AF37]">
                            {Number(
                              workout.total_volume || 0
                            )}
                          </p>

                          <p className="mt-1 text-[9px] uppercase tracking-wider text-[#5E5964]">
                            Volume
                          </p>
                        </div>

                      </div>

                    </div>

                    {/* Footer */}
                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">

                      <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#5E5964]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                        Session completed
                      </div>

                      <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#8F8998] transition group-hover:text-[#D4AF37]">
                        Logged
                        <ChevronRight
                          size={14}
                        />
                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </section>
          )}

      </div>
    </div>
  );
}