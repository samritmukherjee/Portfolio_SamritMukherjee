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

const APP_COMPONENTS: Record<string, React.LazyExoticComponent<React.FC>> = {
  about: AboutApp,
  projects: ProjectsApp,
  skills: SkillsApp,
  'ai-chat': AIChatApp,
  terminal: TerminalApp,
  resume: ResumeApp,
  contact: ContactApp,
};

export default function WindowContainer() {
  const { windows } = useWindows();

  const renderAppComponent = (appId: string) => {
    const AppComponent = APP_COMPONENTS[appId];
    if (!AppComponent) {
      return <div className="p-4 text-white/50">App not found: {appId}</div>;
    }
    return <AppComponent />;
  };

  return (
    <div className="relative w-full h-full pointer-events-none overflow-hidden">
      <AnimatePresence>
        {windows.map((window) => {
          if (!window.isOpen || window.isMinimized) return null;

          return (
            <WindowFrame key={window.id} window={window}>
              <Suspense fallback={<div className="flex items-center justify-center h-full text-white/50">Loading...</div>}>
                {renderAppComponent(window.appId)}
              </Suspense>
            </WindowFrame>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
