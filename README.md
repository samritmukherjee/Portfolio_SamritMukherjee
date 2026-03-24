# 🖥️ SAMRIT OS - The Portfolio That's Actually an Operating System

Not your typical portfolio. This isn't just a website—it's a fully functional operating system running in your browser. Boot into macOS Ventura or Windows 11, interact with a working desktop environment, and explore my professional portfolio through a completely immersive OS experience.

**[🚀 Launch SAMRIT OS](https://your-deployed-url.com)**

## ✨ What Makes This Different?

- 🎮 **Fully Interactive OS Simulation** - Real draggable/resizable windows, working taskbar, and authentic OS interactions
- 💻 **Dual-Boot System** - Choose between macOS Ventura or Windows 11 environments with separate UIs and boot animations
- 🔄 **Live OS Switching** - Switch operating systems at any time with authentic boot sequences
- 📱 **Responsive Design** - Adaptive layouts for desktop, tablet, and mobile (adaptive OS shells)
- ⚡ **Smooth Animations** - Professional boot screens (2.8s macOS/Windows animations) and fluid window transitions
- 🎨 **Pixel-Perfect Design** - Authentic operating system aesthetics with working UI elements
- 📂 **Interactive Desktop** - My PC, file-like apps, working applications within windows
- 🚀 **Performant** - Built for 60fps experience with optimized animations

## 🎯 Features

### Desktop Environment
- Dual-boot selection (macOS or Windows)
- Interactive desktop with draggable icons
- Working taskbar showing open applications
- Window management system (minimize, maximize, close, drag, resize)
- Application dock (macOS) or taskbar (Windows)
- Start menu (Windows) functionality

### Built-in Applications
- 📄 **About** - Professional profile and background
- 💼 **Resume** - Interactive resume viewer
- 🏆 **Skills** - Technical skills and expertise showcase
- 📋 **Projects** - Portfolio of past projects with details
- 💬 **Contact** - Contact form and information
- 💡 **AI Chat** - Interactive AI chatbot experience
- ⌨️ **Terminal** - Command-line interface simulation
- 🎮 **And more** - Custom applications and widgets

### Boot Experience
- **macOS Ventura**: Professional black boot screen with Apple logo and progress bar
- **Windows 11**: Authentic Windows boot with spinning dot loader animation
- Automatic boot triggers on OS switch or system start
- Custom boot images and SVG animations

## 🛠️ Tech Stack

**Frontend Framework**
- Next.js 14+ (React 18 with TypeScript)
- Tailwind CSS for styling
- Framer Motion for smooth animations (60fps optimized)

**State Management**
- React Context API (OSContext, WindowContext)
- Custom hooks for window and application management

**Window System**
- react-rnd library (draggable & resizable)
- Custom z-index management
- Window state persistence

**Desktop Simulation**
- Custom-built OS shells (macOS & Windows)
- Responsive component architecture
- SVG and Image-based boot animations

## 📁 Project Structure

```
src/
├── components/
│   ├── apps/              # Individual applications (About, Resume, Projects, etc.)
│   ├── shell/             # OS shells (Desktop, Taskbar, MenuBar, Dock, BootScreen)
│   └── window/            # Window management (WindowFrame, WindowContainer)
├── context/               # Global state (OSContext, WindowContext)
├── types/                 # TypeScript definitions
├── constants.ts           # App configuration
└── app/
    ├── page.tsx          # Main entry point
    └── layout.tsx        # Root layout
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn/pnpm installed
- Modern browser with ES6+ support

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/SAMRIT-OS.git
cd SAMRIT-OS
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

The application will automatically start with an animated boot sequence.

## 💻 Usage

### Basic Controls
- **Drag Windows**: Click and drag the window title bar to move
- **Resize Windows**: Drag corners or edges to resize (maintains bounds)
- **Minimize/Maximize**: Click window control buttons in top-right
- **Close Apps**: Click the close button (X) to close an application
- **Open Apps**: Click icons on desktop or in taskbar/dock
- **Switch OS**: Use OS switcher in menu bar or settings

### Keyboard Shortcuts (Future)
- `Cmd + Q` (Mac) / `Alt + F4` (Windows) - Close window
- `Cmd + W` (Mac) / `Ctrl + W` (Windows) - Close application
- `Cmd + M` (Mac) / Win + D (Windows) - Minimize to taskbar

## 🎨 Customization

### Boot Screen Images
Place custom boot images in `/public/images/`:
- `macBoot.png` - macOS boot logo (256x256px recommended)
- `WindowBoot.png` - Windows boot logo (200x160px recommended)

### Application Configuration
Edit `src/constants.ts` to customize:
- Application list and icons
- Default applications
- Boot duration
- OS-specific settings

### Styling
- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component-level CSS: Tailwind classes in components

## 📦 Build & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deploy on Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository directly to Vercel for automatic deployments.

### Deploy on Other Platforms
- **Netlify**: Connect GitHub repo and set build command to `npm run build`
- **GitHub Pages**: Configure Next.js static export in `next.config.ts`
- **Docker**: Create Dockerfile with Node base image

## 🎯 Key Components Explained

### OSContext
Manages current operating system state (macOS or Windows)
```typescript
const { os, switchOS } = useOS();
switchOS('windows'); // Switch to Windows
```

### WindowContext
Manages all window operations
```typescript
const windows = useWindows();
windows.openWindow('projects'); // Open Projects app
windows.minimizeWindow('resume'); // Minimize window
```

### BootScreen
Handles OS-specific boot animations
- 2.8-second duration
- Automatic progress tracking
- Callback on completion

## 🔮 Future Enhancements

- [ ] File system simulation
- [ ] Custom desktop backgrounds
- [ ] System settings/preferences panel
- [ ] Multi-window layout management
- [ ] Keyboard shortcuts
- [ ] Sound effects
- [ ] System notifications
- [ ] Application search
- [ ] Task switcher (Alt+Tab / Cmd+Tab)
- [ ] Application store
- [ ] Browser-based code editor
- [ ] Music player

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Next.js** - Amazing React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Powerful animation library
- **react-rnd** - Draggable and resizable components
- **macOS & Windows** - Inspiration for authentic OS aesthetics

## 📧 Contact & Connect

- **Email**: [your.email@example.com](mailto:your.email@example.com)
- **LinkedIn**: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- **GitHub**: [@yourprofile](https://github.com/yourprofile)
- **Portfolio**: [Explore SAMRIT OS](https://your-deployed-url.com)

---

**Made with ❤️ and way too much coffee ☕**

*Experience the future of portfolios. Boot up SAMRIT OS today.*
