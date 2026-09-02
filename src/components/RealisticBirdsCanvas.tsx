import React, { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  color: string;
  type: 'stardust' | 'diamond' | 'plasma' | 'ember';
  rotation?: number;
  rotSpeed?: number;
}

interface TrailPoint {
  x: number;
  y: number;
  leftX: number;
  leftY: number;
  rightX: number;
  rightY: number;
  alpha: number;
}

interface DroneObject {
  id: number;
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  hoverTime: number;
  hoverAmp: number;
  hoverSpeed: number;
  ringRotation1: number;
  ringRotation2: number;
  bankAngle: number;
  heading: number; // 1 = right, -1 = left
  trail: TrailPoint[];
  colorTheme: 'cyan' | 'gold';
}

export const RealisticBirdsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isMounted = true;
    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Mouse Interaction
    let mouseX = width * 0.5;
    let mouseY = height * 0.35;
    let mouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const particles: Sparkle[] = [];

    // Ambient floating magic spores in room lighting
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.85,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.15 - Math.random() * 0.25,
        size: 0.8 + Math.random() * 2.2,
        alpha: 0.1 + Math.random() * 0.5,
        maxAlpha: 0.35 + Math.random() * 0.35,
        life: Math.random() * 250,
        maxLife: 200 + Math.random() * 200,
        color: Math.random() > 0.4 ? '255, 220, 160' : '180, 240, 255',
        type: 'ember',
      });
    }

    // --- 2 AUTONOMOUS REALISTIC AI CYBER DRONES (SMOOTH REALISTIC LEVITATION) ---
    const drones: DroneObject[] = [
      {
        id: 1,
        x: -90,
        y: height * 0.28,
        targetY: height * 0.28,
        vx: 2.5,
        vy: 0,
        size: 26, // Sleek, perfectly proportioned main AI core
        hoverTime: 0,
        hoverAmp: 22,
        hoverSpeed: 0.02,
        ringRotation1: 0,
        ringRotation2: Math.PI * 0.3,
        bankAngle: 0,
        heading: 1,
        trail: [],
        colorTheme: 'cyan',
      },
      {
        id: 2,
        x: width * 0.5,
        y: height * 0.4,
        targetY: height * 0.4,
        vx: 2.1,
        vy: 0,
        size: 18, // Companion scout drone
        hoverTime: Math.PI * 0.7,
        hoverAmp: 28,
        hoverSpeed: 0.024,
        ringRotation1: Math.PI * 0.5,
        ringRotation2: Math.PI * 0.8,
        bankAngle: 0,
        heading: 1,
        trail: [],
        colorTheme: 'gold',
      },
    ];

    // Spawn magical sparkles from drone plasma thrusters
    const spawnMagic = (drone: DroneObject, leftX: number, leftY: number, rightX: number, rightY: number) => {
      // Thruster 1
      if (Math.random() > 0.35) {
        particles.push({
          x: leftX + (Math.random() - 0.5) * 3,
          y: leftY + (Math.random() - 0.5) * 3,
          vx: -drone.heading * (0.8 + Math.random() * 1.5),
          vy: (Math.random() - 0.5) * 0.8,
          size: 1.5 + Math.random() * 2.8,
          alpha: 0.9,
          maxAlpha: 0.9,
          life: 0,
          maxLife: 45 + Math.random() * 35,
          color: drone.colorTheme === 'cyan' ? '160, 240, 255' : '255, 225, 140',
          type: Math.random() > 0.5 ? 'diamond' : 'stardust',
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.15,
        });
      }

      // Thruster 2
      if (Math.random() > 0.35) {
        particles.push({
          x: rightX + (Math.random() - 0.5) * 3,
          y: rightY + (Math.random() - 0.5) * 3,
          vx: -drone.heading * (0.8 + Math.random() * 1.5),
          vy: (Math.random() - 0.5) * 0.8,
          size: 1.5 + Math.random() * 2.8,
          alpha: 0.9,
          maxAlpha: 0.9,
          life: 0,
          maxLife: 45 + Math.random() * 35,
          color: '255, 235, 180',
          type: 'plasma',
        });
      }
    };

    // Draw 4-pointed magical diamond star
    const drawDiamond = (x: number, y: number, size: number, alpha: number, color: string, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);

      ctx.beginPath();
      ctx.moveTo(0, -size * 1.8);
      ctx.quadraticCurveTo(size * 0.2, -size * 0.2, size * 1.8, 0);
      ctx.quadraticCurveTo(size * 0.2, size * 0.2, 0, size * 1.8);
      ctx.quadraticCurveTo(-size * 0.2, size * 0.2, -size * 1.8, 0);
      ctx.quadraticCurveTo(-size * 0.2, -size * 0.2, 0, -size * 1.8);
      ctx.closePath();

      ctx.fillStyle = `rgba(${color}, ${alpha})`;
      ctx.shadowColor = `rgba(${color}, ${alpha * 0.75})`;
      ctx.shadowBlur = size * 2.5;
      ctx.fill();

      // Center bright core
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();

      ctx.restore();
    };

    // --- MAIN RENDER LOOP ---
    const render = () => {
      if (!isMounted) return;

      ctx.clearRect(0, 0, width, height);

      // 1. UPDATE AND DRAW AMBIENT MAGIC SPORES & PARTICLES
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;

        if (p.rotation !== undefined && p.rotSpeed !== undefined) {
          p.rotation += p.rotSpeed;
        }

        const progress = p.life / p.maxLife;
        p.alpha = Math.sin(progress * Math.PI) * p.maxAlpha;

        if (p.life >= p.maxLife) {
          if (p.type === 'ember') {
            p.x = Math.random() * width;
            p.y = height * 0.8 + Math.random() * 80;
            p.life = 0;
            p.maxLife = 200 + Math.random() * 200;
          } else {
            particles.splice(i, 1);
            i--;
            continue;
          }
        }

        if (p.type === 'diamond') {
          drawDiamond(p.x, p.y, p.size, p.alpha, p.color, p.rotation || 0);
        } else {
          ctx.beginPath();
          const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          radGrad.addColorStop(0, `rgba(${p.color}, ${p.alpha})`);
          radGrad.addColorStop(0.5, `rgba(${p.color}, ${p.alpha * 0.4})`);
          radGrad.addColorStop(1, 'rgba(0,0,0,0)');

          ctx.fillStyle = radGrad;
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. SIMULATE & DRAW BOTH AI DRONES
      for (let dIdx = 0; dIdx < drones.length; dIdx++) {
        const d = drones[dIdx];

        // Smooth levitation wave
        d.hoverTime += d.hoverSpeed;
        const hoverWave = Math.sin(d.hoverTime) * d.hoverAmp;

        if (mouseActive) {
          const dy = mouseY * 0.55 + height * 0.12 + (d.id === 1 ? -20 : 35) - d.y;
          d.targetY += dy * 0.008;
          const dx = mouseX - d.x;
          d.vx = Math.max(1.6, Math.min(3.4, (d.id === 1 ? 2.5 : 2.1) + Math.sign(dx) * 0.3));
        } else {
          d.targetY = height * (d.id === 1 ? 0.26 : 0.38) + hoverWave;
        }

        d.y += (d.targetY - d.y) * 0.025;
        d.x += d.vx;

        // Gyroscopic ring rotation
        d.ringRotation1 += 0.04;
        d.ringRotation2 -= 0.035;

        // Smooth banking angle based on vertical movement
        const dy = d.targetY - d.y;
        const targetBank = Math.max(-0.25, Math.min(0.25, dy * 0.004 * d.heading));
        d.bankAngle += (targetBank - d.bankAngle) * 0.06;

        // Wrap around screen
        if (d.heading === 1 && d.x > width + 120) {
          d.x = -120;
          d.y = height * (0.18 + Math.random() * 0.35);
          d.targetY = d.y;
        } else if (d.heading === -1 && d.x < -120) {
          d.x = width + 120;
          d.y = height * (0.18 + Math.random() * 0.35);
          d.targetY = d.y;
        }

        const r = d.size;

        // --- DRAW MAGICAL AURORA RIBBON TRAIL ---
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        for (let t = 0; t < d.trail.length; t++) {
          const pt = d.trail[t];
          pt.alpha -= 0.016;
          if (pt.alpha <= 0) {
            d.trail.splice(t, 1);
            t--;
            continue;
          }

          if (t > 0) {
            const prev = d.trail[t - 1];

            // Left thruster ribbon
            ctx.beginPath();
            ctx.moveTo(prev.leftX, prev.leftY);
            ctx.lineTo(pt.leftX, pt.leftY);
            ctx.strokeStyle = `rgba(160, 240, 255, ${pt.alpha * 0.4})`;
            ctx.lineWidth = 2.5 * pt.alpha;
            ctx.stroke();

            // Right thruster ribbon
            ctx.beginPath();
            ctx.moveTo(prev.rightX, prev.rightY);
            ctx.lineTo(pt.rightX, pt.rightY);
            ctx.strokeStyle = `rgba(255, 220, 140, ${pt.alpha * 0.4})`;
            ctx.lineWidth = 2.5 * pt.alpha;
            ctx.stroke();

            // Central ion wake
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(pt.x, pt.y);
            ctx.strokeStyle = `rgba(255, 245, 210, ${pt.alpha * 0.22})`;
            ctx.lineWidth = 5 * pt.alpha;
            ctx.stroke();
          }
        }
        ctx.restore();

        // --- RENDER HIGH-TECH METALLIC DRONE ---
        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.bankAngle);
        ctx.scale(d.heading, 1);

        // A. Ambient Glowing Aura
        const auraGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, r * 2.8);
        auraGrad.addColorStop(0, d.colorTheme === 'cyan' ? 'rgba(56, 189, 248, 0.22)' : 'rgba(251, 191, 36, 0.22)');
        auraGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.05)');
        auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(0, 0, r * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // B. Outer 3D Gyro Holographic Ring 1
        ctx.save();
        ctx.rotate(d.ringRotation1);
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 1.7, r * 0.55, 0, 0, Math.PI * 2);
        ctx.strokeStyle = d.colorTheme === 'cyan' ? 'rgba(56, 189, 248, 0.55)' : 'rgba(251, 191, 36, 0.55)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Node light on Ring 1
        ctx.beginPath();
        ctx.arc(r * 1.7, 0, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = d.colorTheme === 'cyan' ? '#38bdf8' : '#fbbf24';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();

        // C. Inner 3D Gyro Ring 2
        ctx.save();
        ctx.rotate(d.ringRotation2);
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 1.35, r * 0.45, Math.PI * 0.25, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1.0;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(-r * 1.35, 0, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();

        // D. Dual Rear Ion Thrusters
        const thrusterOffsetX = -r * 0.85;
        const thrusterOffsetY1 = -r * 0.5;
        const thrusterOffsetY2 = r * 0.5;

        // Thruster 1 nozzle & plasma flame
        ctx.beginPath();
        ctx.arc(thrusterOffsetX, thrusterOffsetY1, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#1e293b';
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(thrusterOffsetX - 6, thrusterOffsetY1, 7, 2.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
        ctx.fill();

        // Thruster 2 nozzle & plasma flame
        ctx.beginPath();
        ctx.arc(thrusterOffsetX, thrusterOffsetY2, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#1e293b';
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(thrusterOffsetX - 6, thrusterOffsetY2, 7, 2.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(251, 191, 36, 0.8)';
        ctx.fill();

        // E. Main Spherical Metallic Cyber Core
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        const sphereGrad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, 1, 0, 0, r);
        sphereGrad.addColorStop(0, '#64748b');
        sphereGrad.addColorStop(0.4, '#1e293b');
        sphereGrad.addColorStop(0.85, '#0f172a');
        sphereGrad.addColorStop(1, '#020617');
        ctx.fillStyle = sphereGrad;
        ctx.fill();

        // Specular chrome rim highlight
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // F. Optical AI Sensor Iris (Glowing Front Eye)
        ctx.beginPath();
        ctx.arc(r * 0.38, 0, r * 0.42, 0, Math.PI * 2);
        ctx.fillStyle = '#090d16';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(r * 0.42, 0, r * 0.28, 0, Math.PI * 2);
        ctx.fillStyle = d.colorTheme === 'cyan' ? '#0ea5e9' : '#f59e0b';
        ctx.shadowColor = d.colorTheme === 'cyan' ? '#38bdf8' : '#fbbf24';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Lens specular spark
        ctx.beginPath();
        ctx.arc(r * 0.48, -r * 0.08, r * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // G. Lateral Aerodynamic Nano-Fins
        ctx.beginPath();
        ctx.moveTo(r * 0.2, -r * 0.9);
        ctx.lineTo(-r * 0.5, -r * 1.35);
        ctx.lineTo(-r * 0.7, -r * 0.8);
        ctx.closePath();
        ctx.fillStyle = '#334155';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(r * 0.2, r * 0.9);
        ctx.lineTo(-r * 0.5, r * 1.35);
        ctx.lineTo(-r * 0.7, r * 0.8);
        ctx.closePath();
        ctx.fillStyle = '#334155';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // --- WORLD COORDINATES FOR MAGIC TRAIL ---
        const cos = Math.cos(d.bankAngle);
        const sin = Math.sin(d.bankAngle);

        const worldLeftX = d.x + (d.heading * (thrusterOffsetX - 6) * cos - thrusterOffsetY1 * sin);
        const worldLeftY = d.y + (d.heading * (thrusterOffsetX - 6) * sin + thrusterOffsetY1 * cos);

        const worldRightX = d.x + (d.heading * (thrusterOffsetX - 6) * cos - thrusterOffsetY2 * sin);
        const worldRightY = d.y + (d.heading * (thrusterOffsetX - 6) * sin + thrusterOffsetY2 * cos);

        d.trail.unshift({
          x: d.x - d.heading * r * cos,
          y: d.y - d.heading * r * sin,
          leftX: worldLeftX,
          leftY: worldLeftY,
          rightX: worldRightX,
          rightY: worldRightY,
          alpha: 0.85,
        });

        if (d.trail.length > 32) {
          d.trail.pop();
        }

        spawnMagic(d, worldLeftX, worldLeftY, worldRightX, worldRightY);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[3] overflow-hidden select-none"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};
