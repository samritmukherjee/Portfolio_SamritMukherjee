'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '@/context/OSContext';
import { useWindows } from '@/context/WindowContext';
import { APPS } from '@/constants';
import * as Icons from 'lucide-react';

export default function Dock() {
  const { os } = useOS();
  const { openWindow, windows } = useWindows();

  if (os !== 'macos') return null;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 px-2 flex items-end">
      <div className="flex items-end gap-3 px-3 py-2.5 bg-white/[0.1] backdrop-blur-2xl border border-white/[0.15] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-white/[0.15]">
        {APPS.map((app) => {
          // @ts-ignore
          const IconComponent = Icons[app.icon as keyof typeof Icons];
          
          return (
            <motion.div
              key={app.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ 
                scale: 1.2, 
                y: -12,
                transition: { type: "spring", stiffness: 300, damping: 15 }
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => openWindow(app.id)}
              className="relative group cursor-pointer flex flex-col items-center"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-b from-white/10 to-transparent rounded-[14px] border border-white/20 text-white shadow-xl transition-all duration-300 group-hover:border-white/40 group-hover:shadow-blue-500/10 group-active:scale-90">
                {IconComponent && React.createElement(IconComponent as any, { 
                    size: 28, 
                    strokeWidth: 1.5,
                    className: "group-hover:text-blue-400 transition-colors"
                })}
              </div>
              
              <AnimatePresence>
                {windows.some(w => w.appId === app.id) && (
                   <motion.div 
                    layoutId={`indicator-${app.id}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]" 
                   />
                )}
              </AnimatePresence>
              
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="px-3 py-1.5 bg-black/80 backdrop-blur-xl text-white text-[11px] font-semibold rounded-lg border border-white/10 shadow-2xl whitespace-nowrap">
                      {app.name}
                  </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
