import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, AlertTriangle, Sparkles, VolumeX, Radio, Split, Cable, Lock, Zap } from 'lucide-react';

export default function ProblemSolution() {
  const problems = [
    {
      icon: <XCircle className="w-5 h-5 text-rose-400" />,
      title: 'Windows Restricts to 1 Output',
      desc: 'The Windows Core Audio engine strictly binds applications to a single default playback endpoint. You cannot natively stream to two devices.',
    },
    {
      icon: <Split className="w-5 h-5 text-rose-400" />,
      title: 'Sharing a Single Earbud Sucks',
      desc: 'Splitting one pair of earbuds destroys stereo immersion, loses half the musical soundstage, and causes awkward wire or movement constraints.',
    },
    {
      icon: <Cable className="w-5 h-5 text-rose-400" />,
      title: 'Virtual Audio Cables Desync',
      desc: 'Legacy tools like VB-Cable or Voicemeeter require cumbersome driver installs, consume heavy CPU, and suffer from audio buffer desynchronization.',
    },
    {
      icon: <VolumeX className="w-5 h-5 text-rose-400" />,
      title: 'Awkward Speaker Leaks',
      desc: 'Misconfigured audio routing accidentally blasts movie dialogue or music from laptop speakers into quiet libraries, offices, or airplanes.',
    },
  ];

  const solutions = [
    {
      icon: <CheckCircle2 className="w-5 h-5 text-blue-400" />,
      title: 'Instant Dual Bluetooth Streaming',
      desc: 'DuoAudio duplicates system audio into two linear PCM streams, transmitting audio to both Bluetooth headsets simultaneously.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
      title: 'Full Spatial Stereo for Both',
      desc: 'Each listener receives complete left and right audio channels. Enjoy cinema-grade spatial immersion and dialog clarity.',
    },
    {
      icon: <Zap className="w-5 h-5 text-purple-400" />,
      title: 'Zero Latency Drift with WASAPI',
      desc: 'Engineered directly on low-level Windows WASAPI loopback with circular ring buffers for rock-solid sync and zero audio lag.',
    },
    {
      icon: <Lock className="w-5 h-5 text-emerald-400" />,
      title: 'Silent Room Guarantee',
      desc: 'Physical laptop speakers are automatically kept muted while audio plays strictly inside both earbuds. Zero accidental room blasts.',
    },
  ];

  return (
    <section id="features" className="py-24 relative bg-[#07080B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400 mb-3">
            <Radio className="w-3.5 h-3.5" />
            <span>Why DuoAudio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The Windows Audio Limitation,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Solved Forever.
            </span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            Say goodbye to clunky virtual cables and one-earbud compromises. Experience native-grade dual streaming built specifically for Windows 11.
          </p>
        </div>

        {/* Side-by-Side Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Windows Limitation Card */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-[#0D1017]/80 border border-rose-500/20 shadow-2xl overflow-hidden group">
            {/* Ambient Red Glow */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">The Windows Limitation</h3>
                  <span className="text-xs font-mono text-rose-400">Default OS Constraints</span>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300">
                Fragile Workaround
              </span>
            </div>

            <div className="space-y-4">
              {problems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-rose-500/30 transition-all flex items-start space-x-3.5"
                >
                  <div className="shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200">{item.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-rose-400 font-mono">
              <span>Result: Desync, latency drift, frustation</span>
              <span>❌ Not Recommended</span>
            </div>
          </div>

          {/* The DuoAudio Way Card */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#111524]/90 to-[#0A0D15]/90 border border-blue-500/30 shadow-2xl shadow-blue-500/10 overflow-hidden group">
            {/* Ambient Blue/Purple Glow */}
            <div className="absolute -top-12 -right-12 w-56 h-56 bg-blue-500/20 rounded-full blur-[90px] pointer-events-none" />

            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">The DuoAudio Way</h3>
                  <span className="text-xs font-mono text-blue-400">WASAPI Native Architecture</span>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300">
                Seamless & Automatic
              </span>
            </div>

            <div className="space-y-4">
              {solutions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-blue-500/20 hover:border-blue-500/40 hover:bg-white/[0.05] transition-all flex items-start space-x-3.5"
                >
                  <div className="shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-emerald-400 font-mono">
              <span>Result: Zero latency, pure stereo audio</span>
              <span>✓ Built for Windows 11</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
