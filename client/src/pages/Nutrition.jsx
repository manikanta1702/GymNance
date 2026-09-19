import { useState } from "react";
import {
  Apple,
  Flame,
  Beef,
  Wheat,
  Droplets,
  Plus,
  Utensils,
  ChevronRight,
} from "lucide-react";

const meals = [
  {
    id: 1,
    name: "Breakfast",
    description: "Start your day strong",
    calories: 0,
    protein: 0,
    icon: Apple,
  },
  {
    id: 2,
    name: "Lunch",
    description: "Fuel your training",
    calories: 0,
    protein: 0,
    icon: Utensils,
  },
  {
    id: 3,
    name: "Dinner",
    description: "Recover and rebuild",
    calories: 0,
    protein: 0,
    icon: Utensils,
  },
  {
    id: 4,
    name: "Snacks",
    description: "Keep your energy up",
    calories: 0,
    protein: 0,
    icon: Apple,
  },
];

function Nutrition() {
  const [water, setWater] = useState(0);

  const calorieGoal = 2500;
  const proteinGoal = 150;
  const carbsGoal = 280;
  const fatsGoal = 70;

  const caloriesConsumed = 0;
  const proteinConsumed = 0;
  const carbsConsumed = 0;
  const fatsConsumed = 0;

  const waterGoal = 8;

  const caloriePercentage = Math.min(
    (caloriesConsumed / calorieGoal) * 100,
    100
  );

  const proteinPercentage = Math.min(
    (proteinConsumed / proteinGoal) * 100,
    100
  );

  const carbsPercentage = Math.min(
    (carbsConsumed / carbsGoal) * 100,
    100
  );

  const fatsPercentage = Math.min(
    (fatsConsumed / fatsGoal) * 100,
    100
  );

  const addWater = () => {
    if (water < waterGoal) {
      setWater((current) => current + 1);
    }
  };

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

            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
              Today's nutrition
            </div>
          </div>
        </div>

        {/* Daily Overview */}
        <section className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#12100c] via-[#0c0c10] to-[#100c18] p-6 shadow-2xl sm:p-8">

          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                Daily overview
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Today's targets
              </h2>
            </div>

            <div className="hidden rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 px-4 py-2 text-xs text-[#d4af37] sm:block">
              Personalized goals
            </div>
          </div>

          {/* Main calorie card */}
          <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">

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
                    {caloriesConsumed.toLocaleString()}
                    <span className="ml-2 text-sm font-normal text-zinc-600">
                      / {calorieGoal.toLocaleString()} kcal
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#f3d58a]"
                  style={{ width: `${caloriePercentage}%` }}
                />
              </div>

              <p className="mt-3 text-xs text-zinc-600">
                {calorieGoal - caloriesConsumed} kcal remaining
              </p>
            </div>

            {/* Macro cards */}
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
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                  Today's meals
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Fuel your day
                </h2>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {meals.map((meal) => {
                const Icon = meal.icon;

                return (
                  <button
                    key={meal.id}
                    type="button"
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
                      {meal.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                      <span className="text-xs text-zinc-600">
                        {meal.calories} kcal
                      </span>

                      <span className="text-xs text-zinc-600">
                        {meal.protein}g protein
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
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-4 py-3 font-bold text-black transition hover:bg-[#f3d58a]"
              >
                <Plus className="h-4 w-4" />
                Add glass
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-zinc-600">
                Stay consistent throughout the day for better training and
                recovery.
              </p>
            </div>
          </section>
        </div>

        {/* Coming next */}
        <section className="mt-8 rounded-2xl border border-[#d4af37]/10 bg-[#0d0d11] p-6 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                Coming next
              </p>

              <h3 className="mt-2 text-xl font-bold">
                Build your nutrition plan
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
                Soon you'll be able to add foods, track meals, calculate
                macros, and get personalized nutrition guidance from your AI
                Coach.
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5">
              <Utensils className="h-5 w-5 text-[#d4af37]" />
            </div>
          </div>
        </section>

      </div>
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
        {value}
        <span className="ml-1 text-xs font-normal text-zinc-600">
          {unit}
        </span>
      </p>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-[#d4af37]"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-[10px] text-zinc-700">
        Goal {goal}
        {unit}
      </p>
    </div>
  );
}

export default Nutrition;