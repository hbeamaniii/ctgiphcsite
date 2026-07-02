import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Leadership from "./pages/Leadership";
import Home from "./pages/Home";
import Media from "./pages/Media";
import Visit from "./pages/Visit";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/media" element={<Media />} />
          <Route path="/visit" element={<Visit />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
