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
  const { windows, openWindow } = useWindows();

  return (
    <main className="relative w-screen h-screen overflow-hidden select-none">
      {/* Dynamic Wallpaper */}
      <AnimatePresence mode="wait">
        <motion.div
          key={wallpaper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${wallpaper})` }}
        />
      </AnimatePresence>

      {/* OS Shell Components */}
      <div className="hidden md:block h-full w-full">
        {os === 'macos' ? (
          <>
            <MenuBar />
            <div className="absolute inset-0 z-10">
              <WindowContainer />
            </div>
            <Dock />
          </>
        ) : (
          <>
            <div className="absolute inset-0 z-10">
              <WindowContainer />
            </div>
            <Taskbar />
          </>
        )}
      </div>

      {/* Mobile App Grid */}
      <div className="md:hidden absolute inset-0 z-20 bg-black/20 backdrop-blur-sm p-8 pt-20 overflow-y-auto">
        <div className="grid grid-cols-3 gap-8">
            {APPS.map((app) => {
                // @ts-ignore
                const IconComponent = Icons[app.icon as keyof typeof Icons];
                return (
                    <motion.button
                        key={app.id}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openWindow(app.id)}
                        className="flex flex-col items-center gap-3"
                    >
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 text-white shadow-xl">
                            {IconComponent && <IconComponent size={32} />}
                        </div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">{app.name}</span>
                    </motion.button>
                );
            })}
        </div>
        
        {/* Mobile Window Overlay (Full Screen) */}
        <div className="fixed inset-0 z-30 pointer-events-none">
            <WindowContainer />
        </div>

        {/* OS Switcher for Mobile */}
        <button 
          onClick={toggleOS}
          className="fixed bottom-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white shadow-2xl z-50"
        >
           <Icons.RefreshCw size={20} />
        </button>
      </div>

      {/* Desktop Icons (Optional, mostly for visual flair) */}
      <div className="absolute top-12 right-4 flex flex-col gap-6 z-10 pointer-events-none md:pointer-events-auto">
        {/* We can add quick access icons here later */}
      </div>
    </main>
  );
}
