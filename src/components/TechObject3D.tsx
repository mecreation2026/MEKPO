import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const TechObject3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    containerRef.current.appendChild(renderer.domElement);

    // Group that will move and rotate based on scroll
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Inner Tech Core
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      emissive: 0x050505,
      roughness: 0.2,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // 2. Outer Cyber Wireframe Cage
    const cageGeometry = new THREE.IcosahedronGeometry(2.1, 1);
    const cageMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const cageMesh = new THREE.Mesh(cageGeometry, cageMaterial);
    mainGroup.add(cageMesh);

    // 3. Tech Node Vertices
    const vertices = cageGeometry.attributes.position.array;
    const nodeGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
    const nodesGroup = new THREE.Group();

    for (let i = 0; i < vertices.length; i += 3) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(vertices[i], vertices[i + 1], vertices[i + 2]);
      nodesGroup.add(node);
    }
    mainGroup.add(nodesGroup);

    // 4. Surrounding Particle Ring
    const particleCount = 160;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const radius = 3.2;

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 0.8;
      positions[i * 3] = Math.cos(angle) * (radius + spread);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      positions[i * 3 + 2] = Math.sin(angle) * (radius + spread);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0,
    });
    const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particlePoints);

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight2.position.set(-5, -4, -3);
    scene.add(dirLight2);

    // Scroll & Mouse interpolation targets
    let targetX = 2.4;
    let targetY = -0.5;
    let targetRotX = 0;
    let targetRotY = 0;
    let targetScale = 1;
    let targetOpacity = 0;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 80) {
        // Top of Hero -> Keep completely invisible so Raw Hero Video is fully shown
        targetOpacity = 0;
        targetScale = 0.5;
      } else {
        // Below Hero -> Smoothly fade in and follow scroll in background
        const progress = Math.min(Math.max((scrollY - 80) / (document.documentElement.scrollHeight - window.innerHeight), 0), 1);
        targetOpacity = Math.min((scrollY - 80) / 300, 1) * 0.9;

        if (progress < 0.3) {
          targetX = window.innerWidth < 768 ? 0 : -2.6;
          targetY = 0.2;
          targetScale = 1.1;
        } else if (progress < 0.7) {
          targetX = window.innerWidth < 768 ? 0 : 2.7;
          targetY = -0.3;
          targetScale = 1.2;
        } else {
          targetX = window.innerWidth < 768 ? 0 : 2.0;
          targetY = 0.1;
          targetScale = 1.0;
        }

        targetRotX = progress * Math.PI * 4;
        targetRotY = progress * Math.PI * 5;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      handleScroll();
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Constant ambient rotation + scroll-driven rotation
      coreMesh.rotation.y += 0.004;
      coreMesh.rotation.x += 0.002;
      cageMesh.rotation.y -= 0.003;
      cageMesh.rotation.z += 0.002;
      particlePoints.rotation.y += 0.0015;

      // Smooth lerp positions
      mainGroup.position.x += (targetX + mouseX - mainGroup.position.x) * 0.05;
      mainGroup.position.y += (targetY - mouseY - mainGroup.position.y) * 0.05;

      // Smooth scale lerp
      const currentScale = mainGroup.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.05;
      mainGroup.scale.set(newScale, newScale, newScale);

      // Smooth rotation lerp
      mainGroup.rotation.x += (targetRotX * 0.3 - mainGroup.rotation.x) * 0.04;
      mainGroup.rotation.y += (targetRotY * 0.3 - mainGroup.rotation.y) * 0.04;

      // Adjust opacities smoothly
      const currentOpacity = cageMaterial.opacity;
      const desiredCage = targetOpacity * 0.22;
      cageMaterial.opacity += (desiredCage - currentOpacity) * 0.05;
      nodeMaterial.opacity += (targetOpacity - nodeMaterial.opacity) * 0.05;
      particleMaterial.opacity += (targetOpacity * 0.45 - particleMaterial.opacity) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};