import React from 'react';
import { Mail, ArrowUpRight, Shield, Globe, Terminal, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FooterProps {
  onOpenHireModal: () => void;
  onOpenSqlViewer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenHireModal, onOpenSqlViewer }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="advisory" className="relative z-10 bg-transparent text-white pt-24 pb-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Call to Action Banner */}
        <ScrollReveal>
          <div className="liquid-glass border border-white/20 rounded-2xl p-8 md:p-14 mb-16 relative overflow-hidden shadow-2xl backdrop-blur-xl">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs tracking-widest uppercase text-gray-200 mb-4 shadow-md">
                <Sparkles size={13} className="text-white" />
                Direct Engagement & Hosting
              </div>
              <h3 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Ready to launch your vision with <span className="font-medium">MEKPO Technologies?</span>
              </h3>
              <p className="text-gray-200 text-base md:text-lg mt-4 mb-8 font-light leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                From architecture and database modeling to domain hosting and cloud CI/CD deployment, we build ventures that define the standard.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenHireModal}
                  className="bg-white text-black px-8 py-3.5 rounded-lg font-medium hover:bg-gray-100 transition-all cursor-pointer shadow-lg active:scale-95 transform text-sm md:text-base"
                >
                  Start a Chat / Hire
                </button>

                <a
                  href="mailto:mecreation2026@gmail.com"
                  className="liquid-glass border border-white/25 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 text-sm md:text-base cursor-pointer shadow-md"
                >
                  <Mail size={18} /> mecreation2026@gmail.com
                </a>
                
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Footer Meta & Grid in Liquid Glass Container */}
        <ScrollReveal delay={100}>
          <div className="liquid-glass border border-white/15 rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/15">
              
              {/* Col 1: Brand with Uploaded Logo */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/mevologo.png"
                    alt="MEKPO Technologies Logo"
                    className="h-10 w-auto object-contain drop-shadow-md"
                  />
                  <div>
                    <span className="text-2xl font-semibold tracking-tight text-white block leading-none">MEKPO</span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-300 font-light">
                      Technologies
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm max-w-md font-light leading-relaxed">
                  Engineering full-stack web applications, multi-tenant SaaS platforms, AI-powered automation workflows, and high-concurrency database systems.
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-200 font-mono pt-1">
                  <Mail size={14} className="text-white" />
                  <span>Contact:</span>
                  <a href="mailto:mecreation2026@gmail.com" className="text-white hover:underline">
                    mecreation2026@gmail.com
                  </a>
                </div>
                 <div className="flex items-center gap-2 text-xs text-gray-200 font-mono pt-1">
                  <Globe size={14} className="text-white" />
                  <span>Own :</span>
                  <a href="mailto:mecreation2026@gmail.com" className="text-white hover:underline">
                    Muhilan....
                  </a>
                </div>
              </div>

              {/* Col 2: Navigation */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">
                  Navigation
                </h4>
                <ul className="space-y-2.5 text-sm text-gray-300">
                  <li><a href="#" className="hover:text-white transition-colors">Overview</a></li>
                  <li><a href="#about" className="hover:text-white transition-colors">Story & Philosophy</a></li>
                  <li><a href="#skills" className="hover:text-white transition-colors">Technical Stack</a></li>
                  <li><a href="#projects" className="hover:text-white transition-colors">Featured Projects</a></li>
                  <li><a href="#advisory" className="hover:text-white transition-colors">Advisory & Contact</a></li>
                </ul>
              </div>

              {/* Col 3: Database & Tech */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">
                  Infrastructure
                </h4>
                <ul className="space-y-2.5 text-sm text-gray-300">
                  {/* <li>
                    <button
                      onClick={onOpenSqlViewer}
                      className="hover:text-white transition-colors flex items-center gap-1 text-left cursor-pointer text-gray-300 hover:underline"
                    >
                      Supabase DB Schema <ArrowUpRight size={13} />
                    </button>
                  </li> */}
                  <li>
                    <span className="text-gray-300 text-xs flex items-center gap-1.5">
                      <Globe size={12} /> Custom Domain & Hosting
                    </span>
                  </li>
                  <li>
                    <span className="text-gray-300 text-xs flex items-center gap-1.5">
                      <Shield size={12} /> RBAC & Security Isolation
                    </span>
                  </li>
                  <li>
                    <span className="text-gray-300 text-xs flex items-center gap-1.5">
                      <Terminal size={12} /> CI/CD Automation
                    </span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Bottom Bar */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
              <p>© {currentYear} MEKPO Technologies. All rights reserved.</p>
              <p className="font-mono text-[11px] text-gray-400">Engineered for Visionaries • Seamless Frame Motion Engine</p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </footer>
  );
};
