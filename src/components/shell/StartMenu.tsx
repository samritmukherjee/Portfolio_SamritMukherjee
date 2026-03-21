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
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[520px] max-w-[95vw] bg-[#1c1c1c]/80 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden z-[100]"
    >
      <div className="p-8 flex-1">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[13px] font-bold text-white tracking-wide">Pinned</h2>
          <button className="text-[11px] bg-white/5 px-2.5 py-1 rounded border border-white/5 hover:bg-white/10 transition-colors text-white/70 font-medium">All apps &gt;</button>
        </div>

        <div className="grid grid-cols-6 gap-x-2 gap-y-6">
          {APPS.map((app) => {
            const Icon = Icons[app.icon as keyof typeof Icons] as any;
            return (
              <button
                key={app.id}
                onClick={() => { openWindow(app.id); onClose(); }}
                className="flex flex-col items-center gap-2 group transition-all"
              >
                <div className="w-10 h-10 flex items-center justify-center p-2 rounded-lg bg-gradient-to-br from-white/10 to-transparent border border-white/5 group-hover:scale-110 transition-transform group-active:scale-95 shadow-lg group-hover:shadow-blue-500/20">
                  {Icon && <Icon size={24} strokeWidth={1.5} className="text-white opacity-90" />}
                </div>
                <span className="text-[11px] text-white/80 group-hover:text-white transition-colors">{app.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-16 bg-black/40 backdrop-blur-md px-8 flex items-center justify-between border-t border-white/[0.05]">
        <div className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-2 pr-4 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-xs font-bold shadow-lg ring-1 ring-white/20">SM</div>
          <span className="text-[12px] font-semibold text-white/90">Samrit Mukherjee</span>
        </div>
        <button className="p-2.5 hover:bg-white/10 rounded-lg transition-colors group">
          <Icons.Power size={18} className="text-white/60 group-hover:text-[#ff5f57] transition-colors" />
        </button>
      </div>
    </motion.div>
  );
}
