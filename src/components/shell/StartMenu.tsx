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
      initial={{ y: 500, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 500, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[550px] h-[600px] bg-[#1c1c1c]/95 backdrop-blur-3xl border border-white/10 rounded-xl p-8 z-40 text-white shadow-2xl overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-sm font-semibold opacity-80">Pinned Apps</h3>
          <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-colors">All apps &gt;</button>
        </div>

        <div className="grid grid-cols-6 gap-y-10 mb-auto">
          {APPS.map((app) => {
            // @ts-ignore
            const IconComponent = Icons[app.icon as keyof typeof Icons];
            
            return (
              <button
                key={app.id}
                onClick={() => {
                  openWindow(app.id);
                  onClose();
                }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                   {IconComponent && <IconComponent size={24} />}
                </div>
                <span className="text-[11px] text-center opacity-90 group-hover:opacity-100">{app.name}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Samrit" alt="Samrit" />
                </div>
                <span className="text-xs font-semibold">Samrit Mukherjee</span>
            </div>
            <Icons.Power size={14} className="opacity-60 hover:opacity-100 cursor-pointer" />
        </div>
      </div>
    </motion.div>
  );
}
