import { useEffect, useMemo, useState } from "react";
import {
  Apple,
  Flame,
  Beef,
  Wheat,
  Droplets,
  Plus,
  Utensils,
  ChevronRight,
  Loader2,
  RefreshCw,
  X,
  Scale,
  Trash2,
  Settings,
} from "lucide-react";

const API_URL = "http://localhost:5000";

const mealTypes = [
  {
    name: "Breakfast",
    description: "Start your day strong",
    icon: Apple,
  },
  {
    name: "Lunch",
    description: "Fuel your training",
    icon: Utensils,
  },
  {
    name: "Dinner",
    description: "Recover and rebuild",
    icon: Utensils,
  },
  {
    name: "Snacks",
    description: "Keep your energy up",
    icon: Apple,
  },
];

const emptyFoodForm = {
  foodName: "",
  calories: "",
  protein: "",
  carbs: "",
  fats: "",
  quantity: "1",
};

function Nutrition() {
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showGoalsModal, setShowGoalsModal] = useState(false);
const [savingGoals, setSavingGoals] = useState(false);

const [goalForm, setGoalForm] = useState({
  calorie_goal: 2500,
  protein_goal: 150,
  carbs_goal: 280,
  fats_goal: 70,
  water_goal: 8,
});
  
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [viewingMeal, setViewingMeal] = useState(null);
  const [deletingFood, setDeletingFood] = useState(null);
  const [foodForm, setFoodForm] = useState(emptyFoodForm);

  const fetchNutrition = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await fetch(`${API_URL}/api/nutrition/today`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load nutrition data."
        );
      }

      setNutrition(data);
    } catch (err) {
      console.error("Nutrition fetch error:", err);
      setError(err.message || "Failed to load nutrition data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNutrition();
  }, []);
  useEffect(() => {
  if (nutrition?.goals) {
    setGoalForm({
      calorie_goal: Number(nutrition.goals.calorie_goal || 2500),
      protein_goal: Number(nutrition.goals.protein_goal || 150),
      carbs_goal: Number(nutrition.goals.carbs_goal || 280),
      fats_goal: Number(nutrition.goals.fats_goal || 70),
      water_goal: Number(nutrition.goals.water_goal || 8),
    });
  }
}, [nutrition]);
const handleGoalChange = (event) => {
  const { name, value } = event.target;

  setGoalForm((current) => ({
    ...current,
    [name]: value,
  }));
};

const handleSaveGoals = async (event) => {
  event.preventDefault();

  try {
    setSavingGoals(true);
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("You are not logged in.");
    }

    const response = await fetch(`${API_URL}/api/nutrition/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        calorie_goal: Number(goalForm.calorie_goal),
        protein_goal: Number(goalForm.protein_goal),
        carbs_goal: Number(goalForm.carbs_goal),
        fats_goal: Number(goalForm.fats_goal),
        water_goal: Number(goalForm.water_goal),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to save nutrition goals."
      );
    }

    setShowGoalsModal(false);

    await fetchNutrition();
  } catch (err) {
    console.error("Save nutrition goals error:", err);

    setError(
      err.message || "Failed to save nutrition goals."
    );
  } finally {
    setSavingGoals(false);
  }
};

  const goals = nutrition?.goals || {
    calorie_goal: 2500,
    protein_goal: 150,
    carbs_goal: 280,
    fats_goal: 70,
    water_goal: 8,
  };

  const totals = nutrition?.totals || {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  };

  const meals = nutrition?.meals || [];
  const water = Number(nutrition?.water || 0);

  const calorieGoal = Number(goals.calorie_goal || 0);
  const proteinGoal = Number(goals.protein_goal || 0);
  const carbsGoal = Number(goals.carbs_goal || 0);
  const fatsGoal = Number(goals.fats_goal || 0);
  const waterGoal = Number(goals.water_goal || 8);

  const caloriesConsumed = Number(totals.calories || 0);
  const proteinConsumed = Number(totals.protein || 0);
  const carbsConsumed = Number(totals.carbs || 0);
  const fatsConsumed = Number(totals.fats || 0);

  const caloriePercentage = Math.min(
    (caloriesConsumed / calorieGoal) * 100 || 0,
    100
  );

  const proteinPercentage = Math.min(
    (proteinConsumed / proteinGoal) * 100 || 0,
    100
  );

  const carbsPercentage = Math.min(
    (carbsConsumed / carbsGoal) * 100 || 0,
    100
  );

  const fatsPercentage = Math.min(
    (fatsConsumed / fatsGoal) * 100 || 0,
    100
  );

  const mealSummary = useMemo(() => {
    return mealTypes.map((mealType) => {
      const entries = meals.filter(
        (meal) =>
          meal.meal_type?.toLowerCase() ===
          mealType.name.toLowerCase()
      );

      const summary = entries.reduce(
        (accumulator, meal) => {
          accumulator.calories += Number(meal.calories || 0);
          accumulator.protein += Number(meal.protein || 0);
          accumulator.carbs += Number(meal.carbs || 0);
          accumulator.fats += Number(meal.fats || 0);

          return accumulator;
        },
        {
          calories: 0,
          protein: 0,
          carbs: 0,
          fats: 0,
        }
      );

      return {
        ...mealType,
        ...summary,
        entries,
      };
    });
  }, [meals]);

  const openMealDetails = (meal) => {
  setViewingMeal(meal);
  setError("");
};

  const openMealModal = (mealName) => {
    setSelectedMeal(mealName);
    setFoodForm(emptyFoodForm);
    setError("");
  };

  const closeMealModal = () => {
    setSelectedMeal(null);
    setFoodForm(emptyFoodForm);
  };

  const handleFoodChange = (event) => {
    const { name, value } = event.target;

    setFoodForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleAddFood = async (event) => {
  event.preventDefault();

  if (!foodForm.foodName.trim()) {
    setError("Please enter a food name.");
    return;
  }

  if (!foodForm.calories) {
    setError("Please enter calories.");
    return;
  }

  try {
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("You are not logged in.");
    }

    const response = await fetch(`${API_URL}/api/nutrition/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mealType: selectedMeal,
        foodName: foodForm.foodName.trim(),
        calories: Number(foodForm.calories) || 0,
        protein: Number(foodForm.protein) || 0,
        carbs: Number(foodForm.carbs) || 0,
        fats: Number(foodForm.fats) || 0,
        quantity: Number(foodForm.quantity) || 1,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to add food."
      );
    }

    // Close the modal
    closeMealModal();

    // Reload today's nutrition from PostgreSQL
    await fetchNutrition();
  } catch (err) {
    console.error("Add food error:", err);

    setError(
      err.message || "Failed to add food."
    );
  }
};

  const handleDeleteFood = async (mealId) => {
    try {
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await fetch(
        `${API_URL}/api/nutrition/meals/${mealId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete food."
        );
      }

      setDeletingFood(null);
      setViewingMeal(null);

      await fetchNutrition();
    } catch (err) {
      console.error("Delete food error:", err);

      setDeletingFood(null);

      setError(
        err.message || "Failed to delete food."
      );
    }
  };

  const addWater = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await fetch(`${API_URL}/api/nutrition/water`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update water intake."
        );
      }

      setNutrition((current) => ({
        ...current,
        water: Number(data.glasses || 0),
      }));
    } catch (err) {
      console.error("Water update error:", err);
      setError(err.message || "Failed to update water intake.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08080b] text-[#f7f3ea]">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            <Loader2 className="h-5 w-5 animate-spin text-[#d4af37]" />
            Loading your nutrition...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080b] text-[#f7f3ea]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
            Fuel your performance
          </p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                Nutrition
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
                Track your daily nutrition, stay hydrated, and give your body
                the fuel it needs to perform.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchNutrition}
              className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs text-zinc-500 transition hover:border-[#d4af37]/30 hover:text-[#d4af37]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-400/20 bg-red-400/5 px-5 py-4 text-sm text-red-300">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="text-red-300/60 hover:text-red-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Daily Overview */}
        <section className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#12100c] via-[#0c0c10] to-[#100c18] p-6 shadow-2xl sm:p-8">

          <div className="mb-8 flex items-center justify-between gap-4">
  <div>
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
      Daily overview
    </p>

    <h2 className="mt-2 text-2xl font-bold">
      Today's targets
    </h2>
  </div>

  <button
    type="button"
    onClick={() => setShowGoalsModal(true)}
    className="flex shrink-0 items-center gap-2 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5 px-4 py-2.5 text-xs font-semibold text-[#d4af37] transition hover:border-[#d4af37]/40 hover:bg-[#d4af37]/10"
  >
    <Settings className="h-4 w-4" />
    <span className="hidden sm:inline">
      Edit Goals
    </span>
  </button>
</div>

          <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">

            {/* Calories */}
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-400/20 bg-orange-400/10">
                  <Flame className="h-5 w-5 text-orange-300" />
                </div>

                <div>
                  <p className="text-sm text-zinc-500">
                    Calories
                  </p>

                  <p className="text-3xl font-black">
                    {Math.round(caloriesConsumed).toLocaleString()}
                    <span className="ml-2 text-sm font-normal text-zinc-600">
                      / {Math.round(calorieGoal).toLocaleString()} kcal
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#f3d58a] transition-all duration-500"
                  style={{ width: `${caloriePercentage}%` }}
                />
              </div>

              <p className="mt-3 text-xs text-zinc-600">
                {Math.max(
                  Math.round(calorieGoal - caloriesConsumed),
                  0
                ).toLocaleString()}{" "}
                kcal remaining
              </p>
            </div>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-3">
              <MacroCard
                icon={Beef}
                label="Protein"
                value={proteinConsumed}
                goal={proteinGoal}
                unit="g"
                percentage={proteinPercentage}
              />

              <MacroCard
                icon={Wheat}
                label="Carbs"
                value={carbsConsumed}
                goal={carbsGoal}
                unit="g"
                percentage={carbsPercentage}
              />

              <MacroCard
                icon={Flame}
                label="Fats"
                value={fatsConsumed}
                goal={fatsGoal}
                unit="g"
                percentage={fatsPercentage}
              />
            </div>
          </div>
        </section>

        {/* Meals + Water */}
        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">

          {/* Meals */}
          <section>
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                Today's meals
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Fuel your day
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {mealSummary.map((meal) => {
                const Icon = meal.icon;

                return (
                  <button
                    key={meal.name}
                    type="button"
                    onClick={() => openMealDetails(meal)}
                    className="group rounded-2xl border border-white/10 bg-[#0d0d11] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/30 hover:bg-[#111116]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5">
                        <Icon className="h-5 w-5 text-[#d4af37]" />
                      </div>

                      <ChevronRight className="h-5 w-5 text-zinc-700 transition group-hover:translate-x-1 group-hover:text-[#d4af37]" />
                    </div>

                    <h3 className="mt-5 text-lg font-bold">
                      {meal.name}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-600">
                      {meal.entries.length > 0
                        ? `${meal.entries.length} item${
                            meal.entries.length > 1 ? "s" : ""
                          } added`
                        : meal.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                      <span className="text-xs text-zinc-600">
                        {Math.round(meal.calories)} kcal
                      </span>

                      <span className="text-xs text-zinc-600">
                        {Math.round(meal.protein)}g protein
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Water */}
          <section>
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                Hydration
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Stay hydrated
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0d0d11] p-6">

              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                  <Droplets className="h-5 w-5 text-cyan-300" />
                </div>

                <span className="text-sm text-zinc-500">
                  {water} / {waterGoal} glasses
                </span>
              </div>

              <div className="mt-7 grid grid-cols-4 gap-2">
                {Array.from({ length: waterGoal }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-12 rounded-xl border transition ${
                      index < water
                        ? "border-cyan-400/30 bg-cyan-400/10"
                        : "border-white/5 bg-white/[0.02]"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={addWater}
                disabled={water >= waterGoal}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-4 py-3 font-bold text-black transition hover:bg-[#f3d58a] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
                {water >= waterGoal
                  ? "Daily goal reached"
                  : "Add glass"}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-zinc-600">
                Stay consistent throughout the day for better training and
                recovery.
              </p>
            </div>
          </section>
        </div>

        {/* Nutrition data status */}
        <section className="mt-8 rounded-2xl border border-[#d4af37]/10 bg-[#0d0d11] p-6 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                GymNance nutrition
              </p>

              <h3 className="mt-2 text-xl font-bold">
                Your nutrition data is now connected
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
                Your daily goals and hydration are stored securely for your
                GymNance account. Meal tracking will be added next.
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5">
              <Utensils className="h-5 w-5 text-[#d4af37]" />
            </div>
          </div>
        </section>

      </div>

      {/* Nutrition Goals Modal */}
      {showGoalsModal && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowGoalsModal(false);
            }
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d11] shadow-2xl shadow-black/70">
            <div className="border-b border-white/10 bg-gradient-to-r from-[#15120c] to-[#100c18] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                    Personal nutrition
                  </p>
                  <h2 className="mt-2 text-2xl font-black">
                    Your daily goals
                  </h2>
                  <p className="mt-2 text-sm leading-5 text-zinc-500">
                    Set your personal nutrition targets. Your changes will be
                    saved to your GymNance account.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGoalsModal(false)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition hover:border-[#d4af37]/30 hover:text-[#d4af37]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveGoals} className="space-y-5 p-6">
              <GoalInput
                label="Daily Calories"
                name="calorie_goal"
                value={goalForm.calorie_goal}
                onChange={handleGoalChange}
                unit="kcal"
              />
              <GoalInput
                label="Protein"
                name="protein_goal"
                value={goalForm.protein_goal}
                onChange={handleGoalChange}
                unit="g"
              />
              <GoalInput
                label="Carbohydrates"
                name="carbs_goal"
                value={goalForm.carbs_goal}
                onChange={handleGoalChange}
                unit="g"
              />
              <GoalInput
                label="Fats"
                name="fats_goal"
                value={goalForm.fats_goal}
                onChange={handleGoalChange}
                unit="g"
              />
              <GoalInput
                label="Water"
                name="water_goal"
                value={goalForm.water_goal}
                onChange={handleGoalChange}
                unit="glasses"
              />

              <div className="flex gap-3 border-t border-white/5 pt-5">
                <button
                  type="button"
                  onClick={() => setShowGoalsModal(false)}
                  disabled={savingGoals}
                  className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-zinc-400 transition hover:border-white/20 hover:text-white disabled:opacity-40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingGoals}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#f3d58a] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingGoals ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Goals"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Food Modal */}
      {selectedMeal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeMealModal();
            }
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d11] shadow-2xl shadow-black/60">

            {/* Modal header */}
            <div className="border-b border-white/10 bg-gradient-to-r from-[#15120c] to-[#100c18] p-6">
              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                    Add nutrition
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    {selectedMeal}
                  </h2>

                  <p className="mt-2 text-sm text-zinc-500">
                    Add the food you consumed during this meal.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeMealModal}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition hover:border-[#d4af37]/30 hover:text-[#d4af37]"
                >
                  <X className="h-4 w-4" />
                </button>

              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleAddFood}
              className="space-y-5 p-6"
            >

              {/* Food name */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Food name
                </label>

                <div className="relative">
                  <Apple className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d4af37]" />

                  <input
                    type="text"
                    name="foodName"
                    value={foodForm.foodName}
                    onChange={handleFoodChange}
                    placeholder="e.g. Oats with banana"
                    className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-[#d4af37]/40"
                  />
                </div>
              </div>

              {/* Calories */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Calories
                </label>

                <div className="relative">
                  <Flame className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-300" />

                  <input
                    type="number"
                    min="0"
                    step="1"
                    name="calories"
                    value={foodForm.calories}
                    onChange={handleFoodChange}
                    placeholder="e.g. 350"
                    className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-[#d4af37]/40"
                  />
                </div>
              </div>

              {/* Macros */}
              <div className="grid grid-cols-3 gap-3">

                <NutritionInput
                  label="Protein"
                  name="protein"
                  value={foodForm.protein}
                  onChange={handleFoodChange}
                  placeholder="25"
                />

                <NutritionInput
                  label="Carbs"
                  name="carbs"
                  value={foodForm.carbs}
                  onChange={handleFoodChange}
                  placeholder="40"
                />

                <NutritionInput
                  label="Fats"
                  name="fats"
                  value={foodForm.fats}
                  onChange={handleFoodChange}
                  placeholder="10"
                />

              </div>

              {/* Quantity */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Quantity
                </label>

                <div className="relative">
                  <Scale className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d4af37]" />

                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    name="quantity"
                    value={foodForm.quantity}
                    onChange={handleFoodChange}
                    className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#d4af37]/40"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 border-t border-white/5 pt-5">

                <button
                  type="button"
                  onClick={closeMealModal}
                  className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-zinc-400 transition hover:border-white/20 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#f3d58a]"
                >
                  <Plus className="h-4 w-4" />
                  Add Food
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
            {/* Meal Details Modal */}
      {viewingMeal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setViewingMeal(null);
            }
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d11] shadow-2xl shadow-black/60">

            {/* Header */}
            <div className="border-b border-white/10 bg-gradient-to-r from-[#15120c] to-[#100c18] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                    Meal details
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    {viewingMeal.name}
                  </h2>

                  <p className="mt-2 text-sm text-zinc-500">
                    Today's food entries
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setViewingMeal(null)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition hover:border-[#d4af37]/30 hover:text-[#d4af37]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Food entries */}
            <div className="max-h-[55vh] overflow-y-auto p-6">

              {viewingMeal.entries.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-black/10 px-5 py-10 text-center">
                  <Apple className="mx-auto h-8 w-8 text-zinc-700" />

                  <h3 className="mt-4 text-base font-bold text-zinc-300">
                    No food added yet
                  </h3>

                  <p className="mt-2 text-sm text-zinc-600">
                    Add your first food item to start tracking this meal.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {viewingMeal.entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
  <div>
    <h3 className="font-bold text-zinc-200">
      {entry.food_name}
    </h3>

    <p className="mt-1 text-xs text-zinc-600">
      Quantity: {entry.quantity}
    </p>
  </div>

  <div className="flex items-center gap-3">
    <span className="text-sm font-bold text-[#d4af37]">
      {Math.round(Number(entry.calories || 0))} kcal
    </span>

    <button
      type="button"
      onClick={() => setDeletingFood(entry)}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-400/10 bg-red-400/5 text-zinc-600 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
      title="Delete food"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  </div>
</div>

                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-center">
                          <p className="text-[10px] uppercase tracking-wider text-zinc-700">
                            Protein
                          </p>
                          <p className="mt-1 text-xs text-zinc-400">
                            {Math.round(Number(entry.protein || 0))}g
                          </p>
                        </div>

                        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-center">
                          <p className="text-[10px] uppercase tracking-wider text-zinc-700">
                            Carbs
                          </p>
                          <p className="mt-1 text-xs text-zinc-400">
                            {Math.round(Number(entry.carbs || 0))}g
                          </p>
                        </div>

                        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-center">
                          <p className="text-[10px] uppercase tracking-wider text-zinc-700">
                            Fats
                          </p>
                          <p className="mt-1 text-xs text-zinc-400">
                            {Math.round(Number(entry.fats || 0))}g
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="border-t border-white/10 p-6">

              <button
                type="button"
                onClick={() => {
                  const mealName = viewingMeal.name;

                  setViewingMeal(null);
                  openMealModal(mealName);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#f3d58a]"
              >
                <Plus className="h-4 w-4" />
                Add Food
              </button>

            </div>
          </div>
        </div>
      )}
      {/* Delete Food Confirmation Modal */}
      {deletingFood && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 px-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDeletingFood(null);
            }
          }}
        >
          <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d11] shadow-2xl shadow-black/70">
            <div className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10">
                <Trash2 className="h-5 w-5 text-red-300" />
              </div>

              <h2 className="mt-5 text-xl font-black text-white">
                Delete food?
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Are you sure you want to remove{" "}
                <span className="font-semibold text-zinc-300">
                  "{deletingFood.food_name}"
                </span>{" "}
                from your meal?
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setDeletingFood(null)}
                  className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-zinc-400 transition hover:border-white/20 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteFood(deletingFood.id)}
                  className="flex-1 rounded-xl bg-red-500/90 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
function GoalInput({
  label,
  name,
  value,
  onChange,
  unit,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          min="1"
          step="1"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 pr-20 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-[#d4af37]/40"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-600">
          {unit}
        </span>
      </div>
    </div>
  );
}

function NutritionInput({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {label} (g)
      </label>

      <input
        type="number"
        min="0"
        step="0.1"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-[#d4af37]/40"
      />
    </div>
  );
}

function MacroCard({
  icon: Icon,
  label,
  value,
  goal,
  unit,
  percentage,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <Icon className="h-4 w-4 text-[#d4af37]" />

      <p className="mt-4 text-xs text-zinc-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold">
        {Math.round(value)}
        <span className="ml-1 text-xs font-normal text-zinc-600">
          {unit}
        </span>
      </p>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-[#d4af37] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-[10px] text-zinc-700">
        Goal {Math.round(goal)}
        {unit}
      </p>
    </div>
  );
}

export default Nutrition;