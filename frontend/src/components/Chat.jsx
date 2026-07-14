import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Send, Terminal, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Chat() {
  const {
    chatHistory,
    handleSendMessage,
    filename,
    progressStage
  } = useContext(AppContext);

  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSendMessage(input);
    setInput('');
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <section className="py-24 bg-apple-section overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 w-full">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-apple-secondary tracking-widest uppercase block mb-4">
            Document Assistant
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-apple-text mb-4">
            Ask Your Notes
          </h2>
          <p className="text-base text-apple-secondary leading-relaxed">
            Query your notes using natural language. All responses are parsed locally in real time from the uploaded document text.
          </p>
        </div>

        {/* macOS Terminal Window */}
        <div className="w-full max-w-3xl mx-auto rounded-2xl shadow-apple-hover border border-neutral-800 bg-[#1e1e1e] overflow-hidden flex flex-col h-[500px]">
          
          {/* Terminal Titlebar */}
          <div className="px-5 py-3 bg-[#2d2d2d] flex items-center justify-between border-b border-neutral-800 select-none">
            {/* Window buttons */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            
            {/* Terminal Title */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono font-semibold">
              <Terminal size={12} className="text-neutral-500" />
              <span>local_ai_shell — {filename || 'bash'}</span>
            </div>

            {/* Offline label */}
            <div className="flex items-center gap-1 text-[9px] font-mono text-[#27C93F] bg-[#1a3822] border border-[#23532c] px-2 py-0.5 rounded">
              <Cpu size={10} />
              <span>CPU_ONLY</span>
            </div>
          </div>

          {/* Terminal Output Logs */}
          <div className="flex-1 p-5 overflow-y-auto font-mono text-xs md:text-sm text-neutral-300 space-y-4 scrollbar-thin select-text">
            {/* Initial Boot Logs */}
            <div className="text-neutral-500 border-b border-neutral-800/40 pb-2 mb-2 leading-relaxed">
              Last login: {new Date().toLocaleDateString()} on ttys001<br />
              Initializing Local NLP Semantic Indexer... OK<br />
              Active Context: {filename ? `"${filename}"` : 'NONE (Please upload a PDF file to begin)'}
            </div>

            {/* Chat Messages */}
            {chatHistory.map((msg, index) => (
              <div key={index} className="space-y-1">
                {msg.sender === 'user' ? (
                  /* User Prompt */
                  <div className="flex items-start gap-1">
                    <span className="text-[#38BDF8] font-bold">guest@gemini-notes %</span>
                    <span className="text-white pl-1 whitespace-pre-wrap">{msg.text}</span>
                  </div>
                ) : (
                  /* Assistant Prompt */
                  <div className="flex items-start gap-1 pl-4 border-l border-neutral-700/50 my-2">
                    <span className="text-[#27C93F] font-bold font-mono uppercase tracking-wider text-[10px] select-none mt-0.5 flex-shrink-0">
                      [local_ai]:
                    </span>
                    <div className="text-neutral-200 pl-1 whitespace-pre-wrap leading-relaxed">
                      {msg.loading ? (
                        <span className="flex items-center gap-1">
                          Searching TF-IDF embeddings
                          <span className="animate-pulse">.</span>
                          <span className="animate-pulse delay-100">.</span>
                          <span className="animate-pulse delay-200">.</span>
                        </span>
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Terminal Command Input Prompt */}
          <form 
            onSubmit={handleSubmit}
            className="p-4 bg-[#181818] border-t border-neutral-800 flex items-center gap-2"
          >
            <span className="text-[#38BDF8] font-mono text-xs md:text-sm font-bold select-none pl-1">
              guest@notes %
            </span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={progressStage !== 'done'}
              placeholder={progressStage === 'done' ? 'ask "What is machine learning?"' : 'Upload a PDF file to enable local Q&A'}
              className="flex-1 bg-transparent border-none text-white font-mono text-xs md:text-sm focus:outline-none focus:ring-0 placeholder-neutral-600 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!input.trim() || progressStage !== 'done'}
              className="p-2 bg-[#2d2d2d] hover:bg-[#38BDF8] hover:text-black rounded-lg text-neutral-400 font-bold transition-all disabled:opacity-30 disabled:hover:bg-[#2d2d2d] disabled:hover:text-neutral-400"
              aria-label="Send query"
            >
              <Send size={14} />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
