import React, { useState, useEffect, useContext } from 'react';
import { Menu, X, ArrowUpRight, Upload } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function Navbar() {
  const { handleReset } = useContext(AppContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'Demo', href: '#demo' },
    { name: 'About', href: '#about' }
  ];

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleScrollTo(e, '#home')}
          className="flex items-center gap-2 group font-semibold text-lg tracking-tight text-apple-text"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22c0-4.97-4.03-9-9-9 4.97 0 9-4.03 9-9 0 4.97 4.03 9 9 9-4.03 0-9 4.03-9 9z" fill="url(#gemini-nav-grad)"/>
            <path d="M19 10.5c0-2.485-2.015-4.5-4.5-4.5 2.485 0 4.5-2.015 4.5-4.5 0 2.485 2.015 4.5 4.5 4.5-2.485 0-4.5 2.015-4.5 4.5z" fill="url(#gemini-nav-grad)"/>
            <defs>
              <linearGradient id="gemini-nav-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#4285F4" />
                <stop offset="50%" stop-color="#9B5DE5" />
                <stop offset="100%" stop-color="#FF66C4" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-bold text-apple-text text-xl tracking-tight">Summora</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm font-medium text-apple-secondary hover:text-apple-text transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="btn-outline py-1.5 px-4 text-xs flex items-center gap-1 hover:border-apple-text transition-all duration-200"
          >
            <span>GitHub</span>
            <ArrowUpRight size={12} />
          </a>
          <a
            href="#demo"
            onClick={(e) => handleScrollTo(e, '#demo')}
            className="btn-primary py-1.5 px-5 text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Upload size={13} />
            <span>Upload PDF</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-apple-text hover:bg-apple-section rounded-full transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-nav py-6 px-6 flex flex-col gap-4 shadow-xl border-t border-apple-section animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-base font-medium py-2 text-apple-text border-b border-apple-section"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="btn-outline justify-center w-full"
            >
              <span>GitHub</span>
              <ArrowUpRight size={14} />
            </a>
            <a
              href="#demo"
              onClick={(e) => handleScrollTo(e, '#demo')}
              className="btn-primary justify-center w-full"
            >
              <Upload size={14} />
              <span>Upload PDF</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
