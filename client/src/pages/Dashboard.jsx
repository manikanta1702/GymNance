import { useEffect, useMemo, useState } from "react";
import {
  Flame,
  Dumbbell,
  Activity,
  ArrowRight,
  Play,
  TrendingUp,
  Apple,
  Bot,
  Loader2,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import workouts from "../data/workouts";

const API_URL = "http://localhost:5000";

const GYM_TIMEZONE = "Asia/Kolkata";

function getDateKey(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: GYM_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function formatActivityDate(dateKey) {
  const date = new Date(`${dateKey}T12:00:00`);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(date);
}

function formatFullDate(dateValue) {
  if (!dateValue) {
    return "Date unavailable";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: GYM_TIMEZONE,
  }).format(date);
}

function formatTime(dateValue) {
  if (!dateValue) {
    return "";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: GYM_TIMEZONE,
  }).format(date);
}

function getTodayWorkout(workoutList) {
  if (!workoutList || workoutList.length === 0) {
    return null;
  }

  const day = new Intl.DateTimeFormat("en-US", {
    timeZone: GYM_TIMEZONE,
    weekday: "short",
  }).format(new Date());

  const schedule = {
    Mon: 2,
    Tue: 3,
    Wed: 4,
    Thu: 5,
    Fri: 7,
    Sat: 6,
    Sun: 1,
  };

  const workoutId = schedule[day];

  return (
    workoutList.find((workout) => workout.id === workoutId) ||
    workoutList[0]
  );
}

function calculateStreak(history) {
  if (!history || history.length === 0) {
    return 0;
  }

  const uniqueDays = [
    ...new Set(
      history
        .map(
          (workout) =>
            workout.completed_at || workout.started_at
        )
        .filter(Boolean)
        .map((date) => getDateKey(new Date(date)))
    ),
  ].sort();

  if (uniqueDays.length === 0) {
    return 0;
  }

  const today = getDateKey(new Date());

  let streak = 0;

  const currentDate = new Date(`${today}T12:00:00`);

  const hasToday = uniqueDays.includes(today);

  if (!hasToday) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  while (true) {
    const dateKey = getDateKey(currentDate);

    if (!uniqueDays.includes(dateKey)) {
      break;
    }

    streak += 1;

    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
}

function formatVolume(value) {
  const volume = Number(value || 0);

  if (volume >= 1000000) {
    return `${(volume / 1000000).toFixed(1)}M`;
  }

  if (volume >= 1000) {
    return `${(volume / 1000).toFixed(1)}K`;
  }

  return Math.round(volume).toString();
}

function getLastSevenDays() {
  const days = [];

  const today = new Date();

  const currentDay = today.getDay();

  const daysFromMonday =
    currentDay === 0 ? 6 : currentDay - 1;

  const monday = new Date(today);

  monday.setDate(
    today.getDate() - daysFromMonday
  );

  for (let i = 0; i < 7; i += 1) {
    const date = new Date(monday);

    date.setDate(monday.getDate() + i);

    const dateKey = getDateKey(date);

    days.push({
      dateKey,
      label: formatActivityDate(dateKey),
    });
  }

  return days;
}

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  const firstName =
    user?.full_name?.split(" ")[0] || "Athlete";

  const [dashboardData, setDashboardData] = useState(null);
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [
          dashboardResponse,
          historyResponse,
        ] = await Promise.all([
          fetch(`${API_URL}/api/workouts/dashboard`, {
            headers,
          }),

          fetch(`${API_URL}/api/workouts/history`, {
            headers,
          }),
        ]);

        if (
          !dashboardResponse.ok ||
          !historyResponse.ok
        ) {
          throw new Error(
            "Failed to load dashboard data"
          );
        }

        const dashboardResult =
          await dashboardResponse.json();

        const historyResult =
          await historyResponse.json();

        setDashboardData(dashboardResult);

        const historyRows = Array.isArray(historyResult)
          ? historyResult
          : historyResult.workouts || [];

        setHistory(historyRows);
      } catch (err) {
        console.error("Dashboard error:", err);

        setError(
          "Unable to load your latest fitness data."
        );
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      loadDashboard();
    } else {
      setLoading(false);
    }
  }, [token]);

  const todayWorkout = useMemo(() => {
    return getTodayWorkout(workouts);
  }, []);

  /*
   * REAL DATABASE DASHBOARD STATS
   */

  const totalWorkouts = Number(
    dashboardData?.overall?.total_workouts || 0
  );

  const totalSets = Number(
    dashboardData?.overall?.total_sets || 0
  );

  const totalReps = Number(
    dashboardData?.overall?.total_reps || 0
  );

  const totalVolume = Number(
    dashboardData?.overall?.total_volume || 0
  );

  const currentStreak = Number(
    dashboardData?.currentStreak ??
      calculateStreak(history)
  );

  const workoutsThisMonth = Number(
    dashboardData?.monthlyWorkouts || 0
  );

  /*
   * WEEKLY WORKOUTS
   */

  const workoutsLast7Days = useMemo(() => {
    const today = getDateKey(new Date());

    const todayDate = new Date(
      `${today}T12:00:00`
    );

    const currentDay = todayDate.getDay();

    const daysFromMonday =
      currentDay === 0 ? 6 : currentDay - 1;

    const monday = new Date(todayDate);

    monday.setDate(
      todayDate.getDate() - daysFromMonday
    );

    const mondayKey = getDateKey(monday);

    return history.filter((workout) => {
      const workoutDate =
        workout.completed_at ||
        workout.started_at;

      if (!workoutDate) {
        return false;
      }

      const workoutDateKey = getDateKey(
        new Date(workoutDate)
      );

      return (
        workoutDateKey >= mondayKey &&
        workoutDateKey <= today
      );
    }).length;
  }, [history]);

  const weeklyGoal = 5;

  const weeklyPercentage = Math.min(
    Math.round(
      (workoutsLast7Days / weeklyGoal) * 100
    ),
    100
  );

  /*
   * WEEKLY ACTIVITY
   */

  const weeklyActivity = useMemo(() => {
    const lastSevenDays = getLastSevenDays();

    const activityMap = new Map();

    history.forEach((workout) => {
      const workoutDate =
        workout.completed_at ||
        workout.started_at;

      if (!workoutDate) {
        return;
      }

      const dateKey = getDateKey(
        new Date(workoutDate)
      );

      activityMap.set(
        dateKey,
        (activityMap.get(dateKey) || 0) + 1
      );
    });

    return lastSevenDays.map((day) => ({
      ...day,
      count: activityMap.get(day.dateKey) || 0,
    }));
  }, [history]);

  const maxWeeklyActivity = Math.max(
    ...weeklyActivity.map((day) => day.count),
    1
  );

  const recentWorkouts = history.slice(0, 5);

  /*
   * LOADING
   */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070609] text-[#F7F3EA]">
        <div className="flex items-center gap-3 text-[#8F8998]">

          <Loader2
            className="animate-spin text-[#D4AF37]"
            size={22}
          />

          Loading your dashboard...

        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070609] px-5 py-8 text-[#F7F3EA] sm:px-8 lg:px-10">

      {/* Background Glows */}

      <div className="pointer-events-none absolute right-[-180px] top-[-180px] h-[450px] w-[450px] rounded-full bg-purple-900/15 blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-200px] left-[-150px] h-[450px] w-[450px] rounded-full bg-[#D4AF37]/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Header */}

        <section className="mb-10">

          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
            Your Fitness Dashboard
          </p>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">

                Good to see you,{" "}

                <span className="text-[#D4AF37]">
                  {firstName}.
                </span>

              </h1>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#8F8998] sm:text-base">
                Stay consistent, train smarter, and keep moving toward your goals.
              </p>

            </div>

            <div className="flex items-center gap-2 text-xs text-[#5E5964]">

              <span className="h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.6)]" />

              GymNance is ready

            </div>

          </div>

        </section>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/10 bg-red-400/5 px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Stats */}

        <section className="grid gap-4 sm:grid-cols-3">

          {/* Streak */}

          <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37]/20">

            <div className="flex items-start justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-400/10 bg-orange-400/5">

                <Flame
                  size={20}
                  className="text-orange-300"
                />

              </div>

              <span className="text-xs text-[#5E5964]">
                Consistency
              </span>

            </div>

            <p className="mt-5 text-3xl font-black">
              {currentStreak}
            </p>

            <p className="mt-1 text-sm text-[#8F8998]">
              Day streak
            </p>

          </div>

          {/* Monthly Workouts */}

          <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37]/20">

            <div className="flex items-start justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4AF37]/10 bg-[#D4AF37]/5">

                <Dumbbell
                  size={20}
                  className="text-[#D4AF37]"
                />

              </div>

              <span className="text-xs text-[#5E5964]">
                This month
              </span>

            </div>

            <p className="mt-5 text-3xl font-black">
              {workoutsThisMonth}
            </p>

            <p className="mt-1 text-sm text-[#8F8998]">
              Workouts completed
            </p>

          </div>

          {/* Total Volume */}

          <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37]/20">

            <div className="flex items-start justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-400/10 bg-purple-400/5">

                <Activity
                  size={20}
                  className="text-purple-300"
                />

              </div>

              <span className="text-xs text-[#5E5964]">
                Total
              </span>

            </div>

            <p className="mt-5 text-3xl font-black">
              {formatVolume(totalVolume)}
            </p>

            <p className="mt-1 text-sm text-[#8F8998]">
              Training volume
            </p>

          </div>

        </section>

        {/* Today's Workout */}

        <section className="mt-6">

          <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#D4AF37]/10 via-white/[0.025] to-purple-900/10 p-6 sm:p-8">

            <div className="pointer-events-none absolute right-[-80px] top-[-100px] h-[250px] w-[250px] rounded-full bg-[#D4AF37]/10 blur-[90px]" />

            <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

              <div>

                <div className="mb-4 flex items-center gap-2">

                  <span className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                    Today's Workout
                  </span>

                </div>

                <h2 className="text-3xl font-black sm:text-4xl">
                  {todayWorkout?.name || "Choose a Workout"}
                </h2>

                <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#8F8998]">

                  {todayWorkout?.focus?.join(", ") ||
                    "Choose a workout from the GymNance library and start training."}

                </p>

                <div className="mt-5 flex flex-wrap gap-5 text-sm text-[#8F8998]">

                  <span className="flex items-center gap-2">

                    <Dumbbell
                      size={16}
                      className="text-[#D4AF37]"
                    />

                    {todayWorkout?.exercises?.length || 0} Exercises

                  </span>

                  <span className="flex items-center gap-2">

                    <Activity
                      size={16}
                      className="text-[#D4AF37]"
                    />

                    {todayWorkout?.duration || "Flexible"}

                  </span>

                </div>

              </div>

              <button
                onClick={() => {
                  if (todayWorkout) {
                    navigate(
                      `/app/workouts/${todayWorkout.id}`
                    );
                  } else {
                    navigate("/app/workouts");
                  }
                }}
                className="group flex h-14 items-center justify-center gap-3 rounded-xl bg-[#D4AF37] px-7 font-bold text-[#070609] transition-all duration-300 hover:bg-[#F3D58A] hover:shadow-[0_12px_45px_rgba(212,175,55,0.2)] active:scale-[0.98]"
              >

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10">

                  <Play
                    size={15}
                    fill="currentColor"
                  />

                </span>

                View Workout

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </button>

            </div>

          </div>

        </section>

        {/* Weekly Goal + Quick Access */}

        <section className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* Progress */}

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-7">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                  Progress
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  Keep pushing forward
                </h3>

              </div>

              <TrendingUp
                className="text-[#D4AF37]"
                size={22}
              />

            </div>

            <div className="mt-7">

              <div className="mb-2 flex justify-between text-xs">

                <span className="text-[#8F8998]">
                  Weekly goal
                </span>

                <span className="text-[#F7F3EA]">

                  {workoutsLast7Days >= weeklyGoal
                    ? `${workoutsLast7Days} workouts`
                    : `${workoutsLast7Days} / ${weeklyGoal} workouts`}

                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">

                <div
                  className="h-full rounded-full bg-[#D4AF37] transition-all duration-700"
                  style={{
                    width: `${weeklyPercentage}%`,
                  }}
                />

              </div>

              <p className="mt-4 text-xs text-[#5E5964]">

                {workoutsLast7Days >= weeklyGoal
                  ? "Weekly target completed. Keep the momentum going."
                  : `${weeklyGoal - workoutsLast7Days} more workout${
                      weeklyGoal - workoutsLast7Days === 1
                        ? ""
                        : "s"
                    } to complete your weekly target.`}

              </p>

            </div>

          </div>

          {/* Quick Access */}

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-7">

            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
              Quick Access
            </p>

            <h3 className="mt-2 text-xl font-bold">
              What do you want to do?
            </h3>

            <div className="mt-6 grid grid-cols-2 gap-3">

              <button
                onClick={() =>
                  navigate("/app/exercises")
                }
                className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/20 p-4 text-left transition-all hover:border-[#D4AF37]/20 hover:bg-white/[0.04]"
              >

                <Dumbbell
                  size={18}
                  className="text-[#D4AF37]"
                />

                <span className="text-sm font-medium">
                  Exercises
                </span>

              </button>

              <button
                onClick={() =>
                  navigate("/app/workouts")
                }
                className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/20 p-4 text-left transition-all hover:border-[#D4AF37]/20 hover:bg-white/[0.04]"
              >

                <TrendingUp
                  size={18}
                  className="text-purple-300"
                />

                <span className="text-sm font-medium">
                  Workouts
                </span>

              </button>

              <button
                onClick={() =>
                  navigate("/app/nutrition")
                }
                className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/20 p-4 text-left transition-all hover:border-[#D4AF37]/20 hover:bg-white/[0.04]"
              >

                <Apple
                  size={18}
                  className="text-green-300"
                />

                <span className="text-sm font-medium">
                  Nutrition
                </span>

              </button>

              <button
                onClick={() =>
                  navigate("/app/ai-coach")
                }
                className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/20 p-4 text-left transition-all hover:border-[#D4AF37]/20 hover:bg-white/[0.04]"
              >

                <Bot
                  size={18}
                  className="text-[#D4AF37]"
                />

                <span className="text-sm font-medium">
                  AI Coach
                </span>

              </button>

            </div>

          </div>

        </section>

        {/* Weekly Activity */}

        <section className="mt-6 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-7">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                Weekly Activity
              </p>

              <h3 className="mt-2 text-xl font-bold">
                Your training this week
              </h3>

            </div>

            <div className="flex items-center gap-2 text-xs text-[#5E5964]">

              <CalendarDays size={15} />

              This Week

            </div>

          </div>

          <div className="mt-8 grid grid-cols-7 gap-2 sm:gap-4">

            {weeklyActivity.map((day) => {

              const barHeight =
                day.count === 0
                  ? 8
                  : Math.max(
                      Math.round(
                        (day.count /
                          maxWeeklyActivity) *
                          100
                      ),
                      25
                    );

              const isToday =
                day.dateKey ===
                getDateKey(new Date());

              return (
                <div
                  key={day.dateKey}
                  className="flex flex-col items-center"
                >

                  <div className="flex h-28 w-full items-end justify-center rounded-xl border border-white/[0.05] bg-black/20 p-2">

                    <div
                      className={`w-full max-w-8 rounded-lg transition-all ${
                        day.count > 0
                          ? "bg-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.15)]"
                          : "bg-white/[0.06]"
                      }`}
                      style={{
                        height: `${barHeight}%`,
                      }}
                    />

                  </div>

                  <p
                    className={`mt-3 text-[10px] font-medium ${
                      isToday
                        ? "text-[#D4AF37]"
                        : "text-[#5E5964]"
                    }`}
                  >
                    {day.label}
                  </p>

                  <p className="mt-1 text-xs font-bold text-[#F7F3EA]">
                    {day.count}
                  </p>

                </div>
              );
            })}

          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">

            <span className="text-xs text-[#5E5964]">

              {workoutsLast7Days} completed workout
              {workoutsLast7Days === 1
                ? ""
                : "s"} this week

            </span>

            <button
              onClick={() =>
                navigate("/app/progress")
              }
              className="flex items-center gap-1 text-xs font-semibold text-[#D4AF37] transition-colors hover:text-[#F3D58A]"
            >

              View progress

              <ChevronRight size={14} />

            </button>

          </div>

        </section>

        {/* Recent Workouts */}

        <section className="mt-6 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-7">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                Recent Activity
              </p>

              <h3 className="mt-2 text-xl font-bold">
                Your latest workouts
              </h3>

            </div>

            <button
              onClick={() =>
                navigate("/app/history")
              }
              className="hidden items-center gap-1 text-xs font-semibold text-[#D4AF37] transition-colors hover:text-[#F3D58A] sm:flex"
            >

              View history

              <ChevronRight size={14} />

            </button>

          </div>

          {recentWorkouts.length === 0 ? (

            <div className="mt-6 rounded-2xl border border-dashed border-white/[0.08] bg-black/20 p-8 text-center">

              <Dumbbell
                size={28}
                className="mx-auto text-[#5E5964]"
              />

              <p className="mt-3 text-sm font-medium">
                No workouts yet
              </p>

              <p className="mt-1 text-xs text-[#5E5964]">
                Complete your first workout and it will appear here.
              </p>

              <button
                onClick={() =>
                  navigate("/app/workouts")
                }
                className="mt-5 rounded-lg bg-[#D4AF37] px-5 py-2.5 text-xs font-bold text-[#070609] transition hover:bg-[#F3D58A]"
              >
                Explore Workouts
              </button>

            </div>

          ) : (

            <div className="mt-6 space-y-3">

              {recentWorkouts.map((workout) => {

                const workoutDate =
                  workout.completed_at ||
                  workout.started_at;

                return (
                  <button
                    key={workout.id}
                    onClick={() => {

                      if (workout.workout_id) {
                        navigate(
                          `/app/workouts/${workout.workout_id}`
                        );
                      } else {
                        navigate(
                          "/app/history"
                        );
                      }

                    }}
                    className="group flex w-full items-center gap-4 rounded-2xl border border-white/[0.06] bg-black/20 p-4 text-left transition-all hover:border-[#D4AF37]/20 hover:bg-white/[0.035]"
                  >

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/10 bg-[#D4AF37]/5">

                      <Dumbbell
                        size={18}
                        className="text-[#D4AF37]"
                      />

                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                        <p className="truncate text-sm font-semibold">
                          {workout.workout_name}
                        </p>

                        <p className="shrink-0 text-[11px] text-[#5E5964]">

                          {formatFullDate(
                            workoutDate
                          )}

                          {formatTime(
                            workoutDate
                          )
                            ? ` • ${formatTime(
                                workoutDate
                              )}`
                            : ""}

                        </p>

                      </div>

                      <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-[#5E5964]">

                        <span>
                          {Number(
                            workout.total_sets || 0
                          )} sets
                        </span>

                        <span>
                          {Number(
                            workout.total_reps || 0
                          )} reps
                        </span>

                        <span>
                          {formatVolume(
                            workout.total_volume
                          )} volume
                        </span>

                      </div>

                    </div>

                    <ChevronRight
                      size={18}
                      className="shrink-0 text-[#5E5964] transition-all group-hover:translate-x-1 group-hover:text-[#D4AF37]"
                    />

                  </button>
                );
              })}

            </div>

          )}

          <button
            onClick={() =>
              navigate("/app/history")
            }
            className="mt-5 flex w-full items-center justify-center gap-1 rounded-xl border border-white/[0.06] py-3 text-xs font-semibold text-[#8F8998] transition hover:border-[#D4AF37]/20 hover:text-[#D4AF37] sm:hidden"
          >

            View full history

            <ChevronRight size={14} />

          </button>

        </section>

      </div>

    </div>
  );
}