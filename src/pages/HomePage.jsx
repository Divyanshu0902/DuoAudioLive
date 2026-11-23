import React from 'react';
import Hero from '../components/Hero';
import DualStreamingDiagram from '../components/DualStreamingDiagram';
import ProblemSolution from '../components/ProblemSolution';
import BentoFeatures from '../components/BentoFeatures';
import HowItWorks from '../components/HowItWorks';
import AppPreviewSection from '../components/AppPreviewSection';
import FAQ from '../components/FAQ';
import DownloadSection from '../components/DownloadSection';

export default function HomePage() {
  return (
    <>
      {/* 3D Visual Cockpit Hero */}
      <Hero />

      {/* Desktop App Preview (Natural Size) - Screenshot on Left, Descriptions on Right */}
      <AppPreviewSection />

      {/* Simultaneous Sound Flow Diagram */}
      <DualStreamingDiagram />

      {/* Before / After Difference Flowchart */}
      <ProblemSolution />

      {/* Minimalist Feature Bento */}
      <BentoFeatures />

      {/* 3-Step Quickstart */}
      <HowItWorks />

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* High-Impact Download Banner */}
      <DownloadSection />
    </>
  );
}