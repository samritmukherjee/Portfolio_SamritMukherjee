'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Database, Terminal, Palette, Code, Globe, Cpu, Smartphone } from 'lucide-react';

const skillCategories = [
  {
    name: 'Frontend',
    icon: Layout,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux'],
    color: 'from-blue-500 to-cyan-400'
  },
  {
    name: 'Backend',
    icon: Database,
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Firebase'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'AI & Tools',
    icon: Terminal,
    skills: ['OpenAI SDK', 'LangChain', 'Python', 'Git', 'Docker', 'AWS'],
    color: 'from-orange-500 to-red-500'
  },
  {
    name: 'Design',
    icon: Palette,
    skills: ['Figma', 'Adobe XD', 'UI Design', 'Responsive Web Design'],
    color: 'from-emerald-500 to-teal-400'
  }
];

export default function SkillsApp() {
  return (
    <div className="p-6 md:p-10 space-y-10 max-w-5xl mx-auto overflow-y-auto h-full pb-20 scrollbar-hide">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, catIdx) => (
          <motion.div
            key={category.name}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: catIdx * 0.1 }}
            className="group relative"
          >
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.color} rounded-2xl opacity-0 group-hover:opacity-10 transition duration-500 blur-xl`} />
            <div className="relative bg-[#1c1c1e] border border-white/[0.05] rounded-2xl p-6 shadow-2xl hover:border-white/10 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 bg-gradient-to-br ${category.color} rounded-xl shadow-lg ring-1 ring-white/10`}>
                  <category.icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white/90 tracking-tight">{category.name}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, idx) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.05] rounded-lg text-xs font-semibold text-white/50 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
