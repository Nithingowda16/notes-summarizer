import React, { useContext, useRef, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Upload, FileText, Check, AlertCircle, RefreshCw, Download, Clock, ListFilter, Play, Volume2, Pause as PauseIcon, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Demo() {
  const {
    file,
    loading,
    uploadProgress,
    progressStage,
    filename,
    summary,
    keywords,
    analytics,
    handleUpload,
    handleDownload,
    handleReset,
    backendStatus,
    apiError,
    MOCK_DOCS
  } = useContext(AppContext);

  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Text-To-Speech States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voiceGender, setVoiceGender] = useState('female');

  // Cancel TTS when switching files or unmounting
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Cancel speech if voice setting changes
  useEffect(() => {
    handleStop();
  }, [voiceGender]);

  const handleSpeak = () => {
    if (!window.speechSynthesis) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Cancel any current speaking
    window.speechSynthesis.cancel();

    // Compile text from summary
    const cleanText = summary.replace(/\s+/g, ' ').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Get system voices
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(voice => {
      const name = voice.name.toLowerCase();
      if (voiceGender === 'female') {
        return name.includes('female') || name.includes('zira') || name.includes('google us english') || name.includes('hazel') || name.includes('samantha') || name.includes('haruka');
      } else {
        return name.includes('male') || name.includes('david') || name.includes('google uk english male') || name.includes('mark') || name.includes('ravi');
      }
    });

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    setIsPlaying(true);
    setIsPaused(false);
    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (!window.speechSynthesis) return;
    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      handleUpload(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleUpload(files[0]);
    }
  };

  return (
    <section id="demo" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-apple-blue uppercase tracking-widest block mb-4">
            Interactive Workspace
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-apple-text mb-4">
            Try it yourself
          </h2>
          <p className="text-base text-apple-secondary leading-relaxed">
            {backendStatus === 'connected' 
              ? "Upload a PDF file below to extract summary, keywords, and analytics in real time."
              : "Demo Mode Active. Select a preloaded note or drop a PDF to inspect the local summarizer's features."
            }
          </p>
        </div>

        {/* MacBook Browser Glass Container */}
        <div className="w-full max-w-5xl mx-auto glass-card rounded-[32px] shadow-apple-hover border border-apple-border/20 overflow-hidden flex flex-col h-[650px] md:h-[580px]">
          
          {/* MacBook Title Bar */}
          <div className="px-6 py-4 bg-apple-section/60 border-b border-apple-border/10 flex items-center justify-between">
            {/* Window Dots */}
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>
            
            {/* Address Bar */}
            <div className="bg-white/70 text-[10px] md:text-xs text-apple-secondary px-6 md:px-16 py-1.5 rounded-full border border-apple-border/10 flex items-center gap-1.5 select-none shadow-sm truncate max-w-xs md:max-w-md">
              <span className="text-emerald-500 font-bold">● local-sec</span>
              <span className="text-apple-border">|</span>
              <span className="truncate">summora.local/{filename || ''}</span>
            </div>
            
            {/* Badge for Connection status */}
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${backendStatus === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="text-[10px] text-apple-secondary font-bold hidden sm:inline uppercase tracking-wide">
                {backendStatus === 'connected' ? 'Local API Online' : 'Client Demo Mode'}
              </span>
            </div>
          </div>

          {/* Browser Workspace */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-white/40">
            
            {/* Left Side: Upload & Control Area */}
            <div className="p-6 md:p-8 flex flex-col justify-between border-r border-apple-border/10 overflow-y-auto">
              
              {/* Reset/Upload Container */}
              <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {progressStage === 'idle' ? (
                    /* Dropzone State */
                    <motion.div
                      key="dropzone"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`h-64 rounded-[24px] border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 ${
                        isDragOver 
                          ? 'border-apple-blue bg-blue-50/20 shadow-inner' 
                          : 'border-apple-border hover:border-apple-blue/50 hover:bg-apple-section/30'
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept=".pdf" 
                        className="hidden" 
                      />
                      <div className="w-12 h-12 rounded-full bg-apple-section flex items-center justify-center mb-4 text-apple-secondary border border-apple-border/10">
                        <Upload size={20} />
                      </div>
                      <h4 className="text-sm font-bold text-apple-text mb-1">Drag & Drop PDF here</h4>
                      <p className="text-xs text-apple-secondary mb-4">or click to browse your files</p>
                      <button className="btn-outline py-2 px-5 text-xs bg-white shadow-sm border-apple-border font-bold">
                        Choose File
                      </button>
                      <span className="text-[10px] text-apple-secondary mt-3">PDF files only (max 15MB)</span>
                    </motion.div>
                  ) : progressStage === 'uploading' || progressStage === 'processing' ? (
                    /* Loading/Progress State */
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-64 flex flex-col items-center justify-center text-center p-6"
                    >
                      <div className="relative mb-6">
                        <div className="w-16 h-16 rounded-full border-4 border-apple-section flex items-center justify-center text-apple-blue font-bold text-xs" />
                        <div className="absolute inset-0 rounded-full border-4 border-t-apple-blue border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                        <FileText size={24} className="text-apple-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      
                      <h4 className="text-sm font-bold text-apple-text mb-1">
                        {progressStage === 'uploading' ? 'Extracting Notes Content...' : 'Analyzing & Summarizing...'}
                      </h4>
                      <p className="text-xs text-apple-secondary mb-4">Running offline NLP algorithms</p>
                      
                      {/* Custom progress bar */}
                      <div className="w-48 h-2 bg-apple-section rounded-full overflow-hidden mb-2 border border-apple-border/10">
                        <div 
                          className="h-full bg-gradient-to-r from-apple-blue to-purple-500 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-apple-blue">{uploadProgress}%</span>
                    </motion.div>
                  ) : progressStage === 'done' ? (
                    /* Uploaded Success State */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-64 flex flex-col items-center justify-center text-center p-6"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mb-4 shadow-sm">
                        <Check size={28} className="animate-scaleIn" />
                      </div>
                      <h4 className="text-sm font-bold text-apple-text truncate max-w-xs mb-1">
                        {filename}
                      </h4>
                      <p className="text-xs text-emerald-600 mb-6 font-semibold">Processed Successfully</p>
                      
                      <button 
                        onClick={handleReset}
                        className="btn-outline py-2 px-5 text-xs bg-white hover:bg-apple-section border-apple-border flex items-center gap-1.5 font-bold"
                      >
                        <RefreshCw size={12} />
                        <span>Upload Another File</span>
                      </button>
                    </motion.div>
                  ) : (
                    /* Error State */
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-64 flex flex-col items-center justify-center text-center p-6"
                    >
                      <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center mb-4 shadow-sm">
                        <AlertCircle size={28} />
                      </div>
                      <h4 className="text-sm font-bold text-apple-text mb-1">Analysis Failed</h4>
                      <p className="text-xs text-red-600 mb-6 truncate max-w-xs font-semibold">{apiError || 'An unknown error occurred'}</p>
                      
                      <button 
                        onClick={handleReset}
                        className="btn-primary py-2 px-6 text-xs bg-apple-blue flex items-center gap-1.5 font-bold"
                      >
                        <RefreshCw size={12} />
                        <span>Try Again</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Right Side: Generated Output Dashboard */}
            <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-[#F9F9FB]/50">
              <AnimatePresence mode="wait">
                {progressStage === 'done' ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-between h-full gap-6"
                  >
                    {/* Header info */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold text-apple-blue uppercase tracking-widest">
                          Local NLP Report
                        </span>
                        {/* Reading Time */}
                        <div className="flex items-center gap-1.5 text-xs text-apple-secondary font-semibold bg-white px-3 py-1 rounded-full border border-apple-border/20 shadow-sm">
                          <Clock size={12} className="text-apple-blue" />
                          <span>{analytics.reading_time_minutes} min read</span>
                        </div>
                      </div>
                      
                      {/* Summary points with Audio Reader Controls */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <h3 className="text-base font-bold text-apple-text">Extractive Summary</h3>
                        
                        {/* Audio Controls */}
                        {window.speechSynthesis && (
                          <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-full border border-apple-border/20 shadow-sm text-xs font-semibold select-none">
                            {/* Voice selector */}
                            <div className="flex items-center gap-1 border-r border-apple-border/20 pr-2">
                              <button
                                onClick={() => setVoiceGender('female')}
                                className={`px-2 py-0.5 rounded-md transition-all ${
                                  voiceGender === 'female' 
                                    ? 'bg-apple-blue/10 text-apple-blue font-bold dark:bg-apple-blue/20' 
                                    : 'text-apple-secondary hover:text-apple-text'
                                }`}
                              >
                                Female
                              </button>
                              <button
                                onClick={() => setVoiceGender('male')}
                                className={`px-2 py-0.5 rounded-md transition-all ${
                                  voiceGender === 'male' 
                                    ? 'bg-apple-blue/10 text-apple-blue font-bold dark:bg-apple-blue/20' 
                                    : 'text-apple-secondary hover:text-apple-text'
                                }`}
                              >
                                Male
                              </button>
                            </div>

                            {/* Play/Pause Button */}
                            <button
                              onClick={isPlaying ? handlePause : handleSpeak}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-apple-text dark:text-zinc-300 hover:bg-apple-section dark:hover:bg-zinc-700 transition-colors"
                              title={isPlaying ? "Pause" : isPaused ? "Resume" : "Listen to Summary"}
                              aria-label={isPlaying ? "Pause" : "Play"}
                            >
                              {isPlaying ? (
                                <PauseIcon size={12} className="text-apple-blue fill-current" />
                              ) : (
                                <Play size={12} className="text-apple-blue fill-current ml-0.5" />
                              )}
                            </button>

                            {/* Stop Button */}
                            {(isPlaying || isPaused) && (
                              <button
                                onClick={handleStop}
                                className="w-6 h-6 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                                title="Stop Listening"
                                aria-label="Stop"
                              >
                                <Square size={10} className="fill-current" />
                              </button>
                            )}

                            {/* Status Indicator */}
                            <div className="flex items-center gap-1 ml-1">
                              <Volume2 size={12} className={isPlaying ? "text-apple-blue animate-pulse" : "text-apple-secondary dark:text-zinc-500"} />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-apple-secondary leading-relaxed bg-white p-4 rounded-2xl border border-apple-border/10 shadow-sm h-48 overflow-y-auto mb-4 scrollbar-thin dark:bg-zinc-800 dark:border-zinc-700/50">
                        <ul className="list-disc pl-4 space-y-2 text-[11px] md:text-xs">
                          {summary.split('. ').filter(s => s.trim().length > 10).map((sentence, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {sentence.trim()}{sentence.endsWith('.') ? '' : '.'}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Keywords Badges */}
                      <h4 className="text-xs font-bold text-apple-text mb-2.5">Key Concepts</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {keywords.map((kw) => (
                          <span 
                            key={kw} 
                            className="px-2.5 py-1 text-[10px] font-semibold bg-white text-apple-text border border-apple-border/20 rounded-lg shadow-sm hover:border-apple-blue transition-colors cursor-default"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions / Stats */}
                    <div className="border-t border-apple-border/10 pt-4 flex items-center justify-between">
                      {/* Quick Stats Grid */}
                      <div className="flex gap-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-apple-secondary font-semibold">Pages</span>
                          <span className="text-sm font-bold text-apple-text">{analytics.pages}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-apple-secondary font-semibold">Words</span>
                          <span className="text-sm font-bold text-apple-text">{analytics.words}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-apple-secondary font-semibold">Characters</span>
                          <span className="text-sm font-bold text-apple-text">{(analytics.characters / 1000).toFixed(1)}k</span>
                        </div>
                      </div>

                      {/* Download button */}
                      <button 
                        onClick={handleDownload}
                        className="btn-primary py-2 px-4 text-xs flex items-center gap-1.5"
                      >
                        <Download size={13} />
                        <span>Export Summary</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Waiting Placeholder */
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center h-full py-12 px-6"
                  >
                    <div className="w-16 h-16 rounded-[22px] bg-white border border-apple-border/25 flex items-center justify-center text-apple-secondary shadow-sm mb-6">
                      <ListFilter size={28} className="text-apple-secondary/60" />
                    </div>
                    <h3 className="text-sm font-bold text-apple-text mb-1">Report Dashboard</h3>
                    <p className="text-xs text-apple-secondary max-w-xs leading-relaxed">
                      Upload a PDF file or choose one of our sample documents to unlock this section and review the summaries, metadata details, and tags.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
