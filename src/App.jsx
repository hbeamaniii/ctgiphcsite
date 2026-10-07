import { Routes, Route, Navigate } from "react-router-dom";
import BibleStudyLayout from "./components/BibleStudyLayout";
import BibleStudy from "./pages/BibleStudy";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Leadership from "./pages/Leadership";
import Home from "./pages/Home";
import Media from "./pages/Media";
import Visit from "./pages/Visit";
import Announcements from "./pages/Announcements";
import Beliefs from "./pages/Beliefs";

function App() {
  // Amplify uses this mode for the bible-study branch. The full site stays
  // available in the normal build, so this page can later merge into master.
  if (import.meta.env.MODE === "bible-study") {
    return (
      <BibleStudyLayout>
        <Routes>
          <Route path="/biblestudy" element={<BibleStudy />} />
          <Route path="*" element={<Navigate to="/biblestudy" replace />} />
        </Routes>
      </BibleStudyLayout>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/media" element={<Media />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/beliefs" element={<Beliefs />} />
          <Route path="/biblestudy" element={<BibleStudy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
