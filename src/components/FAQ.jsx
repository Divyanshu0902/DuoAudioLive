import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Does DuoAudio work with AirPods, Galaxy Buds, and Sony headphones?',
      a: 'Yes, absolutely! DuoAudio works with any audio output recognized by Windows 11. That includes Apple AirPods, Samsung Galaxy Buds, Sony WH/WF series, boAt, realme, OnePlus, Bose, as well as wired 3.5mm headphones or USB DACs.',
    },
    {
      q: 'Why does Windows 11 lack this dual-headphone feature natively?',
      a: 'Windows Core Audio engine was architecturally designed to bind all system audio output to a single default playback endpoint (e.g. Speakers OR Headphones). DuoAudio solves this limitation by capturing system audio via low-level WASAPI loopback before it hits the mixer, cloning the linear PCM stream, and broadcasting it to two independent Bluetooth outputs simultaneously.',
    },
    {
      q: 'Will there be audio lag, delay, or lip-sync desync while watching movies?',
      a: 'No. DuoAudio is engineered specifically for film and gaming synchronization. Our circular ring buffer maintains sample-accurate timing with sub-10ms processing overhead. Dialogue on Netflix, YouTube, VLC, and Prime Video stays in perfect sync with the actors’ lips.',
    },
    {
      q: 'How does DuoAudio prevent laptop speakers from echoing in the room?',
      a: 'DuoAudio includes a built-in Silent Room Guarantee. When dual-output streaming begins, DuoAudio immediately clamps physical laptop speakers to 0% volume. Audio plays exclusively inside both pairs of earbuds, ensuring you never disturb a quiet airplane, library, or bedroom.',
    },
    {
      q: 'Is DuoAudio safe, and why are there zero antivirus false-positives?',
      a: 'DuoAudio is 100% open-source (MIT licensed) and contains zero malicious hooks or invasive kernel drivers. Our native helper (duoaudio_endpoint.exe) uses standard, official Windows Core Audio COM interfaces (IPolicyConfig). All source code is completely public and inspectable on GitHub.',
    },
    {
      q: 'What happens to my audio settings when I close DuoAudio?',
      a: 'DuoAudio features a guaranteed cleanup lifecycle hook. The moment you close the application, your original default Windows playback device is automatically restored, and speaker volume constraints are reverted without needing to restart your PC.',
    },
  ];

  return (
    <section id="faq" className="py-24 relative bg-[#07080B] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent Clean Minimalist Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
            Quick answers about earbud compatibility, volume pacing, and Windows 11 integration.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all border overflow-hidden ${
                  isOpen
                    ? 'bg-[#111524] border-blue-500/30 shadow-xl shadow-blue-500/5'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-semibold text-white pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-blue-500/20 text-blue-400 rotate-180' : 'bg-white/[0.05] text-gray-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/[0.04]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
