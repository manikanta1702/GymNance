import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  CalendarDays,
  Dumbbell,
  Flame,
  RefreshCw,
  TrendingUp,
  Trophy,
} from "lucide-react";

export default function Progress() {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProgress = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login to view your progress.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/workouts/progress",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load progress"
        );
      }

      setProgressData(data);
    } catch (err) {
      console.error("Progress error:", err);

      setError(
        err.message || "Unable to load your progress."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const overall = progressData?.overall || {
    total_workouts: 0,
    total_sets: 0,
    total_reps: 0,
    total_volume: 0,
  };

  const weekly = progressData?.weekly || [];

  const workoutBreakdown =
    progressData?.workoutBreakdown || [];

  /*
   * IMPORTANT:
   * We use local calendar dates instead of toISOString()
   * so India/IST does not shift the day backward.
   */

  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const parseDatabaseDate = (value) => {
    if (!value) return null;

    /*
     * PostgreSQL DATE values normally arrive as:
     * YYYY-MM-DD
     *
     * We manually create a local date so the browser
     * does not convert it through UTC.
     */
    if (
      typeof value === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
      const [year, month, day] = value
        .split("-")
        .map(Number);

      return new Date(year, month - 1, day);
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date;
  };

  const maxWeeklyVolume = useMemo(() => {
    if (!weekly.length) return 0;

    return Math.max(
      ...weekly.map((day) =>
        Number(day.volume || 0)
      )
    );
  }, [weekly]);

  const maxWeeklyWorkouts = useMemo(() => {
    if (!weekly.length) return 1;

    return Math.max(
      1,
      ...weekly.map((day) =>
        Number(day.workout_count || 0)
      )
    );
  }, [weekly]);

  /*
   * Build the last 7 LOCAL days.
   *
   * Example in India:
   * Thu 17 Sep
   * Wed 16 Sep
   * Tue 15 Sep
   * ...
   *
   * No UTC conversion is used here.
   */
  const getLastSevenDays = () => {
    const days = [];

    const today = new Date();

    // Work with local calendar midnight.
    today.setHours(0, 0, 0, 0);

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);

      date.setDate(today.getDate() - i);

      days.push(date);
    }

    return days;
  };

  const activityDays = useMemo(() => {
    const days = getLastSevenDays();

    return days.map((date) => {
      /*
       * Local date key:
       * 2026-09-17
       */
      const dateKey = formatDateKey(date);

      const matchingDay = weekly.find((item) => {
        /*
         * PostgreSQL DATE should be compared directly
         * as a calendar date.
         */
        const itemDate = parseDatabaseDate(
          item.workout_date
        );

        if (!itemDate) return false;

        const itemKey = formatDateKey(itemDate);

        return itemKey === dateKey;
      });

      return {
        date,

        dateKey,

        workoutCount: matchingDay
          ? Number(matchingDay.workout_count || 0)
          : 0,

        volume: matchingDay
          ? Number(matchingDay.volume || 0)
          : 0,
      };
    });
  }, [weekly]);

  const activeDays = activityDays.filter(
    (day) => day.workoutCount > 0
  ).length;

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
              Performance
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Your Progress
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#8F8998]">
              Turn every workout into measurable progress.
              Your numbers are calculated from your completed
              training sessions.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchProgress}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-xs font-semibold text-[#8F8998] transition hover:border-[#D4AF37]/20 hover:text-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RefreshCw
              size={15}
              className={
                loading ? "animate-spin" : ""
              }
            />

            Refresh
          </button>

        </section>

        {/* Loading */}
        {loading && (
          <section className="mt-8 rounded-3xl border border-white/[0.07] bg-white/[0.025] p-12 text-center">

            <RefreshCw
              size={30}
              className="mx-auto animate-spin text-[#D4AF37]"
            />

            <p className="mt-4 text-sm font-semibold">
              Loading your progress...
            </p>

            <p className="mt-1 text-xs text-[#8F8998]">
              Calculating your training statistics.
            </p>

          </section>
        )}

        {/* Error */}
        {!loading && error && (
          <section className="mt-8 rounded-3xl border border-red-400/10 bg-red-500/[0.035] p-10 text-center">

            <p className="text-sm font-bold">
              Couldn't load your progress
            </p>

            <p className="mt-2 text-xs text-[#8F8998]">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchProgress}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 text-xs font-bold text-[#070609]"
            >
              <RefreshCw size={14} />
              Try Again
            </button>

          </section>
        )}

        {/* Main content */}
        {!loading && !error && (
          <>

            {/* Main stats */}
            <section className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">

                <div className="flex items-center justify-between">
                  <Activity
                    size={18}
                    className="text-[#D4AF37]"
                  />

                  <span className="text-[9px] uppercase tracking-wider text-[#5E5964]">
                    Workouts
                  </span>
                </div>

                <p className="mt-4 text-2xl font-black">
                  {Number(
                    overall.total_workouts || 0
                  )}
                </p>

                <p className="mt-1 text-xs text-[#8F8998]">
                  Total completed
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
                  {Number(
                    overall.total_sets || 0
                  )}
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
                  {Number(
                    overall.total_reps || 0
                  )}
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
                  {Number(
                    overall.total_volume || 0
                  )}
                </p>

                <p className="mt-1 text-xs text-[#8F8998]">
                  Total training volume
                </p>

              </div>

            </section>

            {/* Weekly Activity */}
            <section className="mt-6 rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">

              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#5E5964]">
                    Last 7 Days
                  </p>

                  <h2 className="mt-1 text-xl font-black">
                    Training Activity
                  </h2>
                </div>

                <div className="inline-flex items-center gap-2 text-xs text-[#8F8998]">
                  <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />

                  {activeDays} active{" "}
                  {activeDays === 1
                    ? "day"
                    : "days"}
                </div>

              </div>

              {/* Activity bars */}
              <div className="mt-8 grid grid-cols-7 gap-2 sm:gap-4">

                {activityDays.map((day) => {

                  const height =
                    day.workoutCount > 0
                      ? Math.max(
                          25,
                          (day.workoutCount /
                            maxWeeklyWorkouts) *
                            100
                        )
                      : 8;

                  return (
                    <div
                      key={day.dateKey}
                      className="flex flex-col items-center"
                    >

                      <div className="flex h-36 w-full items-end justify-center rounded-xl bg-black/20 p-2">

                        <div
                          className={`w-full max-w-10 rounded-lg transition-all ${
                            day.workoutCount > 0
                              ? "bg-[#D4AF37]"
                              : "bg-white/[0.06]"
                          }`}
                          style={{
                            height: `${height}%`,
                          }}
                          title={`${day.workoutCount} workout${
                            day.workoutCount === 1
                              ? ""
                              : "s"
                          }`}
                        />

                      </div>

                      <p className="mt-3 text-[10px] font-semibold text-[#8F8998]">
                        {day.date.toLocaleDateString(
                          "en-IN",
                          {
                            weekday: "short",
                            timeZone: "Asia/Kolkata",
                          }
                        )}
                      </p>

                      <p className="mt-1 text-[9px] text-[#5E5964]">
                        {day.date.toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            timeZone: "Asia/Kolkata",
                          }
                        )}
                      </p>

                    </div>
                  );
                })}

              </div>

            </section>

            {/* Volume */}
            <section className="mt-6 rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#5E5964]">
                    Training Load
                  </p>

                  <h2 className="mt-1 text-xl font-black">
                    Volume Overview
                  </h2>
                </div>

                <BarChart3
                  size={20}
                  className="text-[#D4AF37]"
                />

              </div>

              {maxWeeklyVolume > 0 ? (
                <div className="mt-8 space-y-4">

                  {activityDays.map((day) => {

                    const width =
                      maxWeeklyVolume > 0
                        ? (day.volume /
                            maxWeeklyVolume) *
                          100
                        : 0;

                    return (
                      <div
                        key={`volume-${day.dateKey}`}
                      >

                        <div className="mb-2 flex items-center justify-between">

                          <span className="text-xs font-semibold text-[#8F8998]">
                            {day.date.toLocaleDateString(
                              "en-IN",
                              {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                                timeZone: "Asia/Kolkata",
                              }
                            )}
                          </span>

                          <span className="text-xs font-bold text-[#D4AF37]">
                            {day.volume}
                          </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">

                          <div
                            className="h-full rounded-full bg-[#D4AF37] transition-all duration-500"
                            style={{
                              width: `${width}%`,
                            }}
                          />

                        </div>

                      </div>
                    );
                  })}

                </div>
              ) : (
                <div className="mt-8 rounded-2xl border border-white/[0.06] bg-black/20 p-8 text-center">

                  <TrendingUp
                    size={25}
                    className="mx-auto text-[#5E5964]"
                  />

                  <p className="mt-3 text-sm font-semibold">
                    No training volume yet
                  </p>

                  <p className="mt-1 text-xs text-[#8F8998]">
                    Log weighted sets to see your volume
                    trend.
                  </p>

                </div>
              )}

            </section>

            {/* Workout Breakdown */}
            <section className="mt-6">

              <div className="mb-4">

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#5E5964]">
                  Training Breakdown
                </p>

                <h2 className="mt-1 text-xl font-black">
                  Workout Performance
                </h2>

              </div>

              {workoutBreakdown.length > 0 ? (
                <div className="grid gap-3 md:grid-cols-2">

                  {workoutBreakdown.map(
                    (workout) => (
                      <div
                        key={workout.workout_name}
                        className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-[#D4AF37]/20"
                      >

                        <div className="flex items-start justify-between gap-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10">

                              <Dumbbell
                                size={19}
                                className="text-[#D4AF37]"
                              />

                            </div>

                            <div>
                              <h3 className="font-bold">
                                {workout.workout_name}
                              </h3>

                              <p className="mt-1 text-[11px] text-[#8F8998]">
                                {
                                  workout.times_completed
                                }{" "}
                                session
                                {Number(
                                  workout.times_completed
                                ) === 1
                                  ? ""
                                  : "s"}
                              </p>
                            </div>

                          </div>

                          <CalendarDays
                            size={17}
                            className="text-[#5E5964]"
                          />

                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-2">

                          <div className="rounded-xl bg-black/20 p-3">

                            <p className="text-[9px] uppercase tracking-wider text-[#5E5964]">
                              Reps
                            </p>

                            <p className="mt-1 text-sm font-black text-[#D4AF37]">
                              {
                                workout.total_reps
                              }
                            </p>

                          </div>

                          <div className="rounded-xl bg-black/20 p-3">

                            <p className="text-[9px] uppercase tracking-wider text-[#5E5964]">
                              Volume
                            </p>

                            <p className="mt-1 text-sm font-black text-[#D4AF37]">
                              {
                                workout.total_volume
                              }
                            </p>

                          </div>

                        </div>

                      </div>
                    )
                  )}

                </div>
              ) : (
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8 text-center">

                  <p className="text-sm font-semibold">
                    No workout breakdown available yet.
                  </p>

                </div>
              )}

            </section>

            {/* Bottom insight */}
            <section className="mt-6 mb-8 rounded-3xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#D4AF37]/10 via-white/[0.025] to-purple-900/10 p-6 sm:p-8">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10">

                  <TrendingUp
                    size={20}
                    className="text-[#D4AF37]"
                  />

                </div>

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                    Keep Building
                  </p>

                  <h3 className="mt-1 text-lg font-black">
                    Consistency creates progress.
                  </h3>

                  <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#8F8998]">
                    Keep logging your workouts. As more
                    sessions are recorded, GymNance will be
                    able to show stronger trends and eventually
                    power personalized AI coaching.
                  </p>

                </div>

              </div>

            </section>

          </>
        )}

      </div>
    </div>
  );
}