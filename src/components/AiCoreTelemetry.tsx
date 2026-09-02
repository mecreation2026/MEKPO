import React from 'react';
import { ArrowUpRight, Cpu, Sparkles } from 'lucide-react';

interface AiCoreTelemetryProps {
  onOpenHireModal: () => void;
}

export const AiCoreTelemetry: React.FC<AiCoreTelemetryProps> = ({ onOpenHireModal }) => {
  return (
    <div
      className="relative group transition-all duration-500 animate-float-gentle"
    >
      {/* Ambient Dark Diffusion Backdrop (100% Conceals Frame Watermark) */}
      <div className="absolute -inset-4 bg-radial from-black/95 via-black/80 to-transparent blur-xl pointer-events-none -z-10" />
      <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-2xl blur-sm -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main Liquid Glass Telemetry Card */}
      <div className="liquid-glass bg-black/90 border border-white/25 hover:border-white/45 rounded-2xl p-4 sm:p-5 shadow-[0_15px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-all duration-300 w-full sm:w-[320px] md:w-[350px]">
        
        {/* Top Row: Holographic Reactor + Live Status */}
        <div className="flex items-center justify-between gap-3 mb-3.5">
          
          {/* Holographic Concentric Orbital Reactor Core */}
          <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
            {/* Outer Rotating Dashed Ring */}
            <svg className="absolute inset-0 w-full h-full animate-spin-slow text-white/35" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="4 6"
              />
            </svg>

            {/* Inner Counter-Rotating Ring with Nodes */}
            <svg className="absolute inset-1.5 w-9 h-9 animate-spin-reverse-slow text-white/50" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="18 10"
              />
              <circle cx="18" cy="2" r="2" fill="white" className="drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
              <circle cx="18" cy="34" r="1.5" fill="white" />
            </svg>

            {/* Glowing Core Icon */}
            <div className="relative w-6 h-6 rounded-full bg-white/15 border border-white/40 flex items-center justify-center animate-pulse-glow shadow-[0_0_12px_rgba(255,255,255,0.5)]">
              <Cpu size={13} className="text-white" />
            </div>
          </div>

          {/* Status Badge & Latency Telemetry */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[11px] font-mono font-medium text-emerald-300 tracking-wider uppercase">
                MEKPO Core • Active
              </span>
            </div>
            
            <p className="text-xs text-gray-300 font-light truncate">
              Investing. Building. Achieve.
            </p>
          </div>

          {/* Live Waveform Equalizer */}
          <div className="flex items-end gap-0.5 h-4 px-1 py-0.5 rounded bg-white/5 border border-white/10 shrink-0">
            <span className="w-0.5 bg-emerald-400 rounded-full animate-eq-1" />
            <span className="w-0.5 bg-white rounded-full animate-eq-2" />
            <span className="w-0.5 bg-emerald-400 rounded-full animate-eq-3" />
            <span className="w-0.5 bg-white rounded-full animate-eq-4" />
            <span className="w-0.5 bg-emerald-400 rounded-full animate-eq-5" />
          </div>

        </div>

        {/* Live Metrics Ticker Bar */}
        <div className="grid grid-cols-3 gap-2 py-2 px-2.5 rounded-lg bg-black/60 border border-white/10 text-center mb-3">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-mono">Throughput</span>
            <span className="text-[11px] font-medium text-white font-mono">99.9% Up</span>
          </div>
          <div className="border-x border-white/10">
            <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-mono">Response</span>
            <span className="text-[11px] font-medium text-emerald-300 font-mono">12ms</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-mono">Architecture</span>
            <span className="text-[11px] font-medium text-white font-mono">Multi-Tenant</span>
          </div>
        </div>

        {/* Interactive Action Button to Trigger Hire / Chat */}
        <button
          onClick={onOpenHireModal}
          className="w-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/25 hover:border-white py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 flex items-center justify-between group/btn cursor-pointer shadow-md"
        >
          <span className="flex items-center gap-1.5 font-sans">
            <Sparkles size={12} className="text-white group-hover/btn:text-black transition-colors" />
            Initiate Project Inquiry
          </span>
          <ArrowUpRight size={13} className="transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>

      </div>
    </div>
  );
};
