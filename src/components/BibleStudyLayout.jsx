import Navbar from "./Navbar";
import Footer from "./Footer";

function BibleStudyLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#study-resources"
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-full bg-bronze px-5 py-3 font-semibold text-sanctuary shadow-soft focus:translate-y-0"
      >
        Skip to study notes
      </a>
      <Navbar studyOnly />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default BibleStudyLayout;
