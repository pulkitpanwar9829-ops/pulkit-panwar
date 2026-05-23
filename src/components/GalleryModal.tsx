import React, { useState, useEffect } from 'react';
import { Play, Pause, X, Radio, Eye, RefreshCw, Calendar, Download } from 'lucide-react';
import { VideoThumbnail, WildlifeSpecies } from '../types';
import { motion } from 'motion/react';

interface GalleryModalProps {
  video: VideoThumbnail;
  species: WildlifeSpecies;
  onClose: () => void;
}

export default function GalleryModal({ video, species, onClose }: GalleryModalProps) {
  const [playbackActive, setPlaybackActive] = useState(true);
  const [progress, setProgress] = useState(15); // Starting progress percentage
  const [sensorNoise, setSensorNoise] = useState<number[]>([]);

  // Periodically generate simulated noise arrays for telemetry signals
  useEffect(() => {
    const generateNoise = () => {
      const arr = [];
      for (let i = 0; i < 8; i++) {
        arr.push(Math.random() * 100);
      }
      setSensorNoise(arr);
    };
    generateNoise();
    const interval = setInterval(generateNoise, 600);
    return () => clearInterval(interval);
  }, []);

  // Update virtual audio/video scrubber frame-timer
  useEffect(() => {
    if (!playbackActive) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [playbackActive]);

  // Convert progress percentage back to a clean string timestamp
  const calculateTimestamp = () => {
    const totalParts = video.duration.split(':');
    const totalSecs = parseInt(totalParts[0]) * 60 + parseInt(totalParts[1]);
    const currentSecs = Math.round((progress / 100) * totalSecs);
    
    const minutes = Math.floor(currentSecs / 60);
    const seconds = currentSecs % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div 
        id="camera-trap-monitor-overlay"
        className="w-full max-w-4xl bg-jungle-950 border border-jungle-800 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col lg:grid lg:grid-cols-3"
      >
        {/* Main Video Viewport (Left Side - 2 Cols) */}
        <div className="lg:col-span-2 bg-black relative flex flex-col justify-between aspect-video lg:aspect-auto min-h-[320px]">
          {/* Top telemetry bar */}
          <div className="absolute top-0 left-0 w-full p-4 flex items-center justify-between text-[11px] font-mono text-zinc-400 bg-gradient-to-b from-black/80 to-transparent z-10 z-index-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-white tracking-widest uppercase">REC TRAP #{video.id.toUpperCase()}</span>
            </div>
            <span>BIOME GRID: {species.coordinates}</span>
          </div>

          {/* Center visual video simulator */}
          <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-jungle-900/10">
            {/* Overlay grid scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] pointer-events-none opacity-45"></div>

            {/* Content Display based on the category */}
            <div className="text-center space-y-4 px-6 select-none z-10 relative">
              <span className="text-xs font-mono uppercase tracking-widest text-[#e28743] bg-[#e28743]/10 px-3 py-1 rounded-full border border-[#e28743]/20">
                STATION FEED LOG
              </span>
              <h2 className="text-xl md:text-3xl font-display text-white mt-1">
                {video.title}
              </h2>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto font-mono">
                Source: Infrared Motion Activated Sensor Unit 4B • Region {species.region}
              </p>

              {/* Simulated active animal footprint silhouette */}
              <div className="flex items-center justify-center gap-2 py-4">
                <span className="text-[10px] font-mono text-jungle-500 uppercase tracking-widest animate-pulse">
                  {playbackActive ? 'STREAMING REAL-TIME FRAME BUFFER' : 'PAUSED BUFFER VIEW'}
                </span>
              </div>
            </div>

            {/* Static background bokeh elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(88,113,104,0.15),transparent_60%)]"></div>
          </div>

          {/* Scrubber and controls base log */}
          <div className="p-4 bg-gradient-to-t from-black to-transparent z-10">
            <div className="flex items-center justify-between gap-4 text-xs font-mono text-zinc-400 mb-2">
              <span>{calculateTimestamp()}</span>
              <span>{video.duration}</span>
            </div>

            <div 
              className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden cursor-pointer mb-4 relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = clickX / rect.width;
                setProgress(ratio * 100);
              }}
            >
              <div 
                className="h-full bg-[#e28743] transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  id="vp-play-pause-btn"
                  onClick={() => setPlaybackActive(!playbackActive)}
                  className="p-2 rounded-full bg-[#e28743] hover:bg-[#d07332] text-black transition-all cursor-pointer"
                >
                  {playbackActive ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
                </button>
                <div className="text-[11px] font-mono text-zinc-400">
                  <span>ISO 1600 • 30 FPS • F/2.8</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] font-mono text-emerald-500 uppercase">Acoustic Auto-ID Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Metadata Panel (Right Side - 1 Col) */}
        <div className="p-6 bg-jungle-950 border-t lg:border-t-0 lg:border-l border-jungle-800/80 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-mono text-xs text-[#e28743]">
                <Radio className="w-3.5 h-3.5" />
                <span>SPECIMEN ANALYSIS</span>
              </div>
              <button
                id="close-camera-trap-modal-btn"
                onClick={onClose}
                className="p-1 rounded bg-jungle-900 border border-jungle-800 hover:border-jungle-700 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <span className="text-[10px] font-mono text-jungle-500 uppercase">Target Taxonomy ID</span>
              <h3 className="text-lg font-display text-white font-medium mt-0.5">{species.commonName}</h3>
              <p className="text-xs font-mono text-jungle-400 italic">{species.scientificName}</p>
            </div>

            {/* Visualizer Noise Bars */}
            <div className="space-y-2 p-4 bg-jungle-900/40 rounded-xl border border-jungle-900">
              <span className="text-[10px] font-mono text-jungle-400 block uppercase tracking-wider">Field Sensor Spectrogram</span>
              <div className="flex items-end gap-1.5 h-10 pt-2">
                {sensorNoise.map((val, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-gradient-to-t from-jungle-800 to-[#e28743] rounded-t transition-all duration-300"
                    style={{ height: `${playbackActive ? val : 10}%` }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between text-[9px] font-mono text-jungle-500">
                <span>0.1 kHz</span>
                <span>8.0 kHz (Ultrasonic)</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-jungle-900">
                <span className="text-jungle-500 font-mono">Date Logged</span>
                <span className="font-mono text-zinc-300">May 23, 2026</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-b-jungle-900">
                <span className="text-jungle-500 font-mono">Confidence Level</span>
                <span className="font-mono text-green-500 font-bold">99.1% (Match)</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-jungle-500 font-mono">Biometric Tag</span>
                <span className="font-mono text-zinc-300">WLD-PTG-{species.index}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-jungle-900">
            <button
              id="download-field-data-btn"
              onClick={() => alert(`Biometric registry logs for ${species.commonName} exported successfully to logs/camera-trap-${video.id}.csv`)}
              className="w-full py-2.5 rounded-lg bg-jungle-900 border border-jungle-800 hover:border-jungle-700 text-xs font-mono font-medium text-white hover:text-[#e28743] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Diagnostic Telemetry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
