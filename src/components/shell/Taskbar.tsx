'use client';

import React from 'react';
import { useOS } from '@/context/OSContext';
import { useWindows } from '@/context/WindowContext';
import { APPS } from '@/constants';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StartMenu from './StartMenu';

export default function Taskbar() {
  const { os, toggleOS } = useOS();
  const { openWindow, windows, activeWindowId } = useWindows();
  const [isStartOpen, setIsStartOpen] = React.useState(false);
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (os !== 'windows') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-[#0f0f0f]/80 backdrop-blur-3xl border-t border-white/[0.05] z-[100] flex items-center justify-between px-4 select-none">
      {/* Start Button & Search (Left on small, system tray-ish) */}
      <div className="flex-1 flex items-center gap-2">
         <button
           onClick={() => setIsStartOpen(!isStartOpen)}
           className={`p-2 transition-all duration-200 hover:bg-white/10 rounded group ${isStartOpen ? 'bg-white/10' : ''}`}
         >
           <div className="grid grid-cols-2 gap-0.5 w-5 h-5 transition-transform group-active:scale-90">
             <div className="bg-[#0078d4] rounded-[1px]" />
             <div className="bg-[#00bcf2] rounded-[1px]" />
             <div className="bg-[#0078d4] rounded-[1px]" />
             <div className="bg-[#00bcf2] rounded-[1px]" />
           </div>
         </button>
         <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-md px-3 py-1.5 w-40 gap-2 text-white/40 cursor-text hover:bg-white/10 transition-colors">
            <Icons.Search size={14} />
            <span className="text-[11px]">Search</span>
         </div>
      </div>

      {/* Centered App Icons */}
      <div className="flex items-center gap-1 absolute left-1/2 -translate-x-1/2 h-full py-1">
        {APPS.map((app) => {
          const Icon = Icons[app.icon as keyof typeof Icons] as any;
          const isOpen = windows.some(w => w.appId === app.id);
          const isActive = windows.find(w => w.appId === app.id)?.id === activeWindowId;

          return (
            <div key={app.id} className="relative group h-full flex items-center">
              <button
                onClick={() => openWindow(app.id)}
                className={`p-2 rounded transition-all duration-200 hover:bg-white/10 mx-0.5 group-active:scale-90`}
              >
                {Icon && <Icon size={24} strokeWidth={1.5} className="text-white opacity-90" />}
              </button>
              
              {isOpen && (
                <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all duration-300 ${isActive ? 'w-4 bg-[#0078d4]' : 'w-1 bg-white/40'}`} />
              )}

              {/* Window Preview */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-4 group-hover:translate-y-0 z-50">
                <div className="flex flex-col items-center gap-1.5">
                    {isOpen && (
                         <div className="w-40 h-24 bg-[#1f1f1f]/95 border border-white/10 rounded-md overflow-hidden flex items-center justify-center shadow-2xl">
                            <span className="text-[10px] text-white/30 uppercase font-bold">{app.name}</span>
                         </div>
                    )}
                    <div className="px-3 py-1 bg-[#1f1f1f] text-white text-[11px] rounded border border-white/10 whitespace-nowrap">
                        {app.name}
                    </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* System Tray Right */}
      <div className="flex-1 flex justify-end items-center gap-4 text-white">
         <button
            onClick={toggleOS}
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-md transition-colors text-white/70 hover:text-white"
            title="Switch to macOS"
         >
            <Icons.Apple size={16} />
            <span className="hidden lg:inline text-[11px] font-medium">macOS</span>
         </button>
         
         <div className="hidden md:flex items-center gap-2.5 opacity-60">
            <Icons.Wifi size={16} />
            <Icons.Volume2 size={16} />
            <Icons.Battery size={16} />
         </div>

         <div className="text-right tabular-nums cursor-default">
            <div className="text-[11px] font-bold">{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
            <div className="text-[10px] opacity-60">{time.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</div>
         </div>
      </div>

      <AnimatePresence>
        {isStartOpen && (
          <StartMenu onClose={() => setIsStartOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
