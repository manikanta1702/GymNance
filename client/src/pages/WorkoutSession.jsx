import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Dumbbell,
  RotateCcw,
  Trophy,
} from "lucide-react";

import workouts from "../data/workouts";
import exercises from "../data/exercises";

export default function WorkoutSession() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const [currentExercise, setCurrentExercise] = useState(0);

  /*
    Stores sets separately for every exercise.

    Example:

    {
      1: [
        { weight: "40", reps: "10", completed: true }
      ],
      2: [
        { weight: "30", reps: "10", completed: false }
      ]
    }
  */
  const [exerciseSets, setExerciseSets] = useState(() => {
    const initialSets = {};

    workoutExercises.forEach((exercise) => {
      initialSets[exercise.id] = [
        {
          weight: "",
          reps: "",
          completed: false,
        },
      ];
    });

    return initialSets;
  });

  // Saving state
  const [isSaving, setIsSaving] = useState(false);

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#070609] px-5 py-10 text-[#F7F3EA] sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Dumbbell
            size={40}
            className="mx-auto text-[#D4AF37]"
          />

          <h1 className="mt-5 text-3xl font-black">
            Workout not found
          </h1>

          <p className="mt-3 text-sm text-[#8F8998]">
            The workout session you're looking for doesn't exist.
          </p>

          <Link
            to="/app/workouts"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#070609]"
          >
            <ArrowLeft size={16} />
            Back to Workouts
          </Link>
        </div>
      </div>
    );
  }

  const exercise = workoutExercises[currentExercise];

  if (!exercise) {
    return null;
  }

  const currentSets = exerciseSets[exercise.id] || [];

  const completedSets = currentSets.filter(
    (set) => set.completed
  ).length;

  /*
    Count exercises where at least one set has been completed.
  */
  const completedExercises = workoutExercises.filter(
    (item) =>
      exerciseSets[item.id]?.some(
        (set) => set.completed
      )
  ).length;

  const totalCompletedSets = Object.values(
  exerciseSets
).reduce(
  (total, sets) =>
    total +
    sets.filter((set) => set.completed).length,
  0
);

const totalSets = totalCompletedSets;

const totalReps = Object.values(exerciseSets).reduce(
  (total, sets) =>
    total +
    sets.reduce((setTotal, set) => {
      if (!set.completed) {
        return setTotal;
      }

      return setTotal + (Number(set.reps) || 0);
    }, 0),
  0
);

const totalVolume = Object.values(exerciseSets).reduce(
  (total, sets) =>
    total +
    sets.reduce((setTotal, set) => {
      if (!set.completed) {
        return setTotal;
      }

      const weight = Number(set.weight) || 0;
      const reps = Number(set.reps) || 0;

      return setTotal + weight * reps;
    }, 0),
  0
);

  const progress =
    workoutExercises.length > 0
      ? Math.round(
          (completedExercises /
            workoutExercises.length) *
            100
        )
      : 0;

  // Update a set
  const updateSet = (index, field, value) => {
    setExerciseSets((previous) => ({
      ...previous,

      [exercise.id]: previous[exercise.id].map(
        (set, setIndex) =>
          setIndex === index
            ? {
                ...set,
                [field]: value,
              }
            : set
      ),
    }));
  };

  // Add a new set
  const addSet = () => {
    setExerciseSets((previous) => ({
      ...previous,

      [exercise.id]: [
        ...previous[exercise.id],
        {
          weight: "",
          reps: "",
          completed: false,
        },
      ],
    }));
  };

  // Complete / uncomplete a set
  const completeSet = (index) => {
    setExerciseSets((previous) => ({
      ...previous,

      [exercise.id]: previous[exercise.id].map(
        (set, setIndex) =>
          setIndex === index
            ? {
                ...set,
                completed: !set.completed,
              }
            : set
      ),
    }));
  };

  // Reset current exercise
  const resetCurrentExercise = () => {
    setExerciseSets((previous) => ({
      ...previous,

      [exercise.id]: [
        {
          weight: "",
          reps: "",
          completed: false,
        },
      ],
    }));
  };

  // Next exercise
  const nextExercise = () => {
    if (
      currentExercise <
      workoutExercises.length - 1
    ) {
      setCurrentExercise(
        (previous) => previous + 1
      );
    }
  };

  // Previous exercise
  const previousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(
        (previous) => previous - 1
      );
    }
  };

  // Finish workout and save to PostgreSQL
  const finishWorkout = async () => {
    if (isSaving) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Your login session has expired. Please login again.");
      navigate("/login");
      return;
    }

    setIsSaving(true);

    // Convert frontend exerciseSets object
    // into database-friendly array
    const setsToSave = [];

    Object.entries(exerciseSets).forEach(
      ([exerciseId, sets]) => {
        sets.forEach((set, index) => {
          setsToSave.push({
            exerciseId: Number(exerciseId),
            setNumber: index + 1,
            weight: Number(set.weight) || 0,
            reps: Number(set.reps) || 0,
            completed: Boolean(set.completed),
          });
        });
      }
    );

    const summary = {
      workoutName: workout.name,

      exercisesCompleted:
        completedExercises,

      totalExercises:
        workoutExercises.length,

      totalSets,

      completedSets:
        totalCompletedSets,

      totalReps,

      totalVolume,

      exerciseSets,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/workouts/sessions",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            workoutId: workout.id,

            workoutName: workout.name,

            completedAt:
              new Date().toISOString(),

            totalSets,

            totalReps,

            totalVolume,

            sets: setsToSave,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save workout"
        );
      }

      console.log(
        "Workout saved successfully:",
        data
      );

      // Move to workout summary only
      // after successful database save
      navigate(
        `/app/workouts/${workout.id}/summary`,
        {
          state: {
            summary,
          },
        }
      );
    } catch (error) {
      console.error(
        "Workout save error:",
        error
      );

      alert(
        error.message ||
          "Could not save workout. Please try again."
      );

      setIsSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070609] px-4 py-6 text-[#F7F3EA] sm:px-8 lg:px-10">

      {/* Background glow */}
      <div className="pointer-events-none absolute right-[-180px] top-[-180px] h-[450px] w-[450px] rounded-full bg-purple-900/15 blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-200px] left-[-150px] h-[450px] w-[450px] rounded-full bg-[#D4AF37]/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* Top navigation */}
        <div className="flex items-center justify-between gap-4">

          <Link
            to={`/app/workouts/${workout.id}`}
            className="inline-flex items-center gap-2 text-sm text-[#8F8998] transition hover:text-[#D4AF37]"
          >
            <ArrowLeft size={16} />
            Exit Workout
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-[#8F8998]">
            <Clock3
              size={14}
              className="text-[#D4AF37]"
            />
            <span>Workout Mode</span>
          </div>

        </div>

        {/* Heading */}
        <section className="mt-7">

          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            {workout.category}
          </p>

          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                {workout.name}
              </h1>

              <p className="mt-2 text-sm text-[#8F8998]">
                Exercise {currentExercise + 1} of{" "}
                {workoutExercises.length}
              </p>

            </div>

            <div className="text-right">

              <p className="text-2xl font-black text-[#D4AF37]">
                {progress}%
              </p>

              <p className="text-[9px] uppercase tracking-wider text-[#5E5964]">
                Workout Progress
              </p>

            </div>

          </div>

          {/* Progress */}
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.06]">

            <div
              className="h-full rounded-full bg-[#D4AF37] transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </section>

        {/* Current Exercise */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#D4AF37]/10 via-white/[0.025] to-purple-900/10">

          {/* Exercise header */}
          <div className="border-b border-white/[0.07] p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10">

                <Dumbbell
                  size={24}
                  className="text-[#D4AF37]"
                />

              </div>

              <div className="min-w-0 flex-1">

                <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
                  Current Exercise
                </p>

                <h2 className="mt-1 text-2xl font-black sm:text-3xl">
                  {exercise.name}
                </h2>

                <p className="mt-2 text-sm text-[#8F8998]">
                  {exercise.muscle} •{" "}
                  {exercise.equipment}
                </p>

              </div>

            </div>

          </div>

          {/* Training log */}
          <div className="p-6 sm:p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[10px] uppercase tracking-[0.2em] text-[#5E5964]">
                  Training Log
                </p>

                <h3 className="mt-1 text-lg font-bold">
                  Sets
                </h3>

              </div>

              <button
                type="button"
                onClick={resetCurrentExercise}
                disabled={isSaving}
                className="inline-flex items-center gap-2 text-xs text-[#8F8998] transition hover:text-[#D4AF37] disabled:opacity-40"
              >
                <RotateCcw size={14} />
                Reset
              </button>

            </div>

            {/* Table heading */}
            <div className="mt-6 grid grid-cols-[50px_1fr_1fr_48px] gap-2 px-2 text-[9px] uppercase tracking-wider text-[#5E5964] sm:grid-cols-[60px_1fr_1fr_60px]">

              <span>Set</span>
              <span>Weight</span>
              <span>Reps</span>
              <span className="text-center">
                Done
              </span>

            </div>

            {/* Sets */}
            <div className="mt-2 space-y-2">

              {currentSets.map(
                (set, index) => (

                  <div
                    key={index}
                    className={`grid grid-cols-[50px_1fr_1fr_48px] items-center gap-2 rounded-xl border p-2 transition sm:grid-cols-[60px_1fr_1fr_60px] ${
                      set.completed
                        ? "border-[#D4AF37]/20 bg-[#D4AF37]/[0.06]"
                        : "border-white/[0.06] bg-black/20"
                    }`}
                  >

                    <div className="text-center text-sm font-bold text-[#8F8998]">
                      {index + 1}
                    </div>

                    <input
                      type="number"
                      min="0"
                      placeholder="kg"
                      value={set.weight}
                      disabled={isSaving}
                      onChange={(e) =>
                        updateSet(
                          index,
                          "weight",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 text-sm text-[#F7F3EA] outline-none placeholder:text-[#5E5964] focus:border-[#D4AF37]/30 disabled:opacity-50"
                    />

                    <input
                      type="number"
                      min="0"
                      placeholder="reps"
                      value={set.reps}
                      disabled={isSaving}
                      onChange={(e) =>
                        updateSet(
                          index,
                          "reps",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 text-sm text-[#F7F3EA] outline-none placeholder:text-[#5E5964] focus:border-[#D4AF37]/30 disabled:opacity-50"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        completeSet(index)
                      }
                      disabled={isSaving}
                      className={`mx-auto flex h-9 w-9 items-center justify-center rounded-lg border transition disabled:opacity-40 ${
                        set.completed
                          ? "border-[#D4AF37]/30 bg-[#D4AF37] text-[#070609]"
                          : "border-white/[0.08] bg-white/[0.025] text-[#5E5964] hover:border-[#D4AF37]/20 hover:text-[#D4AF37]"
                      }`}
                    >
                      <Check size={16} />
                    </button>

                  </div>

                )
              )}

            </div>

            {/* Add set */}
            <button
              type="button"
              onClick={addSet}
              disabled={isSaving}
              className="mt-4 w-full rounded-xl border border-dashed border-white/[0.08] py-3 text-xs font-semibold text-[#8F8998] transition hover:border-[#D4AF37]/20 hover:text-[#D4AF37] disabled:opacity-40"
            >
              + Add Set
            </button>

            {/* Current exercise summary */}
            <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3">

              <span className="text-xs text-[#8F8998]">
                Completed Sets
              </span>

              <span className="text-sm font-black text-[#D4AF37]">
                {completedSets} /{" "}
                {currentSets.length}
              </span>

            </div>

          </div>

        </section>

        {/* Form reminder */}
        <section className="mt-5 flex gap-3 rounded-2xl border border-purple-400/10 bg-purple-500/[0.035] p-5">

          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0 text-[#D4AF37]"
          />

          <div>

            <p className="text-xs font-bold">
              Form reminder
            </p>

            <p className="mt-1 text-xs leading-relaxed text-[#8F8998]">
              {exercise.tips?.[0] ||
                "Focus on controlled movement and maintain proper form throughout the exercise."}
            </p>

          </div>

        </section>

        {/* Workout totals */}
        <section className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-center">

            <p className="text-xl font-black text-[#D4AF37]">
              {completedExercises}
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-wider text-[#5E5964]">
              Exercises
            </p>

          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-center">

            <p className="text-xl font-black text-[#D4AF37]">
              {totalCompletedSets}
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-wider text-[#5E5964]">
              Sets Done
            </p>

          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-center">

            <p className="text-xl font-black text-[#D4AF37]">
              {totalVolume}
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-wider text-[#5E5964]">
              Volume
            </p>

          </div>

        </section>

        {/* Navigation */}
        <section className="mt-6 flex gap-3">

          <button
            type="button"
            onClick={previousExercise}
            disabled={
              currentExercise === 0 ||
              isSaving
            }
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3.5 text-sm font-semibold text-[#8F8998] transition hover:text-[#F7F3EA] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft size={17} />
            Previous
          </button>

          {currentExercise <
          workoutExercises.length - 1 ? (

            <button
              type="button"
              onClick={nextExercise}
              disabled={isSaving}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-4 py-3.5 text-sm font-bold text-[#070609] transition hover:bg-[#F3D58A] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next Exercise
              <ArrowRight size={17} />
            </button>

          ) : (

            <button
              type="button"
              onClick={finishWorkout}
              disabled={isSaving}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-4 py-3.5 text-sm font-bold text-[#070609] transition hover:bg-[#F3D58A] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trophy size={17} />

              {isSaving
                ? "Saving Workout..."
                : "Finish Workout"}
            </button>

          )}

        </section>

        {/* Exercise dots */}
        <div className="flex justify-center gap-2 py-7">

          {workoutExercises.map(
            (item, index) => (

              <button
                key={item.id}
                type="button"
                disabled={isSaving}
                onClick={() =>
                  setCurrentExercise(index)
                }
                className={`h-2 rounded-full transition-all disabled:opacity-40 ${
                  index === currentExercise
                    ? "w-7 bg-[#D4AF37]"
                    : exerciseSets[item.id]?.some(
                          (set) =>
                            set.completed
                        )
                      ? "w-2 bg-[#D4AF37]/40"
                      : "w-2 bg-white/[0.08]"
                }`}
                aria-label={`Go to exercise ${
                  index + 1
                }`}
              />

            )
          )}

        </div>

      </div>
    </div>
  );
}