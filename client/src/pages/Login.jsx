import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Dumbbell } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  setError("");

  if (!email || !password) {
    setError("Please enter your email and password.");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Login failed.");
      return;
    }

    // Save authentication data
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Go to the GymNance app
    navigate("/app/exercises");
  } catch (error) {
    setError("Unable to connect to the server.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-[#070609] text-[#F7F3EA] relative overflow-hidden">

      {/* =====================================================
          BACKGROUND GLOW
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

        <span className="absolute top-[25%] left-[25%] w-[3px] h-[3px] rounded-full bg-purple-400/40 animate-pulse" />

        <span className="absolute top-[18%] right-[15%] w-1 h-1 rounded-full bg-[#D4AF37]/40 animate-pulse" />

        <span className="absolute top-[55%] left-[8%] w-[3px] h-[3px] rounded-full bg-purple-400/40 animate-pulse" />

        <span className="absolute bottom-[20%] right-[12%] w-1 h-1 rounded-full bg-[#D4AF37]/50 animate-pulse" />

        <span className="absolute bottom-[10%] left-[35%] w-[3px] h-[3px] rounded-full bg-purple-400/30 animate-pulse" />

      </div>


      {/* =====================================================
          TOP LOGO
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
          LOGIN CONTENT
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
              Welcome Back
            </p>

            <h1
              className="
                text-4xl
                sm:text-5xl
                font-black
                tracking-tight
              "
            >
              Train{" "}

              <span className="text-[#D4AF37]">
                Smarter.
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
              Sign in to continue your fitness journey.
            </p>

          </div>


          {/* =================================================
              LOGIN CARD
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

            <form className="space-y-5" onSubmit={handleLogin}>
                {error && (
  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
    {error}
  </div>
)}


              {/* EMAIL */}

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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


              {/* PASSWORD */}

              <div>

                <div className="flex items-center justify-between mb-2">

                  <label
                    htmlFor="password"
                    className="
                      text-sm
                      font-medium
                      text-[#C5C0CA]
                    "
                  >
                    Password
                  </label>

                  <a
                    href="#"
                    className="
                      text-xs
                      text-[#D4AF37]
                      hover:text-[#F3D58A]
                      transition-colors
                    "
                  >
                    Forgot password?
                  </a>

                </div>


                <div className="relative">

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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


              {/* REMEMBER ME */}

              <label
                className="
                  flex
                  items-center
                  gap-3
                  cursor-pointer
                  select-none
                "
              >

                <input
                  type="checkbox"
                  className="
                    w-4
                    h-4
                    accent-[#D4AF37]
                  "
                />

                <span className="text-sm text-[#8F8998]">
                  Remember me
                </span>

              </label>


              {/* LOGIN BUTTON */}

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

                {loading ? "Signing In..." : "Sign In"}

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


            {/* DIVIDER */}

            <div className="flex items-center gap-4 my-7">

              <div className="h-px flex-1 bg-white/[0.08]" />

              <span className="text-xs text-[#5E5964]">
                OR
              </span>

              <div className="h-px flex-1 bg-white/[0.08]" />

            </div>


            {/* SIGNUP */}

            <p className="text-center text-sm text-[#8F8998]">

              Don't have an account?{" "}

              <a
                href="/signup"
                className="
                  text-[#D4AF37]
                  font-semibold
                  hover:text-[#F3D58A]
                  transition-colors
                "
              >
                Create one
              </a>

            </p>

          </div>


          {/* =================================================
              FOOTER TEXT
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