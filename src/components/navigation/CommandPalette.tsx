import React, { useState, useEffect } from 'react';
import { Search, X, Compass, Terminal, Code2, Cpu, History, Mail, Volume2, VolumeX, Sparkles, Check } from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onSelectLabExperiment?: (id: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  isMuted,
  onToggleMute,
  onSelectLabExperiment,
}) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        soundFx.playChirp();
        if (isOpen) onClose();
        else {
          // Open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const scrollToSection = (id: string) => {
    soundFx.playClick();
    onClose();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(PERSONAL_INFO.emailPlaceholder);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const actions = [
    { id: 'nav-home', label: 'Jump to Hero', category: 'Navigation', icon: Compass, action: () => scrollToSection('home') },
    { id: 'nav-about', label: 'Jump to About Me', category: 'Navigation', icon: Terminal, action: () => scrollToSection('about') },
    { id: 'nav-projects', label: 'Explore Featured Projects', category: 'Navigation', icon: Code2, action: () => scrollToSection('projects') },
    { id: 'nav-skills', label: 'View Skills & Technology Matrix', category: 'Navigation', icon: Cpu, action: () => scrollToSection('skills') },
    { id: 'nav-lab', label: 'Visit Rudra\'s Lab (Interactive Sandboxes)', category: 'Navigation', icon: Sparkles, action: () => scrollToSection('lab') },
    { id: 'nav-journey', label: 'View Developer Journey', category: 'Navigation', icon: History, action: () => scrollToSection('journey') },
    { id: 'nav-contact', label: 'Get in Touch (Contact Form)', category: 'Navigation', icon: Mail, action: () => scrollToSection('contact') },
    {
      id: 'toggle-audio',
      label: isMuted ? 'Enable Audio Synthesizer' : 'Mute Audio Synthesizer',
      category: 'Preferences',
      icon: isMuted ? Volume2 : VolumeX,
      action: onToggleMute,
    },
    {
      id: 'copy-email',
      label: copied ? 'Email Copied!' : `Copy Email (${PERSONAL_INFO.emailPlaceholder})`,
      category: 'Quick Action',
      icon: copied ? Check : Mail,
      action: copyEmail,
    },
  ];

  const filteredActions = actions.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="command-palette-modal"
        className="relative w-full max-w-xl rounded-2xl bg-[#080d0b] border border-emerald-500/30 shadow-2xl shadow-emerald-950/50 overflow-hidden"
      >
        {/* Header & Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-emerald-500/20 bg-emerald-950/20">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or jump to section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none font-mono"
            autoFocus
          />
          <button
            onClick={onClose}
            aria-label="Close command palette"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-emerald-500/10">
          {filteredActions.length > 0 ? (
            filteredActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  id={`cmd-${action.id}`}
                  onClick={() => {
                    action.action();
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors hover:bg-emerald-500/15 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-slate-200 font-medium group-hover:text-white">
                      {action.label}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-500/60 uppercase tracking-wider">
                    {action.category}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-slate-500 text-sm">
              No matching commands found.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#040806] border-t border-emerald-500/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>Navigation Hub</span>
            <span>•</span>
            <span>RUDRA.DEV</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/20 text-emerald-400">ESC</kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
