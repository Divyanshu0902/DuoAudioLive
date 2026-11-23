import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  ChevronDown, 
  ArrowLeft, 
  Bluetooth, 
  VolumeX, 
  Volume2, 
  ShieldAlert, 
  RefreshCw, 
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TroubleshootingPage() {
  const [openItem, setOpenItem] = useState(0);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const issues = [
    {
      id: 0,
      category: 'connectivity',
      title: 'Only one pair of earbuds is outputting audio',
      summary: 'Ensure both earbuds are paired and marked as Connected Music in Windows 11 Bluetooth Settings.',
      steps: [
        'Open Windows Settings (Win + I) ➔ Bluetooth & devices.',
        'Verify that BOTH pairs of earbuds say "Connected music" rather than just "Paired".',
        'In DuoAudio, click the refresh button next to the dropdowns to reload active Windows audio endpoints.',
        'Select Earbud 1 and Earbud 2 in their respective dropdowns and click "Start Sharing".',
      ],
      tip: 'Some Bluetooth headphones auto-disconnect after a few minutes of inactivity. Play audio on your laptop before starting DuoAudio.',
    },
    {
      id: 1,
      category: 'audio',
      title: 'Audio sounds crackly or is stuttering',
      summary: 'Bandwidth saturation on older Bluetooth 4.0/4.2 adapters when handling two concurrent high-bitrate audio streams.',
      steps: [
        'Move earbuds within 1 to 2 meters of your laptop to test signal strength.',
        'If using 2.4 GHz Wi-Fi, switch your laptop to 5 GHz Wi-Fi. 2.4 GHz Wi-Fi heavily shares radio antenna frequencies with Bluetooth.',
        'Ensure neither pair of earbuds is running in "Headset / Hands-free" microphone mode. Set both to "Stereo Headphones".',
        'In DuoAudio, stop and restart sharing to re-negotiate PCM ring buffers.',
      ],
      tip: 'Dual Bluetooth audio streaming functions best with Bluetooth 5.0 or newer adapters.',
    },
    {
      id: 2,
      category: 'speakers',
      title: 'Sound is still playing through the laptop speakers',
      summary: 'The laptop physical speaker was unmuted by a third-party app or Windows volume change.',
      steps: [
        'Confirm that "Silent Room Guarantee" is set to Active in DuoAudio.',
        'Check if an external media app (like Zoom or Teams) is directly addressing the Realtek Speakers device instead of the Default Windows Playback device.',
        'Click the speaker mute toggle inside DuoAudio to force mute on the hardware endpoint.',
      ],
      tip: 'DuoAudio locks laptop speakers to 0dB while active, but hardware hotkeys (like laptop keyboard volume keys) may accidentally re-engage the speaker.',
    },
    {
      id: 3,
      category: 'detection',
      title: 'My earbuds do not appear in the DuoAudio dropdowns',
      summary: 'Windows Core Audio has not registered the Bluetooth endpoint as an active playback render device.',
      steps: [
        'Right-click the Windows Sound icon in your system tray ➔ click "Sound settings".',
        'Under "Output", confirm that both earbuds appear in the list of available speakers/headphones.',
        'If a device says "Disabled", click on it and select "Allow".',
        'Return to DuoAudio and hit the refresh icon.',
      ],
      tip: 'AirPods users: keep the lid open or earbuds in your ears when connecting so they do not enter standby sleep mode.',
    },
    {
      id: 4,
      category: 'antivirus',
      title: 'Windows SmartScreen or Defender warning during installation',
      summary: 'New open-source utility binaries without paid Microsoft EV code-signing certificates trigger standard SmartScreen flags.',
      steps: [
        'Click "More info" on the Windows SmartScreen blue banner.',
        'Click "Run anyway".',
        'To verify file integrity yourself, check that the installer SHA-256 matches: 64D0CB6230FA731BF5A156469C265DB4A0195E6F26EB316110BA79B6D1121B25.',
        'All C++ and Electron source code is public and inspectable on GitHub.',
      ],
      tip: 'DuoAudio uses standard official Windows Core Audio COM interfaces with 0 heuristic hooks.',
    },
    {
      id: 5,
      category: 'restoration',
      title: 'How to restore original Windows audio settings on exit',
      summary: 'DuoAudio features an automated lifecycle hook that reverts your playback devices.',
      steps: [
        'Simply close DuoAudio using the top-right X button or right-click the system tray icon ➔ Exit.',
        'DuoAudio invokes duoaudio_endpoint.exe to restore your pre-launch default Windows output device.',
        'If your PC unexpectedly powered off, you can open Windows Sound Settings and select your preferred default speaker in 1 click.',
      ],
      tip: 'No reboot is ever required.',
    },
  ];

  const filteredIssues = issues.filter((item) => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#07080B] text-[#F3F4F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between pb-8 border-b border-white/[0.08] mb-8">
          <div className="flex items-center space-x-3">
            <Link
              to="/"
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-xs font-mono text-blue-400">Troubleshooting Guide</span>
          </div>

          <a
            href="https://github.com/Divyanshu0902/DuoAudio/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors"
          >
            <span>Report Issue</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Troubleshooting & Support
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Solutions for Bluetooth connection issues, device detection, audio stutter, and Windows 11 sound settings.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search common issues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0D1017] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'connectivity', 'audio', 'speakers'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono capitalize transition-all ${
                  filter === cat
                    ? 'bg-blue-600/25 border border-blue-500/40 text-white font-semibold'
                    : 'bg-white/[0.03] border border-white/[0.06] text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ & Diagnostics Accordion */}
        <div className="space-y-4">
          {filteredIssues.map((issue) => {
            const isOpen = openItem === issue.id;
            return (
              <div
                key={issue.id}
                className={`rounded-2xl transition-all border overflow-hidden ${
                  isOpen
                    ? 'bg-[#0E121E] border-blue-500/30 shadow-xl shadow-blue-500/5'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                }`}
              >
                <button
                  onClick={() => setOpenItem(isOpen ? -1 : issue.id)}
                  className="w-full px-6 py-5 flex items-start justify-between text-left focus:outline-none"
                >
                  <div className="pr-4">
                    <span className="text-base font-semibold text-white block mb-1">
                      {issue.title}
                    </span>
                    <span className="text-xs text-gray-400">{issue.summary}</span>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 mt-1 ${
                      isOpen ? 'bg-blue-500/20 text-blue-400 rotate-180' : 'bg-white/[0.05] text-gray-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-white/[0.04] space-y-4 text-xs sm:text-sm text-gray-300">
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                            Resolution Steps:
                          </h4>
                          <ol className="list-decimal list-inside space-y-2 text-gray-300">
                            {issue.steps.map((step, idx) => (
                              <li key={idx} className="leading-relaxed pl-1">
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>

                        {issue.tip && (
                          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs flex items-start space-x-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>
                              <strong>Tip:</strong> {issue.tip}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still stuck banner */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Still experiencing audio issues?</h3>
            <p className="text-xs text-gray-400">
              Submit an issue with your Windows 11 build number and earbud models on GitHub.
            </p>
          </div>
          <a
            href="https://github.com/Divyanshu0902/DuoAudio/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-xs font-medium text-white transition-all shrink-0"
          >
            Open GitHub Issue
          </a>
        </div>
      </div>
    </div>
  );
}
