'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QUICK_ACTIONS = [
  { id: 'projects', label: 'Show Projects', icon: <Sparkles size={14} /> },
  { id: 'skills', label: 'Skills Overview', icon: <Command size={14} /> },
  { id: 'hire', label: 'Why Hire Me?', icon: <User size={14} /> },
];

export default function AIChatApp() {
  const [messages, setMessages] = useState([
    { id: '1', role: 'ai', content: "Hi, I’m Samrit AI. Ask me anything about my projects, skills, or achievements." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim() || isLoading) return;
    
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: text }]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      let response = "I'm still learning about Samrit's latest work! Feel free to explore the Projects or Skills apps for more details.";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes('project')) {
        response = "Samrit has built some amazing AI tools like 'Cosmic Canvas' and 'Sukalya AI'. You can check them out in the Projects app!";
      } else if (lowerText.includes('skill') || lowerText.includes('stack')) {
        response = "Samrit is proficient in Java, Python, JavaScript, and frameworks like React, Next.js, and Node.js. Check out the Skills app for the full list.";
      } else if (lowerText.includes('hire')) {
        response = "Samrit brings a unique blend of AI expertise and creative design thinking. He is passionate about building impactful, user-centric solutions.";
      }
      
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', content: response }]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0b] text-white">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth scrollbar-hide"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center shadow-xl ring-1 ring-white/10 ${msg.role === 'ai' ? 'bg-gradient-to-br from-blue-600 to-indigo-600' : 'bg-white/5'}`}>
                  {msg.role === 'ai' ? <Bot size={20} className="text-white" /> : <User size={20} className="text-white/80" />}
                </div>
                <div className={`p-4 rounded-[22px] text-[14px] leading-relaxed shadow-2xl ${msg.role === 'ai' ? 'bg-white/[0.04] border border-white/[0.08] rounded-tl-none font-medium text-white/90' : 'bg-blue-600 text-white rounded-tr-none font-bold'}`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
               <div className="flex gap-4 max-w-[85%]">
                 <div className="w-10 h-10 rounded-2xl bg-white/5 animate-pulse flex items-center justify-center">
                    <Bot size={20} className="text-white/20" />
                 </div>
                 <div className="bg-white/5 border border-white/5 px-6 py-4 rounded-[22px] rounded-tl-none italic text-white/30 text-sm animate-pulse">
                    Samrit AI is typing...
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 border-t border-white/[0.05] bg-black/40 backdrop-blur-3xl">
        <div className="flex gap-2.5 mb-6 overflow-x-auto pb-4 scrollbar-hide">
          {QUICK_ACTIONS.map(action => (
            <button
              key={action.id}
              onClick={() => handleSend(action.label)}
              className="whitespace-nowrap flex items-center gap-2 px-4 py-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] rounded-2xl text-[12px] font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg active:shadow-none"
            >
              <span className="text-blue-400">{action.icon}</span>
              <span className="text-white/70">{action.label}</span>
            </button>
          ))}
        </div>
        
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="relative flex items-center group"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-[22px] px-6 py-4 pr-14 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white/[0.06] transition-all placeholder:text-white/20"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-500 disabled:opacity-30 disabled:grayscale transition-all shadow-lg active:scale-90"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
