import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sliders, 
  VolumeX, 
  Film, 
  ShieldCheck, 
  RefreshCw, 
  Sparkles,
  Lock,
  Headphones,
  Laptop,
  CheckCircle2
} from 'lucide-react';

export default function BentoFeatures() {
  const [gain1, setGain1] = useState(65);
  const [gain2, setGain2] = useState(82);
  const [muteGuardActive, setMuteGuardActive] = useState(true);

  return (
    <section className="py-20 relative bg-[#07080B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent Clean Minimalist Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Features</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Engineered for Everyday Listening
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
            Built with smart features that keep your shared audio in sync, completely private, and effortless.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Silent Room Guarantee */}
          <div className="md:col-span-6 rounded-3xl p-6 sm:p-8 glass-panel border border-white/[0.08] relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <VolumeX className="w-6 h-6" />
                </div>
                <button
                  onClick={() => setMuteGuardActive(!muteGuardActive)}
                  className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all ${
                    muteGuardActive
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                  }`}
                >
                  {muteGuardActive ? 'Speaker Guard: Active' : 'Mute Guard: Paused'}
                </button>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Quiet in the Room</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Your laptop speakers stay completely silent while streaming so all audio stays strictly inside your earbuds. Zero awkward noise in quiet rooms, airplanes, or libraries.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B0D13] border border-white/[0.04] flex items-center justify-between text-xs">
              <span className="text-gray-400">Laptop Physical Speaker:</span>
              <span className={`font-semibold ${muteGuardActive ? 'text-emerald-400' : 'text-amber-400'}`}>
                {muteGuardActive ? 'Muted' : 'Unmuted'}
              </span>
            </div>
          </div>

          {/* Card 2: Independent Volume Sliders */}
          <div className="md:col-span-6 rounded-3xl p-6 sm:p-8 glass-panel border border-white/[0.08] relative overflow-hidden">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Your Volume, Your Rules</h3>
                <p className="text-xs text-gray-400">Different people, different sensitivities</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              You prefer dialogue loud, your friend prefers it subtle. Adjust each pair of earbuds independently without affecting the other.
            </p>

            {/* Interactive Sliders */}
            <div className="space-y-4 bg-[#090C12] p-4 rounded-2xl border border-white/[0.06]">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5 text-gray-300">
                  <span className="text-blue-400">Earbud 1</span>
                  <span>{gain1}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={gain1}
                  onChange={(e) => setGain1(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5 text-gray-300">
                  <span className="text-purple-400">Earbud 2</span>
                  <span>{gain2}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={gain2}
                  onChange={(e) => setGain2(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Perfect Lip-Sync (Movies & Gaming) */}
          <div className="md:col-span-4 rounded-3xl p-6 sm:p-8 glass-panel border border-white/[0.08] relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-5">
              <Film className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">Movie & Video Sync</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Enjoy movies, shows, and music together with smooth, synchronized playback.
            </p>

            <div className="text-xs text-emerald-400 font-mono flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>In-phase synchronization</span>
            </div>
          </div>

          {/* Card 4: Automatic Setup & Revert */}
          <div className="md:col-span-4 rounded-3xl p-6 sm:p-8 glass-panel border border-white/[0.08] relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-5">
              <RefreshCw className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">Works Like Magic</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              No complex virtual cables or driver tinkering. When you exit DuoAudio, your original audio configuration is instantly restored.
            </p>

            <div className="text-xs text-blue-400 font-mono flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Auto-reverts on exit</span>
            </div>
          </div>

          {/* Card 5: 100% Offline & Private */}
          <div className="md:col-span-4 rounded-3xl p-6 sm:p-8 glass-panel border border-white/[0.08] relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">100% Private & Offline</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              No accounts. No telemetry. No internet connection needed. Runs locally on your PC and is 100% open source under the MIT license.
            </p>

            <div className="text-xs text-emerald-400 font-mono flex items-center space-x-1.5">
              <Lock className="w-4 h-4" />
              <span>0 bytes sent over network</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
