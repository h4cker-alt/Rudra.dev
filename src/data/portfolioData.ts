import { Project, SkillCategory, LabExperiment, JourneyMilestone, DeveloperStat } from '../types';

export const PERSONAL_INFO = {
  name: 'Rudra',
  domain: 'RUDRA.DEV',
  role: 'Developer • AI Enthusiast • Web Builder • Creator',
  tagline: "I BUILD DIGITAL EXPERIENCES.",
  shortBio: "I'm Rudra, a passionate developer who enjoys turning ideas into functional, beautiful, and scalable digital products.",
  extendedBio: "Focusing on the convergence of modern web technologies, thoughtful human-computer interfaces, and intelligent automation systems. Dedicated to writing clean, maintainable code and engineering seamless user interactions.",
  location: 'Global / Remote',
  status: 'Available for building',
  emailPlaceholder: 'contact@rudra.dev',
  githubPlaceholder: 'https://github.com/rudra-dev',
  linkedinPlaceholder: 'https://linkedin.com/in/rudra-dev',
};

export const DEVELOPER_STATS: DeveloperStat[] = [
  {
    label: 'PROJECTS',
    metric: '12+',
    context: 'Interactive Web & AI Systems',
    details: 'Full-stack applications, interactive web tools, and modern user-centric interfaces.'
  },
  {
    label: 'TECHNOLOGIES',
    metric: '16+',
    context: 'Modern Tools & Frameworks',
    details: 'Frontend libraries, backend APIs, data stores, AI systems, and cloud environments.'
  },
  {
    label: 'EXPERIMENTS',
    metric: '25+',
    context: 'Lab Prototypes & Sandbox Builds',
    details: 'WebGL shaders, UI interaction concepts, neural workflows, and micro-utilities.'
  },
  {
    label: 'BUILDS',
    metric: '100%',
    context: 'Precision & Code Craftsmanship',
    details: 'Focus on performance, semantic structure, responsive motion, and clean architecture.'
  }
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'nexus-ai',
    title: 'Nexus AI',
    subtitle: 'Modular AI Assistant & Workflow Engine',
    description: 'An ambitious AI assistant project focused on modular architecture, automation, memory, reasoning, voice interaction, and intelligent workflows.',
    longDescription: 'Nexus AI explores the next frontier of intelligent developer and workflow assistance. Engineered with a decentralized tool-calling core, adaptive contextual memory stores, and dynamic multi-agent reasoning graphs.',
    tags: ['AI Systems', 'TypeScript', 'Voice Systems', 'Automation', 'APIs'],
    features: [
      'Modular reasoning pipeline with contextual short/long-term memory',
      'Real-time voice interaction interface and streaming responses',
      'Extensible tool-calling registry for task automation',
      'Subtle low-latency telemetry and execution graph visualizer'
    ],
    architecture: [
      'State-Machine Pipeline for Multi-Step Reasoning',
      'High-throughput WebSocket Voice & Audio Streaming',
      'Vector Embedding Index for Context Retrieval',
      'Adaptive Fallback Execution Layer'
    ],
    previewType: 'ai-core',
    liveUrlPlaceholder: 'https://nexus-ai.rudra.dev',
    githubPlaceholder: 'https://github.com/rudra-dev/nexus-ai',
    stats: [
      { label: 'Architecture', value: 'Modular' },
      { label: 'Latency', value: 'Real-time' },
      { label: 'Interface', value: 'Voice + Graph' }
    ],
    accentColor: '#10b981'
  },
  {
    id: 'recycling-commerce',
    title: 'Recycling Commerce',
    subtitle: 'Sustainable E-Commerce Platform',
    description: 'A modern recycling-focused e-commerce platform designed around sustainable commerce and a polished user experience.',
    longDescription: 'Crafted to connect eco-conscious consumers with circular-economy products. Featuring intuitive inventory tracking, carbon-offset checkout calculations, and high-performance fluid navigation.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Databases'],
    features: [
      'Circular-economy product lifecycle and impact visualizer',
      'Dynamic shopping cart with real-time carbon reduction calculation',
      'Streamlined modern checkout flow with glassmorphic cards',
      'Responsive design with tactile micro-interactions'
    ],
    architecture: [
      'Atomic Component Hierarchy for Fluid Cart & Catalog',
      'Optimistic State Updates for Instant Interaction',
      'Responsive Data Caching & Filter Engine',
      'Secure Token-based Transaction Simulation'
    ],
    previewType: 'ecommerce-mesh',
    liveUrlPlaceholder: 'https://recycling-commerce.rudra.dev',
    githubPlaceholder: 'https://github.com/rudra-dev/recycling-commerce',
    stats: [
      { label: 'Focus', value: 'Sustainability' },
      { label: 'Architecture', value: 'Full Stack' },
      { label: 'UX Speed', value: 'Instant' }
    ],
    accentColor: '#34d399'
  },
  {
    id: 'inner-aura',
    title: 'InnerAura',
    subtitle: 'Experimental Digital Experience & Analysis',
    description: 'An interactive experimental project exploring digital experiences, analysis, and user interaction.',
    longDescription: 'InnerAura blends generative digital art, procedural visual responses, and interaction analysis. It examines how human input patterns can influence dynamic aesthetic environments in real time.',
    tags: ['WebGL / 3D', 'JavaScript', 'HTML / CSS', 'Interactive Design'],
    features: [
      'Real-time procedural visual feedback driven by user cursor dynamics',
      'Interactive sentiment and frequency spectrum analyzer',
      'Ambient generative sound synthesis using Web Audio API',
      'Customizable chromatic theme matrices'
    ],
    architecture: [
      'Hardware-Accelerated WebGL Rendering Canvas',
      'Dynamic Input Vector Velocity Tracking',
      'Synthesizer Node Graph for Procedural Audio Feedback',
      'Lightweight Mathematical Particle Physics Loop'
    ],
    previewType: 'interactive-aura',
    liveUrlPlaceholder: 'https://inneraura.rudra.dev',
    githubPlaceholder: 'https://github.com/rudra-dev/inner-aura',
    stats: [
      { label: 'Rendering', value: 'Hardware WebGL' },
      { label: 'Input Mode', value: 'Multi-Sensor' },
      { label: 'Experience', value: 'Generative' }
    ],
    accentColor: '#059669'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'FRONTEND',
    iconName: 'Layout',
    description: 'Engineering responsive, accessible, and high-performance interfaces.',
    skills: [
      { name: 'React', level: 'Core', focus: 'Component architecture, hooks, state patterns', connections: ['TypeScript', 'Tailwind CSS', 'JavaScript'] },
      { name: 'TypeScript', level: 'Core', focus: 'Strict types, generics, interfaces, scalable codebases', connections: ['React', 'Node.js', 'APIs'] },
      { name: 'JavaScript', level: 'Core', focus: 'ESNext, async/await, DOM APIs, event loop', connections: ['HTML', 'CSS', 'React'] },
      { name: 'HTML', level: 'Core', focus: 'Semantic markup, accessibility, SEO, modern tags', connections: ['CSS', 'JavaScript'] },
      { name: 'CSS', level: 'Core', focus: 'Modern flex/grid, transforms, keyframes, fluid layouts', connections: ['Tailwind CSS', 'HTML'] },
      { name: 'Tailwind CSS', level: 'Core', focus: 'Utility systems, responsive styling, design tokens', connections: ['React', 'CSS'] }
    ]
  },
  {
    id: 'backend',
    name: 'BACKEND',
    iconName: 'Server',
    description: 'Building reliable server-side services and structured data pipelines.',
    skills: [
      { name: 'Node.js', level: 'Core', focus: 'Runtime services, event-driven servers, tooling', connections: ['APIs', 'Databases', 'TypeScript'] },
      { name: 'APIs', level: 'Core', focus: 'RESTful architectures, WebSocket streams, integrations', connections: ['Node.js', 'Python', 'React'] },
      { name: 'Databases', level: 'Core', focus: 'Schema modeling, relational & document stores, caching', connections: ['Node.js', 'APIs'] }
    ]
  },
  {
    id: 'ai-automation',
    name: 'AI / AUTOMATION',
    iconName: 'Cpu',
    description: 'Integrating machine intelligence, voice logic, and workflow automation.',
    skills: [
      { name: 'Python', level: 'Core', focus: 'Data processing, scripting, AI integration', connections: ['AI Systems', 'Automation'] },
      { name: 'AI Systems', level: 'Focus', focus: 'Prompt orchestration, agents, embedding pipelines, reasoning', connections: ['Python', 'Voice Systems', 'APIs'] },
      { name: 'Automation', level: 'Focus', focus: 'Workflow scripts, task schedulers, CI pipelines', connections: ['Python', 'Git', 'Node.js'] },
      { name: 'Voice Systems', level: 'Focus', focus: 'Speech synthesis, audio streaming, voice recognition interfaces', connections: ['AI Systems', 'APIs'] }
    ]
  },
  {
    id: 'tools',
    name: 'TOOLS',
    iconName: 'Terminal',
    description: 'Streamlining development, versioning, and developer environments.',
    skills: [
      { name: 'Git', level: 'Core', focus: 'Branching strategies, version tracking, collaboration', connections: ['GitHub', 'VS Code'] },
      { name: 'GitHub', level: 'Core', focus: 'Repository management, workflows, project tracking', connections: ['Git', 'GitHub Codespaces'] },
      { name: 'VS Code', level: 'Core', focus: 'Custom extensions, debugging configs, linting', connections: ['Git', 'TypeScript'] },
      { name: 'GitHub Codespaces', level: 'Core', focus: 'Cloud development environments, rapid bootstrapping', connections: ['GitHub', 'VS Code'] }
    ]
  }
];

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: 'exp-neural-particles',
    title: 'Neural Particle Lattice',
    type: 'SIMULATION',
    description: 'Interactive particle vector field simulating neural synaptic impulses and mouse gravity repulsion.',
    tech: ['HTML5 Canvas', 'Vector Physics', 'Math Algorithms'],
    interactiveComponent: 'NeuralCanvas',
    badge: 'INTERACTIVE'
  },
  {
    id: 'exp-matrix-stream',
    title: 'Cyberpunk Token Matrix',
    type: 'AI',
    description: 'Real-time tokenized reasoning stream simulator rendering raw contextual tensor flows.',
    tech: ['TypeScript', 'Stream Protocol', 'CSS Shaders'],
    interactiveComponent: 'MatrixStream',
    badge: 'LIVE STREAM'
  },
  {
    id: 'exp-reasoning-trace',
    title: 'AI Reasoning Step Visualizer',
    type: 'AI',
    description: 'Interactive multi-step thought decomposition simulator with confidence scores and branch exploration.',
    tech: ['Graph Theory', 'Agent State', 'React Flow'],
    interactiveComponent: 'ReasoningVisualizer',
    badge: 'ALGORITHM'
  },
  {
    id: 'exp-gravity-orbit',
    title: 'Orbital Force Sandbox',
    type: 'UI',
    description: 'Kinetic gravity well simulation where celestial nodes orbit and collide with custom velocity vectors.',
    tech: ['Kinematics', 'Canvas 2D', 'Collision Detection'],
    interactiveComponent: 'OrbitalSandbox',
    badge: 'PHYSICS'
  },
  {
    id: 'exp-crt-glitch',
    title: 'Procedural Glitch Synthesizer',
    type: 'PROTOTYPE',
    description: 'Real-time CRT scanline and chromatic displacement visualizer with customizable distortion matrices.',
    tech: ['WebGL Filters', 'Procedural Noise', 'Audio Trigger'],
    interactiveComponent: 'GlitchSynthesizer',
    badge: 'EXPERIMENTAL'
  },
  {
    id: 'exp-system-telemetry',
    title: 'Developer Core Telemetry',
    type: 'TOOL',
    description: 'Live client-side performance profiler monitoring rendering frames, memory bounds, and WebGL support.',
    tech: ['Performance API', 'WebGL Spec', 'Micro-benchmarks'],
    interactiveComponent: 'TelemetryTool',
    badge: 'DIAGNOSTIC'
  }
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    stage: 'START',
    title: 'Spark & Foundations',
    description: 'Started exploring programming and building small projects. Discovered a passion for bringing interactive logic to life with fundamental web technologies.',
    skillsFocus: ['HTML / CSS', 'JavaScript Basics', 'Algorithms', 'Logic'],
    status: 'COMPLETED',
    icon: 'Terminal'
  },
  {
    stage: 'EXPLORE',
    title: 'Web & Automation Horizons',
    description: 'Experimented with web development, automation, and interactive applications. Built responsive interfaces, script tools, and modern component setups.',
    skillsFocus: ['React Ecosystem', 'TypeScript', 'Python Scripts', 'Git & Workflows'],
    status: 'COMPLETED',
    icon: 'Compass'
  },
  {
    stage: 'BUILD',
    title: 'Full-Stack & Intelligent Systems',
    description: 'Started creating larger full-stack and AI-oriented projects. Engineered end-to-end architectures, REST/WebSocket APIs, and machine intelligence workflows.',
    skillsFocus: ['Full-Stack Architectures', 'AI Workflows', 'Database Design', 'Voice Systems'],
    status: 'COMPLETED',
    icon: 'Layers'
  },
  {
    stage: 'NOW',
    title: 'Next-Generation Digital Products',
    description: 'Building ambitious digital products and continuously experimenting with new technologies. Pushing the boundaries of futuristic UI, 3D web, and autonomous tools.',
    skillsFocus: ['Scalable Systems', '3D / WebGL', 'Autonomous Agents', 'Creative Tech'],
    status: 'IN PROGRESS',
    icon: 'Sparkles'
  }
];
