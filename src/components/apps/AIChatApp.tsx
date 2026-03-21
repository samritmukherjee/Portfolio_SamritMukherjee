'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QUICK_ACTIONS = [
  { id: 'projects', label: 'Show Projects', icon: '🚀' },
  { id: 'skills', label: 'Skills Overview', icon: '🧠' },
  { id: 'hire', label: 'Why Hire Me?', icon: '🤝' },
];

export default function AIChatApp() {
  const [messages, setMessages] = useState([
    { id: '1', role: 'ai', content: "Hi, I’m Samrit AI. Ask me anything about my projects, skills, or achievements." }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: text }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      let response = "I'm still learning about Samrit's latest work! Feel free to explore the Projects or Skills apps for more details.";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes('project')) {
        response = "Samrit has built some amazing AI tools like 'Cosmic Canvas' and 'Sukalya AI'. You can check them out in the Projects app!";
      } else if (lowerText.includes('skill') || lowerText.includes('stack')) {
        response = "Samrit is proficient in Java, Python, JavaScript, and frameworks like Flask, NumPy, and Pandas. Check out the Skills app for the full list.";
      } else if (lowerText.includes('hire')) {
        response = "Samrit brings a unique blend of AI expertise and creative design thinking. He is passionate about building impactful, user-centric solutions.";
      }
      
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', content: response }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#111111] text-white">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${msg.role === 'ai' ? 'bg-blue-600' : 'bg-white/10'}`}>
                  {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'ai' ? 'bg-white/5 border border-white/10 rounded-tl-none' : 'bg-blue-600 text-white rounded-tr-none'}`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-white/10 bg-[#161616]">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none">
          {QUICK_ACTIONS.map(action => (
            <button
              key={action.id}
              onClick={() => handleSend(action.label)}
              className="whitespace-nowrap flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[11px] transition-colors"
            >
              <span>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
        
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 p-2 text-blue-500 hover:text-blue-400 disabled:opacity-50 transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
