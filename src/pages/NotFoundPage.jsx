import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Wrench } from 'lucide-react';

/**
 * Fallback view for unknown routes so obsolete or mistyped URLs do not
 * silently render the homepage.
 */
export default function NotFoundPage() {
  return (
    <section className="pt-36 pb-28 md:pt-44 md:pb-36 bg-[#07080B] text-[#F3F4F6] relative overflow-hidden">
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[500px] h-[280px] bg-[#5C6CDB]/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-[#9AA7FF] mb-4">
          404 • Page Not Found
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-gray-400 text-base sm:text-lg mb-10 leading-relaxed">
          The URL you requested could not be found. Return to the homepage or browse the DuoAudio documentation and troubleshooting guides below.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-white hover:bg-gray-200 text-black text-sm font-semibold transition-all inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/architecture"
            className="px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white text-sm font-medium transition-all inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-[#9AA7FF]" />
            <span>Architecture Docs</span>
          </Link>
          <Link
            to="/troubleshooting"
            className="px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white text-sm font-medium transition-all inline-flex items-center gap-2"
          >
            <Wrench className="w-4 h-4 text-[#9AA7FF]" />
            <span>Troubleshooting</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
