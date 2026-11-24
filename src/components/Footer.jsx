import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductLogo from './ProductLogo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-white/[0.06] pt-16 pb-12 text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/[0.06]">
          {/* Brand & Description (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-7 h-7 rounded-lg bg-[#16171A] border border-[#292A2E] flex items-center justify-center group-hover:border-[#5C6CDB]/50 transition-colors shadow-sm">
                <ProductLogo size={16} />
              </div>
              <span className="text-base font-bold text-white tracking-tight group-hover:text-[#9AA7FF] transition-colors">
                DuoAudio
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-gray-400">
                v1.0.2
              </span>
            </Link>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              The open-source Windows 11 utility that duplicates system audio so two people can listen together using two separate pairs of Bluetooth earbuds.
            </p>

            <div className="text-xs font-mono text-gray-500">
              <span>100% Offline • Zero Telemetry • MIT License</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold">
              Product & Help
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/#features" className="hover:text-white transition-colors">
                  Key Features
                </Link>
              </li>
              <li>
                <Link to="/#user-guide" className="hover:text-white transition-colors">
                  User Guide
                </Link>
              </li>
              <li>
                <Link to="/architecture" className="hover:text-white transition-colors">
                  Architecture & Systems
                </Link>
              </li>
              <li>
                <Link to="/troubleshooting" className="hover:text-white transition-colors">
                  Troubleshooting Guide
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Open Source & Community (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold">
              Open Source
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="https://github.com/Divyanshu0902/DuoAudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Divyanshu0902/DuoAudio/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Releases & Changelog (v1.0.2)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Divyanshu0902/DuoAudio/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>
            © {new Date().getFullYear()} DuoAudio. Open-source software developed by Divyanshu Kumar.
          </div>
          <button
            onClick={scrollToTop}
            className="hover:text-gray-300 transition-colors font-mono"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
