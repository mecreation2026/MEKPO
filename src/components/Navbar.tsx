import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenHireModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenHireModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Story', href: '#about' },
    { name: 'Investing', href: '#skills' },
    { name: 'Building', href: '#projects' },
    { name: 'Advisory', href: '#advisory' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'pt-3' : 'pt-6'} px-6 md:px-12 lg:px-16`}>
      <nav className="liquid-glass rounded-xl px-4 md:px-5 py-2.5 flex items-center justify-between transition-all duration-300 shadow-2xl backdrop-blur-md border border-white/20">
        {/* Left: Brand Logo + MEKPO Technologies Text */}
        <a href="#" className="flex items-center gap-3 group">
          <img
            src="/mevologo.png"
            alt="MEKPO Technologies Logo"
            className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-semibold tracking-tight text-white transition-opacity group-hover:opacity-90 leading-tight">
              MEKPO
            </span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-300 font-light hidden sm:inline-block">
              Technologies
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-normal">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-200 hover:text-white transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right: CTA Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenHireModal}
            className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all duration-200 cursor-pointer shadow-md active:scale-95 transform"
          >
            Start a Chat
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-1 hover:text-gray-300 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 liquid-glass rounded-xl p-4 border border-white/20 flex flex-col gap-3 animate-fadeIn shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-sm py-2 px-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};