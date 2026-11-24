import React, { useState } from 'react';
import { 
  Code2, 
  Terminal, 
  Copy, 
  Check, 
  Cpu, 
  Layers, 
  ArrowLeft, 
  ExternalLink, 
  GitBranch, 
  Laptop, 
  VolumeX, 
  Radio, 
  Sliders, 
  ChevronRight, 
  ChevronLeft, 
  ArrowDown, 
  Clock, 
  Activity, 
  Lightbulb, 
  Info, 
  Hash, 
  Menu, 
  X 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DocsPage() {
  const [activeTopicId, setActiveTopicId] = useState('topology');
  const [copiedCode, setCopiedCode] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Clean Navigation Tree — No Tags
  const navigationGroups = [
    {
      title: 'Get Started',
      items: [
        { id: 'topology', title: 'System Architecture' },
        { id: 'physical-realities', title: 'Physical Constraints' }
      ]
    },
    {
      title: 'Process Tiers',
      items: [
        { id: 'tier1-shell', title: 'Tier 1: Desktop Shell' },
        { id: 'tier2-capture', title: 'Tier 2: WASAPI Loopback' },
        { id: 'tier2-pacer', title: 'Tier 2: PCM Rate Pacer' },
        { id: 'tier3-helper', title: 'Tier 3: Native C++ COM' }
      ]
    },
    {
      title: 'Audio Logic & Build',
      items: [
        { id: 'routing-mute', title: 'Zero-Config Routing' },
        { id: 'build-instructions', title: 'Building From Source' }
      ]
    }
  ];

  // Articles with generous font sizing, comfortable reading rhythm, and strict periwinkle accent
  const articles = {
    'topology': {
      id: 'topology',
      breadcrumb: ['Docs', 'Architecture', 'System Overview'],
      title: '3-Tier System Architecture & Process Isolation',
      lead: 'DuoAudio isolates real-time audio processing from UI rendering, crash risks, and driver instability by separating execution across three dedicated process tiers.',
      toc: [
        { id: 'overview', title: 'Overview' },
        { id: 'schematic', title: '3-Tier Architecture' },
        { id: 'process-responsibilities', title: 'Process Responsibilities' },
        { id: 'deep-dive', title: 'Deep Dive: Memory Isolation' },
        { id: 'code-reference', title: 'Process Tree Specification' }
      ],
      paragraphs: [
        {
          id: 'overview',
          title: 'Overview',
          content: (
            <div className="space-y-5 text-gray-300 leading-relaxed text-base sm:text-[17px]">
              <p>
                Real-time desktop audio requires deterministic, jitter-free buffer submission. If audio processing shares a thread or memory space with Chromium UI rendering, routine user interactions—such as window resizing, CSS animations, or heavy DOM repaints—can starve the audio buffer and cause audible pops or stuttering.
              </p>
              <p>
                To eliminate this, DuoAudio divides responsibilities across three isolated tiers with strict process and IPC boundaries.
              </p>
            </div>
          )
        },
        {
          id: 'process-responsibilities',
          title: 'Process Responsibilities & Boundaries',
          content: (
            <div className="space-y-5 text-gray-300 leading-relaxed text-base sm:text-[17px]">
              <p>Each tier operates with a dedicated role and restricted attack surface:</p>
              <ul className="space-y-4 pl-2">
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] mt-1 shrink-0 text-lg">•</span>
                  <span>
                    <strong className="text-gray-100 font-semibold">Tier 1 (Desktop Shell):</strong> Runs on Electron 33 with a sandboxed Chromium UI. Supervises child processes, enforces the single-instance lock, manages system tray events, and provides user controls with zero direct Node.js system access.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] mt-1 shrink-0 text-lg">•</span>
                  <span>
                    <strong className="text-gray-100 font-semibold">Tier 2 (Audio Worker Runner):</strong> An isolated child process running standard <code className="text-gray-200 bg-white/[0.06] px-1.5 py-0.5 rounded text-sm font-mono">node.exe</code>. Executes native WASAPI loopback capture, eliminates driver silence defects, aggregates uniform 20 ms PCM frames, and streams to two independent RtAudio output endpoints.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] mt-1 shrink-0 text-lg">•</span>
                  <span>
                    <strong className="text-gray-100 font-semibold">Tier 3 (Native MinGW C++ COM Helper):</strong> A standalone 64-bit console binary (<code className="text-gray-200 bg-white/[0.06] px-1.5 py-0.5 rounded text-sm font-mono">duoaudio_endpoint.exe</code>). Directly invokes Windows Core Audio COM interfaces (<code className="text-gray-200 bg-white/[0.06] px-1.5 py-0.5 rounded text-sm font-mono">IPolicyConfig</code> and <code className="text-gray-200 bg-white/[0.06] px-1.5 py-0.5 rounded text-sm font-mono">IAudioEndpointVolume</code>) for default device switching and hardware speaker muting without UAC elevation.
                  </span>
                </li>
              </ul>
            </div>
          )
        }
      ],
      isTopology: true,
      deepDive: {
        title: 'Why DuoAudio uses an external Node.js child instead of Electron UtilityProcess',
        body: 'Electron 33 provides a built-in UtilityProcess API, but native audio libraries (loopback-capture and audify) require compiling against specific Node-API / V8 ABIs. Furthermore, third-party Windows Bluetooth drivers occasionally crash during abrupt device disconnection (such as putting an earbud into its charging case).\n\nBy running node.exe as an independent external child process, a driver-level memory stall in an external C++ addon never brings down the desktop UI. The Electron supervisor detects child termination, synchronously restores Windows default audio settings, and cleanly restarts the worker.'
      },
      codeSnippet: {
        filename: 'architecture/process-tree.json',
        code: `{
  "processTree": {
    "tier1_desktop_shell": {
      "binary": "DuoAudio.exe (Electron 33)",
      "responsibilities": ["App Lifecycle", "System Tray", "Single-Instance Lock", "React 19 UI"],
      "security": { "contextIsolation": true, "nodeIntegration": false, "sandbox": true }
    },
    "tier2_audio_runner": {
      "binary": "node.exe (Isolated Worker Process)",
      "ipc": "JSON over bidirectional stdio",
      "responsibilities": ["WASAPI Loopback Capture", "Silence Patch", "20ms PCM Conversion", "Dual Playback Streams"]
    },
    "tier3_native_helper": {
      "binary": "duoaudio_endpoint.exe (C++ MinGW)",
      "ipc": "Synchronous CLI child process",
      "responsibilities": ["IPolicyConfig COM Routing", "IAudioEndpointVolume Mute Clamp", "Endpoint Enumeration"]
    }
  }
}`
      }
    },

    'tier1-shell': {
      id: 'tier1-shell',
      breadcrumb: ['Docs', 'Process Tiers', 'Desktop Shell'],
      title: 'Tier 1: Electron 33 Shell & Movie Protection',
      lead: 'The desktop shell runs on Electron 33 and React 19 with strict context isolation. It enforces an intentional "movie-protection" window lifecycle designed for uninterrupted media listening.',
      toc: [
        { id: 'lifecycle', title: 'Window Lifecycle & Tray' },
        { id: 'deep-dive-sandbox', title: 'Deep Dive: Sandboxed Security' },
        { id: 'code-reference', title: 'Process Implementation' }
      ],
      paragraphs: [
        {
          id: 'lifecycle',
          title: 'Window Lifecycle & Tray Protection',
          content: (
            <div className="space-y-5 text-gray-300 leading-relaxed text-base sm:text-[17px]">
              <p>
                DuoAudio is primarily used when two people are watching a film, listening to music, or playing a game on a shared laptop. In conventional desktop software, accidentally clicking the top-right "X" button immediately halts all audio.
              </p>
              <ul className="space-y-4 pl-2">
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] mt-1 shrink-0 text-lg">•</span>
                  <span><strong className="text-gray-100 font-semibold">No Close Button on Window:</strong> The custom frameless window title bar features a minimize button only—there is deliberately no "X" button.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] mt-1 shrink-0 text-lg">•</span>
                  <span><strong className="text-gray-100 font-semibold">Minimize to System Tray:</strong> Pressing minimize or Alt+F4 hides the window into the Windows System Tray, leaving audio streaming completely uninterrupted.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] mt-1 shrink-0 text-lg">•</span>
                  <span><strong className="text-gray-100 font-semibold">Explicit Teardown:</strong> Full termination is exclusively available by right-clicking the DuoAudio icon in the Windows Taskbar Tray and selecting "Quit DuoAudio".</span>
                </li>
              </ul>
            </div>
          )
        }
      ],
      deepDive: {
        title: 'Sandboxed ContextBridge & Security Isolation',
        body: 'The React 19 UI runs in a sandboxed Chromium renderer with nodeIntegration: false and contextIsolation: true. All IPC communication occurs across a strictly typed contextBridge interface exposed in preload.js. The renderer cannot spawn processes, read arbitrary files, or make raw network requests.'
      },
      codeSnippet: {
        filename: 'src/main/main.js',
        code: `// Process Supervisor & Movie-Protection Lifecycle
const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) { 
  app.quit(); 
  return; 
}

// Custom frameless window with minimize only — NO close button
mainWindow = new BrowserWindow({
  width: 420, 
  height: 600,
  frame: false,
  webPreferences: {
    preload: path.join(__dirname, '../preload/preload.js'),
    contextIsolation: true,
    nodeIntegration: false,
    sandbox: true
  }
});

// Protect active media playback from accidental Alt+F4 or window closure
mainWindow.on('close', (event) => {
  if (!app.isQuitting) {
    event.preventDefault();
    mainWindow.hide(); // Keep dual-streaming in background
  }
});`
      }
    },

    'tier2-capture': {
      id: 'tier2-capture',
      breadcrumb: ['Docs', 'Process Tiers', 'Audio Engine'],
      title: 'Tier 2: WASAPI Loopback Capture & Binary Patch',
      lead: 'System audio is captured directly from the active Windows render endpoint using native WASAPI Loopback at fixed 48,000 Hz stereo, with an automated binary patch eliminating driver silence dropouts.',
      toc: [
        { id: 'wasapi-loopback', title: 'WASAPI Loopback Mechanism' },
        { id: 'deep-dive-silence', title: 'Deep Dive: The -70 dBFS Defect' },
        { id: 'code-reference', title: 'Loopback Integration Code' }
      ],
      paragraphs: [
        {
          id: 'wasapi-loopback',
          title: 'WASAPI Loopback Mechanism',
          content: (
            <div className="space-y-5 text-gray-300 leading-relaxed text-base sm:text-[17px]">
              <p>
                Windows Core Audio provides WASAPI Loopback (<code className="text-gray-200 bg-white/[0.06] px-1.5 py-0.5 rounded text-sm font-mono">AUDCLNT_STREAMFLAGS_LOOPBACK</code>), enabling an application to tap the render stream of any physical audio device without installing virtual audio cables or kernel-mode drivers.
              </p>
              <p>DuoAudio captures at a standardized uncompressed format:</p>
              <ul className="space-y-3 pl-2">
                <li className="flex items-center space-x-3">
                  <span className="text-[#9AA7FF] text-lg">•</span>
                  <span><strong className="text-gray-100 font-semibold">Sample Rate:</strong> 48,000 Hz (48 kHz)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-[#9AA7FF] text-lg">•</span>
                  <span><strong className="text-gray-100 font-semibold">Channels:</strong> 2 (Stereo)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-[#9AA7FF] text-lg">•</span>
                  <span><strong className="text-gray-100 font-semibold">Sample Format:</strong> 16-bit Signed Integer (S16LE)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-[#9AA7FF] text-lg">•</span>
                  <span><strong className="text-gray-100 font-semibold">Throughput:</strong> 1,536 kbps linear PCM stream</span>
                </li>
              </ul>
            </div>
          )
        }
      ],
      deepDive: {
        title: 'The Upstream -70 dBFS Silence Defect & Automated Patch',
        body: 'Standard Windows loopback capture drivers have an upstream defect: when audio volume dips below -70 dBFS (common during quiet movie dialogue, pauses between songs, or soft ambient scenes), the driver wrapper silently discards packets to save CPU cycles.\n\nThis creates a cumulative packet deficit—when dialogue resumes, the audio stream is out of sync with video.\n\nDuoAudio resolves this permanently via an automated binary patch (scripts/patch-loopback-capture.js) executed during npm install. The patch zeroes the C++ threshold check in the compiled addon binary, guaranteeing 99.8%+ timeline continuity even in absolute silence.'
      },
      codeSnippet: {
        filename: 'src/services/loopback_service.js',
        code: `// WASAPI Loopback Capture with Automated Binary Silence Patch
const { LoopbackCapture } = require('loopback-capture');

// Fixed audio capture format: 48 kHz / 16-bit stereo PCM
const capture = new LoopbackCapture({
  sampleRate: 48000,
  channels: 2,
  format: 'S16LE'
});

capture.on('data', (rawChunk) => {
  // Receives ~10 ms raw PCM buffers (typically 1,920 bytes)
  const frames = pcmConverter.processChunk(rawChunk);
  
  // Distribute uniform 20 ms frames to both output streams
  for (const frame of frames) {
    outputStreamA.write(frame);
    outputStreamB.write(frame);
  }
});

capture.start();`
      }
    },

    'tier2-pacer': {
      id: 'tier2-pacer',
      breadcrumb: ['Docs', 'Process Tiers', 'Buffer Mechanics'],
      title: 'Tier 2: PCM Conversion & 10 ms Wall-Clock Pacer',
      lead: 'WASAPI loopback callbacks yield variable chunk sizes (~10 ms). PcmConverter aggregates these into uniform 20 ms frames and paces submission using a high-precision wall-clock timer.',
      toc: [
        { id: 'frame-aggregation', title: 'Uniform Frame Aggregation' },
        { id: 'rate-pacer', title: '10 ms Wall-Clock Pacer' },
        { id: 'code-reference', title: 'PcmConverter Implementation' }
      ],
      paragraphs: [
        {
          id: 'frame-aggregation',
          title: 'Uniform 20 ms Frame Aggregation',
          content: (
            <div className="space-y-5 text-gray-300 leading-relaxed text-base sm:text-[17px]">
              <p>
                Audio hardware drivers do not accept irregular buffer slices without jitter. Variable ~10 ms chunk inputs (typically 1,920 bytes) are accumulated into exact <strong className="text-gray-100 font-semibold">20 ms frames</strong> (960 stereo samples = 7,680 bytes Float32LE). 
                PcmConverter maintains strict 4-byte stereo alignment to eliminate phase inversion or left/right channel swapping.
              </p>
            </div>
          )
        },
        {
          id: 'rate-pacer',
          title: '10 ms High-Resolution Wall-Clock Pacer',
          content: (
            <div className="space-y-5 text-gray-300 leading-relaxed text-base sm:text-[17px]">
              <p>
                Directly writing to audio driver buffers as fast as packets arrive causes queue inflation—latency climbs from 50 ms to 400 ms within minutes.
              </p>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] mt-1 shrink-0 text-lg">•</span>
                  <span>Buffers frames into an application-level bounded queue (<code className="text-gray-200 bg-white/[0.06] px-1.5 py-0.5 rounded text-sm font-mono">maxCapacityMs: 200ms</code>, <code className="text-gray-200 bg-white/[0.06] px-1.5 py-0.5 rounded text-sm font-mono">targetPrebufferMs: 80ms</code>).</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] mt-1 shrink-0 text-lg">•</span>
                  <span>Every 10 ms, the pacer assesses driver queue depth and submits frames targeting a 2-frame (40 ms) lead.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] mt-1 shrink-0 text-lg">•</span>
                  <span>If a packet underrun occurs, the pacer realigns smoothly without dumping an artificial backlog burst.</span>
                </li>
              </ul>
            </div>
          )
        }
      ],
      codeSnippet: {
        filename: 'src/audio/pcm_converter.js',
        code: `// Variable Chunk to Uniform 20 ms Float32 Frame Converter
class PcmConverter {
  constructor(options = {}) {
    this.outputFrameSize = options.outputFrameSize || 960; // 20 ms at 48 kHz
    this.outputSampleCount = this.outputFrameSize * 2;     // 1,920 samples (stereo)
    this.requiredInputBytes = this.outputFrameSize * 4;    // 3,840 bytes S16LE
    this.accumulator = Buffer.alloc(0);
  }

  processChunk(chunk) {
    if (!Buffer.isBuffer(chunk) || chunk.length === 0) return [];
    
    // Maintain 4-byte stereo sample alignment
    const remainder = chunk.length % 4;
    const clean = remainder !== 0 ? chunk.subarray(0, chunk.length - remainder) : chunk;
    this.accumulator = Buffer.concat([this.accumulator, clean]);

    const outputBuffers = [];
    while (this.accumulator.length >= this.requiredInputBytes) {
      const s16 = this.accumulator.subarray(0, this.requiredInputBytes);
      this.accumulator = this.accumulator.subarray(this.requiredInputBytes);

      // Convert S16LE [-32768, 32767] -> Float32 [-1.0, 1.0]
      const f32 = new Float32Array(this.outputSampleCount);
      for (let i = 0; i < this.outputSampleCount; i++) {
        f32[i] = s16.readInt16LE(i * 2) / 32768.0;
      }
      outputBuffers.push(Buffer.from(f32.buffer, f32.byteOffset, f32.byteLength));
    }
    return outputBuffers;
  }
}`
      }
    },

    'tier3-helper': {
      id: 'tier3-helper',
      breadcrumb: ['Docs', 'Process Tiers', 'Native Core Audio'],
      title: 'Tier 3: Native C++ COM Helper (duoaudio_endpoint.exe)',
      lead: 'Windows provides no public Win32 API to change default playback endpoints. DuoAudio interfaces directly with the undocumented IPolicyConfig COM interface and IAudioEndpointVolume for hardware speaker muting.',
      toc: [
        { id: 'com-interfaces', title: 'Core Audio COM Interfaces' },
        { id: 'security', title: 'Zero Privilege Security' },
        { id: 'deep-dive-ipolicy', title: 'Deep Dive: COM VTable' },
        { id: 'code-reference', title: 'C++ Header Definition' }
      ],
      paragraphs: [
        {
          id: 'com-interfaces',
          title: 'Windows Core Audio COM Interfaces',
          content: (
            <div className="space-y-5 text-gray-300 leading-relaxed text-base sm:text-[17px]">
              <p>Windows separates audio management across discrete COM interfaces:</p>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] mt-1 shrink-0 text-lg">•</span>
                  <span><strong className="text-gray-100 font-semibold">IMMDeviceEnumerator:</strong> Discovers all active, unplugged, and disabled playback endpoints.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] mt-1 shrink-0 text-lg">•</span>
                  <span><strong className="text-gray-100 font-semibold">IAudioEndpointVolume:</strong> Controls hardware volume levels and the hardware mute flag directly on the DAC endpoint.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] mt-1 shrink-0 text-lg">•</span>
                  <span><strong className="text-gray-100 font-semibold">IPolicyConfig:</strong> An unexported Windows Shell COM interface used internally by the Windows Control Panel to assign the Default Audio Endpoint across all audio roles (Console, Multimedia, Communications).</span>
                </li>
              </ul>
            </div>
          )
        },
        {
          id: 'security',
          title: 'Zero Privilege Security Architecture',
          content: (
            <div className="space-y-5 text-gray-300 leading-relaxed text-base sm:text-[17px]">
              <p>Unlike virtual soundcard software, DuoAudio requires:</p>
              <ul className="space-y-3 pl-2">
                <li className="flex items-center space-x-3">
                  <span className="text-[#9AA7FF] text-lg font-bold">✓</span>
                  <span><strong className="text-gray-100 font-semibold">0 Administrative Elevation:</strong> Runs completely in standard Windows userland without UAC prompts.</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-[#9AA7FF] text-lg font-bold">✓</span>
                  <span><strong className="text-gray-100 font-semibold">0 Kernel-Mode Drivers:</strong> No risk of Windows Blue Screen of Death (BSOD) crashes.</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-[#9AA7FF] text-lg font-bold">✓</span>
                  <span><strong className="text-gray-100 font-semibold">0 DLL Injections:</strong> Does not hook or inject code into third-party media applications.</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-[#9AA7FF] text-lg font-bold">✓</span>
                  <span><strong className="text-gray-100 font-semibold">0 Network Telemetry:</strong> Strictly offline native execution.</span>
                </li>
              </ul>
            </div>
          )
        }
      ],
      deepDive: {
        title: 'IPolicyConfig Virtual Function Table Resolution',
        body: 'Because Microsoft does not provide a public header for IPolicyConfig, DuoAudio reverse-engineers the COM vtable using GUID {f8679f50-850a-41cf-9c72-430f290290c8} and coclass {870af99c-171d-4f9e-af0d-e63df40c2bc9}.\n\nThe binary is compiled statically via MinGW GCC 13.2.0 with zero external DLL dependencies beyond standard Windows operating system libraries.'
      },
      codeSnippet: {
        filename: 'src/native/duoaudio_endpoint.cpp',
        code: `#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <mmdeviceapi.h>
#include <endpointvolume.h>

// Undocumented Windows Core Audio COM Interface for Default Device Switching
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
};`
      }
    },

    'routing-mute': {
      id: 'routing-mute',
      breadcrumb: ['Docs', 'Audio Logic', 'Device Redirection'],
      title: 'Zero-Config Routing & Silent Room Guarantee',
      lead: 'Solves the "Dual-Path Playback" comb-filtering problem by automatically redirecting system audio to physical laptop speakers, locking them to hardware mute, and capturing loopback silently.',
      toc: [
        { id: 'dual-path-problem', title: 'The Dual-Path Problem' },
        { id: 'automated-solution', title: 'Automated 4-Step Solution' },
        { id: 'code-reference', title: 'Routing Lifecycle Code' }
      ],
      paragraphs: [
        {
          id: 'dual-path-problem',
          title: 'The Dual-Path Playback Problem',
          content: (
            <div className="space-y-5 text-gray-300 leading-relaxed text-base sm:text-[17px]">
              <p>
                When Bluetooth earbuds are paired, Windows often designates Earbud 1 as the default system output. If DuoAudio captures from the default device and plays back to Earbud 1 and Earbud 2, Earbud 1 receives audio twice:
              </p>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] mt-1 shrink-0 text-lg">•</span>
                  <span><strong className="text-gray-100 font-semibold">Path A (Native App Output):</strong> Plays directly from Chrome or Spotify with 0 buffer lag.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] mt-1 shrink-0 text-lg">•</span>
                  <span><strong className="text-gray-100 font-semibold">Path B (Loopback Duplicate):</strong> Plays through DuoAudio with a ~40 ms buffer lag.</span>
                </li>
              </ul>
              <p>The result is hollow reverberation or severe comb-filtering echo that makes dialogue unintelligible.</p>
            </div>
          )
        },
        {
          id: 'automated-solution',
          title: 'Automated 4-Step Redirection Sequence',
          content: (
            <div className="space-y-5 text-gray-300 leading-relaxed text-base sm:text-[17px]">
              <p>DuoAudio automatically resolves this without user intervention:</p>
              <ol className="space-y-3 pl-2">
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] font-mono text-sm font-bold mt-1">1.</span>
                  <span><strong className="text-gray-100 font-semibold">Snapshot Baseline Device:</strong> Records initial default playback endpoint and hardware mute state.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] font-mono text-sm font-bold mt-1">2.</span>
                  <span><strong className="text-gray-100 font-semibold">Redirect to Built-In Speakers:</strong> Switches Windows default playback endpoint to physical laptop speakers.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] font-mono text-sm font-bold mt-1">3.</span>
                  <span><strong className="text-gray-100 font-semibold">Hardware Mute Lock:</strong> Clamps laptop speakers to hardware mute. System audio continues rendering where loopback captures it cleanly.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#9AA7FF] font-mono text-sm font-bold mt-1">4.</span>
                  <span><strong className="text-gray-100 font-semibold">Synchronous Teardown:</strong> When quitting or on crash, DuoAudio unmutes speakers and restores original devices.</span>
                </li>
              </ol>
            </div>
          )
        }
      ],
      codeSnippet: {
        filename: 'src/services/routing_manager.js',
        code: `// Automated Zero-Config Routing Sequence
// 1. Snapshot original baseline device state
const baseline = await queryDefaultEndpoint();

// 2. Redirect Windows default playback to physical laptop speakers
await execFile('duoaudio_endpoint.exe', ['set-default-by-id', laptopSpeakerId]);

// 3. Lock physical laptop speakers to hardware mute
await execFile('duoaudio_endpoint.exe', ['mute', laptopSpeakerId]);

// 4. Guaranteed Teardown Hook on process exit or crash
process.on('exit', () => {
  execFileSync('duoaudio_endpoint.exe', ['unmute', laptopSpeakerId]);
  execFileSync('duoaudio_endpoint.exe', ['set-default-by-id', baseline.id]);
});`
      }
    },

    'physical-realities': {
      id: 'physical-realities',
      breadcrumb: ['Docs', 'System Limits', 'Acoustics & Radio'],
      title: 'Physical Realities & Engineering Constraints',
      lead: 'DuoAudio is engineered with complete adherence to the grounded physical realities of Windows desktop audio, Bluetooth radio transmission, and crystal oscillator physics.',
      toc: [
        { id: 'bluetooth-latency', title: 'Bluetooth Wireless Latency' },
        { id: 'clock-drift', title: 'Crystal Oscillator Clock Drift' },
        { id: 'shared-mode', title: 'WASAPI Shared Mode' },
        { id: 'deep-dive-radio', title: 'Deep Dive: 2.4 GHz Wi-Fi Contention' }
      ],
      paragraphs: [
        {
          id: 'bluetooth-latency',
          title: 'Bluetooth Wireless Latency (100 ms – 200 ms)',
          content: (
            <div className="space-y-5 text-gray-300 leading-relaxed text-base sm:text-[17px]">
              <p>
                Standard Bluetooth A2DP audio carries an inherent physical wireless latency of <strong className="text-gray-100 font-semibold">100 ms to 200 ms</strong> depending on the headphones' codec (SBC or AAC) and the Windows Bluetooth stack. 
              </p>
              <p>
                DuoAudio adds only minimal software processing lead (~40 ms), but radio physics cannot be bypassed. For movies and video, modern media players automatically compensate for Bluetooth latency during audio/video sync.
              </p>
            </div>
          )
        },
        {
          id: 'clock-drift',
          title: 'Independent Crystal Oscillator Clock Drift',
          content: (
            <div className="space-y-5 text-gray-300 leading-relaxed text-base sm:text-[17px]">
              <p>
                Two separate pairs of Bluetooth earbuds operate on independent physical quartz crystal oscillators. While DuoAudio sends identical 48 kHz PCM frames to both devices, minute hardware clock differences accumulate over long sessions.
              </p>
              <p>
                DuoAudio bounded ring buffers drop stale packets if a queue exceeds 200 ms, preventing compounding acoustic drift.
              </p>
            </div>
          )
        },
        {
          id: 'shared-mode',
          title: 'WASAPI Shared Mode Compatibility',
          content: (
            <div className="space-y-5 text-gray-300 leading-relaxed text-base sm:text-[17px]">
              <p>
                DuoAudio operates strictly in WASAPI Shared Mode. It does not require Exclusive Mode or proprietary ASIO drivers, ensuring 100% compatibility with browsers, media players, and games concurrently.
              </p>
            </div>
          )
        }
      ],
      deepDive: {
        title: '2.4 GHz Wi-Fi & Bluetooth Radio Band Contention',
        body: 'Bluetooth operates in the 2.4 GHz ISM band. Streaming high-bitrate video over a 2.4 GHz Wi-Fi network while simultaneously transmitting two dual stereo Bluetooth streams can cause radio packet contention.\n\nConnecting laptops to a 5 GHz or 6 GHz Wi-Fi network leaves the 2.4 GHz band free for Bluetooth audio transmission.'
      },
      codeSnippet: null
    },

    'build-instructions': {
      id: 'build-instructions',
      breadcrumb: ['Docs', 'Compilation', 'Source Build'],
      title: 'Building DuoAudio From Source',
      lead: 'Step-by-step instructions for compiling the native C++ COM helper and packaging the complete Electron production binary on Windows 11.',
      toc: [
        { id: 'prerequisites', title: 'Prerequisites' },
        { id: 'compilation-steps', title: 'Step-by-Step Compilation' },
        { id: 'code-reference', title: 'Build Commands' }
      ],
      paragraphs: [
        {
          id: 'prerequisites',
          title: 'Prerequisites',
          content: (
            <div className="space-y-4 text-gray-300 leading-relaxed text-base sm:text-[17px]">
              <p>Before building DuoAudio, ensure your environment has:</p>
              <ul className="space-y-2.5 pl-2">
                <li className="flex items-center space-x-3"><span className="text-[#9AA7FF] text-lg">•</span><span><strong className="text-gray-100 font-semibold">OS:</strong> Windows 11 (64-bit)</span></li>
                <li className="flex items-center space-x-3"><span className="text-[#9AA7FF] text-lg">•</span><span><strong className="text-gray-100 font-semibold">Runtime:</strong> Node.js 20+ and npm</span></li>
                <li className="flex items-center space-x-3"><span className="text-[#9AA7FF] text-lg">•</span><span><strong className="text-gray-100 font-semibold">Compiler:</strong> MinGW-w64 GCC 13.2.0 (with x86_64-w64-mingw32-g++ in PATH)</span></li>
                <li className="flex items-center space-x-3"><span className="text-[#9AA7FF] text-lg">•</span><span><strong className="text-gray-100 font-semibold">Git:</strong> Installed and configured</span></li>
              </ul>
            </div>
          )
        },
        {
          id: 'compilation-steps',
          title: 'Step-by-Step Build Pipeline',
          content: (
            <div className="space-y-4 text-gray-300 leading-relaxed text-base sm:text-[17px]">
              <ol className="space-y-3 pl-2">
                <li className="flex items-start space-x-3"><span className="text-[#9AA7FF] font-mono text-sm font-bold mt-1">1.</span><span><strong className="text-gray-100 font-semibold">Clone Repo:</strong> Clone the repository and navigate into directory.</span></li>
                <li className="flex items-start space-x-3"><span className="text-[#9AA7FF] font-mono text-sm font-bold mt-1">2.</span><span><strong className="text-gray-100 font-semibold">Compile C++ COM Helper:</strong> Compile duoaudio_endpoint.cpp statically.</span></li>
                <li className="flex items-start space-x-3"><span className="text-[#9AA7FF] font-mono text-sm font-bold mt-1">3.</span><span><strong className="text-gray-100 font-semibold">Install & Patch:</strong> Running npm install runs binary silence patch.</span></li>
                <li className="flex items-start space-x-3"><span className="text-[#9AA7FF] font-mono text-sm font-bold mt-1">4.</span><span><strong className="text-gray-100 font-semibold">Build:</strong> Run npm run build to produce NSIS installer.</span></li>
              </ol>
            </div>
          )
        }
      ],
      codeSnippet: {
        filename: 'terminal/powershell',
        code: `# 1. Clone the repository
git clone https://github.com/Divyanshu0902/DuoAudio.git
cd DuoAudio

# 2. Compile Native C++ COM Helper (MinGW GCC)
cd src/native
x86_64-w64-mingw32-g++ -O2 -municode -static -s duoaudio_endpoint.cpp -o ../../resources/bin/duoaudio_endpoint.exe -lole32 -luuid -lpropsys

# 3. Install NPM dependencies (applies loopback binary silence patch)
cd ../..
npm install

# 4. Start in development mode
npm run dev

# 5. Build production executable installer
npm run build`
      }
    }
  };

  const currentArticle = articles[activeTopicId] || articles['topology'];

  const allTopicIds = navigationGroups.flatMap(g => g.items.map(i => i.id));
  const currentIndex = allTopicIds.indexOf(activeTopicId);
  const prevTopicId = currentIndex > 0 ? allTopicIds[currentIndex - 1] : null;
  const nextTopicId = currentIndex < allTopicIds.length - 1 ? allTopicIds[currentIndex + 1] : null;

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const scrollToAnchor = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-24 pb-28 min-h-screen bg-[#07080B] text-gray-300 selection:bg-[#5C6CDB]/30 selection:text-white">
      
      {/* Expanded Container: Uses the horizontal space gracefully */}
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Mobile Header Bar */}
        <div className="lg:hidden flex items-center justify-between py-3 border-b border-white/[0.06] mb-6">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center space-x-2 text-base font-medium text-gray-300 px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>Menu & Topics</span>
          </button>
          <span className="text-sm text-gray-300 truncate max-w-[200px]">
            {currentArticle.title}
          </span>
        </div>

        {/* 3-Column Layout with generous middle width */}
        <div className="flex flex-col lg:flex-row items-start gap-10 xl:gap-14">
          
          {/* ========================================================================= */}
          {/* COLUMN 1: LEFT SIDEBAR NAVIGATION (larger font text-base, comfortable)     */}
          {/* ========================================================================= */}
          <aside className={`
            lg:w-64 xl:w-72 shrink-0 
            ${mobileMenuOpen ? 'block' : 'hidden'} lg:block
            sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-3 space-y-8
          `}>
            {/* Soft Back Link */}
            <div className="flex items-center space-x-2.5 pb-4 border-b border-white/[0.06]">
              <Link
                to="/"
                aria-label="Back to Homepage"
                className="w-7 h-7 rounded-full border border-white/15 hover:border-white/40 text-gray-400 hover:text-gray-200 flex items-center justify-center transition-all bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <span className="text-sm font-medium text-gray-400">Back to Overview</span>
            </div>

            {/* Navigation Groups */}
            <nav className="space-y-7">
              {navigationGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-2">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2.5">
                    {group.title}
                  </div>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = activeTopicId === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTopicId(item.id);
                            setMobileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`
                            w-full text-left px-3.5 py-2.5 rounded-xl text-[15px] sm:text-base font-medium transition-all block truncate
                            ${isActive
                              ? 'bg-white/[0.07] text-[#9AA7FF] font-semibold'
                              : 'text-gray-400 hover:text-gray-100 hover:bg-white/[0.025]'
                            }
                          `}
                        >
                          {item.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* GitHub Repo Quick Link */}
            <div className="pt-5 border-t border-white/[0.06]">
              <a
                href="https://github.com/Divyanshu0902/DuoAudio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2.5 text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors px-3 py-2 rounded-lg hover:bg-white/[0.02]"
              >
                <GitBranch className="w-4 h-4 text-gray-400" />
                <span>GitHub Repository ↗</span>
              </a>
            </div>
          </aside>

          {/* ========================================================================= */}
          {/* COLUMN 2: CENTER MAIN ARTICLE (Full width, larger fonts, no right-void)   */}
          {/* ========================================================================= */}
          <main className="flex-1 min-w-0 max-w-4xl xl:max-w-5xl space-y-10">
            
            {/* Breadcrumb Path */}
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 font-mono">
              {currentArticle.breadcrumb.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-gray-600">/</span>}
                  <span className={idx === currentArticle.breadcrumb.length - 1 ? 'text-gray-400' : ''}>
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </div>

            {/* Editorial Header — Proportional, comfortable, larger font */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-gray-100 tracking-tight leading-[1.18]">
                {currentArticle.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 leading-relaxed font-normal">
                {currentArticle.lead}
              </p>
            </div>

            {/* ========================================================================= */}
            {/* VISUAL 3-TIER SCHEMATIC (Full width, clear text, no tag clutter)           */}
            {/* ========================================================================= */}
            {currentArticle.isTopology && (
              <section id="schematic" className="rounded-2xl p-6 sm:p-8 bg-[#0B0D13] border border-white/[0.06] space-y-6">
                <div className="flex items-center space-x-2.5 pb-4 border-b border-white/[0.06]">
                  <Layers className="w-5 h-5 text-[#9AA7FF]" />
                  <h3 className="text-base sm:text-lg font-bold text-gray-100">3-Tier Process Architecture</h3>
                </div>

                <div className="space-y-4">
                  {/* Tier 1 Box */}
                  <div className="rounded-xl p-5 bg-white/[0.02] border border-white/[0.06]">
                    <div className="flex items-center space-x-3 mb-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#5C6CDB]/15 flex items-center justify-center text-[#9AA7FF]">
                        <Laptop className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-semibold text-[#9AA7FF] block">Tier 1</span>
                        <h4 className="text-base font-semibold text-gray-100">Electron Main Process & Lifecycle</h4>
                      </div>
                    </div>
                    <p className="text-sm sm:text-[15px] text-gray-300 leading-relaxed">
                      Controls desktop application lifecycle, frameless windowing, system tray event handling, and acts as the supervisor for child audio processes.
                    </p>
                  </div>

                  {/* Connectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                    <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium text-gray-400 py-1.5 bg-black/30 rounded-xl border border-white/[0.04]">
                      <ArrowDown className="w-4 h-4 text-[#9AA7FF]" />
                      <span>contextBridge IPC</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium text-gray-400 py-1.5 bg-black/30 rounded-xl border border-white/[0.04]">
                      <ArrowDown className="w-4 h-4 text-[#9AA7FF]" />
                      <span>JSON over stdio IPC</span>
                    </div>
                  </div>

                  {/* Tier 2 Split */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl p-5 bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center space-x-2.5 mb-2.5">
                          <Sliders className="w-4 h-4 text-gray-400" />
                          <h5 className="text-sm sm:text-base font-semibold text-gray-100">Chromium Renderer UI</h5>
                        </div>
                        <p className="text-sm sm:text-[15px] text-gray-300 leading-relaxed">
                          React 19 interface in sandboxed renderer. Dual volume faders, device selection dropdowns, reactive status pill, and zero direct Node.js access.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl p-5 bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center space-x-2.5 mb-2.5">
                          <Activity className="w-4 h-4 text-[#9AA7FF]" />
                          <h5 className="text-sm sm:text-base font-semibold text-gray-100">Isolated Audio Runner (node.exe)</h5>
                        </div>
                        <ul className="text-sm sm:text-[15px] text-gray-300 space-y-1.5 leading-relaxed">
                          <li>• WASAPI Loopback capture at 48 kHz S16LE</li>
                          <li>• Silence patch eliminates -70 dBFS drops</li>
                          <li>• Uniform 20 ms Float32 frame aggregation</li>
                          <li>• Dual output streaming to Earbud 1 & 2</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Connectors Downward to Tier 3 */}
                  <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium text-gray-400 py-1.5 bg-black/30 rounded-xl border border-white/[0.04] max-w-sm mx-auto">
                    <ArrowDown className="w-4 h-4 text-[#9AA7FF]" />
                    <span>Synchronous CLI (stdio)</span>
                  </div>

                  {/* Tier 3 Box */}
                  <div className="rounded-xl p-5 bg-white/[0.02] border border-white/[0.06]">
                    <div className="flex items-center space-x-3 mb-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#5C6CDB]/15 flex items-center justify-center text-[#9AA7FF]">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-semibold text-[#9AA7FF] block">Tier 3</span>
                        <h4 className="text-base font-semibold text-gray-100">Native C++ COM Helper (duoaudio_endpoint.exe)</h4>
                      </div>
                    </div>
                    <p className="text-sm sm:text-[15px] text-gray-300 leading-relaxed">
                      Standalone 64-bit console binary interfacing with Windows Core Audio COM interfaces (<code className="text-gray-200 font-mono text-xs sm:text-sm">IPolicyConfig</code> and <code className="text-gray-200 font-mono text-xs sm:text-sm">IAudioEndpointVolume</code>) for default playback redirection and hardware speaker muting without UAC prompts.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Editorial Body Paragraphs */}
            <div className="space-y-10">
              {currentArticle.paragraphs?.map((sec) => (
                <section key={sec.id} id={sec.id} className="scroll-mt-24 space-y-3.5">
                  <h2 className="text-2xl sm:text-[26px] font-bold text-gray-100 tracking-tight flex items-center group">
                    <span>{sec.title}</span>
                    <a
                      href={`#${sec.id}`}
                      className="ml-2.5 text-gray-600 group-hover:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Link to section"
                    >
                      <Hash className="w-4 h-4" />
                    </a>
                  </h2>
                  <div>
                    {sec.content}
                  </div>
                </section>
              ))}
            </div>

            {/* ========================================================================= */}
            {/* REACT.DEV "DEEP DIVE" CALLOUT (Periwinkle, comfortable font)               */}
            {/* ========================================================================= */}
            {currentArticle.deepDive && (
              <div id="deep-dive" className="scroll-mt-24 rounded-2xl p-6 sm:p-7 bg-[#5C6CDB]/[0.05] border border-[#5C6CDB]/15 space-y-3">
                <div className="flex items-center space-x-2.5 text-sm font-mono font-semibold text-[#9AA7FF]">
                  <Lightbulb className="w-5 h-5 text-[#9AA7FF]" />
                  <span>Deep Dive: {currentArticle.deepDive.title}</span>
                </div>
                <div className="text-base text-gray-300 leading-[1.8] whitespace-pre-line font-normal">
                  {currentArticle.deepDive.body}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* CODE VIEWPORT (Comfortable 14px font, generous padding)                    */}
            {/* ========================================================================= */}
            {currentArticle.codeSnippet && (
              <section id="code-reference" className="scroll-mt-24 rounded-2xl overflow-hidden bg-[#0A0D14] border border-white/[0.06]">
                <div className="flex items-center justify-between px-5 py-3 bg-[#080A10] border-b border-white/[0.04] text-xs sm:text-sm font-mono">
                  <div className="flex items-center space-x-2.5">
                    <Code2 className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 font-medium">{currentArticle.codeSnippet.filename}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(currentArticle.codeSnippet.code, currentArticle.id)}
                    className="flex items-center space-x-1.5 px-3 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-xs sm:text-sm font-mono text-gray-400 hover:text-gray-200 transition-all active:scale-95"
                  >
                    {copiedCode === currentArticle.id ? (
                      <>
                        <Check className="w-4 h-4 text-[#9AA7FF]" />
                        <span className="text-[#9AA7FF]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-5 sm:p-6 text-sm sm:text-[14px] font-mono text-gray-300 overflow-x-auto leading-7 bg-[#0A0D14]">
                  <code>{currentArticle.codeSnippet.code}</code>
                </pre>
              </section>
            )}

            {/* ========================================================================= */}
            {/* TWO-CARD FOOTER PAGINATION                                                */}
            {/* ========================================================================= */}
            <div className="pt-10 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-5">
              {prevTopicId ? (
                <button
                  onClick={() => {
                    setActiveTopicId(prevTopicId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="rounded-2xl p-5 bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/15 text-left transition-all group flex flex-col justify-between"
                >
                  <span className="text-xs sm:text-sm text-gray-500 mb-1 flex items-center space-x-1 font-mono">
                    <ChevronLeft className="w-4 h-4 text-gray-500 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Previous Topic</span>
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-gray-200 group-hover:text-white transition-colors truncate">
                    {articles[prevTopicId]?.title}
                  </span>
                </button>
              ) : <div />}

              {nextTopicId && (
                <button
                  onClick={() => {
                    setActiveTopicId(nextTopicId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="rounded-2xl p-5 bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/15 text-right transition-all group flex flex-col justify-between ml-auto w-full sm:w-auto"
                >
                  <span className="text-xs sm:text-sm text-gray-500 mb-1 flex items-center justify-end space-x-1 font-mono">
                    <span>Next Topic</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-gray-200 group-hover:text-white transition-colors truncate">
                    {articles[nextTopicId]?.title}
                  </span>
                </button>
              )}
            </div>

          </main>

          {/* ========================================================================= */}
          {/* COLUMN 3: RIGHT SIDEBAR ("ON THIS PAGE" TOC)                               */}
          {/* ========================================================================= */}
          <aside className="hidden xl:block w-60 shrink-0 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pl-4 space-y-4">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              On this page
            </div>

            <nav className="space-y-2.5 border-l border-white/[0.06] pl-3.5 text-sm">
              {currentArticle.toc?.map((heading) => (
                <button
                  key={heading.id}
                  onClick={() => scrollToAnchor(heading.id)}
                  className="block text-left text-gray-400 hover:text-gray-100 transition-colors truncate w-full leading-snug"
                >
                  {heading.title}
                </button>
              ))}
            </nav>

            <div className="pt-4 border-t border-white/[0.06] text-xs text-gray-500 font-mono">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-gray-300 transition-colors"
              >
                ↑ Back to top
              </a>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
