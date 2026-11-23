import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Radio, Volume2, Headphones, Activity, Sliders, Check } from 'lucide-react';

export default function AudioSimulator() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [vol1, setVol1] = useState(72);
  const [vol2, setVol2] = useState(85);

  const tracks = [
    { title: 'Interstellar - Main Theme', genre: 'Cinematic Score', bpm: 120 },
    { title: 'Midnight Chillhop', genre: 'Lo-Fi Beats', bpm: 84 },
    { title: 'Acoustic Guitar Duet', genre: 'Lossless FLAC', bpm: 95 },
  ];

  // Frequency bar generator
  const barCount = 18;
  const [bars, setBars] = useState(() => Array.from({ length: barCount }, () => 20));

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setBars(
        Array.from({ length: barCount }, (_, i) => {
          // calculate dynamic wave heights
          const base = 25;
          const peak = Math.sin(Date.now() / 200 + i * 0.4) * 35;
          const noise = Math.random() * 30;
          return Math.max(12, Math.min(95, Math.round(base + peak + noise)));
        })
      );
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="py-20 relative bg-[#07080B] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience In-Sync Dual Output
          </h2>
          <p className="text-gray-400 mt-3 text-sm sm:text-base">
            Simulate real-time WASAPI audio duplication. Both channels maintain sample-accurate phase lock with 0ms relative latency drift.
          </p>
        </div>

        {/* Visualizer Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.1] shadow-2xl relative overflow-hidden">
          {/* Top Bar / Controls */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 active:scale-95 transition-all"
                title={isPlaying ? 'Pause Simulator' : 'Play Simulator'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>
              <div>
                <h3 className="font-semibold text-white text-base">
                  {tracks[selectedTrack].title}
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  {tracks[selectedTrack].genre} • 48 kHz / 16-Bit PCM
                </p>
              </div>
            </div>

            {/* Track Switcher */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400 font-mono hidden sm:inline">Track:</span>
              <div className="flex bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
                {tracks.map((t, idx) => (
                  <button
                    key={t.title}
                    onClick={() => setSelectedTrack(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedTrack === idx
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Track {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Metrics Badge */}
            <div className="flex items-center space-x-3 text-xs font-mono">
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Drift: 0.0 ms</span>
              </div>
              <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300">
                <Activity className="w-3.5 h-3.5" />
                <span>Phase: 100% In-Sync</span>
              </div>
            </div>
          </div>

          {/* Dual Channel Equalizer Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            {/* Channel 1: Left Earbud (Electric Blue) */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-blue-500/20 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Channel 1 • Airdopes 161</h4>
                    <span className="text-[11px] font-mono text-blue-400">WASAPI Loopback Buffer A</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-gray-300">{vol1}% Vol</span>
                </div>
              </div>

              {/* Animated Bars */}
              <div className="h-32 flex items-end justify-between gap-1 px-2 pt-4 bg-[#0B0D13] rounded-xl border border-white/[0.04]">
                {bars.map((h, i) => {
                  const scaledHeight = isPlaying ? Math.round((h * vol1) / 100) : 6;
                  return (
                    <div
                      key={i}
                      className="w-full bg-gradient-to-t from-blue-700 via-blue-500 to-blue-400 rounded-t-sm transition-all duration-150"
                      style={{ height: `${scaledHeight}%` }}
                    />
                  );
                })}
              </div>

              {/* Slider Controller */}
              <div className="mt-4 flex items-center space-x-3">
                <Volume2 className="w-4 h-4 text-blue-400 shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={vol1}
                  onChange={(e) => setVol1(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <span className="text-xs font-mono text-gray-400 w-8 text-right">{vol1}%</span>
              </div>
            </div>

            {/* Channel 2: Right Earbud (Neon Purple) */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-purple-500/20 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Channel 2 • realme Buds T310</h4>
                    <span className="text-[11px] font-mono text-purple-400">WASAPI Loopback Buffer B</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-gray-300">{vol2}% Vol</span>
                </div>
              </div>

              {/* Animated Bars */}
              <div className="h-32 flex items-end justify-between gap-1 px-2 pt-4 bg-[#0B0D13] rounded-xl border border-white/[0.04]">
                {bars.map((h, i) => {
                  const scaledHeight = isPlaying ? Math.round((h * vol2) / 100) : 6;
                  return (
                    <div
                      key={i}
                      className="w-full bg-gradient-to-t from-purple-700 via-purple-500 to-purple-400 rounded-t-sm transition-all duration-150"
                      style={{ height: `${scaledHeight}%` }}
                    />
                  );
                })}
              </div>

              {/* Slider Controller */}
              <div className="mt-4 flex items-center space-x-3">
                <Volume2 className="w-4 h-4 text-purple-400 shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={vol2}
                  onChange={(e) => setVol2(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
                <span className="text-xs font-mono text-gray-400 w-8 text-right">{vol2}%</span>
              </div>
            </div>
          </div>

          {/* Under-Card Specs Summary */}
          <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Laptop physical speakers automatically muted</span>
            </div>
            <div className="flex items-center space-x-4 font-mono text-[11px]">
              <span>Sample Rate: 48,000 Hz</span>
              <span>Bit Depth: 16-Bit Linear PCM</span>
              <span>Buffer Margin: 100% OK</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
