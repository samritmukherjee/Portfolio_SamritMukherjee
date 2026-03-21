'use client';

import React, { useState, useEffect, useRef } from 'react';

const COMMANDS = {
  help: 'Available commands: whois, projects, skills, contact, hire, clear, ls',
  whois: 'Samrit Mukherjee - AI Developer & Creative Technologist. Passionate about AI-powered tools and user-centric design.',
  projects: '1. Cosmic Canvas: AI design platform\n2. Sukalya AI: Intelligent automation\nRun "ls" for more info.',
  skills: 'Stack: Java, Python, JavaScript, Flask, NumPy, Pandas, Figma, Git.',
  contact: 'Github: github.com/samritmukherjee\nLinkedIn: linkedin.com/in/samrit-mukherjee-412788318/',
  hire: 'Ready to build impactful solutions. Contact me via LinkedIn or GitHub!',
  ls: 'Desktop/\nDocuments/\nProjects/\nSkills/\nResume.pdf',
};

export default function TerminalApp() {
  const [history, setHistory] = useState<string[]>(['Welcome to Samrit OS Terminal v1.0.0', 'Type "help" to see available commands.']);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
    } else {
      let response = `Command not found: ${cmd}. Type "help" for a list of commands.`;
      if (COMMANDS[cmd as keyof typeof COMMANDS]) {
        response = COMMANDS[cmd as keyof typeof COMMANDS];
      }
      setHistory(prev => [...prev, `samrit@portfolio:~$ ${input}`, response]);
    }
    
    setInput('');
  };

  return (
    <div 
      className="h-full bg-[#0c0c0c] p-4 font-mono text-sm overflow-y-auto selection:bg-white/20 selection:text-green-400"
      onClick={() => document.getElementById('terminal-input')?.focus()}
    >
      <div className="text-green-500 mb-4 opacity-80">
        [System Initialization Complete]
      </div>
      
      {history.map((line, i) => (
        <div key={i} className="mb-1 leading-relaxed whitespace-pre-wrap">
          {line.startsWith('samrit@portfolio') ? (
            <span className="text-blue-400">{line}</span>
          ) : (
            <span className="text-white/90">{line}</span>
          )}
        </div>
      ))}
      
      <form onSubmit={handleCommand} className="flex mt-2">
        <span className="text-blue-400 shrink-0 mr-2">samrit@portfolio:~$</span>
        <input
          id="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-white w-full p-0"
          autoComplete="off"
          autoFocus
        />
      </form>
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
