export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  features: string[];
  architecture: string[];
  previewType: 'ai-core' | 'ecommerce-mesh' | 'interactive-aura';
  liveUrlPlaceholder: string;
  githubPlaceholder: string;
  stats?: { label: string; value: string }[];
  accentColor: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: string;
    focus: string;
    connections: string[];
  }[];
}

export interface LabExperiment {
  id: string;
  title: string;
  type: 'AI' | 'UI' | 'SIMULATION' | 'TOOL' | 'PROTOTYPE';
  description: string;
  tech: string[];
  interactiveComponent: string;
  badge: string;
}

export interface JourneyMilestone {
  stage: 'START' | 'EXPLORE' | 'BUILD' | 'NOW';
  title: string;
  description: string;
  skillsFocus: string[];
  status: string;
  icon: string;
}

export interface DeveloperStat {
  label: string;
  metric: string;
  context: string;
  details: string;
}
