import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RouteSeo from './components/RouteSeo';
import HomePage from './pages/HomePage';
import DocsPage from './pages/DocsPage';
import TroubleshootingPage from './pages/TroubleshootingPage';
import NextStepsPage from './pages/NextStepsPage';
import NotFoundPage from './pages/NotFoundPage';

// Scroll management component for hashes and route transitions
function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteSeo />
      <ScrollHandler />
      <div className="min-h-screen bg-[#07080B] text-[#F3F4F6] selection:bg-[#5C6CDB]/40 selection:text-white flex flex-col">
        {/* Sticky Glassmorphic Navbar */}
        <Navbar />

        {/* Page Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Official documentation route */}
            <Route path="/architecture" element={<DocsPage />} />
            <Route path="/troubleshooting" element={<TroubleshootingPage />} />
            <Route path="/download/next-steps" element={<NextStepsPage />} />
            <Route path="/download" element={<NextStepsPage />} />
            {/* Explicit 404 view for unknown routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Clean Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
