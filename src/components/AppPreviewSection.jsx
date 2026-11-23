import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Headphones, Sliders, Play, CheckCircle2, RefreshCw } from 'lucide-react';

export default function AppPreviewSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 0,
      icon: <Headphones className="w-5 h-5 text-blue-400" />,
      title: 'Dual Output Selectors',
      desc: 'Pick Earbud 1 and Earbud 2 from clean dropdowns with real-time Bluetooth detection.',
    },
    {
      id: 1,
      icon: <Sliders className="w-5 h-5 text-purple-400" />,
      title: 'Independent Volume Controls',
      desc: 'Smooth faders allow listener 1 and listener 2 to personalize their loudness separately.',
    },
    {
      id: 2,
      icon: <Play className="w-5 h-5 text-emerald-400" />,
      title: 'One-Click Start Sharing',
      desc: 'Instantly begins synchronized dual streaming while keeping laptop speakers completely silent.',
    },
    {
      id: 3,
      icon: <RefreshCw className="w-5 h-5 text-indigo-400" />,
      title: 'Instant Device Refresh',
      desc: 'One tap queries Windows audio services and refreshes newly connected Bluetooth devices.',
    },
  ];

  return (
    <section id="preview" className="pt-6 pb-20 md:pt-8 md:pb-24 relative bg-[#07080B] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Balanced 2-Column Side-by-Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Clean App Screenshot (6 cols) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-xl opacity-75" />

              {/* Hardware Window Frame */}
              <div className="relative rounded-3xl p-3 bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-transparent border border-white/[0.15] shadow-2xl shadow-black/90 backdrop-blur-md">
                {/* Window Title Bar */}
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0B0E17] rounded-t-2xl border-b border-white/[0.06] text-xs text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="font-mono text-[11px] text-gray-400 ml-1.5">DuoAudio v1.0.2</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-mono text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Connected</span>
                  </div>
                </div>

                {/* Main Screenshot Container */}
                <div className="relative bg-[#090C12] rounded-b-2xl overflow-hidden">
                  <img
                    src="/assets/screenshot-main.png"
                    alt="DuoAudio Desktop App Interface"
                    className="w-full h-auto object-contain block mx-auto select-none"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Descriptions & Interactive Feature Cards (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                Minimal, Fast, and Focused.
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                No bloated menus, sign-ins, or complicated routing. Everything you need to share audio fits into a single, intuitive Windows 11 utility.
              </p>
            </div>

            {/* Feature Cards Grid / List */}
            <div className="space-y-3 pt-2">
              {features.map((item, idx) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveFeature(idx)}
                  className={`p-4 rounded-2xl transition-all border cursor-pointer ${
                    activeFeature === idx
                      ? 'bg-[#111524] border-blue-500/40 shadow-lg shadow-blue-500/5 translate-x-1'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-0.5">{item.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom trust footnote */}
            <div className="pt-2 flex items-center space-x-2 text-xs font-mono text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Runs quietly in system tray with sub-0.5% CPU overhead</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
