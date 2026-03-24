'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BootScreenProps {
  onFinish: () => void;
  os: 'windows' | 'macos';
}

// macOS Boot Screen
const MacOSBoot = ({ progress, onFinish }: { progress: number; onFinish: () => void }) => (
  <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none overflow-hidden">
    {/* Main content */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-20 relative z-10"
    >
      {/* Apple Logo Image - Much larger */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-64 h-64 flex items-center justify-center"
      >
        <Image
          src="/wallpapers/macBoot.png"
          alt="macOS Boot"
          width={256}
          height={256}
          className="w-full h-full object-contain"
          priority
        />
      </motion.div>

      {/* SAMRIT OS Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center space-y-2"
      >
        <h1 className="text-5xl font-light text-white tracking-tight">
          SAMRIT OS
        </h1>
        <p className="text-sm text-white/50 font-light">macOS</p>
      </motion.div>
    </motion.div>

    {/* Bottom progress bar */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute bottom-20 w-80 space-y-4 flex flex-col items-center"
    >
      {/* Progress bar */}
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
    </motion.div>
  </div>
);

// Windows Boot Screen
const WindowsBoot = ({ progress, onFinish }: { progress: number; onFinish: () => void }) => (
  <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none overflow-hidden">
    {/* Main content */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-12 mt-20"
    >
      {/* Windows Logo Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-40 h-32 flex items-center justify-center"
      >
        <Image
          src="/wallpapers/WindowBoot.png"
          alt="Windows Boot"
          width={200}
          height={160}
          className="w-full h-full object-contain"
          priority
        />
      </motion.div>

      {/* SAMRIT OS Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center space-y-2"
      >
        <h1 className="text-5xl font-light text-white tracking-tight">
          SAMRIT OS
        </h1>
        <p className="text-sm text-white/50 font-light">Windows</p>
      </motion.div>
    </motion.div>

    {/* Windows boot spinner and progress */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute bottom-20 w-72 space-y-6 flex flex-col items-center"
    >
      {/* Spinning dotted ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="relative w-16 h-16"
      >
        <svg
          viewBox="0 0 60 60"
          className="w-full h-full"
        >
          {/* Dotted ring - 12 dots arranged in a circle */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const x = 30 + 25 * Math.cos(angle);
            const y = 30 + 25 * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="2.5"
                fill="#ffffff"
                opacity={i === 0 ? 1 : 0.3}
              />
            );
          })}
        </svg>
      </motion.div>
    </motion.div>

    {/* Top-left corner accent (Windows 11 style) */}
    <div className="absolute top-0 left-0 w-1 h-32 bg-gradient-to-b from-blue-500/30 to-transparent" />
    <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-blue-500/30 to-transparent" />
  </div>
);

export default function BootScreen({ onFinish, os }: BootScreenProps) {
  const [progress, setProgress] = useState(0);

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

    return () => clearInterval(timer);
  }, [onFinish]);

  return os === 'macos' ? (
    <MacOSBoot progress={progress} onFinish={onFinish} />
  ) : (
    <WindowsBoot progress={progress} onFinish={onFinish} />
  );
}
