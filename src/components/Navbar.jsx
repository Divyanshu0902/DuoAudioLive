import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Github, Menu, X, Radio, Volume2, Sparkles, Star } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Preview', href: '#preview' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleDownloadClick = (e) => {
    triggerConfetti(0.5, 0.2);
    const downloadSection = document.getElementById('download');
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07080B]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/50 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3B82F6] via-[#5C6CDB] to-[#8B5CF6] p-[1px] shadow-lg shadow-[#5C6CDB]/20 group-hover:shadow-[#5C6CDB]/40 transition-shadow">
              <div className="w-full h-full bg-[#0B0D13] rounded-xl flex items-center justify-center space-x-[2px] px-1.5 overflow-hidden">
                <span className="w-1 bg-[#3B82F6] h-3.5 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                <span className="w-1 bg-[#60A5FA] h-6 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                <span className="w-1 bg-[#8B5CF6] h-4 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                <span className="w-1 bg-[#C084FC] h-2.5 rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-blue-200 group-hover:to-purple-200 transition-all">
                DuoAudio
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-blue-400 font-medium">
                v1.0.2
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1 text-sm text-gray-300 hover:text-white rounded-full transition-colors hover:bg-white/[0.06]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="https://github.com/Divyanshu0902/DuoAudio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Star</span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded-md bg-white/[0.08] text-xs font-mono text-gray-400 ml-1">
                <Star className="w-3 h-3 text-yellow-400 mr-1 fill-yellow-400" />
                Repo
              </span>
            </a>

            <button
              onClick={handleDownloadClick}
              className="relative group overflow-hidden px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-[#5C6CDB] to-[#8B5CF6] hover:from-[#6A7AE8] hover:to-[#9B6DF8] shadow-lg shadow-[#5C6CDB]/25 hover:shadow-[#5C6CDB]/45 transition-all flex items-center space-x-2 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono uppercase tracking-wider">
                Win 11
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={handleDownloadClick}
              className="p-2 rounded-lg bg-gradient-to-r from-[#5C6CDB] to-[#8B5CF6] text-white text-xs font-medium flex items-center"
              aria-label="Download"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-gray-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0B0D13]/95 backdrop-blur-2xl border-b border-white/[0.08] px-4 pt-3 pb-6 space-y-3"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-base font-medium text-gray-200 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex flex-col space-y-2">
              <a
                href="https://github.com/Divyanshu0902/DuoAudio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm font-medium text-white"
              >
                <Github className="w-4 h-4" />
                <span>Star on GitHub</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleDownloadClick();
                }}
                className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#5C6CDB] to-[#8B5CF6] text-sm font-medium text-white shadow-lg shadow-[#5C6CDB]/30"
              >
                <Download className="w-4 h-4" />
                <span>Download DuoAudio for Windows 11</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
