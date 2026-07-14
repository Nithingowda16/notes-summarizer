import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Play, FileText, BrainCircuit, MessageSquare, ListTodo } from 'lucide-react';

export default function Hero() {
  const handleScrollToDemo = (e) => {
    e.preventDefault();
    const element = document.querySelector('#demo');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-white relative overflow-hidden">
      {/* Background radial gradient representing Apple design */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-blue-50 opacity-40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[70%] rounded-full bg-purple-50 opacity-30 blur-[130px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Side: Content */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Tag */}
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="px-3.5 py-1 text-xs font-semibold text-apple-blue bg-blue-50 rounded-full border border-blue-100 mb-6"
          >
            Google Gemini Internship Mini Project
          </motion.span>
          
          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-apple-text leading-[1.1] mb-2"
          >
            AI-Powered
            <span className="block bg-gradient-to-r from-apple-blue to-purple-600 bg-clip-text text-transparent">Smart Notes Summarizer</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl font-medium text-apple-secondary tracking-tight mb-6"
          >
            Read less. Understand more.
          </motion.p>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-apple-secondary max-w-xl leading-relaxed mb-10"
          >
            Upload any PDF document and instantly generate concise summaries, discover important concepts, extract keywords, and interact with your notes through an intelligent offline assistant—all without relying on cloud APIs.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#demo"
              onClick={handleScrollToDemo}
              className="btn-primary py-3 px-8 text-sm font-semibold w-full sm:w-auto shadow-apple-glass hover:shadow-blue-glow transition-all"
            >
              <Upload size={16} />
              <span>Upload PDF</span>
            </a>
            <a
              href="#demo"
              onClick={handleScrollToDemo}
              className="btn-outline py-3 px-8 text-sm font-semibold w-full sm:w-auto hover:bg-apple-section border-apple-border transition-all"
            >
              <Play size={16} fill="currentColor" />
              <span>Explore Demo</span>
            </a>
          </motion.div>
        </div>
        
        {/* Right Side: Glass Floating Illustrations */}
        <div className="lg:col-span-5 flex justify-center items-center h-[450px] lg:h-[550px] relative w-full mt-8 lg:mt-0">
          <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
            
            {/* Background Blob for Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-tr from-blue-300 to-purple-300 opacity-30 blur-[60px]" />
            
            {/* Element 1: PDF Document Card (Bottom Left) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute top-[20%] left-[-5%] w-[160px] md:w-[200px] p-4 glass-card rounded-[24px] shadow-apple-glass border border-white/50 animate-float-pdf z-20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 shadow-inner">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-apple-text truncate">Lecture_Notes.pdf</h4>
                  <span className="text-[10px] text-apple-secondary">4.2 MB • 12 Pages</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-apple-border/40 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-red-500 rounded-full" />
                </div>
                <div className="h-1.5 w-1/2 bg-apple-border/40 rounded-full" />
              </div>
            </motion.div>

            {/* Element 2: AI Brain Engine (Center Top) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute top-[0%] right-[10%] w-[160px] md:w-[200px] p-5 glass-card rounded-[24px] shadow-apple-glass border border-white/50 animate-float-brain z-10"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-apple-blue shadow-inner mb-3">
                  <BrainCircuit size={24} className="animate-pulse" />
                </div>
                <h4 className="text-xs font-bold text-apple-text mb-1">Local NLP Engine</h4>
                <p className="text-[10px] text-apple-secondary leading-normal">
                  Extractive Summarization & NLTK Tokenization
                </p>
                <div className="flex gap-1.5 mt-3">
                  <span className="px-1.5 py-0.5 text-[8px] bg-blue-50 text-apple-blue font-bold rounded-md">Sumy</span>
                  <span className="px-1.5 py-0.5 text-[8px] bg-purple-50 text-purple-600 font-bold rounded-md">YAKE</span>
                  <span className="px-1.5 py-0.5 text-[8px] bg-green-50 text-green-600 font-bold rounded-md">100% Offline</span>
                </div>
              </div>
            </motion.div>

            {/* Element 3: Chat Bubble Q&A (Bottom Right) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute bottom-[10%] right-[-10%] w-[170px] md:w-[210px] p-4 glass-card rounded-[24px] shadow-apple-glass border border-white/50 animate-float-bubble z-30"
            >
              <div className="flex gap-2.5 items-start">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mt-0.5 flex-shrink-0">
                  <MessageSquare size={16} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-bold text-purple-600 uppercase tracking-wide">Q&A Search</span>
                  <p className="text-[10px] text-apple-text font-medium leading-relaxed bg-purple-50/50 p-2 rounded-xl border border-purple-100/50">
                    "Explain Supervised Learning."
                  </p>
                  <p className="text-[9px] text-apple-secondary leading-normal pl-1">
                    "It utilizes labeled training data..."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Element 4: Summary Checklist Card (Center Bottom) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute bottom-[28%] left-[10%] w-[150px] md:w-[180px] p-4 glass-card rounded-[24px] shadow-apple-glass border border-white/50 animate-float-card z-20"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <ListTodo size={14} className="text-green-500" />
                <span className="text-[10px] font-bold text-apple-text">Bullet Summary</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  <div className="h-1.5 w-full bg-apple-border/40 rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  <div className="h-1.5 w-5/6 bg-apple-border/40 rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  <div className="h-1.5 w-2/3 bg-apple-border/40 rounded-full" />
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
