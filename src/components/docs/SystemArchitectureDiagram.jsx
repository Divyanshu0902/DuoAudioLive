import React, { useState, useEffect } from 'react';
import {
  Maximize2,
  Minimize2,
  Download,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  Sparkles
} from 'lucide-react';

export default function SystemArchitectureDiagram() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Keyboard shortcut: Escape closes lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen]);

  const handleZoomIn = (e) => {
    e?.stopPropagation();
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = (e) => {
    e?.stopPropagation();
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleResetZoom = (e) => {
    e?.stopPropagation();
    setZoomLevel(1);
  };

  return (
    <div className="w-full mt-1 mb-8 space-y-3">
      {/* Diagram placed directly on the background, filling the full available space */}
      <div className="w-full relative select-none">
        <img
          src="/assets/architecture-diagram.png"
          alt="DuoAudio System Architecture Diagram"
          className="w-full h-auto block"
          loading="eager"
        />
      </div>

      {/* Bottom Actions Bar */}
      <div className="pt-2 flex items-center justify-end space-x-1.5 border-b border-white/[0.08] pb-4">
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="w-6 h-6 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-gray-300 hover:text-white transition-colors flex items-center justify-center"
          title="Expand full screen lightbox"
          aria-label="Expand full screen lightbox"
        >
          <Maximize2 className="w-3 h-3 text-[#9AA7FF]" />
        </button>

        <a
          href="/assets/architecture-diagram.png"
          download="DuoAudio-System-Architecture.png"
          className="w-6 h-6 rounded-md bg-[#5C6CDB]/20 hover:bg-[#5C6CDB]/30 border border-[#5C6CDB]/30 text-white transition-colors flex items-center justify-center"
          title="Download high-resolution PNG"
          aria-label="Download high-resolution PNG"
        >
          <Download className="w-3 h-3 text-[#9AA7FF]" />
        </a>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col animate-in fade-in duration-150"
          onClick={() => {
            setIsLightboxOpen(false);
            setZoomLevel(1);
          }}
        >
          {/* Lightbox Header Bar */}
          <div
            className="px-6 py-4 border-b border-white/[0.1] bg-[#0E111A]/90 backdrop-blur-md flex items-center justify-between z-10 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3 text-sm font-mono text-white">
              <span className="font-semibold">DuoAudio System Architecture</span>
              <span className="text-gray-500">•</span>
              <span className="text-xs text-gray-400">Official High-Resolution Engineering Blueprint</span>
            </div>

            {/* Zoom & Action Controls */}
            <div className="flex items-center space-x-2 text-xs font-mono">
              <div className="flex items-center bg-white/[0.05] border border-white/[0.1] rounded-lg p-1 space-x-1">
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 rounded hover:bg-white/[0.1] text-gray-300 hover:text-white transition-colors"
                  title="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-2 text-gray-400 font-mono text-xs select-none min-w-[3rem] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 rounded hover:bg-white/[0.1] text-gray-300 hover:text-white transition-colors"
                  title="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1.5 rounded hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors"
                  title="Reset zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <a
                href="/assets/architecture-diagram.png"
                download="DuoAudio-System-Architecture.png"
                className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-gray-300 hover:text-white transition-colors"
                title="Download PNG"
              >
                <Download className="w-4 h-4 text-[#9AA7FF]" />
              </a>

              <button
                onClick={() => {
                  setIsLightboxOpen(false);
                  setZoomLevel(1);
                }}
                className="p-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] text-white transition-colors"
                title="Close lightbox (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lightbox Scrollable / Zoomable Body */}
          <div
            className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center cursor-grab active:cursor-grabbing"
            onClick={() => {
              setIsLightboxOpen(false);
              setZoomLevel(1);
            }}
          >
            <div
              className="transition-transform duration-150 ease-out flex items-center justify-center"
              style={{ transform: `scale(${zoomLevel})` }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/assets/architecture-diagram.png"
                alt="DuoAudio System Architecture Diagram Fullscreen"
                className="max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
