import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Github, Check } from 'lucide-react';

export default function Hero() {
  const [downloadState, setDownloadState] = useState('idle');
  const navigate = useNavigate();

  const handleDownload = () => {
    if (downloadState === 'downloading') return;
    setDownloadState('downloading');

    // Trigger direct download of installer
    const link = document.createElement('a');
    link.href = 'https://github.com/Divyanshu0902/DuoAudio/releases/download/v1.0.2/DuoAudio.Setup.1.0.2.exe';
    link.download = 'DuoAudio.Setup.1.0.2.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Smoothly route to next steps page with state marking download already triggered
    setTimeout(() => {
      navigate('/download/next-steps', { state: { downloaded: true } });
    }, 600);
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-[#0C0D12] via-[#090A0E] to-[#07080B]">
      {/* Subtle, single-source atmospheric periwinkle ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#5C6CDB]/12 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Apple/Google Minimalist Headline */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]"
          >
            Share the sound.<br />
            <span className="text-gray-400">Not the earbuds.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
          >
            Stream Windows 11 audio to two pairs of Bluetooth headphones simultaneously. Independent volume. Silent laptop speakers.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16 sm:mb-20"
          >
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-gray-200 text-black font-semibold text-sm transition-all shadow-sm flex items-center justify-center active:scale-[0.99] min-w-[270px]"
            >
              <AnimatePresence mode="wait">
                {downloadState === 'downloading' ? (
                  <motion.div
                    key="downloading"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center space-x-2"
                  >
                    <Check className="w-4 h-4 text-[#5C6CDB] stroke-[2.5]" />
                    <span>Starting download...</span>
                    <span className="text-xs bg-[#5C6CDB]/15 text-[#4754B5] font-mono px-2 py-0.5 rounded-full font-semibold">
                      Setup.exe
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center space-x-2.5"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.949-1.801" />
                    </svg>
                    <span>Download for Windows 11</span>
                    <span className="text-xs bg-black/10 px-2 py-0.5 rounded-full font-mono text-black/75">
                      v1.0.2
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <a
              href="https://github.com/Divyanshu0902/DuoAudio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white font-medium text-sm transition-all flex items-center justify-center space-x-2"
            >
              <Github className="w-4 h-4 text-gray-400" />
              <span>Star on GitHub</span>
            </a>
          </motion.div>
        </div>

        {/* Clean, Razor-Sharp 2D Visual Stage */}
        <div className="relative max-w-5xl mx-auto flex justify-center">
          <img
            src="/assets/transparent-bg-banner2.png"
            // src="/assets/hero-banner.png"
            alt="DuoAudio Desktop with wireless earbuds"
            className="w-full h-auto object-contain block select-none drop-shadow-2xl"
            style={{ imageRendering: '-webkit-optimize-contrast' }}
          />
        </div>
      </div>
    </section>
  );
}
