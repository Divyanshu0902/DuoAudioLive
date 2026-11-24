import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Copy, ShieldCheck } from 'lucide-react';

export default function DownloadSection() {
  const [copiedChecksum, setCopiedChecksum] = useState(false);
  const [downloadState, setDownloadState] = useState('idle');
  const navigate = useNavigate();
  const checksum = '64D0CB6230FA731BF5A156469C265DB4A0195E6F26EB316110BA79B6D1121B25';

  const handleCopyChecksum = () => {
    navigator.clipboard.writeText(checksum);
    setCopiedChecksum(true);
    setTimeout(() => setCopiedChecksum(false), 2000);
  };

  const handleDownload = () => {
    if (downloadState === 'downloading') return;
    setDownloadState('downloading');

    const link = document.createElement('a');
    link.href = 'https://github.com/Divyanshu0902/DuoAudio/releases/download/v1.0.2/DuoAudio.Setup.1.0.2.exe';
    link.download = 'DuoAudio.Setup.1.0.2.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      navigate('/download/next-steps', { state: { downloaded: true } });
    }, 600);
  };

  return (
    <section id="download" className="py-28 md:py-36 relative bg-[#040507] overflow-hidden text-center">
      {/* Subtle periwinkle spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#5C6CDB]/12 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
          Ready to listen together?
        </h2>

        <p className="text-gray-400 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Download DuoAudio for Windows 11. Free, open source, and ready in seconds.
        </p>

        {/* Prominent CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-gray-200 text-black font-semibold text-base transition-all shadow-lg flex items-center justify-center active:scale-[0.99] min-w-[290px]"
          >
            <AnimatePresence mode="wait">
              {downloadState === 'downloading' ? (
                <motion.div
                  key="downloading"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center space-x-2.5"
                >
                  <Check className="w-5 h-5 text-[#5C6CDB] stroke-[2.5]" />
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
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.949-1.801" />
                  </svg>
                  <span>Download for Windows 11</span>
                  <span className="text-xs bg-black/10 px-2 py-0.5 rounded-full font-mono text-black/80">
                    v1.0.2 • Free
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* SHA-256 Checksum Container */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-gray-400">
          <ShieldCheck className="w-4 h-4 text-gray-400" />
          <span className="hidden sm:inline">SHA-256:</span>
          <span className="text-gray-300 truncate max-w-[200px] sm:max-w-none">
            {checksum}
          </span>
          <button
            onClick={handleCopyChecksum}
            className="ml-2 text-white hover:text-[#9AA7FF] transition-colors"
            title="Copy Checksum"
          >
            {copiedChecksum ? <Check className="w-3.5 h-3.5 text-[#9AA7FF]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </section>
  );
}
