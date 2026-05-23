import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Moon, ShieldAlert, Sparkles } from 'lucide-react';
import { WildlifeSpecies } from '../types';

interface AudioEngineProps {
  activeSpecies: WildlifeSpecies;
}

export default function AudioEngine({ activeSpecies }: AudioEngineProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isSynthesized, setIsSynthesized] = useState(false);

  // Web Audio Nodes
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const windGainRef = useRef<GainNode | null>(null);
  const synthGainRef = useRef<GainNode | null>(null);
  
  // Oscillators and Noise Nodes
  const windNoiseRef = useRef<AudioBufferSourceNode | null>(null);
  const animalOscRef = useRef<OscillatorNode | null>(null);
  const tremoloOscRef = useRef<OscillatorNode | null>(null);

  // Initialize Web Audio API
  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // --- 1. Wind Synthesizer (Filtered White Noise) ---
      const bufferSize = ctx.sampleRate * 2; // 2 seconds
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const windSource = ctx.createBufferSource();
      windSource.buffer = noiseBuffer;
      windSource.loop = true;

      // Filter to create warm forest rustlings
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, ctx.currentTime);
      filter.Q.setValueAtTime(2, ctx.currentTime);

      // Low Frequency Oscillator to modulate forest wind intensity
      const windLFO = ctx.createOscillator();
      windLFO.frequency.setValueAtTime(0.12, ctx.currentTime); // 12 seconds swell
      const windLFOGain = ctx.createGain();
      windLFOGain.gain.setValueAtTime(120, ctx.currentTime); // Fluctuate filter between 130Hz and 370Hz
      
      windLFO.connect(windLFOGain);
      windLFOGain.connect(filter.frequency);
      windLFO.start();

      const windGain = ctx.createGain();
      windGain.gain.setValueAtTime(0.3, ctx.currentTime);

      windSource.connect(filter);
      filter.connect(windGain);
      windGain.connect(masterGain);
      
      windSource.start();
      windNoiseRef.current = windSource;
      windGainRef.current = windGain;

      // --- 2. Low Animal Rumble/Purr Synthesizer ---
      const animalOsc = ctx.createOscillator();
      animalOsc.type = 'sine';
      animalOsc.frequency.setValueAtTime(activeSpecies.ambientFrequency, ctx.currentTime);

      // Rhythmic tremolo to mimic organic respiration or growl rumbles
      const tremoloOsc = ctx.createOscillator();
      tremoloOsc.type = 'sine';
      // Low rumble/growl fluctuates faster for panthers, slower for elephants
      const speed = activeSpecies.id === 'black_panther' ? 8 : activeSpecies.id === 'bengal_tiger' ? 5 : 2;
      tremoloOsc.frequency.setValueAtTime(speed, ctx.currentTime);

      const tremoloGain = ctx.createGain();
      tremoloGain.gain.setValueAtTime(0.5, ctx.currentTime); // Fluctuate 50% volume

      const synthGain = ctx.createGain();
      synthGain.gain.setValueAtTime(0.6, ctx.currentTime);

      // Hook up tremolo to control the synthesizer gain level
      tremoloOsc.connect(tremoloGain);
      // Tremolo offset to prevent negative/full silence clipping
      const tremoloOffset = ctx.createGain();
      tremoloOffset.gain.setValueAtTime(0.5, ctx.currentTime);
      
      // Complete dry signal connect
      animalOsc.connect(synthGain);
      synthGain.connect(masterGain);

      animalOsc.start();
      tremoloOsc.start();

      animalOscRef.current = animalOsc;
      tremoloOscRef.current = tremoloOsc;
      synthGainRef.current = synthGain;

      setIsSynthesized(true);
    } catch (e) {
      console.error("Failed to start forest sound synthesizer:", e);
    }
  };

  // Adjust volume levels
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(volume * 0.4, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Adjust frequencies when active species shifts
  useEffect(() => {
    if (audioCtxRef.current && animalOscRef.current && tremoloOscRef.current) {
      const time = audioCtxRef.current.currentTime;
      animalOscRef.current.frequency.exponentialRampToValueAtTime(activeSpecies.ambientFrequency, time + 0.8);
      
      const speed = activeSpecies.id === 'black_panther' ? 8 : activeSpecies.id === 'bengal_tiger' ? 14 : 3.5;
      tremoloOscRef.current.frequency.setValueAtTime(speed, time);
    }
  }, [activeSpecies]);

  // Handle Playback State
  const toggleSound = () => {
    if (!audioCtxRef.current) {
      initAudio();
      setIsPlaying(true);
      return;
    }

    if (isPlaying) {
      audioCtxRef.current.suspend();
      setIsPlaying(false);
    } else {
      audioCtxRef.current.resume();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup Web Audio Context on unmount
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div 
      id="forest-audio-card"
      className="bg-jungle-950/70 border border-jungle-800/80 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden transition-all duration-300"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Moon className="w-16 h-16 text-jungle-300" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-glow animate-pulse"></span>
            <span className="text-xs uppercase font-mono tracking-widest text-[#e28743]">Ambient Forest Engine</span>
          </div>
          <h4 className="text-lg font-display text-white font-medium">
            Virtual Bioacoustic Field Monitor
          </h4>
          <p className="text-xs text-jungle-400 mt-1 max-w-md">
            Synthesizes interactive jungle wind and an acoustic {activeSpecies.commonName} sub-bass rumble ({activeSpecies.ambientFrequency}Hz). Perfect for deep ambient focus.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            id="audio-synth-toggle-btn"
            onClick={toggleSound}
            className={`px-5 py-3 rounded-lg font-display text-sm font-medium transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
              isPlaying 
                ? 'bg-[#e28743] hover:bg-[#d07332] text-black border-[#e28743]' 
                : 'bg-jungle-900 border-jungle-700 hover:border-jungle-500 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Ambient: Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-jungle-400" />
                <span>Ambient: Muted</span>
              </>
            )}
          </button>

          {/* Silder volume control */}
          <div className="flex items-center gap-2 min-w-[124px]">
            <VolumeX className="w-3.5 h-3.5 text-jungle-500" />
            <input
              id="bioacoustic-volume-range"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1 bg-jungle-800 rounded-lg appearance-none cursor-pointer accent-[#e28743] focus:outline-none"
            />
            <Volume2 className="w-3.5 h-3.5 text-jungle-300" />
          </div>
        </div>
      </div>

      {/* Visualizer bars */}
      <div className="mt-5 pt-4 border-t border-jungle-900 flex items-center justify-between gap-4">
        <div className="flex items-end gap-1 h-8">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-t transition-all ${
                isPlaying 
                  ? 'bg-gradient-to-t from-jungle-700 via-jungle-400 to-[#e28743]' 
                  : 'bg-jungle-800'
              } ${
                isPlaying 
                  ? i % 4 === 0 
                    ? 'animate-wave-0' 
                    : i % 4 === 1 
                    ? 'animate-wave-1' 
                    : i % 4 === 2 
                    ? 'animate-wave-2' 
                    : 'animate-wave-3' 
                  : 'h-1.5'
              }`}
              style={{
                height: isPlaying ? 'auto' : '6px',
                animationDuration: isPlaying ? `${0.5 + (i % 5) * 0.25}s` : undefined
              }}
            ></div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-jungle-500">
          <Sparkles className="w-3.5 h-3.5 text-[#e28743]/70 animate-pulse" />
          <span>REAL-TIME BIND: {activeSpecies.ambientFrequency}Hz BIO-OSCILLATOR</span>
        </div>
      </div>
    </div>
  );
}
