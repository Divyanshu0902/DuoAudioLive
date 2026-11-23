import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      label: 'Connect',
      desc: 'Pair both Bluetooth earbuds in Windows.',
    },
    {
      step: '02',
      label: 'Select',
      desc: 'Choose Earbud 1 and Earbud 2 in DuoAudio.',
    },
    {
      step: '03',
      label: 'Listen Together',
      desc: 'Click Start Sharing and enjoy synchronized sound.',
    },
  ];

  return (
    <section id="user-guide" className="py-20 md:py-28 relative bg-[#07080B] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimalist Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            How It Works
          </h2>
          <p className="text-gray-400 mt-3 text-base sm:text-lg">
            Up and running in thirty seconds.
          </p>
        </div>

        {/* Clean 3-Step Horizontal Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => (
            <div
              key={s.step}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative space-y-4"
            >
              <span className="text-3xl font-extrabold font-mono text-gray-500 block">
                {s.step}
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">{s.label}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
