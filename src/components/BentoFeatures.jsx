import React from 'react';
import { ShieldCheck, Cpu, PlaySquare, Github } from 'lucide-react';

export default function BentoFeatures() {
  const specs = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-gray-300" />,
      title: '100% Offline',
      desc: 'Zero telemetry, no cloud connectivity, completely private.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-gray-300" />,
      title: 'Native Windows 11',
      desc: 'Built on Windows Core Audio (WASAPI shared mode).',
    },
    {
      icon: <PlaySquare className="w-5 h-5 text-gray-300" />,
      title: 'Universal Compatibility',
      desc: 'Works with Netflix, YouTube, Spotify, VLC, and games.',
    },
    {
      icon: <Github className="w-5 h-5 text-gray-300" />,
      title: 'Open Source',
      desc: 'MIT licensed, inspectable code on GitHub.',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-24 relative bg-[#07080B] border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((item, idx) => (
            <div key={idx} className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
