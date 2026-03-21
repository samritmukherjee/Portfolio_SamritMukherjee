'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { OSType, MobileOSType, OSContextType } from '@/types';

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: React.ReactNode }) {
  const [os, setOs] = useState<OSType>('macos');
  const [mobileOS, setMobileOS] = useState<MobileOSType>('ios');
  const [wallpaper, setWallpaper] = useState<string>('/wallpapers/macos-ventura.jpg');

  useEffect(() => {
    const savedOS = localStorage.getItem('samrit-os-pref') as OSType;
    const savedMobileOS = localStorage.getItem('samrit-mobile-os-pref') as MobileOSType;
    if (savedOS) setOs(savedOS);
    if (savedMobileOS) setMobileOS(savedMobileOS);
  }, []);

  const toggleOS = () => {
    const newOS = os === 'macos' ? 'windows' : 'macos';
    setOs(newOS);
    localStorage.setItem('samrit-os-pref', newOS);
  };

  const toggleMobileOS = () => {
    const newMobileOS = mobileOS === 'ios' ? 'android' : 'ios';
    setMobileOS(newMobileOS);
    localStorage.setItem('samrit-mobile-os-pref', newMobileOS);
  };

  return (
    <OSContext.Provider value={{ 
      os, 
      mobileOS, 
      toggleOS, 
      toggleMobileOS, 
      wallpaper, 
      setWallpaper 
    }}>
      <div className={os === 'macos' ? 'font-macos' : 'font-windows'}>
        <div className="contents md:block hidden">
            {children}
        </div>
        <div className="contents md:hidden block">
            <div className={mobileOS === 'ios' ? 'font-ios' : 'font-android'}>
                {children}
            </div>
        </div>
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
