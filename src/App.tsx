/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Heart, 
  ShieldAlert, 
  Users, 
  Scale, 
  Dna, 
  MapPin, 
  Calendar, 
  Share2, 
  CheckCircle2, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
  Radio,
  Sparkles,
  Award
} from 'lucide-react';
import { WILDLIFE_DATA } from './data';
import { VideoThumbnail, WildlifeSpecies } from './types';
import Header from './components/Header';
import AudioEngine from './components/AudioEngine';
import SafariMap from './components/SafariMap';
import GalleryModal from './components/GalleryModal';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeId, setActiveId] = useState<string>('bengal_tiger');
  const [selectedVideo, setSelectedVideo] = useState<VideoThumbnail | null>(null);
  
  // Volunteer and campaign simulation state
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [volunteerRole, setVolunteerRole] = useState('scout');
  const [isVolunteerSubmitted, setIsVolunteerSubmitted] = useState(false);
  const [volunteerCount, setVolunteerCount] = useState(1482);
  const [campaignSupported, setCampaignSupported] = useState(false);
  const [supportCount, setSupportCount] = useState(8491);

  // Get current active species data
  const activeSpecies = WILDLIFE_DATA.find(s => s.id === activeId) || WILDLIFE_DATA[0];

  // Shortcut key listener for Search panel activation (Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const trigger = document.getElementById('search-trigger-btn');
        if (trigger) trigger.click();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Soft page scroll helper
  const scrollSection = (elementId: string) => {
    const elem = document.getElementById(elementId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Switch between wildlife profiles
  const handleNextSpecies = () => {
    const currentIndex = WILDLIFE_DATA.findIndex(s => s.id === activeId);
    const nextIndex = (currentIndex + 1) % WILDLIFE_DATA.length;
    setActiveId(WILDLIFE_DATA[nextIndex].id);
  };

  const handlePrevSpecies = () => {
    const currentIndex = WILDLIFE_DATA.findIndex(s => s.id === activeId);
    const prevIndex = (currentIndex - 1 + WILDLIFE_DATA.length) % WILDLIFE_DATA.length;
    setActiveId(WILDLIFE_DATA[prevIndex].id);
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerName || !volunteerEmail) return;
    setIsVolunteerSubmitted(true);
    setVolunteerCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#060a09] overflow-hidden text-jungle-200 selection:bg-[#e28743] selection:text-black">
      {/* Immersive Header */}
      <Header 
        activeSpecies={activeSpecies} 
        onSelectSpecies={(id) => setActiveId(id)}
        scrollSection={scrollSection}
      />

      {/* --- SOCIAL / PAGINATION LEFT RAIL --- */}
      <div className="hidden lg:flex flex-col justify-between items-center fixed left-6 top-1/2 -translate-y-1/2 h-[60vh] z-40 py-8 pointer-events-none">
        {/* Pagination Numbers and Slider indicator track */}
        <div className="flex flex-col items-center gap-6 pointer-events-auto">
          {WILDLIFE_DATA.map((sp, idx) => {
            const isActive = sp.id === activeId;
            return (
              <button
                key={sp.id}
                id={`rail-page-indicator-${sp.id}`}
                onClick={() => setActiveId(sp.id)}
                className="group flex flex-col items-center gap-1 cursor-pointer focus:outline-none"
              >
                <span className={`text-[11px] font-mono transition-colors tracking-tight ${
                  isActive ? 'text-white font-bold' : 'text-jungle-600 group-hover:text-jungle-400'
                }`}>
                  {sp.index}
                </span>
                <div className={`w-[2px] transition-all duration-300 ${
                  isActive ? 'h-10 bg-[#e28743]' : 'h-4 bg-jungle-800 group-hover:bg-jungle-600'
                }`}></div>
              </button>
            );
          })}
        </div>

        {/* Minimalist social handles */}
        <div className="flex flex-col items-center gap-5 text-[10px] font-mono tracking-widest text-jungle-500 uppercase pointer-events-auto rotate-[360deg]">
          <a href="https://instagram.com" target="_blank" className="hover:text-[#e28743] transition-colors origin-center cursor-pointer">INSTAGRAM</a>
          <a href="https://facebook.com" target="_blank" className="hover:text-[#e28743] transition-colors origin-center cursor-pointer">FACEBOOK</a>
          <a href="https://youtube.com" target="_blank" className="hover:text-[#e28743] transition-colors origin-center cursor-pointer">YOUTUBE</a>
        </div>
      </div>

      {/* --- HERO SCREEN (REPLICATING SCREENSHOT INTEGRATION) --- */}
      <main id="hero-section" className="relative min-h-screen pt-28 pb-16 flex items-center">
        {/* Dynamic backdrop gradients blending species color palette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(88,113,104,0.12),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full px-6 lg:pl-28 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SIDE: Big species illustration poster & carousel overlays (5 of 12 columns) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl overflow-hidden border border-jungle-800/80 shadow-2xl group shadow-black/80">
              
              {/* Outer corner focus indicators */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#e28743]/50 pointer-events-none z-10"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#e28743]/50 pointer-events-none z-10"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#e28743]/50 pointer-events-none z-10"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#e28743]/50 pointer-events-none z-10"></div>

              {/* Smooth Framer Motion Image Transition */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSpecies.id}
                  src={activeSpecies.image}
                  alt={activeSpecies.commonName}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55 }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </AnimatePresence>

              {/* Status overlay badge */}
              <div className="absolute top-4 left-4 bg-[#060a09]/80 border border-jungle-800 backdrop-blur-sm p-2 px-3 rounded-lg z-10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-red-400 font-bold">
                  {activeSpecies.status}
                </span>
              </div>

              {/* Sensor overlay grid */}
              <div className="absolute bottom-4 right-4 bg-[#060a09]/80 border border-jungle-800 backdrop-blur-sm p-2 px-3 rounded-lg z-10 text-[10px] font-mono text-jungle-400">
                <span>RADAR REF ID: {activeSpecies.index}</span>
              </div>
            </div>

            {/* Quick slide controller beneath picture */}
            <div className="flex items-center gap-4 mt-6">
              <button
                id="hero-prev-btn"
                onClick={handlePrevSpecies}
                className="p-3.5 rounded-full bg-jungle-950 border border-jungle-800 hover:border-jungle-500 hover:text-white transition-all cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono text-jungle-400">
                <span className="text-white font-bold">{activeSpecies.index}</span> / 03
              </span>

              <button
                id="hero-next-btn"
                onClick={handleNextSpecies}
                className="p-3.5 rounded-full bg-jungle-950 border border-jungle-800 hover:border-jungle-500 hover:text-white transition-all cursor-pointer shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Heavy Bold Typography Content (7 of 12 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 lg:pl-4">
            
            {/* Meta classification tags */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-widest text-[#e28743]">
              <span className="uppercase text-xs font-bold font-display">{activeSpecies.scientificName}</span>
              <span className="text-jungle-700">•</span>
              <span className="text-jungle-400">GPS COORDINATES: {activeSpecies.coordinates}</span>
            </div>

            {/* Substantial, compact Display Title from screenshot */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-none uppercase">
              {activeSpecies.bannerTitle}
            </h1>

            {/* Dual columns paragraph body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <p className="text-sm text-jungle-300 leading-relaxed text-justify">
                {activeSpecies.descriptionLeft}
              </p>
              <p className="text-sm text-jungle-400 leading-relaxed text-justify">
                {activeSpecies.descriptionRight}
              </p>
            </div>

            {/* Key Field Stats Block */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-jungle-900">
              <div>
                <span className="text-[10px] font-mono text-jungle-500 block uppercase tracking-wider">Population Status</span>
                <span className="text-lg font-display text-white mt-1 block font-semibold">{activeSpecies.population}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-jungle-500 block uppercase tracking-wider">Natural Biome</span>
                <span className="text-lg font-display text-white mt-1 block font-semibold">{activeSpecies.biome}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono text-jungle-500 block uppercase tracking-wider">Active Territory</span>
                <span className="text-lg font-display text-[#e28743] mt-1 block font-medium">{activeSpecies.region}</span>
              </div>
            </div>

            {/* --- SCREENSHOT EXCLUSIVE: Bottom supplementary video card listings --- */}
            <div className="pt-6">
              <span className="text-[10px] font-mono text-jungle-500 uppercase tracking-widest block mb-3">
                FIELD SENSOR CAPTURES (CLICK TO STREAM DETECTED SPECTRA)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeSpecies.videoThumbnails.map((video) => (
                  <button
                    key={video.id}
                    id={`video-trap-trigger-${video.id}`}
                    onClick={() => setSelectedVideo(video)}
                    className="group relative flex items-center justify-between p-4 bg-jungle-950/60 border border-jungle-900/80 hover:border-[#e28743]/50 rounded-xl cursor-pointer text-left transition-all hover:bg-jungle-900/40 focus:outline-none"
                  >
                    <div className="pr-4 space-y-1">
                      <span className="text-[9px] font-mono text-[#e28743]/70">{video.category.toUpperCase()} FEEDS</span>
                      <h4 className="text-xs text-white font-medium group-hover:text-[#e28743] transition-colors line-clamp-1">
                        {video.title}
                      </h4>
                      <p className="text-[10px] font-mono text-jungle-400">Duration: {video.duration}</p>
                    </div>
                    {/* Play Badge Icon */}
                    <div className="p-2.5 rounded-full bg-jungle-905 border border-jungle-800 group-hover:bg-[#e28743] group-hover:text-black text-jungle-300 transition-all flex-shrink-0">
                      <Eye className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* --- TELEMETRY MAP SECTION --- */}
      <section id="telemetry-section" className="py-20 relative bg-gradient-to-b from-jungle-950/0 via-jungle-950/40 to-jungle-950/0 border-t border-b border-jungle-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:pl-28">
          <div className="mb-10 text-left">
            <span className="inline-block px-2.5 py-1 rounded bg-[#e28743]/10 border border-[#e28743]/20 text-[11px] font-mono text-[#e28743] uppercase tracking-widest">
              Live Reserve Grid
            </span>
            <h2 className="text-3xl font-display text-white font-bold mt-2">
              Habitat Telemetry Map & Active Trails
            </h2>
            <p className="text-sm text-jungle-400 mt-1 max-w-xl">
              Our acoustic field transceivers record ambient animal movements within restricted reservation perimeters. Select checkpoints below to explore logged telemetry records.
            </p>
          </div>

          <SafariMap activeSpecies={activeSpecies} />
        </div>
      </section>

      {/* --- ACOUSTIC FIELD SOUNDSCAPE GENERATOR --- */}
      <section id="acoustic-section" className="py-12 bg-jungle-950/20">
        <div className="max-w-7xl mx-auto px-6 lg:pl-28">
          <AudioEngine activeSpecies={activeSpecies} />
        </div>
      </section>

      {/* --- CONSERVATION DASHBOARD & VOLUNTEER REGISTRY --- */}
      <section id="conservation-section" className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:pl-28">
          <div className="mb-10 text-left">
            <span className="inline-block px-2.5 py-1 rounded bg-[#e28743]/10 border border-[#e28743]/20 text-[11px] font-mono text-[#e28743] uppercase tracking-widest">
              Wildlife Support Portal
            </span>
            <h2 className="text-3xl font-display text-white font-bold mt-2">
              Conservation Hub & Field Ranger Programs
            </h2>
            <p className="text-sm text-jungle-400 mt-1 max-w-xl">
              Fostering ecological stability through digital camera traps, corridor re-vegetation, and dedicated acoustic patrol squad teams.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Dashboard metrics (Bento block 1) */}
            <div className="bg-jungle-950/30 border border-jungle-800/80 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-jungle-500 uppercase">Field Metrics</span>
                <h3 className="text-lg font-display text-white font-medium mt-1">Reserve Overview</h3>
                
                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-between p-3.5 bg-jungle-900/40 rounded-xl border border-jungle-900/60">
                    <div className="flex items-center gap-2.5">
                      <ShieldAlert className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-sans text-jungle-300">Protected Habitat</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">124,000 Ha</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-jungle-900/40 rounded-xl border border-jungle-900/60">
                    <div className="flex items-center gap-2.5">
                      <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                      <span className="text-xs font-sans text-jungle-300">Camera Trap Nodes</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">418 Active</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-jungle-900/40 rounded-xl border border-jungle-900/60">
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-sans text-jungle-300">Rangers on Patrol</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">1,500 Squads</span>
                  </div>
                </div>
              </div>

              {/* Action Campaign supporter widget */}
              <div className="pt-6 mt-6 border-t border-jungle-900/50 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-zinc-400 block font-sans">Support Corridor Project</span>
                  <span className="text-[10px] font-mono text-jungle-500">Currently supported by {supportCount} explorers</span>
                </div>
                <button
                  id="campaign-support-btn"
                  onClick={() => {
                    if (campaignSupported) return;
                    setCampaignSupported(true);
                    setSupportCount(prev => prev + 1);
                  }}
                  className={`p-2 px-3 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                    campaignSupported 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                      : 'bg-[#e28743] hover:bg-[#d07332] border-[#e28743] text-black hover:text-black font-semibold'
                  }`}
                >
                  {campaignSupported ? '✓ Backed' : 'Support'}
                </button>
              </div>
            </div>

            {/* Campaign Fact Box (Bento block 2) */}
            <div className="bg-jungle-950/30 border border-jungle-800/80 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-jungle-500 uppercase">Field Guide Insights</span>
                <h3 className="text-lg font-display text-white font-medium mt-1">Species Anatomy & Biology</h3>
                
                <div className="mt-4 space-y-3">
                  {activeSpecies.additionalFacts.map((fact, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-jungle-400 bg-jungle-900/20 p-3 rounded-lg border border-jungle-900/30">
                      <span className="text-[#e28743] font-mono">0{idx + 1}</span>
                      <p className="leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-jungle-900/50 text-[11px] font-mono text-[#e28743] flex items-center justify-between">
                <span>CLASSIFICATION ID: CH-R-03</span>
                <button 
                  id="external-iucn-link-btn"
                  onClick={() => alert(`Redirecting to international biological catalog databases to view ${activeSpecies.commonName} papers...`)} 
                  className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors"
                >
                  <span>IUCN Red List Papers</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Volunteer Form (Bento block 3) */}
            <div className="bg-jungle-950/30 border border-jungle-800/80 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Users className="w-24 h-24 text-[#e28743]" />
              </div>

              <div className="relative z-10">
                <span className="text-[10px] font-mono text-[#e28743] uppercase tracking-widest block mb-1">
                  Enlist Today ({volunteerCount} Registered)
                </span>
                <h3 className="text-lg font-display text-white font-medium">
                  Register Simulated Volunteer Patrol
                </h3>
                <p className="text-xs text-jungle-400 mt-1">
                  Enlist your name below to volunteer for virtual forest conservation logs and help test local field monitoring systems.
                </p>

                {isVolunteerSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mt-6 text-center space-y-3"
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <div>
                      <h4 className="text-sm font-display text-white font-semibold">Registration Completed!</h4>
                      <p className="text-[11px] text-emerald-300 mt-1">
                        Welcome to the patrol roster, Ranger {volunteerName}. Your telemetry test credential has been logged.
                      </p>
                    </div>
                    <button
                      id="reset-volunteer-form-btn"
                      onClick={() => {
                        setIsVolunteerSubmitted(false);
                        setVolunteerName('');
                        setVolunteerEmail('');
                      }}
                      className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-[10px] font-mono uppercase text-white rounded transition-all cursor-pointer"
                    >
                      Enlist Another Name
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleVolunteerSubmit} className="space-y-3.5 mt-6">
                    <div>
                      <label className="text-[10px] font-mono text-jungle-400 uppercase tracking-widest block mb-1">Full Name</label>
                      <input
                        id="volunteer-name-input"
                        type="text"
                        required
                        placeholder="e.g. Alexis Carter"
                        value={volunteerName}
                        onChange={(e) => setVolunteerName(e.target.value)}
                        className="w-full bg-jungle-950/70 border border-jungle-800 focus:border-jungle-500 text-xs p-2.5 rounded-lg text-white focus:outline-none focus:ring-0 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-jungle-400 uppercase tracking-widest block mb-1">Email Address</label>
                      <input
                        id="volunteer-email-input"
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={volunteerEmail}
                        onChange={(e) => setVolunteerEmail(e.target.value)}
                        className="w-full bg-jungle-950/70 border border-jungle-800 focus:border-jungle-500 text-xs p-2.5 rounded-lg text-white focus:outline-none focus:ring-0 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-jungle-400 uppercase tracking-widest block mb-1">Select Field Role</label>
                      <select
                        id="volunteer-role-select"
                        value={volunteerRole}
                        onChange={(e) => setVolunteerRole(e.target.value)}
                        className="w-full bg-jungle-950/70 border border-jungle-800 focus:border-jungle-500 text-xs p-2.5 rounded-lg text-white focus:outline-none focus:ring-0 transition-colors cursor-pointer"
                      >
                        <option value="scout">Acoustic Scout Patrol</option>
                        <option value="sensor">Field Sensor Maintenance</option>
                        <option value="data">Wildlife Biometric Analyst</option>
                      </select>
                    </div>

                    <button
                      id="volunteer-submit-btn"
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-[#e28743] hover:bg-[#d07332] text-black font-semibold text-xs font-mono transition-all duration-300 uppercase cursor-pointer"
                    >
                      Enlist to Patrol Squad
                    </button>
                  </form>
                )}
              </div>

              <div className="text-[9px] font-mono text-jungle-600 mt-4 pt-4 border-t border-jungle-900">
                <span>SIMULATION NODE ONLY. NO SENSITIVE PERSONAL DATA REQUESTED.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FOOTER CARD --- */}
      <footer className="bg-jungle-950 border-t border-jungle-900 mt-20 py-12 text-center text-xs text-jungle-500 relatve z-20">
        <div className="max-w-7xl mx-auto px-6 lg:pl-28 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#e28743]" />
            <span className="font-display font-medium text-[#c6d0cc] uppercase tracking-wider">Wildlife Exploration Portal</span>
          </div>
          
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <button onClick={() => scrollSection('hero-section')} className="hover:text-white transition-colors cursor-pointer">Back to Top</button>
            <span>•</span>
            <span>Security Rules: Active</span>
            <span>•</span>
            <span>System Epoch: 2026</span>
          </div>

          <p className="font-mono text-[10px]">
            © {new Date().getFullYear()} Forest Preservation Hub. All virtual boundaries protected.
          </p>
        </div>
      </footer>

      {/* Camera-trap Video Player/Spectra Modal Overlay */}
      <AnimatePresence>
        {selectedVideo && (
          <GalleryModal
            video={selectedVideo}
            species={activeSpecies}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
