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
  const { openWindow, windows, activeWindowId, focusWindow } = useWindows();
  const [isStartOpen, setIsStartOpen] = React.useState(false);
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (os !== 'windows') return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-3xl border-t border-white/10 z-50 flex items-center justify-between px-3">
      {/* System Tray Left (Blank for now or small icons) */}
      <div className="flex-1 hidden md:flex" />

      {/* Centered App Icons */}
      <div className="flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
        <button
          onClick={() => setIsStartOpen(!isStartOpen)}
          className={`p-2 transition-all duration-200 hover:bg-white/10 rounded ${isStartOpen ? 'bg-white/10' : ''}`}
        >
          <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
            <div className="bg-[#0078d4] rounded-sm" />
            <div className="bg-[#00bcf2] rounded-sm" />
            <div className="bg-[#0078d4] rounded-sm" />
            <div className="bg-[#00bcf2] rounded-sm" />
          </div>
        </button>

        {APPS.map((app) => {
          // @ts-ignore
          const IconComponent = Icons[app.icon as keyof typeof Icons];
          const isOpen = windows.some(w => w.appId === app.id);
          const isActive = windows.find(w => w.appId === app.id)?.id === activeWindowId;

          return (
            <div key={app.id} className="relative group">
              <button
                onClick={() => openWindow(app.id)}
                className={`p-2 rounded transition-all duration-200 hover:bg-white/10 ${isOpen ? 'after:content-[""] after:absolute after:bottom-0.5 after:left-[25%] after:right-[25%] after:h-0.5 after:bg-white/50 after:rounded-full' : ''} ${isActive ? 'bg-white/10 after:bg-[#0078d4]' : ''}`}
              >
                {IconComponent && <IconComponent size={20} className="text-white/90" />}
              </button>
              
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#202020] text-white text-[11px] rounded opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 whitespace-nowrap">
                {app.name}
              </div>
            </div>
          );
        })}

        {/* OS Switcher Icon */}
        <button
          onClick={toggleOS}
          className="p-2 transition-all duration-200 hover:bg-white/10 rounded"
          title="Switch to macOS"
        >
          <Icons.RefreshCw size={20} className="text-white/90" />
        </button>
      </div>

      {/* System Tray Right */}
      <div className="flex-1 flex justify-end items-center gap-3 text-white text-[11px] font-normal cursor-default select-none">
         <div className="hidden md:flex items-center gap-2">
            <Icons.Wifi size={14} />
            <Icons.Volume2 size={14} />
            <Icons.Battery size={14} />
         </div>
         <div className="text-right">
            <div>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
            <div>{time.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</div>
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
