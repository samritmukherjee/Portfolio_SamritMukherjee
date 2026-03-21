'use client';

import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    name: 'Languages',
    icon: '🧠',
    skills: ['Java', 'C', 'C++', 'Python', 'JavaScript']
  },
  {
    name: 'Web Technologies',
    icon: '🌐',
    skills: ['HTML5', 'CSS3']
  },
  {
    name: 'Frameworks & Libraries',
    icon: '⚙️',
    skills: ['Flask', 'NumPy', 'Pandas']
  },
  {
    name: 'Tools & Platforms',
    icon: '🛠️',
    skills: ['Git', 'GitHub', 'PowerShell']
  },
  {
    name: 'Design & Media',
    icon: '🎨',
    skills: ['Figma', 'Canva', 'Adobe Premiere Pro']
  }
];

export default function SkillsApp() {
  return (
    <div className="p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="p-2 bg-blue-500/20 rounded-lg">🚀</span> Tech Stack
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 bg-[#1a1a1a]/50 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-bold text-sm tracking-widest uppercase opacity-60">{cat.name}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span 
                    key={skill} 
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium hover:bg-blue-500/20 hover:border-blue-500/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
