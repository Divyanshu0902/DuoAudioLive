import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Headphones, Volume2, Play, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';

export default function AppPreviewSection() {
  const [activeHotspot, setActiveHotspot] = useState(0);

  const hotspots = [
    {
      id: 0,
      title: 'Device 1 Selector',
      desc: 'Selects Primary Bluetooth Earbuds (e.g. boAt Airdopes 161) with automatic audio format negotiation.',
      coords: 'Top Left Panel',
    },
    {
      id: 1,
      title: 'Device 2 Selector',
      desc: 'Selects Secondary Bluetooth Earbuds (e.g. realme Buds T310) running on duplicate ring buffer.',
      coords: 'Top Right Panel',
    },
    {
      id: 2,
      title: 'Independent Volume Faders',
      desc: 'Real-time linear decibel sliders allowing listener 1 and listener 2 to personalize loudness independently.',
      coords: 'Middle Volume Sliders',
    },
    {
      id: 3,
      title: 'One-Click Start / Stop',
      desc: 'Instantly activates WASAPI capture, locks laptop speakers muted, and streams audio simultaneously.',
      coords: 'Bottom Action Button',
    },
  ];

  return (
    <section id="preview" className="py-24 relative bg-[#07080B] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop Application UI</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Clean, Minimalist & Distraction-Free
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            No bloat, no account creation, no advertisements. Just launch, pick two headsets, and start listening.
          </p>
        </div>

        {/* App Showcase Frame */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent border border-white/[0.12] shadow-2xl backdrop-blur-md">
            {/* Window bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0B0E17] rounded-t-2xl border-b border-white/[0.06] text-xs text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-gray-400 ml-2">DuoAudio v1.0.2 • Windows 11</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Native Standalone Helper Loaded</span>
              </div>
            </div>

            {/* Main Screenshot Container */}
            <div className="relative bg-[#090C12] rounded-b-2xl overflow-hidden group">
              <img
                src="/assets/screenshot-main.png"
                alt="DuoAudio Desktop App Interface"
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
              />

              {/* Hotspot callouts */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Interactive Feature Annotations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {hotspots.map((h, i) => (
              <div
                key={h.id}
                onClick={() => setActiveHotspot(i)}
                className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                  activeHotspot === i
                    ? 'bg-[#121626] border-blue-500/50 shadow-lg shadow-blue-500/10 -translate-y-1'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center space-x-2 text-xs font-mono text-blue-400 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{h.coords}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{h.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
