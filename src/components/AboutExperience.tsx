import React from 'react';
import { Layers, ShieldCheck, Cpu, Database, Zap, Code2, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const AboutExperience: React.FC = () => {
  const highlights = [
    {
      icon: Cpu,
      title: 'Full-Stack Architecture',
      desc: 'High-throughput backend APIs, microservices, and reactive modern frontends built for scale.'
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Security & RBAC',
      desc: 'Multi-tenant isolation, role-based access control, audit logging, and modern auth protocols.'
    },
    {
      icon: Database,
      title: 'Data-Driven Systems',
      desc: 'Precision relational schema design with PostgreSQL & SQLite, ORM optimization, and caching pipelines.'
    },
    {
      icon: Zap,
      title: 'AI & Automation Pipelines',
      desc: 'Applied AI implementations with GPT intelligence, predictive models, and real-time event triggers.'
    }
  ];

  return (
    <section id="about" className="relative z-10 py-32 px-6 md:px-12 lg:px-16 bg-transparent">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass border border-white/20 text-xs tracking-widest uppercase text-gray-200 mb-4 shadow-xl backdrop-blur-md">
                <Sparkles size={13} className="text-white" />
                Story & Engineering Philosophy
              </div>
              <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Architecting resilient digital systems with <span className="font-medium text-white">purpose and speed.</span>
              </h2>
            </div>
            <p className="text-gray-200 text-sm md:text-base max-w-md font-light leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
              MEKPO Technologies engineers scalable SaaS platforms, intelligent AI systems, and robust full-stack applications.
            </p>
          </div>
        </ScrollReveal>

        {/* Narrative Description Card */}
        <ScrollReveal delay={150}>
          <div className="liquid-glass border border-white/20 rounded-2xl p-8 md:p-12 mb-16 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-5 text-gray-100 text-base md:text-lg leading-relaxed font-light">
                <p className="drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
                  Extensive experience developing high-performance <strong className="text-white font-medium">backend APIs</strong>, responsive modern frontend applications, database-driven systems, and multi-tenant <strong className="text-white font-medium">SaaS platforms</strong>.
                </p>
                <p className="drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
                  Deep hands-on proficiency with <span className="text-white font-medium">Python, Django, Flask, FastAPI, React.js, TypeScript, PostgreSQL, SQLite, and REST APIs</span>. Strong focus on clean, maintainable architecture, modular components, seamless third-party API integration, robust testing, and cloud deployment pipelines.
                </p>
                <p className="text-sm text-gray-300 pt-3 border-t border-white/15 flex items-center gap-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  <Code2 size={16} className="text-white shrink-0" />
                  Crafted for maintainability, high concurrency, strict type safety, and intuitive user experiences.
                </p>
              </div>

              <div className="lg:col-span-4 bg-black/40 border border-white/15 rounded-xl p-6 flex flex-col gap-4 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg liquid-glass border border-white/25 flex items-center justify-center text-white">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">MEKPO Core Engine</h4>
                    <p className="text-xs text-gray-300">Enterprise Standards</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-gray-200 border-t border-white/10 pt-4">
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-gray-300">Code Quality</span>
                    <span className="text-white font-medium">Clean & Modular</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-gray-300">Multi-Tenancy</span>
                    <span className="text-white font-medium">Full Isolation</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-gray-300">Security</span>
                    <span className="text-white font-medium">RBAC & Audit Trails</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-300">Deployment</span>
                    <span className="text-white font-medium">CI/CD & Cloud Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={idx} delay={200 + idx * 80}>
                <div
                  className="liquid-glass border border-white/20 rounded-xl p-6 hover:border-white/40 transition-all duration-300 group h-full flex flex-col justify-between shadow-xl backdrop-blur-xl"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white mb-5 group-hover:bg-white group-hover:text-black transition-colors duration-300 shadow-md">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">{item.title}</h3>
                    <p className="text-sm text-gray-200 font-light leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};