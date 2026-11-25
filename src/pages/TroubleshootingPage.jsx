import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronLeft,
  Check,
  Copy,
  Hash,
  ExternalLink
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const TROUBLESHOOTING_ISSUES = [
  {
    id: 'bluetooth-detection',
    anchorId: 'issue-bluetooth-detection',
    number: '1',
    category: 'connectivity',
    categoryLabel: 'Connectivity',
    title: 'Earbuds paired in Windows, but do not appear in DuoAudio dropdowns',
    rootCause: 'Windows 11 manages Bluetooth radio pairing separately from Core Audio render endpoints (IMMDevice). An earbud can show as "Paired" in Windows Settings without its audio playback sink being instantiated until it enters active "Connected music" mode.',
    steps: [
      {
        instruction: 'Open Windows Sound Settings',
        detail: 'Press Win + I ➔ System ➔ Sound, or right-click the speaker icon in your taskbar and select Sound settings.',
      },
      {
        instruction: 'Open Classic Sound Control Panel',
        detail: 'Scroll down to the Advanced section and click "More sound settings" to open the classic Sound Control Panel (mmsys.cpl).',
      },
      {
        instruction: 'Verify Playback Endpoint Status',
        detail: 'Under the Playback tab, check if your Bluetooth earbuds show a green checkmark or Ready status.',
      },
      {
        instruction: 'Force Connect or Enable Endpoint',
        detail: 'If an earbud is grayed out or marked "Disconnected", right-click it and select Connect. If marked "Disabled", right-click and select Enable.',
      },
      {
        instruction: 'Refresh DuoAudio Devices',
        detail: 'Return to DuoAudio and click the Refresh Devices button (or press Ctrl + R). Both devices will populate the dropdowns.',
      },
    ],
    codeSnippet: null,
    tip: 'AirPods & True Wireless Earbuds: Remove both earbuds from their charging case and place them in your ears before scanning. Earbuds in an open case remain in low-power Bluetooth Low Energy (BLE) standby without exposing an active WASAPI render endpoint.',
  },
  {
    id: 'single-earbud-silence',
    anchorId: 'issue-single-earbud-silence',
    number: '2',
    category: 'audio',
    categoryLabel: 'Audio Streams',
    title: 'Only one pair of earbuds produces sound; the other is silent',
    rootCause: 'Bluetooth audio sinks automatically enter deep low-power sleep when no audio frames arrive for several seconds. If one earbud experienced a momentary radio glitch during stream negotiation, its WASAPI buffer underruns, leaving one stream active while the other stalls.',
    steps: [
      {
        instruction: 'Check DuoAudio Status',
        detail: 'If it displays "Partially Degraded", DuoAudio isolated an endpoint failure on one stream while keeping the other stream running without crashing.',
      },
      {
        instruction: 'Verify Software Volume Sliders',
        detail: 'Ensure both Volume 1 and Volume 2 sliders in DuoAudio are set to an audible level (e.g. 50%–70%). Software attenuation may have clamped one channel.',
      },
      {
        instruction: 'Wake the Bluetooth Receiver',
        detail: 'Click "Stop Sharing", wait 2 seconds, and tap the touch sensor or press the physical button on the silent earbud to wake its receiver from standby.',
      },
      {
        instruction: 'Re-negotiate Concurrent Shared-Mode Streams',
        detail: 'Click "Start Sharing" to re-initialize both WASAPI shared-mode playback streams concurrently with fresh ring-buffer pointers.',
      },
    ],
    codeSnippet: null,
    tip: 'Stream Isolation: DuoAudio processes each stream independently in software. If one earbud disconnects or runs out of battery, the second stream continues uninterrupted.',
  },
  {
    id: 'comb-filtering-echo',
    anchorId: 'issue-comb-filtering-echo',
    number: '3',
    category: 'audio',
    categoryLabel: 'Audio Streams',
    title: 'Echo, hollow sound, or duplicate audio (Comb-Filtering)',
    rootCause: 'Dual-Path Playback occurs when Earbud 1 is selected in DuoAudio while also set as the Windows Default Audio Device. Media players render directly to Earbud 1 (Path A), while DuoAudio captures system audio and renders a duplicate copy ~40ms later (Path B), creating severe phase cancellation and hollow echo.',
    steps: [
      {
        instruction: 'Understand Dual-Path Playback',
        detail: 'When the active capture device is also an output device, the listener hears direct audio combined with delayed loopback audio, producing perceived reverb.',
      },
      {
        instruction: 'Automatic Solution (Recommended)',
        detail: 'DuoAudio automatically prevents this by redirecting default system audio to laptop speakers at startup. Verify in DuoAudio Settings that "Automatic default device management" is toggled ON.',
      },
      {
        instruction: 'Manual Solution',
        detail: 'Open Windows Sound Settings (Win + I ➔ Sound) and manually set "Realtek Audio / Laptop Speakers" as the default playback device before starting DuoAudio.',
      },
      {
        instruction: 'Select Endpoints in DuoAudio',
        detail: 'In DuoAudio, select Earbud 1 and Earbud 2 in their respective dropdowns and click "Start Sharing". Both earbuds will receive single-copy synchronized audio.',
      },
    ],
    codeSnippet: null,
    tip: 'When Automatic Default Device Management is active, DuoAudio redirects system audio to physical speakers, locks them to mute via IAudioEndpointVolume, and captures the stream cleanly via WASAPI loopback without secondary playback conflicts.',
  },
  {
    id: 'speaker-audio-leak',
    anchorId: 'issue-speaker-audio-leak',
    number: '4',
    category: 'speakers',
    categoryLabel: 'Speakers',
    title: 'Sound continues playing aloud through laptop speakers',
    rootCause: 'Certain VoIP desktop applications (Discord, Zoom, Microsoft Teams, VLC) hardcode their audio output device to "Realtek Speakers" instead of inheriting the Windows default endpoint, or physical OEM keyboard hotkeys unclamp hardware mute.',
    steps: [
      {
        instruction: 'Check Media Application Audio Device Settings',
        detail: 'Open audio settings in your active app (Discord, Zoom, Spotify, VLC) and ensure the output device is set to "Default System Device" rather than explicitly pinned to "Realtek Speakers".',
      },
      {
        instruction: 'Avoid Keyboard Hardware Volume Hotkeys',
        detail: 'Do not press laptop keyboard volume keys (Fn + F8/F9 or physical volume rockers) during a session. Certain OEM audio drivers automatically disengage hardware mute flags whenever physical keys are pressed.',
      },
      {
        instruction: 'Use In-App Software Volume Faders',
        detail: 'Use DuoAudio software volume sliders to adjust listening levels for each person independently without touching Windows master volume.',
      },
      {
        instruction: 'Re-assert Hardware Mute Lock',
        detail: 'In DuoAudio, click the speaker Mute/Unmute toggle to re-assert the hardware mute lock on laptop speakers via duoaudio_endpoint.exe.',
      },
    ],
    codeSnippet: null,
    tip: 'DuoAudio uses IAudioEndpointVolume::SetMute(TRUE) on the physical speaker endpoint. System audio continues rendering to the muted speaker where loopback captures it silently without producing physical room sound.',
  },
  {
    id: 'wifi-bluetooth-contention',
    anchorId: 'issue-wifi-bluetooth-contention',
    number: '5',
    category: 'connectivity',
    categoryLabel: 'Connectivity',
    title: 'Audio crackling, stuttering, or rhythmic dropouts',
    rootCause: 'Bluetooth operates in the 2.4 GHz ISM band (2.402–2.480 GHz). High-bitrate video streaming over 2.4 GHz Wi-Fi while simultaneously transmitting two concurrent stereo A2DP Bluetooth streams oversaturates shared combo antennas, causing RF collisions.',
    steps: [
      {
        instruction: 'Switch Wi-Fi to 5 GHz, 6 GHz, or Ethernet',
        detail: 'Connect your laptop to a 5 GHz or 6 GHz Wi-Fi band (or wired Ethernet) to completely vacate the 2.4 GHz spectrum for Bluetooth A2DP transmission.',
      },
      {
        instruction: 'Maintain Line-of-Sight Proximity',
        detail: 'Ensure both listeners remain within 1 to 3 meters of the laptop without physical or metallic obstructions.',
      },
      {
        instruction: 'Disable Bluetooth Microphone Input Profiles',
        detail: 'In Windows Sound Settings, verify neither earbud is actively selected as the system "Input (Microphone)". Microphone activation forces Bluetooth from high-quality A2DP stereo into half-duplex HFP/HSP mono mode (8 kHz / 16 kHz).',
      },
      {
        instruction: 'Bounded Ring Buffer Discard',
        detail: 'DuoAudio caps ring buffers at 200 ms and discards stale packets if radio transmission stalls, preventing compounding audio lag.',
      },
    ],
    codeSnippet: null,
    tip: 'Dual Bluetooth streaming requires reliable radio bandwidth. Laptops with Bluetooth 5.0 or newer adapters provide double the transmission throughput (2 Mbps PHY) compared to Bluetooth 4.2.',
  },
  {
    id: 'windows-smartscreen',
    anchorId: 'issue-windows-smartscreen',
    number: '6',
    category: 'system',
    categoryLabel: 'Security & System',
    title: 'Windows SmartScreen or Windows Defender warning on installation',
    rootCause: 'Microsoft Defender SmartScreen uses cloud reputation filters that flag recently published open-source installers that lack an expensive enterprise Extended Validation (EV) code-signing certificate.',
    steps: [
      {
        instruction: 'Click "More info" on the SmartScreen Banner',
        detail: 'On the Windows SmartScreen blue alert banner ("Windows protected your PC"), click the underlined "More info" link.',
      },
      {
        instruction: 'Select "Run anyway"',
        detail: 'Click the "Run anyway" button at the bottom of the dialog to proceed with the standard installation wizard.',
      },
      {
        instruction: 'Verify SHA-256 Checksum in PowerShell',
        detail: 'Open PowerShell in your Downloads folder and run the command below to verify cryptographic integrity against the official release checksum: 64D0CB6230FA731BF5A156469C265DB4A0195E6F26EB316110BA79B6D1121B25.',
      },
    ],
    codeSnippet: 'Get-FileHash -Algorithm SHA256 "DuoAudio Setup 1.0.2.exe"',
    tip: 'All C++ COM helper source code and Electron application code is 100% open-source, audited, and inspectable on GitHub. No external network requests are made during runtime.',
  },
  {
    id: 'system-exit-restore',
    anchorId: 'issue-system-exit-restore',
    number: '7',
    category: 'system',
    categoryLabel: 'Security & System',
    title: 'How to completely exit DuoAudio and restore default audio settings',
    rootCause: 'DuoAudio implements minimize-to-tray window management. The window title bar intentionally omits the "X" button so an accidental click never cuts off sound during a movie or presentation.',
    steps: [
      {
        instruction: 'Understand Minimize-to-Tray Lifecycle',
        detail: 'Closing the window or pressing Alt+F4 minimizes DuoAudio to the Windows System Tray so playback is never interrupted by accident.',
      },
      {
        instruction: 'Locate the System Tray Icon',
        detail: 'Click the "^" overflow arrow in the bottom-right corner of the Windows taskbar (notification area).',
      },
      {
        instruction: 'Right-Click and Select "Quit DuoAudio"',
        detail: 'Right-click the DuoAudio headphone icon and select "Quit DuoAudio".',
      },
      {
        instruction: 'Automatic Lifecycle Teardown',
        detail: 'DuoAudio immediately terminates WASAPI loopback capture, closes both output streams, unmutes laptop speakers, and invokes duoaudio_endpoint.exe to restore your original Windows default playback device.',
      },
      {
        instruction: 'Emergency Recovery Guarantee',
        detail: 'If DuoAudio is force-terminated via Task Manager or your laptop loses power, the supervisor executes synchronous restoration (restoreAllSync). No reboot is ever required.',
      },
    ],
    codeSnippet: null,
    tip: 'If your PC unexpectedly powered off during a session, you can also re-select your preferred speaker in Windows Sound Settings with a single click.',
  },
];

export const PREFLIGHT_CHECKLIST = [
  {
    title: 'Connected Music Status',
    requirement: 'Both earbuds must state "Connected music" in Windows Settings (Win + I ➔ Bluetooth & devices), not just "Paired". Earbuds only expose an active WASAPI render endpoint when audio sink connection is established.',
  },
  {
    title: 'Active Audio Stream Prior to Session Start',
    requirement: 'Start media playback (YouTube, Spotify, VLC) before clicking "Start Sharing" so the Windows audio engine initializes an active loopback buffer source.',
  },
  {
    title: 'Stereo A2DP Mode (No HFP Hands-Free)',
    requirement: 'Ensure neither earbud is actively selected as the Windows Default Input (Microphone). Microphones force Bluetooth into half-duplex 8 kHz/16 kHz HFP mono mode rather than 48 kHz stereo A2DP.',
  },
];

export default function TroubleshootingPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedSnippet, setCopiedSnippet] = useState(null);
  const [copiedAnchor, setCopiedAnchor] = useState(null);

  const location = useLocation();

  // Sync hash from URL if present
  useEffect(() => {
    if (location.hash) {
      const anchor = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  }, [location.hash]);

  const filteredIssues = useMemo(() => {
    if (activeCategory === 'all') return TROUBLESHOOTING_ISSUES;
    return TROUBLESHOOTING_ISSUES.filter(
      (issue) => issue.category === activeCategory
    );
  }, [activeCategory]);

  const handleCopySnippet = (snippet) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(snippet);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const handleCopyAnchor = (anchorId) => {
    const url = `${window.location.origin}/troubleshooting#${anchorId}`;
    navigator.clipboard.writeText(url);
    setCopiedAnchor(anchorId);
    setTimeout(() => setCopiedAnchor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#111318] text-[#F3F4F6] pt-20 selection:bg-[#5C6CDB]/30 selection:text-white">
      {/* Main Single-Column Reading Layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-24">

        {/* Main Heading at the top with category navigation below */}
        <div className="space-y-4 pb-6 border-b border-white/[0.08] mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight">
            Troubleshooting & Diagnostic Guide
          </h1>

          {/* Category Navigation Texts directly below heading */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pt-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'connectivity', label: 'Bluetooth' },
              { id: 'audio', label: 'Audio' },
              { id: 'speakers', label: 'Speakers' },
              { id: 'system', label: 'System' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-white/[0.08] text-white font-medium'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Help & Contact Notice */}
          <p className="text-xs sm:text-sm text-gray-400 pt-1">
            If your issue persists,{' '}
            <a
              href="https://github.com/Divyanshu0902/DuoAudio/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9AA7FF] hover:text-white underline underline-offset-2 transition-colors"
            >
              open a GitHub issue
            </a>{' '}
            or email me at{' '}
            <a
              href="mailto:divyanshuthakur.dev@gmail.com"
              className="text-[#9AA7FF] hover:text-white underline underline-offset-2 transition-colors font-mono"
            >
              divyanshuthakur.dev@gmail.com
            </a>
            .
          </p>
        </div>

        {/* DIAGNOSTIC ISSUES LIST */}
        <div className="space-y-14">
          {filteredIssues.map((issue) => (
            <section
              key={issue.id}
              id={issue.anchorId}
              className="scroll-mt-32 space-y-5"
            >
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between group">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight flex items-center gap-2.5 leading-snug">
                    <span className="text-gray-400 font-normal">{issue.number}.</span>
                    <span>{issue.title}</span>
                  </h2>
                  <button
                    onClick={() => handleCopyAnchor(issue.anchorId)}
                    title="Copy link to issue"
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-500 hover:text-gray-300 transition-opacity"
                  >
                    {copiedAnchor === issue.anchorId ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Hash className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Root Cause as clean text */}
                <p className="text-base text-gray-200 leading-relaxed pt-1 font-sans">
                  {issue.rootCause}
                </p>
              </div>

              {/* Resolution Steps: Clean numbered list with clear bold titles */}
              <div className="space-y-3 pt-1">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono">
                  Resolution Steps
                </h3>
                <ol className="list-decimal list-outside ml-6 space-y-3 text-base text-gray-300 leading-relaxed font-sans">
                  {issue.steps.map((step, idx) => (
                    <li key={idx} className="pl-1">
                      <strong className="text-white font-medium">{step.instruction}:</strong>{' '}
                      <span className="text-gray-300">{step.detail}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* PowerShell Code Snippet (if present) */}
              {issue.codeSnippet && (
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                    <span>PowerShell Verification Command:</span>
                    <button
                      onClick={() => handleCopySnippet(issue.codeSnippet)}
                      className="text-[#9AA7FF] hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      {copiedSnippet === issue.codeSnippet ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Command</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 rounded-lg bg-black/40 border border-white/[0.08] text-sm font-mono text-gray-200 overflow-x-auto leading-relaxed">
                    <code>{issue.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Note: Minimal left border blockquote */}
              <div className="border-l-2 border-[#5C6CDB] pl-4 py-1 text-sm sm:text-base text-gray-200 leading-relaxed font-sans">
                <span className="text-[#9AA7FF] font-medium">Note:</span> {issue.tip}
              </div>

              {/* Subtle divider between issues */}
              <hr className="border-white/[0.08] pt-4" />
            </section>
          ))}

          {filteredIssues.length === 0 && (
            <div className="py-16 text-center space-y-3 text-base text-gray-400">
              <p>No diagnostic issues found in this category.</p>
              <button
                onClick={() => setActiveCategory('all')}
                className="text-sm text-[#9AA7FF] hover:underline"
              >
                View all issues
              </button>
            </div>
          )}
        </div>

        {/* 4. PRE-FLIGHT CHECKLIST */}
        <section id="preflight-checklist" className="scroll-mt-32 pt-8 space-y-5">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Pre-Flight Diagnostic Checklist
            </h2>
            <p className="text-base text-gray-300 leading-relaxed">
              Verify these three conditions prior to clicking "Start Sharing":
            </p>
          </div>

          <ol className="list-decimal list-outside ml-6 space-y-3.5 text-base text-gray-300 leading-relaxed font-sans">
            {PREFLIGHT_CHECKLIST.map((item, idx) => (
              <li key={idx} className="pl-1">
                <strong className="text-white font-medium">{item.title}:</strong>{' '}
                <span>{item.requirement}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 5. REPORTING AN ISSUE */}
        <div className="pt-8 border-t border-white/[0.08] space-y-3 text-base text-gray-300">
          <h3 className="text-lg font-semibold text-white">Still having audio issues?</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            If an issue persists across multiple reboots, please submit a diagnostic report on GitHub including your Windows 11 build (<code className="text-gray-300 font-mono">winver</code>), Bluetooth controller model, and earbud models.
          </p>
          <div className="pt-1 flex flex-wrap items-center gap-4 text-sm">
            <a
              href="https://github.com/Divyanshu0902/DuoAudio/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-[#9AA7FF] hover:text-white transition-colors"
            >
              <span>Open GitHub Issue</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-gray-700">|</span>
            <a
              href="mailto:divyanshuthakur.dev@gmail.com"
              className="text-[#9AA7FF] hover:text-white transition-colors font-mono"
            >
              divyanshuthakur.dev@gmail.com
            </a>
          </div>
        </div>

        {/* 6. BOTTOM NAVIGATION LINKS */}
        <div className="pt-10 border-t border-white/[0.08] flex items-center justify-between text-sm text-gray-400">
          <Link
            to="/architecture"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Architecture Documentation</span>
          </Link>
          <a
            href="https://github.com/Divyanshu0902/DuoAudio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <span>DuoAudio on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
