'use client';

import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResumeApp() {
  return (
    <div className="h-full flex flex-col bg-[#1a1a1a] text-white">
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#222222]">
        <div className="flex items-center gap-3">
          <FileText size={18} className="text-blue-400" />
          <span className="text-sm font-medium italic">samrit_resume.pdf</span>
        </div>
        <div className="flex gap-2">
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold transition-colors"
          >
            <Download size={14} /> Download
          </a>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#1c1c1c]">
        <motion.div
           initial={{ scale: 0.98, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="max-w-4xl mx-auto h-[1200px] bg-white rounded-lg shadow-2xl overflow-hidden relative shadow-blue-500/10"
        >
          <iframe 
            src="/resume.pdf#view=FitH" 
            className="w-full h-full border-none"
            title="Samrit Mukherjee Resume"
          />
          <div className="absolute bottom-4 right-4 z-10">
             <a 
               href="/resume.pdf" 
               target="_blank" 
               rel="noopener noreferrer"
               className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-black transition-all border border-white/10 shadow-xl"
             >
                <Icons.ExternalLink size={16} /> Open in New Tab
             </a>
          </div>
        </motion.div>
      </div>

      <div className="p-4 bg-white/5 border-t border-white/10 text-center text-[10px] text-white/40 italic uppercase tracking-widest">
        Official Resume of Samrit Mukherjee
      </div>
    </div>
  );
}
