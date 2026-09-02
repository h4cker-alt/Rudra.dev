import React from 'react';
import { Terminal, Compass, Layers, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { JOURNEY_MILESTONES } from '../../data/portfolioData';
import { soundFx } from '../../utils/soundEffects';

export const JourneySection: React.FC = () => {
  const getMilestoneIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return Terminal;
      case 'Compass':
        return Compass;
      case 'Layers':
        return Layers;
      case 'Sparkles':
        return Sparkles;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="journey" className="relative py-28 border-t border-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>05 // EVOLUTION & TRAJECTORY</span>
            </div>
            
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              THE JOURNEY
            </h2>
          </div>

          <p className="font-mono text-xs text-slate-400 max-w-sm">
            Continuous technical growth driven by curiosity, engineering discipline, and ambition.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Glowing central timeline line */}
          <div className="absolute top-4 bottom-4 left-6 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-emerald-500/40 via-emerald-400/20 to-emerald-500/5" />

          {/* Milestones */}
          <div className="space-y-12">
            {JOURNEY_MILESTONES.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = getMilestoneIcon(milestone.icon);
              const isCurrent = milestone.stage === 'NOW';

              return (
                <div
                  key={milestone.stage}
                  id={`journey-node-${milestone.stage.toLowerCase()}`}
                  onMouseEnter={() => soundFx.playHover()}
                  className="relative flex flex-col md:flex-row items-start group"
                >
                  {/* Timeline Badge Node Center */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-[#040806] border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 z-20 group-hover:border-emerald-300 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all">
                    <Icon className="w-5 h-5" />
                    {isCurrent && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    )}
                  </div>

                  {/* Content Box */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${
                      isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto md:text-left'
                    }`}
                  >
                    <div className="p-6 rounded-3xl glass-card border border-emerald-500/15 hover:border-emerald-500/40 transition-all space-y-3">
                      
                      <div className={`flex items-center gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-300">
                          {milestone.stage}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {milestone.status === 'IN PROGRESS' ? '● Active Focus' : '✓ Milestone'}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl text-white">
                        {milestone.title}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {milestone.description}
                      </p>

                      {/* Skills Focus Badges */}
                      <div className={`flex flex-wrap gap-1.5 pt-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                        {milestone.skillsFocus.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-md bg-[#030605] border border-emerald-500/20 text-[11px] font-mono text-emerald-400/90"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
