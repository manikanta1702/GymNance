import { ArrowRight, Dumbbell, Heart, BarChart3 } from "lucide-react";
import Navbar from "../components/Navbar";
import ThreeScene from "../components/ThreeScene";

export default function Landing() {
  return (
    <main className="min-h-screen bg-[#070609] text-[#F7F3EA] overflow-hidden">

      {/* =====================================================
    PAGE-WIDE LUXURY PARTICLES
   ===================================================== */}

<div className="absolute inset-0 overflow-hidden">

  {/* Gold particles */}

  <span className="absolute top-[12%] left-[8%] w-1 h-1 rounded-full bg-[#D4AF37]/60 animate-pulse" />

  <span className="absolute top-[20%] left-[24%] w-[3px] h-[3px] rounded-full bg-[#F3D58A]/50 animate-pulse" />

  <span className="absolute top-[15%] left-[47%] w-1 h-1 rounded-full bg-[#D4AF37]/50 animate-pulse" />

  <span className="absolute top-[28%] left-[72%] w-[3px] h-[3px] rounded-full bg-[#F3D58A]/60 animate-pulse" />

  <span className="absolute top-[10%] right-[8%] w-1 h-1 rounded-full bg-[#D4AF37]/50 animate-pulse" />

  <span className="absolute top-[42%] left-[5%] w-[3px] h-[3px] rounded-full bg-[#D4AF37]/40 animate-pulse" />

  <span className="absolute top-[52%] left-[32%] w-1 h-1 rounded-full bg-[#F3D58A]/50 animate-pulse" />

  <span className="absolute top-[65%] left-[12%] w-[3px] h-[3px] rounded-full bg-[#D4AF37]/50 animate-pulse" />

  <span className="absolute top-[72%] left-[45%] w-1 h-1 rounded-full bg-[#F3D58A]/40 animate-pulse" />

  <span className="absolute top-[82%] left-[70%] w-[3px] h-[3px] rounded-full bg-[#D4AF37]/50 animate-pulse" />

  <span className="absolute top-[88%] right-[12%] w-1 h-1 rounded-full bg-[#F3D58A]/50 animate-pulse" />

  <span className="absolute top-[62%] right-[6%] w-[3px] h-[3px] rounded-full bg-[#D4AF37]/40 animate-pulse" />


  {/* Purple particles */}

  <span className="absolute top-[18%] left-[16%] w-[3px] h-[3px] rounded-full bg-purple-400/40 animate-pulse" />

  <span className="absolute top-[32%] left-[55%] w-1 h-1 rounded-full bg-purple-400/50 animate-pulse" />

  <span className="absolute top-[48%] left-[82%] w-[3px] h-[3px] rounded-full bg-purple-400/40 animate-pulse" />

  <span className="absolute top-[58%] left-[23%] w-1 h-1 rounded-full bg-purple-400/50 animate-pulse" />

  <span className="absolute top-[76%] left-[58%] w-[3px] h-[3px] rounded-full bg-purple-400/40 animate-pulse" />

  <span className="absolute top-[90%] left-[30%] w-1 h-1 rounded-full bg-purple-400/50 animate-pulse" />

</div>


      {/* =====================================================
          NAVBAR
         ===================================================== */}

      <Navbar />


      {/* =====================================================
          HERO
         ===================================================== */}

      <section
        className="
          relative
          min-h-screen
          flex
          items-center
        "
      >

        <div
          className="
            relative
            z-10
            w-full
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            pt-28
            pb-24
          "
        >

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              items-center
              gap-8
              lg:gap-0
            "
          >

            {/* =================================================
                LEFT SIDE — TEXT
               ================================================= */}

            <div className="max-w-2xl">

              {/* Eyebrow */}
              <p
                className="
                  text-[#D4AF37]
                  font-semibold
                  tracking-[0.25em]
                  text-xs
                  sm:text-sm
                  mb-5
                "
              >
                YOUR FITNESS. YOUR JOURNEY.
              </p>


              {/* Main heading */}
              <h1
                className="
                  text-5xl
                  sm:text-6xl
                  lg:text-7xl
                  xl:text-8xl
                  font-black
                  leading-[0.9]
                  tracking-[-0.04em]
                "
              >

                TRAIN

                <br />

                <span className="text-[#D4AF37]">
                  SMARTER.
                </span>

              </h1>


              {/* Description */}
              <p
                className="
                  mt-7
                  max-w-xl
                  text-[#A8A3B2]
                  text-base
                  sm:text-lg
                  leading-relaxed
                "
              >
                Discover exercises, follow personalized workouts,
                track your nutrition, and watch your progress grow.
              </p>


              {/* =================================================
                  BUTTONS
                 ================================================= */}

              <div
                className="
                  mt-9
                  flex
                  flex-col
                  sm:flex-row
                  gap-4
                "
              >

                {/* Start Training */}
                <a
                  href="/signup"
                  className="
                    group
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    px-7
                    py-4
                    rounded-full
                    bg-[#D4AF37]
                    text-[#070609]
                    font-bold
                    transition-all
                    duration-300
                    hover:bg-[#F3D58A]
                    hover:shadow-[0_10px_40px_rgba(212,175,55,0.25)]
                    active:scale-95
                  "
                >

                  Start Training

                  <ArrowRight
                    size={19}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />

                </a>


                {/* Explore Exercises */}
                <a
                  href="/app/exercises"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    px-7
                    py-4
                    rounded-full
                    border
                    border-[#D4AF37]/40
                    text-[#F3D58A]
                    font-semibold
                    transition-all
                    duration-300
                    hover:bg-[#D4AF37]/10
                    hover:border-[#D4AF37]/70
                    active:scale-95
                  "
                >
                  Explore Exercises
                </a>

              </div>


              {/* =================================================
                  STATS
                 ================================================= */}

              <div
                className="
                  mt-12
                  grid
                  grid-cols-1
                  sm:grid-cols-3
                  gap-6
                  sm:gap-0
                  sm:divide-x
                  sm:divide-[#D4AF37]/20
                  max-w-2xl
                "
              >

                {/* Stat 1 */}
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    sm:px-5
                    sm:first:pl-0
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-11
                      h-11
                      rounded-full
                      bg-[#D4AF37]/10
                      text-[#D4AF37]
                    "
                  >
                    <Dumbbell size={21} />
                  </div>

                  <div>
                    <p className="text-xl font-bold">
                      500+
                    </p>

                    <p className="text-xs text-[#A8A3B2]">
                      EXERCISES
                    </p>
                  </div>

                </div>


                {/* Stat 2 */}
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    sm:px-5
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-11
                      h-11
                      rounded-full
                      bg-[#D4AF37]/10
                      text-[#D4AF37]
                    "
                  >
                    <BarChart3 size={21} />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      PERSONALIZED
                    </p>

                    <p className="text-xs text-[#A8A3B2]">
                      WORKOUT PLANS
                    </p>
                  </div>

                </div>


                {/* Stat 3 */}
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    sm:px-5
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-11
                      h-11
                      rounded-full
                      bg-[#D4AF37]/10
                      text-[#D4AF37]
                    "
                  >
                    <Heart size={21} />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      HEALTHIER
                    </p>

                    <p className="text-xs text-[#A8A3B2]">
                      HAPPIER YOU
                    </p>
                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                RIGHT SIDE — 3D
               ================================================= */}

            <div
              className="
                relative
                h-[420px]
                sm:h-[520px]
                lg:h-[650px]
                w-full
              "
            >

              {/* 3D scene */}
              <div className="absolute inset-0">
                <ThreeScene />
              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            SCROLL INDICATOR
           ===================================================== */}

        <div
          className="
            absolute
            bottom-7
            left-1/2
            -translate-x-1/2
            hidden
            sm:flex
            flex-col
            items-center
            gap-3
            text-[#A8A3B2]
          "
        >

          <div
            className="
              w-6
              h-10
              rounded-full
              border
              border-[#D4AF37]/40
              flex
              justify-center
              pt-2
            "
          >

            <div
              className="
                w-1
                h-2
                rounded-full
                bg-[#D4AF37]
                animate-bounce
              "
            />

          </div>

          <span
            className="
              text-[9px]
              tracking-[0.3em]
            "
          >
            SCROLL TO EXPLORE
          </span>

        </div>

      </section>


      {/* =====================================================
          BOTTOM DECORATIVE LINE
         ===================================================== */}

      <div
        className="
          h-px
          w-full
          bg-gradient-to-r
          from-transparent
          via-[#D4AF37]/30
          to-transparent
        "
      />

    </main>
  );
}