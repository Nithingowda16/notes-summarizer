import React, { useContext, useEffect } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Features from './components/Features';
import Workflow from './components/Workflow';
import Demo from './components/Demo';
import Chat from './components/Chat';
import Stats from './components/Stats';
import TechBadges from './components/TechBadges';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { Sun, Moon } from 'lucide-react';

function MainApp() {
  const { darkMode, setDarkMode } = useContext(AppContext);

  // Toggle 'dark' class on <html> document when state changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.style.backgroundColor = '#1C1C1E';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#FFFFFF';
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen text-apple-text bg-white dark:bg-[#1C1C1E] dark:text-[#E5E5EA] transition-colors duration-300`}>
      {/* Navigation */}
      <Navbar />
      
      {/* Sections */}
      <Hero />
      <Intro />
      <Features />
      <Workflow />
      <Demo />
      <Chat />
      <Stats />
      <TechBadges />
      <FAQ />
      
      {/* Footer */}
      <Footer />

      {/* Floating Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 p-3 bg-white/80 dark:bg-[#2d2d2d]/80 text-apple-text dark:text-white rounded-full border border-apple-border/25 dark:border-white/10 shadow-apple-glass backdrop-blur-md hover:scale-110 active:scale-95 transition-all duration-200 z-50 focus:outline-none"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-600" />}
      </button>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
