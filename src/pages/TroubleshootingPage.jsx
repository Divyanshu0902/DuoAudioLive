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
  AlertCircle,
  Radio,
  Sliders,
  Laptop,
  Power
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
      title: 'Earbuds paired in Windows, but do not appear in DuoAudio dropdowns',
      summary: 'Windows handles Bluetooth radio pairing and active Core Audio render endpoints (IMMDevice) as two separate subsystems.',
      steps: [
        'Open Windows Sound Settings: Press Win + I ➔ System ➔ Sound.',
        'Scroll down to the Advanced section and click "More sound settings" (opens the classic Sound Control Panel).',
        'Under the Playback tab, verify that your Bluetooth earbuds appear with a green checkmark or Ready status.',
        'If an earbud is grayed out or marked "Disconnected", right-click it and select Connect.',
        'If an earbud is marked "Disabled", right-click it and select Enable.',
        'Return to DuoAudio and click the "Refresh Devices" button (or press Ctrl + R). Both devices will immediately populate the dropdowns.',
      ],
      tip: 'AirPods & True Wireless Earbuds: Always remove both earbuds from their charging case and place them in your ears before scanning. Earbuds in an open case often stay in ultra-low-power Bluetooth standby without activating audio render endpoints.',
    },
    {
      id: 1,
      category: 'audio',
      title: 'Only one pair of earbuds produces sound; the other is silent',
      summary: 'Device power-saving sleep state, dynamic endpoint ID invalidation after signal drop, or software volume fader at 0%.',
      steps: [
        'Check the DuoAudio status pill: If it displays "Partially Degraded", DuoAudio isolated a failure on one stream while keeping the other stream running without crashing.',
        'Verify software volume sliders: Ensure both Volume 1 and Volume 2 sliders in DuoAudio are set to an audible level (e.g. 50%–70%).',
        'Click "Stop Sharing", wait 2 seconds, and tap the touch sensor on the silent earbud to wake its Bluetooth receiver.',
        'Click "Start Sharing" to re-negotiate both WASAPI shared-mode playback streams concurrently.',
      ],
      tip: 'DuoAudio isolates failures on each stream. If one earbud runs out of battery or goes out of range, the second earbud continues playing without interrupting the session.',
    },
    {
      id: 2,
      category: 'audio',
      title: 'Echo, hollow sound, or duplicate audio (Comb-Filtering)',
      summary: 'Default Render Endpoint Conflict (Dual-Path Playback) when an earbud is also configured as the active Windows Default Device.',
      steps: [
        'Understand Dual-Path Playback: If Earbud 1 is selected in DuoAudio while also set as the Windows Default Playback Device, Windows applications render audio directly to Earbud 1 (Path A), while DuoAudio captures and duplicates a second copy with a ~40ms buffer delay (Path B), creating perceived echo or reverb.',
        'Automatic Solution (Recommended): DuoAudio automatically prevents this by switching default audio to laptop speakers at startup. Verify in DuoAudio Settings that "Automatic default device management" is toggled ON.',
        'Manual Solution (If Automatic Management is disabled): Open Windows Sound Settings (Win + I ➔ Sound) and manually set "Realtek Audio / Laptop Speakers" as default playback device before starting DuoAudio.',
        'In DuoAudio, select Earbud 1 and Earbud 2 in their respective dropdowns and click "Start Sharing". Both earbuds will now receive single-copy synchronized audio.',
      ],
      tip: 'When Automatic Default Device Management is active, DuoAudio redirects system audio to physical speakers, locks them to mute, and captures the stream cleanly via WASAPI loopback.',
    },
    {
      id: 3,
      category: 'speakers',
      title: 'Sound continues playing aloud through laptop speakers',
      summary: 'Third-party communications app output override or hardware keyboard volume key triggers.',
      steps: [
        'Check media application settings: Some desktop apps (Discord, Zoom, Microsoft Teams, VLC) allow hardcoding audio output to "Realtek Speakers" instead of "Default System Device". Set them to "Default" or "Same as System".',
        'Avoid keyboard volume hotkeys: Do not press laptop keyboard volume keys (Fn + F8/F9 or physical volume rockers) during a session. Certain OEM audio drivers automatically disengage hardware mute flags whenever physical keys are pressed.',
        'Use DuoAudio software volume sliders to adjust listening levels for each person independently.',
        'In DuoAudio, click the speaker Mute/Unmute toggle to re-assert the hardware mute lock on laptop speakers via duoaudio_endpoint.exe.',
      ],
      tip: 'DuoAudio uses IAudioEndpointVolume::SetMute(TRUE) on the hardware speaker endpoint. System audio still renders to the muted speaker where loopback captures it silently.',
    },
    {
      id: 4,
      category: 'connectivity',
      title: 'Audio crackling, stuttering, or rhythmic dropouts',
      summary: '2.4 GHz Wi-Fi radio contention with Bluetooth A2DP audio packets on shared laptop combo antennas, or older Bluetooth adapters.',
      steps: [
        'Switch laptop to 5 GHz or 6 GHz Wi-Fi (or wired Ethernet): Bluetooth operates in the 2.4 GHz ISM band (2.402–2.480 GHz). Streaming high-bitrate video over 2.4 GHz Wi-Fi while transmitting two concurrent stereo A2DP Bluetooth streams oversaturates shared combo antennas.',
        'Maintain line-of-sight: Ensure both listeners are within 1 to 3 meters of the laptop without physical obstructions.',
        'Turn off Bluetooth Microphones: In Windows Sound Settings, verify neither earbud is actively selected as the system "Input (Microphone)". Microphone usage forces Bluetooth into half-duplex HFP/HSP mono mode (8 kHz / 16 kHz).',
        'DuoAudio bounded ring buffer protection: DuoAudio caps queues at 200 ms and discards stale packets if radio transmission stalls, preventing compounding audio lag.',
      ],
      tip: 'Dual Bluetooth streaming requires reliable radio bandwidth. Laptops with Bluetooth 5.0 or newer adapters provide double the transmission speed of Bluetooth 4.2.',
    },
    {
      id: 5,
      category: 'system',
      title: 'Windows SmartScreen or Windows Defender warning on installation',
      summary: 'Microsoft SmartScreen flags new open-source MIT binaries that lack expensive enterprise Extended Validation (EV) certificates.',
      steps: [
        'On the Windows SmartScreen blue banner, click "More info".',
        'Click "Run anyway".',
        'Verify SHA-256 Checksum in PowerShell: run Get-FileHash -Algorithm SHA256 "DuoAudio Setup 1.0.2.exe".',
        'Verify that the hash matches the official release checksum: 64D0CB6230FA731BF5A156469C265DB4A0195E6F26EB316110BA79B6D1121B25.',
        'All C++ COM helper and Electron source code is completely open-source, audited, and inspectable on GitHub.',
      ],
      tip: 'DuoAudio uses standard official Windows Core Audio COM interfaces (IPolicyConfig & IAudioEndpointVolume). It contains zero kernel drivers, zero DLL injection, zero API hooks, and zero network calls.',
    },
    {
      id: 6,
      category: 'system',
      title: 'How to completely exit DuoAudio and restore default audio settings',
      summary: 'DuoAudio intentionally has NO close button in its window header to prevent accidental movie disruption. Exit via System Tray.',
      steps: [
        'Understand Window Lifecycle: DuoAudio uses a custom title bar with minimize only (no "X" close button). Closing the window or pressing Alt+F4 hides the app to the Windows System Tray so playback is never interrupted by accident.',
        'Locate the DuoAudio tray icon: Click the "^" overflow arrow in the bottom-right Windows taskbar tray.',
        'Right-click the DuoAudio icon and select "Quit DuoAudio".',
        'Automatic Lifecycle Teardown: DuoAudio immediately terminates WASAPI loopback capture, closes both output streams, unmutes laptop speakers, and invokes duoaudio_endpoint.exe to restore your original Windows default playback device.',
        'Crash Recovery: If DuoAudio is ever force-terminated via Task Manager or your laptop loses power, the supervisor executes emergency synchronous restoration (restoreAllSync). No reboot is ever required.',
      ],
      tip: 'If your PC unexpectedly powered off during a session, you can also re-select your preferred speaker in Windows Sound Settings with a single click.',
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
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Diagnostics & Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Troubleshooting & Diagnostic Guide
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            Authoritative solutions for Bluetooth endpoint detection, dual-path echo prevention, Wi-Fi 2.4 GHz contention, and Windows 11 audio restoration.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search diagnostic topics (e.g. echo, AirPods, crackling, tray)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0D1017] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'connectivity', 'audio', 'speakers', 'system'].map((cat) => (
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

        {/* Diagnostic Accordion */}
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
                    <span className="text-xs text-gray-400 leading-relaxed block">{issue.summary}</span>
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
                            <span className="leading-relaxed">
                              <strong>Engineering Note:</strong> {issue.tip}
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

        {/* Quick Diagnostic Checklist Box */}
        <div className="mt-12 p-6 rounded-3xl bg-[#0B0E17] border border-white/[0.08]">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center space-x-2">
            <Radio className="w-4 h-4 text-blue-400" />
            <span>Pre-Flight Diagnostic Checklist</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-mono font-bold">1.</span>
              <span><strong>Connected Music Status:</strong> Both earbuds must state "Connected music" in Windows Settings (Win + I ➔ Bluetooth & devices), not just "Paired".</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-mono font-bold">2.</span>
              <span><strong>Active Audio Stream:</strong> Start audio playback (YouTube, VLC, Spotify) before clicking "Start Sharing" to initialize the loopback source.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-mono font-bold">3.</span>
              <span><strong>Stereo Mode:</strong> Ensure neither earbud is forced into "Hands-Free AG Audio" (microphone mode), which degrades quality to mono 8 kHz/16 kHz.</span>
            </li>
          </ul>
        </div>

        {/* Still stuck banner */}
        <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Still experiencing audio issues?</h3>
            <p className="text-xs text-gray-400">
              Submit an issue with your Windows 11 build number and Bluetooth adapter model on GitHub.
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
