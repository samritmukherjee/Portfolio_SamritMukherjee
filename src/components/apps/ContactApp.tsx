'use client';

import React from 'react';
import { Mail, Github, Linkedin, Send, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { SOCIALS } from '@/constants';

export default function ContactApp() {
  return (
    <div className="p-10 text-white flex flex-col items-center justify-center h-full max-w-lg mx-auto text-center font-sans">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8 w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl rotate-3"
      >
        <Mail size={40} />
      </motion.div>

      <h2 className="text-3xl font-bold mb-4 tracking-tight">Let's build something impactful</h2>
      <p className="text-white/60 mb-10 leading-relaxed italic">
         I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
      </p>

      <div className="grid grid-cols-1 gap-4 w-full mb-10">
        <a
          href={SOCIALS.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between p-4 bg-[#0077b5]/10 border border-[#0077b5]/30 rounded-xl hover:bg-[#0077b5]/20 transition-all group"
        >
          <div className="flex items-center gap-4">
            <Linkedin className="text-[#0077b5]" />
            <span className="font-semibold underline decoration-transparent group-hover:decoration-blue-400 decoration-2 underline-offset-4 transition-all">LinkedIn</span>
          </div>
          <ExternalLink size={16} className="opacity-40 group-hover:opacity-100" />
        </a>

        <a
          href={SOCIALS.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
        >
          <div className="flex items-center gap-4">
            <Github />
            <span className="font-semibold underline decoration-transparent group-hover:decoration-gray-400 decoration-2 underline-offset-4 transition-all">GitHub</span>
          </div>
          <ExternalLink size={16} className="opacity-40 group-hover:opacity-100" />
        </a>

        <a
          href={SOCIALS.email}
          className="flex items-center justify-between p-4 bg-blue-600/10 border border-blue-600/30 rounded-xl hover:bg-blue-600/20 transition-all group"
        >
          <div className="flex items-center gap-4">
            <Mail className="text-blue-500" />
            <span className="font-semibold underline decoration-transparent group-hover:decoration-blue-500 decoration-2 underline-offset-4 transition-all">Email Me</span>
          </div>
          <Send size={16} className="opacity-40 group-hover:opacity-100" />
        </a>
      </div>

      <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-30 italic">
        Based in India • Available for collaborations
      </p>
    </div>
  );
}
