import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AudioSimulator from './components/AudioSimulator';
import ProblemSolution from './components/ProblemSolution';
import BentoFeatures from './components/BentoFeatures';
import HowItWorks from './components/HowItWorks';
import ArchitectureDeepDive from './components/ArchitectureDeepDive';
import AppPreviewSection from './components/AppPreviewSection';
import FAQ from './components/FAQ';
import DownloadSection from './components/DownloadSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#07080B] text-[#F3F4F6] selection:bg-[#5C6CDB]/40 selection:text-white flex flex-col">
      {/* Sticky Glassmorphic Navbar */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Section A & B: Unified 3D Stage / Cockpit Hero */}
        <Hero />

        {/* Section C: Live Interactive Audio Equalizer / Experience */}
        <AudioSimulator />

        {/* Section D: Problem vs Solution (Side-by-Side Bento) */}
        <ProblemSolution />

        {/* Section E: Bento Grid Features (6 Interactive Cards) */}
        <BentoFeatures />

        {/* Section F: How It Works (3-Step Timeline) */}
        <HowItWorks />

        {/* Section G: Architecture & Systems Deep Dive (For Engineers & Recruiters) */}
        <ArchitectureDeepDive />

        {/* Section G.2: Real Desktop App Interface Preview */}
        <AppPreviewSection />

        {/* Section H: Interactive FAQ Accordion */}
        <FAQ />

        {/* Section I: High-Impact Download Banner */}
        <DownloadSection />
      </main>

      {/* Section J: Footer */}
      <Footer />
    </div>
  );
}
