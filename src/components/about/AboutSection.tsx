import React, { useState } from 'react';
import { Terminal, Code, Cpu, ShieldCheck, Sparkles, CornerDownLeft, CheckCircle2, ChevronRight, User } from 'lucide-react';
import { DEVELOPER_STATS, PERSONAL_INFO } from '../../data/portfolioData';
import { soundFx } from '../../utils/soundEffects';

export const AboutSection: React.FC = () => {
  const [activeStatIndex, setActiveStatIndex] = useState<number | null>(null);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: 'rudra --status',
      output: 'Ready for ambitious builds. Focus: Web applications, AI integration, interactive UX.',
    },
  ]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;
    soundFx.playChirp();

    let output = '';
    if (trimmed === 'help') {
      output = 'Available commands: whoami, bio, stack, stats, ethos, clear';
    } else if (trimmed === 'whoami' || trimmed === 'bio') {
      output = PERSONAL_INFO.shortBio;
    } else if (trimmed === 'stack') {
      output = 'Core Tech: React, TypeScript, Node.js, Python, Tailwind CSS, WebGL, APIs, Git.';
    } else if (trimmed === 'stats') {
      output = 'Focus: 12+ Projects, 16+ Technologies, 25+ Lab Experiments, 100% Quality craft.';
    } else if (trimmed === 'ethos') {
      output = 'Philosophy: Turning conceptual ideas into robust, clean, and memorable digital products.';
    } else if (trimmed === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else {
      output = `Command not recognized: '${trimmed}'. Type 'help' for available commands.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: cmdStr, output }]);
    setTerminalInput('');
  };

  const handleChipClick = (cmd: string) => {
    handleCommand(cmd);
  };

  return (
    <section id="about" className="relative py-28 border-t border-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-xs font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>01 // IDENTITY & PHILOSOPHY</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            ABOUT ME
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Bio & Core Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="p-8 rounded-2xl glass-card relative overflow-hidden space-y-6">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-slate-100">Rudra</h3>
                  <p className="font-mono text-xs text-emerald-400">Full-Stack Developer & Builder</p>
                </div>
              </div>

              {/* Exact statement from prompt guidelines */}
              <blockquote className="text-xl sm:text-2xl font-display font-medium text-slate-100 leading-snug border-l-2 border-emerald-400 pl-5 py-1">
                "{PERSONAL_INFO.shortBio}"
              </blockquote>

              <p className="text-slate-300 leading-relaxed text-base">
                {PERSONAL_INFO.extendedBio}
              </p>

              {/* Core Tenets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#040806]/80 border border-emerald-500/15 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-display font-semibold text-sm text-slate-200">Interactive Precision</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Crafting tactile, fluid, and memorable interfaces powered by modern web standards.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#040806]/80 border border-emerald-500/15 flex items-start gap-3">
                  <Cpu className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-display font-semibold text-sm text-slate-200">AI & Automation</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Integrating machine reasoning, voice logic, and asynchronous pipelines seamlessly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Sandbox */}
            <div className="p-5 rounded-2xl bg-[#030605] border border-emerald-500/20 font-mono text-xs shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/15 text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">rudra@system:~$</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
              </div>

              {/* Output History */}
              <div className="py-3 space-y-2 max-h-48 overflow-y-auto">
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span>&gt;</span>
                      <span className="text-slate-200 font-medium">{item.cmd}</span>
                    </div>
                    <div className="text-slate-400 pl-4 leading-relaxed whitespace-pre-wrap">
                      {item.output}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="flex flex-wrap gap-1.5 pt-2 pb-2">
                {['whoami', 'stack', 'stats', 'ethos', 'help'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleChipClick(cmd)}
                    className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Input row */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommand(terminalInput);
                }}
                className="flex items-center gap-2 pt-2 border-t border-emerald-500/10"
              >
                <span className="text-emerald-400">&gt;</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type a command (e.g., 'help', 'stack')..."
                  className="w-full bg-transparent text-slate-100 placeholder:text-slate-600 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Execute command"
                  className="p-1 rounded text-emerald-400 hover:text-emerald-300"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Interactive Statistics Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 mb-2">
              <span className="font-mono text-xs text-emerald-400 tracking-wider uppercase font-semibold">
                CORE METRICS & FOCUS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {DEVELOPER_STATS.map((stat, index) => {
                const isActive = activeStatIndex === index;
                return (
                  <div
                    key={stat.label}
                    id={`stat-card-${stat.label.toLowerCase()}`}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveStatIndex(isActive ? null : index);
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                    className={`p-6 rounded-2xl transition-all cursor-pointer border relative overflow-hidden ${
                      isActive
                        ? 'bg-emerald-950/40 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.2)]'
                        : 'bg-[#080e0c]/60 border-emerald-500/15 hover:border-emerald-500/40 hover:bg-emerald-950/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-xs text-emerald-400 font-semibold tracking-wider">
                          {stat.label}
                        </span>
                        <div className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-1">
                          {stat.metric}
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mt-2 font-medium">
                      {stat.context}
                    </p>

                    <div className={`mt-3 pt-3 border-t border-emerald-500/15 text-xs text-slate-400 leading-relaxed transition-all ${
                      isActive ? 'block' : 'hidden lg:block'
                    }`}>
                      {stat.details}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
