import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle, ShieldCheck, Sparkles, Building2, Stethoscope, Compass, Sprout, FileCheck2, X, Globe } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  icon: React.ElementType;
  description: string;
  architectureHighlights: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
}

export const ProjectsShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'mevo-scroll-platform',
      title: 'MEVO Web Platform – Motion Scroll Experience',
      category: 'Interactive Web Experience & Smooth Scroll Engine',
      tagline: 'Hardware-accelerated 260-frame canvas motion, Lenis momentum scrolling, Tailwind liquid glass UI, Supabase DB integration, and cloud domain hosting.',
      icon: Globe,
      description: 'A cutting-edge interactive web platform featuring a 260-frame hardware-accelerated canvas background animation synced with scroll velocity. Developed with React, TypeScript, Tailwind CSS liquid glassmorphism, Supabase real-time database archiving with Row-Level Security (RLS), Web3Forms API mail routing, and production custom domain hosting.',
      architectureHighlights: [
        '260-frame canvas background animation synced with Lenis momentum scrolling',
        'Progressive multi-tier frame preloading with nearest-frame fallback for zero flicker',
        'Supabase PostgreSQL database integration with Row-Level Security (RLS)',
        'Custom domain hosting with automated cloud CI/CD deployment pipeline',
        'Liquid glass UI system with dynamic backdrop blur and responsive mobile navigation',
        'Automated transactional inquiry email dispatch with full form data mapping'
      ],
      techStack: ['React.js', 'TypeScript', 'Tailwind CSS', 'HTML5 Canvas', 'Supabase (PostgreSQL)', 'Lenis Scroll', 'Domain & Cloud Hosting', 'Web3Forms API'],
      metrics: [
        { label: 'Scroll Engine', value: '260-Frame Canvas' },
        { label: 'Database', value: 'Supabase + RLS' },
        { label: 'Deployment', value: 'Cloud & Domain Hosting' }
      ]
    },
    {
      id: 'homeopathy-saas',
      title: 'Homeopathy SaaS Platform',
      category: 'Multi-Tenant Healthcare Platform',
      tagline: 'End-to-end clinical operations, medicine dispensation, and audit-logged patient management.',
      icon: Stethoscope,
      description: 'A comprehensive multi-tenant SaaS platform built for homeopathy clinics. It covers organization isolation, staff user hierarchy, encrypted patient records, automated doctor assignment, digital consultation workflows, medicine compounding/preparation, and physical shipment delivery tracking.',
      architectureHighlights: [
        'Module-level granular permissions & role-based access control',
        'Time-bound patient records visibility for privacy compliance',
        'Comprehensive audit logging and activity trails',
        'Vendor management and supply chain integration',
        'User issue tracking and internal helpdesk workflows'
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Material UI (MUI)', 'Redux Toolkit', 'React Router', 'Axios', 'Git'],
      metrics: [
        { label: 'Architecture', value: 'Multi-Tenant SaaS' },
        { label: 'Security', value: 'Module-Level RBAC' },
        { label: 'Tracking', value: 'Full Audit Trail' }
      ]
    },
    {
      id: 'real-estate-saas',
      title: 'Real Estate SaaS Platform',
      category: 'Property Management & Marketplace',
      tagline: 'Multi-role enterprise hub for properties, listings, vendor maintenance, and transactions.',
      icon: Building2,
      description: 'SaaS platform engineered to streamline property listings, sales, and purchase workflows across complex multi-user role ecosystems. Enables agents and brokerages to coordinate third-party service providers, assign maintenance tickets, and monitor task completion alongside property readiness statuses.',
      architectureHighlights: [
        'Multi-role access hierarchy (Brokers, Agents, Buyers, Sellers, Vendors)',
        'Automated maintenance task dispatch and provider tracking',
        'Real-time property readiness and inspection validation',
        'Optimized PostgreSQL queries for complex geospatial and price filters',
        'Secure transactional workflow management'
      ],
      techStack: ['Python', 'Django', 'PostgreSQL', 'React.js', 'REST APIs', 'Tailwind CSS'],
      metrics: [
        { label: 'Backend', value: 'Django + Postgres' },
        { label: 'Access Control', value: 'Multi-Role Hierarchy' },
        { label: 'Workflows', value: 'Vendor & Task Engine' }
      ]
    },
    {
      id: 'smart-tour-ai',
      title: 'Smart Tour – AI Travel Planner',
      category: 'AI & Real-Time Analytics',
      tagline: 'Context-aware travel intelligence with live meteorological tracking and GPT itinerary assistance.',
      icon: Compass,
      description: 'Intelligent travel planning engine featuring real-time meteorological monitoring, automated email notification alerts, environmental air-quality index analysis, risk-awareness zone mapping, and tailored GPT-powered destination recommendations.',
      architectureHighlights: [
        'Real-time live weather feeds and automated storm/risk alerts',
        'Air-quality index (AQI) sensor data analysis with zone classification',
        'GPT-based conversational destination assistance and itinerary synthesis',
        'Automated multi-channel email alert delivery',
        'Interactive route planning and risk awareness indicators'
      ],
      techStack: ['Python', 'Flask', 'SQLite', 'OpenAI GPT APIs', 'HTML5', 'CSS3', 'JavaScript', 'REST APIs'],
      metrics: [
        { label: 'AI Engine', value: 'GPT Destination AI' },
        { label: 'Monitoring', value: 'Live Weather & AQI' },
        { label: 'Alerts', value: 'Automated Email Engine' }
      ]
    },
    {
      id: 'waterfootprint-ai',
      title: 'WaterFootprint – Smart Agriculture',
      category: 'AI Computer Vision & Agritech',
      tagline: 'Vision-powered plant health analysis, moisture optimization, and GPT agronomist insights.',
      icon: Sprout,
      description: 'AI-driven agricultural assistant that analyzes uploaded plant imagery to predict water requirements and assess soil condition. It synthesizes precision fertilizer dosage and irrigation schedules utilizing GPT-based agronomy modeling.',
      architectureHighlights: [
        'Computer vision plant image analysis pipeline for stress detection',
        'Soil moisture prediction and water footprint calculation',
        'GPT-generated personalized fertilizer and irrigation schedules',
        'Resource consumption optimization dashboards',
        'Lightweight database modeling for offline-capable agronomy records'
      ],
      techStack: ['Python', 'Flask', 'SQLite', 'Computer Vision', 'GPT Agronomy Models', 'JavaScript'],
      metrics: [
        { label: 'AI Vision', value: 'Plant Disease & Moisture' },
        { label: 'Intelligence', value: 'GPT Irrigation Models' },
        { label: 'Impact', value: 'Resource Optimization' }
      ]
    },
    {
      id: 'startup-portal',
      title: 'Startup Approval Portal',
      category: 'Enterprise Governance & Workflow',
      tagline: 'State-level startup proposal submissions, compliance audits, and digital certificate issuing.',
      icon: FileCheck2,
      description: 'A structured workflow-driven web portal for startup proposal submissions, encrypted document uploads, and multi-stage administrative approval tracking. Features automated status notifications and cryptographic approval certificate generation upon verification.',
      architectureHighlights: [
        'Multi-stage administrative review and verification pipeline',
        'Secure multi-format document upload and validation engine',
        'Automated transactional email notifications at each milestone',
        'Dynamic digital approval certificate generation with verification hashes',
        'Relational state machine for proposal lifecycles'
      ],
      techStack: ['Python', 'Django', 'SQLite', 'ReportLab / PDF Engine', 'HTML5', 'CSS3', 'JavaScript'],
      metrics: [
        { label: 'Workflow', value: 'Multi-Stage Review' },
        { label: 'Deliverables', value: 'Automated Cert Gen' },
        { label: 'Tracking', value: 'Milestone Notifications' }
      ]
    }
  ];

  return (
    <section id="projects" className="relative z-10 py-32 px-6 md:px-12 lg:px-16 bg-transparent">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass border border-white/20 text-xs tracking-widest uppercase text-gray-200 mb-4 shadow-xl backdrop-blur-md">
                <Sparkles size={13} className="text-white" />
                Featured Engineering Ventures
              </div>
              <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                SaaS architectures & AI platforms <span className="font-medium">built for impact.</span>
              </h2>
            </div>
            <p className="text-gray-200 text-sm md:text-base max-w-md font-light leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
              Production-grade systems designed with multi-tenancy, AI-driven automation, secure RBAC, and precision databases.
            </p>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => {
            const Icon = project.icon;
            const isFeatured = idx === 0;

            return (
              <ScrollReveal
                key={project.id}
                delay={idx * 100}
                className={isFeatured ? 'lg:col-span-2' : ''}
              >
                <div
                  className="liquid-glass border border-white/20 rounded-2xl p-8 transition-all duration-300 hover:border-white/40 flex flex-col justify-between group h-full shadow-2xl backdrop-blur-xl"
                >
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300 shadow-md">
                          <Icon size={24} />
                        </div>
                        <div>
                          <span className="text-xs uppercase tracking-wider text-gray-300 font-mono">
                            {project.category}
                          </span>
                          <h3 className="text-xl md:text-2xl font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="liquid-glass border border-white/20 p-2.5 rounded-lg text-white hover:bg-white hover:text-black transition-colors cursor-pointer shadow-md"
                        title="View Architecture Details"
                      >
                        <ArrowUpRight size={18} />
                      </button>
                    </div>

                    <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-6 font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-6 space-y-2">
                      <h4 className="text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                        Key Architecture Features:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.architectureHighlights.slice(0, isFeatured ? 5 : 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                            <CheckCircle size={14} className="text-white shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Tech Stack & CTA */}
                  <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded bg-black/40 border border-white/15 text-[11px] text-gray-200 font-mono shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1 text-xs text-white hover:text-gray-300 font-medium whitespace-nowrap cursor-pointer"
                    >
                      Deep Dive <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Modal for Deep Architecture Inspection */}
        {selectedProject && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedProject(null);
            }}
          >
            <div
              data-lenis-prevent
              className="liquid-glass border border-white/20 rounded-2xl max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl my-auto overscroll-contain"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-10"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3.5 mb-4 pr-6">
                <div className="w-11 h-11 rounded-xl bg-white text-black flex items-center justify-center shadow-lg shrink-0">
                  <selectedProject.icon size={22} />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-300 font-mono">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-medium text-white">{selectedProject.title}</h3>
                </div>
              </div>

              <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-black/40 border border-white/15 text-center shadow-inner">
                {selectedProject.metrics.map((m, mIdx) => (
                  <div key={mIdx}>
                    <p className="text-[11px] text-gray-400 uppercase tracking-wider">{m.label}</p>
                    <p className="text-xs md:text-sm font-semibold text-white mt-0.5">{m.value}</p>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider text-white font-medium mb-3">
                  Technical Architecture Highlights:
                </h4>
                <ul className="space-y-2.5">
                  {selectedProject.architectureHighlights.map((hl, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-200">
                      <ShieldCheck size={16} className="text-white shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-white font-medium mb-2.5">
                  Technologies Employed:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-md bg-white/10 border border-white/20 text-xs text-white font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/15 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer shadow-md"
                >
                  Close Specification
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};