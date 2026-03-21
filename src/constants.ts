import { AppConfig } from './types';

export const APPS: AppConfig[] = [
  { id: 'about', name: 'About Samrit', icon: 'User', component: 'AboutApp' },
  { id: 'projects', name: 'Projects', icon: 'Briefcase', component: 'ProjectsApp' },
  { id: 'skills', name: 'Skills', icon: 'Code2', component: 'SkillsApp' },
  { id: 'ai-chat', name: 'Samrit AI', icon: 'Bot', component: 'AIChatApp' },
  { id: 'terminal', name: 'Terminal', icon: 'Terminal', component: 'TerminalApp' },
  { id: 'resume', name: 'Resume', icon: 'FileText', component: 'ResumeApp' },
  { id: 'contact', name: 'Contact', icon: 'Mail', component: 'ContactApp' },
];

export const SOCIALS = {
  github: 'https://github.com/samritmukherjee',
  linkedin: 'https://www.linkedin.com/in/samrit-mukherjee-412788318/',
  email: 'mailto:samrit.mukherjee@example.com', // Placeholder email
};

export const OS_DATA = {
  macos: {
    wallpaper: '/wallpapers/macos-ventura.jpg',
    font: 'SF Pro Display, -apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", sans-serif',
  },
  windows: {
    wallpaper: '/wallpapers/windows-11.jpg',
    font: 'Segoe UI Variable Display, Segoe UI, system-ui, sans-serif',
  }
};
//
