'use client';

import React from 'react';
import { useOS } from '@/context/OSContext';
import { useWindows } from '@/context/WindowContext';
import { Apple, Wifi, Battery, Search, Command } from 'lucide-react';
import { format } from 'date-fns'; // I should check if date-fns is installed, if not I'll use native Date

export default function MenuBar() {
  const { os } = useOS();
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (os !== 'macos') return null;

  const menuItems = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];

  return (
    <div className="absolute top-0 left-0 right-0 h-7 bg-white/30 backdrop-blur-md flex items-center justify-between px-4 text-xs font-medium text-white z-50 border-b border-white/10">
      <div className="flex items-center gap-4">
        <Apple size={14} fill="currentColor" className="hover:opacity-70 cursor-default" />
        <span className="font-bold cursor-default hover:text-white/80">Samrit OS</span>
        {menuItems.map((item) => (
          <span key={item} className="hidden md:inline cursor-default hover:bg-white/10 px-2 py-0.5 rounded transition-colors text-white/90">
            {item}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Wifi size={14} className="cursor-default" />
        <Battery size={14} className="cursor-default" />
        <Search size={14} className="cursor-default" />
        <div className="flex items-center gap-1 cursor-default">
          <span>{time.toLocaleDateString('en-US', { weekday: 'short' })}</span>
          <span>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
        </div>
      </div>
    </div>
  );
}
