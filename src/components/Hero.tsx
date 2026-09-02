import React from 'react';
import { AnimatedHeading } from './AnimatedHeading';
import { FadeIn } from './FadeIn';
import { AiCoreTelemetry } from './AiCoreTelemetry';
import { RealisticBirdsCanvas } from './RealisticBirdsCanvas';

interface HeroProps {
  onOpenHireModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenHireModal }) => {
  const handleScrollToExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[680px] overflow-hidden flex flex-col justify-between">
      {/* Realistic Bird Flight & Magical Atmospheric Light Particles */}
      <RealisticBirdsCanvas />

      {/* Top spacer for navbar */}
      <div className="w-full pt-28 relative z-10" />

      {/* Hero Content (Bottom of viewport) */}
      <div className="w-full px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-12 lg:pb-16 relative z-10">
        <div className="w-full lg:flex lg:items-end lg:justify-between gap-8">
          
          {/* Left Column - Main content */}
          <div className="max-w-2xl xl:max-w-3xl flex flex-col justify-end">
            <AnimatedHeading
              text={"Shaping tomorrow\nwith vision and action."}
              initialDelay={200}
              charDelay={30}
              duration={500}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px] font-normal text-white mb-4 leading-[1.08]"
            />

            <FadeIn delay={800} duration={1000}>
              <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 max-w-xl font-normal leading-relaxed drop-shadow-md">
                We back visionaries and craft ventures that define what comes next.
              </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenHireModal}
                  className="bg-white text-black px-7 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 cursor-pointer shadow-lg active:scale-95 transform text-sm md:text-base"
                >
                  Start a Chat
                </button>
                <a
                  href="#about"
                  onClick={handleScrollToExplore}
                  className="liquid-glass border border-white/20 text-white px-7 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-all duration-300 cursor-pointer inline-block text-center text-sm md:text-base shadow-lg"
                >
                  Explore Now
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Holographic AI Engine Telemetry Widget (Conceals Bottom-Right Watermark) */}
          <div className="mt-8 lg:mt-0 flex items-end justify-start lg:justify-end shrink-0">
            <FadeIn delay={1400} duration={1000}>
              <AiCoreTelemetry onOpenHireModal={onOpenHireModal} />
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};