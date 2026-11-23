import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laptop, Headphones, VolumeX, Volume2, XCircle, CheckCircle2, Sparkles, AlertTriangle, ShieldCheck, Lock } from 'lucide-react';

export default function ProblemSolution() {
  const [mode, setMode] = useState('duoaudio');

  return (
    <section id="features" className="py-20 relative bg-[#07080B] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent Clean Minimalist Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Windows gives you one output.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              DuoAudio connects both.
            </span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
            Toggle between the default Windows experience and DuoAudio to see the difference.
          </p>
        </div>

        {/* Option 1: Clean Interactive Segmented Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
            <button
              onClick={() => setMode('duoaudio')}
              className={`px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
                mode === 'duoaudio'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>The DuoAudio Way</span>
            </button>

            <button
              onClick={() => setMode('windows')}
              className={`px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
                mode === 'windows'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-lg shadow-rose-500/10'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>The Windows Way</span>
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#111628]/80 to-[#0A0D15]/90 border border-blue-500/30 shadow-2xl relative overflow-hidden"
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

                {/* Central Visual Flow */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center my-4">
                  {/* Laptop Center */}
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-blue-500/20 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-3">
                      <Laptop className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-white block">Your Laptop</span>
                    <span className="text-xs text-gray-400 mt-0.5">Playing Movie in Sync</span>
                    <div className="mt-3 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400 flex items-center space-x-1">
                      <VolumeX className="w-3 h-3" />
                      <span>Speakers Muted</span>
                    </div>
                  </div>

                  {/* Dual Connected Earbuds */}
                  <div className="md:col-span-2 space-y-3">
                    {/* Earbud 1 */}
                    <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                          <Headphones className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-white block">Listener 1 (You)</span>
                          <span className="text-xs text-blue-300">Full stereo sound</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        Playing ✨
                      </span>
                    </div>

                    {/* Earbud 2 */}
                    <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                          <Headphones className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-white block">Listener 2 (Friend)</span>
                          <span className="text-xs text-purple-300">Full stereo sound</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        Playing ✨
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3 Clean Non-Text-Heavy Outcome Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/[0.08] mt-6">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Both earbuds play together</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Independent volume controls</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Laptop speakers stay silent</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Default Windows Frustration Stage */
              <motion.div
                key="windows-stage"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl p-6 sm:p-10 bg-[#0E1119] border border-rose-500/20 shadow-2xl relative overflow-hidden"
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-1/4 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Central Visual Flow */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center my-4">
                  {/* Laptop Center */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] text-gray-400 flex items-center justify-center mb-3">
                      <Laptop className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-gray-300 block">Your Laptop</span>
                    <span className="text-xs text-rose-400 mt-0.5 font-mono">1 Device Limit</span>
                    <div className="mt-3 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[11px] font-mono text-rose-400 flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Speaker Leak Risk</span>
                    </div>
                  </div>

                  {/* Windows Outcomes */}
                  <div className="md:col-span-2 space-y-3">
                    {/* Earbud 1 */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.05] text-gray-300 flex items-center justify-center">
                          <Headphones className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-white block">Listener 1</span>
                          <span className="text-xs text-gray-400">Receives audio</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-gray-400 px-3 py-1 rounded-full bg-white/[0.04]">
                        Single Device
                      </span>
                    </div>

                    {/* Earbud 2: Blocked */}
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                          <Headphones className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-rose-200 block">Listener 2 (Friend)</span>
                          <span className="text-xs text-rose-400">Blocked by Windows</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-rose-400 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30">
                        No Sound ❌
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3 Clean Non-Text-Heavy Drawback Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/[0.06] mt-6">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-rose-300">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Windows locks to 1 device</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-rose-300">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Forced to split one earbud</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-rose-300">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Accidental speaker blasts</span>
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
