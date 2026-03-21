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
              whileHover={{ scale: 1.25, marginBottom: 16 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openWindow(app.id)}
              className="relative group cursor-pointer flex flex-col items-center"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-b from-white/20 to-transparent rounded-[14px] border border-white/20 text-white shadow-lg transition-shadow group-hover:shadow-blue-500/20">
                {IconComponent && React.createElement(IconComponent as any, { 
                    size: 30, 
                    strokeWidth: 1.5 
                })}
              </div>
              
              <AnimatePresence>
                {windows.some(w => w.appId === app.id) && (
                   <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-1.5 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white]" 
                   />
                )}
              </AnimatePresence>
              
              {/* Window Preview / Tooltip */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 px-0 py-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-4 group-hover:translate-y-0 z-50">
                {windows.some(w => w.appId === app.id) ? (
                    <div className="flex flex-col items-center gap-2">
                         <div className="w-32 h-20 bg-black/40 backdrop-blur-xl border border-white/20 rounded-lg overflow-hidden flex items-center justify-center shadow-2xl">
                            <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{app.name}</span>
                         </div>
                         <div className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] rounded-md border border-white/10">
                            {app.name}
                        </div>
                    </div>
                ) : (
                    <div className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] rounded-md border border-white/10">
                        {app.name}
                    </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
