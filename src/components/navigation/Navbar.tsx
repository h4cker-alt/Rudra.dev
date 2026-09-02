import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Volume2, VolumeX, Sparkles, Command } from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  isMuted,
  onToggleMute,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Simple active section detection
      const sections = ['home', 'about', 'projects', 'skills', 'lab', 'journey', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Lab', href: '#lab', id: 'lab' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#040706]/85 backdrop-blur-xl border-b border-emerald-500/15 shadow-2xl shadow-black/40'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="group flex items-center gap-2.5 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors shadow-sm group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <span className="font-mono font-bold text-sm tracking-tighter text-emerald-300">R</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-wider text-base text-slate-100 group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              RUDRA<span className="text-emerald-500">.DEV</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-[#080e0c]/60 border border-emerald-500/15 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                id={`nav-link-${item.id}`}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all relative ${
                  isActive
                    ? 'text-emerald-300 font-semibold bg-emerald-500/15 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right side status & utilities */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Status badge: ● Available for building */}
          <div
            id="status-indicator-badge"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="whitespace-nowrap">{PERSONAL_INFO.status}</span>
          </div>

          {/* Command Palette Trigger */}
          <button
            id="open-cmd-palette-btn"
            onClick={() => {
              soundFx.playClick();
              onOpenCommandPalette();
            }}
            aria-label="Open Command Palette"
            className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors flex items-center gap-1.5 text-xs font-mono"
            title="Command Palette (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline text-[11px] text-slate-400">⌘K</span>
          </button>

          {/* Sound Toggle */}
          <button
            id="toggle-audio-btn"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors"
            title={isMuted ? 'Sound FX Muted' : 'Sound FX Active'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>

        {/* Mobile menu & quick buttons */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick status dot for mobile */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>Available</span>
          </div>

          <button
            id="mobile-cmd-btn"
            onClick={() => {
              soundFx.playClick();
              onOpenCommandPalette();
            }}
            aria-label="Search"
            className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-400"
          >
            <Command className="w-4 h-4" />
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-slate-200 hover:text-emerald-400 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-[#060b09]/95 backdrop-blur-2xl border-b border-emerald-500/20 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Active</span>
                )}
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-emerald-500/15 flex items-center justify-between">
            <div className="text-xs font-mono text-slate-400">
              ● {PERSONAL_INFO.status}
            </div>
            <button
              onClick={onToggleMute}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-300"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isMuted ? 'Sound Off' : 'Sound On'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
