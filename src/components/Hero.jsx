import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Download, Github, Headphones, Bluetooth, Volume2, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export default function Hero() {
  const containerRef = useRef(null);

  // Mouse tilt animation state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleDownload = (e) => {
    triggerConfetti(0.5, 0.4);
    // Smooth scroll to download card
    const target = document.getElementById('download');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-grid-pattern">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#3B82F6]/20 via-[#5C6CDB]/20 to-[#8B5CF6]/20 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[90px] pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges & Headline */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Massive Typographic Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
          >
            Stream Windows Audio to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Two Pairs of Bluetooth Earbuds
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
          >
            Watch movies, share music, and listen together on Windows 11. No audio splitters. No laggy virtual cables. Instant dual-output streaming with automatic speaker muting.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#5C6CDB] via-[#6366F1] to-[#8B5CF6] hover:from-[#6B7BF0] hover:to-[#9B6DF8] text-white font-semibold text-base shadow-2xl shadow-[#5C6CDB]/40 hover:shadow-[#5C6CDB]/60 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-3 group"
            >
              {/* Windows 11 SVG Icon */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.949-1.801" />
              </svg>
              <span>Download for Windows 11</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-mono text-white/90">
                v1.0.2 • 110 MB
              </span>
            </button>

            <a
              href="https://github.com/Divyanshu0902/DuoAudio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl glass-panel hover:bg-white/[0.08] border border-white/[0.12] text-white font-medium text-base hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-2.5 group"
            >
              <Github className="w-5 h-5 text-gray-300 group-hover:text-white" />
              <span>Star on GitHub</span>
              <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                Open Source
              </span>
            </a>
          </motion.div>

          {/* Quick trust highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-gray-400 mb-12">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Latency Drift (WASAPI)</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>100% Offline & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Auto Speaker Muting</span>
            </div>
          </div>
        </div>

        {/* Unified 3D Stage / Cockpit Hero */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative max-w-5xl mx-auto perspective-[1200px] mt-4"
        >
          {/* Ambient Glow Orbs flanking stage */}
          <div className="absolute -left-20 top-1/3 w-64 h-64 bg-[#3B82F6]/30 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -right-20 top-1/3 w-64 h-64 bg-[#8B5CF6]/30 rounded-full blur-[100px] pointer-events-none" />

          {/* 3D Motion Frame */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative rounded-3xl p-2 sm:p-4 bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-transparent border border-white/[0.15] shadow-2xl shadow-black/80 backdrop-blur-sm"
          >
            {/* Gloss reflection overlay */}
            <motion.div
              style={{
                background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.08) 0%, transparent 60%)`,
              }}
              className="absolute inset-0 rounded-3xl pointer-events-none z-20"
            />

            {/* Inner display bezel */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0A0D14] border border-white/[0.08] shadow-inner group">
              {/* Window Title Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e111a] border-b border-white/[0.06] text-xs text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/50" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
                  </div>
                  <span className="ml-3 font-mono text-[11px] text-gray-400">DuoAudio • Dual Stream Active</span>
                </div>
                <div className="flex items-center space-x-3 text-[11px] font-mono text-gray-500">
                  <span className="flex items-center space-x-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>WASAPI 48kHz</span>
                  </span>
                  <span>0.0ms drift</span>
                </div>
              </div>

              {/* Central 3D Render Image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black/40">
                <img
                  src="/assets/hero-mockup.jpg"
                  alt="DuoAudio 3D Laptop with floating wireless earbuds"
                  className="w-full h-full object-cover object-center transform scale-[1.01] transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* Subtle gradient overlay on bottom of image for cinematic integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-transparent opacity-60" />

                {/* Floating Glass Badge Left: Earbud 1 */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-8 left-4 sm:top-12 sm:left-8 z-30"
                >
                  <div className="glass-panel rounded-2xl p-3 sm:p-4 border border-blue-500/30 shadow-xl shadow-blue-500/10 backdrop-blur-xl flex items-center space-x-3 max-w-[240px] sm:max-w-[270px]">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs sm:text-sm font-semibold text-white truncate">
                          Airdopes 161
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] text-gray-400 mt-0.5">
                        <Bluetooth className="w-3 h-3 text-blue-400" />
                        <span className="text-emerald-400 font-medium">Connected</span>
                        <span>•</span>
                        <span className="font-mono text-gray-300">49% vol</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Glass Badge Right: Earbud 2 */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-8 right-4 sm:bottom-12 sm:right-8 z-30"
                >
                  <div className="glass-panel rounded-2xl p-3 sm:p-4 border border-purple-500/30 shadow-xl shadow-purple-500/10 backdrop-blur-xl flex items-center space-x-3 max-w-[240px] sm:max-w-[280px]">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs sm:text-sm font-semibold text-white truncate">
                          realme Buds T310
                        </span>
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] text-gray-400 mt-0.5">
                        <Bluetooth className="w-3 h-3 text-purple-400" />
                        <span className="text-purple-400 font-medium">Connected</span>
                        <span>•</span>
                        <span className="font-mono text-gray-300">88% vol</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Center Sync Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span>Dual Channel Stream: Lockstep Active</span>
                </div>
              </div>
            </div>

            {/* Underglow Reflection on dark stage floor */}
            <div className="absolute -bottom-8 left-10 right-10 h-16 bg-gradient-to-r from-blue-500/20 via-purple-500/25 to-blue-500/20 blur-2xl -z-10 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
