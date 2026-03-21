'use client';

import React from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useWindows } from '@/context/WindowContext';
import { useOS } from '@/context/OSContext';
import { WindowState } from '@/types';
import { X, Minus, Square, Maximize2 } from 'lucide-react';

interface WindowFrameProps {
  window: WindowState;
  children: React.ReactNode;
}

export default function WindowFrame({ window, children }: WindowFrameProps) {
  const { activeWindowId, focusWindow, closeWindow, minimizeWindow, maximizeWindow, updateWindowPosition } = useWindows();
  const { os } = useOS();
  const controls = useDragControls();
  const isActive = activeWindowId === window.id;

  const handleDragEnd = (event: any, info: any) => {
    updateWindowPosition(window.id, window.position.x + info.offset.x, window.position.y + info.offset.y);
  };

  const isMac = os === 'macos';

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        x: window.isMaximized ? 0 : window.position.x,
        y: window.isMaximized ? (isMac ? 28 : 0) : window.position.y,
        width: window.isMaximized ? '100vw' : window.size.width,
        height: window.isMaximized ? (isMac ? 'calc(100vh - 28px)' : 'calc(100vh - 48px)') : window.size.height,
        zIndex: window.zIndex
      }}
      exit={{ scale: 0.9, opacity: 0 }}
      onPointerDown={() => focusWindow(window.id)}
      className={`absolute overflow-hidden flex flex-col pointer-events-auto ${isActive ? 'shadow-2xl' : 'shadow-lg brightness-90'} ${isMac ? 'mac-window bg-[#1e1e1e]/80 backdrop-blur-3xl border border-white/20' : 'win-window bg-[#202020]/90 border border-white/10'}`}
      drag={!window.isMaximized}
      dragControls={controls}
      dragListener={false}
      dragTransition={{ power: 0 }}
      onDragEnd={handleDragEnd}
    >
      {/* Title Bar */}
      <div 
        onPointerDown={(e) => controls.start(e)}
        className={`h-10 flex items-center shrink-0 cursor-default px-4 relative ${isMac ? 'justify-start' : 'justify-between'}`}
      >
        {isMac ? (
          <div className="flex gap-2">
            <button
               onClick={() => closeWindow(window.id)}
               className="w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center group"
            >
                <X size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
            </button>
            <button
               onClick={() => minimizeWindow(window.id)}
               className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center group"
            >
                <Minus size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
            </button>
            <button
                onClick={() => maximizeWindow(window.id)}
                className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center group"
            >
                <Maximize2 size={6} className="text-black/60 opacity-0 group-hover:opacity-100" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/80 uppercase tracking-tighter ml-1">
              {window.appId.replace('-', ' ')}
            </span>
          </div>
        )}

        {isMac && (
            <div className="absolute left-1/2 -translate-x-1/2 text-[12px] font-semibold text-white/90">
                {window.appId.charAt(0).toUpperCase() + window.appId.slice(1).replace('-', ' ')}
            </div>
        )}

        {!isMac && (
          <div className="flex h-full">
            <button
               onClick={() => minimizeWindow(window.id)}
               className="w-10 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
                <Minus size={14} className="text-white/80" />
            </button>
            <button
                onClick={() => maximizeWindow(window.id)}
                className="w-10 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
                <Square size={10} className="text-white/80" />
            </button>
            <button
                onClick={() => closeWindow(window.id)}
                className="w-12 h-full flex items-center justify-center hover:bg-[#e81123] transition-colors"
            >
                <X size={16} className="text-white/80" />
            </button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-black/10">
        {children}
      </div>
    </motion.div>
  );
}
