import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, GraduationCap, Microscope, Briefcase, Zap, BookOpen } from 'lucide-react';

export default function Intro() {
  const cards = [
    {
      icon: <GraduationCap className="text-blue-500" size={24} />,
      title: "Students",
      description: "Condense long lecture notes, text book chapters, and syllabus outlines into bite-sized study guides in seconds."
    },
    {
      icon: <Microscope className="text-purple-500" size={24} />,
      title: "Researchers",
      description: "Quickly extract key hypotheses, methodologies, and conclusions from academic papers and PDF reports."
    },
    {
      icon: <Briefcase className="text-emerald-500" size={24} />,
      title: "Professionals",
      description: "Digest long industry summaries, business proposals, meeting minutes, and financial statements with ease."
    }
  ];

  return (
    <section id="about" className="py-24 bg-apple-section overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Copywriting */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-xs font-bold text-apple-secondary tracking-widest uppercase mb-4"
            >
              Efficiency Redefined
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-apple-text mb-6 leading-tight"
            >
              Designed for Students,<br />
              <span className="text-apple-blue">Researchers and Professionals.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base md:text-lg text-apple-secondary leading-relaxed mb-10 max-w-xl"
            >
              Stop spending hours reading lengthy documents. Our intelligent summarizer helps you quickly understand the most important information from any PDF while keeping your data completely secure.
            </motion.p>
            
            {/* Split cards list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left">
              {cards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="p-4 bg-white/60 rounded-2xl border border-white flex flex-col gap-2"
                >
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    {card.icon}
                  </div>
                  <h4 className="text-sm font-bold text-apple-text mt-1">{card.title}</h4>
                  <p className="text-xs text-apple-secondary leading-normal">{card.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Premium Interactive Graphic */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[480px] h-[340px] md:h-[400px] p-6 glass-card rounded-[32px] shadow-apple-glass border border-white/80 overflow-hidden flex flex-col justify-between"
            >
              {/* Graphic Backdrop circles */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-100 opacity-50 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-purple-100 opacity-40 blur-2xl" />
              
              {/* Header inside graphic */}
              <div className="flex items-center justify-between border-b border-apple-border/20 pb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-apple-secondary font-medium bg-white/50 px-3 py-1 rounded-full border border-apple-border/10">
                  <ShieldCheck size={14} className="text-emerald-500 animate-pulse" />
                  <span>100% Secure</span>
                </div>
              </div>
              
              {/* Center Visualization */}
              <div className="grid grid-cols-12 gap-4 my-auto relative z-10 py-4">
                {/* Visual Block 1 */}
                <div className="col-span-7 p-4 bg-white/90 rounded-[20px] shadow-sm border border-apple-border/10 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-apple-blue" />
                    <span className="text-[10px] uppercase font-bold text-apple-blue tracking-wider">Privacy Guard</span>
                  </div>
                  <h4 className="text-xs font-bold text-apple-text">Offline Processing Active</h4>
                  <p className="text-[10px] text-apple-secondary leading-normal">
                    Files are decrypted, read, and tokenized entirely in memory on your CPU. No files or text ever leave your computer.
                  </p>
                </div>
                
                {/* Visual Block 2 */}
                <div className="col-span-5 p-4 bg-white/90 rounded-[20px] shadow-sm border border-apple-border/10 flex flex-col justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <Zap size={13} className="text-amber-500" />
                    <span className="text-[9px] uppercase font-bold text-apple-secondary">Performance</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-apple-text leading-none">0ms</span>
                    <span className="text-[9px] text-apple-secondary mt-1">Cloud Latency</span>
                  </div>
                  <div className="h-1 w-full bg-apple-border/30 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-apple-blue to-purple-500 rounded-full" />
                  </div>
                </div>
                
                {/* Visual Block 3 (Wide) */}
                <div className="col-span-12 p-3.5 bg-gradient-to-r from-blue-50/80 to-purple-50/80 rounded-[20px] shadow-sm border border-apple-border/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm text-apple-blue">
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <h5 className="text-[11px] font-bold text-apple-text">NLTK Corpus</h5>
                      <p className="text-[9px] text-apple-secondary">Punkt sentence tokenizer & Stopwords databases loaded</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[8px] bg-emerald-50 text-emerald-600 font-bold rounded-full border border-emerald-100">Ready</span>
                </div>
              </div>
              
              {/* Footer text in graphic */}
              <div className="text-[10px] text-apple-secondary text-center relative z-10 pt-2 border-t border-apple-border/10">
                Zero telemetry • Zero third-party cookies • Zero internet requirement
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
