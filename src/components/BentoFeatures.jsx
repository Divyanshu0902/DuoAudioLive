import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sliders, 
  VolumeX, 
  Cpu, 
  ShieldCheck, 
  Radio, 
  Volume2, 
  RefreshCw, 
  Layers, 
  Code2, 
  Sparkles,
  Lock,
  Headphones,
  Laptop
} from 'lucide-react';

export default function BentoFeatures() {
  // Interactive slider states for Bento Card 3
  const [gain1, setGain1] = useState(65);
  const [gain2, setGain2] = useState(82);

  // Interactive mute guard toggle for Bento Card 2
  const [muteGuardActive, setMuteGuardActive] = useState(true);

  return (
    <section className="py-24 relative bg-[#07080B] overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineered Without Compromise</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Key Architecture & Features
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            Every layer of DuoAudio was designed for Windows 11 audio stability, privacy, and seamless usability.
          </p>
        </div>

        {/* Bento 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Zero-Configuration Routing (8 cols) */}
          <div className="md:col-span-8 rounded-3xl p-6 sm:p-8 glass-panel border border-white/[0.08] relative overflow-hidden group hover:border-blue-500/30 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Zero-Configuration Routing</h3>
                  <span className="text-xs font-mono text-blue-400">Automatic Windows Endpoint Management</span>
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-300 w-fit">
                Auto Revert on Exit
              </span>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              On launch, DuoAudio automatically routes default Windows playback to the internal loopback endpoint via native COM APIs. When you close the app, your original audio configuration is instantaneously restored without rebooting or restarting audio services.
            </p>

            {/* Interactive Flow Visualizer */}
            <div className="p-4 rounded-2xl bg-[#090C12] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-gray-300">
                <Laptop className="w-4 h-4 text-blue-400" />
                <span>Default Endpoint</span>
              </div>
              <span className="text-blue-400 font-bold hidden sm:inline">➔ WASAPI Loopback ➔</span>
              <span className="text-blue-400 font-bold sm:hidden">↓ WASAPI Loopback ↓</span>
              <div className="flex items-center space-x-2">
                <div className="px-3 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 flex items-center space-x-1.5">
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Earbud A</span>
                </div>
                <div className="px-3 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 flex items-center space-x-1.5">
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Earbud B</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Silent Room Guarantee (4 cols) */}
          <div className="md:col-span-4 rounded-3xl p-6 sm:p-8 glass-panel border border-white/[0.08] relative overflow-hidden group hover:border-emerald-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <VolumeX className="w-5 h-5" />
                </div>
                <button
                  onClick={() => setMuteGuardActive(!muteGuardActive)}
                  className={`text-[11px] font-mono px-3 py-1 rounded-full border transition-all ${
                    muteGuardActive
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  }`}
                >
                  {muteGuardActive ? 'Guard: Active' : 'Guard: Paused'}
                </button>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">Silent Room Guarantee</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Locks laptop physical speakers to 0% volume while streaming so audio remains strictly in your earbuds. No airplane or library blunders.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B0D13] border border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-gray-400 font-mono">Speaker Hardware State:</span>
              <span className={`font-mono font-semibold ${muteGuardActive ? 'text-emerald-400' : 'text-amber-400'}`}>
                {muteGuardActive ? '0% [Muted]' : 'Unmuted'}
              </span>
            </div>
          </div>

          {/* Card 3: Interactive Dual Volume Sliders (4 cols) */}
          <div className="md:col-span-4 rounded-3xl p-6 sm:p-8 glass-panel border border-white/[0.08] relative overflow-hidden group hover:border-purple-500/30 transition-all">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Dual Gain Sliders</h3>
                <span className="text-xs font-mono text-purple-400">Independent Volume</span>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Different earbuds have different sensitivities. Adjust volume separately for each listener in real-time.
            </p>

            {/* Interactive Sliders */}
            <div className="space-y-4 bg-[#090C12] p-4 rounded-2xl border border-white/[0.06]">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-gray-300">
                  <span className="text-blue-400">Earbud 1 Gain</span>
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
                <div className="flex justify-between text-xs font-mono mb-1 text-gray-300">
                  <span className="text-purple-400">Earbud 2 Gain</span>
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

          {/* Card 4: Low-Latency WASAPI Core (8 cols) */}
          <div className="md:col-span-8 rounded-3xl p-6 sm:p-8 glass-panel border border-white/[0.08] relative overflow-hidden group hover:border-indigo-500/30 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Low-Latency WASAPI Core</h3>
                  <span className="text-xs font-mono text-indigo-400">16-Bit / 48 kHz Linear PCM Ring Buffer</span>
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-fit">
                Sub-10ms Overhead
              </span>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Captures audio straight from the Windows audio pipeline before mixing down. Compensates for silence suppression, drops zero frames, and prevents the cumulative buffer drift common in Bluetooth headphones.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-base font-bold text-white font-mono">48 kHz</div>
                <div className="text-[11px] text-gray-400">Sampling Rate</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-base font-bold text-white font-mono">16-Bit</div>
                <div className="text-[11px] text-gray-400">Linear PCM</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-base font-bold text-emerald-400 font-mono">0.0 ms</div>
                <div className="text-[11px] text-gray-400">Relative Drift</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-base font-bold text-blue-400 font-mono">&lt; 0.5%</div>
                <div className="text-[11px] text-gray-400">CPU Overhead</div>
              </div>
            </div>
          </div>

          {/* Card 5: 100% Offline & Private (6 cols) */}
          <div className="md:col-span-6 rounded-3xl p-6 sm:p-8 glass-panel border border-white/[0.08] relative overflow-hidden group hover:border-blue-500/30 transition-all">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">100% Offline & Private</h3>
                <span className="text-xs font-mono text-blue-400">Zero Telemetry • MIT Licensed</span>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              DuoAudio has zero network permissions, does not connect to any servers, collects zero user analytics, and operates completely offline on your local device. Fully open source and audited.
            </p>

            <div className="flex items-center space-x-2 text-xs font-mono text-gray-400 bg-[#090C12] p-3 rounded-xl border border-white/[0.06]">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>0 bytes transmitted over the network • Inspectable on GitHub</span>
            </div>
          </div>

          {/* Card 6: Clean C++ Native Integration (6 cols) */}
          <div className="md:col-span-6 rounded-3xl p-6 sm:p-8 glass-panel border border-white/[0.08] relative overflow-hidden group hover:border-purple-500/30 transition-all">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Clean C++ COM Architecture</h3>
                <span className="text-xs font-mono text-purple-400">Zero Antivirus False-Positives</span>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Powered by a dedicated standalone native helper (<code className="text-purple-300 bg-white/[0.06] px-1.5 py-0.5 rounded">duoaudio_endpoint.exe</code>) utilizing Windows Core Audio COM APIs (<code className="text-purple-300 bg-white/[0.06] px-1.5 py-0.5 rounded">IPolicyConfig</code>) with zero invasive hooks.
            </p>

            <div className="flex items-center space-x-2 text-xs font-mono text-gray-400 bg-[#090C12] p-3 rounded-xl border border-white/[0.06]">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Direct COM Virtual Tables • 0 heuristic flags</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
