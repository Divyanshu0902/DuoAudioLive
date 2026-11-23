import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Copy, Check, ShieldCheck, Sparkles, Github, Terminal, CheckCircle2, Cpu } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export default function DownloadSection() {
  const [copiedChecksum, setCopiedChecksum] = useState(false);
  const checksum = '64D0CB6230FA731BF5A156469C265DB4A0195E6F26EB316110BA79B6D1121B25';

  const handleCopyChecksum = (e) => {
    navigator.clipboard.writeText(checksum);
    setCopiedChecksum(true);
    triggerConfetti(0.5, 0.7);
    setTimeout(() => setCopiedChecksum(false), 2500);
  };

  const handleDownload = () => {
    triggerConfetti(0.5, 0.5);
    // Direct link to the release artifact
    window.location.href = 'https://github.com/Divyanshu0902/DuoAudio/releases/latest';
  };

  return (
    <section id="download" className="py-24 relative bg-[#07080B] overflow-hidden">
      {/* Intense Ambient Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-blue-600/20 via-indigo-600/25 to-purple-600/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Glow Box Card */}
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#121626]/90 via-[#0D101A]/90 to-[#07090F]/95 border border-white/[0.15] shadow-2xl shadow-blue-500/10 backdrop-blur-2xl text-center overflow-hidden">
          {/* Decorative Corner Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Shimmering Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-blue-300 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Latest Release • DuoAudio v1.0.2</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Listen Together Today.
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg mb-10 leading-relaxed font-normal">
            Download DuoAudio for Windows 11 and start dual-streaming audio in seconds. 100% free, zero ads, completely open source.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="https://github.com/Divyanshu0902/DuoAudio/releases/download/v1.0.2/DuoAudio.Setup.1.0.2.exe"
              onClick={handleDownload}
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-[#5C6CDB] via-[#6366F1] to-[#8B5CF6] hover:from-[#6A7AE8] hover:to-[#9B6DF8] text-white font-bold text-lg shadow-2xl shadow-[#5C6CDB]/40 hover:shadow-[#5C6CDB]/70 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center space-x-3 group"
            >
              {/* Windows 11 SVG Icon */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.949-1.801" />
              </svg>
              <span>Download DuoAudio Setup (.exe)</span>
              <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-mono text-white/95">
                110.39 MB
              </span>
            </a>

            <a
              href="https://github.com/Divyanshu0902/DuoAudio/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] text-white font-semibold text-base hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-2.5 group"
            >
              <Github className="w-5 h-5 text-gray-300 group-hover:text-white" />
              <span>Release Notes & Assets</span>
            </a>
          </div>

          {/* SHA-256 Checksum Container */}
          <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-[#090C12] border border-white/[0.08] text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-gray-400 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Installer SHA-256 Checksum</span>
              </span>

              <button
                onClick={handleCopyChecksum}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-mono text-gray-300 hover:text-white transition-colors"
                title="Copy SHA-256 Checksum"
              >
                {copiedChecksum ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-gray-400" />
                    <span>Copy Hash</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.04] font-mono text-[11px] sm:text-xs text-blue-300 break-all select-all">
              {checksum}
            </div>
          </div>

          {/* System Specs Requirements */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-mono">
            <span>OS: Windows 11 (64-bit)</span>
            <span>•</span>
            <span>Arch: x64</span>
            <span>•</span>
            <span>Bluetooth: 4.2 or later</span>
            <span>•</span>
            <span>License: MIT (Open Source)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
