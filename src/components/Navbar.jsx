import { useState } from "react";
import { Link } from "react-router-dom";

const fullSiteLinks = [
  { to: "/", label: "Home" },
  { to: "/beliefs", label: "Beliefs" },
  { to: "/leadership", label: "Leadership" },
  { to: "/media", label: "Media" },
  { to: "/announcements", label: "Announcements" },
  { to: "/biblestudy", label: "Bible Study" },
  { to: "/visit", label: "Visit" },
];

function Navbar({ studyOnly = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const links = studyOnly
    ? [{ to: "/biblestudy", label: "Bible Study" }]
    : fullSiteLinks;

  return (
    <nav className="bg-sanctuary px-6 py-4 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <Link
          to={studyOnly ? "/biblestudy" : "/"}
          className="rounded-sm text-sm font-semibold uppercase tracking-[0.2em] text-skyglass focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
        >
          Christ Temple GIPHC
        </Link>

        <div
          className={`${studyOnly ? "flex" : "hidden lg:flex"} items-center gap-6 text-sm font-medium text-white/80`}
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-sm transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {!studyOnly && (
          <button
            type="button"
            className="flex text-xl text-white lg:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls={isOpen ? "site-mobile-menu" : undefined}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        )}
      </div>

      {!studyOnly && isOpen && (
        <div
          id="site-mobile-menu"
          className="mt-4 flex flex-col gap-4 px-2 text-sm font-medium text-white/80 lg:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="rounded-sm transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
