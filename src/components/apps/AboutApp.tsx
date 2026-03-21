'use client';

import React from 'react';

export default function AboutApp() {
  return (
    <div className="p-8 text-white max-w-2xl mx-auto flex flex-col gap-6 font-sans">
      <div className="flex items-center gap-6 mb-4">
        <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-xl border-2 border-white/20">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Samrit" alt="Samrit" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Samrit Mukherjee</h1>
          <p className="text-blue-400 font-medium">AI Developer & Creative Technologist</p>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <span>👋</span> Hello!
        </h2>
        <p className="text-white/80 leading-relaxed italic">
           A developer passionate about building AI-powered tools that combine creativity, design, and real-world usability. From leadership in scouting to developing intelligent systems, focused on creating impactful and user-friendly solutions.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-xs font-bold uppercase text-white/40 mb-1">Passions</h3>
          <p className="text-sm">AI, Creative Coding, UI/UX</p>
        </div>
        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-xs font-bold uppercase text-white/40 mb-1">Focus</h3>
          <p className="text-sm">Usability & Automation</p>
        </div>
      </section>

      <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
          <p className="text-sm text-blue-200 text-center">
            "Combining technology with human intuition to build the future."
          </p>
      </div>
    </div>
  );
}
