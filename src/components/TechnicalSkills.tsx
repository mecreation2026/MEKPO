import React, { useState } from 'react';
import { Terminal, Server, Layout, Database, Wrench, Shield, CheckCircle2, Cpu } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const TechnicalSkills: React.FC = () => {
  const skillCategories = [
    {
      category: 'Languages',
      icon: Terminal,
      skills: ['Python', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'SQL']
    },
    {
      category: 'Backend',
      icon: Server,
      skills: ['Django', 'Flask', 'FastAPI', 'REST APIs', 'SQLAlchemy', 'ORM Modeling', 'Microservices']
    },
    {
      category: 'Frontend',
      icon: Layout,
      skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Material UI (MUI)', 'Redux Toolkit', 'React Router', 'Responsive Design']
    },
    {
      category: 'Databases',
      icon: Database,
      skills: ['PostgreSQL', 'SQLite', 'MongoDB', 'Supabase', 'Database Indexing', 'Schema Migration']
    },
    {
      category: 'Tools & Platforms',
      icon: Wrench,
      skills: ['Git & GitHub', 'Axios', 'Third-Party APIs', 'AWS EC2', 'AWS IAM', 'AWS S3', 'CI/CD Pipelines']
    },
    {
      category: 'Development & Architecture',
      icon: Shield,
      skills: ['Authentication (JWT/OAuth)', 'Role-Based Access Control (RBAC)', 'API Integration', 'Responsive UI', 'Database Management', 'Performance Optimization']
    },
  ];

  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredCategories = activeCategory === 'All'
    ? skillCategories
    : skillCategories.filter(cat => cat.category === activeCategory);

  return (
    <section id="skills" className="relative z-10 py-32 px-6 md:px-12 lg:px-16 bg-transparent">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass border border-white/20 text-xs tracking-widest uppercase text-gray-200 mb-4 shadow-xl backdrop-blur-md">
                <Cpu size={13} className="text-white" />
                Technical Stack & Competencies
              </div>
              <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Engineering stack built for <span className="font-medium">power, scale, and elegance.</span>
              </h2>
            </div>
            <p className="text-gray-200 text-sm md:text-base max-w-md font-light leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
              Production-grade mastery across modern backend frameworks, frontend architectures, cloud platforms, and relational databases.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap gap-2.5 mb-12">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-4.5 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer shadow-lg ${
                activeCategory === 'All'
                  ? 'bg-white text-black shadow-xl scale-105'
                  : 'liquid-glass border border-white/20 text-gray-200 hover:text-white hover:border-white/40'
              }`}
            >
              All Disciplines
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-4.5 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer shadow-lg ${
                  activeCategory === cat.category
                    ? 'bg-white text-black shadow-xl scale-105'
                    : 'liquid-glass border border-white/20 text-gray-200 hover:text-white hover:border-white/40'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((group, idx) => {
            const Icon = group.icon;
            return (
              <ScrollReveal key={idx} delay={150 + idx * 70}>
                <div
                  className="liquid-glass border border-white/20 rounded-2xl p-7 hover:border-white/40 transition-all duration-300 flex flex-col justify-between h-full group shadow-2xl backdrop-blur-xl"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300 shadow-md">
                        <Icon size={22} />
                      </div>
                      <h3 className="text-xl font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">{group.category}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/40 border border-white/15 text-xs text-gray-100 hover:bg-white/15 hover:border-white/30 transition-colors shadow-sm"
                        >
                          <CheckCircle2 size={13} className="text-white" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-gray-300">
                    <span>Production Ready</span>
                    <span className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">{group.skills.length} Competencies</span>
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