'use client';

import React from 'react';
import { ExternalLink, Code, Globe, Sparkles } from 'lucide-react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Cosmic Canvas',
    description: 'AI-powered design platform that generates fully editable layered visuals. Bridging the gap between AI creativity and human customization.',
    link: 'https://cosmic-canvas-delta.vercel.app/',
    tags: ['AI', 'Canvas API', 'Next.js', 'Framer Motion'],
    icon: Sparkles,
  },
  {
    id: 2,
    title: 'Sukalya AI',
    description: 'AI-based solution designed to deliver intelligent and user-focused functionality. Focus on usability, automation, and smart interaction.',
    link: 'https://sukalya-ai.vercel.app/',
    tags: ['AI', 'Automation', 'FullStack', 'TypeScript'],
    icon: Code,
  }
];

export default function ProjectsApp() {
  return (
    <div className="p-6 text-white grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      {projects.map((project, idx) => (
        <motion.div
           key={project.id}
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: idx * 0.1 }}
           className="group relative bg-[#1c1c1c] rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 shadow-xl"
        >
            <motion.div
              key={project.id}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-[#1c1c1e] rounded-2xl border border-white/[0.05] overflow-hidden shadow-2xl hover:border-blue-500/30 transition-all duration-500"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <project.icon size={48} className="text-blue-400/50 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 right-3 flex gap-2">
                   {project.tags.slice(0, 2).map(tag => (
                     <span key={tag} className="text-[10px] bg-white/5 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 text-white/50">{tag}</span>
                   ))}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {project.tags.slice(2, 4).map(tag => (
                      <span key={tag} className="text-[10px] text-blue-300/60 font-medium uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-all border border-white/10"
                  >
                    <Icons.ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
