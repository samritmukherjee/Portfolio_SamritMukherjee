'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_STEPS = [
  "Initializing kernel...",
  "Loading graphics drivers...",
  "Mounting network drives...",
  "Starting OS services...",
  "Optimizing UI performance...",
  "Ready to launch."
];

export default function BootScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds
    const interval = 30;
    const stepIncrement = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 500); // Small delay before unmounting
          return 100;
        }
        return prev + stepIncrement;
      });
    }, interval);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev < BOOT_STEPS.length - 1 ? prev + 1 : prev));
    }, duration / BOOT_STEPS.length);

    return () => {
      clearInterval(timer);
      clearInterval(stepInterval);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center select-none overflow-hidden font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-12"
      >
        {/* Logo/Title */}
        <div className="flex flex-col items-center">
            <motion.h1 
              className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              SAMRIT OS
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.5 }}
              className="mt-2 text-white/40 tracking-[0.5em] uppercase text-[10px] font-medium"
            >
              Systems Corporation
            </motion.p>
        </div>

        {/* Loading Info */}
        <div className="flex flex-col items-center gap-6 w-72">
            <div className="w-full space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-white/30 uppercase tracking-widest">
                    <span>{BOOT_STEPS[currentStep]}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                {/* Progress Bar Container */}
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/10">
                    {/* Glowing Fill */}
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                      style={{ width: `${progress}%` }}
                      transition={{ ease: "linear" }}
                    />
                </div>
            </div>

            <div className="flex gap-1.5">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1, 
                        delay: i * 0.2 
                      }}
                      className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    />
                ))}
            </div>
        </div>
      </motion.div>

      {/* Background Micro-details */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
}
