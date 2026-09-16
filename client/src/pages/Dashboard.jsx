import {
  Flame,
  Dumbbell,
  Clock3,
  ArrowRight,
  Play,
  TrendingUp,
  Apple,
  Bot,
} from "lucide-react";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const firstName = user?.full_name?.split(" ")[0] || "Athlete";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070609] px-5 py-8 text-[#F7F3EA] sm:px-8 lg:px-10">

      {/* Background Glows */}
      <div className="pointer-events-none absolute right-[-180px] top-[-180px] h-[450px] w-[450px] rounded-full bg-purple-900/15 blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-200px] left-[-150px] h-[450px] w-[450px] rounded-full bg-[#D4AF37]/5 blur-[150px]" />

      {/* Content */}
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

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-3">

          {/* Streak */}
          <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37]/20">

            <div className="flex items-start justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-400/10 bg-orange-400/5">
                <Flame size={20} className="text-orange-300" />
              </div>

              <span className="text-xs text-[#5E5964]">
                Consistency
              </span>

            </div>

            <p className="mt-5 text-3xl font-black">
              7
            </p>

            <p className="mt-1 text-sm text-[#8F8998]">
              Day streak
            </p>

          </div>

          {/* Workouts */}
          <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37]/20">

            <div className="flex items-start justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4AF37]/10 bg-[#D4AF37]/5">
                <Dumbbell size={20} className="text-[#D4AF37]" />
              </div>

              <span className="text-xs text-[#5E5964]">
                This month
              </span>

            </div>

            <p className="mt-5 text-3xl font-black">
              24
            </p>

            <p className="mt-1 text-sm text-[#8F8998]">
              Workouts completed
            </p>

          </div>

          {/* Time */}
          <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37]/20">

            <div className="flex items-start justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-400/10 bg-purple-400/5">
                <Clock3 size={20} className="text-purple-300" />
              </div>

              <span className="text-xs text-[#5E5964]">
                Total
              </span>

            </div>

            <p className="mt-5 text-3xl font-black">
              18.5
            </p>

            <p className="mt-1 text-sm text-[#8F8998]">
              Training hours
            </p>

          </div>

        </section>

        {/* Today's Workout */}
        <section className="mt-6">

          <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#D4AF37]/10 via-white/[0.025] to-purple-900/10 p-6 sm:p-8">

            {/* Decorative Glow */}
            <div className="pointer-events-none absolute right-[-80px] top-[-100px] h-[250px] w-[250px] rounded-full bg-[#D4AF37]/10 blur-[90px]" />

            <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

              <div>

                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                    Today's Workout
                  </span>
                </div>

                <h2 className="text-3xl font-black sm:text-4xl">
                  Upper Body
                </h2>

                <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#8F8998]">
                  Build strength across your chest, shoulders, arms, and back
                  with today's focused session.
                </p>

                <div className="mt-5 flex flex-wrap gap-5 text-sm text-[#8F8998]">

                  <span className="flex items-center gap-2">
                    <Dumbbell size={16} className="text-[#D4AF37]" />
                    6 Exercises
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock3 size={16} className="text-[#D4AF37]" />
                    45 Minutes
                  </span>

                </div>

              </div>

              <button className="group flex h-14 items-center justify-center gap-3 rounded-xl bg-[#D4AF37] px-7 font-bold text-[#070609] transition-all duration-300 hover:bg-[#F3D58A] hover:shadow-[0_12px_45px_rgba(212,175,55,0.2)] active:scale-[0.98]">

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10">
                  <Play size={15} fill="currentColor" />
                </span>

                Start Workout

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </button>

            </div>

          </div>

        </section>

        {/* Bottom Grid */}
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

              <TrendingUp className="text-[#D4AF37]" size={22} />

            </div>

            <div className="mt-7">

              <div className="mb-2 flex justify-between text-xs">
                <span className="text-[#8F8998]">
                  Weekly goal
                </span>

                <span className="text-[#F7F3EA]">
                  4 / 5 workouts
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">

                <div className="h-full w-[80%] rounded-full bg-[#D4AF37]" />

              </div>

              <p className="mt-4 text-xs text-[#5E5964]">
                One more workout to complete your weekly target.
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

              <a
                href="/app/exercises"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/20 p-4 transition-all hover:border-[#D4AF37]/20 hover:bg-white/[0.04]"
              >
                <Dumbbell size={18} className="text-[#D4AF37]" />
                <span className="text-sm font-medium">
                  Exercises
                </span>
              </a>

              <a
                href="/app/workouts"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/20 p-4 transition-all hover:border-[#D4AF37]/20 hover:bg-white/[0.04]"
              >
                <TrendingUp size={18} className="text-purple-300" />
                <span className="text-sm font-medium">
                  Workouts
                </span>
              </a>

              <a
                href="/app/nutrition"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/20 p-4 transition-all hover:border-[#D4AF37]/20 hover:bg-white/[0.04]"
              >
                <Apple size={18} className="text-green-300" />
                <span className="text-sm font-medium">
                  Nutrition
                </span>
              </a>

              <a
                href="/app/ai-coach"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/20 p-4 transition-all hover:border-[#D4AF37]/20 hover:bg-white/[0.04]"
              >
                <Bot size={18} className="text-[#D4AF37]" />
                <span className="text-sm font-medium">
                  AI Coach
                </span>
              </a>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}