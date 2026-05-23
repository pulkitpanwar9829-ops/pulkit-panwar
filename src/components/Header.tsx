import React, { useState } from 'react';
import { Search, Globe, Menu, X, Landmark, Compass, FolderHeart, Info, Command } from 'lucide-react';
import { WildlifeSpecies } from '../types';
import { WILDLIFE_DATA } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeSpecies: WildlifeSpecies;
  onSelectSpecies: (speciesId: string) => void;
  scrollSection: (elementId: string) => void;
}

export default function Header({ activeSpecies, onSelectSpecies, scrollSection }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter local species or locations
  const searchResults = searchQuery
    ? WILDLIFE_DATA.filter(
        (sp) =>
          sp.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sp.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sp.biome.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleResultClick = (id: string) => {
    onSelectSpecies(id);
    setSearchQuery('');
    setSearchOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-jungle-950/90 to-jungle-950/0 backdrop-blur-[2px] border-b border-jungle-900/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo - HUMBLE & LITERAL */}
        <div 
          id="header-brand-logo"
          onClick={() => scrollSection('hero-section')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <Landmark className="w-5 h-5 text-[#e28743] group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-display text-lg font-bold uppercase tracking-widest text-[#f4f6f5] group-hover:text-[#e28743] transition-colors duration-300">
            WILDLIFE
          </span>
        </div>

        {/* Navigation items (Center) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-jungle-300">
          <button
            id="nav-hero-btn"
            onClick={() => scrollSection('hero-section')}
            className="hover:text-white transition-colors cursor-pointer relative py-2"
          >
            <span>Reserve Home</span>
            {activeSpecies.id && (
              <motion.span 
                layoutId="active_bullet"
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#e28743]"
              />
            )}
          </button>
          
          <button
            id="nav-telemetry-btn"
            onClick={() => scrollSection('telemetry-section')}
            className="hover:text-white transition-colors cursor-pointer py-2"
          >
            Telemetry & Trails
          </button>

          <button
            id="nav-conservation-btn"
            onClick={() => scrollSection('conservation-section')}
            className="hover:text-white transition-colors cursor-pointer py-2"
          >
            Conservation Hub
          </button>
        </nav>

        {/* Action Widgets (Right) */}
        <div className="flex items-center gap-4">
          {/* Quick Search trigger */}
          <button
            id="search-trigger-btn"
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-lg bg-jungle-950/40 border border-jungle-800 hover:border-jungle-600 text-jungle-300 hover:text-white transition-all cursor-pointer flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline text-[10px] font-mono pr-2">Search Registry</span>
            <span className="hidden sm:inline bg-jungle-800 text-[9px] px-1.5 py-0.5 rounded text-jungle-400 font-sans">
              Ctrl+K
            </span>
          </button>

          <button
            id="nav-globe-widget"
            className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-jungle-400 hover:text-white transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-[#e28743]" />
            <span>UTC +00:00</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-nav-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-jungle-900 border border-jungle-800 text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* --- Intelligent Modal Search Component --- */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-jungle-950 border border-jungle-800 rounded-2xl shadow-2xl relative overflow-hidden"
            >
              {/* Search Bar header */}
              <div className="p-4 border-b border-jungle-800 flex items-center gap-3">
                <Search className="w-5 h-5 text-jungle-400" />
                <input
                  id="species-search-input"
                  type="text"
                  placeholder="Type animal name, region or biome..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-white placeholder-jungle-500 text-sm focus:outline-none"
                  autoFocus
                />
                <button
                  id="close-search-modal-btn"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-1 px-1.5 bg-jungle-900 border border-jungle-800 hover:border-jungle-700 text-[11px] font-mono text-jungle-300 rounded cursor-pointer"
                >
                  ESC
                </button>
              </div>

              {/* Autocomplete items */}
              <div className="p-4 max-h-72 overflow-y-auto">
                {searchQuery ? (
                  searchResults.length > 0 ? (
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-jungle-500 uppercase tracking-wider block mb-1">
                        MATCHING SPECIES FOUND
                      </span>
                      {searchResults.map((sp) => (
                        <button
                          key={sp.id}
                          id={`search-result-item-${sp.id}`}
                          onClick={() => handleResultClick(sp.id)}
                          className="w-full text-left p-3 rounded-lg hover:bg-jungle-900 border border-transparent hover:border-jungle-800/60 flex items-center justify-between gap-4 cursor-pointer transition-all"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white text-sm font-medium">{sp.commonName}</span>
                              <span className="text-[11px] text-jungle-400 italic">({sp.scientificName})</span>
                            </div>
                            <span className="text-xs text-jungle-500 block mt-0.5">{sp.region}</span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-glow/10 border border-amber-glow/20 text-[#e28743]">
                            {sp.status}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-jungle-500">
                      <p className="text-sm">No registered coordinates matching that query.</p>
                      <p className="text-[11px] mt-1 font-mono text-jungle-600">Try "Tiger", "Panther", "Elephant" or "Ghats"</p>
                    </div>
                  )
                ) : (
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-jungle-500 uppercase tracking-wider block">
                      QUICK REGISTRY DIRECTORY
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {WILDLIFE_DATA.map((sp) => (
                        <button
                          key={sp.id}
                          id={`search-directory-item-${sp.id}`}
                          onClick={() => handleResultClick(sp.id)}
                          className="text-left p-2.5 rounded-lg border border-jungle-900 hover:border-jungle-800 bg-jungle-900/40 text-xs text-jungle-300 hover:text-white cursor-pointer transition-all"
                        >
                          <span className="font-medium block">{sp.commonName}</span>
                          <span className="text-[10px] font-mono text-[#e28743]">{sp.index} • {sp.region}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Mobile Dropdown Menu --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-jungle-950 border-b border-jungle-800 absolute top-20 left-0 w-full overflow-hidden"
          >
            <div className="p-6 space-y-4 flex flex-col uppercase font-mono tracking-wider text-xs">
              <button
                id="mobile-nav-hero-btn"
                onClick={() => {
                  scrollSection('hero-section');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-white transition-colors cursor-pointer border-b border-jungle-900"
              >
                Reserve Home
              </button>
              
              <button
                id="mobile-nav-telemetry-btn"
                onClick={() => {
                  scrollSection('telemetry-section');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-white transition-colors cursor-pointer border-b border-jungle-900"
              >
                Telemetry & Trails
              </button>

              <button
                id="mobile-nav-conservation-btn"
                onClick={() => {
                  scrollSection('conservation-section');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-white transition-colors cursor-pointer"
              >
                Conservation Hub
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
