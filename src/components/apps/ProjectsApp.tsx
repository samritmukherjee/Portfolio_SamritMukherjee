'use client';

import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Cosmic Canvas',
    description: 'AI-powered design platform that generates fully editable layered visuals. Bridging the gap between AI creativity and human customization.',
    link: 'https://cosmic-canvas-delta.vercel.app/',
    tags: ['AI', 'Canvas API', 'Next.js'],
    gradient: 'from-purple-600 to-blue-500'
  },
  {
    title: 'Sukalya AI',
    description: 'AI-based solution designed to deliver intelligent and user-focused functionality. Focus on usability, automation, and smart interaction.',
    link: 'https://sukalya-ai.vercel.app/',
    tags: ['AI', 'Automation', 'FullStack'],
    gradient: 'from-emerald-500 to-cyan-500'
  }
];

export default function ProjectsApp() {
  return (
    <div className="p-6 text-white grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      {projects.map((project, idx) => (
        <motion.div
           key={project.title}
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: idx * 0.1 }}
           className="group relative bg-[#1c1c1c] rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 shadow-xl"
        >
          <div className={`h-32 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity`} />
          
          <div className="p-6 -mt-16">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} shadow-lg mb-4 flex items-center justify-center`}>
                <span className="text-xl font-bold">{project.title[0]}</span>
            </div>
            
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
            <p className="text-sm text-white/70 mb-4 line-clamp-3">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase font-bold tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex gap-3">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-bold bg-white text-black px-4 py-2 rounded-lg hover:bg-white/90 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                View Live <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
