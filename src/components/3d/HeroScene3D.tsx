import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundFx } from '../../utils/soundEffects';
import { Eye, RotateCw, Layers, Sparkles, Cpu, Activity } from 'lucide-react';

export type CoreMode = 'QUANTUM_CORE' | 'TESSERACT' | 'NEURAL_NODES' | 'ORBITAL_SPHERE';

interface HeroScene3DProps {
  className?: string;
}

export const HeroScene3D: React.FC<HeroScene3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<CoreMode>('QUANTUM_CORE');
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(60);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  // References to THREE objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x064e3b, 1.8);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0x10b981, 4.5, 20);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const secondaryLight = new THREE.PointLight(0x34d399, 3.0, 20);
    secondaryLight.position.set(-5, -3, 3);
    scene.add(secondaryLight);

    const rimLight = new THREE.PointLight(0x059669, 2.0, 15);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Master Group
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);
    meshGroupRef.current = meshGroup;

    // Ambient Particle Constellation
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      particleScales[i] = Math.random() * 0.06 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    const particleMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mouseRef.current.targetX = x * 0.8;
        mouseRef.current.targetY = y * 0.8;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length) return;
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = lastTime;

    const animate = (currentTime: number) => {
      frameIdRef.current = requestAnimationFrame(animate);

      // FPS tracking
      frameCount++;
      if (currentTime - lastFpsUpdate >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = currentTime;
      }

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const time = currentTime * 0.001;

      if (meshGroupRef.current) {
        meshGroupRef.current.rotation.y = time * 0.35 + mouseRef.current.x * 0.8;
        meshGroupRef.current.rotation.x = time * 0.2 + mouseRef.current.y * 0.6;
        meshGroupRef.current.position.y = Math.sin(time * 1.5) * 0.12;

        // Custom object animations inside group
        meshGroupRef.current.children.forEach((child, index) => {
          if (child.name === 'ring') {
            child.rotation.z = time * 0.6 * (index % 2 === 0 ? 1 : -1);
            child.rotation.x = Math.sin(time + index) * 0.4;
          } else if (child.name === 'innerCore') {
            child.rotation.y = -time * 0.8;
            child.rotation.z = time * 0.5;
            const scalePulse = 1 + Math.sin(time * 3) * 0.05;
            child.scale.set(scalePulse, scalePulse, scalePulse);
          } else if (child.name === 'orbitNode') {
            const angle = time * 1.2 + Number(child.userData.offset || 0);
            const r = child.userData.dist || 2.4;
            child.position.x = Math.cos(angle) * r;
            child.position.z = Math.sin(angle) * r;
            child.position.y = Math.sin(angle * 2) * 0.5;
          }
        });
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y = -time * 0.08 + mouseRef.current.x * 0.2;
        particlesRef.current.rotation.x = mouseRef.current.y * 0.2;
      }

      // Dynamic light movements
      mainLight.position.x = Math.sin(time * 1.2) * 4 + mouseRef.current.x * 2;
      mainLight.position.y = Math.cos(time * 0.8) * 4 + mouseRef.current.y * 2;

      renderer.render(scene, camera);
    };

    frameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Re-build 3D Meshes when activeMode or isWireframe changes
  useEffect(() => {
    const group = meshGroupRef.current;
    if (!group) return;

    // Clear previous children
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
      if ((obj as THREE.Mesh).material) {
        const mat = (obj as THREE.Mesh).material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else (mat as THREE.Material).dispose();
      }
    }

    if (activeMode === 'QUANTUM_CORE') {
      // 1. Outer Faceted Holographic Icosahedron
      const outerGeo = new THREE.IcosahedronGeometry(1.9, 1);
      const outerMat = new THREE.MeshStandardMaterial({
        color: 0x064e3b,
        emissive: 0x047857,
        emissiveIntensity: 0.45,
        roughness: 0.2,
        metalness: 0.85,
        wireframe: isWireframe,
        transparent: true,
        opacity: isWireframe ? 0.9 : 0.65,
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      outerMesh.name = 'outerMesh';
      group.add(outerMesh);

      // Wireframe overlay for structural aesthetic
      const wireframeGeo = new THREE.WireframeGeometry(outerGeo);
      const wireframeMat = new THREE.LineBasicMaterial({
        color: 0x34d399,
        transparent: true,
        opacity: 0.4,
      });
      const wireframeLines = new THREE.LineSegments(wireframeGeo, wireframeMat);
      group.add(wireframeLines);

      // 2. Glowing Inner Power Core (Octahedron)
      const innerGeo = new THREE.OctahedronGeometry(0.95, 0);
      const innerMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x10b981,
        emissiveIntensity: 1.2,
        roughness: 0.1,
        metalness: 0.9,
        wireframe: false,
      });
      const innerCore = new THREE.Mesh(innerGeo, innerMat);
      innerCore.name = 'innerCore';
      group.add(innerCore);

      // 3. Orbiting Quantum Rings
      for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.TorusGeometry(2.35 + i * 0.35, 0.02, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({
          color: i === 0 ? 0x10b981 : i === 1 ? 0x34d399 : 0x059669,
          transparent: true,
          opacity: 0.65,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.name = 'ring';
        ring.rotation.x = (Math.PI / 3) * i;
        ring.rotation.y = (Math.PI / 4) * i;
        group.add(ring);
      }

      // 4. Orbiting satellite nodes
      for (let i = 0; i < 4; i++) {
        const nodeGeo = new THREE.SphereGeometry(0.09, 16, 16);
        const nodeMat = new THREE.MeshStandardMaterial({
          color: 0x6ee7b7,
          emissive: 0x34d399,
          emissiveIntensity: 1.5,
        });
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.name = 'orbitNode';
        node.userData = { offset: (i * Math.PI) / 2, dist: 2.7 + (i % 2) * 0.4 };
        group.add(node);
      }
    } else if (activeMode === 'TESSERACT') {
      // Hypercube / Tesseract representation
      const outerBoxGeo = new THREE.BoxGeometry(2.4, 2.4, 2.4);
      const outerBoxMat = new THREE.MeshStandardMaterial({
        color: 0x064e3b,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });
      const outerBox = new THREE.Mesh(outerBoxGeo, outerBoxMat);
      group.add(outerBox);

      const innerBoxGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
      const innerBoxMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x059669,
        emissiveIntensity: 0.9,
        wireframe: isWireframe,
      });
      const innerBox = new THREE.Mesh(innerBoxGeo, innerBoxMat);
      innerBox.name = 'innerCore';
      group.add(innerBox);

      // Connecting corner lines
      const vertices = [
        [-1.2, -1.2, -1.2], [-0.6, -0.6, -0.6],
        [1.2, -1.2, -1.2], [0.6, -0.6, -0.6],
        [1.2, 1.2, -1.2], [0.6, 0.6, -0.6],
        [-1.2, 1.2, -1.2], [-0.6, 0.6, -0.6],
        [-1.2, -1.2, 1.2], [-0.6, -0.6, 0.6],
        [1.2, -1.2, 1.2], [0.6, -0.6, 0.6],
        [1.2, 1.2, 1.2], [0.6, 0.6, 0.6],
        [-1.2, 1.2, 1.2], [-0.6, 0.6, 0.6],
      ];
      const linePositions: number[] = [];
      for (let i = 0; i < vertices.length; i += 2) {
        linePositions.push(...vertices[i], ...vertices[i + 1]);
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      const lineMat = new THREE.LineBasicMaterial({ color: 0x34d399, opacity: 0.6, transparent: true });
      group.add(new THREE.LineSegments(lineGeo, lineMat));

    } else if (activeMode === 'NEURAL_NODES') {
      // Neural mesh constellation
      const nodeCount = 18;
      const nodePositions: THREE.Vector3[] = [];
      const nodeGroup = new THREE.Group();

      for (let i = 0; i < nodeCount; i++) {
        const pos = new THREE.Vector3(
          (Math.random() - 0.5) * 3.8,
          (Math.random() - 0.5) * 3.8,
          (Math.random() - 0.5) * 3.8
        );
        nodePositions.push(pos);

        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 16, 16),
          new THREE.MeshStandardMaterial({
            color: 0x10b981,
            emissive: 0x34d399,
            emissiveIntensity: 1.2,
          })
        );
        sphere.position.copy(pos);
        nodeGroup.add(sphere);
      }

      // Connect nearby nodes
      const linePoints: number[] = [];
      for (let i = 0; i < nodePositions.length; i++) {
        for (let j = i + 1; j < nodePositions.length; j++) {
          if (nodePositions[i].distanceTo(nodePositions[j]) < 2.3) {
            linePoints.push(
              nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
              nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
            );
          }
        }
      }

      const netLineGeo = new THREE.BufferGeometry();
      netLineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
      const netLineMat = new THREE.LineBasicMaterial({
        color: 0x059669,
        transparent: true,
        opacity: 0.55,
      });
      nodeGroup.add(new THREE.LineSegments(netLineGeo, netLineMat));
      group.add(nodeGroup);

    } else if (activeMode === 'ORBITAL_SPHERE') {
      // Futuristic Geodesic Sphere with nested Gimbal rings
      const sphereGeo = new THREE.DodecahedronGeometry(1.6, 2);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0x047857,
        roughness: 0.3,
        metalness: 0.9,
        wireframe: isWireframe,
        transparent: true,
        opacity: 0.75,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      group.add(sphere);

      const wireGeo = new THREE.WireframeGeometry(sphereGeo);
      const wireMat = new THREE.LineBasicMaterial({ color: 0x34d399, opacity: 0.4, transparent: true });
      group.add(new THREE.LineSegments(wireGeo, wireMat));

      const ringGeo = new THREE.TorusGeometry(2.4, 0.035, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const ring1 = new THREE.Mesh(ringGeo, ringMat);
      ring1.name = 'ring';
      group.add(ring1);

      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.025, 16, 100), new THREE.MeshBasicMaterial({ color: 0x34d399 }));
      ring2.name = 'ring';
      ring2.rotation.y = Math.PI / 2;
      group.add(ring2);
    }
  }, [activeMode, isWireframe]);

  const handleModeChange = (mode: CoreMode) => {
    soundFx.playClick();
    setActiveMode(mode);
  };

  const toggleWireframe = () => {
    soundFx.playClick();
    setIsWireframe((prev) => !prev);
  };

  return (
    <div
      id="hero-3d-container"
      className={`relative w-full h-full min-h-[480px] lg:min-h-[560px] flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
    >
      {/* 3D WebGL Canvas Viewport */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Interactive Controls HUD */}
      <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 z-20 flex flex-col gap-2">
        {/* Core Mode Selectors */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#060a08]/85 backdrop-blur-md border border-emerald-500/20 shadow-lg">
          <button
            id="mode-quantum"
            onClick={() => handleModeChange('QUANTUM_CORE')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              activeMode === 'QUANTUM_CORE'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quantum Core</span>
            <span className="sm:hidden">Core</span>
          </button>

          <button
            id="mode-tesseract"
            onClick={() => handleModeChange('TESSERACT')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              activeMode === 'TESSERACT'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tesseract</span>
            <span className="sm:hidden">Matrix</span>
          </button>

          <button
            id="mode-neural"
            onClick={() => handleModeChange('NEURAL_NODES')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              activeMode === 'NEURAL_NODES'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Neural Nodes</span>
            <span className="sm:hidden">Nodes</span>
          </button>

          <button
            id="mode-orbital"
            onClick={() => handleModeChange('ORBITAL_SPHERE')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              activeMode === 'ORBITAL_SPHERE'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Orbital</span>
            <span className="sm:hidden">Sphere</span>
          </button>

          {/* Wireframe toggle */}
          <button
            id="toggle-wireframe-btn"
            onClick={toggleWireframe}
            aria-label="Toggle Wireframe"
            className={`p-1.5 rounded-lg text-xs transition-all ${
              isWireframe
                ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
            title="Toggle Wireframe"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Telemetry Status Bar */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#040806]/70 backdrop-blur-sm border border-emerald-500/10 text-[11px] font-mono text-emerald-400/80">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>INTERACTIVE 3D</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">FPS: {fps}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>{isInteracting ? 'PARALLAX TRACKING' : 'IDLE ROTATION'}</span>
          </div>
        </div>
      </div>

      {/* Decorative Corner Reticles */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-emerald-500/30 pointer-events-none" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-emerald-500/30 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-emerald-500/30 pointer-events-none hidden md:block" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-emerald-500/30 pointer-events-none hidden md:block" />
    </div>
  );
};
