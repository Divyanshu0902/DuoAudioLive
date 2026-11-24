import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Activity, 
  Cpu, 
  AlertTriangle, 
  Bookmark, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  HelpCircle,
  FileCode,
  Radio,
  Volume2,
  Sliders,
  ShieldCheck,
  Laptop
} from 'lucide-react';
import SystemArchitectureDiagram from '../components/docs/SystemArchitectureDiagram';
import AudioPipelineDiagram from '../components/docs/AudioPipelineDiagram';

export const DOCS_SECTIONS = [
  {
    id: 'section-01-overview',
    number: '01',
    title: 'Overview',
    subtitle: 'Problem Statement & High-Level Objective',
    icon: BookOpen,
    topics: [
      { id: 'intro', title: 'Product Introduction' },
      { id: 'problem', title: 'The Windows Audio Problem' },
      { id: 'objective', title: 'Core Objective' },
      { id: 'mechanism', title: 'How DuoAudio Works' },
      { id: 'scope', title: 'Project Scope' },
      { id: 'status', title: 'Current Development Status' }
    ]
  },
  {
    id: 'section-02-architecture',
    number: '02',
    title: 'System Architecture',
    subtitle: 'Process Boundaries & Containment',
    icon: Layers,
    topics: [
      { id: 'arch-diagram', title: 'System Architecture Diagram' },
      { id: 'arch-overview', title: 'Subsystem Overview' },
      { id: 'arch-components', title: 'Component Inventory & Contracts' },
      { id: 'arch-principles', title: 'Architectural Design Principles' }
    ]
  },
  {
    id: 'section-03-pipeline',
    number: '03',
    title: 'Audio Pipeline',
    subtitle: 'Real-Time Capture, Normalization & Pacing',
    icon: Activity,
    topics: [
      { id: 'pipe-diagram', title: 'Audio Pipeline Diagram' },
      { id: 'pipe-stages', title: 'Stage-by-Stage Breakdown' },
      { id: 'pipe-concepts', title: 'Audio Engineering Concepts' }
    ]
  },
  {
    id: 'section-04-techstack',
    number: '04',
    title: 'Technology Stack',
    subtitle: 'Runtimes, Native Libraries & Dependencies',
    icon: Cpu,
    topics: [
      { id: 'stack-runtime', title: 'Runtimes & Languages' },
      { id: 'stack-capture', title: 'Audio Capture Technologies' },
      { id: 'stack-playback', title: 'Audio Playback Backend' },
      { id: 'stack-native', title: 'Native C++ COM Helper' },
      { id: 'stack-table', title: 'Complete Dependency Table' }
    ]
  },
  {
    id: 'section-05-challenges',
    number: '05',
    title: 'Engineering Challenges',
    subtitle: 'Memory Bloat, Clock Drift & Isolation',
    icon: AlertTriangle,
    topics: [
      { id: 'chal-tsfn', title: '1. Unbounded TSFN Queue' },
      { id: 'chal-playback-queue', title: '2. Unbounded Playback Queue' },
      { id: 'chal-buffer-mgmt', title: '3. Buffer Management & Latency' },
      { id: 'chal-clock-drift', title: '4. Independent Device Clock Drift' },
      { id: 'chal-periodicity', title: '5. Bluetooth Driver Periodicity' },
      { id: 'chal-attribution', title: '6. Process Exclusion Attribution' }
    ]
  },
  {
    id: 'section-06-references',
    number: '06',
    title: 'References & Resources',
    subtitle: 'Official Standards, Specs & External Documentation',
    icon: Bookmark,
    topics: [
      { id: 'ref-wasapi', title: 'Microsoft WASAPI & Core Audio' },
      { id: 'ref-node', title: 'Node.js & N-API Specifications' },
      { id: 'ref-rtaudio', title: 'RtAudio & audify Documentation' },
      { id: 'ref-loopback', title: 'loopback-capture Specification' }
    ]
  }
];

// Flat Search Index for Instant Search Navigation
export const DOCS_SEARCH_INDEX = [
  { topicId: 'section-01-overview', anchorId: 'intro', sectionTitle: '01 Overview', title: 'Product Introduction', description: 'What is DuoAudio and why does it exist?', keywords: ['introduction', 'about', 'duoaudio', 'windows 11', 'bluetooth'] },
  { topicId: 'section-01-overview', anchorId: 'problem', sectionTitle: '01 Overview', title: 'The Windows Audio Problem', description: 'Windows single default output limitation and dual-path echo.', keywords: ['problem', 'windows limitation', 'single default', 'echo', 'loopback'] },
  { topicId: 'section-01-overview', anchorId: 'status', sectionTitle: '01 Overview', title: 'Current Development Status', description: 'Production architecture status across Phases 1 through 9.', keywords: ['status', 'roadmap', 'phase 9', 'production'] },

  { topicId: 'section-02-architecture', anchorId: 'arch-overview', sectionTitle: '02 Architecture', title: 'Subsystem Overview', description: '3-Tier multi-process architecture and runtime isolation.', keywords: ['architecture', 'tiers', 'process isolation', 'boundaries', 'supervisor'] },
  { topicId: 'section-02-architecture', anchorId: 'arch-diagram', sectionTitle: '02 Architecture', title: 'System Architecture Diagram', description: 'Interactive diagram of Electron main, worker runner, and native helper.', keywords: ['diagram', 'schematic', 'containment', 'electron', 'node.exe'] },
  { topicId: 'section-02-architecture', anchorId: 'arch-components', sectionTitle: '02 Architecture', title: 'Component Inventory & Contracts', description: 'AudioService, audio_runner.js, duoaudio_endpoint.exe, and PcmConverter.', keywords: ['components', 'audioservice', 'audio_runner', 'duoaudio_endpoint', 'contracts'] },
  { topicId: 'section-02-architecture', anchorId: 'arch-principles', sectionTitle: '02 Architecture', title: 'Architectural Design Principles', description: 'Asynchronous processing, bounded queuing, and fault isolation.', keywords: ['principles', 'fault isolation', 'asynchronous', 'resilience'] },

  { topicId: 'section-03-pipeline', anchorId: 'pipe-diagram', sectionTitle: '03 Audio Pipeline', title: 'Audio Pipeline Diagram', description: 'Interactive 9-stage progression from WASAPI capture to Bluetooth earbuds.', keywords: ['pipeline', 'dataflow', 'stages', 'stream', 'audio pipeline diagram'] },
  { topicId: 'section-03-pipeline', anchorId: 'pipe-stages', sectionTitle: '03 Audio Pipeline', title: 'Stage-by-Stage Breakdown', description: 'Loopback capture, PCM Float32 conversion, bounded ring buffer, and 10ms rate pacer.', keywords: ['capture', 'pcmconverter', 'rate pacer', 'ring buffer', 'gain'] },
  { topicId: 'section-03-pipeline', anchorId: 'pipe-concepts', sectionTitle: '03 Audio Pipeline', title: 'Audio Engineering Concepts', description: 'PCM, 48 kHz, S16LE, Float32, latency, jitter, and WASAPI shared mode.', keywords: ['concepts', 'pcm', 'sample rate', 'latency', 'jitter', 'wasapi shared'] },

  { topicId: 'section-04-techstack', anchorId: 'stack-runtime', sectionTitle: '04 Tech Stack', title: 'Runtimes & Languages', description: 'Node.js 20+, Electron 33, C++17, React 19, and Vite.', keywords: ['tech stack', 'node.js', 'electron', 'c++', 'react'] },
  { topicId: 'section-04-techstack', anchorId: 'stack-capture', sectionTitle: '04 Tech Stack', title: 'Audio Capture Technologies', description: 'loopback-capture native addon and AUDCLNT_STREAMFLAGS_LOOPBACK.', keywords: ['loopback-capture', 'capture api', 'silence patch'] },
  { topicId: 'section-04-techstack', anchorId: 'stack-playback', sectionTitle: '04 Tech Stack', title: 'Audio Playback Backend', description: 'audify@1.10.1 and RtAudio WASAPI shared mode.', keywords: ['audify', 'rtaudio', 'playback backend'] },
  { topicId: 'section-04-techstack', anchorId: 'stack-native', sectionTitle: '04 Tech Stack', title: 'Native C++ COM Helper', description: 'duoaudio_endpoint.exe, MinGW GCC 13.2.0, IPolicyConfig, and IAudioEndpointVolume.', keywords: ['duoaudio_endpoint.exe', 'ipolicyconfig', 'iaudioendpointvolume', 'mingw'] },

  { topicId: 'section-05-challenges', anchorId: 'chal-tsfn', sectionTitle: '05 Challenges', title: '1. Unbounded TSFN Queue', description: 'Native-to-JavaScript callback thread accumulation risks.', keywords: ['tsfn', 'thread safe function', 'memory bloat', 'challenges'] },
  { topicId: 'section-05-challenges', anchorId: 'chal-playback-queue', sectionTitle: '05 Challenges', title: '2. Unbounded Playback Queue', description: 'Preventing native driver buffer inflation with wall-clock rate pacing.', keywords: ['playback queue', 'buffer bloat', 'rate pacer', 'latency growth'] },
  { topicId: 'section-05-challenges', anchorId: 'chal-buffer-mgmt', sectionTitle: '05 Challenges', title: '3. Buffer Management & Latency', description: '200ms Bounded Ring Buffer and 80ms target prebuffer.', keywords: ['buffer management', 'ring buffer', 'prebuffer'] },
  { topicId: 'section-05-challenges', anchorId: 'chal-clock-drift', sectionTitle: '05 Challenges', title: '4. Independent Device Clock Drift', description: 'Absorbing hardware crystal oscillator drift between discrete earbuds.', keywords: ['clock drift', 'hardware crystals', 'drift accumulation'] },
  { topicId: 'section-05-challenges', anchorId: 'chal-periodicity', sectionTitle: '05 Challenges', title: '5. Bluetooth Driver Periodicity', description: 'Handling non-deterministic packet scheduling in Windows Bluetooth drivers.', keywords: ['periodicity', 'bluetooth scheduling', 'jitter'] },
  { topicId: 'section-05-challenges', anchorId: 'chal-attribution', sectionTitle: '05 Challenges', title: '6. Process Exclusion Attribution', description: 'PID exclusion via WASAPI loopback to prevent acoustic feedback squeal.', keywords: ['process exclusion', 'pid exclusion', 'feedback prevention'] },

  { topicId: 'section-06-references', anchorId: 'ref-wasapi', sectionTitle: '06 References', title: 'Microsoft WASAPI & Core Audio', description: 'Official Microsoft Windows Core Audio documentation and API references.', keywords: ['wasapi reference', 'microsoft docs', 'core audio'] },
  { topicId: 'section-06-references', anchorId: 'ref-rtaudio', sectionTitle: '06 References', title: 'RtAudio & audify Documentation', description: 'Gary P. Scavone RtAudio library specifications.', keywords: ['rtaudio docs', 'audify reference'] }
];
