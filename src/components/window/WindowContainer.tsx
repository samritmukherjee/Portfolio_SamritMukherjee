'use client';

import React, { Suspense, lazy } from 'react';
import { useWindows } from '@/context/WindowContext';
import WindowFrame from './WindowFrame';
import { AnimatePresence } from 'framer-motion';

// Lazy load apps
const AboutApp = lazy(() => import('../apps/AboutApp'));
const ProjectsApp = lazy(() => import('../apps/ProjectsApp'));
const SkillsApp = lazy(() => import('../apps/SkillsApp'));
const AIChatApp = lazy(() => import('../apps/AIChatApp'));
const TerminalApp = lazy(() => import('../apps/TerminalApp'));
const ResumeApp = lazy(() => import('../apps/ResumeApp'));
const ContactApp = lazy(() => import('../apps/ContactApp'));

const APP_COMPONENTS: Record<string, React.ReactNode> = {
  AboutApp: <AboutApp />,
  ProjectsApp: <ProjectsApp />,
  SkillsApp: <SkillsApp />,
  AIChatApp: <AIChatApp />,
  TerminalApp: <TerminalApp />,
  ResumeApp: <ResumeApp />,
  ContactApp: <ContactApp />,
};

export default function WindowContainer() {
  const { windows } = useWindows();

  return (
    <div className="relative w-full h-full pointer-events-none">
      <AnimatePresence>
        {windows.map((window) => {
          if (!window.isOpen || window.isMinimized) return null;

          return (
            <WindowFrame key={window.id} window={window}>
              <Suspense fallback={<div className="flex items-center justify-center h-full text-white/50">Loading...</div>}>
                {/* Dynamically get the app component based on its name in constant */}
                {/* For simplicity we use the component name from types */}
                {/* We map appId to component name if needed, but here we'll just check appId */}
                {renderAppComponent(window.appId)}
              </Suspense>
            </WindowFrame>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function renderAppComponent(appId: string) {
    switch (appId) {
        case 'about': return <AboutApp />;
        case 'projects': return <ProjectsApp />;
        case 'skills': return <SkillsApp />;
        case 'ai-chat': return <AIChatApp />;
        case 'terminal': return <TerminalApp />;
        case 'resume': return <ResumeApp />;
        case 'contact': return <ContactApp />;
        default: return <div className="p-4">App not found: {appId}</div>;
    }
}
