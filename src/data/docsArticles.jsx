import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ExternalLink, 
  Terminal, 
  Copy, 
  Layers, 
  Cpu, 
  Radio, 
  Volume2, 
  Sliders, 
  ShieldCheck, 
  Activity, 
  Info,
  Clock
} from 'lucide-react';
import SystemArchitectureDiagram from '../components/docs/SystemArchitectureDiagram';
import AudioPipelineDiagram from '../components/docs/AudioPipelineDiagram';

export const DOCS_ARTICLES = {
  // =========================================================================
  // SECTION 01 — OVERVIEW
  // =========================================================================
  'section-01-overview': {
    id: 'section-01-overview',
    number: '01',
    title: 'Overview',
    subtitle: 'Problem Statement & High-Level Objective',
    lead: 'DuoAudio is an audio-routing application for Windows 11 designed to capture system audio and stream it to two Bluetooth audio endpoints simultaneously with zero hardware modification and zero driver installations.',
    toc: [
      { id: 'intro', title: 'Product Introduction' },
      { id: 'problem', title: 'The Windows Audio Problem' },
      { id: 'objective', title: 'Core Objective' },
      { id: 'mechanism', title: 'How DuoAudio Works' },
      { id: 'scope', title: 'Project Scope' },
      { id: 'status', title: 'Current Development Status' }
    ],
    sections: [
      {
        id: 'intro',
        title: 'Product Introduction',
        content: (
          <div className="space-y-4 text-gray-300 leading-relaxed text-[16px]">
            <p>
              <strong className="text-gray-100 font-semibold">DuoAudio</strong> is an open-source Windows 11 desktop utility engineered to distribute real-time system audio across two independent Bluetooth audio output devices simultaneously.
            </p>
            <p>
              Unlike conventional desktop media players that only duplicate a single local media file, DuoAudio operates at the operating system level: it captures audio from <strong className="text-gray-100">any active Windows application</strong>—including web browsers (YouTube, Netflix), native desktop media players (VLC, Spotify), video games, and video conferencing software—and broadcasts identical audio to two independent Bluetooth headsets or earbuds in real time.
            </p>
          </div>
        )
      },
      {
        id: 'problem',
        title: 'The Windows Audio Architecture Problem',
        content: (
          <div className="space-y-4 text-gray-300 leading-relaxed text-[16px]">
            <p>
              The Windows Core Audio subsystem natively enforces a strict <strong className="text-gray-100 font-semibold">one-to-one routing model</strong>: all applications render their audio toward a single active "Default Playback Device."
            </p>
            <p>
              When a user pairs two pairs of Bluetooth headphones to a Windows laptop, Windows allows both devices to connect, but the operating system audio mixer only permits audio routing to <em className="text-gray-200">one device at a time</em>. Switching the default audio device in Windows Sound Settings simply redirects audio from Earbud 1 to Earbud 2, muting Earbud 1.
            </p>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-sm space-y-2">
              <div className="font-semibold flex items-center gap-2 text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                The Flaws of Legacy Virtual Audio Cable Workarounds
              </div>
              <p className="text-xs text-amber-200/80 leading-relaxed">
                Prior attempts to solve this problem relied on virtual audio cable drivers (such as VB-CABLE or Virtual Audio Cable). These third-party kernel drivers require administrative privileges, cause driver signing security warnings, inject 300ms–600ms of audio latency, and introduce catastrophic dual-path echo when the physical playback endpoint also receives direct Windows application audio.
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'objective',
        title: 'Core Objective & User Value',
        content: (
          <div className="space-y-4 text-gray-300 leading-relaxed text-[16px]">
            <p>
              DuoAudio was created to deliver seamless shared listening in real-world scenarios:
            </p>
            <ul className="space-y-2.5 pl-2">
              <li className="flex items-start gap-2.5">
                <span className="text-[#9AA7FF] mt-1 shrink-0">•</span>
                <span><strong className="text-gray-100">Silent Shared Entertainment:</strong> Two people watching a movie or Netflix on a shared laptop during a flight, train ride, or library session without leaking audio into the room.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#9AA7FF] mt-1 shrink-0">•</span>
                <span><strong className="text-gray-100">Independent Volume Balancing:</strong> Listener A can keep their earbud volume at 35% while Listener B sets theirs at 85%, with neither adjustment affecting the other.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#9AA7FF] mt-1 shrink-0">•</span>
                <span><strong className="text-gray-100">Zero Administrative Elevation:</strong> Runs entirely in standard Windows user space. No kernel drivers, no administrative UAC prompts, and no complex sound mixer configuration required.</span>
              </li>
            </ul>
          </div>
        )
      },
      {
        id: 'mechanism',
        title: 'How DuoAudio Works at a High Level',
        content: (
          <div className="space-y-4 text-gray-300 leading-relaxed text-[16px]">
            <p>
              DuoAudio bypasses Windows single-endpoint limitations through a coordinated 4-step sequence:
            </p>
            <ol className="space-y-3 pl-2 font-mono text-sm">
              <li className="p-3 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <strong className="text-[#9AA7FF] font-semibold block mb-1">1. Zero-Config Default Endpoint Redirection</strong>
                <span className="text-gray-300 text-xs">
                  DuoAudio programmatically switches the Windows default output device to the laptop's physical built-in speakers and mutes them. The room remains silent, but Windows applications render their master mix toward this muted endpoint.
                </span>
              </li>
              <li className="p-3 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <strong className="text-[#2DD4BF] font-semibold block mb-1">2. PID-Excluded WASAPI Loopback Capture</strong>
                <span className="text-gray-300 text-xs">
                  DuoAudio captures the master digital audio mix directly from the muted speaker endpoint using Windows WASAPI Loopback. By passing its own process PID, DuoAudio mathematically prevents self-capture echo.
                </span>
              </li>
              <li className="p-3 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <strong className="text-[#9AA7FF] font-semibold block mb-1">3. Frame Aggregation & Zero-Copy Fan-Out</strong>
                <span className="text-gray-300 text-xs">
                  Raw 16-bit PCM chunks are aggregated into uniform 20ms Float32 frames (7,680 bytes) and referentially shared across two independent output queues without memory cloning.
                </span>
              </li>
              <li className="p-3 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <strong className="text-[#A855F7] font-semibold block mb-1">4. Dual Parallel Rate-Paced Playback</strong>
                <span className="text-gray-300 text-xs">
                  Two independent 10ms rate-pacing loops submit frames to WASAPI Shared Mode via RtAudio, applying independent software gain and streaming concurrently to Earbud 1 and Earbud 2.
                </span>
              </li>
            </ol>
          </div>
        )
      },
      {
        id: 'scope',
        title: 'Project Scope & System Boundaries',
        content: (
          <div className="space-y-3 text-gray-300 leading-relaxed text-[16px]">
            <p>
              DuoAudio is engineered specifically for:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <span className="text-[#9AA7FF] font-semibold block mb-1">Supported Host Platform</span>
                <span>Windows 11 (64-bit), Windows 10 21H2+</span>
              </div>
              <div className="p-3 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <span className="text-[#9AA7FF] font-semibold block mb-1">Audio Transducers</span>
                <span>Standard Bluetooth A2DP Headphones, Earbuds, or USB DACs</span>
              </div>
              <div className="p-3 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <span className="text-[#9AA7FF] font-semibold block mb-1">Sampling Architecture</span>
                <span>48,000 Hz, 2 Channels (Stereo), 32-bit Float Internal</span>
              </div>
              <div className="p-3 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <span className="text-[#9AA7FF] font-semibold block mb-1">Privilege Level</span>
                <span>Standard Userland (Zero Admin / No UAC Prompts)</span>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'status',
        title: 'Current Development Status',
        content: (
          <div className="space-y-4 text-gray-300 leading-relaxed text-[16px]">
            <p>
              DuoAudio has successfully completed <strong className="text-gray-100 font-semibold">Phase 1 through Phase 9</strong> of its engineering roadmap. The production architecture is complete, verified, and packaged into a standalone installer (`DuoAudio Setup 1.0.0.exe`).
            </p>
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-200 text-xs font-mono flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-emerald-300 font-semibold">Phase 9 Milestone Achieved:</strong> Multi-process isolation, mute baseline IPC handshake, zero-config default routing, silence-patched WASAPI loopback, and mutual stream failure recovery verified on Windows 11.
              </span>
            </div>
          </div>
        )
      }
    ]
  },

  // =========================================================================
  // SECTION 02 — SYSTEM ARCHITECTURE
  // =========================================================================
  'section-02-architecture': {
    id: 'section-02-architecture',
    number: '02',
    title: 'System Architecture',
    subtitle: 'Process Boundaries & Containment',
    lead: (
      <>
        DuoAudio uses a <span className="text-white font-medium">multi-process architecture</span> engineered to isolate real-time audio processing from UI rendering, crash risks, and third-party driver instability.
      </>
    ),
    toc: [
      { id: 'arch-diagram', title: 'Architecture Diagram' },
      { id: 'arch-overview', title: 'Subsystem Overview' },
      { id: 'arch-components', title: 'Component Inventory & Contracts' },
      { id: 'arch-principles', title: 'Architectural Design Principles' }
    ],
    sections: [
      {
        id: 'arch-diagram',
        title: null,
        content: <SystemArchitectureDiagram />
      },
      {
        id: 'arch-overview',
        title: 'Subsystem Overview & Process Tiers',
        content: (
          <div className="space-y-4 text-gray-300 leading-relaxed text-[16px]">
            <p>
              Real-time desktop audio requires deterministic, jitter-free buffer submission. If audio processing shares a thread or memory space with Chromium UI rendering, routine user interactions—such as window resizing, CSS animations, or heavy DOM repaints—can starve the audio buffer and cause audible pops or stuttering.
            </p>
            <p>
              Furthermore, third-party Bluetooth audio drivers on Windows can crash or hang if an earbud abruptly disconnects or runs out of battery. To prevent a driver glitch from terminating the entire desktop client, DuoAudio isolates responsibilities across <strong className="text-gray-100">three distinct process tiers</strong>:
            </p>
            <ul className="space-y-3 pl-2">
              <li className="flex items-start gap-2.5">
                <span className="text-[#9AA7FF] mt-1 shrink-0 font-bold">•</span>
                <span><strong className="text-gray-100 font-semibold">Tier 1 — Desktop Shell & Supervisor (Electron Main Process):</strong> Runs <code className="text-gray-200 bg-white/[0.06] px-1.5 py-0.5 rounded text-sm font-mono">DuoAudio.exe</code>. Manages application lifecycle, enforces the single-instance lock, manages the Windows System Tray, and supervises the audio runner child process.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#2DD4BF] mt-1 shrink-0 font-bold">•</span>
                <span><strong className="text-gray-100 font-semibold">Tier 2 — Dedicated Audio Runner (System Node.js Child Process):</strong> Runs <code className="text-gray-200 bg-white/[0.06] px-1.5 py-0.5 rounded text-sm font-mono">node.exe</code> executing <code className="text-gray-200 bg-white/[0.06] px-1.5 py-0.5 rounded text-sm font-mono">src/audio_runner.js</code>. Ingests WASAPI loopback capture with PID exclusion, converts PCM formats, maintains bounded ring buffers, and executes 10ms rate-pacing loops.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#0078D4] mt-1 shrink-0 font-bold">•</span>
                <span><strong className="text-gray-100 font-semibold">Tier 3 — Native Windows COM Helper:</strong> Runs <code className="text-gray-200 bg-white/[0.06] px-1.5 py-0.5 rounded text-sm font-mono">duoaudio_endpoint.exe</code> (compiled from C++ with MinGW GCC 13.2.0). Interacts directly with Windows Core Audio COM interfaces for default route switching and hardware mute clamping.</span>
              </li>
            </ul>
          </div>
        )
      },
      {
        id: 'arch-components',
        title: 'Component Inventory & Code Contracts',
        content: (
          <div className="space-y-4 text-gray-300 leading-relaxed text-[16px]">
            <p>
              The table below documents the major components in the codebase, their implementation files, and their exact architectural responsibilities:
            </p>
            <div className="w-full overflow-x-auto border border-[#282C3A] rounded-xl bg-[#151722]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#282C3A] bg-white/[0.03] text-gray-400">
                    <th className="p-3">Component</th>
                    <th className="p-3">File Reference</th>
                    <th className="p-3">Process Tier</th>
                    <th className="p-3">Primary Responsibility</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262933] text-gray-300">
                  <tr>
                    <td className="p-3 font-semibold text-gray-100">AudioService</td>
                    <td className="p-3 text-[#9AA7FF]">src/main/audio-service.js</td>
                    <td className="p-3">Tier 1 (Main)</td>
                    <td className="p-3 font-sans text-xs">Supervisor state machine; spawns node.exe child; coordinates MUTE_BASELINE handshake; arms synchronous emergency unmute.</td>
                    <td className="p-3 text-emerald-400">Verified</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-100">AudioRunner</td>
                    <td className="p-3 text-[#9AA7FF]">src/audio_runner.js</td>
                    <td className="p-3">Tier 2 (Worker)</td>
                    <td className="p-3 font-sans text-xs">Orchestrates loopback capture with PID exclusion, converts PCM frames, dispatches to streams, and reports 250ms telemetry.</td>
                    <td className="p-3 text-emerald-400">Verified</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-100">PcmConverter</td>
                    <td className="p-3 text-[#9AA7FF]">src/pcm_converter.js</td>
                    <td className="p-3">Tier 2 (Worker)</td>
                    <td className="p-3 font-sans text-xs">Converts 16-bit signed PCM (S16LE) to 32-bit Float32; aggregates variable ~10ms callbacks into strict 20ms frames.</td>
                    <td className="p-3 text-emerald-400">Verified</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-100">OutputStream</td>
                    <td className="p-3 text-[#9AA7FF]">src/output_stream.js</td>
                    <td className="p-3">Tier 2 (Worker)</td>
                    <td className="p-3 font-sans text-xs">Manages independent WASAPI shared-mode playback via audify; runs 10ms wall-clock rate pacer; applies software volume gain.</td>
                    <td className="p-3 text-emerald-400">Verified</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-100">AudioBuffer</td>
                    <td className="p-3 text-[#9AA7FF]">src/audio_buffer.js</td>
                    <td className="p-3">Tier 2 (Worker)</td>
                    <td className="p-3 font-sans text-xs">Bounded FIFO ring buffer (200ms capacity, 80ms target prebuffer). Drops oldest frames when congested to eliminate drift.</td>
                    <td className="p-3 text-emerald-400">Verified</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-100">EndpointMuteManager</td>
                    <td className="p-3 text-[#9AA7FF]">src/endpoint_mute.js</td>
                    <td className="p-3">Tier 2 / Tier 1</td>
                    <td className="p-3 font-sans text-xs">Manages default endpoint discovery, mute baseline tracking, and executes duoaudio_endpoint.exe via execFile/execFileSync.</td>
                    <td className="p-3 text-emerald-400">Verified</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-100">duoaudio_endpoint.exe</td>
                    <td className="p-3 text-[#9AA7FF]">src/native/duoaudio_endpoint.cpp</td>
                    <td className="p-3">Tier 3 (Native CLI)</td>
                    <td className="p-3 font-sans text-xs">Standalone C++ COM helper. Invokes IPolicyConfig::SetDefaultEndpoint and IAudioEndpointVolume::SetMute. Output: valid single-line JSON.</td>
                    <td className="p-3 text-emerald-400">Verified</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      },
      {
        id: 'arch-principles',
        title: 'Architectural Design Principles',
        content: (
          <div className="space-y-4 text-gray-300 leading-relaxed text-[16px]">
            <p>
              DuoAudio's architecture is guided by five core systems-engineering principles:
            </p>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#181A25] border border-[#282C3A]">
                <h4 className="text-sm font-semibold text-gray-100 mb-1 flex items-center gap-2">
                  <span className="text-[#9AA7FF]">1. Native Failure Isolation:</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Third-party audio drivers and Bluetooth stacks are prone to unpredictable crashes during sudden hardware disconnection. Isolating native C++ libraries (<code className="text-gray-200">loopback-capture</code>, <code className="text-gray-200">audify</code>) inside an external child process guarantees that driver panics never crash the desktop window or leave system audio in an unrecoverable state.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#181A25] border border-[#282C3A]">
                <h4 className="text-sm font-semibold text-gray-100 mb-1 flex items-center gap-2">
                  <span className="text-[#2DD4BF]">2. Strict Bounded Queuing:</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Unbounded audio queues cause catastrophic buffer bloat: latency continuously grows from tens of milliseconds into multiple seconds. DuoAudio strictly bounds every internal queue to 200ms maximum, shedding stale frames when hardware congestion occurs to enforce real-time playback.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#181A25] border border-[#282C3A]">
                <h4 className="text-sm font-semibold text-gray-100 mb-1 flex items-center gap-2">
                  <span className="text-[#9AA7FF]">3. Failsafe Mute Baseline Handshake:</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  To prevent the user's laptop speakers from ever being left permanently muted after a crash, the child runner records the baseline state and transmits a <code className="text-gray-200">MUTE_BASELINE</code> IPC message to the Electron supervisor before muting hardware. If the child process is terminated abnormally, the main process immediately catches the exit signal and executes a synchronous native unmute (<code className="text-gray-200">restoreAllSync()</code>).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#181A25] border border-[#282C3A]">
                <h4 className="text-sm font-semibold text-gray-100 mb-1 flex items-center gap-2">
                  <span className="text-purple-400">4. Mutual Stream Failure Isolation:</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  The two output streams operate with complete mutual independence. If Earbud 1 disconnects, runs out of battery, or encounters a driver error, the runner transitions to <code className="text-gray-200">PARTIALLY_DEGRADED</code> state. Earbud 2 continues streaming uninterrupted; the session is only halted if both destination streams fail.
                </p>
              </div>
            </div>
          </div>
        )
      }
    ]
  },

  // =========================================================================
  // SECTION 03 — AUDIO PIPELINE
  // =========================================================================
  'section-03-pipeline': {
    id: 'section-03-pipeline',
    number: '03',
    title: 'Audio Pipeline',
    subtitle: 'Real-Time Capture, Normalization & Pacing',
    lead: 'Trace the end-to-end movement of audio data from Windows applications through WASAPI loopback capture, PCM format conversion, and independent rate-paced streaming to dual Bluetooth earbuds.',
    toc: [
      { id: 'pipe-diagram', title: 'Audio Pipeline Diagram' },
      { id: 'pipe-stages', title: 'Stage-by-Stage Breakdown' },
      { id: 'pipe-concepts', title: 'Audio Engineering Concepts' }
    ],
    sections: [
      {
        id: 'pipe-diagram',
        title: 'Audio Pipeline Dataflow Diagram',
        content: (
          <div className="space-y-3">
            <p className="text-gray-300 text-[16px]">
              The following diagram traces the exact dataflow, sample representations, and buffer sizes through all nine stages of the DuoAudio streaming pipeline:
            </p>
            {/* Embedded Interactive Audio Pipeline Diagram */}
            <AudioPipelineDiagram />
          </div>
        )
      },
      {
        id: 'pipe-stages',
        title: 'Stage-by-Stage Pipeline Breakdown',
        content: (
          <div className="space-y-4 text-gray-300 leading-relaxed text-[16px]">
            <p>
              Below is the detailed technical breakdown of each stage in the audio pipeline:
            </p>

            <div className="space-y-3 font-sans text-sm">
              <div className="p-4 rounded-xl bg-[#181A25] border border-[#282C3A]">
                <h4 className="font-semibold text-gray-100 mb-1 flex items-center justify-between">
                  <span className="text-[#9AA7FF]">Stage 1 & 2: Application Render & Zero-Config Redirection</span>
                  <span className="text-[10px] font-mono text-gray-500">IPolicyConfig COM</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Windows audio applications render toward the active default audio device. DuoAudio invokes <code className="text-gray-200">duoaudio_endpoint.exe set-default-by-id &lt;speaker_id&gt;</code> to redirect all three Windows roles (<code className="text-gray-200">eConsole</code>, <code className="text-gray-200">eMultimedia</code>, <code className="text-gray-200">eCommunications</code>) to the physical built-in speakers, and mutes them via <code className="text-gray-200">IAudioEndpointVolume</code>. The room remains completely silent while the master audio mix renders to the device.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#181A25] border border-[#282C3A]">
                <h4 className="font-semibold text-gray-100 mb-1 flex items-center justify-between">
                  <span className="text-[#2DD4BF]">Stage 3: WASAPI Loopback Capture with PID Exclusion</span>
                  <span className="text-[10px] font-mono text-gray-500">48 kHz Stereo S16LE</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Captures system audio from the active default endpoint using <code className="text-gray-200">AUDCLNT_STREAMFLAGS_LOOPBACK</code>. Passing <code className="text-gray-200">process.pid</code> to <code className="text-gray-200">loopback.startSystemAudio()</code> instructs the Windows audio engine to exclude audio rendered by DuoAudio itself, preventing infinite self-capture feedback squeal. An automated binary patch removes the upstream -70 dBFS silence threshold, ensuring 99.8%+ timeline continuity during dialogue pauses.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#181A25] border border-[#282C3A]">
                <h4 className="font-semibold text-gray-100 mb-1 flex items-center justify-between">
                  <span className="text-[#2DD4BF]">Stage 4: PCM Conversion & 20ms Frame Aggregation</span>
                  <span className="text-[10px] font-mono text-gray-500">Float32LE (7,680 bytes)</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Windows WASAPI loopback delivers variable-sized chunks (~10ms). The <code className="text-gray-200">PcmConverter</code> engine verifies 4-byte stereo frame alignment, normalizes 16-bit signed integers to 32-bit floating-point samples (<code className="text-gray-200">sample / 32768.0</code>), and aggregates chunks into uniform 20ms output buffers (<strong className="text-gray-100">960 frames = 1,920 samples = 7,680 bytes Float32LE</strong>).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#181A25] border border-[#282C3A]">
                <h4 className="font-semibold text-gray-100 mb-1 flex items-center justify-between">
                  <span className="text-[#9AA7FF]">Stage 5: Zero-Copy Referential Fan-Out</span>
                  <span className="text-[10px] font-mono text-gray-500">Shared Buffer Reference</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  The <code className="text-gray-200">onCaptureChunk</code> callback pushes the exact same converted <code className="text-gray-200">Buffer</code> reference to both <code className="text-gray-200">stream1.enqueue(frame)</code> and <code className="text-gray-200">stream2.enqueue(frame)</code>. Because the output streams only read the buffer to write to hardware without mutating it, Node.js memory allocations and GC sweeps are cut in half.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#181A25] border border-[#282C3A]">
                <h4 className="font-semibold text-gray-100 mb-1 flex items-center justify-between">
                  <span className="text-purple-400">Stage 6, 7 & 8: Bounded Buffering, Rate Pacing & Playback</span>
                  <span className="text-[10px] font-mono text-gray-500">10ms Pacer • 40ms Lead</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Each stream accumulates frames in an <code className="text-gray-200">AudioBuffer</code> until reaching an 80ms target prebuffer, then transitions to playback. A 10ms wall-clock rate pacer loop feeds <code className="text-gray-200">audify.write()</code> targeting an estimated 40ms native driver lead. Independent software gain (<code className="text-gray-200">rtAudio.outputVolume = volume</code>) is applied from 0.0 to 1.0, delivering concurrent playback to both Bluetooth earbuds.
                </p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'pipe-concepts',
        title: 'Core Audio Engineering Concepts',
        content: (
          <div className="space-y-4 text-gray-300 leading-relaxed text-[16px]">
            <p>
              Understanding DuoAudio requires familiarity with core digital signal processing concepts:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <strong className="text-[#9AA7FF] block mb-1">Pulse Code Modulation (PCM)</strong>
                <span className="text-gray-400 font-sans text-xs">
                  The standard method for digitally representing uncompressed analog audio signals through discrete time sampling and amplitude quantization.
                </span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <strong className="text-[#2DD4BF] block mb-1">Sample Rate (48,000 Hz)</strong>
                <span className="text-gray-400 font-sans text-xs">
                  DuoAudio operates at 48 kHz (48,000 samples per second per channel), the universal broadcast and Windows Core Audio mixing standard.
                </span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <strong className="text-[#9AA7FF] block mb-1">S16LE vs. Float32LE</strong>
                <span className="text-gray-400 font-sans text-xs">
                  S16LE represents amplitudes as 16-bit signed integers (-32768 to 32767). Float32 represents samples as 32-bit floats (-1.0 to 1.0), preventing clipping during DSP mixing.
                </span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <strong className="text-purple-400 block mb-1">Hardware Clock Drift</strong>
                <span className="text-gray-400 font-sans text-xs">
                  Independent Bluetooth earbuds run on separate physical crystal oscillators. Over multi-hour sessions, minute frequency variations cause them to diverge; DuoAudio's 200ms bounded buffer absorbs this drift seamlessly.
                </span>
              </div>
            </div>
          </div>
        )
      }
    ]
  },

  // =========================================================================
  // SECTION 04 — TECHNOLOGY STACK
  // =========================================================================
  'section-04-techstack': {
    id: 'section-04-techstack',
    number: '04',
    title: 'Technology Stack',
    subtitle: 'Runtimes, Native Libraries & Dependencies',
    lead: 'A transparent inventory of the runtimes, native C++ audio libraries, and framework dependencies that power DuoAudio.',
    toc: [
      { id: 'stack-runtime', title: 'Runtimes & Languages' },
      { id: 'stack-capture', title: 'Audio Capture Technologies' },
      { id: 'stack-playback', title: 'Audio Playback Backend' },
      { id: 'stack-native', title: 'Native C++ COM Helper' },
      { id: 'stack-table', title: 'Complete Dependency Table' }
    ],
    sections: [
      {
        id: 'stack-runtime',
        title: 'Primary Runtimes & Languages',
        content: (
          <div className="space-y-3 text-gray-300 leading-relaxed text-[16px]">
            <p>
              DuoAudio is implemented in a hybrid architecture combining high-level application orchestration in JavaScript with low-level systems integration in C++:
            </p>
            <ul className="space-y-2 pl-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#9AA7FF] mt-1">•</span>
                <span><strong className="text-gray-100">Node.js 20+ Runtime:</strong> Powers the dedicated external audio runner child process (`node.exe`), hosting native Node-API addons.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#9AA7FF] mt-1">•</span>
                <span><strong className="text-gray-100">Electron 33 (Chromium 130):</strong> Provides the secure desktop application container, system tray integration, and window lifecycle.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#9AA7FF] mt-1">•</span>
                <span><strong className="text-gray-100">C++17 (MinGW-w64 GCC 13.2.0):</strong> Compiles the standalone native endpoint COM controller binary (<code className="text-gray-200">duoaudio_endpoint.exe</code>).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#9AA7FF] mt-1">•</span>
                <span><strong className="text-gray-100">React 19 & Vite 8:</strong> Powers the sandboxed desktop user interface with fast reactive state and frameless title bar controls.</span>
              </li>
            </ul>
          </div>
        )
      },
      {
        id: 'stack-table',
        title: 'Verified Dependency & Library Matrix',
        content: (
          <div className="space-y-3">
            <p className="text-gray-300 text-sm">
              Every library, version, and official documentation reference in the DuoAudio repository:
            </p>
            <div className="w-full overflow-x-auto border border-[#282C3A] rounded-xl bg-[#151722]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#282C3A] bg-white/[0.03] text-gray-400">
                    <th className="p-3">Technology / Package</th>
                    <th className="p-3">Verified Version</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Purpose in DuoAudio</th>
                    <th className="p-3">Documentation Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262933] text-gray-300">
                  <tr>
                    <td className="p-3 font-semibold text-gray-100">audify</td>
                    <td className="p-3 text-[#2DD4BF]">v1.10.1</td>
                    <td className="p-3">Audio Playback</td>
                    <td className="p-3 font-sans text-xs">High-performance Node.js wrapper around RtAudio. Manages WASAPI shared-mode streams and software gain.</td>
                    <td className="p-3">
                      <a href="https://github.com/almoghamdani/audify" target="_blank" rel="noopener noreferrer" className="text-[#9AA7FF] hover:underline flex items-center gap-1">
                        GitHub <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-100">RtAudio</td>
                    <td className="p-3 text-[#2DD4BF]">v6.0.1 (embedded)</td>
                    <td className="p-3">Audio Backend</td>
                    <td className="p-3 font-sans text-xs">Cross-platform C++ real-time audio input/output library (by Gary P. Scavone). Powers audify's WASAPI backend.</td>
                    <td className="p-3">
                      <a href="https://www.music.mcgill.ca/~gary/rtaudio/" target="_blank" rel="noopener noreferrer" className="text-[#9AA7FF] hover:underline flex items-center gap-1">
                        Official Site <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-100">loopback-capture</td>
                    <td className="p-3 text-[#2DD4BF]">v1.0.1 (silence-patched)</td>
                    <td className="p-3">Audio Capture</td>
                    <td className="p-3 font-sans text-xs">Captures Windows master audio mix via WASAPI Loopback with process PID exclusion. Patched to remove -70 dBFS gate.</td>
                    <td className="p-3">
                      <a href="https://github.com/stephen/nodert-loopback-capture" target="_blank" rel="noopener noreferrer" className="text-[#9AA7FF] hover:underline flex items-center gap-1">
                        GitHub <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-100">Electron</td>
                    <td className="p-3 text-[#9AA7FF]">v33.0.0</td>
                    <td className="p-3">Desktop Framework</td>
                    <td className="p-3 font-sans text-xs">Desktop container, single-instance mutex, frameless window shell, and supervisor lifecycle.</td>
                    <td className="p-3">
                      <a href="https://www.electronjs.org/docs/latest/" target="_blank" rel="noopener noreferrer" className="text-[#9AA7FF] hover:underline flex items-center gap-1">
                        Docs <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-100">React</td>
                    <td className="p-3 text-[#9AA7FF]">v19.0.0</td>
                    <td className="p-3">UI Framework</td>
                    <td className="p-3 font-sans text-xs">Sandboxed user interface rendering device cards, volume sliders, and status indicators.</td>
                    <td className="p-3">
                      <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="text-[#9AA7FF] hover:underline flex items-center gap-1">
                        React.dev <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-gray-100">MinGW-w64 GCC</td>
                    <td className="p-3 text-[#0078D4]">v13.2.0</td>
                    <td className="p-3">Build Compiler</td>
                    <td className="p-3 font-sans text-xs">Compiles duoaudio_endpoint.cpp into standalone 64-bit Windows console executable linking against ole32 and uuid.</td>
                    <td className="p-3">
                      <a href="https://www.mingw-w64.org/" target="_blank" rel="noopener noreferrer" className="text-[#9AA7FF] hover:underline flex items-center gap-1">
                        MinGW <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      }
    ]
  },

  // =========================================================================
  // SECTION 05 — ENGINEERING CHALLENGES
  // =========================================================================
  'section-05-challenges': {
    id: 'section-05-challenges',
    number: '05',
    title: 'Engineering Challenges',
    subtitle: 'Memory Bloat, Clock Drift & Isolation',
    lead: 'Documenting the complex systems-level engineering challenges encountered during the development of DuoAudio, their technical explanations, potential impacts, and implemented mitigations.',
    toc: [
      { id: 'chal-tsfn', title: '1. Unbounded TSFN Queue' },
      { id: 'chal-playback-queue', title: '2. Unbounded Playback Queue' },
      { id: 'chal-buffer-mgmt', title: '3. Buffer Management & Latency' },
      { id: 'chal-clock-drift', title: '4. Independent Device Clock Drift' },
      { id: 'chal-periodicity', title: '5. Bluetooth Driver Periodicity' },
      { id: 'chal-attribution', title: '6. Process Exclusion Attribution' }
    ],
    sections: [
      {
        id: 'chal-tsfn',
        title: '1. Unbounded TSFN (Thread-Safe Function) Queue',
        content: (
          <div className="space-y-3 text-gray-300 leading-relaxed text-[16px]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                Status: Implemented & Verified
              </span>
            </div>
            <p>
              <strong className="text-gray-100 font-semibold">Problem:</strong> Native C++ audio callbacks run on high-priority OS audio threads (multimedia class scheduler). When native threads invoke Node.js callbacks via <code className="text-gray-200">Napi::ThreadSafeFunction</code> (TSFN), if the V8 JavaScript event loop is momentarily blocked (by garbage collection or synchronous tasks), native callbacks queue up without bound in heap memory.
            </p>
            <p>
              <strong className="text-gray-100 font-semibold">Potential Impact:</strong> Unbounded memory growth, eventual heap exhaustion (OOM crash), and massive audio latency spikes.
            </p>
            <p>
              <strong className="text-gray-100 font-semibold">Implemented Mitigation:</strong> DuoAudio isolates the audio engine inside a dedicated external <code className="text-gray-200">node.exe</code> process with zero UI rendering overhead, minimizing event loop delays. Capture callbacks write directly to an internal memory buffer with pre-allocated size, completely decoupling capture from UI threads.
            </p>
          </div>
        )
      },
      {
        id: 'chal-playback-queue',
        title: '2. Unbounded Native Playback Queue Inflation',
        content: (
          <div className="space-y-3 text-gray-300 leading-relaxed text-[16px]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                Status: Implemented & Verified
              </span>
            </div>
            <p>
              <strong className="text-gray-100 font-semibold">Problem:</strong> Calling <code className="text-gray-200">audify.write()</code> synchronously immediately upon receiving capture callbacks floods the native C++ audio driver buffer. Because capture chunk deliveries vary (~10ms with jitter), unpaced writes cause the native WASAPI playback queue to inflate, increasing audio latency from ~40ms to 800ms+ over time.
            </p>
            <p>
              <strong className="text-gray-100 font-semibold">Potential Impact:</strong> Video and audio desynchronization (lip-sync lag) during video playback and gaming.
            </p>
            <p>
              <strong className="text-gray-100 font-semibold">Implemented Mitigation:</strong> An independent <strong className="text-gray-100">10ms high-resolution wall-clock rate pacer loop</strong> in <code className="text-gray-200">OutputStream</code>. It tracks wall-clock elapsed time and submits frames only to maintain an estimated 2-frame (40ms) native driver lead, strictly preventing queue inflation.
            </p>
          </div>
        )
      },
      {
        id: 'chal-buffer-mgmt',
        title: '3. Buffer Management & Drift Mitigation',
        content: (
          <div className="space-y-3 text-gray-300 leading-relaxed text-[16px]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                Status: Implemented & Verified
              </span>
            </div>
            <p>
              <strong className="text-gray-100 font-semibold">Problem:</strong> Temporary Bluetooth interference can cause an earbud driver to slow down consumption while RF packets are retransmitted. Unbuffered audio would stutter, while unconstrained buffering would accumulate permanent latency.
            </p>
            <p>
              <strong className="text-gray-100 font-semibold">Implemented Mitigation:</strong> The <code className="text-gray-200">AudioBuffer</code> implements an application-level bounded FIFO queue (<strong className="text-gray-100">maxCapacityMs: 200ms</strong>, <strong className="text-gray-100">targetPrebufferMs: 80ms</strong>). If the queue exceeds 200ms during severe RF interference, the oldest frames are automatically dropped (<code className="text-gray-200">this.queue.shift()</code>). When audio resumes, real-time sync is instantly restored.
            </p>
          </div>
        )
      },
      {
        id: 'chal-clock-drift',
        title: '4. Independent Device Clock Drift',
        content: (
          <div className="space-y-3 text-gray-300 leading-relaxed text-[16px]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                Status: Investigated & Mitigated
              </span>
            </div>
            <p>
              <strong className="text-gray-100 font-semibold">Technical Explanation:</strong> Two distinct physical Bluetooth earbuds contain separate physical quartz crystal oscillators. Even when configured for identical 48,000 Hz sample rates, crystal tolerances cause slight frequency divergence (e.g., Device A consumes 48,002 samples/sec while Device B consumes 47,998 samples/sec).
            </p>
            <p>
              <strong className="text-gray-100 font-semibold">Potential Impact:</strong> Over a 2-hour movie, a 4-sample/sec difference accumulates to ~28,800 samples (~600ms of acoustic divergence between the two listeners).
            </p>
            <p>
              <strong className="text-gray-100 font-semibold">Mitigation:</strong> DuoAudio's 200ms bounded buffer automatically absorbs this drift. When the slower device's queue reaches capacity, it drops a single 20ms frame, keeping both devices synchronized within a tight acoustic window without user intervention.
            </p>
          </div>
        )
      },
      {
        id: 'chal-periodicity',
        title: '5. Bluetooth Driver Periodicity & Jitter',
        content: (
          <div className="space-y-3 text-gray-300 leading-relaxed text-[16px]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                Status: Investigated & Mitigated
              </span>
            </div>
            <p>
              <strong className="text-gray-100 font-semibold">Technical Explanation:</strong> Windows Bluetooth A2DP audio drivers do not request audio in continuous microsecond increments; they pull data in bursty chunks governed by Bluetooth RF packet scheduling (typically 15ms–25ms intervals).
            </p>
            <p>
              <strong className="text-gray-100 font-semibold">Mitigation:</strong> Pre-filling the native queue with a 2-frame (40ms) lead during <code className="text-gray-200">_startPlayback()</code> absorbs driver burstiness, ensuring that driver reads never find an empty buffer.
            </p>
          </div>
        )
      },
      {
        id: 'chal-attribution',
        title: '6. Process Exclusion Attribution (Feedback Squeal)',
        content: (
          <div className="space-y-3 text-gray-300 leading-relaxed text-[16px]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                Status: Implemented & Verified
              </span>
            </div>
            <p>
              <strong className="text-gray-100 font-semibold">Problem:</strong> If system audio capture captures the overall output mix, and DuoAudio plays that audio back to Windows endpoints, the played audio can be captured a second time, resulting in an infinite feedback loop (squeal/echo).
            </p>
            <p>
              <strong className="text-gray-100 font-semibold">Implemented Mitigation:</strong> DuoAudio passes its own child process PID (<code className="text-gray-200">process.pid</code>) to <code className="text-gray-200">capture.startSystemAudio(onCaptureChunk, process.pid)</code>. The Windows WASAPI loopback driver filters out all audio sessions matching that PID, mathematically eliminating the feedback loop at the OS driver boundary.
            </p>
          </div>
        )
      }
    ]
  },

  // =========================================================================
  // SECTION 06 — REFERENCES & RESOURCES
  // =========================================================================
  'section-06-references': {
    id: 'section-06-references',
    number: '06',
    title: 'References & Resources',
    subtitle: 'Official Standards, Specs & External Documentation',
    lead: 'A curated collection of official Microsoft, Node.js, and audio engineering specifications and API documentation for engineers evaluating DuoAudio.',
    toc: [
      { id: 'ref-wasapi', title: 'Microsoft WASAPI & Core Audio' },
      { id: 'ref-node', title: 'Node.js & N-API Specifications' },
      { id: 'ref-rtaudio', title: 'RtAudio & audify Documentation' },
      { id: 'ref-loopback', title: 'loopback-capture Specification' }
    ],
    sections: [
      {
        id: 'ref-wasapi',
        title: 'Microsoft Core Audio APIs & WASAPI Reference',
        content: (
          <div className="space-y-3 text-gray-300 leading-relaxed text-[16px]">
            <p>
              Official Microsoft documentation covering the Windows Core Audio architecture, loopback capture, and endpoint volume interfaces:
            </p>
            <ul className="space-y-2.5 pl-2 text-sm">
              <li className="p-3 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <a href="https://learn.microsoft.com/en-us/windows/win32/coreaudio/loopback-recording" target="_blank" rel="noopener noreferrer" className="text-[#9AA7FF] hover:underline font-semibold flex items-center gap-1.5 mb-1">
                  WASAPI Loopback Recording Reference <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-gray-400 text-xs block">
                  Microsoft Learn guide to capturing audio streams from rendering endpoints using AUDCLNT_STREAMFLAGS_LOOPBACK.
                </span>
              </li>
              <li className="p-3 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <a href="https://learn.microsoft.com/en-us/windows/win32/api/endpointvolume/nn-endpointvolume-iaudioendpointvolume" target="_blank" rel="noopener noreferrer" className="text-[#9AA7FF] hover:underline font-semibold flex items-center gap-1.5 mb-1">
                  IAudioEndpointVolume COM Interface <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-gray-400 text-xs block">
                  Documentation for SetMute, GetMute, and master volume level scalar controls used by duoaudio_endpoint.exe.
                </span>
              </li>
              <li className="p-3 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <a href="https://learn.microsoft.com/en-us/windows/win32/api/mmdeviceapi/nn-mmdeviceapi-immdeviceenumerator" target="_blank" rel="noopener noreferrer" className="text-[#9AA7FF] hover:underline font-semibold flex items-center gap-1.5 mb-1">
                  IMMDeviceEnumerator Interface <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-gray-400 text-xs block">
                  Details for enumerating audio rendering devices and querying the default audio endpoint on Windows.
                </span>
              </li>
            </ul>
          </div>
        )
      },
      {
        id: 'ref-node',
        title: 'Node.js & Node-API (N-API) Specifications',
        content: (
          <div className="space-y-3 text-gray-300 leading-relaxed text-[16px]">
            <p>
              Specifications governing native C++ addons and thread-safe function execution in Node.js:
            </p>
            <ul className="space-y-2.5 pl-2 text-sm">
              <li className="p-3 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <a href="https://nodejs.org/api/n-api.html" target="_blank" rel="noopener noreferrer" className="text-[#9AA7FF] hover:underline font-semibold flex items-center gap-1.5 mb-1">
                  Node-API (ABI-Stable Native Addons) <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-gray-400 text-xs block">
                  API reference for compiling native C/C++ addons with ABI stability across different Node.js runtime versions.
                </span>
              </li>
              <li className="p-3 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <a href="https://nodejs.org/api/child_process.html#child_processspawncommand-args-options" target="_blank" rel="noopener noreferrer" className="text-[#9AA7FF] hover:underline font-semibold flex items-center gap-1.5 mb-1">
                  Node.js child_process.spawn() Specification <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-gray-400 text-xs block">
                  Documentation for stdio IPC configuration (<code className="text-gray-300">stdio: ['pipe','pipe','pipe','ipc']</code>) and inter-process messaging.
                </span>
              </li>
            </ul>
          </div>
        )
      },
      {
        id: 'ref-rtaudio',
        title: 'RtAudio & audify Library Documentation',
        content: (
          <div className="space-y-3 text-gray-300 leading-relaxed text-[16px]">
            <p>
              Documentation for the real-time audio playback engine utilized by DuoAudio:
            </p>
            <ul className="space-y-2.5 pl-2 text-sm">
              <li className="p-3 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <a href="https://www.music.mcgill.ca/~gary/rtaudio/" target="_blank" rel="noopener noreferrer" className="text-[#9AA7FF] hover:underline font-semibold flex items-center gap-1.5 mb-1">
                  RtAudio Real-Time Audio C++ Classes (Gary P. Scavone) <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-gray-400 text-xs block">
                  McGill University engineering documentation for RtAudio's WASAPI, ASIO, and CoreAudio backends.
                </span>
              </li>
              <li className="p-3 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <a href="https://github.com/almoghamdani/audify" target="_blank" rel="noopener noreferrer" className="text-[#9AA7FF] hover:underline font-semibold flex items-center gap-1.5 mb-1">
                  audify Node.js Binding Reference <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-gray-400 text-xs block">
                  Documentation for audify's RtAudio and RtMidi Node-API wrappers, buffer streaming, and volume controls.
                </span>
              </li>
            </ul>
          </div>
        )
      },
      {
        id: 'ref-loopback',
        title: 'loopback-capture Specification',
        content: (
          <div className="space-y-3 text-gray-300 leading-relaxed text-[16px]">
            <ul className="space-y-2.5 pl-2 text-sm">
              <li className="p-3 rounded-lg bg-[#181A25] border border-[#282C3A]">
                <a href="https://github.com/stephen/nodert-loopback-capture" target="_blank" rel="noopener noreferrer" className="text-[#9AA7FF] hover:underline font-semibold flex items-center gap-1.5 mb-1">
                  nodert-loopback-capture Repository <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-gray-400 text-xs block">
                  Native WASAPI loopback capture implementation details, PID exclusion parameters, and audio chunk formats.
                </span>
              </li>
            </ul>
          </div>
        )
      }
    ]
  }
};
