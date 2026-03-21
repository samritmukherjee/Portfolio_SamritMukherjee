'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useOS } from '@/context/OSContext';
import { WindowState, WindowContextType } from '@/types';

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const { os, mobileOS } = useOS();
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [closedApps, setClosedApps] = useState<Set<string>>(new Set());

  const clearWindows = useCallback(() => {
    setWindows([]);
    setActiveWindowId(null);
  }, []);

  const openWindow = useCallback((appId: string) => {
    // Remove if it was in closedApps since user is manually opening it now
    setClosedApps(prev => {
      const next = new Set(prev);
      next.delete(appId);
      return next;
    });

    // Check if app already has an open window
    const existing = windows.find(w => w.appId === appId);
    if (existing) {
      // If it exists, un-minimize it and bring it to front
      setWindows(prev => prev.map(w => 
        w.id === existing.id 
          ? { ...w, isMinimized: false, zIndex: zIndexCounter + 1 } 
          : w
      ));
      setActiveWindowId(existing.id);
      setZIndexCounter(prev => prev + 1);
      return;
    }

    const newId = `${appId}-${Date.now()}`;
    
    // Improved default sizes based on app type - increased width
    let defaultSize = { width: 700, height: 450 };
    if (appId === 'about') defaultSize = { width: 900, height: 550 };
    if (appId === 'projects') defaultSize = { width: 1000, height: 620 };
    if (appId === 'terminal') defaultSize = { width: 800, height: 450 };
    if (appId === 'skills') defaultSize = { width: 900, height: 550 };
    if (appId === 'contact') defaultSize = { width: 850, height: 580 };
    if (appId === 'ai-chat') defaultSize = { width: 800, height: 600 };
    if (appId === 'resume') defaultSize = { width: 950, height: 700 };

    const newWindow: WindowState = {
      id: newId,
      appId,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: zIndexCounter + 1,
      position: { 
        x: Math.min(100 + windows.length * 30, globalThis.window?.innerWidth - 500 || 100),
        y: Math.min(80 + windows.length * 30, (globalThis.window?.innerHeight || 600) - 500) 
      },
      size: defaultSize
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newId);
    setZIndexCounter(prev => prev + 1);
  }, [windows, zIndexCounter]);

  // Handle OS transitions: Re-align windows if necessary
  useEffect(() => {
    // We only open 'about' by default if it hasn't been manually closed by the user
    if (windows.length === 0 && !closedApps.has('about')) {
      const timer = setTimeout(() => {
          openWindow('about');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [os, mobileOS, windows.length, openWindow, closedApps]);

  const closeWindow = useCallback((windowId: string) => {
    const win = windows.find(w => w.id === windowId);
    if (win) {
      setClosedApps(prev => new Set(prev).add(win.appId));
    }
    
    setWindows(prev => prev.filter(w => w.id !== windowId));
    if (activeWindowId === windowId) {
      setActiveWindowId(null);
    }
  }, [activeWindowId, windows]);

  const focusWindow = useCallback((windowId: string) => {
    setActiveWindowId(windowId);
    setZIndexCounter(prev => prev + 1);
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, zIndex: zIndexCounter + 1 } : w
    ));
  }, [zIndexCounter]);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(w => w.id === windowId ? { ...w, isMinimized: true } : w));
    setActiveWindowId(null);
  }, []);

  const maximizeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(w => w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w));
  }, []);

  const updateWindowPosition = useCallback((windowId: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === windowId ? { ...w, position: { x, y } } : w));
  }, []);

  const updateWindowSize = useCallback((windowId: string, width: number | string, height: number | string) => {
    setWindows(prev => prev.map(w => w.id === windowId ? { ...w, size: { width, height } } : w));
  }, []);

  return (
    <WindowContext.Provider value={{ 
      windows, 
      activeWindowId, 
      openWindow, 
      closeWindow, 
      minimizeWindow, 
      maximizeWindow, 
      focusWindow,
      clearWindows,
      updateWindowPosition,
      updateWindowSize
    }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error('useWindows must be used within a WindowProvider');
  }
  return context;
}
