import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
         ===================================================== */}

      <header className="fixed top-0 left-0 right-0 z-50">

        <nav
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            py-5
            flex
            items-center
            justify-between
          "
        >

          {/* =================================================
              LOGO
             ================================================= */}

          <a
            href="/"
            onClick={closeMenu}
            className="
              relative
              z-50
              text-2xl
              sm:text-3xl
              font-black
              tracking-tight
            "
          >
            <span className="text-[#F7F3EA]">
              Gym
            </span>

            <span className="text-[#D4AF37]">
              Nance
            </span>
          </a>


          {/* =================================================
              DESKTOP NAVIGATION
             ================================================= */}

          <div
            className="
              hidden
              lg:flex
              items-center
              gap-8
              ml-10
            "
          >

            <a
              href="/"
              className="
                text-sm
                text-[#F7F3EA]
                transition-colors
                hover:text-[#D4AF37]
              "
            >
              Home
            </a>

            <a
              href="/app/exercises"
              className="
                text-sm
                text-[#A8A3B2]
                transition-colors
                hover:text-[#D4AF37]
              "
            >
              Exercises
            </a>

            <a
              href="/app/workouts"
              className="
                text-sm
                text-[#A8A3B2]
                transition-colors
                hover:text-[#D4AF37]
              "
            >
              Workouts
            </a>

            <a
              href="/app/nutrition"
              className="
                text-sm
                text-[#A8A3B2]
                transition-colors
                hover:text-[#D4AF37]
              "
            >
              Nutrition
            </a>

            <a
              href="/about"
              className="
                text-sm
                text-[#A8A3B2]
                transition-colors
                hover:text-[#D4AF37]
              "
            >
              About
            </a>

          </div>


          {/* =================================================
              DESKTOP ACTIONS
             ================================================= */}

          <div
            className="
              hidden
              lg:flex
              items-center
              gap-6
            "
          >

            <a
              href="/login"
              className="
                text-sm
                text-[#F7F3EA]
                transition-colors
                hover:text-[#D4AF37]
              "
            >
              Login
            </a>

            <a
              href="/signup"
              className="
                group
                inline-flex
                items-center
                gap-2
                px-6
                py-3
                rounded-full
                bg-[#D4AF37]
                text-[#070609]
                text-sm
                font-bold
                transition-all
                duration-300
                hover:bg-[#F3D58A]
                hover:shadow-[0_8px_35px_rgba(212,175,55,0.25)]
                active:scale-95
              "
            >
              Get Started

              <ArrowRight
                size={16}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />

            </a>

          </div>


          {/* =================================================
              MOBILE MENU BUTTON
             ================================================= */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="
              relative
              z-50
              lg:hidden
              flex
              items-center
              justify-center
              w-11
              h-11
              rounded-full
              border
              border-[#D4AF37]/30
              text-[#D4AF37]
              transition-all
              duration-300
              hover:bg-[#D4AF37]/10
            "
          >

            {menuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}

          </button>

        </nav>


        {/* ===================================================
            MOBILE MENU
           =================================================== */}

        <div
          className={`
            lg:hidden
            fixed
            inset-0
            z-40
            bg-[#070609]/95
            backdrop-blur-xl
            transition-all
            duration-500
            ${
              menuOpen
                ? "opacity-100 visible"
                : "opacity-0 invisible pointer-events-none"
            }
          `}
        >

          <div
            className="
              min-h-screen
              flex
              flex-col
              px-6
              pt-24
              pb-10
            "
          >

            {/* Royal glow */}

            <div
              className="
                pointer-events-none
                absolute
                top-20
                right-0
                w-72
                h-72
                rounded-full
                bg-purple-900/20
                blur-[120px]
              "
            />


            {/* Mobile links */}

            <div
              className="
                relative
                flex
                flex-col
                gap-4
              "
            >

              <a
                href="/"
                onClick={closeMenu}
                className="
                  text-1xl sm:text-2xl
                  font-bold
                  text-[#F7F3EA]
                  hover:text-[#D4AF37]
                  transition-colors
                "
              >
                Home
              </a>

              <a
                href="/app/exercises"
                onClick={closeMenu}
                className="
                  text-1xl sm:text-2xl
                  font-bold
                  text-[#A8A3B2]
                  hover:text-[#D4AF37]
                  transition-colors
                "
              >
                Exercises
              </a>

              <a
                href="/app/workouts"
                onClick={closeMenu}
                className="
                  text-1xl sm:text-2xl
                  font-bold
                  text-[#A8A3B2]
                  hover:text-[#D4AF37]
                  transition-colors
                "
              >
                Workouts
              </a>

              <a
                href="/app/nutrition"
                onClick={closeMenu}
                className="
                  text-1xl sm:text-2xl
                  font-bold
                  text-[#A8A3B2]
                  hover:text-[#D4AF37]
                  transition-colors
                "
              >
                Nutrition
              </a>

              <a
                href="/about"
                onClick={closeMenu}
                className="
                  text-1xl sm:text-2xl
                  font-bold
                  text-[#A8A3B2]
                  hover:text-[#D4AF37]
                  transition-colors
                "
              >
                About
              </a>

            </div>


            {/* Divider */}

            <div className="my-6 h-px bg-[#D4AF37]/20" />


            {/* Mobile actions */}

            <div className="flex flex-col gap-4">

              <a
                href="/login"
                onClick={closeMenu}
                className="
                  flex
                  items-center
                  justify-center
                  py-2
                  rounded-full
                  border
                  border-[#D4AF37]/30
                  text-[#F7F3EA]
                  font-semibold
                  hover:bg-[#D4AF37]/10
                  transition-all
                "
              >
                Login
              </a>

              <a
                href="/signup"
                onClick={closeMenu}
                className="
                  group
                  flex
                  items-center
                  justify-center
                  gap-2
                  py-2
                  rounded-full
                  bg-[#D4AF37]
                  text-[#070609]
                  font-bold
                  hover:bg-[#F3D58A]
                  transition-all
                "
              >
                Get Started

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                  "
                />

              </a>

            </div>


            {/* Bottom text */}

            <div className="mt-auto">

              <p
                className="
                  text-xs
                  tracking-[0.25em]
                  text-[#6F6A76]
                  text-center
                "
              >
                YOUR FITNESS. YOUR JOURNEY.
              </p>

            </div>

          </div>

        </div>

      </header>
    </>
  );
}