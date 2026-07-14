import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function CountingNumber({ value, suffix = "", delay = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Parse target number from string (e.g. "250" from "250+")
  const target = parseInt(value.replace(/[^0-9]/g, ''), 10);
  
  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 2000; // 2 seconds animation
    const steps = 50;
    const stepTime = duration / steps;
    const increment = target / steps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const statsList = [
    {
      targetValue: "250",
      suffix: "+",
      label: "Documents Processed",
      description: "Successfully parsed lecture notes and papers."
    },
    {
      targetValue: "98",
      suffix: "%",
      label: "Summary Accuracy",
      description: "Based on objective LexRank extractive indices."
    },
    {
      targetValue: "5",
      suffix: " sec",
      label: "Avg. Processing Time",
      description: "Instantaneous text vectorization and keyword scoring."
    },
    {
      targetValue: "100",
      suffix: "%",
      label: "Offline Processing",
      description: "Zero external network calls, total privacy."
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Stat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-center text-center">
          {statsList.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center p-6"
            >
              {/* Giant animated number */}
              <h3 className="text-5xl md:text-6xl font-black text-apple-text tracking-tight mb-3">
                <CountingNumber value={stat.targetValue} suffix={stat.suffix} />
              </h3>
              
              {/* Label */}
              <h4 className="text-base font-bold text-apple-text mb-1">
                {stat.label}
              </h4>
              
              {/* Description */}
              <p className="text-xs text-apple-secondary leading-relaxed max-w-[200px]">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
