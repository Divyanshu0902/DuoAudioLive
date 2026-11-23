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
  Laptop
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('wasapi');
  const [copiedCode, setCopiedCode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    {
      id: 'overview',
      title: 'Architecture Overview',
      tag: 'System Design',
      content: `DuoAudio is architected as a hybrid application combining a lightweight C++ COM helper binary (\`duoaudio_endpoint.exe\`) with a decoupled Node.js and Electron supervisor process.

### High-Level Data Flow:
1. **Loopback Interception:** Windows system audio is captured at the core mixer level using WASAPI shared loopback before rendering down to hardware.
2. **Duplication Engine:** The audio buffer is cloned in memory into two independent lock-free circular ring buffers.
3. **Hardware Dispatch:** Audio packets are streamed to Earbud 1 and Earbud 2 via separate Bluetooth A2DP transport channels.
4. **Mute Guard:** The physical laptop speaker volume level is clamped to 0dB to prevent room bleed.`,
    },
    {
      id: 'wasapi',
      title: 'WASAPI Loopback Capture',
      tag: 'Core Audio',
      content: `DuoAudio initializes Windows Audio Session API (WASAPI) in shared loopback mode (\`AUDCLNT_STREAMFLAGS_LOOPBACK\`). This captures all rendering audio without requiring virtual audio drivers (such as VB-CABLE).`,
      code: `// Initializing WASAPI Shared-Mode Loopback
IMMDeviceEnumerator* pEnumerator = nullptr;
IMMDevice* pDevice = nullptr;
IAudioClient* pAudioClient = nullptr;
IAudioCaptureClient* pCaptureClient = nullptr;

HRESULT hr = CoCreateInstance(
    __uuidof(MMDeviceEnumerator), NULL, CLSCTX_ALL,
    __uuidof(IMMDeviceEnumerator), (void**)&pEnumerator
);

hr = pEnumerator->GetDefaultAudioEndpoint(eRender, eConsole, &pDevice);
hr = pDevice->Activate(__uuidof(IAudioClient), CLSCTX_ALL, NULL, (void**)&pAudioClient);

WAVEFORMATEX* pwfx = nullptr;
hr = pAudioClient->GetMixFormat(&pwfx);

// 48 kHz / 16-bit linear PCM capture buffer
hr = pAudioClient->Initialize(
    AUDCLNT_SHAREMODE_SHARED,
    AUDCLNT_STREAMFLAGS_LOOPBACK,
    1000000, 0, pwfx, NULL
);`,
    },
    {
      id: 'endpoint-helper',
      title: 'C++ COM Helper (IPolicyConfig)',
      tag: 'Native Helper',
      content: `Windows Core Audio does not publicly expose an API to change default playback endpoints. DuoAudio utilizes an undocumented COM virtual table interface (\`IPolicyConfig\`) implemented in a standalone C++ helper (\`duoaudio_endpoint.exe\`).`,
      code: `// Standalone Native Helper duoaudio_endpoint.exe
[ComImport, Guid("F8679F50-850A-41CF-9C72-430F290290C8")]
interface IPolicyConfig {
    HRESULT SetDefaultEndpoint(
        [In, MarshalAs(UnmanagedType.LPWStr)] LPCWSTR wszDeviceId,
        [In] ERole role
    );
};

int wmain(int argc, wchar_t* argv[]) {
    CoInitialize(NULL);
    IPolicyConfig* pPolicyConfig = nullptr;
    CoCreateInstance(
        CLSID_PolicyConfig, NULL, CLSCTX_ALL,
        IID_IPolicyConfig, (void**)&pPolicyConfig
    );
    // Instantly sets default audio endpoint without service restart:
    pPolicyConfig->SetDefaultEndpoint(argv[1], eConsole);
    CoUninitialize();
    return 0;
}`,
    },
    {
      id: 'ring-buffer',
      title: 'Lock-Free Circular Ring Buffer',
      tag: 'Audio Pacing',
      content: `To prevent audio stutter and drift between different Bluetooth chipsets (e.g. Realtek vs. Qualcomm), DuoAudio maintains independent circular ring buffers with sample-accurate timestamp pacing.`,
      code: `// Lock-Free Dual Circular Ring Buffer with Drift Correction
class DualRingBuffer {
private:
    std::vector<uint8_t> m_bufferA;
    std::vector<uint8_t> m_bufferB;
    std::atomic<size_t> m_writeCursor{0};
    std::atomic<size_t> m_readCursorA{0};
    std::atomic<size_t> m_readCursorB{0};

public:
    void Enqueue(const uint8_t* pcm, size_t bytes) {
        WriteBytes(m_bufferA, pcm, bytes);
        WriteBytes(m_bufferB, pcm, bytes);
        AlignPhaseClocks(); // Compensates for Bluetooth clock crystal drift
    }
};`,
    },
    {
      id: 'build',
      title: 'Building From Source',
      tag: 'Developer Setup',
      content: `### Prerequisites:
- Windows 11 SDK (10.0.22621.0+)
- Visual Studio 2022 (with Desktop development with C++)
- Node.js 20+ & npm

### Compilation Steps:
\`\`\`bash
# 1. Clone repository
git clone https://github.com/Divyanshu0902/DuoAudio.git
cd DuoAudio

# 2. Build Native C++ Endpoint Helper
cd native
msbuild duoaudio_endpoint.vcxproj /p:Configuration=Release /p:Platform=x64

# 3. Install Node & Electron dependencies
cd ..
npm install

# 4. Run application in development mode
npm run dev
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
            <span className="text-xs font-mono text-blue-400">Architecture & Technical Docs</span>
          </div>

          <a
            href="https://github.com/Divyanshu0902/DuoAudio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors"
          >
            <span>View GitHub Source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Documentation Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            DuoAudio Architecture & Developer Docs
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-3xl">
            Official technical reference covering Windows Core Audio WASAPI loopback capture, native C++ COM helpers, and dual-output ring buffer synchronization.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md relative">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter documentation topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0D1017] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
          />
        </div>

        {/* Docs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigation (3 cols) */}
          <div className="lg:col-span-3 sticky top-28 space-y-1 bg-[#0A0D14] p-3 rounded-2xl border border-white/[0.06]">
            <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-gray-500">
              Contents
            </div>
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                  activeSection === sec.id
                    ? 'bg-blue-600/20 text-white font-semibold border border-blue-500/30'
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
                  activeSection === sec.id ? 'border-blue-500/40 shadow-xl shadow-blue-500/5' : 'border-white/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
                  <div>
                    <span className="text-[11px] font-mono text-blue-400 px-2 py-0.5 rounded-md bg-blue-500/10">
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
                      <span>Implementation Snippet</span>
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
