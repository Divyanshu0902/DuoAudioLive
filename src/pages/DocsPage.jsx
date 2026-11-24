import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  ExternalLink, 
  Github, 
  Check, 
  Copy, 
  BookOpen, 
  Layers, 
  Activity, 
  Cpu, 
  AlertTriangle, 
  Bookmark,
  Hash,
  ArrowUpRight
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DOCS_SECTIONS, DOCS_SEARCH_INDEX } from '../data/docsSectionsData';
import { DOCS_ARTICLES } from '../data/docsArticles';
import DocsSearchModal from '../components/docs/DocsSearchModal';

export default function DocsPage() {
  const [activeSectionId, setActiveSectionId] = useState('section-01-overview');
  const [activeAnchorId, setActiveAnchorId] = useState(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [copiedAnchor, setCopiedAnchor] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const contentAreaRef = useRef(null);

  // Active Article Content
  const currentArticle = DOCS_ARTICLES[activeSectionId] || DOCS_ARTICLES['section-01-overview'];

  // Calculate current section index for Prev/Next navigation
  const currentSectionIdx = DOCS_SECTIONS.findIndex(s => s.id === activeSectionId);
  const prevSection = currentSectionIdx > 0 ? DOCS_SECTIONS[currentSectionIdx - 1] : null;
  const nextSection = currentSectionIdx < DOCS_SECTIONS.length - 1 ? DOCS_SECTIONS[currentSectionIdx + 1] : null;

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync hash from URL if present
  useEffect(() => {
    if (location.hash) {
      const anchor = location.hash.replace('#', '');
      setActiveAnchorId(anchor);
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, activeSectionId]);

  // Navigate to section & anchor
  const handleSelectTopic = (sectionId, anchorId) => {
    setActiveSectionId(sectionId);
    setMobileSidebarOpen(false);
    if (anchorId) {
      setActiveAnchorId(anchorId);
      navigate(`/docs#${anchorId}`);
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      navigate(`/docs`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyAnchor = (anchorId) => {
    const url = `${window.location.origin}/docs#${anchorId}`;
    navigator.clipboard.writeText(url);
    setCopiedAnchor(anchorId);
    setTimeout(() => setCopiedAnchor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#111318] text-[#F3F4F6] pt-16 selection:bg-[#5C6CDB]/30 selection:text-white">
      {/* Global Search Modal */}
      <DocsSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectTopic={handleSelectTopic}
        searchIndex={DOCS_SEARCH_INDEX}
      />

      {/* Sub-Header Bar (Desktop & Mobile) */}
      <div className="border-b border-white/[0.08] bg-[#111318]/90 backdrop-blur-md sticky top-16 z-30 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-[96rem] mx-auto flex items-center justify-between gap-4">
          {/* Breadcrumb & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05]"
              aria-label="Toggle navigation menu"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center space-x-2 text-xs font-mono text-gray-400">
              <Link to="/" className="hover:text-gray-200">DuoAudio</Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-gray-300 font-medium">Docs</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-[#9AA7FF] font-semibold">{currentArticle.title}</span>
            </div>
          </div>

          {/* Quick Search Button & GitHub Link */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-colors shadow-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search docs...</span>
              <kbd className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-mono text-gray-400 bg-white/[0.05] border border-white/[0.1] rounded">
                ⌘K
              </kbd>
            </button>

            <a
              href="https://github.com/Divyanshu0902/DuoAudio"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-gray-300 hover:text-white hover:border-[#5C6CDB]/50 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>v1.0.2</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main 3-Column Layout Container */}
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex relative">
          
          {/* ===================================================================
              COLUMN 1: Left Persistent Sidebar
              =================================================================== */}
          <aside
            className={`
              fixed lg:sticky top-[105px] h-[calc(100vh-105px)] z-40 lg:z-10
              w-72 shrink-0 border-r border-white/[0.08] bg-[#111318] lg:bg-transparent
              overflow-y-auto pb-12 pt-4 pr-4 transition-transform duration-200 ease-in-out
              ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
          >
            <div className="space-y-6">
              {/* Documentation Section Navigation */}
              <div className="space-y-1">
                <div className="text-[11px] font-mono tracking-wider uppercase text-gray-500 px-3 mb-2 font-semibold">
                  Documentation Portal
                </div>
                {DOCS_SECTIONS.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSectionId === section.id;
                  return (
                    <div key={section.id} className="space-y-0.5">
                      <button
                        onClick={() => handleSelectTopic(section.id, null)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-[#5C6CDB]/15 text-[#9AA7FF] border border-[#5C6CDB]/30 font-semibold'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                            isActive ? 'bg-[#5C6CDB]/30 text-white' : 'bg-white/[0.05] text-gray-500'
                          }`}>
                            {section.number}
                          </span>
                          <span className="truncate">{section.title}</span>
                        </div>
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#9AA7FF]' : 'text-gray-500'}`} />
                      </button>

                      {/* Expanded Sub-Topics for Active Section */}
                      {isActive && (
                        <div className="pl-8 pr-2 py-1 space-y-1 border-l border-white/[0.08] ml-4 my-1">
                          {section.topics.map((topic) => {
                            const isTopicActive = activeAnchorId === topic.id;
                            return (
                              <button
                                key={topic.id}
                                onClick={() => handleSelectTopic(section.id, topic.id)}
                                className={`w-full text-left py-1 px-2 rounded text-[11px] font-mono transition-colors block truncate ${
                                  isTopicActive
                                    ? 'text-[#9AA7FF] bg-white/[0.04] font-medium'
                                    : 'text-gray-400 hover:text-gray-200'
                                }`}
                              >
                                {topic.title}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Useful External Links */}
              <div className="pt-4 border-t border-white/[0.08] space-y-2">
                <div className="text-[11px] font-mono tracking-wider uppercase text-gray-500 px-3 font-semibold">
                  Engineering Repositories
                </div>
                <a
                  href="https://github.com/Divyanshu0902/DuoAudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-white/[0.03] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-3.5 h-3.5" />
                    <span>DuoAudio Desktop Client</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-gray-600" />
                </a>
                <Link
                  to="/troubleshooting"
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-white/[0.03] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-[#9AA7FF]" />
                    <span>Troubleshooting Guide</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Backdrop for Mobile Sidebar Drawer */}
          {mobileSidebarOpen && (
            <div
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            />
          )}

          {/* ===================================================================
              COLUMN 2: Center Main Content Area
              =================================================================== */}
          <main 
            ref={contentAreaRef}
            className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8 lg:py-10 pb-24"
          >
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Section Header */}
              <div className="space-y-3 pb-8 border-b border-white/[0.08]">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#9AA7FF]">
                  <span className="px-2 py-0.5 rounded bg-[#5C6CDB]/20 border border-[#5C6CDB]/30 font-semibold">
                    SECTION {currentArticle.number}
                  </span>
                  <span>/</span>
                  <span className="text-gray-400 uppercase tracking-wider">{currentArticle.subtitle}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-white leading-tight">
                  {currentArticle.title}
                </h1>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans pt-1">
                  {currentArticle.lead}
                </p>
              </div>

              {/* Render Section Topics & Sub-Articles */}
              <div className="space-y-14">
                {currentArticle.sections.map((sec) => (
                  <section 
                    key={sec.id} 
                    id={sec.id} 
                    className="scroll-mt-36 space-y-4"
                  >
                    <div className="flex items-center justify-between group">
                      <h2 className="text-xl sm:text-2xl font-semibold text-gray-100 tracking-tight flex items-center gap-2">
                        <span>{sec.title}</span>
                      </h2>
                      <button
                        onClick={() => handleCopyAnchor(sec.id)}
                        title="Copy link to section"
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded text-gray-500 hover:text-gray-300 transition-opacity"
                      >
                        {copiedAnchor === sec.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Hash className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Section Body */}
                    <div className="text-gray-300 font-sans">
                      {sec.content}
                    </div>
                  </section>
                ))}
              </div>

              {/* Bottom Navigation: Previous & Next Section Buttons */}
              <div className="pt-12 mt-16 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevSection ? (
                  <button
                    onClick={() => handleSelectTopic(prevSection.id, null)}
                    className="p-4 rounded-xl border border-white/[0.08] hover:border-[#5C6CDB]/50 bg-white/[0.02] text-left transition-all group"
                  >
                    <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1 mb-1">
                      <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                      PREVIOUS SECTION
                    </span>
                    <span className="text-sm font-semibold text-gray-200 group-hover:text-white block">
                      {prevSection.number} {prevSection.title}
                    </span>
                  </button>
                ) : <div />}

                {nextSection && (
                  <button
                    onClick={() => handleSelectTopic(nextSection.id, null)}
                    className="p-4 rounded-xl border border-white/[0.08] hover:border-[#5C6CDB]/50 bg-white/[0.02] text-right transition-all group sm:col-start-2"
                  >
                    <span className="text-[10px] font-mono text-gray-500 flex items-center justify-end gap-1 mb-1">
                      NEXT SECTION
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <span className="text-sm font-semibold text-gray-200 group-hover:text-white block">
                      {nextSection.number} {nextSection.title}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </main>

          {/* ===================================================================
              COLUMN 3: Right-Side Table of Contents
              =================================================================== */}
          <aside className="hidden xl:block w-64 shrink-0 py-10 pl-6 border-l border-white/[0.08] sticky top-[105px] h-[calc(100vh-105px)] overflow-y-auto">
            <div className="space-y-4">
              <div className="text-[11px] font-mono tracking-wider uppercase text-gray-500 font-semibold">
                On This Page
              </div>
              <nav className="space-y-2">
                {currentArticle.toc.map((item) => {
                  const isActive = activeAnchorId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelectTopic(activeSectionId, item.id);
                      }}
                      className={`text-xs block font-mono transition-colors leading-relaxed ${
                        isActive
                          ? 'text-[#9AA7FF] font-medium pl-2 border-l-2 border-[#5C6CDB]'
                          : 'text-gray-400 hover:text-gray-200 pl-2 border-l-2 border-transparent'
                      }`}
                    >
                      {item.title}
                    </a>
                  );
                })}
              </nav>

              {/* Community & Feedback Box */}
              <div className="pt-6 border-t border-white/[0.08] space-y-2.5 text-xs text-gray-400 font-mono">
                <a
                  href="https://github.com/Divyanshu0902/DuoAudio/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-gray-400 hover:text-gray-200"
                >
                  <span>Report an Issue</span>
                  <ExternalLink className="w-3 h-3 text-gray-600" />
                </a>
                <a
                  href="https://github.com/Divyanshu0902/DuoAudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-gray-400 hover:text-gray-200"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-gray-600" />
                </a>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
