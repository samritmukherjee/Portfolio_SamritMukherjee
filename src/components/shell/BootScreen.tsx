'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_STEPS = [
  "► Initializing quantum core...",
  "► Loading neural processors...",
  "► Syncing distributed nodes...",
  "► Calibrating AI engine...",
  "► Deploying security protocols...",
  "► Finalizing boot sequence...",
  "► READY."
];

// Animated particles for background
const Particle = ({ delay, duration }: { delay: number; duration: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
    animate={{
      x: [0, Math.random() * 200 - 100],
      y: [0, Math.random() * 200 - 100],
      opacity: [0, 0.6, 0],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      filter: 'blur(1px)',
    }}
  />
);

// Glitch effect component
const GlitchText = ({ text }: { text: string }) => (
  <div className="relative">
    {/* Main text */}
    <motion.span
      className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
      animate={{
        textShadow: [
          '0 0 10px rgba(59,130,246,0.6)',
          '0 0 20px rgba(6,182,212,0.8)',
          '0 0 10px rgba(59,130,246,0.6)',
        ],
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {text}
    </motion.span>
    
    {/* Glitch layers */}
    {[1, 2].map((i) => (
      <motion.span
        key={i}
        className="absolute top-0 left-0 text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 bg-clip-text text-transparent opacity-50"
        animate={{
          x: [0, -2, 2, -1, 1, 0],
          y: [0, 1, -1, 2, -2, 0],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 0.4,
          delay: i * 0.1,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        {text}
      </motion.span>
    ))}
  </div>
);

export default function BootScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const duration = 2800; // 2.8 seconds
    const interval = 30;
    const stepIncrement = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 400);
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
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#0a0e27] via-[#050505] to-[#1a0033] flex flex-col items-center justify-center select-none overflow-hidden font-sans">
      <style>{`
        @keyframes scanlines {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes grid {
          0% { backgroundPosition: 0 0; }
          100% { backgroundPosition: 40px 40px; }
        }
        .scanlines {
          animation: scanlines 8s linear infinite;
          pointer-events: none;
        }
        .grid-bg {
          animation: grid 6s linear infinite;
        }
      `}</style>

      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <Particle key={i} delay={i * 0.1} duration={4 + Math.random() * 2} />
        ))}
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none grid-bg"
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.05) 25%, rgba(6, 182, 212, 0.05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.05) 75%, rgba(6, 182, 212, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, 0.05) 25%, rgba(6, 182, 212, 0.05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.05) 75%, rgba(6, 182, 212, 0.05) 76%, transparent 77%, transparent)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Scanlines effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent scanlines pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-10 relative z-10"
      >
        {/* Logo/Title with Glitch */}
        <div className="flex flex-col items-center gap-2">
          <GlitchText text="SAMRIT OS" />
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '200px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />
          <motion.p 
            initial={{ opacity: 0, letterSpacing: '0px' }}
            animate={{ opacity: 0.4, letterSpacing: '0.15em' }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-white tracking-widest uppercase text-xs font-mono mt-1"
          >
            Personal OS
          </motion.p>
        </div>

        {/* Loading Info */}
        <div className="flex flex-col items-center gap-6 w-80">
          {/* Boot message with typewriter effect */}
          <motion.div
            className="h-16 flex items-center"
          >
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-sm text-cyan-400/80 whitespace-nowrap"
            >
              {BOOT_STEPS[currentStep]}
            </motion.div>
          </motion.div>

          {/* Advanced Progress Bar */}
          <div className="w-full space-y-3">
            <div className="flex justify-between text-xs font-mono text-cyan-400/50 uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse rounded-full" />
                LOADING
              </span>
              <span>{Math.round(progress)}%</span>
            </div>

            {/* Multiple layered progress bars */}
            <div className="space-y-1.5">
              {/* Background bar */}
              <div className="h-2 w-full bg-white/5 rounded-lg overflow-hidden relative border border-cyan-500/20">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-600 via-blue-500 to-purple-600"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
                <div className="absolute inset-0 opacity-50 shadow-[inset_0_0_10px_rgba(6,182,212,0.4)]" />
              </div>

              {/* Secondary subtle bar */}
              <motion.div className="h-1 bg-white/5 rounded-lg overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                  style={{ width: `${progress * 1.1}%` }}
                  transition={{ ease: "linear" }}
                />
              </motion.div>
            </div>
          </div>

          {/* Animated loading dots */}
          <div className="flex gap-2 items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  opacity: progress > (i * 20) ? [0.3, 1, 0.3] : 0.2,
                  scale: progress > (i * 20) ? [1, 1.3, 1] : 1,
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.2, 
                  delay: i * 0.15,
                }}
                className="w-1.5 h-1.5 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"
              />
            ))}
          </div>
        </div>

        {/* Bottom status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 50 ? 0.3 : 0 }}
          className="font-mono text-[10px] text-white/20 uppercase tracking-[0.2em] mt-4"
        >
          System Ready in {Math.round((100 - progress) / 40)}s
        </motion.div>
      </motion.div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.4)]" />
    </div>
  );
}
