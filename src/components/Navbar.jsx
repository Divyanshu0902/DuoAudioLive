import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProductLogo from './ProductLogo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate(`/${href}`);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleDownloadClick = () => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/#download');
    } else {
      const downloadSection = document.getElementById('download');
      if (downloadSection) {
        downloadSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07080B]/80 backdrop-blur-xl border-b border-white/[0.08] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand with Original 4-Bar Equalizer Product Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#16171A] border border-[#292A2E] flex items-center justify-center group-hover:border-[#5C6CDB]/50 transition-colors shadow-sm">
              <ProductLogo size={18} />
            </div>
            <span className="text-base font-semibold tracking-tight text-white group-hover:text-[#9AA7FF] transition-colors">
              DuoAudio
            </span>
          </Link>

          {/* Minimal Floating Pill Navigation */}
          <nav className="hidden md:flex items-center space-x-1 bg-white/[0.03] border border-white/[0.08] rounded-full px-3 py-1 backdrop-blur-md">
            <button
              onClick={() => handleNavClick('#features')}
              className="px-3.5 py-1.5 text-xs text-gray-400 hover:text-white rounded-full transition-colors"
            >
              Features
            </button>
            <Link
              to="/architecture#section-02-architecture"
              className={`px-3.5 py-1.5 text-xs rounded-full transition-colors ${
                location.pathname === '/architecture' || location.pathname === '/docs'
                  ? 'bg-white/[0.08] text-white font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Architecture
            </Link>
            <Link
              to="/troubleshooting"
              className={`px-3.5 py-1.5 text-xs rounded-full transition-colors ${
                location.pathname === '/troubleshooting'
                  ? 'bg-white/[0.08] text-white font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Troubleshooting
            </Link>
            <a
              href="https://github.com/Divyanshu0902/DuoAudio"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 text-xs text-gray-400 hover:text-white rounded-full transition-colors flex items-center space-x-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </nav>

          {/* Right Action: Download CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={handleDownloadClick}
              className="px-4 py-1.5 rounded-full bg-white hover:bg-gray-200 text-black text-xs font-semibold tracking-tight transition-all shadow-sm active:scale-[0.98]"
            >
              Download
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-[#07080B]/95 border-b border-white/[0.08] px-4 pt-3 pb-6 space-y-2 backdrop-blur-2xl"
          >
            <button
              onClick={() => handleNavClick('#features')}
              className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.04] rounded-lg"
            >
              Features
            </button>
            <Link
              to="/architecture#section-02-architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.04] rounded-lg"
            >
              Architecture
            </Link>
            <Link
              to="/troubleshooting"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.04] rounded-lg"
            >
              Troubleshooting
            </Link>
            <a
              href="https://github.com/Divyanshu0902/DuoAudio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.04] rounded-lg"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <div className="pt-2">
              <button
                onClick={handleDownloadClick}
                className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-sm transition-all text-center block"
              >
                Download for Windows 11
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
