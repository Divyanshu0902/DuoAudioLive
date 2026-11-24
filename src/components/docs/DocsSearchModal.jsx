import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Hash, ChevronRight, Layers, FileText } from 'lucide-react';

export default function DocsSearchModal({ isOpen, onClose, onSelectTopic, searchIndex = [] }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const matches = [];

    for (const item of searchIndex) {
      const titleMatch = item.title?.toLowerCase().includes(q);
      const descMatch = item.description?.toLowerCase().includes(q);
      const sectionMatch = item.sectionTitle?.toLowerCase().includes(q);
      const keywordsMatch = item.keywords?.some(k => k.toLowerCase().includes(q));

      if (titleMatch || descMatch || sectionMatch || keywordsMatch) {
        matches.push(item);
      }
    }

    setResults(matches.slice(0, 8));
  }, [query, searchIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-xl bg-[#141620] border border-[#2D313E] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#2D313E] gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation, components, audio pipeline..."
            className="w-full bg-transparent text-sm text-gray-100 placeholder-gray-500 outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-gray-500 hover:text-gray-300 p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-gray-400 bg-white/[0.05] border border-white/[0.1] rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-gray-500">
              Type keywords such as <code className="text-[#9AA7FF]">WASAPI</code>, <code className="text-[#9AA7FF]">PcmConverter</code>, <code className="text-[#9AA7FF]">Rate Pacer</code>, <code className="text-[#9AA7FF]">IPolicyConfig</code>, or <code className="text-[#9AA7FF]">Clock Drift</code>.
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-500">
              No documentation topics found for "<span className="text-gray-300">{query}</span>".
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((res, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    onSelectTopic(res.topicId, res.anchorId);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-[#262933] transition-colors flex items-start justify-between group"
                >
                  <div className="space-y-1 pr-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[#9AA7FF] font-medium">{res.sectionTitle}</span>
                      <ChevronRight className="w-3 h-3 text-gray-600" />
                      <span className="text-gray-200 font-semibold group-hover:text-white">{res.title}</span>
                    </div>
                    {res.description && (
                      <p className="text-[11px] text-gray-400 line-clamp-1">
                        {res.description}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[#9AA7FF] shrink-0 mt-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#10121A] border-t border-[#2D313E] flex items-center justify-between text-[11px] text-gray-500">
          <span>Search DuoAudio Engineering Portal</span>
          <span>Click result to navigate</span>
        </div>
      </div>
    </div>
  );
}
