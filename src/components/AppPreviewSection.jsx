import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function AppPreviewSection() {
  const callouts = [
    {
      title: 'Zero Setup',
      desc: 'Select your two connected earbuds and click Start. No virtual audio cables, no extra drivers, no accounts.',
    },
    {
      title: 'Independent Volume',
      desc: 'His 40%. Her 80%. Dedicated real-time faders allow both listeners to personalize loudness freely.',
    },
    {
      title: 'Silent Room Protection',
      desc: 'Your laptop speakers stay automatically quiet while audio streams privately to both headsets.',
    },
    {
      title: 'Runs in the Background',
      desc: 'Minimizes cleanly to the Windows system tray so audio keeps streaming quietly without taskbar clutter or open windows.',
    },
  ];

  return (
    <section id="preview" className="py-20 md:py-28 relative bg-[#07080B] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Clean App Screenshot */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[360px] sm:max-w-[400px]">
              {/* Clean Background Card */}
              <div className="rounded-2xl p-2.5 bg-[#0B0D13] border border-white/[0.1] shadow-2xl shadow-black/80">
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src="/assets/screenshot-main.png"
                    alt="DuoAudio Desktop App Interface"
                    className="w-full h-auto object-contain block mx-auto select-none rounded-xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Bold Minimalist Spec Callouts */}
          <div className="lg:col-span-6 space-y-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                Minimal, Fast, and Focused.
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                No bloated menus, sign-ins, or complex routing. Everything you need fits into a single, intuitive Windows utility.
              </p>
            </div>

            {/* Spec Callouts with Tick Marks */}
            <div className="space-y-6">
              {callouts.map((item) => (
                <div key={item.title} className="flex items-start space-x-3.5">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-1" />
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
