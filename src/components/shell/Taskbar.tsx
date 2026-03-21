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
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#000000]/85 backdrop-blur-[50px] border-t border-white/[0.08] z-[100] flex items-center justify-between px-4 select-none">
      {/* Start Button & Search */}
      <div className="flex-1 flex items-center gap-1">
         <button
           onClick={() => setIsStartOpen(!isStartOpen)}
           className={`p-2 transition-all duration-300 hover:bg-white/10 rounded-md group relative ${isStartOpen ? 'bg-white/10' : ''}`}
         >
           <div className="grid grid-cols-2 gap-0.5 w-[1.1rem] h-[1.1rem] transition-transform group-active:scale-90 group-hover:rotate-[5deg]">
             <div className="bg-[#0078d4] rounded-[1px]" />
             <div className="bg-[#00bcf2] rounded-[1px]" />
             <div className="bg-[#0078d4] rounded-[1px]" />
             <div className="bg-[#00bcf2] rounded-[1px]" />
           </div>
           {isStartOpen && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_white]" />}
         </button>
         
         <div className="hidden sm:flex items-center bg-white/[0.05] border border-white/10 rounded-full px-4 py-1.5 w-48 gap-3 text-white/30 cursor-pointer hover:bg-white/[0.08] hover:border-white/20 transition-all group ml-1">
            <Icons.Search size={14} className="group-hover:text-white/60 transition-colors" />
            <span className="text-[11px] font-medium">Search</span>
         </div>
      </div>

      {/* Centered App Icons */}
      <div className="flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2 h-full py-1">
        {APPS.map((app) => {
          const Icon = Icons[app.icon as keyof typeof Icons] as any;
          const isOpen = windows.some(w => w.appId === app.id);
          const isActive = windows.find(w => w.appId === app.id)?.id === activeWindowId;

          return (
            <div key={app.id} className="relative group h-full flex items-center px-0.5">
              <button
                onClick={() => openWindow(app.id)}
                className={`p-2 rounded-md transition-all duration-200 hover:bg-white/10 group-active:scale-90 ${isActive ? 'bg-white/5 shadow-inner' : ''}`}
              >
                {Icon && <Icon size={24} strokeWidth={1.5} className={`transition-all duration-300 ${isOpen ? 'text-white opacity-100 scale-100' : 'text-white opacity-70 group-hover:opacity-100 group-hover:scale-110'}`} />}
              </button>
              
              {isOpen && (
                <div className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all duration-300 shadow-[0_0_5px_rgba(0,120,212,0.5)] ${isActive ? 'w-4 bg-[#0078d4]' : 'w-1.5 bg-white/40'}`} />
              )}

              {/* Tooltip */}
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="px-3 py-1.5 bg-[#1f1f1f] text-white text-[11px] font-semibold rounded-lg border border-white/10 shadow-2xl whitespace-nowrap">
                      {app.name}
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
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-md transition-all active:scale-95 text-white/60 hover:text-white group"
            title="Switch to macOS"
         >
            <Icons.Apple size={16} className="group-hover:rotate-[10deg] transition-transform" />
            <span className="hidden lg:inline text-[11px] font-black uppercase tracking-widest">macOS</span>
         </button>
         
         <div className="hidden md:flex items-center gap-3 py-1.5 px-2 hover:bg-white/5 rounded-md transition-colors">
            <Icons.Wifi size={14} className="opacity-60" />
            <Icons.Volume2 size={14} className="opacity-60" />
            <Icons.Battery size={14} className="opacity-60" />
         </div>

         <div className="flex flex-col items-end px-2 py-1 justify-center cursor-default hover:bg-white/5 rounded-md transition-colors min-w-[70px]">
            <div className="text-[11px] font-bold tracking-tight">{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
            <div className="text-[9px] opacity-40 font-medium">{time.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</div>
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
