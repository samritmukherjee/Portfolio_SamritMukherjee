'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Terminal } from 'lucide-react';

export default function AboutApp() {
  return (
    <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start text-white max-w-5xl mx-auto">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative group shrink-0"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
          <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <User size={80} className="text-white/20" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </motion.div>

      <div className="flex-1 space-y-6">
        <div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-2 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent"
          >
            Samrit Mukherjee
          </motion.h1>
          <p className="text-xl text-blue-400 font-medium tracking-wide">Transforming Ideas into Digital Reality</p>
        </div>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-white/60 leading-relaxed text-lg"
        >
          I am a specialized developer focused on building <span className="text-white font-medium">high-performance, AI-driven</span> web applications. My passion lies in creating seamless user experiences that blend <span className="text-blue-400 font-medium italic">futuristic design</span> with robust engineering.
        </motion.p>

        <div className="grid grid-cols-2 gap-4">
          {['Web Development', 'AI Integration', 'UI/UX Design', 'Cloud Architecture'].map((item, idx) => (
            <motion.div 
              key={item}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/[0.05] hover:bg-white/[0.08] transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                 <Terminal size={16} />
              </div>
              <span className="text-sm font-semibold text-white/80">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
