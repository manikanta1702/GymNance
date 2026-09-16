import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-black tracking-tight"
        >
          Gym<span className="text-[#D4AF37]">Nance</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/login"
            className="text-zinc-300 hover:text-white transition-colors"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-6 py-3 rounded-full bg-[#D4AF37] text-[#070609] font-bold hover:bg-[#F3D58A] transition-all shadow-[0_0_25px_rgba(212,175,55,0.18)]"
          >
            Get Started
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-11 h-11 flex items-center justify-center rounded-full border border-zinc-700 text-white"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mx-5 rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl p-5">

          <div className="flex flex-col gap-4">

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl text-zinc-300 hover:bg-zinc-900"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-lime-400 text-black font-bold"
            >
              Get Started
            </Link>

          </div>

        </div>
      )}

    </header>
  );
}