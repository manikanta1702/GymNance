import { useMemo, useState } from "react";
import {
  Bot,
  Sparkles,
  Dumbbell,
  Flame,
  Trophy,
  Activity,
  ArrowRight,
  RotateCcw,
  TrendingUp,
  CalendarDays,
  BarChart3,
} from "lucide-react";

const goals = [
  {
    id: "muscle",
    title: "Muscle Gain",
    description: "Build muscle and increase training volume.",
    icon: Dumbbell,
  },
  {
    id: "fat-loss",
    title: "Fat Loss",
    description: "Improve fitness while supporting fat loss.",
    icon: Flame,
  },
  {
    id: "strength",
    title: "Strength",
    description: "Focus on getting stronger and lifting more.",
    icon: Trophy,
  },
  {
    id: "fitness",
    title: "General Fitness",
    description: "Improve overall fitness and consistency.",
    icon: Activity,
  },
];

const recommendations = {
  muscle: {
    title: "Build your training volume",
    fallbackMessage:
      "Focus on consistent resistance training and gradually increase the amount of work you can handle. Prioritize good exercise technique and recovery.",
    focus: [
      "Progressive overload",
      "Compound exercises",
      "Recovery",
    ],
    workout: "Beginner Full Body",
    workoutId: 1,
  },

  "fat-loss": {
    title: "Build a consistent training routine",
    fallbackMessage:
      "Combine resistance training with regular activity and focus on maintaining a sustainable routine. Consistency matters more than extreme sessions.",
    focus: [
      "Strength training",
      "Conditioning",
      "Consistency",
    ],
    workout: "Core & Conditioning",
    workoutId: 6,
  },

  strength: {
    title: "Train for progressive strength",
    fallbackMessage:
      "Focus on compound movements, controlled technique and gradually increasing resistance while keeping your training consistent.",
    focus: [
      "Compound lifts",
      "Progressive overload",
      "Technique",
    ],
    workout: "Strength Builder",
    workoutId: 7,
  },

  fitness: {
    title: "Build your fitness foundation",
    fallbackMessage:
      "Use a balanced routine covering strength, conditioning and core work. Aim for consistency and gradually improve your performance.",
    focus: [
      "Full body training",
      "Conditioning",
      "Consistency",
    ],
    workout: "Beginner Full Body",
    workoutId: 1,
  },
};

export default function AICoach() {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showPlan, setShowPlan] = useState(false);
  const [coachData, setCoachData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const recommendation = useMemo(() => {
    if (!selectedGoal) return null;

    return recommendations[selectedGoal];
  }, [selectedGoal]);

  // ==========================================
  // GOAL SELECTION
  // ==========================================

  const handleGoalSelect = (goalId) => {
    setSelectedGoal(goalId);
    setShowPlan(false);
    setCoachData(null);
    setError("");
  };

  // ==========================================
  // GENERATE PERSONALIZED PLAN
  // ==========================================

  const generatePlan = async () => {
    if (!selectedGoal) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/ai-coach/recommendation",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            goal: selectedGoal,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to generate recommendation"
        );
      }

      setCoachData(data);
      setShowPlan(true);
    } catch (error) {
      console.error(
        "AI Coach frontend error:",
        error
      );

      setError(
        error.message ||
          "Something went wrong while generating your recommendation."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RESET
  // ==========================================

  const resetCoach = () => {
    setSelectedGoal(null);
    setShowPlan(false);
    setCoachData(null);
    setError("");
  };

  const analysis = coachData?.analysis;

  return (
    <div className="min-h-screen bg-[#08070b] px-5 py-8 text-[#f7f3ea] sm:px-8 lg:px-10">

      {/* ==========================================
          BACKGROUND
      ========================================== */}

      <div className="pointer-events-none fixed left-1/2 top-20 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-700/10 blur-[120px]" />

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="relative z-10 mb-10">

        <div className="mb-3 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10">
            <Bot className="h-6 w-6 text-[#f3d58a]" />
          </div>

          <div>

            <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#d4af37]">
              GymNance AI
            </p>

            <h1 className="text-3xl font-bold sm:text-4xl">
              AI Coach
            </h1>

          </div>

        </div>

        <p className="max-w-2xl text-sm leading-6 text-white/60 sm:text-base">

          {user?.fullName
            ? `Welcome back, ${user.fullName}. `
            : "Welcome to GymNance. "}

          Your coach analyzes your GymNance activity and helps you
          make better training decisions.

        </p>

      </div>

      {/* ==========================================
          GOAL SELECTION
      ========================================== */}

      {!showPlan && (
        <div className="relative z-10 mx-auto max-w-6xl">

          <div className="mb-6 flex items-center gap-2">

            <Sparkles className="h-5 w-5 text-[#f3d58a]" />

            <h2 className="text-xl font-semibold sm:text-2xl">
              What's your main goal?
            </h2>

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            {goals.map((goal) => {

              const Icon = goal.icon;

              const isSelected =
                selectedGoal === goal.id;

              return (
                <button
                  key={goal.id}
                  onClick={() =>
                    handleGoalSelect(goal.id)
                  }
                  className={`group rounded-3xl border p-5 text-left transition-all duration-300 sm:p-6 ${
                    isSelected
                      ? "border-[#d4af37]/60 bg-[#d4af37]/10 shadow-[0_0_30px_rgba(212,175,55,0.08)]"
                      : "border-white/10 bg-white/[0.025] hover:border-[#d4af37]/30 hover:bg-white/[0.04]"
                  }`}
                >

                  <div className="mb-5 flex items-start justify-between">

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition ${
                        isSelected
                          ? "border-[#d4af37]/50 bg-[#d4af37]/15"
                          : "border-white/10 bg-white/[0.04]"
                      }`}
                    >

                      <Icon
                        className={`h-5 w-5 ${
                          isSelected
                            ? "text-[#f3d58a]"
                            : "text-white/60 group-hover:text-[#f3d58a]"
                        }`}
                      />

                    </div>

                    {isSelected && (
                      <span className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1 text-xs text-[#f3d58a]">
                        Selected
                      </span>
                    )}

                  </div>

                  <h3 className="mb-2 text-lg font-semibold">
                    {goal.title}
                  </h3>

                  <p className="text-sm leading-6 text-white/50">
                    {goal.description}
                  </p>

                </button>
              );
            })}

          </div>

          {/* ==========================================
              ERROR
          ========================================== */}

          {error && (
            <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* ==========================================
              GENERATE BUTTON
          ========================================== */}

          <div className="mt-8 flex justify-end">

            <button
              onClick={generatePlan}
              disabled={!selectedGoal || loading}
              className={`flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold transition ${
                selectedGoal && !loading
                  ? "bg-gradient-to-r from-[#d4af37] to-[#f3d58a] text-black shadow-[0_0_25px_rgba(212,175,55,0.15)] hover:scale-[1.02]"
                  : "cursor-not-allowed bg-white/10 text-white/30"
              }`}
            >

              {loading
                ? "Analyzing Your Training..."
                : "Generate My Recommendation"}

              {loading ? (
                <Activity className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}

            </button>

          </div>

        </div>
      )}

      {/* ==========================================
          PERSONALIZED RECOMMENDATION
      ========================================== */}

      {showPlan && recommendation && (

        <div className="relative z-10 mx-auto max-w-6xl">

          <div className="overflow-hidden rounded-3xl border border-[#d4af37]/20 bg-gradient-to-br from-[#17121f] via-[#0e0c13] to-[#0a090d] shadow-2xl">

            {/* ==========================================
                RECOMMENDATION HEADER
            ========================================== */}

            <div className="border-b border-white/10 p-6 sm:p-8">

              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10">

                    <Sparkles className="h-6 w-6 text-[#f3d58a]" />

                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37]">
                      Your AI Recommendation
                    </p>

                    <h2 className="text-2xl font-bold sm:text-3xl">
                      {recommendation.title}
                    </h2>

                  </div>

                </div>

                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60">

                  {
                    goals.find(
                      (goal) =>
                        goal.id === selectedGoal
                    )?.title
                  }

                </span>

              </div>

              <p className="max-w-3xl text-sm leading-7 text-white/60 sm:text-base">

                {analysis?.coachingAdvice ||
                  recommendation.fallbackMessage}

              </p>

            </div>

            {/* ==========================================
                TRAINING SNAPSHOT
            ========================================== */}

            <div className="border-b border-white/10 p-6 sm:p-8">

              <div className="mb-5">

                <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37]">
                  Your Training Snapshot
                </p>

                <h3 className="mt-1 text-xl font-semibold">
                  Based on your GymNance activity
                </h3>

              </div>

              {coachData?.stats && (

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <Stat
                    icon={Activity}
                    label="Workouts"
                    value={coachData.stats.totalWorkouts}
                  />

                  <Stat
                    icon={Dumbbell}
                    label="Sets"
                    value={coachData.stats.totalSets}
                  />

                  <Stat
                    icon={TrendingUp}
                    label="Reps"
                    value={coachData.stats.totalReps}
                  />

                  <Stat
                    icon={Trophy}
                    label="Volume"
                    value={coachData.stats.totalVolume}
                  />

                </div>

              )}

            </div>

            {/* ==========================================
                TRAINING ANALYSIS
            ========================================== */}

            {analysis && (

              <div className="border-b border-white/10 p-6 sm:p-8">

                <div className="mb-6 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-400/20 bg-purple-500/10">

                    <BarChart3 className="h-5 w-5 text-purple-300" />

                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37]">
                      Training Analysis
                    </p>

                    <h3 className="text-xl font-semibold">
                      What your recent activity tells us
                    </h3>

                  </div>

                </div>

                <div className="grid gap-4 sm:grid-cols-2">

                  <AnalysisCard
                    icon={CalendarDays}
                    title="Training Frequency"
                    text={analysis.trainingFrequency}
                  />

                  <AnalysisCard
                    icon={Activity}
                    title="Consistency"
                    text={analysis.consistency}
                  />

                  <AnalysisCard
                    icon={TrendingUp}
                    title="Recent Volume"
                    text={analysis.volumeStatus}
                  />

                  <AnalysisCard
                    icon={Dumbbell}
                    title="Most Frequent Workout"
                    text={
                      analysis.mostFrequentWorkout ||
                      "No workout type recorded yet."
                    }
                  />

                </div>

                {/* ==========================================
                    LAST 7 DAYS
                ========================================== */}

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.025] p-5">

                  <div className="mb-4 flex items-center gap-2">

                    <CalendarDays className="h-4 w-4 text-[#f3d58a]" />

                    <p className="text-sm font-semibold">
                      Last 7 Days
                    </p>

                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

                    <MiniMetric
                      label="Workouts"
                      value={analysis.workoutsLast7Days}
                    />

                    <MiniMetric
                      label="Active Days"
                      value={analysis.activeDaysLast7Days}
                    />

                    <MiniMetric
                      label="Sets"
                      value={analysis.setsLast7Days}
                    />

                    <MiniMetric
                      label="Volume"
                      value={analysis.volumeLast7Days}
                    />

                  </div>

                </div>

              </div>

            )}

            {/* ==========================================
                FOCUS AREAS
            ========================================== */}

            <div className="grid gap-5 p-6 sm:grid-cols-3 sm:p-8">

              {recommendation.focus.map(
                (item, index) => (

                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >

                    <p className="mb-2 text-xs uppercase tracking-widest text-[#d4af37]">
                      Focus {index + 1}
                    </p>

                    <h3 className="font-semibold">
                      {item}
                    </h3>

                  </div>

                )
              )}

            </div>

            {/* ==========================================
                RECOMMENDED WORKOUT
            ========================================== */}

            <div className="mx-6 mb-6 rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/[0.05] p-5 sm:mx-8 sm:mb-8">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="mb-1 text-xs uppercase tracking-widest text-[#d4af37]">
                    Recommended Workout
                  </p>

                  <h3 className="text-lg font-semibold">
                    {recommendation.workout}
                  </h3>

                </div>

                <button
                  onClick={() => {
                    window.location.href =
                      `/app/workouts/${recommendation.workoutId}`;
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#d4af37]/30 px-4 py-2 text-sm font-medium text-[#f3d58a] transition hover:bg-[#d4af37]/10"
                >

                  View Workout

                  <ArrowRight className="h-4 w-4" />

                </button>

              </div>

            </div>

            {/* ==========================================
                RESET
            ========================================== */}

            <div className="border-t border-white/10 p-6 sm:p-8">

              <button
                onClick={resetCoach}
                className="flex items-center gap-2 text-sm text-white/50 transition hover:text-[#f3d58a]"
              >

                <RotateCcw className="h-4 w-4" />

                Choose another goal

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

/* ==========================================
   STAT COMPONENT
========================================== */

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

      <div className="mb-3 flex items-center justify-between">

        <p className="text-xs uppercase tracking-widest text-white/40">
          {label}
        </p>

        <Icon className="h-4 w-4 text-[#d4af37]" />

      </div>

      <p className="text-2xl font-bold text-[#f3d58a]">
        {value}
      </p>

    </div>
  );
}

/* ==========================================
   ANALYSIS CARD
========================================== */

function AnalysisCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

      <div className="mb-4 flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/10">

          <Icon className="h-4 w-4 text-[#f3d58a]" />

        </div>

        <h4 className="font-semibold">
          {title}
        </h4>

      </div>

      <p className="text-sm leading-6 text-white/55">
        {text}
      </p>

    </div>
  );
}

/* ==========================================
   MINI METRIC
========================================== */

function MiniMetric({ label, value }) {
  return (
    <div>

      <p className="text-xs uppercase tracking-widest text-white/35">
        {label}
      </p>

      <p className="mt-1 text-lg font-semibold text-[#f3d58a]">
        {value}
      </p>

    </div>
  );
}