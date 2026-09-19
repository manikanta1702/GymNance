import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Dumbbell,
  Check,
} from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Get values directly from the form
    const formData = new FormData(e.currentTarget);

    const fullNameValue = String(
      formData.get("fullName") || ""
    ).trim();

    const emailValue = String(
      formData.get("email") || ""
    ).trim();

    const passwordValue = String(
      formData.get("password") || ""
    );

    const confirmPasswordValue = String(
      formData.get("confirmPassword") || ""
    );

    // Update React state
    setFullName(fullNameValue);
    setEmail(emailValue);
    setPassword(passwordValue);
    setConfirmPassword(confirmPasswordValue);

    // =========================
    // VALIDATION
    // =========================

    if (
      !fullNameValue ||
      !emailValue ||
      !passwordValue ||
      !confirmPasswordValue
    ) {
      setError("All fields are required.");
      return;
    }

    if (passwordValue !== confirmPasswordValue) {
      setError("Passwords do not match.");
      return;
    }

    if (passwordValue.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // =========================
      // SEND DATA TO BACKEND
      // =========================

      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // IMPORTANT:
            // Backend expects fullName
            fullName: fullNameValue,
            email: emailValue,
            password: passwordValue,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed.");
        return;
      }

      // =========================
      // SUCCESS
      // =========================

      setSuccess("Account created successfully!");

      // Clear form
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Go to login
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.error("Signup error:", error);
      setError(
        "Unable to connect to the server. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070609] text-[#F7F3EA] relative overflow-hidden">

      {/* =========================
          BACKGROUND GLOWS
      ========================== */}

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

      {/* =========================
          SUBTLE PARTICLES
      ========================== */}

      <div className="absolute inset-0 pointer-events-none">

        <span className="absolute top-[12%] left-[10%] w-1 h-1 rounded-full bg-[#D4AF37]/50 animate-pulse" />

        <span className="absolute top-[24%] left-[24%] w-[3px] h-[3px] rounded-full bg-purple-400/40 animate-pulse" />

        <span className="absolute top-[18%] right-[15%] w-1 h-1 rounded-full bg-[#D4AF37]/40 animate-pulse" />

        <span className="absolute top-[48%] right-[8%] w-[3px] h-[3px] rounded-full bg-purple-400/40 animate-pulse" />

        <span className="absolute bottom-[20%] left-[12%] w-1 h-1 rounded-full bg-[#D4AF37]/50 animate-pulse" />

        <span className="absolute bottom-[10%] right-[35%] w-[3px] h-[3px] rounded-full bg-purple-400/30 animate-pulse" />

      </div>

      {/* =========================
          LOGO
      ========================== */}

      <header className="absolute top-0 left-0 right-0 z-20">

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

      {/* =========================
          SIGNUP CONTENT
      ========================== */}

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

          {/* =========================
              ICON
          ========================== */}

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

          {/* =========================
              HEADING
          ========================== */}

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

          {/* =========================
              SIGNUP CARD
          ========================== */}

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

            <form
              className="space-y-5"
              onSubmit={handleSignup}
              autoComplete="on"
            >

              {/* ERROR */}

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* SUCCESS */}

              {success && (
                <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                  {success}
                </div>
              )}

              {/* =========================
                  FULL NAME
              ========================== */}

              <div>

                <label
                  htmlFor="fullName"
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
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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

              {/* =========================
                  EMAIL
              ========================== */}

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
                  name="email"
                  type="email"
                  autoComplete="email"
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

              {/* =========================
                  PASSWORD
              ========================== */}

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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Create a password"
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

              {/* =========================
                  CONFIRM PASSWORD
              ========================== */}

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
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
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

              {/* =========================
                  TERMS
              ========================== */}

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
                  </a>.

                </span>

              </label>

              {/* =========================
                  CREATE ACCOUNT BUTTON
              ========================== */}

              <button
                type="submit"
                disabled={loading}
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
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >

                {loading
                  ? "Creating Account..."
                  : "Create Account"}

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

            {/* =========================
                DIVIDER
            ========================== */}

            <div className="flex items-center gap-4 my-7">

              <div className="h-px flex-1 bg-white/[0.08]" />

              <span className="text-xs text-[#5E5964]">
                OR
              </span>

              <div className="h-px flex-1 bg-white/[0.08]" />

            </div>

            {/* =========================
                LOGIN LINK
            ========================== */}

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

          {/* =========================
              FOOTER
          ========================== */}

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