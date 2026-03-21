'use client';

import React from 'react';
import { useOS } from '@/context/OSContext';
import { useWindows } from '@/context/WindowContext';
import MenuBar from './MenuBar';
import Taskbar from './Taskbar';
import Dock from './Dock';
import WindowContainer from '../window/WindowContainer';
import { motion, AnimatePresence } from 'framer-motion';
import { APPS } from '@/constants';
import * as Icons from 'lucide-react';

export default function Desktop() {
  const { os, wallpaper, toggleOS } = useOS();
  const { openWindow, clearWindows } = useWindows();

  const handleToggleOS = () => {
    clearWindows();
    toggleOS();
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden select-none">
        {/* Wallpaper with Noise Texture */}
        <AnimatePresence mode="wait">
          <motion.div
            key={wallpaper}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${wallpaper})` }}
          >
             {/* Micro-noise texture for premium feel */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
             <div className="absolute inset-0 bg-black/10 backdrop-brightness-[0.9]" />
          </motion.div>
        </AnimatePresence>

      {/* OS Shell Components (Desktop Only) */}
      <div className="hidden md:block h-full w-full relative">
        {os === 'macos' ? (
          <>
            <MenuBar />
            <div className="absolute inset-0 z-[20]">
              <WindowContainer />
            </div>
            <Dock />
          </>
        ) : (
          <>
            <div className="absolute inset-0 z-[20]">
              <WindowContainer />
            </div>
            <Taskbar />
          </>
        )}
      </div>

      {/* Mobile App Grid (Hidden on Desktop) */}
      <div className="md:hidden fixed inset-0 z-[30] bg-black/40 backdrop-blur-md p-8 pt-24 overflow-y-auto">
        <div className="grid grid-cols-3 gap-6 sm:gap-10">
            {APPS.map((app) => {
              const Icon = Icons[app.icon as keyof typeof Icons] as any;
              return (
                <button
                  key={app.id}
                  onClick={() => openWindow(app.id)}
                  className="flex flex-col items-center gap-4 transition-transform active:scale-90 touch-manipulation"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-gradient-to-br from-white/20 to-white/5 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xl">
                     {Icon && <Icon size={32} strokeWidth={1.5} className="text-white opacity-90" />}
                  </div>
                  <span className="text-[11px] font-bold text-white/80 text-center tracking-wide uppercase">{app.name}</span>
                </button>
              );
            })}
        </div>
        
        {/* Mobile OS Switcher */}
        <button 
          onClick={handleToggleOS}
          className="fixed bottom-10 right-10 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center border border-white/30 text-white shadow-[0_0_30px_rgba(37,99,235,0.5)] z-[100] active:scale-90 transition-transform"
        >
           <Icons.RefreshCw size={24} />
        </button>
      </div>

      {/* Global Window Container for Mobile (Full Screen Overlay) */}
      <div className="md:hidden fixed inset-0 z-[40] pointer-events-none">
          <div className="w-full h-full pointer-events-auto">
             <WindowContainer />
          </div>
      </div>

      {/* Desktop Icons (Optional, mostly for visual flair) */}
      <div className="absolute top-12 right-4 flex flex-col gap-6 z-10 pointer-events-none md:pointer-events-auto">
        {/* We can add quick access icons here later */}
      </div>
    </main>
  );
}
