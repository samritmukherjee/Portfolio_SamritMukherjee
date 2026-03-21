'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { APPS } from '@/constants';
import * as Icons from 'lucide-react';
import { useWindows } from '@/context/WindowContext';

export default function StartMenu({ onClose }: { onClose: () => void }) {
  const { openWindow } = useWindows();

  return (
    <motion.div
      initial={{ y: 300, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 300, opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', damping: 28, stiffness: 350 }}
      className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[600px] max-w-[95vw] h-[640px] bg-[#1c1c1c]/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden z-[100]"
    >
      <div className="p-8 flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="relative mb-10">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/40">
                <Icons.Search size={16} />
            </div>
            <input 
                type="text" 
                placeholder="Search for apps, settings, and documents" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:bg-white/[0.08] focus:border-blue-500/50 transition-all shadow-inner"
            />
        </div>

        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-[14px] font-bold text-white tracking-wide">Pinned</h2>
          <button className="text-[11px] bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md border border-white/5 transition-all text-white/70 font-semibold group flex items-center gap-1.5">
            All apps 
            <Icons.ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-6 gap-x-2 gap-y-10 flex-1 overflow-y-auto px-2 pb-8 custom-scrollbar">
          {APPS.map((app) => {
            const Icon = Icons[app.icon as keyof typeof Icons] as any;
            return (
              <button
                key={app.id}
                onClick={() => { openWindow(app.id); onClose(); }}
                className="flex flex-col items-center gap-3 group transition-all"
              >
                <div className="relative">
                    <div className="w-12 h-12 flex items-center justify-center p-2.5 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 group-hover:scale-110 transition-transform group-active:scale-95 shadow-xl group-hover:shadow-blue-500/20 group-hover:border-white/20">
                        {Icon && <Icon size={28} strokeWidth={1.5} className="text-white opacity-90" />}
                    </div>
                    <div className="absolute -inset-1 bg-blue-500 opacity-0 group-hover:opacity-10 blur-xl transition-opacity rounded-full" />
                </div>
                <span className="text-[11px] font-medium text-white/80 group-hover:text-white transition-colors">{app.name}</span>
              </button>
            );
          })}
        </div>

        {/* Recommended / Recent Section Placeholder */}
        <div className="mt-auto px-2 py-6 border-t border-white/5">
            <h2 className="text-[14px] font-bold text-white tracking-wide mb-4">Recommended</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <Icons.FileText size={16} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[12px] text-white/90 font-medium">Resume.pdf</span>
                        <span className="text-[10px] text-white/40">Recently opened</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center text-purple-400">
                        <Icons.Code2 size={16} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[12px] text-white/90 font-medium">Cosmic Canvas</span>
                        <span className="text-[10px] text-white/40">Pinned project</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="h-16 bg-black/40 backdrop-blur-md px-10 flex items-center justify-between border-t border-white/[0.08]">
        <div className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 px-3 py-1.5 rounded-lg transition-all active:scale-95">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-xs font-bold shadow-lg ring-1 ring-white/20 group-hover:ring-white/40">SM</div>
          <span className="text-[12px] font-semibold text-white/90">Samrit Mukherjee</span>
        </div>
        <button className="p-2.5 hover:bg-white/10 rounded-lg transition-all active:scale-90 group">
          <Icons.Power size={18} className="text-white/60 group-hover:text-[#ff5f57] transition-all" />
        </button>
      </div>
    </motion.div>
  );
}
