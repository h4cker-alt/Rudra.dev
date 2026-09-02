import React, { useState } from 'react';
import { X, ExternalLink, Github, Sparkles, Layers, Cpu, CheckCircle, ArrowRight, Shield, Copy, Check } from 'lucide-react';
import { Project } from '../../types';
import { soundFx } from '../../utils/soundEffects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'features'>('overview');

  if (!project) return null;

  const handleCopyLink = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(project.liveUrlPlaceholder);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        id="project-case-study-modal"
        className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl bg-[#080e0c] border border-emerald-500/30 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-emerald-500/20 bg-emerald-950/30 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 font-semibold">
                CASE STUDY
              </span>
              <span className="text-xs font-mono text-slate-400">{project.subtitle}</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-white">
              {project.title}
            </h3>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            aria-label="Close modal"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2 border-b border-emerald-500/10 bg-[#060a08]">
          {(['overview', 'architecture', 'features'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                soundFx.playClick();
                setActiveTab(tab);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                activeTab === tab
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                  Project Concept
                </h4>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {project.longDescription}
                </p>
              </div>

              {/* Quick Metrics */}
              {project.stats && (
                <div className="grid grid-cols-3 gap-3">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/15">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{stat.label}</span>
                      <div className="font-display font-bold text-base text-emerald-300 mt-0.5">{stat.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2.5">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-[#040806] border border-emerald-500/25 text-xs font-mono text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                System Architecture Highlights
              </h4>
              <div className="space-y-2.5">
                {project.architecture.map((arch, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#040806] border border-emerald-500/20 flex items-start gap-3">
                    <Layers className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-mono text-emerald-300 font-semibold">Module 0{idx + 1}</span>
                      <p className="text-sm text-slate-300 mt-0.5">{arch}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                Core Capabilities & Features
              </h4>
              <div className="space-y-2.5">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#040806] border border-emerald-500/15 flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-slate-200">{feat}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links and Placeholders Section */}
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 font-semibold">SOURCE & REPOSITORY</span>
              <span className="text-[11px] font-mono text-slate-400">Placeholder Link</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={project.githubPlaceholder}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  soundFx.playChirp();
                  alert(`GitHub placeholder: ${project.githubPlaceholder}`);
                }}
                className="px-4 py-2 rounded-xl bg-[#080d0b] border border-emerald-500/30 text-xs font-mono text-slate-200 hover:text-white hover:border-emerald-400 transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4 text-emerald-400" />
                <span>View on GitHub</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl bg-[#080d0b] border border-emerald-500/30 text-xs font-mono text-slate-200 hover:text-white hover:border-emerald-400 transition-colors flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-emerald-400" />}
                <span>{copied ? 'Link Copied!' : 'Copy Deployment Link'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-emerald-500/20 bg-[#040806] flex items-center justify-end">
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-display font-semibold text-xs tracking-wide hover:bg-emerald-400 transition-colors"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
