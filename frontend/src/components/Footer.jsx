import React from 'react';
import { Mail, Heart } from 'lucide-react';

const GithubIcon = ({ size = 15, ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 15, ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-apple-section border-t border-apple-border/20 py-16 text-apple-secondary text-xs select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-8">
        
        {/* Footer Top Links / Info */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-apple-border/10 pb-8">
          <div className="flex flex-col gap-1.5">
            <span className="font-bold text-apple-text text-sm">Summora — PDF Study Assistant</span>
            <p className="max-w-md leading-relaxed text-[11px]">
              Developed as an offline study aid demonstrating text extraction, sentence ranking algorithms, and similarity vector mapping without cloud dependencies.
            </p>
          </div>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className="p-2.5 bg-white hover:bg-apple-text hover:text-white rounded-full border border-apple-border/20 shadow-sm transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={15} />
            </a>
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className="p-2.5 bg-white hover:bg-apple-text hover:text-white rounded-full border border-apple-border/20 shadow-sm transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={15} />
            </a>
            <a 
              href="#"
              onClick={(e) => e.preventDefault()}
              className="p-2.5 bg-white hover:bg-apple-text hover:text-white rounded-full border border-apple-border/20 shadow-sm transition-all duration-200"
              aria-label="Send Email"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>

        {/* Footer Bottom (Copyright, Designed-By, Credits) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px]">
          <div className="flex flex-wrap items-center gap-1.5">
            <span>© 2026 Summora (Google Gemini Internship Mini Project). All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-1">
            <span>Designed & Developed by</span>
            <span className="font-bold text-apple-text hover:text-apple-blue transition-colors cursor-pointer">Sai Shivani</span>
            <Heart size={10} className="text-red-500 fill-current animate-pulse" />
          </div>
        </div>

      </div>
    </footer>
  );
}
