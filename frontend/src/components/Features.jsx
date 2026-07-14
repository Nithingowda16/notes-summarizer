import React from 'react';
import { motion } from 'framer-motion';
import { FileUp, Brain, MessagesSquare, Hash, BarChart3, Download } from 'lucide-react';

export default function Features() {
  const list = [
    {
      icon: <FileUp size={24} className="text-apple-blue" />,
      title: "Smart PDF Upload",
      description: "Drag and drop standard PDF files. Automatic layout analysis and plain text extraction run on your browser and processor.",
      color: "from-blue-500/10 to-cyan-500/10"
    },
    {
      icon: <Brain size={24} className="text-purple-500" />,
      title: "Intelligent Summaries",
      description: "Generate structured, concise summaries highlighting key points using offline extractive NLP algorithms like LSA or LexRank.",
      color: "from-purple-500/10 to-pink-500/10"
    },
    {
      icon: <MessagesSquare size={24} className="text-emerald-500" />,
      title: "Ask Questions",
      description: "Query your uploaded document using natural language. Our semantic Q&A search retrieves relevant answers without calling cloud APIs.",
      color: "from-emerald-500/10 to-teal-500/10"
    },
    {
      icon: <Hash size={24} className="text-amber-500" />,
      title: "Keyword Extraction",
      description: "Automatically identify critical terms, key concepts, and jargon tags within the document using statistical indexing.",
      color: "from-amber-500/10 to-orange-500/10"
    },
    {
      icon: <BarChart3 size={24} className="text-red-500" />,
      title: "Document Analytics",
      description: "View statistics including page count, word count, character count, estimated reading time, and custom summaries density metrics.",
      color: "from-red-500/10 to-rose-500/10"
    },
    {
      icon: <Download size={24} className="text-indigo-500" />,
      title: "Seamless Export",
      description: "Save generated summaries, keywords, metadata, and Q&A transcripts as offline TXT or PDF reports for subsequent review.",
      color: "from-indigo-500/10 to-blue-500/10"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-apple-blue uppercase tracking-widest block mb-4"
          >
            Product Features
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-apple-text mb-4"
          >
            Everything you need. 100% Offline.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base text-apple-secondary leading-relaxed"
          >
            By executing all processing inside your browser environment, we guarantee high speed, zero data storage risks, and full functionality even without an internet connection.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {list.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.02)",
                borderColor: "rgba(0, 113, 227, 0.2)"
              }}
              className="p-8 glass-card rounded-[28px] border border-apple-border/20 transition-all duration-300 flex flex-col items-start text-left cursor-default select-none relative group overflow-hidden"
            >
              {/* Background accent glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500`} />
              
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-2xl bg-apple-section flex items-center justify-center mb-6 shadow-sm border border-white/50 group-hover:scale-110 transition-transform duration-300 relative z-10">
                {feature.icon}
              </div>
              
              {/* Feature Title */}
              <h3 className="text-lg font-bold text-apple-text mb-3 group-hover:text-apple-blue transition-colors duration-200 relative z-10">
                {feature.title}
              </h3>
              
              {/* Feature Description */}
              <p className="text-sm text-apple-secondary leading-relaxed relative z-10">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
