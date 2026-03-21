'use client';

import React from 'react';
import { useOS } from '@/context/OSContext';
import { useWindows } from '@/context/WindowContext';
import { APPS } from '@/constants';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dock() {
  const { os } = useOS();
  const { openWindow } = useWindows();

  if (os !== 'macos') return null;

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-end gap-2 p-2 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl transition-all duration-300">
        {APPS.map((app) => {
          // @ts-ignore
          const IconComponent = Icons[app.icon as keyof typeof Icons];
          
          return (
            <motion.div
              key={app.id}
              whileHover={{ scale: 1.2, marginBottom: 12 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => openWindow(app.id)}
              className="relative group cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-white/40 to-white/10 rounded-xl border border-white/30 text-white shadow-lg">
                {IconComponent && <IconComponent size={24} />}
              </div>
              
              {/* Active Indicator (optional) */}
              
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {app.name}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
