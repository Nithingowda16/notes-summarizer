import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const MOCK_DOCS = {
  "machine_learning_101.pdf": {
    filename: "machine_learning_101.pdf",
    summary: "Machine Learning (ML) is a core subset of Artificial Intelligence (AI) focused on building systems that learn from data and improve their performance over time without explicit programming. Unlike traditional algorithms that follow rigid, hardcoded rules, ML systems identify complex patterns in large datasets to make predictions and decisions. The workflow involves data collection, preprocessing, model selection, training, and evaluation. Main paradigms include Supervised Learning (using labeled training data to learn mapping functions), Unsupervised Learning (finding hidden patterns or groupings in unlabeled data), and Reinforcement Learning (training agents through rewards and penalties in dynamic environments). Applications span web search, recommendation systems, autonomous driving, speech recognition, and medical diagnostics.",
    keywords: ["Machine Learning", "Supervised Learning", "Unsupervised Learning", "Neural Networks", "Data Training", "Model Evaluation", "Pattern Recognition", "Artificial Intelligence"],
    analytics: {
      pages: 12,
      words: 2450,
      characters: 16580,
      reading_time_minutes: 12
    },
    qa: [
      {
        q: "What is machine learning?",
        a: "Machine Learning is a subset of artificial intelligence that enables computer systems to learn from data, identify patterns, and make decisions with minimal human intervention, improving their performance over time without being explicitly programmed."
      },
      {
        q: "What are the main paradigms of learning?",
        a: "The three main paradigms are: 1) Supervised Learning (learning from labeled training data), 2) Unsupervised Learning (discovering hidden patterns or structures in unlabeled data), and 3) Reinforcement Learning (learning by trial-and-error using reward and penalty feedback)."
      },
      {
        q: "What is neural networks?",
        a: "Neural Networks are computational models inspired by the human brain's structure. They consist of interconnected nodes (neurons) organized in layers (input, hidden, output) that process input features and extract hierarchical patterns to make predictions."
      }
    ]
  },
  "gemini_architecture.pdf": {
    filename: "gemini_architecture.pdf",
    summary: "Gemini is Google's highly advanced, natively multimodal AI model family designed to seamlessly operate across text, code, images, audio, and video. Built from the ground up, Gemini uses a transformer-based decoder architecture optimized for efficient training and inference. Unlike traditional systems that cascade separate models for different modalities, Gemini integrates them into a single unified network, allowing it to reason across different inputs simultaneously. It is trained on TPUv5e and TPUv5p accelerators and comes in different sizes: Ultra (highly complex tasks), Pro (versatile scaling), Flash (speed and efficiency), and Nano (on-device processing). Gemini models exhibit state-of-the-art performance in complex reasoning, mathematical problem solving, multilingual understanding, and agentic coding capabilities.",
    keywords: ["Multimodal", "Transformer Decoder", "TPU Training", "Gemini Ultra", "Cross-Modal Reasoning", "Flash Efficiency", "Agentic Coding", "Google DeepMind"],
    analytics: {
      pages: 45,
      words: 9280,
      characters: 62400,
      reading_time_minutes: 46
    },
    qa: [
      {
        q: "What is Gemini?",
        a: "Gemini is a family of natively multimodal AI models developed by Google DeepMind. It is built from the ground up to handle and reason across multiple modalities including text, images, audio, video, and code in a single unified architecture."
      },
      {
        q: "What are the different sizes of Gemini?",
        a: "Gemini models are scaled into four main configurations: 1) Ultra (flagship model for complex tasks), 2) Pro (versatile model for general scale), 3) Flash (fast, lightweight, cost-effective model), and 4) Nano (highly efficient model optimized for running locally on-device)."
      },
      {
        q: "How was Gemini trained?",
        a: "Gemini models were trained using Google's state-of-the-art TPU v4 and TPU v5e/v5p accelerators across multiple data centers, leveraging highly optimized software pipelines for distributed transformer training."
      }
    ]
  }
};

export const AppProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // 0 to 100
  const [progressStage, setProgressStage] = useState('idle'); // idle, uploading, processing, done, error
  const [activeTab, setActiveTab] = useState('summary'); // summary, chat, stats, details
  
  // NLP Data state
  const [filename, setFilename] = useState('');
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [analytics, setAnalytics] = useState({
    pages: 0,
    words: 0,
    characters: 0,
    reading_time_minutes: 0
  });
  
  // Chat Q&A State
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'assistant',
      text: 'Hello! I am your local AI assistant. Once you upload a PDF notes file, I can answer questions and help you study the material offline. Try uploading a file or explore the preloaded demo documents!'
    }
  ]);

  // Settings
  const [darkMode, setDarkMode] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking'); // checking, connected, offline
  const [apiError, setApiError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

  // Check connection to Flask backend on mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(`${API_URL}/upload`, { method: 'OPTIONS' }).catch(() => null);
        // OPTIONS preflight or simple request test
        setBackendStatus('connected');
      } catch (err) {
        console.warn("Local backend is offline. Switched to client-side Interactive Demo Mode.");
        setBackendStatus('offline');
      }
    };
    checkBackend();
  }, []);

  // Handle uploading and processing PDF
  const handleUpload = async (uploadedFile) => {
    if (!uploadedFile) return;
    
    setFile(uploadedFile);
    setLoading(true);
    setApiError(null);
    setUploadProgress(10);
    setProgressStage('uploading');

    // Simple visual simulation of upload progress (0 to 100%)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 15;
      });
    }, 200);

    // If backend is offline, use client-side Mock Data for demo purposes
    if (backendStatus === 'offline') {
      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);
        setProgressStage('processing');
        
        setTimeout(() => {
          // Check if mock exists, otherwise create a mock on the fly
          const key = uploadedFile.name.toLowerCase().includes('gemini') ? 'gemini_architecture.pdf' : 'machine_learning_101.pdf';
          const mockData = MOCK_DOCS[key] || MOCK_DOCS["machine_learning_101.pdf"];
          
          setFilename(uploadedFile.name);
          setSummary(mockData.summary);
          setKeywords(mockData.keywords);
          setAnalytics({
            ...mockData.analytics,
            filename: uploadedFile.name
          });
          
          setChatHistory([
            {
              sender: 'assistant',
              text: `I have finished processing "${uploadedFile.name}" locally in Demo Mode! Here is a summary. Ask me anything about this document.`
            }
          ]);
          
          setProgressStage('done');
          setLoading(false);
        }, 1000);
      }, 1500);
      return;
    }

    // Actual upload to Python Flask API
    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      // Upload file
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      clearInterval(interval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process document');
      }

      setUploadProgress(100);
      setProgressStage('processing');

      const data = await response.json();
      
      setFilename(data.filename);
      setSummary(data.summary);
      setKeywords(data.keywords);
      setAnalytics(data.analytics);
      
      setChatHistory([
        {
          sender: 'assistant',
          text: `Success! "${data.filename}" has been parsed and summarized locally. Feel free to ask questions about the text below!`
        }
      ]);
      
      setProgressStage('done');
    } catch (err) {
      console.error(err);
      setApiError(err.message);
      setProgressStage('error');
    } finally {
      setLoading(false);
    }
  };

  // Handle Q&A submissions
  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;
    
    // Add user message
    const updatedHistory = [...chatHistory, { sender: 'user', text: messageText }];
    setChatHistory(updatedHistory);
    
    // Add temporary loading typing bubble for assistant
    setChatHistory(prev => [...prev, { sender: 'assistant', text: 'thinking...', loading: true }]);

    // If backend is offline, search client-side mocks
    if (backendStatus === 'offline') {
      setTimeout(() => {
        const key = filename.toLowerCase().includes('gemini') ? 'gemini_architecture.pdf' : 'machine_learning_101.pdf';
        const docQA = MOCK_DOCS[key]?.qa || MOCK_DOCS["machine_learning_101.pdf"].qa;
        
        // Find best match in QA list
        let bestAnswer = "I couldn't find a direct answer in the document in Demo Mode. Try asking: 'What is machine learning?' or 'What is Gemini?' depending on which note you opened!";
        
        const cleanQuery = messageText.toLowerCase();
        let maxOverlap = 0;
        
        docQA.forEach(item => {
          const words = item.q.toLowerCase().split(' ');
          let overlap = 0;
          words.forEach(w => {
            if (w.length > 3 && cleanQuery.includes(w)) overlap++;
          });
          if (overlap > maxOverlap) {
            maxOverlap = overlap;
            bestAnswer = item.a;
          }
        });

        setChatHistory(prev => {
          // Remove the thinking bubble and append answer
          const filtered = prev.filter(m => !m.loading);
          return [...filtered, { sender: 'assistant', text: bestAnswer }];
        });
      }, 800);
      return;
    }

    // Call local Flask API for Q&A
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: messageText }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to search document');
      }

      const data = await response.json();
      
      setChatHistory(prev => {
        const filtered = prev.filter(m => !m.loading);
        return [...filtered, { sender: 'assistant', text: data.answer }];
      });
    } catch (err) {
      setChatHistory(prev => {
        const filtered = prev.filter(m => !m.loading);
        return [...filtered, { sender: 'assistant', text: `Error asking question: ${err.message}` }];
      });
    }
  };

  // Download summary file helper
  const handleDownload = () => {
    if (!filename) return;
    
    if (backendStatus === 'offline') {
      // Client-side text download fallback
      const content = `====================================================
   SUMMORA - AI-POWERED SMART NOTES SUMMARIZER REPORT
   (Google Gemini Internship Mini Project - DEMO MODE)
====================================================

Document: ${filename}
Pages: ${analytics.pages}
Words: ${analytics.words}
Characters: ${analytics.characters}
Estimated Reading Time: ${analytics.reading_time_minutes} min
----------------------------------------------------

EXTRACTIVE SUMMARY:
${summary}

----------------------------------------------------

EXTRACTED KEYWORDS:
${keywords.join(', ')}

====================================================
Processed locally. No external APIs were contacted.
====================================================`;
      
      const element = document.createElement("a");
      const fileBlob = new Blob([content], {type: 'text/plain'});
      element.href = URL.createObjectURL(fileBlob);
      element.download = `summary_${filename.replace('.pdf', '')}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else {
      // Trigger download from API
      window.open(`${API_URL}/download`, '_blank');
    }
  };

  // Reset current document
  const handleReset = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setFile(null);
    setFilename('');
    setSummary('');
    setKeywords([]);
    setAnalytics({
      pages: 0,
      words: 0,
      characters: 0,
      reading_time_minutes: 0
    });
    setChatHistory([
      {
        sender: 'assistant',
        text: 'Hello! I am your local AI assistant. Once you upload a PDF notes file, I can answer questions and help you study the material offline. Try uploading a file or explore the preloaded demo documents!'
      }
    ]);
    setProgressStage('idle');
    setUploadProgress(0);
  };

  return (
    <AppContext.Provider
      value={{
        file,
        loading,
        uploadProgress,
        progressStage,
        filename,
        summary,
        keywords,
        analytics,
        chatHistory,
        activeTab,
        darkMode,
        backendStatus,
        apiError,
        setActiveTab,
        setDarkMode,
        handleUpload,
        handleSendMessage,
        handleDownload,
        handleReset,
        MOCK_DOCS
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
