import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bluetooth, Headphones, Play, ArrowRight, CheckCircle2, Sliders, Radio, Laptop, BookOpen } from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Pair Both Earbuds via Bluetooth',
      desc: 'Put both pairs of Bluetooth earbuds into pairing mode and connect them in Windows 11 Settings (Bluetooth & devices).',
      tag: 'Step 1 • Connect',
      icon: <Bluetooth className="w-6 h-6 text-blue-400" />,
      previewTitle: 'Windows Bluetooth Settings',
      previewItems: [
        { name: 'boAt Airdopes 161', status: 'Connected', color: 'text-blue-400' },
        { name: 'realme Buds T310', status: 'Connected', color: 'text-purple-400' },
      ],
    },
    {
      step: '02',
      title: 'Select Both Earbuds in DuoAudio',
      desc: 'Open DuoAudio. Pick your first pair in the Earbud 1 dropdown and your friend’s pair in Earbud 2.',
      tag: 'Step 2 • Select',
      icon: <Sliders className="w-6 h-6 text-indigo-400" />,
      previewTitle: 'Select Your Output Devices',
      previewItems: [
        { name: 'Earbud 1: boAt Airdopes 161', status: 'Ready', color: 'text-emerald-400' },
        { name: 'Earbud 2: realme Buds T310', status: 'Ready', color: 'text-emerald-400' },
      ],
    },
    {
      step: '03',
      title: 'Click ▷ Start Sharing',
      desc: 'Press the Start button. Audio streams to both pairs in perfect sync, while your laptop speakers stay automatically quiet.',
      tag: 'Step 3 • Enjoy',
      icon: <Play className="w-6 h-6 text-emerald-400" />,
      previewTitle: 'Audio Streaming Active',
      previewItems: [
        { name: 'Dual Sound Sync', status: 'Parallel Dual Streaming', color: 'text-emerald-400' },
        { name: 'Physical Laptop Speakers', status: 'Silenced (0%)', color: 'text-blue-400' },
      ],
    },
  ];

  return (
    <section id="user-guide" className="py-24 relative bg-[#07080B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent Clean Minimalist Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>User Guide</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Up and Running in 30 Seconds
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
            Three simple steps to connect, stream, and share audio without complicated cables or drivers.
          </p>
        </div>

        {/* 3 Steps Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Step Selectors Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((s, idx) => (
              <div
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-2xl cursor-pointer transition-all border ${
                  activeStep === idx
                    ? 'bg-[#111524] border-blue-500/40 shadow-xl shadow-blue-500/10 -translate-y-0.5'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="shrink-0">
                    <span className={`text-2xl font-black font-mono ${
                      activeStep === idx ? 'text-blue-400' : 'text-gray-600'
                    }`}>
                      {s.step}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-xs font-mono font-medium ${
                        activeStep === idx ? 'text-blue-400' : 'text-gray-500'
                      }`}>
                        {s.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5">{s.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Step Preview Stage (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-[#0C0F17] border border-white/[0.1] shadow-2xl overflow-hidden">
              {/* Radial ambient glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-blue-500/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                    {steps[activeStep].icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-blue-400">Preview</span>
                    <h4 className="text-lg font-bold text-white">{steps[activeStep].previewTitle}</h4>
                  </div>
                </div>
                <div className="text-xs font-mono text-gray-400 bg-white/[0.04] px-3 py-1.5 rounded-xl border border-white/[0.08]">
                  Step {activeStep + 1} of 3
                </div>
              </div>

              {/* Simulated Device List or UI */}
              <div className="space-y-3 mb-6">
                {steps[activeStep].previewItems.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-gray-300">
                        <Headphones className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-white">{item.name}</span>
                    </div>
                    <span className={`text-xs font-mono font-medium ${item.color}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Banner for Current Step */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent border border-blue-500/20 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-gray-300 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {activeStep === 0 && 'Windows connects both headsets simultaneously'}
                    {activeStep === 1 && 'DuoAudio pairs endpoints automatically'}
                    {activeStep === 2 && 'Dual streams running in parallel'}
                  </span>
                </div>
                {activeStep < 2 ? (
                  <button
                    onClick={() => setActiveStep((prev) => prev + 1)}
                    className="flex items-center space-x-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    Ready to Stream
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
