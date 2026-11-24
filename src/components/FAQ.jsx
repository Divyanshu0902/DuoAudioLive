import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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
      a: "DuoAudio processes and routes Windows system audio using low-latency WASAPI shared-mode streams with bounded memory buffers to prevent queue backlog. Both listeners receive audio in parallel. While standard Bluetooth headphones have typical Bluetooth transmission latency (depending on your headphones' codec), audio is well-synchronized for movies, YouTube, and music sharing.",
    },
    {
      q: 'How does DuoAudio prevent laptop speakers from echoing in the room?',
      a: 'When dual-output streaming begins, DuoAudio immediately clamps physical laptop speakers to 0% volume using native Windows Core Audio APIs. Audio plays exclusively inside both pairs of earbuds, ensuring you never disturb a quiet airplane, library, or bedroom.',
    },
    {
      q: 'Is DuoAudio safe, and why are there zero antivirus false-positives?',
      a: 'DuoAudio is 100% open-source (MIT licensed) and contains zero malicious hooks or invasive kernel drivers. Our native helper (duoaudio_endpoint.exe) uses standard, official Windows Core Audio COM interfaces (IPolicyConfig). All source code is completely public and inspectable on GitHub.',
    },
    {
      q: 'What happens to my audio settings when I close DuoAudio?',
      a: 'DuoAudio features a guaranteed cleanup lifecycle hook. The moment you quit the application from the System Tray, your original default Windows playback device is automatically restored, and speaker volume constraints are reverted without needing to restart your PC.',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 relative bg-[#07080B] overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent Clean Minimalist Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
            Quick answers about compatibility, volume controls, and Windows 11 integration.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all border overflow-hidden ${isOpen
                    ? 'bg-[#0B0D13] border-white/[0.12]'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.035]'
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-semibold text-white pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'bg-white/[0.08] text-white rotate-180' : 'bg-white/[0.04] text-gray-400'
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
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/[0.04]">
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
