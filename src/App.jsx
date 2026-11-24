import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DocsPage from './pages/DocsPage';
import TroubleshootingPage from './pages/TroubleshootingPage';
import NextStepsPage from './pages/NextStepsPage';

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
      <ScrollHandler />
      <div className="min-h-screen bg-[#07080B] text-[#F3F4F6] selection:bg-[#5C6CDB]/40 selection:text-white flex flex-col">
        {/* Sticky Glassmorphic Navbar */}
        <Navbar />

        {/* Page Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Renamed /architecture route, with /docs aliased for backwards compatibility */}
            <Route path="/architecture" element={<DocsPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/troubleshooting" element={<TroubleshootingPage />} />
            <Route path="/download/next-steps" element={<NextStepsPage />} />
            <Route path="/download" element={<NextStepsPage />} />
            {/* Fallback to home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Clean Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
