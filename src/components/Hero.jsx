import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Download, Github, Headphones, Bluetooth, Volume2 } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export default function Hero() {
  const containerRef = useRef(null);

  // Mouse tilt animation state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
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

  const handleDownload = () => {
    triggerConfetti(0.5, 0.4);
    const target = document.getElementById('download');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-12 md:pt-36 md:pb-14 overflow-hidden bg-grid-pattern">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#3B82F6]/15 via-[#5C6CDB]/15 to-[#8B5CF6]/15 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
          >
            Watch movies, share music, and listen together on Windows 11. No audio splitters. Low-latency synchronized playback. Just pure, synchronized sound with your laptop speakers automatically muted.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 sm:mb-24"
          >
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#5C6CDB] via-[#6366F1] to-[#8B5CF6] hover:from-[#6B7BF0] hover:to-[#9B6DF8] text-white font-semibold text-base shadow-2xl shadow-[#5C6CDB]/35 hover:shadow-[#5C6CDB]/55 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-3 group"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.949-1.801" />
              </svg>
              <span>Download for Windows 11</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-mono text-white/90">
                v1.0.2 • Free
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
            </a>
          </motion.div>
        </div>

        {/* 3D Visual Stage */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative max-w-5xl mx-auto perspective-[1200px] mt-4 sm:mt-6"
        >
          {/* Ambient Glow Orbs */}
          <div className="absolute -left-20 top-1/3 w-64 h-64 bg-[#3B82F6]/25 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -right-20 top-1/3 w-64 h-64 bg-[#8B5CF6]/25 rounded-full blur-[100px] pointer-events-none" />

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
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="ml-2 font-mono text-[11px] text-gray-400">DuoAudio</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Dual Output Active</span>
                </div>
              </div>

              {/* Central 3D Render Image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black/40">
                <img
                  src="/assets/hero-mockup.jpg"
                  alt="DuoAudio 3D Laptop with floating wireless earbuds"
                  className="w-full h-full object-cover object-center transform scale-[1.01] transition-transform duration-700 group-hover:scale-[1.03]"
                />

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
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
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
              </div>
            </div>

            {/* Underglow reflection */}
            <div className="absolute -bottom-8 left-10 right-10 h-16 bg-gradient-to-r from-blue-500/20 via-purple-500/25 to-blue-500/20 blur-2xl -z-10 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
