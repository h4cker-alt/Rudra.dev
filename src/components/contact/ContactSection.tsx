import React, { useState } from 'react';
import { Mail, Send, Github, Linkedin, Check, Copy, Sparkles, MessageSquare, User, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { soundFx } from '../../utils/soundEffects';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    soundFx.playChirp();
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCopyEmail = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(PERSONAL_INFO.emailPlaceholder);
    setCopiedEmail(true);
    showNotification(`Copied email address: ${PERSONAL_INFO.emailPlaceholder}`);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      soundFx.playChirp(300, 0.2);
      return;
    }

    soundFx.playClick();
    setStatus('submitting');

    setTimeout(() => {
      setStatus('success');
      soundFx.playSuccess();

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#10b981', '#34d399', '#6ee7b7', '#ffffff'],
        });
      } catch {
        // Fallback
      }

      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-28 border-t border-emerald-500/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-xs font-mono text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>06 // INITIATE TRANSMISSION</span>
          </div>

          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-tight">
            HAVE AN IDEA? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-200">
              LET'S BUILD IT.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
            Have a project, experiment, or idea worth building? Let's turn it into something real.
          </p>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-[#08140f] border border-emerald-500/40 text-xs font-mono text-emerald-300 shadow-2xl">
            {notification}
          </div>
        )}

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Direct Links & Status (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Quick Email Card */}
            <div className="p-6 rounded-3xl glass-card border border-emerald-500/20 space-y-4">
              <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider block">
                DIRECT INBOX
              </span>

              <div className="p-4 rounded-2xl bg-[#040806] border border-emerald-500/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">Primary Email</span>
                    <span className="font-mono text-sm text-slate-100 font-medium">
                      {PERSONAL_INFO.emailPlaceholder}
                    </span>
                  </div>
                </div>

                <button
                  id="copy-email-button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="p-2 rounded-xl text-slate-400 hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400/90 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for collaborations & product engineering</span>
              </div>
            </div>

            {/* Social Channels (Using Placeholders strictly) */}
            <div className="p-6 rounded-3xl glass-card border border-emerald-500/20 space-y-4">
              <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider block">
                NETWORK & CHANNELS
              </span>

              <div className="space-y-2.5">
                <a
                  href={PERSONAL_INFO.githubPlaceholder}
                  onClick={(e) => {
                    e.preventDefault();
                    showNotification(`GitHub placeholder: ${PERSONAL_INFO.githubPlaceholder}`);
                  }}
                  className="p-3.5 rounded-xl bg-[#040806] border border-emerald-500/15 hover:border-emerald-500/40 hover:bg-emerald-950/30 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono text-slate-200">GitHub Profile</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedinPlaceholder}
                  onClick={(e) => {
                    e.preventDefault();
                    showNotification(`LinkedIn placeholder: ${PERSONAL_INFO.linkedinPlaceholder}`);
                  }}
                  className="p-3.5 rounded-xl bg-[#040806] border border-emerald-500/15 hover:border-emerald-500/40 hover:bg-emerald-950/30 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono text-slate-200">LinkedIn Profile</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl glass-card border border-emerald-500/25 shadow-2xl relative">
              
              {status === 'success' ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">Message Dispatched!</h3>
                  <p className="text-sm text-slate-300 max-w-sm mx-auto">
                    Thank you for reaching out. Your transmission has been queued and Rudra will respond promptly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs font-mono text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full px-4 py-3 rounded-xl bg-[#040806] border border-emerald-500/20 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40 font-mono transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#040806] border border-emerald-500/20 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40 font-mono transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                      Project Vision / Message
                    </label>
                    <div className="relative">
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about the product or experiment you want to build..."
                        className="w-full px-4 py-3 rounded-xl bg-[#040806] border border-emerald-500/20 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40 font-mono transition-all resize-none"
                      />
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="text-xs font-mono text-rose-400 bg-rose-950/20 border border-rose-500/20 p-2.5 rounded-lg">
                      Please complete all required fields before dispatching.
                    </div>
                  )}

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={status === 'submitting'}
                    onMouseEnter={() => soundFx.playHover()}
                    className="w-full py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-display font-bold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:bg-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60"
                  >
                    {status === 'submitting' ? (
                      <span className="font-mono text-xs">ENCRYPTING & TRANSMITTING...</span>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
