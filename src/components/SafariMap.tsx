import React, { useState } from 'react';
import { Compass, ShieldCheck, MapPin, Map, TriangleAlert, Eye, Server, Radio } from 'lucide-react';
import { WildlifeSpecies } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface SafariMapProps {
  activeSpecies: WildlifeSpecies;
}

export default function SafariMap({ activeSpecies }: SafariMapProps) {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(0);

  const activePointData = selectedPoint !== null ? activeSpecies.trailPoints[selectedPoint] : null;

  return (
    <div id="virtual-safari-map" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Interactive Map Visual (2/3 columns on wide screen) */}
      <div className="lg:col-span-2 bg-jungle-950/40 border border-jungle-800/85 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between relative overflow-hidden">
        {/* Background Coordinates Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#12211b_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-25 pointer-events-none"></div>

        <div className="flex items-center justify-between gap-4 mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#e28743]/10 border border-[#e28743]/20 rounded-lg">
              <Compass className="w-4 h-4 text-[#e28743]" />
            </div>
            <div>
              <h4 className="text-sm font-display text-white font-medium uppercase tracking-wider">
                Telemetry & Trail Corridor Map
              </h4>
              <p className="text-[11px] font-mono text-jungle-500">
                REGIONAL REGISTRY: {activeSpecies.region} • {activeSpecies.coordinates}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-jungle-900 border border-jungle-800 text-[10px] font-mono text-jungle-400">
              <Radio className="w-3 h-3 text-red-500 animate-pulse" />
              <span>SENSORS ONLINE</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-amber-glow/10 border border-amber-glow/20 text-[#e28743]">
              Difficulty: {activeSpecies.trailDifficulty}
            </span>
          </div>
        </div>

        {/* SVG Interactive Canvas */}
        <div className="relative w-full aspect-[16/9] bg-jungle-950/80 rounded-xl border border-jungle-900/60 flex items-center justify-center overflow-hidden my-2 group">
          {/* Subtle geographical height lines inside map background using SVG */}
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none text-jungle-400" xmlns="http://www.w3.org/1999/svg">
            <path d="M-10,40 Q80,20 180,95 T380,40 T580,120 T780,50 T980,150 T1180,80" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M-20,90 Q90,70 200,165 T420,80 T610,180 T800,110 T1010,210 T1220,130" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" />
            <path d="M-5,160 Q110,130 240,240 T460,170 T680,270 T890,190 T1090,300 T1290,210" fill="none" stroke="currentColor" strokeWidth="1" />
            {/* Grid axis labels */}
            <text x="12" y="24" fontSize="8" fontFamily="monospace" fill="currentColor">0°00' - GRID REF</text>
            <text x="12" y="94%" fontSize="8" fontFamily="monospace" fill="currentColor">RESTRICTED SPECIES CORRIDOR</text>
          </svg>

          {/* Draw connecting route path between active trail points */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d={activeSpecies.trailPoints.map((p, idx) => 
                `${idx === 0 ? 'M' : 'L'} ${p.x}% ${p.y}%`
              ).join(' ')}
              fill="none"
              stroke="#e28743"
              strokeWidth="2"
              strokeDasharray="6,4"
              className="opacity-40"
            />
          </svg>

          {/* Interactive Plot Nodes */}
          {activeSpecies.trailPoints.map((pt, idx) => {
            const isSelected = selectedPoint === idx;
            return (
              <button
                key={idx}
                id={`map-node-trigger-${idx}`}
                onClick={() => setSelectedPoint(idx)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 focus:outline-none"
                style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
              >
                {/* Node animation ripples */}
                <div className="relative">
                  {isSelected && (
                    <motion.div 
                      layoutId="pulsing_ring"
                      className="absolute -inset-4 rounded-full border border-amber-glow opacity-60"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isSelected 
                      ? 'bg-[#e28743] text-black border-[#e28743] scale-110 shadow-lg shadow-amber-glow/20' 
                      : 'bg-jungle-950 text-[#e28743] hover:text-white border-jungle-700 hover:border-[#e28743]'
                  }`}>
                    <span className="text-[10px] font-mono font-bold">{idx + 1}</span>
                  </div>
                </div>
                
                {/* Embedded quick absolute tooltips */}
                <span className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-jungle-950/95 border border-jungle-800 text-[9px] text-[#c6d0cc] px-1.5 py-0.5 rounded whitespace-nowrap shadow-md opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                  {pt.name}
                </span>
              </button>
            );
          })}

          {/* Compass Rose graphics in bottom-right/top-right */}
          <div className="absolute right-4 bottom-4 w-12 h-12 rounded-full border border-jungle-800/40 flex items-center justify-center opacity-40">
            <Compass className="w-6 h-6 text-jungle-500 animate-spin" style={{ animationDuration: '60s' }} />
          </div>
        </div>

        {/* Trail Overview bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-2 text-xs text-jungle-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#e28743]" /> {activeSpecies.trailPoints.length} Patrol Stations</span>
            <span className="text-jungle-700">|</span>
            <span className="text-jungle-300">Target Area: {activeSpecies.biome}</span>
          </div>
          <span>Select nodes (1-{activeSpecies.trailPoints.length}) above to overlay logs</span>
        </div>
      </div>

      {/* Node description details panel (1/3 columns on wide screen) */}
      <div className="bg-jungle-950/70 border border-jungle-800/80 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1 px-1.5 bg-jungle-905 border border-jungle-800 text-[10px] font-mono text-jungle-400 rounded">
              NODE LOGS
            </span>
            <h4 className="text-xs uppercase font-mono tracking-wider text-jungle-300">
              Station Signal Feed
            </h4>
          </div>

          <AnimatePresence mode="wait">
            {activePointData ? (
              <motion.div
                key={selectedPoint}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div>
                  <span className="text-xs text-[#e28743] font-mono font-medium">Checkpoint 0{selectedPoint! + 1}</span>
                  <h3 className="text-xl font-display text-white font-medium mt-0.5">
                    {activePointData.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-jungle-400 font-mono mt-1">
                    <Server className="w-3.5 h-3.5 text-jungle-500" />
                    <span>ACOUSTIC FIELD TRANSCEIVER</span>
                  </div>
                </div>

                <div className="p-3.5 bg-jungle-900/60 border border-jungle-800/40 rounded-xl">
                  <span className="text-[10px] font-mono tracking-widest text-[#e28743] block mb-1">
                    LOGGED TELEMETRY
                  </span>
                  <p className="text-xs text-jungle-300 leading-relaxed font-sans">
                    {activePointData.info}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-jungle-500 block">SYSTEM DIAGNOSTIC</span>
                  <div className="flex items-center justify-between text-[11px] font-mono bg-jungle-950 border border-jungle-900/50 rounded-lg p-2 px-3">
                    <span className="text-jungle-400">Signal Status</span>
                    <span className="text-green-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                      98.4% Nominal
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono bg-jungle-950 border border-jungle-900/50 rounded-lg p-2 px-3">
                    <span className="text-jungle-400">Solar Battery</span>
                    <span className="text-jungle-300">84.2% (Charging)</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12 text-jungle-500">
                <TriangleAlert className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">No active telemetry station node selected.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Trail safety notice */}
        <div className="pt-4 border-t border-jungle-900 mt-6 flex items-start gap-2.5 text-[11px] text-jungle-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
          <span>
            Strict forest boundaries monitored dynamically. All virtual explorers are advised to stay clear of restricted buffer zones.
          </span>
        </div>
      </div>
    </div>
  );
}
