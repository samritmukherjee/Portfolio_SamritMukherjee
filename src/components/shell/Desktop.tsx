'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '@/context/OSContext';
import { useWindows } from '@/context/WindowContext';
import MenuBar from './MenuBar';
import Taskbar from './Taskbar';
import Dock from './Dock';
import WindowContainer from '../window/WindowContainer';
import { motion, AnimatePresence } from 'framer-motion';
import MobileShell from './MobileShell';
import BootScreen from './BootScreen';

export default function Desktop() {
  const { os, mobileOS } = useOS();
  const { resetForNewOS } = useWindows();
  const [isMobile, setIsMobile] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const previousOSRef = useRef<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Detect OS changes and trigger boot animation
  useEffect(() => {
    if (previousOSRef.current && previousOSRef.current !== os) {
      // OS has changed, trigger boot animation
      setIsBooting(true);
      resetForNewOS(); // Clear all windows for fresh start
    }
    previousOSRef.current = os;
  }, [os, resetForNewOS]);

  // Determine wallpaper based on OS and device
  const getWallpaper = () => {
    if (isMobile) {
      return mobileOS === 'ios' 
        ? 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop' 
        : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';
    }
    return os === 'macos'
      ? '/wallpapers/macos-ventura.jpg'
      : '/wallpapers/windows-11.jpg';
  };

  const wallpaper = getWallpaper();

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-black">
      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootScreen key={`boot-${os}`} os={os} onFinish={() => setIsBooting(false)} />
        ) : (
          <motion.div
            key="os-root"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full"
          >
            {/* Wallpaper Layer */}
            <AnimatePresence mode="wait">
              <motion.div
                key={wallpaper}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${wallpaper})` }}
              >
                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                 <div className="absolute inset-0 bg-black/10 backdrop-brightness-[0.9]" />
              </motion.div>
            </AnimatePresence>

            {/* Desktop Shell Layer (Persistent Background Elements) */}
            {!isMobile && (
              <div className="h-full w-full absolute inset-0 z-40 pointer-events-none">
                <div className="w-full h-full relative pointer-events-auto">
                    {os === 'macos' ? (
                      <>
                        <MenuBar />
                        <Dock />
                      </>
                    ) : (
                      <>
                        <Taskbar />
                      </>
                    )}
                </div>
              </div>
            )}

            {/* Global Window Layer (TOP LAYER) */}
            <div className="fixed inset-0 z-[110] pointer-events-none">
              <WindowContainer />
            </div>

            {/* Mobile Shell Layer */}
            {isMobile && (
              <div className="absolute inset-0 z-30">
                <MobileShell />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
