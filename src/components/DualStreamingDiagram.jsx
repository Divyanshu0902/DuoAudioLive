import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Laptop, Headphones, VolumeX, Volume2, Bluetooth, ArrowRight, CheckCircle2, Play, Pause } from 'lucide-react';

export default function DualStreamingDiagram() {
  const [isStreaming, setIsStreaming] = useState(true);
  const [vol1, setVol1] = useState(70);
  const [vol2, setVol2] = useState(85);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setPulseKey((prev) => prev + 1);
    }, 1600);
    return () => clearInterval(interval);
  }, [isStreaming]);

  return (
    <section className="py-20 relative bg-[#07080B] overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent Clean Minimalist Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            How Dual Audio Streams Together
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
            System audio is duplicated into two independent streams with zero delay and silent laptop speakers.
          </p>
        </div>

        {/* 3D Flow Visual Canvas */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/[0.08] shadow-2xl relative overflow-hidden">
          {/* Top Bar with Live Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-8">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsStreaming(!isStreaming)}
                className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all ${
                  isStreaming
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                    : 'bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white'
                }`}
              >
                {isStreaming ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Streaming Live</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Resume Simulation</span>
                  </>
                )}
              </button>

              <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-400">
                <span>Both earbuds play in lockstep</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-emerald-400">
              <VolumeX className="w-4 h-4" />
              <span>Laptop speakers: Silent</span>
            </div>
          </div>

          {/* Interactive Flow Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Source Node: Laptop (5 cols) */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-3xl bg-gradient-to-b from-[#111625] to-[#0A0D15] border border-blue-500/25 shadow-xl relative overflow-hidden group">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <Laptop className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Your Laptop</h4>
                      <p className="text-xs text-gray-400">Playing movie or music</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Active
                  </span>
                </div>

                <div className="space-y-2 text-xs my-4">
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.04] flex items-center justify-between">
                    <span className="text-gray-300">System Sound</span>
                    <span className="text-blue-400 font-medium">Cloned for both pairs</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between text-rose-300">
                    <span className="flex items-center space-x-1.5">
                      <VolumeX className="w-4 h-4" />
                      <span>Physical Laptop Speakers</span>
                    </span>
                    <span className="font-semibold">Muted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Connecting Stream Path (2 cols) */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center py-4">
              <div className="hidden lg:flex flex-col items-center space-y-8 w-full">
                {/* Vector Top */}
                <div className="w-full relative flex items-center">
                  <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500 relative overflow-hidden">
                    {isStreaming && (
                      <motion.div
                        key={`stream-top-${pulseKey}`}
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.4, ease: 'linear' }}
                        className="absolute inset-0 bg-white shadow-[0_0_8px_#38BDF8]"
                      />
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0 -ml-1" />
                </div>

                {/* Central Sync Badge */}
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center w-full">
                  <span className="text-[11px] font-medium text-purple-300 block">Synchronized</span>
                </div>

                {/* Vector Bottom */}
                <div className="w-full relative flex items-center">
                  <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-500 relative overflow-hidden">
                    {isStreaming && (
                      <motion.div
                        key={`stream-bot-${pulseKey}`}
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.4, ease: 'linear' }}
                        className="absolute inset-0 bg-white shadow-[0_0_8px_#C084FC]"
                      />
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-400 shrink-0 -ml-1" />
                </div>
              </div>

              <div className="lg:hidden flex items-center space-x-2 text-xs font-mono text-blue-400">
                <span>↓ Simultaneous Stereo Sound ↓</span>
              </div>
            </div>

            {/* Destination Nodes: Earbuds (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Earbud 1 */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-[#0F1424] to-[#0A0D15] border border-blue-500/20 relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Earbud 1 • boAt Airdopes 161</h4>
                      <p className="text-[11px] text-gray-400">Full stereo sound</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-300">{vol1}%</span>
                </div>

                {/* Volume Slider */}
                <div className="flex items-center space-x-3 pt-2">
                  <Volume2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={vol1}
                    onChange={(e) => setVol1(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
              </div>

              {/* Earbud 2 */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-[#140F24] to-[#0A0D15] border border-purple-500/20 relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Earbud 2 • realme Buds T310</h4>
                      <p className="text-[11px] text-gray-400">Full stereo sound</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-300">{vol2}%</span>
                </div>

                {/* Volume Slider */}
                <div className="flex items-center space-x-3 pt-2">
                  <Volume2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={vol2}
                    onChange={(e) => setVol2(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Summary */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full stereo immersion in both pairs without any audio delay</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
