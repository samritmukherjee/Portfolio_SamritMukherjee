'use client';

import React from 'react';
import { Rnd } from 'react-rnd';
import { useWindows } from '@/context/WindowContext';
import { useOS } from '@/context/OSContext';
import { WindowState } from '@/types';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface WindowFrameProps {
  window: WindowState;
  children: React.ReactNode;
}

export default function WindowFrame({ window: win, children }: WindowFrameProps) {
  const { 
    activeWindowId, 
    focusWindow, 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow, 
    updateWindowPosition, 
    updateWindowSize 
  } = useWindows();
  const { os } = useOS();
  
  const isActive = activeWindowId === win.id;
  const isMac = os === 'macos';

  // Desktop vs Mobile check
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(globalThis.window.innerWidth < 768);
    checkMobile();
    globalThis.window.addEventListener('resize', checkMobile);
    return () => globalThis.window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-[100] bg-[#1a1a1a] flex flex-col pointer-events-auto"
        onPointerDown={() => focusWindow(win.id)}
      >
        {/* Mobile Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 shrink-0 pt-4">
          <span className="text-white font-bold tracking-tight text-lg">{win.appId.toUpperCase()}</span>
          <button 
            onClick={() => closeWindow(win.id)} 
            className="p-2 bg-white/10 rounded-full active:scale-90 transition-transform"
          >
            <X size={24} className="text-white" />
          </button>
        </div>
        {/* Mobile Content Area - MUST be scrollable */}
        <div className="flex-1 overflow-y-auto bg-[#121212] w-full h-full">
          {children}
        </div>
        {/* Bottom indicator for iOS look */}
        <div className="h-8 flex items-center justify-center shrink-0">
             <div className="w-32 h-1 bg-white/20 rounded-full" />
        </div>
      </motion.div>
    );
  }

  return (
    <Rnd
      size={{ 
        width: win.isMaximized ? '100vw' : win.size.width, 
        height: win.isMaximized ? (isMac ? 'calc(100vh - 30px)' : 'calc(100vh - 48px)') : win.size.height 
      }}
      position={{ 
        x: win.isMaximized ? 0 : win.position.x, 
        y: win.isMaximized ? (isMac ? 30 : 0) : win.position.y 
      }}
      onDragStop={(e, d) => {
        if (!win.isMaximized) {
          updateWindowPosition(win.id, d.x, d.y);
        }
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        if (!win.isMaximized) {
          updateWindowSize(win.id, ref.offsetWidth, ref.offsetHeight);
          updateWindowPosition(win.id, position.x, position.y);
        }
      }}
      dragHandleClassName="handle"
      enableResizing={!win.isMaximized}
      disableDragging={win.isMaximized}
      bounds="parent"
      minWidth={400}
      minHeight={300}
      style={{ zIndex: win.zIndex }}
      className={`flex flex-col overflow-hidden pointer-events-auto transition-shadow duration-300 ${isActive ? 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]' : 'shadow-xl brightness-90'} ${isMac ? 'rounded-xl border border-white/20 bg-[#1e1e1e]/80 backdrop-blur-3xl' : 'rounded-sm border border-white/10 bg-[#202020]/98'}`}
      onPointerDown={() => focusWindow(win.id)}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col h-full w-full"
      >
        {/* Title Bar */}
        <div 
          className={`handle h-10 flex items-center shrink-0 cursor-default px-4 relative select-none ${isMac ? 'justify-start' : 'justify-between bg-white/[0.02]'}`}
        >
          {isMac ? (
            <div className="flex gap-2 z-20">
              <button
                 onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                 className="w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center group"
              >
                  <X size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                 onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
                 className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center group"
              >
                  <Minus size={10} className="text-black/60 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                  onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }}
                  className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center group"
              >
                  <Maximize2 size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-white/70 tracking-tight ml-1">
                {win.appId.toUpperCase()}
              </span>
            </div>
          )}

          {isMac && (
              <div className="absolute left-1/2 -translate-x-1/2 text-[12px] font-medium text-white/50 pointer-events-none">
                  {win.appId.charAt(0).toUpperCase() + win.appId.slice(1)}
              </div>
          )}

          {!isMac && (
            <div className="flex h-full -mr-4">
              <button
                 onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
                 className="w-10 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                  <Minus size={14} className="text-white/60" />
              </button>
              <button
                  onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }}
                  className="w-10 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                  <Square size={10} className="text-white/60" />
              </button>
              <button
                  onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                  className="w-12 h-full flex items-center justify-center hover:bg-[#e81123] transition-colors"
              >
                  <X size={16} className="text-white" />
              </button>
            </div>
          )}
        </div>

        {/* Content Area - SCROLLABLE */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-black/10 relative w-full h-full">
          {children}
        </div>
      </motion.div>
    </Rnd>
  );
}
