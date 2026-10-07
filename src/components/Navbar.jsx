import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0A1826] px-6 py-4 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          to="/"
          className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D5E4F2]"
        >
          Christ Temple GIPHC
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-white/80">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <Link to="/beliefs" className="hover:text-white transition">
            Beliefs
          </Link>
          <Link to="/leadership" className="hover:text-white transition">
            Leadership
          </Link>
          <Link to="/media" className="hover:text-white transition">
            Media
          </Link>
          <Link to="/announcements" className="hover:text-white transition">
            Announcements
          </Link>
          <Link to="/biblestudy" className="hover:text-white transition">
            Bible Study
          </Link>
          <Link to="/visit" className="hover:text-white transition">
            Visit
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex lg:hidden text-white text-xl"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls={isOpen ? "site-mobile-menu" : undefined}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="site-mobile-menu"
          className="lg:hidden mt-4 flex flex-col gap-4 text-sm font-medium text-white/80 px-2"
        >
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-white transition"
          >
            Home
          </Link>
          <Link
            to="/beliefs"
            onClick={() => setIsOpen(false)}
            className="hover:text-white transition"
          >
            Beliefs
          </Link>
          <Link
            to="/leadership"
            onClick={() => setIsOpen(false)}
            className="hover:text-white transition"
          >
            Leadership
          </Link>
          <Link
            to="/media"
            onClick={() => setIsOpen(false)}
            className="hover:text-white transition"
          >
            Media
          </Link>
          <Link
            to="/announcements"
            onClick={() => setIsOpen(false)}
            className="hover:text-white transition"
          >
            Announcements
          </Link>
          <Link
            to="/visit"
            onClick={() => setIsOpen(false)}
            className="hover:text-white transition"
          >
            Visit
          </Link>
          <Link
            to="/biblestudy"
            onClick={() => setIsOpen(false)}
            className="hover:text-white transition"
          >
            Bible Study
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
