'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { WindowState, WindowContextType } from '@/types';

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(10);

  const openWindow = useCallback((appId: string) => {
    // Check if app already has an open window
    const existing = windows.find(w => w.appId === appId);
    if (existing) {
      focusWindow(existing.id);
      if (existing.isMinimized) {
        setWindows(prev => prev.map(w => w.id === existing.id ? { ...w, isMinimized: false } : w));
      }
      return;
    }

    const newId = `${appId}-${Date.now()}`;
    const newWindow: WindowState = {
      id: newId,
      appId,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: zIndexCounter + 1,
      position: { x: 100 + windows.length * 20, y: 100 + windows.length * 20 },
      size: { width: 800, height: 600 }
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newId);
    setZIndexCounter(prev => prev + 1);
  }, [windows, zIndexCounter]);

  const closeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
    if (activeWindowId === windowId) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

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
