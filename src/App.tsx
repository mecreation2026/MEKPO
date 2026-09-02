import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollFrameCanvas } from './components/ScrollFrameCanvas';
import { AboutExperience } from './components/AboutExperience';
import { TechnicalSkills } from './components/TechnicalSkills';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { Footer } from './components/Footer';
import { HireModal } from './components/HireModal';
import { SqlSchemaViewer } from './components/SqlSchemaViewer';

export const App: React.FC = () => {
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [sqlViewerOpen, setSqlViewerOpen] = useState(false);

  useEffect(() => {
    // Initialize buttery-smooth momentum scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen text-white selection:bg-white selection:text-black font-sans overflow-x-hidden">
      
      {/* Apple-Grade Scroll Frame Canvas Engine */}
      <ScrollFrameCanvas />

      {/* Navigation Bar */}
      <Navbar onOpenHireModal={() => setHireModalOpen(true)} />

      {/* Full-Screen Hero Section */}
      <Hero onOpenHireModal={() => setHireModalOpen(true)} />

      {/* Story & Engineering Philosophy */}
      <AboutExperience />

      {/* Technical Stack & Competencies Matrix */}
      <TechnicalSkills />

      {/* Featured Real-World SaaS & AI Platforms */}
      <ProjectsShowcase />

      {/* Advisory, Contact & Infrastructure Footer */}
      <Footer
        onOpenHireModal={() => setHireModalOpen(true)}
        onOpenSqlViewer={() => setSqlViewerOpen(true)}
      />

      {/* Hire & Project Inquiry Modal */}
      <HireModal
        isOpen={hireModalOpen}
        onClose={() => setHireModalOpen(false)}
      />

      {/* Supabase SQL Schema Generator Modal */}
      <SqlSchemaViewer
        isOpen={sqlViewerOpen}
        onClose={() => setSqlViewerOpen(false)}
      />

    </div>
  );
};

export default App;