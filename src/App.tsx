import React, { useState } from 'react';
import { CanvasBackground } from './components/3d/CanvasBackground';
import { Navbar } from './components/navigation/Navbar';
import { CommandPalette } from './components/navigation/CommandPalette';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { LabSection } from './components/lab/LabSection';
import { JourneySection } from './components/journey/JourneySection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/footer/Footer';
import { soundFx } from './utils/soundEffects';

export default function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMute = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#040606] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden font-sans">
      {/* Background Interactive Ambient Canvas & Cyber Grid */}
      <CanvasBackground />
      <div className="fixed inset-0 bg-cyber-grid pointer-events-none opacity-25 z-0" />
      <div className="fixed inset-0 bg-noise pointer-events-none z-0" />

      {/* Main Sticky Navigation */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Command Palette Keyboard Shortcut Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Page Layout */}
      <main className="relative z-10">
        {/* Hero Section with Interactive 3D Core */}
        <HeroSection
          onExploreWork={() => scrollToSection('projects')}
          onConnect={() => scrollToSection('contact')}
        />

        {/* About Section */}
        <AboutSection />

        {/* Featured Projects Section */}
        <ProjectsSection />

        {/* Skills & Technology Matrix */}
        <SkillsSection />

        {/* Rudra's Lab Section */}
        <LabSection />

        {/* Developer Journey */}
        <JourneySection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
