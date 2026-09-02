import React, { useState } from 'react';
import { Layout, Server, Cpu, Terminal, Sparkles, Network, Layers, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { soundFx } from '../../utils/soundEffects';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    level: string;
    focus: string;
    connections: string[];
    category: string;
  } | null>({
    name: 'TypeScript',
    level: 'Core',
    focus: 'Strict types, generics, interfaces, scalable codebases',
    connections: ['React', 'Node.js', 'APIs'],
    category: 'FRONTEND',
  });

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'frontend':
        return Layout;
      case 'backend':
        return Server;
      case 'ai-automation':
        return Cpu;
      case 'tools':
        return Terminal;
      default:
        return Layers;
    }
  };

  const filteredCategories =
    activeCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === activeCategory);

  return (
    <section id="skills" className="relative py-28 border-t border-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>03 // ECOSYSTEM & TOOLCHAIN</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              SKILLS & TECHNOLOGY
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#060a08]/80 border border-emerald-500/15 backdrop-blur-md">
            <button
              id="filter-all"
              onClick={() => {
                soundFx.playClick();
                setActiveCategory('all');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Systems
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`filter-${cat.id}`}
                onClick={() => {
                  soundFx.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Categories and Interactive Nodes (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {filteredCategories.map((category) => {
              const Icon = getCategoryIcon(category.id);

              return (
                <div
                  key={category.id}
                  className="p-6 sm:p-8 rounded-3xl glass-card border border-emerald-500/15 space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-emerald-500/15">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-white tracking-wide">
                          {category.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">{category.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Connected Skill Nodes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                    {category.skills.map((skill) => {
                      const isSelected = selectedSkill?.name === skill.name;
                      return (
                        <button
                          key={skill.name}
                          id={`skill-node-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => {
                            soundFx.playClick();
                            setSelectedSkill({ ...skill, category: category.name });
                          }}
                          onMouseEnter={() => soundFx.playHover()}
                          className={`p-4 rounded-2xl text-left transition-all relative border flex flex-col justify-between min-h-[96px] group ${
                            isSelected
                              ? 'bg-emerald-950/50 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400/40'
                              : 'bg-[#050907]/90 border-emerald-500/15 hover:border-emerald-500/40 hover:bg-emerald-950/20'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-display font-bold text-sm text-slate-100 group-hover:text-emerald-300 transition-colors">
                              {skill.name}
                            </span>
                            <span className="w-2 h-2 rounded-full bg-emerald-400/50 group-hover:bg-emerald-400 transition-colors" />
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-emerald-500/10">
                            <span className="text-[10px] font-mono text-emerald-500/80 uppercase">
                              {skill.level}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors flex items-center gap-0.5">
                              Inspect <ChevronRight className="w-2.5 h-2.5" />
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Real-Time Node Inspector & Relationship Graph (4 cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="p-6 rounded-3xl bg-[#060b09] border border-emerald-500/25 shadow-2xl relative overflow-hidden">
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 pb-4 border-b border-emerald-500/15">
                <Network className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                  NODE INSPECTOR
                </span>
              </div>

              {selectedSkill ? (
                <div className="pt-4 space-y-5">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-500/70 uppercase">
                      {selectedSkill.category}
                    </span>
                    <h4 className="font-display font-bold text-2xl text-white mt-0.5">
                      {selectedSkill.name}
                    </h4>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Practical Focus & Application:
                    </span>
                    <p className="text-sm text-slate-200 leading-relaxed mt-1 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/15">
                      {selectedSkill.focus}
                    </p>
                  </div>

                  {/* Connected Technologies Graph */}
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Connected In Stack:
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedSkill.connections.map((conn) => (
                        <span
                          key={conn}
                          className="px-2.5 py-1 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {conn}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-emerald-500/15 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>STATUS: ACTIVE TOOLCHAIN</span>
                    <span className="text-emerald-400 font-semibold">ONLINE</span>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs font-mono">
                  Click any technology node to inspect its architectural context and connections.
                </div>
              )}
            </div>

            {/* Architecture Ecosystem Insight Pill */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/15 text-xs font-mono text-slate-300 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Technology choices prioritize high developer ergonomics, strict type safety, predictable state, and fast runtime rendering.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
