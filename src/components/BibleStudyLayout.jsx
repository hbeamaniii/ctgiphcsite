import { Link } from "react-router-dom";

function BibleStudyLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-stone text-sanctuary">
      <a
        href="#study-resources"
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-lg bg-white px-5 py-3 font-semibold text-sanctuary shadow-soft focus:translate-y-0"
      >
        Skip to study notes
      </a>
      <header className="border-b border-white/15 bg-sanctuary text-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-6">
          <Link
            to="/biblestudy"
            className="rounded-sm text-sm font-semibold uppercase tracking-[0.16em] text-skyglass focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
          >
            Christ Temple GIPHC
          </Link>
          <span className="text-sm text-bronze">Bible Study</span>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-sanctuary/10 px-6 py-8 text-sm text-sanctuary/70">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Christ Temple GIPHC, Inc.</p>
          <p>White Plains, New York</p>
        </div>
      </footer>
    </div>
  );
}

export default BibleStudyLayout;
