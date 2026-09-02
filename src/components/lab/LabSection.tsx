import React, { useState, useRef, useEffect } from 'react';
import { FlaskConical, Play, Sparkles, Terminal, Activity, RefreshCw, Cpu, Layers, Maximize2, Zap, Sliders, Check } from 'lucide-react';
import { LAB_EXPERIMENTS } from '../../data/portfolioData';
import { LabExperiment } from '../../types';
import { soundFx } from '../../utils/soundEffects';

export const LabSection: React.FC = () => {
  const [activeExperiment, setActiveExperiment] = useState<LabExperiment | null>(LAB_EXPERIMENTS[0]);
  const [particleSpeed, setParticleSpeed] = useState<number>(1);
  const [matrixLog, setMatrixLog] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [reasoningStep, setReasoningStep] = useState<number>(1);
  const [glitchActive, setGlitchActive] = useState<boolean>(false);

  // Neural Particle Canvas ref
  const neuralCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Particle simulation loop
  useEffect(() => {
    if (activeExperiment?.id !== 'exp-neural-particles') return;
    const canvas = neuralCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    const count = 45;
    const nodes: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5 * particleSpeed,
        vy: (Math.random() - 0.5) * 1.5 * particleSpeed,
        radius: Math.random() * 2.5 + 1.5,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const loop = () => {
      ctx.fillStyle = 'rgba(5, 10, 8, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Update & draw nodes
      for (let i = 0; i < count; i++) {
        const node = nodes[i];
        node.x += node.vx * particleSpeed;
        node.y += node.vy * particleSpeed;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse repulsion
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          const force = (90 - dist) / 90;
          node.x += (dx / dist) * force * 5;
          node.y += (dy / dist) * force * 5;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#34d399';
        ctx.fill();

        // Connect
        for (let j = i + 1; j < count; j++) {
          const other = nodes[j];
          const dxx = node.x - other.x;
          const dyy = node.y - other.y;
          const d = Math.sqrt(dxx * dxx + dyy * dyy);

          if (d < 85) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${1 - d / 85})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activeExperiment, particleSpeed]);

  // Matrix Stream simulation
  useEffect(() => {
    if (activeExperiment?.id !== 'exp-matrix-stream' || !isStreaming) return;

    const sampleTokens = [
      'token_id: 0x8F94 [attn_weight: 0.94]',
      'vector_projection -> dim(1536) norm=1.000',
      'branch: reasoning_step_3 -> explore_heuristics()',
      'evaluating context cache hit: 99.4% precision',
      'synthesizing semantic response fragment...',
      'layer(24).feed_forward -> activation=GELU',
      'stream::chunk_dispatched [latency=8.4ms]',
    ];

    const interval = setInterval(() => {
      const randomToken = sampleTokens[Math.floor(Math.random() * sampleTokens.length)];
      setMatrixLog((prev) => [
        `[${new Date().toISOString().substring(11, 23)}] ${randomToken}`,
        ...prev.slice(0, 14),
      ]);
    }, 450);

    return () => clearInterval(interval);
  }, [activeExperiment, isStreaming]);

  const triggerGlitch = () => {
    soundFx.playChirp(750, 0.1);
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 800);
  };

  return (
    <section id="lab" className="relative py-28 border-t border-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>04 // DIGITAL EXPERIMENTAL LABORATORY</span>
            </div>
            
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              RUDRA'S LAB
            </h2>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-xs font-mono text-emerald-300 font-semibold">
            EXPERIMENTS / PROTOTYPES / IDEAS
          </div>
        </div>

        {/* Lab Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Experiment Cards Grid (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block px-1">
              SELECT PROTOTYPE SANDBOX:
            </span>

            <div className="grid grid-cols-1 gap-3">
              {LAB_EXPERIMENTS.map((exp) => {
                const isActive = activeExperiment?.id === exp.id;
                return (
                  <button
                    key={exp.id}
                    id={`lab-card-${exp.id}`}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveExperiment(exp);
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                    className={`p-4 rounded-2xl text-left transition-all border flex items-center justify-between group ${
                      isActive
                        ? 'bg-emerald-950/60 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.2)]'
                        : 'bg-[#060b09]/80 border-emerald-500/15 hover:border-emerald-500/40 hover:bg-emerald-950/20'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-[10px] font-mono text-emerald-300 uppercase">
                          {exp.type}
                        </span>
                        <h4 className="font-display font-semibold text-sm text-slate-100 group-hover:text-emerald-300 transition-colors">
                          {exp.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{exp.description}</p>
                    </div>

                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors shrink-0 ml-3">
                      <Play className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Live Interactive Sandbox Stage (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#050a08] border border-emerald-500/30 p-6 shadow-2xl relative overflow-hidden min-h-[460px] flex flex-col justify-between">
              
              {/* Sandbox Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-display font-bold text-base text-white">
                    {activeExperiment?.title}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                  {activeExperiment?.badge}
                </span>
              </div>

              {/* Sandbox Interactive Area */}
              <div className="py-6 flex-1 flex flex-col justify-center relative">
                {/* 1. Neural Particle Canvas */}
                {activeExperiment?.id === 'exp-neural-particles' && (
                  <div className="space-y-4">
                    <div className="relative w-full h-64 rounded-2xl bg-[#020504] border border-emerald-500/20 overflow-hidden shadow-inner">
                      <canvas ref={neuralCanvasRef} className="w-full h-full cursor-crosshair" />
                      <div className="absolute bottom-2 left-3 font-mono text-[10px] text-emerald-400/70 pointer-events-none">
                        Move cursor across stage to induce synaptic repulsion force
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-300">
                      <span>Particle Kinematics Speed:</span>
                      <div className="flex items-center gap-2">
                        {[0.5, 1, 2].map((spd) => (
                          <button
                            key={spd}
                            onClick={() => {
                              soundFx.playClick();
                              setParticleSpeed(spd);
                            }}
                            className={`px-2.5 py-1 rounded-lg border transition-colors ${
                              particleSpeed === spd
                                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                                : 'bg-[#030605] border-emerald-500/20 text-slate-400'
                            }`}
                          >
                            {spd}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Cyberpunk Token Matrix Stream */}
                {activeExperiment?.id === 'exp-matrix-stream' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-4 rounded-2xl bg-[#020403] border border-emerald-500/20 h-64 overflow-y-auto space-y-1.5 shadow-inner">
                      {matrixLog.map((log, idx) => (
                        <div key={idx} className="text-emerald-400/90 leading-tight">
                          {log}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between px-1">
                      <span className="text-slate-400 text-xs font-mono">Stream Status: {isStreaming ? 'TRANSMITTING' : 'PAUSED'}</span>
                      <button
                        onClick={() => {
                          soundFx.playClick();
                          setIsStreaming(!isStreaming);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono text-emerald-300 hover:bg-emerald-500/30"
                      >
                        {isStreaming ? 'Pause Stream' : 'Resume Stream'}
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. AI Reasoning Step Visualizer */}
                {activeExperiment?.id === 'exp-reasoning-trace' && (
                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-[#020504] border border-emerald-500/20 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-emerald-500/15">
                        <span>REASONING GRAPH TRACE</span>
                        <span className="text-emerald-400">Step 0{reasoningStep} / 04</span>
                      </div>

                      {reasoningStep === 1 && (
                        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-slate-200 text-xs font-mono space-y-1">
                          <span className="text-emerald-400 font-bold">[1. Intent Decomposition]</span>
                          <p className="text-slate-300">Parsing input prompt into multi-target graph constraints & semantic vectors.</p>
                        </div>
                      )}

                      {reasoningStep === 2 && (
                        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-slate-200 text-xs font-mono space-y-1">
                          <span className="text-emerald-400 font-bold">[2. Contextual Retrieval]</span>
                          <p className="text-slate-300">Evaluating nearest neighbor embeddings in vector store. 8 relevance points scored.</p>
                        </div>
                      )}

                      {reasoningStep === 3 && (
                        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-slate-200 text-xs font-mono space-y-1">
                          <span className="text-emerald-400 font-bold">[3. Heuristic Synthesis]</span>
                          <p className="text-slate-300">Constructing optimal solution path with fallback verification checks.</p>
                        </div>
                      )}

                      {reasoningStep === 4 && (
                        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-slate-200 text-xs font-mono space-y-1">
                          <span className="text-emerald-400 font-bold">[4. Output Generation]</span>
                          <p className="text-slate-300">Final structured execution ready. High confidence score: 0.982.</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          soundFx.playClick();
                          setReasoningStep((prev) => (prev > 1 ? prev - 1 : 4));
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-[#030605] border border-emerald-500/25 text-xs font-mono text-slate-300"
                      >
                        &lt; Previous Step
                      </button>
                      <button
                        onClick={() => {
                          soundFx.playClick();
                          setReasoningStep((prev) => (prev < 4 ? prev + 1 : 1));
                        }}
                        className="px-4 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs font-mono text-emerald-300 font-semibold"
                      >
                        Next Step &gt;
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. Orbital Force Sandbox */}
                {activeExperiment?.id === 'exp-gravity-orbit' && (
                  <div className="p-6 rounded-2xl bg-[#020504] border border-emerald-500/20 text-center space-y-4">
                    <div className="relative w-32 h-32 mx-auto rounded-full border border-dashed border-emerald-500/40 flex items-center justify-center animate-spin" style={{ animationDuration: '12s' }}>
                      <div className="w-8 h-8 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
                      <div className="absolute top-0 right-2 w-3 h-3 rounded-full bg-teal-300" />
                      <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-emerald-600" />
                    </div>
                    <div className="font-mono text-xs text-slate-300">
                      Kinetic Gravitational Attractor Simulator
                    </div>
                  </div>
                )}

                {/* 5. Procedural Glitch Synthesizer */}
                {activeExperiment?.id === 'exp-crt-glitch' && (
                  <div className="space-y-4">
                    <div
                      className={`p-8 rounded-2xl bg-[#020504] border transition-all text-center space-y-3 ${
                        glitchActive
                          ? 'border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.6)] translate-x-1'
                          : 'border-emerald-500/20'
                      }`}
                    >
                      <div className="font-display font-extrabold text-3xl text-emerald-300">
                        {glitchActive ? '▲ 0x7E DISPLACEMENT ▲' : 'CYBER SHADER MATRIX'}
                      </div>
                      <p className="font-mono text-xs text-slate-400">
                        Hardware rasterizer chromatic aberration trigger
                      </p>
                    </div>

                    <div className="text-center">
                      <button
                        onClick={triggerGlitch}
                        className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-display font-bold text-xs tracking-wider uppercase hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-950"
                      >
                        Synthesize Glitch Pulse
                      </button>
                    </div>
                  </div>
                )}

                {/* 6. Developer Telemetry Tool */}
                {activeExperiment?.id === 'exp-system-telemetry' && (
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                      <span className="text-[10px] text-slate-400">WEBGL ACCELERATION</span>
                      <div className="text-emerald-300 font-bold text-sm mt-1">AVAILABLE</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                      <span className="text-[10px] text-slate-400">DEVICE PIXEL RATIO</span>
                      <div className="text-emerald-300 font-bold text-sm mt-1">{typeof window !== 'undefined' ? window.devicePixelRatio : '2.0'}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                      <span className="text-[10px] text-slate-400">FPS REFRESH BUDGET</span>
                      <div className="text-emerald-300 font-bold text-sm mt-1">16.6ms (60 FPS)</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                      <span className="text-[10px] text-slate-400">COLOR SPACE</span>
                      <div className="text-emerald-300 font-bold text-sm mt-1">sRGB / ACES</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sandbox Footer Tech Tags */}
              <div className="pt-4 border-t border-emerald-500/15 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {activeExperiment?.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/20 text-[10px] font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-emerald-500/70">LAB SANDBOX ID: {activeExperiment?.id}</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
