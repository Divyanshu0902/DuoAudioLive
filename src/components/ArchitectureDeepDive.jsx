import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Layers, HardDrive, ShieldCheck, CheckCircle2, Copy, Check, Code2 } from 'lucide-react';

export default function ArchitectureDeepDive() {
  const [activeTab, setActiveTab] = useState('tier1');
  const [copiedCode, setCopiedCode] = useState(false);

  const tabs = [
    {
      id: 'tier1',
      title: 'Tier 1: Electron Supervisor',
      subtitle: 'Electron 33 + React 19 UI',
      badge: 'Shell & Lifecycle',
      file: 'src/main/main.js',
      description: 'Single-instance lock, isolated IPC contextBridge, and system tray lifecycle. The window intentionally features no close button in the header—closing minimizes to the Windows System Tray so movie audio is never accidentally disrupted.',
      code: `// Electron Main Supervisor (src/main/main.js)
const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const { AudioService } = require('./audio_service');

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) { app.quit(); return; }

// Window lifecycle: minimize only, no close button to prevent movie disruption
mainWindow = new BrowserWindow({
  width: 420,
  height: 600,
  frame: false,
  webPreferences: {
    preload: path.join(__dirname, '../preload/preload.js'),
    contextIsolation: true,
    sandbox: true,
  }
});

// Closing window or Alt+F4 hides to tray instead of quitting
mainWindow.on('close', (event) => {
  if (!app.isQuitting) {
    event.preventDefault();
    mainWindow.hide();
  }
});

// Full termination is only available through Tray Context Menu
tray = new Tray(iconPath);
const contextMenu = Menu.buildFromTemplate([
  { label: 'Open DuoAudio', click: () => mainWindow.show() },
  { label: 'Quit DuoAudio', click: () => { app.isQuitting = true; app.quit(); } }
]);
tray.setContextMenu(contextMenu);`,
      specs: [
        { label: 'Shell Architecture', val: 'Electron 33 + Node.js 20+' },
        { label: 'UI Framework', val: 'React 19 + Vite 8 (Graphite)' },
        { label: 'IPC Security Model', val: 'contextIsolation: true, sandbox' },
        { label: 'Window Lifecycle', val: 'Minimize-to-Tray (No Close X)' },
      ],
    },
    {
      id: 'tier2-capture',
      title: 'Tier 2: WASAPI Loopback',
      subtitle: 'loopback-capture (Silence-Patched)',
      badge: 'Capture Engine',
      file: 'src/audio_runner.js',
      description: 'Captures Windows system audio via WASAPI shared loopback (AUDCLNT_STREAMFLAGS_LOOPBACK) in 16-bit 48 kHz stereo linear PCM. Features an automated upstream binary patch that eliminates the -70 dBFS silence suppression defect, maintaining 99.8%+ timeline continuity.',
      code: `// Audio Child Process Runner (src/audio_runner.js)
// Runs in dedicated node.exe child process isolated from Electron UI
const { LoopbackCapture } = require('loopback-capture');
const { PcmConverter } = require('./pcm_converter');

const pcmConverter = new PcmConverter({ outputFrameSize: 960 }); // 20 ms frames

// Automated patch eliminates -70 dBFS silence suppression threshold
const capture = new LoopbackCapture({
  sampleRate: 48000,
  channels: 2,
  format: 'S16LE'
});

capture.on('data', (rawChunk) => {
  // Aggregates ~10 ms variable chunks into uniform 20 ms Float32 frames
  const frames = pcmConverter.processChunk(rawChunk);
  for (const frame of frames) {
    streamA.write(frame);
    streamB.write(frame);
  }
});

capture.start();`,
      specs: [
        { label: 'Capture Backend', val: 'WASAPI Shared Loopback' },
        { label: 'Format Specification', val: '48 kHz / 2-ch / 16-bit S16LE' },
        { label: 'Silence Patch', val: 'Upstream -70 dBFS Fix' },
        { label: 'Process Isolation', val: 'Dedicated node.exe Child' },
      ],
    },
    {
      id: 'tier2-pacer',
      title: 'Tier 2: PCM Aggregator & Pacer',
      subtitle: 'PcmConverter & OutputStream',
      badge: 'Dual Dispatch',
      file: 'src/pcm_converter.js',
      description: 'Converts S16LE chunks into uniform 20 ms Float32 stereo frames (7,680 bytes). Two independent OutputStream instances use bounded ring buffers (200 ms cap) and an independent 10 ms wall-clock rate pacer to prevent native queue inflation and drift.',
      code: `// PCM Sample Converter & Frame Aggregator (src/pcm_converter.js)
class PcmConverter {
  processChunk(chunk) {
    if (!Buffer.isBuffer(chunk) || chunk.length === 0) return [];

    // Align to 4-byte stereo frame boundary (2 channels * 2 bytes S16LE)
    const remainder = chunk.length % S16_BYTES_PER_FRAME;
    const cleanChunk = remainder !== 0 ? chunk.subarray(0, chunk.length - remainder) : chunk;

    this.accumulator = this.accumulator.length > 0 
      ? Buffer.concat([this.accumulator, cleanChunk]) 
      : cleanChunk;

    const outputBuffers = [];
    // Extract uniform 20 ms frames (960 frames = 3,840 S16 bytes -> 7,680 Float32 bytes)
    while (this.accumulator.length >= this.requiredInputBytes) {
      const s16Slice = this.accumulator.subarray(0, this.requiredInputBytes);
      this.accumulator = this.accumulator.subarray(this.requiredInputBytes);

      const float32Array = new Float32Array(this.outputSampleCount);
      for (let i = 0; i < this.outputSampleCount; i++) {
        float32Array[i] = s16Slice.readInt16LE(i * 2) / 32768.0;
      }
      outputBuffers.push(Buffer.from(float32Array.buffer, float32Array.byteOffset, float32Array.byteLength));
    }
    return outputBuffers;
  }
}`,
      specs: [
        { label: 'Frame Size', val: '20 ms (960 frames Float32LE)' },
        { label: 'Queue Capacity', val: 'Bounded 200 ms Ring Buffer' },
        { label: 'Pacing Interval', val: '10 ms High-Resolution Timer' },
        { label: 'Volume Pacing', val: 'Independent Software Gain (0-1)' },
      ],
    },
    {
      id: 'tier3-helper',
      title: 'Tier 3: Native C++ COM Helper',
      subtitle: 'duoaudio_endpoint.exe',
      badge: 'Endpoint Switcher',
      file: 'src/native/duoaudio_endpoint.cpp',
      description: 'Standalone C++ helper utilizing Windows Core Audio COM interfaces (IPolicyConfig and IAudioEndpointVolume). Implements zero-config default endpoint switching and speaker mute lock with automated crash recovery.',
      code: `// Native Windows Core Audio COM Helper (src/native/duoaudio_endpoint.cpp)
// MinGW GCC 13.2.0: -O2 -municode -static -s -lole32 -luuid -lpropsys
#include <windows.h>
#include <mmdeviceapi.h>
#include <endpointvolume.h>

const GUID CLSID_CPolicyConfigClient = { 0x870af99c, 0x171d, 0x4f9e, { 0xaf, 0x0d, 0xe6, 0x3d, 0xf4, 0x0c, 0x2b, 0xc9 } };
const GUID IID_IPolicyConfig = { 0xf8679f50, 0x850a, 0x41cf, { 0x9c, 0x72, 0x43, 0x0f, 0x29, 0x02, 0x90, 0xc8 } };

interface IPolicyConfig : public IUnknown {
public:
    virtual HRESULT STDMETHODCALLTYPE SetDefaultEndpoint(PCWSTR wszDeviceId, ERole eRole) = 0;
};

// Set default playback endpoint across Console, Multimedia, Communications
HRESULT SetDefaultEndpoint(const std::wstring& deviceId) {
    ComPtr<IPolicyConfig> policyConfig;
    HRESULT hr = CoCreateInstance(CLSID_CPolicyConfigClient, NULL, CLSCTX_ALL, IID_IPolicyConfig, (void**)&policyConfig);
    if (SUCCEEDED(hr)) {
        policyConfig->SetDefaultEndpoint(deviceId.c_str(), eConsole);
        policyConfig->SetDefaultEndpoint(deviceId.c_str(), eMultimedia);
        policyConfig->SetDefaultEndpoint(deviceId.c_str(), eCommunications);
    }
    return hr;
}`,
      specs: [
        { label: 'Binary Output', val: 'duoaudio_endpoint.exe' },
        { label: 'Compiler Target', val: 'MinGW GCC 13.2.0 (x64 Static)' },
        { label: 'Core Interfaces', val: 'IPolicyConfig, IAudioEndpointVolume' },
        { label: 'Security Model', val: 'User-Mode Only (0 Admin / 0 Drivers)' },
      ],
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTab.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="architecture" className="py-24 relative bg-[#07080B] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#5C6CDB]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-400">
            <Code2 className="w-3.5 h-3.5" />
            <span>Systems Architecture • Grounded Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            3-Tier Process Architecture
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Architected to isolate real-time Windows audio processing from UI rendering, crash risks, and driver instability.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-5xl mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all flex items-center space-x-2 border ${
                activeTab === tab.id
                  ? 'bg-[#5C6CDB]/20 border-[#5C6CDB]/50 text-white shadow-lg shadow-[#5C6CDB]/10'
                  : 'bg-white/[0.03] border-white/[0.06] text-gray-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <span>{tab.title}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/[0.08] text-gray-300 hidden sm:inline">
                {tab.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content Box */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/[0.1] shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Description & Specs (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#9AA7FF] mb-3">
                  <span>{currentTab.subtitle}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{currentTab.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{currentTab.description}</p>
              </div>

              {/* Technical Specifications List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentTab.specs.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                    >
                      <span className="text-[11px] text-gray-400 block">{s.label}</span>
                      <span className="text-xs font-mono font-semibold text-white">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#5C6CDB]/10 border border-[#5C6CDB]/20 text-xs text-[#9AA7FF] flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Production tested on Windows 11 (22H2, 23H2 & 24H2)</span>
              </div>
            </div>

            {/* Code / Implementation Window (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden bg-[#0A0D14] border border-white/[0.08] shadow-2xl">
                {/* Code Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#0E121B] border-b border-white/[0.06]">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-xs font-mono text-gray-400 ml-2">
                      {currentTab.file}
                    </span>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-mono text-gray-300 transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Body */}
                <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed bg-[#0A0D14]">
                  <code>{currentTab.code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
