import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileSpreadsheet, Activity, Sparkles, HelpCircle, Download } from 'lucide-react';

export default function Workflow() {
  const steps = [
    {
      icon: <UploadCloud size={20} />,
      title: "Upload PDF",
      description: "Drop your study guide or research paper into the secure browser window.",
      color: "bg-blue-500/10 text-apple-blue"
    },
    {
      icon: <FileSpreadsheet size={20} />,
      title: "Extract Text",
      description: "Local PyPDF2 parser extracts raw layout text and segments it into memory.",
      color: "bg-cyan-500/10 text-cyan-600"
    },
    {
      icon: <Activity size={20} />,
      title: "Analyze Content",
      description: "Calculates character count, word density, readability grade, and reading time.",
      color: "bg-amber-500/10 text-amber-600"
    },
    {
      icon: <Sparkles size={20} />,
      title: "Generate Summary",
      description: "Sumy NLP models isolate core sentences, creating an objective extractive summary.",
      color: "bg-purple-500/10 text-purple-600"
    },
    {
      icon: <HelpCircle size={20} />,
      title: "Ask Questions",
      description: "Ask natural language questions to search and extract context from the notes offline.",
      color: "bg-emerald-500/10 text-emerald-600"
    },
    {
      icon: <Download size={20} />,
      title: "Download Results",
      description: "Export the summaries and tags as plain text notes files for easy review.",
      color: "bg-indigo-500/10 text-indigo-600"
    }
  ];

  return (
    <section id="workflow" className="py-24 bg-apple-section overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-bold text-apple-secondary tracking-widest uppercase block mb-4">
            Processing Pipeline
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-apple-text mb-4">
            How it works
          </h2>
          <p className="text-base text-apple-secondary leading-relaxed">
            A seamless local pipelines that processes raw documents and prepares them for intelligent search and reading.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Vertical Center Line */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-0.5 border-l border-dashed border-apple-border/50 -translate-x-1/2" />

          {/* Timeline Cards */}
          <div className="space-y-16">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={step.title}
                  className="flex flex-col md:flex-row items-start md:items-center relative"
                >
                  {/* Timeline Badge (Circle) */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`absolute left-0 md:left-1/2 w-10 h-10 rounded-full border border-white flex items-center justify-center -translate-x-1/2 shadow-sm z-10 ${step.color} bg-white`}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Left Spacer / Content (Desktop) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:order-2 md:pl-12'}`}>
                    <motion.div
                      initial={{ 
                        opacity: 0, 
                        x: isEven ? -30 : 30 
                      }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="p-6 bg-white rounded-2xl border border-apple-border/20 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:inline-block max-w-md text-left"
                    >
                      <span className="text-[10px] font-bold text-apple-secondary tracking-widest uppercase mb-1.5 block">
                        Step 0{index + 1}
                      </span>
                      <h4 className="text-base font-bold text-apple-text mb-2">{step.title}</h4>
                      <p className="text-xs text-apple-secondary leading-relaxed">{step.description}</p>
                    </motion.div>
                  </div>

                  {/* Right Spacer (Desktop) */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
