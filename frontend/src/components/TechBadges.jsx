import React from 'react';
import { motion } from 'framer-motion';

export default function TechBadges() {
  const stack = [
    { name: "React", desc: "UI Library", color: "from-[#61DAFB]/10 to-[#61DAFB]/20 text-[#00A8D8]" },
    { name: "Tailwind CSS", desc: "Styling", color: "from-[#38BDF8]/10 to-[#38BDF8]/20 text-[#0284C7]" },
    { name: "Framer Motion", desc: "Animations", color: "from-[#F024B6]/10 to-[#F024B6]/20 text-[#D80C9C]" },
    { name: "Flask", desc: "Backend Server", color: "from-[#000000]/5 to-[#000000]/15 text-[#1A1A1A]" },
    { name: "Python", desc: "Core Engine", color: "from-[#3776AB]/10 to-[#3776AB]/20 text-[#2B5B84]" },
    { name: "PyPDF2", desc: "Text Extraction", color: "from-[#FF2A2A]/10 to-[#FF2A2A]/20 text-[#D60A0A]" },
    { name: "Sumy", desc: "Summarization", color: "from-[#4CAF50]/10 to-[#4CAF50]/20 text-[#2E7D32]" },
    { name: "NLTK", desc: "Tokenization", color: "from-[#FF9800]/10 to-[#FF9800]/20 text-[#E65100]" },
    { name: "YAKE", desc: "Keyword Extract", color: "from-[#9C27B0]/10 to-[#9C27B0]/20 text-[#7B1FA2]" },
    { name: "SQLite", desc: "Caching", color: "from-[#003B57]/10 to-[#003B57]/20 text-[#00273A]" }
  ];

  return (
    <section className="py-24 bg-apple-section overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-apple-secondary tracking-widest uppercase block mb-4">
            Under The Hood
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-apple-text mb-4">
            Technology Stack
          </h2>
          <p className="text-base text-apple-secondary leading-relaxed">
            Built using modern, lightweight frameworks and standard NLP libraries for optimal local performance.
          </p>
        </div>

        {/* Badges Layout */}
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
          {stack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ 
                scale: 1.05, 
                y: -4,
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" 
              }}
              className={`px-5 py-3 rounded-2xl bg-gradient-to-tr ${tech.color} border border-white flex flex-col items-center justify-center cursor-default transition-shadow`}
            >
              <span className="text-sm font-bold tracking-tight">{tech.name}</span>
              <span className="text-[9px] font-medium opacity-65 tracking-wider uppercase mt-0.5">{tech.desc}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
