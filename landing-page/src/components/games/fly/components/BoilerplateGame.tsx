import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function BoilerplateGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // State for start screen
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Refs for Three.js objects to persist across renders without causing re-renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const playerRef = useRef<THREE.Group | null>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    if (!isStarted) return;

    // --- 1. SETUP SCENE ---
    const width = containerRef.current?.clientWidth || window.innerWidth;
    const height = containerRef.current?.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    // Dark background or simple gradient
    scene.background = new THREE.Color(0x050510);
    scene.fog = new THREE.FogExp2(0x050510, 0.02);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 2, 8); // Static camera position
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }
    rendererRef.current = renderer;

    // --- 2. LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // --- 3. LOAD ASSETS (Player Model) ---
    const loader = new GLTFLoader();
    const playerGroup = new THREE.Group();
    scene.add(playerGroup);
    playerRef.current = playerGroup;

    // Grid helper for visualization
    const gridHelper = new THREE.GridHelper(50, 50, 0x444444, 0x222222);
    scene.add(gridHelper);

    setIsLoading(true);
    loader.load(
      "/games/stranger-craft/models/drone-3d.glb", // Using existing model as space_plane.glb is missing
      (gltf) => {
        const model = gltf.scene;
        // Adjust model scale/rotation for the drone
        model.scale.set(1.5, 1.5, 1.5); 
        model.rotation.y = Math.PI; 
        
        playerGroup.add(model);
        
        setIsLoading(false);
      },
      (err) => {
        console.error("Error loading model:", err);
        // Fallback info
        const box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 2),
            new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
        );
        playerGroup.add(box);
        setIsLoading(false);
      }
    );

    // --- 4. ANIMATION LOOP ---
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);

      // Idle Animation: Float gently
      if (playerRef.current) {
        const time = Date.now() * 0.001;
        playerRef.current.position.y = Math.sin(time) * 0.5; // Bob up and down
        playerRef.current.rotation.z = Math.sin(time * 0.5) * 0.05; // Slight roll
      }

      renderer.render(scene, camera);
    };
    animate();

    // --- 5. RESIZE HANDLER ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // --- CLEANUP ---
    return () => {
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (canvasRef.current && canvasRef.current.contains(rendererRef.current.domElement)) {
          canvasRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      
      // Dispose Geometries/Materials
      scene.traverse((o) => {
        if ((o as THREE.Mesh).geometry) (o as THREE.Mesh).geometry.dispose();
        if ((o as THREE.Mesh).material) {
            if (Array.isArray((o as THREE.Mesh).material)) {
                ((o as THREE.Mesh).material as any[]).forEach(m => m.dispose());
            } else {
                ((o as THREE.Mesh).material as any).dispose();
            }
        }
      });
    };
  }, [isStarted]); // Re-run if start state changes

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] bg-black font-sans overflow-hidden border-t border-gray-800"
    >
        {/* CANVAS */}
        <div ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

        {/* LOADING */}
        {isStarted && isLoading && (
            <div className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
                Loading Assets...
            </div>
        )}

        {/* TITLE OVERLAY (When NOT started) */}
        {!isStarted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-10 transition-opacity duration-500">
                <h2 className="text-3xl md:text-5xl text-white font-light tracking-widest mb-4">
                    BOILERPLATE
                </h2>
                <p className="text-gray-400 text-sm tracking-widest uppercase mb-8">
                    Static Game Engine View
                </p>
                <div className="flex gap-4">
                    <button 
                        onClick={() => setIsStarted(true)}
                        className="px-8 py-3 text-sm font-bold tracking-widest text-white border border-white/30 hover:bg-white hover:text-black transition-all uppercase"
                    >
                        Initialize Engine
                    </button>
                    <button 
                        onClick={() => alert("Quit Functionality: Would close application or navigate away.")}
                        className="px-8 py-3 text-sm font-bold tracking-widest text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all uppercase"
                    >
                        Quit
                    </button>
                </div>
            </div>
        )}
        
        {/* DEBUG INFO & CONTROLS (When started) */}
        {isStarted && (
             <>
                <div className="absolute top-4 right-4 z-20">
                    <button 
                        onClick={() => setIsStarted(false)}
                        className="px-4 py-2 text-xs font-bold tracking-widest text-red-400 border border-red-400/30 hover:bg-red-900/50 transition-all uppercase bg-black/50 backdrop-blur"
                    >
                        Stop Engine
                    </button>
                </div>
                <div className="absolute bottom-4 right-4 text-xs text-gray-500 font-mono pointer-events-none">
                    Boilerplate Mode | No Physics | Static Cam
                </div>
             </>
        )}
    </div>
  );
}
