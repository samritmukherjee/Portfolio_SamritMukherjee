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
  const { activeWindowId, focusWindow, closeWindow, minimizeWindow, maximizeWindow, updateWindowPosition, updateWindowSize } = useWindows();
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
        x: (window.isMaximized || os === 'macos') ? (os === 'macos' && !window.isMaximized ? window.position.x : 0) : window.position.x,
        y: (window.isMaximized || typeof window.position.y === 'string') ? (isMac ? 32 : 0) : window.position.y,
        width: (window.isMaximized || typeof window.size.width === 'string' || os === 'macos' ? '100vw' : window.size.width) as any,
        height: (window.isMaximized || typeof window.size.height === 'string' || os === 'macos' ? (isMac ? 'calc(100vh - 32px)' : 'calc(100vh - 56px)') : window.size.height) as any,
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
        className={`h-11 flex items-center shrink-0 cursor-default px-4 relative select-none ${isMac ? 'justify-start' : 'justify-between bg-white/[0.03]'}`}
      >
        {isMac ? (
          <div className="flex gap-2.5 z-20">
            <button
               onClick={(e) => { e.stopPropagation(); closeWindow(window.id); }}
               className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] flex items-center justify-center group transition-colors hover:bg-[#ff4b42]"
            >
                <X size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
            </button>
            <button
               onClick={(e) => { e.stopPropagation(); minimizeWindow(window.id); }}
               className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] flex items-center justify-center group transition-colors hover:bg-[#ffad1a]"
            >
                <Minus size={10} className="text-black/60 opacity-0 group-hover:opacity-100" />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); maximizeWindow(window.id); }}
                className="w-3.5 h-3.5 rounded-full bg-[#28c840] flex items-center justify-center group transition-colors hover:bg-[#24b038]"
            >
                <Maximize2 size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-sm flex items-center justify-center ${isActive ? 'bg-[#0078d4]' : 'bg-white/10'}`}>
                {/* Small indicator icon for Windows */}
            </div>
            <span className="text-[11px] font-semibold text-white/90 tracking-wide ml-1">
              {window.appId.toUpperCase()}
            </span>
          </div>
        )}

        {isMac && (
            <div className="absolute left-1/2 -translate-x-1/2 text-[13px] font-medium text-white/70">
                {window.appId.charAt(0).toUpperCase() + window.appId.slice(1)}
            </div>
        )}

        {!isMac && (
          <div className="flex h-full -mr-4">
            <button
               onClick={(e) => { e.stopPropagation(); minimizeWindow(window.id); }}
               className="w-12 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
                <Minus size={16} className="text-white/80" />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); maximizeWindow(window.id); }}
                className="w-12 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
                <Square size={11} className="text-white/80" />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); closeWindow(window.id); }}
                className="w-12 h-full flex items-center justify-center hover:bg-[#e81123] transition-colors"
            >
                <X size={18} className="text-white/80" />
            </button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-black/5 relative">
        {children}
      </div>

      {/* Resize Handle */}
      {!window.isMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-40 group"
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = typeof window.size.width === 'number' ? window.size.width : 640;
            const startHeight = typeof window.size.height === 'number' ? window.size.height : 480;

            const onMouseMove = (moveEvent: MouseEvent) => {
              const newWidth = Math.max(400, startWidth + (moveEvent.clientX - startX));
              const newHeight = Math.max(300, startHeight + (moveEvent.clientY - startY));
              updateWindowSize(window.id, newWidth, newHeight);
            };

            const onMouseUp = () => {
              document.removeEventListener('mousemove', onMouseMove);
              document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
          }}
        >
          <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-r-2 border-b-2 border-white/20 group-hover:border-white/40 transition-colors rounded-[1px]" />
        </div>
      )}
    </motion.div>
  );
}
