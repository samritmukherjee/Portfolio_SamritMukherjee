'use client';

import React from 'react';
import { useOS } from '@/context/OSContext';
import { useWindows } from '@/context/WindowContext';
import * as Icons from 'lucide-react';
import { Apple, Wifi, Battery, Search } from 'lucide-react';

export default function MenuBar() {
  const { os, toggleOS } = useOS();
  const { clearWindows } = useWindows();
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (os !== 'macos') return null;

  const menuItems = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];

  return (
    <div className="fixed top-0 left-0 right-0 h-10 bg-black/20 backdrop-blur-3xl flex items-center justify-between px-4 text-[13px] font-medium text-white/95 z-[100] border-b border-white/[0.05] select-none">
      <div className="flex items-center gap-1">
        <div 
          className="p-1 px-2.5 hover:bg-white/10 rounded-md transition-colors duration-200 cursor-default opacity-80"
        >
            <Apple size={16} fill="currentColor" />
        </div>
        <span className="font-bold px-2.5 cursor-default shrink-0">Samrit OS</span>
        <div className="hidden lg:flex items-center">
            {menuItems.map((item) => (
              <span key={item} className="cursor-default hover:bg-white/10 px-3 py-1 rounded-md transition-colors duration-200 text-white/80">
                {item}
              </span>
            ))}
        </div>
      </div>

      <div className="flex items-center gap-2 pr-1">
        <button 
          onClick={() => {
            clearWindows();
            toggleOS(); 
          }}
          className="flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white/90 border border-white/10 text-[11px]"
        >
            <Icons.Monitor size={14} />
            <span>Switch to {os === 'macos' ? 'Windows' : 'macOS'}</span>
        </button>
        <div className="hidden md:flex items-center gap-4 px-3 border-l border-white/10 ml-2">
            <Wifi size={14} className="opacity-70" />
            <Battery size={14} className="opacity-70" />
            <Search size={14} className="opacity-70" />
        </div>
        <div className="flex items-center gap-2 px-3 py-1 hover:bg-white/10 rounded-md transition-colors duration-200 cursor-default tabular-nums">
          <span className="hidden sm:inline text-white/60">{time.toLocaleDateString('en-US', { weekday: 'short' })}</span>
          <span className="hidden sm:inline text-white/60">{time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          <span className="font-bold tracking-tight">{time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
        </div>
      </div>
    </div>
  );
}
