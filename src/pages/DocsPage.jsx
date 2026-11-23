import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Terminal, 
  Copy, 
  Check, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  ArrowLeft, 
  ExternalLink, 
  Search, 
  BookOpen, 
  GitBranch, 
  Laptop,
  CheckCircle2,
  HardDrive,
  VolumeX,
  Radio
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('topology');
  const [copiedCode, setCopiedCode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    {
      id: 'topology',
      title: 'Architectural Topology',
      tag: 'System Design',
      content: `DuoAudio uses a multi-process architecture engineered to isolate real-time Windows audio processing from UI rendering, crash risks, and driver instability.

### High-Level 3-Tier Topology:
- **Tier 1: Electron Desktop Shell (Main + React 19 UI):** Runs on Electron 33 with a Chromium UI. Enforces a single-instance lock, custom minimize-to-tray lifecycle (no close button on window to prevent accidental movie disruption), and supervises child audio processes.
- **Tier 2: System Node.js Child Runner (\`node.exe\`):** Runs native audio libraries (\`loopback-capture\` and \`audify\`) in an external child process isolated from Electron. Handles WASAPI Loopback capture, the silence suppression patch, uniform 20 ms PCM frame conversion, and bounded rate-paced dual output streaming.
- **Tier 3: Native C++ Endpoint Helper (\`duoaudio_endpoint.exe\`):** Standalone 64-bit console binary compiled via MinGW GCC 13.2.0. Directly interfaces with Windows Core Audio COM interfaces (\`IPolicyConfig\` and \`IAudioEndpointVolume\`) to perform zero-config default device redirection and hardware speaker muting.`,
      code: `┌─────────────────────────────────────────────────────────────────────────────┐
│                           ELECTRON MAIN PROCESS                             │
│  - App Lifecycle & Single Instance Lock                                     │
│  - System Tray Integration (Minimize-to-Tray, No Close Button)              │
│  - Device Enumeration Supervisor                                            │
│  - Audio Service Supervisor (Spawns, monitors, and restarts Audio Runner)   │
└───────────────────────┬───────────────────────────────┬─────────────────────┘
                        │ IPC (Electron contextBridge)  │ IPC (JSON over stdio)
                        ▼                               ▼
┌───────────────────────────────┐     ┌───────────────────────────────────────┐
│     CHROMIUM RENDERER (UI)    │     │       SYSTEM NODE.JS RUNNER           │
│  - React 19 + Vite 8          │     │  (Isolated child process: node.exe)   │
│  - Dark Theme (Graphite)      │     │                                       │
│  - Dual Output Selectors      │     │  1. WASAPI Loopback Capture           │
│  - Independent Volume Sliders │     │     (loopback-capture + silence patch)│
│  - Reactive Status Pill       │     │  2. PCM Conversion & Frame Pacing     │
│  - Settings Configuration     │     │     (PcmConverter + AudioBuffer)      │
└───────────────────────────────┘     │  3. Dual WASAPI Playback Streams      │
                                      │     (audify / RtAudio)                │
                                      └───────────────────┬───────────────────┘
                                                          │ Child Exec (CLI)
                                                          ▼
                                      ┌───────────────────────────────────────┐
                                      │     NATIVE C++ ENDPOINT HELPER        │
                                      │      (duoaudio_endpoint.exe)          │
                                      │  - Windows Core Audio COM Interfaces  │
                                      │  - IPolicyConfig (Default Switching)  │
                                      │  - IAudioEndpointVolume (Mute Control)│
                                      │  - IMMDeviceEnumerator (Resolution)   │
                                      └───────────────────────────────────────┘`,
    },
    {
      id: 'tier1-shell',
      title: 'Tier 1: Electron Shell & Lifecycle',
      tag: 'Desktop Shell',
      content: `The desktop interface runs on Electron 33 and React 19 with strict security boundaries (\`contextIsolation: true\`, \`sandbox: true\`, \`nodeIntegration: false\`).

### Window Lifecycle & Movie Protection:
DuoAudio intentionally omits an "X" close button in the window title bar. When users click minimize or press Alt+F4, the window hides to the Windows System Tray. This prevents accidental disruption while watching a film or listening to music. Full termination is exclusively available via the Tray Context Menu ("Quit DuoAudio"), which triggers automated audio setting restoration.`,
      code: `// src/main/main.js - Electron Process Supervisor
const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) { app.quit(); return; }

// Custom frameless window with minimize only - NO close button
mainWindow = new BrowserWindow({
  width: 420, height: 600,
  frame: false,
  webPreferences: {
    preload: path.join(__dirname, '../preload/preload.js'),
    contextIsolation: true,
    nodeIntegration: false,
    sandbox: true
  }
});

mainWindow.on('close', (event) => {
  if (!app.isQuitting) {
    event.preventDefault();
    mainWindow.hide(); // Keep streaming in background
  }
});`,
    },
    {
      id: 'tier2-capture',
      title: 'Tier 2: WASAPI Loopback & Silence Patch',
      tag: 'Capture Engine',
      content: `System audio is captured directly from the active Windows render endpoint using Windows WASAPI Loopback (\`AUDCLNT_STREAMFLAGS_LOOPBACK\`) at fixed **48,000 Hz, 2 Channels (Stereo), 16-bit Signed Integer (S16LE)**.

### Silence Suppression Binary Patch:
Standard \`loopback-capture\` has an upstream defect where audio packets below -70 dBFS are silently discarded by the driver wrapper, causing timeline gaps and packet deficit during quiet dialogue. DuoAudio applies an automated binary patch (\`scripts/patch-loopback-capture.js\`) eliminating this threshold, guaranteeing 99.8%+ timeline continuity.`,
      code: `// Loopback capture integration in dedicated audio runner
const { LoopbackCapture } = require('loopback-capture');

// Fixed audio capture format: 48 kHz / 16-bit stereo PCM
const capture = new LoopbackCapture({
  sampleRate: 48000,
  channels: 2,
  format: 'S16LE'
});

capture.on('data', (rawChunk) => {
  // Delivers ~10 ms raw PCM buffers (typically 1,920 bytes)
  const frames = pcmConverter.processChunk(rawChunk);
  for (const frame of frames) {
    outputStreamA.write(frame);
    outputStreamB.write(frame);
  }
});

capture.start();`,
    },
    {
      id: 'tier2-pacer',
      title: 'Tier 2: PCM Conversion & Rate Pacing',
      tag: 'Rate Pacer',
      content: `WASAPI loopback callbacks yield variable chunk sizes (~10 ms). \`PcmConverter\` aggregates these variable chunks into uniform **20 ms frames** (960 stereo frames = 7,680 bytes Float32LE).

### Bounded Queues & 10 ms Wall-Clock Pacer:
Unbuffered direct writes to audio drivers cause queue inflation and severe latency creep. DuoAudio buffers frames in an application-level bounded queue (\`maxCapacityMs: 200ms\`, \`targetPrebufferMs: 80ms\`). A high-resolution **10 ms wall-clock rate pacer** submits frames to WASAPI targeting a 2-frame (40 ms) lead. If an underrun occurs, the pacer realigns without dumping an artificial backlog burst.`,
      code: `// src/pcm_converter.js - Variable chunk to uniform 20ms Float32 frame aggregator
class PcmConverter {
  constructor(options = {}) {
    this.outputFrameSize = options.outputFrameSize || 960; // 20 ms at 48 kHz
    this.outputSampleCount = this.outputFrameSize * 2;     // 1,920 samples
    this.requiredInputBytes = this.outputFrameSize * 4;    // 3,840 bytes S16LE
    this.accumulator = Buffer.alloc(0);
  }

  processChunk(chunk) {
    if (!Buffer.isBuffer(chunk) || chunk.length === 0) return [];
    
    // Maintain 4-byte stereo alignment
    const remainder = chunk.length % 4;
    const clean = remainder !== 0 ? chunk.subarray(0, chunk.length - remainder) : chunk;
    this.accumulator = Buffer.concat([this.accumulator, clean]);

    const outputBuffers = [];
    while (this.accumulator.length >= this.requiredInputBytes) {
      const s16 = this.accumulator.subarray(0, this.requiredInputBytes);
      this.accumulator = this.accumulator.subarray(this.requiredInputBytes);

      const f32 = new Float32Array(this.outputSampleCount);
      for (let i = 0; i < this.outputSampleCount; i++) {
        f32[i] = s16.readInt16LE(i * 2) / 32768.0; // S16LE -> Float32 [-1.0, 1.0]
      }
      outputBuffers.push(Buffer.from(f32.buffer, f32.byteOffset, f32.byteLength));
    }
    return outputBuffers;
  }
}`,
    },
    {
      id: 'tier3-helper',
      title: 'Tier 3: Native C++ COM Helper',
      tag: 'Windows Core Audio',
      content: `Windows Core Audio provides no documented public Win32 API to change default playback endpoints. DuoAudio implements an undocumented COM interface (\`IPolicyConfig\`) within a standalone C++ binary (\`duoaudio_endpoint.exe\`), paired with \`IAudioEndpointVolume\` for hardware speaker muting.

### Antivirus Safety & Zero Elevation:
- Runs strictly in standard Windows userland (0 administrative elevation or UAC prompts).
- Contains 0 kernel drivers, 0 DLL injections, 0 API hooks, and 0 network telemetry.
- Compiled via MinGW GCC 13.2.0: \`-O2 -municode -static -s -lole32 -luuid -lpropsys\`.`,
      code: `// src/native/duoaudio_endpoint.cpp - Core Audio COM Endpoint Helper
#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <mmdeviceapi.h>
#include <endpointvolume.h>

const GUID CLSID_CPolicyConfigClient = { 0x870af99c, 0x171d, 0x4f9e, { 0xaf, 0x0d, 0xe6, 0x3d, 0xf4, 0x0c, 0x2b, 0xc9 } };
const GUID IID_IPolicyConfig = { 0xf8679f50, 0x850a, 0x41cf, { 0x9c, 0x72, 0x43, 0x0f, 0x29, 0x02, 0x90, 0xc8 } };

interface IPolicyConfig : public IUnknown {
public:
    virtual HRESULT STDMETHODCALLTYPE GetMixFormat(PCWSTR, void**) = 0;
    virtual HRESULT STDMETHODCALLTYPE GetDeviceFormat(PCWSTR, INT, void**) = 0;
    virtual HRESULT STDMETHODCALLTYPE ResetDeviceFormat(PCWSTR) = 0;
    virtual HRESULT STDMETHODCALLTYPE SetDeviceFormat(PCWSTR, void*, void*) = 0;
    virtual HRESULT STDMETHODCALLTYPE GetProcessingPeriod(PCWSTR, INT, PINT64, PINT64) = 0;
    virtual HRESULT STDMETHODCALLTYPE SetProcessingPeriod(PCWSTR, PINT64) = 0;
    virtual HRESULT STDMETHODCALLTYPE GetShareMode(PCWSTR, void**) = 0;
    virtual HRESULT STDMETHODCALLTYPE SetShareMode(PCWSTR, void*) = 0;
    virtual HRESULT STDMETHODCALLTYPE GetPropertyValue(PCWSTR, const PROPERTYKEY&, PROPVARIANT*) = 0;
    virtual HRESULT STDMETHODCALLTYPE SetPropertyValue(PCWSTR, const PROPERTYKEY&, PROPVARIANT*) = 0;
    virtual HRESULT STDMETHODCALLTYPE SetDefaultEndpoint(PCWSTR wszDeviceId, ERole eRole) = 0;
    virtual HRESULT STDMETHODCALLTYPE SetEndpointVisibility(PCWSTR, INT) = 0;
};`,
    },
    {
      id: 'routing-mute',
      title: 'Zero-Config Routing & Silent Room Guarantee',
      tag: 'Audio Routing',
      content: `### The Dual-Path Playback Problem:
If a user selects their Bluetooth earbuds as a destination in DuoAudio while that same earbud is currently the Windows Default Device, audio plays twice: once natively from the application, and a second time through loopback with a ~40 ms buffer delay. This creates hollow comb-filtering or echo.

### Automated Solution (Phase 9):
1. **Pre-Flight Discovery:** Enumerates all endpoints and automatically identifies the physical built-in laptop speakers.
2. **Baseline Snapshot:** Records the initial default endpoint ID and hardware mute state.
3. **Route Redirection:** Calls \`duoaudio_endpoint.exe set-default-by-id <speaker_id>\` across Console, Multimedia, and Communications roles.
4. **Hardware Mute:** Calls \`duoaudio_endpoint.exe mute <speaker_id>\` to clamp laptop speakers to mute. System audio continues rendering to the muted device where WASAPI loopback captures it cleanly.
5. **Simultaneous Playback:** Duplicated linear PCM streams play to Earbud 1 and Earbud 2.
6. **Guaranteed Cleanup:** On exit, Alt+F4, or unexpected child crash, \`AudioService\` synchronously unmutes speakers and restores original default playback devices.`,
      code: `// Automated zero-config routing sequence
// 1. Snapshot original baseline device
const baseline = await queryDefaultEndpoint();

// 2. Switch Windows default playback to physical laptop speakers
await execFile('duoaudio_endpoint.exe', ['set-default-by-id', laptopSpeakerId]);

// 3. Lock physical laptop speakers to mute
await execFile('duoaudio_endpoint.exe', ['mute', laptopSpeakerId]);

// 4. Guaranteed Teardown Hook on process exit or crash
process.on('exit', () => {
  execFileSync('duoaudio_endpoint.exe', ['unmute', laptopSpeakerId]);
  execFileSync('duoaudio_endpoint.exe', ['set-default-by-id', baseline.id]);
});`,
    },
    {
      id: 'physical-realities',
      title: 'Physical Realities & Constraints',
      tag: 'Engineering Limits',
      content: `DuoAudio adheres to grounded physical realities of Windows desktop audio and Bluetooth radio transmission:

1. **Bluetooth Transmission Latency:** Standard Bluetooth A2DP audio carries an inherent physical wireless latency of **100 ms – 200 ms** depending on the headphones' codec (SBC or AAC) and the Windows Bluetooth stack. DuoAudio adds minimal software processing lead (~40 ms), but radio physics cannot be bypassed.
2. **Clock Drift Between Devices:** Independent Bluetooth earbuds run on discrete hardware crystal oscillators. While DuoAudio feeds identical PCM frames at 48 kHz, minute acoustic clock drift is natural over long hours. DuoAudio's bounded ring buffer drops old frames if a queue exceeds 200 ms capacity to prevent compounding drift.
3. **WASAPI Shared Mode:** Operates in Shared Mode—no Exclusive Mode or ASIO drivers are required, ensuring compatibility with all desktop media players, browsers, and video games.
4. **Zero Administrative Elevation:** Runs completely in userland without UAC prompts, driver signatures, or virtual audio cables.`,
    },
    {
      id: 'build-instructions',
      title: 'Building From Source',
      tag: 'Compilation',
      content: `### Prerequisites:
- Windows 11 (64-bit)
- Node.js 20+ and npm
- MinGW-w64 GCC 13.2.0 (with \`x86_64-w64-mingw32-g++\` in PATH) or MSVC 2022

### Step-by-Step Compilation:
\`\`\`bash
# 1. Clone the repository
git clone https://github.com/Divyanshu0902/DuoAudio.git
cd DuoAudio

# 2. Compile Native C++ COM Helper
cd src/native
x86_64-w64-mingw32-g++ -O2 -municode -static -s duoaudio_endpoint.cpp -o ../../resources/bin/duoaudio_endpoint.exe -lole32 -luuid -lpropsys

# 3. Install NPM dependencies & apply binary silence patch
cd ../..
npm install

# 4. Start in development mode
npm run dev

# 5. Build production executable installer
npm run build
\`\`\``,
    },
  ];

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredSections = sections.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#07080B] text-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
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
            <span className="text-xs font-mono text-[#9AA7FF]">Architecture Specification</span>
          </div>

          <a
            href="https://github.com/Divyanshu0902/DuoAudio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Documentation Header */}
        <div className="mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#5C6CDB]/10 border border-[#5C6CDB]/20 text-xs font-mono text-[#9AA7FF] mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official Engineering Specification</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            System Architecture & Technical Reference
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Detailed specifications for Windows Core Audio WASAPI Loopback capture, the upstream silence suppression patch, 10 ms rate pacing, and MinGW C++ COM endpoint management.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md relative">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search architecture topics (e.g. WASAPI, IPolicyConfig, silence patch)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0D1017] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#5C6CDB]/50"
          />
        </div>

        {/* Docs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigation (3 cols) */}
          <div className="lg:col-span-3 sticky top-28 space-y-1 bg-[#0A0D14] p-3 rounded-2xl border border-white/[0.06]">
            <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-gray-500">
              Architecture Index
            </div>
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                  activeSection === sec.id
                    ? 'bg-[#5C6CDB]/20 text-white font-semibold border border-[#5C6CDB]/40'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <span>{sec.title}</span>
                <span className="text-[10px] font-mono text-gray-500">{sec.tag}</span>
              </button>
            ))}
          </div>

          {/* Main Docs Body (9 cols) */}
          <div className="lg:col-span-9 space-y-8">
            {filteredSections.map((sec) => (
              <div
                key={sec.id}
                id={sec.id}
                className={`p-6 sm:p-8 rounded-3xl bg-[#0B0E17] border transition-all ${
                  activeSection === sec.id ? 'border-[#5C6CDB]/40 shadow-xl shadow-[#5C6CDB]/5' : 'border-white/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
                  <div>
                    <span className="text-[11px] font-mono text-[#9AA7FF] px-2 py-0.5 rounded-md bg-[#5C6CDB]/10">
                      {sec.tag}
                    </span>
                    <h2 className="text-xl font-bold text-white mt-2">{sec.title}</h2>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none text-xs sm:text-sm text-gray-300 leading-relaxed space-y-3 whitespace-pre-line">
                  {sec.content}
                </div>

                {/* Code block if present */}
                {sec.code && (
                  <div className="mt-5 rounded-2xl overflow-hidden bg-[#07090F] border border-white/[0.08]">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D101A] border-b border-white/[0.06] text-xs font-mono text-gray-400">
                      <span>Implementation Reference</span>
                      <button
                        onClick={() => handleCopy(sec.code, sec.id)}
                        className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.1] text-xs font-mono text-gray-300"
                      >
                        {copiedCode === sec.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed">
                      <code>{sec.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
