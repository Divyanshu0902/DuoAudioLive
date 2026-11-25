import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Check,
  Copy,
  ShieldCheck,
  ArrowLeft,
  ExternalLink,
  Lock,
  Code2,
  Terminal
} from 'lucide-react';
import ProductLogo from '../components/ProductLogo';

export default function NextStepsPage() {
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const checksum = '64D0CB6230FA731BF5A156469C265DB4A0195E6F26EB316110BA79B6D1121B25';
  const downloadUrl = 'https://github.com/Divyanshu0902/DuoAudio/releases/download/v1.0.2/DuoAudio.Setup.1.0.2.exe';
  const verifyCmd = 'Get-FileHash .\\DuoAudio.Setup.1.0.2.exe -Algorithm SHA256';

  const location = useLocation();
  const hasTriggeredRef = useRef(false);

  // Automatically trigger download on page mount ONLY for direct URL visits.
  // If arrived via download button (Hero or DownloadSection), the download was already initiated on click.
  useEffect(() => {
    if (location.state?.downloaded || hasTriggeredRef.current) {
      return;
    }

    hasTriggeredRef.current = true;
    const timer = setTimeout(() => {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'DuoAudio.Setup.1.0.2.exe';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.state]);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(checksum);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(verifyCmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32 relative bg-[#07080B] text-white overflow-hidden">
      {/* Subtle, single atmospheric periwinkle ambient glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#5C6CDB]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back to Home Navigation */}
        <div className="mb-8">
          <Link
            to="/"
            aria-label="Back to Homepage"
            title="Back to Homepage"
            className="w-8 h-8 rounded-full border-2 border-white/25 hover:border-white text-gray-400 hover:text-white flex items-center justify-center transition-all group active:scale-95 bg-transparent"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2] group-hover:-translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Centered Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          {/* Bare Product Logo (2x size, no tile) */}
          <div className="flex justify-center mb-6">
            <ProductLogo size={56} />
          </div>

          {/* 2-Line Headline with Same Font Size */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
            <span className="text-white block">Thanks for downloading!</span>
            <span className="text-gray-400 block mt-2">Just a few steps left</span>
          </h1>

          {/* Original Fallback Direct Download Link */}
          <p className="text-sm text-gray-500 font-normal">
            Didn't start automatically?{' '}
            <a
              href={downloadUrl}
              className="text-gray-400 hover:text-white underline underline-offset-4 decoration-white/25 hover:decoration-white transition-colors font-medium"
            >
              Download DuoAudio.Setup.1.0.2.exe
            </a>
          </p>
        </div>

        {/* SECTION 1: CHROME-STYLE 3-CARD INSTALLATION STEPS */}
        <div className="mb-28 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">

            {/* Card 1: Open */}
            <div className="rounded-3xl bg-[#0E121B] border border-white/[0.08] overflow-hidden flex flex-col justify-between shadow-2xl shadow-black/80 hover:border-white/[0.14] transition-all">
              {/* Top Text Content */}
              <div className="p-7 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-gray-400 uppercase block mb-3">
                    Step 1
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                    Open
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-normal mb-6">
                    Open the <span className="text-white font-mono text-xs">DuoAudio.Setup.1.0.2.exe</span> file from the downloads list at the top right corner of this window.
                  </p>
                </div>
                <div>
                  <a
                    href={downloadUrl}
                    className="text-xs text-gray-400 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-colors font-medium inline-block"
                  >
                    Can't find your installer?
                  </a>
                </div>
              </div>

              {/* Bottom Visual Stage - Full Bleed */}
              <div className="w-full border-t border-white/[0.06] bg-[#07080B] overflow-hidden">
                <img
                  src="/assets2/BrowserDownload.png"
                  alt="Browser Download List"
                  className="w-full h-auto object-cover object-center block select-none"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Card 2: Allow / Bypass */}
            <div className="rounded-3xl bg-[#0E121B] border border-white/[0.08] overflow-hidden flex flex-col justify-between shadow-2xl shadow-black/80 hover:border-white/[0.14] transition-all">
              {/* Top Text Content */}
              <div className="p-7 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-gray-400 uppercase block mb-3">
                    Step 2
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                    Allow
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-normal mb-6">
                    When prompted by Windows, click <strong className="text-white font-semibold">"More info"</strong>, and then click <strong className="text-white font-semibold">"Run anyway"</strong>.
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      const el = document.getElementById('why-warning');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs text-gray-400 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-colors font-medium inline-block cursor-pointer text-left"
                  >
                    Why does Windows show this?
                  </button>
                </div>
              </div>

              {/* Bottom Visual Stage - Full Bleed */}
              <div className="w-full border-t border-white/[0.06] bg-[#07080B] overflow-hidden">
                <img
                  src="/assets2/Windows-Smartscreen.png"
                  alt="Windows SmartScreen Protection Dialog"
                  className="w-full h-auto object-cover object-center block select-none"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Card 3: Pair / Install */}
            <div className="rounded-3xl bg-[#0E121B] border border-white/[0.08] overflow-hidden flex flex-col justify-between shadow-2xl shadow-black/80 hover:border-white/[0.14] transition-all">
              {/* Top Text Content */}
              <div className="p-7 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-gray-400 uppercase block mb-3">
                    Step 3
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                    Run
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-normal mb-6">
                    Connect both Bluetooth headphones in Windows Settings, choose them in DuoAudio, and click <strong className="text-white font-semibold">Start Sharing</strong>.
                  </p>
                </div>
                <div>
                  <Link
                    to="/troubleshooting"
                    className="text-xs text-gray-400 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-colors font-medium inline-block"
                  >
                    Need more help? ↗
                  </Link>
                </div>
              </div>

              {/* Bottom Visual Stage - Full Bleed */}
              <div className="w-full border-t border-white/[0.06] bg-[#07080B] overflow-hidden">
                <img
                  src="/assets2/DuoAudio-Interface.png"
                  alt="DuoAudio Desktop App Interface"
                  className="w-full h-auto object-cover object-center block select-none"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: TRANSPARENCY & PROOF OF SAFETY */}
        <div id="why-warning" className="mb-20 pt-16 border-t border-white/[0.08] scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              <span className="text-white block">Why Does Windows Show This Warning?</span>
              <span className="text-gray-400 block mt-1.5 sm:mt-2">And How Is It Safe to Run?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {/* Trust Point 1: Indie Project (No Expensive Certificate) */}
            <div className="rounded-2xl p-6 bg-white/[0.02] border border-white/[0.08] flex items-start space-x-4">
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-300 shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Indie Project, No Commercial Certificate
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-normal">
                  DuoAudio is an independent, free open-source project. Because it doesn&apos;t carry an <span className="text-gray-200 font-medium">expensive</span> annual enterprise <span className="text-gray-200 font-medium">certificate ($400–$600/year)</span>, Windows automatically flags it as unrecognized until enough people install it.
                </p>
              </div>
            </div>

            {/* Trust Point 2: Clean Security Scans */}
            <div className="rounded-2xl p-6 bg-white/[0.02] border border-white/[0.08] flex items-start space-x-4">
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-300 shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Clean Security Scans
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-normal">
                  The official installer contains zero bundled software, toolbars, or background updaters. You can scan the file and <span className="text-gray-200 font-medium">verify yourself</span> across 70+ top antivirus engines on <span className="text-gray-200 font-medium">VirusTotal</span>.
                </p>
                <a
                  href="https://www.virustotal.com/gui/file/64d0cb6230fa731bf5a156469c265db4a0195e6f26eb316110ba79b6d1121b25/detection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-[#9AA7FF] hover:underline pt-1 font-medium"
                >
                  <span>View live report on VirusTotal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Trust Point 3: 100% Free & Open Source */}
            <div className="rounded-2xl p-6 bg-white/[0.02] border border-white/[0.08] flex items-start space-x-4">
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-300 shrink-0 mt-0.5">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white tracking-tight">
                  100% Free & Open Source
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-normal">
                  DuoAudio is fully auditable. Every line of C++ and JavaScript code is publicly hosted on GitHub. Anyone can inspect, build, or verify the source code.
                </p>
                <a
                  href="https://github.com/Divyanshu0902/DuoAudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-[#9AA7FF] hover:underline pt-1 font-medium"
                >
                  <span>Inspect GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Trust Point 4: Zero Telemetry & 100% Local */}
            <div className="rounded-2xl p-6 bg-white/[0.02] border border-white/[0.08] flex items-start space-x-4">
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-300 shrink-0 mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Zero Telemetry • 100% On-Device
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-normal">
                  DuoAudio operates strictly offline using Windows native WASAPI audio streams. It contains no telemetry, tracking pixels, accounts, or analytics — verifiable by observing 0 KB/s network activity in Windows Task Manager.
                </p>
              </div>
            </div>

          </div>

          {/* Cryptographic Verification Box */}
          <div className="rounded-2xl p-5 sm:p-6 bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-300 shrink-0">
                <Terminal className="w-4 h-4 text-gray-300" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white tracking-tight">Verify Installer Integrity</h4>
                <p className="text-xs text-gray-400 font-normal">Compare SHA-256 hash via Windows PowerShell</p>
              </div>
            </div>

            {/* Clean 2-Row Monospace Verification Items */}
            <div className="space-y-2 font-mono text-xs">
              {/* Row 1: PowerShell Command */}
              <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.06]">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <span className="text-[11px] font-semibold text-[#9AA7FF] shrink-0 uppercase tracking-wider">Command</span>
                  <span className="text-gray-300 truncate select-all">{verifyCmd}</span>
                </div>
                <button
                  onClick={handleCopyCmd}
                  className="shrink-0 px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-gray-300 hover:text-white transition-all flex items-center space-x-1.5 text-[11px]"
                  title="Copy PowerShell command"
                >
                  {copiedCmd ? <Check className="w-3 h-3 text-[#9AA7FF]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCmd ? 'Copied' : 'Copy Command'}</span>
                </button>
              </div>

              {/* Row 2: Expected SHA-256 Hash */}
              <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.06]">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <span className="text-[11px] font-semibold text-gray-400 shrink-0 uppercase tracking-wider">SHA-256</span>
                  <span className="text-gray-300 truncate select-all">{checksum}</span>
                </div>
                <button
                  onClick={handleCopyHash}
                  className="shrink-0 px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-gray-300 hover:text-white transition-all flex items-center space-x-1.5 text-[11px]"
                  title="Copy SHA-256 hash"
                >
                  {copiedHash ? <Check className="w-3 h-3 text-[#9AA7FF]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedHash ? 'Copied' : 'Copy Hash'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: BOTTOM NAVIGATION & HELP */}
        <div className="pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <Link to="/troubleshooting" className="text-gray-400 hover:text-white transition-colors">
              Troubleshooting FAQ
            </Link>
            <span>•</span>
            <Link to="/architecture" className="text-gray-400 hover:text-white transition-colors">
              Architecture Docs
            </Link>
          </div>

          <div>
            <p className="text-gray-500">
              Need help? Open an issue on{' '}
              <a
                href="https://github.com/Divyanshu0902/DuoAudio/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white underline"
              >
                GitHub Issues
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
