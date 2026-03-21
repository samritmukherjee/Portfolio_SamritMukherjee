'use client';

import React from 'react';
import { FileText, Download, ExternalLink, Eye } from 'lucide-react';
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

      <div className="flex-1 p-8 overflow-y-auto">
        <motion.div
           initial={{ scale: 0.95, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden min-h-[1000px] relative group"
        >
          {/* PDF Placeholder or Actual Viewer */}
          <iframe 
            src="/resume.pdf" 
            className="w-full h-full border-none"
            title="Samrit Mukherjee Resume"
          />
          
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
             <div className="bg-white text-black p-4 rounded-full shadow-xl flex items-center gap-2 font-bold">
                <Eye size={20} /> Previewing PDF
             </div>
          </div>
        </motion.div>
      </div>

      <div className="p-4 bg-white/5 border-t border-white/10 text-center text-[10px] text-white/40 italic uppercase tracking-widest">
        Official Resume of Samrit Mukherjee
      </div>
    </div>
  );
}
