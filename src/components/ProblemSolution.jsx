import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Headphones, VolumeX, Volume2, XCircle, CheckCircle2, Users, Sparkles, AlertCircle } from 'lucide-react';

export default function ProblemSolution() {
  return (
    <section id="features" className="py-20 relative bg-[#07080B] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent Clean Minimalist Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why DuoAudio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Windows gives you one output.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              DuoAudio connects both.
            </span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
            No more sharing a single earbud or fighting with complex virtual cables. Experience true simultaneous dual streaming.
          </p>
        </div>

        {/* Side-by-Side Visual Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Default Windows (The Frustration) */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#0D1017]/90 border border-rose-500/20 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Ambient subtle warning glow */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.06] mb-6">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">Default Windows</h3>
                </div>
                <span className="text-xs font-mono text-rose-400 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                  1 Device Only
                </span>
              </div>

              {/* Visual Diagram: Showing Person 1 gets sound, Person 2 is blocked */}
              <div className="p-5 rounded-2xl bg-[#090C12] border border-white/[0.06] mb-6 space-y-4">
                {/* Laptop Source */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
                  <div className="flex items-center space-x-2.5 text-xs text-gray-300 font-medium">
                    <Laptop className="w-4 h-4 text-gray-400" />
                    <span>Your Laptop (Playing Movie)</span>
                  </div>
                  <span className="text-[11px] text-rose-400 font-mono">Windows Limitation</span>
                </div>

                {/* Person 1 / Listener A */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-blue-400">
                      <Headphones className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white block">Listener 1 (Earbuds)</span>
                      <span className="text-[11px] text-gray-400">Receives audio</span>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-mono">Sound ON</span>
                </div>

                {/* Person 2 / Listener B: Blocked */}
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400">
                      <Headphones className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-rose-200 block">Listener 2 (Friend's Earbuds)</span>
                      <span className="text-[11px] text-rose-400 font-medium">Blocked by Windows</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded">
                    NO SOUND ❌
                  </span>
                </div>
              </div>

              {/* Clear Human-Centric Drawbacks */}
              <div className="space-y-3 text-xs sm:text-sm text-gray-300">
                <div className="flex items-start space-x-2.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Forced to share 1 earbud:</strong> Awkward wire tangling, ear hygiene issues, and you lose half of the stereo sound.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Cannot connect two headsets:</strong> Windows natively cuts off the second device.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Sudden room echoes:</strong> Disconnecting or changing settings can accidentally blast sound out of your laptop speakers.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-rose-400 text-center">
              Result: Only one person can listen comfortably
            </div>
          </div>

          {/* Card 2: With DuoAudio (The Magic) */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#111524]/90 to-[#0A0D15]/90 border border-blue-500/35 shadow-2xl shadow-blue-500/10 relative overflow-hidden flex flex-col justify-between">
            {/* Ambient blue/purple glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">With DuoAudio</h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 font-medium">
                  Dual Stream Active
                </span>
              </div>

              {/* Visual Diagram: Showing BOTH Earbuds get full stereo sound in sync */}
              <div className="p-5 rounded-2xl bg-[#090C12] border border-blue-500/20 mb-6 space-y-4">
                {/* Laptop Source */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center space-x-2.5 text-xs text-white font-medium">
                    <Laptop className="w-4 h-4 text-blue-400" />
                    <span>Your Laptop (Playing Movie)</span>
                  </div>
                  <div className="flex items-center space-x-1 text-emerald-400 text-[11px] font-mono">
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Speakers Muted</span>
                  </div>
                </div>

                {/* Person 1 / Listener A */}
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <Headphones className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white block">Listener 1 (Airdopes 161)</span>
                      <span className="text-[11px] text-blue-300">Full stereo sound</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">Sound ON (49%) ✨</span>
                </div>

                {/* Person 2 / Listener B: Also Sound ON! */}
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                      <Headphones className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white block">Listener 2 (realme Buds)</span>
                      <span className="text-[11px] text-purple-300">Full stereo sound</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">Sound ON (88%) ✨</span>
                </div>
              </div>

              {/* Clear Human-Centric Benefits */}
              <div className="space-y-3 text-xs sm:text-sm text-gray-200">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Listen together in full stereo:</strong> Both listeners wear their own comfortable earbuds with complete cinema-quality sound.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Independent volume control:</strong> You can turn yours down while your friend turns theirs up.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Silent room guarantee:</strong> Laptop physical speakers stay automatically muted so you never disturb the room.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] text-xs font-mono text-emerald-400 text-center font-semibold">
              Result: Perfect shared movie & music experience
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
