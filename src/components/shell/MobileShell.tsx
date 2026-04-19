'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '@/context/OSContext';
import { useWindows } from '@/context/WindowContext';
import { APPS } from '@/constants';
import * as Icons from 'lucide-react';

export default function MobileShell() {
  const { mobileOS, toggleMobileOS } = useOS();
  const { openWindow } = useWindows();
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isIos = mobileOS === 'ios';

  return (
    <div className={`absolute inset-0 flex flex-col overflow-hidden transition-colors duration-700 ${isIos ? 'bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]' : 'bg-[#121212]'}`}>
      
      {/* Background Graphic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={mobileOS}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className={`absolute inset-0 bg-cover bg-center ${isIos ? "bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')]" : "bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop')]"}`}
          />
        </AnimatePresence>
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>

      {/* Top Status Bar */}
      <div className="h-12 flex items-center justify-between px-8 z-50 shrink-0 select-none">
        <div className="text-[15px] font-bold text-white tracking-tight">
          {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })}
        </div>
        <div className="flex items-center gap-2">
            <Icons.Wifi size={16} className="text-white/80" />
            <Icons.BatteryMedium size={18} className="text-white/80" />
        </div>
      </div>

      {/* App Grid */}
      <div className="flex-1 px-8 pt-12 overflow-y-auto z-40 custom-scrollbar">
        <div className="grid grid-cols-4 gap-y-12 gap-x-8">
          {APPS.map((app, idx) => {
            const Icon = Icons[app.icon as keyof typeof Icons] as React.ElementType;
            return (
              <motion.button
                key={app.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => openWindow(app.id)}
                className="flex flex-col items-center gap-2 group relative"
              >
                <div 
                  className={`w-[4.2rem] h-[4.2rem] flex items-center justify-center shadow-2xl transition-all duration-300 ${isIos ? 'rounded-[1.4rem] bg-gradient-to-b from-white/20 to-white/5 border border-white/20 backdrop-blur-2xl shadow-black/40' : 'rounded-2xl bg-[#1e1e1e] border-2 border-white/5 group-active:border-blue-500/50'}`}
                >
                   {Icon && <Icon size={32} strokeWidth={1.5} className={isIos ? "text-white/95" : "text-blue-400"} />}
                </div>
                <span className={`text-[10px] font-semibold text-white/80 whitespace-nowrap overflow-hidden text-ellipsis w-20 text-center ${!isIos && 'uppercase tracking-tighter text-[9px] font-bold text-white/60'}`}>
                  {app.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom Nav / Quick Switch */}
      <div className="h-32 flex flex-col items-center justify-end z-50 px-8 pb-10 shrink-0">
        <div className="w-full flex justify-center items-center mb-8">
             <button 
                onClick={toggleMobileOS}
                className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all active:scale-95 shadow-2xl ${isIos ? 'bg-white/10 text-white border-white/10 backdrop-blur-3xl' : 'bg-blue-600 text-white border-blue-500 shadow-blue-500/20'}`}
             >
                <Icons.RefreshCw size={16} className={isIos ? "text-white/60" : "text-white"} />
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                    {isIos ? 'Android' : 'iOS'} Mode
                </span>
             </button>
        </div>

        {/* Home Indicator */}
        <div className="relative w-full flex justify-center">
            {isIos ? (
                <div className="w-36 h-1.5 bg-white/40 rounded-full shadow-lg" />
            ) : (
                <div className="flex gap-16 text-white/40 items-center">
                    <Icons.ChevronLeft size={24} />
                    <Icons.Circle size={18} />
                    <Icons.Square size={16} />
                </div>
            )}
        </div>
      </div>

      {/* OS Specific Overlays/Vibes */}
      {!isIos && <div className="absolute inset-0 pointer-events-none border-[12px] border-black/10 rounded-[3rem]" />}
    </div>
  );
}
