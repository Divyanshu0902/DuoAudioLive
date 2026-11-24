import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laptop, Headphones, VolumeX, XCircle, CheckCircle2 } from 'lucide-react';

export default function ProblemSolution() {
  const [mode, setMode] = useState('duoaudio');

  return (
    <section id="features" className="py-20 md:py-28 relative bg-[#07080B] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent Clean Minimalist Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Windows gives you one output.<br />
            <span className="text-gray-400">DuoAudio connects both.</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
            Toggle between the default Windows limitation and DuoAudio.
          </p>
        </div>

        {/* Clean Segmented Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <button
              onClick={() => setMode('duoaudio')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${mode === 'duoaudio'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              The DuoAudio Way
            </button>

            <button
              onClick={() => setMode('windows')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${mode === 'windows'
                  ? 'bg-white/[0.1] text-white'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              The Windows Way
            </button>
          </div>
        </div>

        {/* Interactive Visual Stage */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {mode === 'duoaudio' ? (
              /* DuoAudio Experience Stage */
              <motion.div
                key="duoaudio-stage"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl p-6 sm:p-8 bg-[#0B0D13] border border-white/[0.1] shadow-2xl relative overflow-hidden"
              >
                {/* Central Visual Flow */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center my-2">
                  {/* Laptop Center */}
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center flex flex-col items-center">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.06] text-white flex items-center justify-center mb-3">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-white block">Your Laptop</span>
                    <span className="text-xs text-gray-400 mt-0.5">Playing Movie in Sync</span>
                    <div className="mt-3 px-2.5 py-1 rounded-full bg-white/[0.06] text-[11px] font-mono text-gray-300 flex items-center space-x-1">
                      <VolumeX className="w-3 h-3 text-gray-400" />
                      <span>Speakers Muted</span>
                    </div>
                  </div>

                  {/* Dual Connected Earbuds */}
                  <div className="md:col-span-2 space-y-3">
                    {/* Earbud 1 */}
                    <div className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.08] flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-lg bg-[#5C6CDB]/15 text-[#9AA7FF] flex items-center justify-center">
                          <Headphones className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-white block">Listener 1 (You)</span>
                          <span className="text-xs text-gray-400">Full stereo sound</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#9AA7FF] px-2.5 py-0.5 rounded-full bg-[#5C6CDB]/10 border border-[#5C6CDB]/20">
                        Playing
                      </span>
                    </div>

                    {/* Earbud 2 */}
                    <div className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.08] flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-lg bg-[#5C6CDB]/15 text-[#9AA7FF] flex items-center justify-center">
                          <Headphones className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-white block">Listener 2 (Friend)</span>
                          <span className="text-xs text-gray-400">Full stereo sound</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#9AA7FF] px-2.5 py-0.5 rounded-full bg-[#5C6CDB]/10 border border-[#5C6CDB]/20">
                        Playing
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3 Clean Outcome Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/[0.06] mt-6">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>Both earbuds play together</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>Independent volume controls</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>Laptop speakers stay silent</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Default Windows Limitation Stage */
              <motion.div
                key="windows-stage"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl p-6 sm:p-8 bg-[#0B0D13] border border-white/[0.08] relative overflow-hidden"
              >
                {/* Central Visual Flow */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center my-2">
                  {/* Laptop Center */}
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center flex flex-col items-center">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] text-gray-500 flex items-center justify-center mb-3">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-gray-400 block">Your Laptop</span>
                    <span className="text-xs text-gray-500 mt-0.5 font-mono">1 Device Limit</span>
                    <div className="mt-3 px-2.5 py-1 rounded-full bg-white/[0.04] text-[11px] font-mono text-gray-400">
                      Single Output Only
                    </div>
                  </div>

                  {/* Windows Outcomes */}
                  <div className="md:col-span-2 space-y-3">
                    {/* Earbud 1 */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-lg bg-white/[0.04] text-gray-400 flex items-center justify-center">
                          <Headphones className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-300 block">Listener 1</span>
                          <span className="text-xs text-gray-500">Connected</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-gray-400 px-2.5 py-0.5 rounded-full bg-white/[0.04]">
                        Single Device
                      </span>
                    </div>

                    {/* Earbud 2: Blocked */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between opacity-60">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-lg bg-white/[0.04] text-gray-400 flex items-center justify-center">
                          <Headphones className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-400 block">Listener 2 (Friend)</span>
                          <span className="text-xs text-gray-500">Blocked by Windows</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-gray-500 px-2.5 py-0.5 rounded-full bg-white/[0.04]">
                        No Sound
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3 Clean Drawback Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/[0.06] mt-6">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                    <XCircle className="w-4 h-4 text-gray-500 shrink-0" />
                    <span>Windows locks to 1 device</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                    <XCircle className="w-4 h-4 text-gray-500 shrink-0" />
                    <span>Forced to split one earbud</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                    <XCircle className="w-4 h-4 text-gray-500 shrink-0" />
                    <span>Accidental speaker leaks</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
