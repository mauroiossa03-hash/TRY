import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DemoBanner from "./components/DemoBanner";
import Home from "./pages/Home";
import { PerformanceProvider } from "./lib/PerformanceContext";

const Telegram = lazy(() => import("./pages/Telegram"));
const Instagram = lazy(() => import("./pages/Instagram"));

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  return (
    <PerformanceProvider>
      <div className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-mint focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Vai al contenuto
        </a>
        <ScrollManager />
        <Navbar />
        <DemoBanner />
        <main id="main" className="flex-1">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/telegram" element={<Telegram />} />
              <Route path="/instagram" element={<Instagram />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </PerformanceProvider>
  );
}
