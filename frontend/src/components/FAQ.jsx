import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      q: "How does summarization work?",
      a: "The application parses raw text from the uploaded PDF document using PyPDF2. This text is then passed to our local Python NLP module which utilizes the Sumy library. Sumy applies unsupervised extractive summarization models (like LSA or LexRank) to identify and group the most semantically important sentences based on document-wide word vector relationships."
    },
    {
      q: "Is my document uploaded online?",
      a: "No. Your documents are uploaded directly to a server running entirely on your local machine. No external web APIs or cloud storage networks are contacted, making it fully private and compliant with confidentiality guidelines. If the local API server is unavailable, the application toggles into interactive Demo Mode where data parsing is simulated purely in memory."
    },
    {
      q: "Do I need an API key?",
      a: "No API keys are required. Unlike cloud-based systems that rely on Gemini Pro or OpenAI GPT models, this project is built entirely on open-source, local-first Python libraries that execute summarization and searching directly on your CPU."
    },
    {
      q: "Can I chat with PDFs?",
      a: "Yes. In the Document Chat section, you can submit questions using natural language. The system builds a local TF-IDF index of the document's sentences and evaluates their cosine similarity against your query, extracting the exact passage containing the most relevant answer."
    },
    {
      q: "Can I download summaries?",
      a: "Yes. By clicking the 'Export Summary' button in the dashboard, the application compiles the summary, word count metadata, analytics, and keyword concepts into a structured plain text file (`.txt`) and initiates a download instantly."
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-6 w-full">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-apple-blue uppercase tracking-widest block mb-4">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-apple-text mb-4">
            Got questions? We have answers.
          </h2>
        </div>

        {/* Accordions */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>

      </div>
    </section>
  );
}

function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-apple-border/20 py-4 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left py-2 focus:outline-none group"
      >
        <span className="text-sm md:text-base font-bold text-apple-text group-hover:text-apple-blue transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-apple-secondary group-hover:text-apple-text flex-shrink-0"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-xs md:text-sm text-apple-secondary leading-relaxed pt-2 pb-4 pr-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
