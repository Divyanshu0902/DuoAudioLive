import React from 'react';
import { Plane, Moon, Coffee } from 'lucide-react';

export default function DualStreamingDiagram() {
  const scenarios = [
    {
      icon: <Plane className="w-5 h-5 text-white" />,
      title: 'In the Air',
      desc: 'Watch movies together on a flight without tangled wired splitters or noisy adapters.',
    },
    {
      icon: <Moon className="w-5 h-5 text-white" />,
      title: 'Late at Night',
      desc: 'Watch TV shows or YouTube in bed without waking roommates or family.',
    },
    {
      icon: <Coffee className="w-5 h-5 text-white" />,
      title: 'In the Café',
      desc: 'Study, edit video, or listen together in public spaces with full stereo immersion.',
    },
  ];

  return (
    <section className="py-20 md:py-28 relative bg-[#07080B] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Lifestyle Minimalist Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Engineered for flights, dorms, and late nights.
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
            Enjoy movies, shows, and music together in full stereo without disturbing anyone around you.
          </p>
        </div>

        {/* 3 Clean Scenario Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-7 bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all hover:bg-white/[0.035]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
