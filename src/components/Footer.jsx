import React from 'react';
import { Github, Heart, ArrowUp, ShieldCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-white/[0.06] pt-16 pb-12 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/[0.06]">
          {/* Brand & Description (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-[#3B82F6] via-[#5C6CDB] to-[#8B5CF6] p-[1px]">
                <div className="w-full h-full bg-[#0B0D13] rounded-lg flex items-center justify-center space-x-[2px] px-1 overflow-hidden">
                  <span className="w-0.5 bg-[#3B82F6] h-2.5 rounded-full" />
                  <span className="w-0.5 bg-[#60A5FA] h-4.5 rounded-full" />
                  <span className="w-0.5 bg-[#8B5CF6] h-3 rounded-full" />
                  <span className="w-0.5 bg-[#C084FC] h-2 rounded-full" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">DuoAudio</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-blue-400">
                v1.0.2
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              The open-source Windows 11 utility that duplicates system audio so two people can listen together using two separate pairs of Bluetooth earbuds.
            </p>

            <div className="flex items-center space-x-2 text-xs font-mono text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Offline • Zero Telemetry • MIT License</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold">
              Product & Help
            </h4>
            <ul className="space-y-2 text-sm">
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
                <Link to="/architecture" className="hover:text-white transition-colors text-blue-400">
                  Architecture & Systems
                </Link>
              </li>
              <li>
                <Link to="/troubleshooting" className="hover:text-white transition-colors text-purple-400">
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
            <ul className="space-y-2 text-sm">
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
              <li>
                <a
                  href="https://github.com/Divyanshu0902/DuoAudio/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Report an Issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-400 flex items-center space-x-1">
            <span>Built by</span>
            <a
              href="https://github.com/Divyanshu0902"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 font-semibold transition-colors underline decoration-white/20 underline-offset-4"
            >
              Divyanshu Kumar
            </a>
            <span>• Open Source MIT</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-gray-300 hover:text-white transition-all group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
