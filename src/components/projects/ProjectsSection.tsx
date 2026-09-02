import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, ArrowRight, Layers, Cpu, Compass, ShoppingBag, Eye } from 'lucide-react';
import { FEATURED_PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types';
import { ProjectModal } from '../ui/ProjectModal';
import { soundFx } from '../../utils/soundEffects';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    soundFx.playChirp();
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <section id="projects" className="relative py-28 border-t border-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>02 // ARCHITECTURE & BUILDS</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              FEATURED PROJECTS
            </h2>
          </div>

          <p className="font-mono text-xs text-slate-400 max-w-sm">
            Selected case studies exploring modular AI systems, circular commerce, and interactive digital simulations.
          </p>
        </div>

        {/* Project Notification Toast */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-[#08140f] border border-emerald-500/40 text-xs font-mono text-emerald-300 shadow-2xl animate-in slide-in-from-bottom-2">
            {notification}
          </div>
        )}

        {/* Projects Grid / Stack */}
        <div className="space-y-12">
          {FEATURED_PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="rounded-3xl glass-card border border-emerald-500/20 overflow-hidden transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_35px_rgba(16,185,129,0.12)] group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                  
                  {/* Visual Preview Column (7 cols on lg) */}
                  <div
                    className={`lg:col-span-7 p-6 sm:p-8 bg-[#040806]/80 flex flex-col justify-center relative overflow-hidden border-b lg:border-b-0 ${
                      isEven ? 'lg:border-r border-emerald-500/15' : 'lg:order-2 lg:border-l border-emerald-500/15'
                    }`}
                  >
                    {/* Background subtle noise and grid */}
                    <div className="absolute inset-0 bg-cyber-grid opacity-30" />

                    {/* Interactive Mockup Container */}
                    <div className="relative z-10 w-full rounded-2xl bg-[#070d0b] border border-emerald-500/20 p-5 shadow-2xl overflow-hidden min-h-[280px] flex flex-col justify-between">
                      
                      {/* Window Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-emerald-500/15">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="font-mono text-[11px] text-emerald-400/80">
                          {project.id}.runtime
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          LIVE
                        </div>
                      </div>

                      {/* Mockup Content tailored to each project */}
                      <div className="py-6 flex-1 flex flex-col justify-center">
                        {project.previewType === 'ai-core' && (
                          <div className="space-y-3 font-mono text-xs">
                            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-slate-300">
                              <span className="text-emerald-400">&gt;</span> Memory Graph initialized: 4 Context Nodes Active
                            </div>
                            <div className="p-3 rounded-xl bg-[#030605] border border-emerald-500/10 flex items-center justify-between text-slate-400">
                              <div className="flex items-center gap-2">
                                <Cpu className="w-4 h-4 text-emerald-400" />
                                <span>Voice Pipeline: Active [48kHz Float32]</span>
                              </div>
                              <span className="text-emerald-400 font-semibold">12ms Latency</span>
                            </div>
                            <div className="flex gap-2 text-[11px]">
                              <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-300">Autonomous Reasoning</span>
                              <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-300">Tool Execution</span>
                            </div>
                          </div>
                        )}

                        {project.previewType === 'ecommerce-mesh' && (
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                                <span className="text-[10px] font-mono text-slate-400 uppercase">Circular Metric</span>
                                <div className="font-display font-bold text-lg text-emerald-300 mt-1">-42.8 kg CO₂e</div>
                                <span className="text-[10px] text-slate-400">Calculated on checkout</span>
                              </div>
                              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                                <span className="text-[10px] font-mono text-slate-400 uppercase">Inventory State</span>
                                <div className="font-display font-bold text-lg text-emerald-300 mt-1">Real-Time Sync</div>
                                <span className="text-[10px] text-slate-400">Optimistic UI Cache</span>
                              </div>
                            </div>
                            <div className="p-2.5 rounded-lg bg-[#030605] border border-emerald-500/10 text-xs font-mono text-slate-400 flex items-center justify-between">
                              <span>Recycling Commerce Catalog Engine</span>
                              <span className="text-emerald-400 font-semibold">100% Sustainable</span>
                            </div>
                          </div>
                        )}

                        {project.previewType === 'interactive-aura' && (
                          <div className="space-y-3">
                            <div className="h-28 rounded-xl bg-gradient-to-r from-emerald-950/60 via-teal-900/40 to-emerald-900/60 border border-emerald-500/30 flex items-center justify-center relative overflow-hidden group/canvas">
                              <div className="w-20 h-20 rounded-full bg-emerald-400/20 blur-xl animate-pulse" />
                              <div className="relative z-10 font-mono text-xs text-emerald-200 text-center">
                                <Sparkles className="w-5 h-5 text-emerald-400 mx-auto mb-1 animate-spin" style={{ animationDuration: '8s' }} />
                                <span>Generative WebGL Aura Matrix</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                              <span>Cursor Spectrum Dynamic Tracking</span>
                              <span className="text-emerald-400">60 FPS WebGL</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Mockup footer */}
                      <div className="pt-2 border-t border-emerald-500/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
                        <span>Architecture: Modular</span>
                        <span>{project.accentColor}</span>
                      </div>
                    </div>

                  </div>

                  {/* Details Column (5 cols on lg) */}
                  <div
                    className={`lg:col-span-5 p-8 flex flex-col justify-between space-y-6 ${
                      isEven ? '' : 'lg:order-1'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                          0{index + 1} // CASE STUDY
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-emerald-300 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/20 text-xs font-mono text-emerald-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-emerald-500/15">
                      <button
                        id={`btn-view-${project.id}`}
                        onClick={() => {
                          soundFx.playClick();
                          setSelectedProject(project);
                        }}
                        onMouseEnter={() => soundFx.playHover()}
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-display font-semibold text-xs tracking-wide transition-all hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2 active:scale-95"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Project</span>
                      </button>

                      <button
                        id={`btn-github-${project.id}`}
                        onClick={() => {
                          showNotification(`GitHub repository: ${project.githubPlaceholder} (Placeholder link)`);
                        }}
                        onMouseEnter={() => soundFx.playHover()}
                        className="px-4 py-2.5 rounded-xl bg-[#080d0b] border border-emerald-500/25 text-slate-300 hover:text-white hover:border-emerald-400/50 transition-colors text-xs font-mono flex items-center gap-2"
                      >
                        <Github className="w-4 h-4 text-emerald-400" />
                        <span>GitHub</span>
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Case Study Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};
