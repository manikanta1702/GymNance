import { useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Dumbbell,
  Check,
} from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#070609] text-[#F7F3EA] relative overflow-hidden">

      {/* =====================================================
          BACKGROUND GLOWS
         ===================================================== */}

      <div
        className="
          absolute
          top-[-180px]
          right-[-120px]
          w-[500px]
          h-[500px]
          rounded-full
          bg-purple-900/20
          blur-[150px]
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-[-180px]
          left-[-120px]
          w-[450px]
          h-[450px]
          rounded-full
          bg-[#D4AF37]/5
          blur-[140px]
          pointer-events-none
        "
      />


      {/* =====================================================
          SUBTLE PARTICLES
         ===================================================== */}

      <div className="absolute inset-0 pointer-events-none">

        <span className="absolute top-[12%] left-[10%] w-1 h-1 rounded-full bg-[#D4AF37]/50 animate-pulse" />

        <span className="absolute top-[24%] left-[24%] w-[3px] h-[3px] rounded-full bg-purple-400/40 animate-pulse" />

        <span className="absolute top-[18%] right-[15%] w-1 h-1 rounded-full bg-[#D4AF37]/40 animate-pulse" />

        <span className="absolute top-[48%] right-[8%] w-[3px] h-[3px] rounded-full bg-purple-400/40 animate-pulse" />

        <span className="absolute bottom-[20%] left-[12%] w-1 h-1 rounded-full bg-[#D4AF37]/50 animate-pulse" />

        <span className="absolute bottom-[10%] right-[35%] w-[3px] h-[3px] rounded-full bg-purple-400/30 animate-pulse" />

      </div>


      {/* =====================================================
          LOGO
         ===================================================== */}

      <header className="absolute top-0 left-0 right-0">

        <div className="max-w-7xl mx-auto px-6 py-6">

          <a
            href="/"
            className="text-2xl sm:text-3xl font-black tracking-tight"
          >
            <span className="text-[#F7F3EA]">
              Gym
            </span>

            <span className="text-[#D4AF37]">
              Nance
            </span>
          </a>

        </div>

      </header>


      {/* =====================================================
          SIGNUP CONTENT
         ===================================================== */}

      <section
        className="
          relative
          z-10
          min-h-screen
          flex
          items-center
          justify-center
          px-5
          py-28
        "
      >

        <div className="w-full max-w-md">


          {/* =================================================
              ICON
             ================================================= */}

          <div className="flex justify-center mb-7">

            <div
              className="
                w-14
                h-14
                rounded-2xl
                border
                border-[#D4AF37]/30
                bg-[#D4AF37]/5
                flex
                items-center
                justify-center
                shadow-[0_0_40px_rgba(212,175,55,0.08)]
              "
            >

              <Dumbbell
                size={25}
                className="text-[#D4AF37]"
              />

            </div>

          </div>


          {/* =================================================
              HEADING
             ================================================= */}

          <div className="text-center mb-8">

            <p
              className="
                text-xs
                tracking-[0.3em]
                uppercase
                text-[#D4AF37]
                mb-3
              "
            >
              Begin Your Journey
            </p>

            <h1
              className="
                text-4xl
                sm:text-5xl
                font-black
                tracking-tight
              "
            >
              Create{" "}

              <span className="text-[#D4AF37]">
                Account.
              </span>
            </h1>

            <p
              className="
                mt-4
                text-sm
                sm:text-base
                text-[#8F8998]
                leading-relaxed
              "
            >
              Build your profile and start training smarter.
            </p>

          </div>


          {/* =================================================
              SIGNUP CARD
             ================================================= */}

          <div
            className="
              rounded-3xl
              border
              border-white/[0.08]
              bg-white/[0.025]
              backdrop-blur-xl
              p-6
              sm:p-8
              shadow-[0_20px_80px_rgba(0,0,0,0.45)]
            "
          >

            <form className="space-y-5">


              {/* =================================================
                  FULL NAME
                 ================================================= */}

              <div>

                <label
                  htmlFor="name"
                  className="
                    block
                    text-sm
                    font-medium
                    text-[#C5C0CA]
                    mb-2
                  "
                >
                  Full name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    border
                    border-white/[0.1]
                    bg-black/30
                    text-[#F7F3EA]
                    placeholder:text-[#5E5964]
                    outline-none
                    transition-all
                    duration-300
                    focus:border-[#D4AF37]/60
                    focus:ring-2
                    focus:ring-[#D4AF37]/10
                  "
                />

              </div>


              {/* =================================================
                  EMAIL
                 ================================================= */}

              <div>

                <label
                  htmlFor="email"
                  className="
                    block
                    text-sm
                    font-medium
                    text-[#C5C0CA]
                    mb-2
                  "
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    border
                    border-white/[0.1]
                    bg-black/30
                    text-[#F7F3EA]
                    placeholder:text-[#5E5964]
                    outline-none
                    transition-all
                    duration-300
                    focus:border-[#D4AF37]/60
                    focus:ring-2
                    focus:ring-[#D4AF37]/10
                  "
                />

              </div>


              {/* =================================================
                  PASSWORD
                 ================================================= */}

              <div>

                <label
                  htmlFor="password"
                  className="
                    block
                    text-sm
                    font-medium
                    text-[#C5C0CA]
                    mb-2
                  "
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="
                      w-full
                      h-12
                      px-4
                      pr-12
                      rounded-xl
                      border
                      border-white/[0.1]
                      bg-black/30
                      text-[#F7F3EA]
                      placeholder:text-[#5E5964]
                      outline-none
                      transition-all
                      duration-300
                      focus:border-[#D4AF37]/60
                      focus:ring-2
                      focus:ring-[#D4AF37]/10
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-[#77717D]
                      hover:text-[#D4AF37]
                      transition-colors
                    "
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}

                  </button>

                </div>

              </div>


              {/* =================================================
                  CONFIRM PASSWORD
                 ================================================= */}

              <div>

                <label
                  htmlFor="confirmPassword"
                  className="
                    block
                    text-sm
                    font-medium
                    text-[#C5C0CA]
                    mb-2
                  "
                >
                  Confirm password
                </label>

                <div className="relative">

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    className="
                      w-full
                      h-12
                      px-4
                      pr-12
                      rounded-xl
                      border
                      border-white/[0.1]
                      bg-black/30
                      text-[#F7F3EA]
                      placeholder:text-[#5E5964]
                      outline-none
                      transition-all
                      duration-300
                      focus:border-[#D4AF37]/60
                      focus:ring-2
                      focus:ring-[#D4AF37]/10
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-[#77717D]
                      hover:text-[#D4AF37]
                      transition-colors
                    "
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}

                  </button>

                </div>

              </div>


              {/* =================================================
                  TERMS
                 ================================================= */}

              <label
                className="
                  flex
                  items-start
                  gap-3
                  cursor-pointer
                  select-none
                  pt-1
                "
              >

                <span
                  className="
                    w-4
                    h-4
                    mt-0.5
                    rounded
                    border
                    border-white/20
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >

                  <Check
                    size={12}
                    className="text-[#D4AF37]"
                  />

                </span>

                <span className="text-xs leading-relaxed text-[#8F8998]">

                  I agree to the{" "}

                  <a
                    href="#"
                    className="
                      text-[#D4AF37]
                      hover:text-[#F3D58A]
                    "
                  >
                    Terms of Service
                  </a>

                  {" "}and{" "}

                  <a
                    href="#"
                    className="
                      text-[#D4AF37]
                      hover:text-[#F3D58A]
                    "
                  >
                    Privacy Policy
                  </a>

                  .

                </span>

              </label>


              {/* =================================================
                  CREATE ACCOUNT BUTTON
                 ================================================= */}

              <button
                type="submit"
                className="
                  group
                  w-full
                  h-12
                  rounded-xl
                  bg-[#D4AF37]
                  text-[#070609]
                  font-bold
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition-all
                  duration-300
                  hover:bg-[#F3D58A]
                  hover:shadow-[0_10px_40px_rgba(212,175,55,0.18)]
                  active:scale-[0.98]
                "
              >

                Create Account

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />

              </button>

            </form>


            {/* =================================================
                DIVIDER
               ================================================= */}

            <div className="flex items-center gap-4 my-7">

              <div className="h-px flex-1 bg-white/[0.08]" />

              <span className="text-xs text-[#5E5964]">
                OR
              </span>

              <div className="h-px flex-1 bg-white/[0.08]" />

            </div>


            {/* =================================================
                LOGIN LINK
               ================================================= */}

            <p className="text-center text-sm text-[#8F8998]">

              Already have an account?{" "}

              <a
                href="/login"
                className="
                  text-[#D4AF37]
                  font-semibold
                  hover:text-[#F3D58A]
                  transition-colors
                "
              >
                Sign in
              </a>

            </p>

          </div>


          {/* =================================================
              FOOTER
             ================================================= */}

          <p
            className="
              text-center
              text-[10px]
              tracking-[0.25em]
              text-[#514C57]
              mt-8
            "
          >
            YOUR FITNESS. YOUR JOURNEY.
          </p>

        </div>

      </section>

    </main>
  );
}