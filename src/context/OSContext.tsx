'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { OSType, OSContextType } from '@/types';

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: React.ReactNode }) {
  const [os, setOs] = useState<OSType>('macos');
  const [wallpaper, setWallpaper] = useState<string>('/wallpapers/macos-ventura.jpg');

  useEffect(() => {
    const savedOS = localStorage.getItem('samrit-os-pref') as OSType;
    if (savedOS) {
      setOs(savedOS);
      setWallpaper(savedOS === 'macos' ? '/wallpapers/macos-ventura.jpg' : '/wallpapers/windows-11.jpg');
    }
  }, []);

  const toggleOS = () => {
    const newOS = os === 'macos' ? 'windows' : 'macos';
    setOs(newOS);
    setWallpaper(newOS === 'macos' ? '/wallpapers/macos-ventura.jpg' : '/wallpapers/windows-11.jpg');
    localStorage.setItem('samrit-os-pref', newOS);
  };

  return (
    <OSContext.Provider value={{ os, toggleOS, wallpaper, setWallpaper }}>
      <div className={os === 'macos' ? 'font-macos' : 'font-windows'}>
        {children}
      </div>
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (context === undefined) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
}
