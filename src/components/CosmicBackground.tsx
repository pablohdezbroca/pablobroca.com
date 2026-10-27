import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  layer: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

interface ConstellationNode {
  xRatio: number;
  yRatio: number;
  label?: string;
}

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / height - 0.5) * 2;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Initialize layered stars
    const starCount = Math.min(200, Math.floor((width * height) / 7500));
    const stars: Star[] = [];
    const starColors = [
      'rgba(248, 245, 255,', // Ivory white
      'rgba(225, 215, 250,', // Celestial lilac
      'rgba(245, 205, 215,', // Copper glow
      'rgba(215, 225, 245,', // Nebula ice
    ];

    for (let i = 0; i < starCount; i++) {
      const baseAlpha = 0.2 + Math.random() * 0.75;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() < 0.88 ? Math.random() * 1.4 + 0.4 : Math.random() * 2.3 + 1.2,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: 0.015 + Math.random() * 0.03,
        twinklePhase: Math.random() * Math.PI * 2,
        layer: 0.4 + Math.random() * 1.6,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Constellation points (representing the Systems Engineering constellation)
    const constellationNodes: ConstellationNode[] = [
      { xRatio: 0.15, yRatio: 0.22, label: 'SYS' },
      { xRatio: 0.22, yRatio: 0.16 },
      { xRatio: 0.30, yRatio: 0.24, label: 'NET' },
      { xRatio: 0.26, yRatio: 0.35, label: 'SEC' },
      { xRatio: 0.17, yRatio: 0.32, label: 'DEV' },
    ];

    // Subtle micro-meteors
    const meteors: Meteor[] = [];
    const spawnMeteor = () => {
      if (prefersReducedMotion) return;
      if (Math.random() < 0.45 && meteors.filter((m) => m.active).length < 2) {
        meteors.push({
          x: Math.random() * (width * 0.85) + width * 0.05,
          y: Math.random() * (height * 0.35),
          length: 50 + Math.random() * 70,
          speed: 6.5 + Math.random() * 5,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          alpha: 0.85,
          active: true,
        });
      }
    };

    const meteorInterval = setInterval(spawnMeteor, 5500);

    let orbitAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      if (!prefersReducedMotion) {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;
        orbitAngle += 0.0006;
      }

      const parallaxX = prefersReducedMotion ? 0 : mouseRef.current.x * 24;
      const parallaxY = prefersReducedMotion ? 0 : mouseRef.current.y * 24;

      // 1. Draw Stylized Distant Ringed Planet (Top right celestial body)
      const planetCenterX = width * 0.82 + (prefersReducedMotion ? 0 : mouseRef.current.x * 12);
      const planetCenterY = height * 0.18 + (prefersReducedMotion ? 0 : mouseRef.current.y * 12);
      const planetRadius = Math.min(width, height) * 0.045 + 18;

      ctx.save();
      // Planet back atmospheric halo
      const haloGrad = ctx.createRadialGradient(
        planetCenterX, planetCenterY, planetRadius * 0.6,
        planetCenterX, planetCenterY, planetRadius * 1.8
      );
      haloGrad.addColorStop(0, 'rgba(68, 38, 105, 0.25)');
      haloGrad.addColorStop(0.5, 'rgba(122, 46, 55, 0.12)');
      haloGrad.addColorStop(1, 'rgba(7, 7, 14, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(planetCenterX, planetCenterY, planetRadius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Planet Sphere
      const sphereGrad = ctx.createRadialGradient(
        planetCenterX - planetRadius * 0.4,
        planetCenterY - planetRadius * 0.4,
        planetRadius * 0.1,
        planetCenterX,
        planetCenterY,
        planetRadius
      );
      sphereGrad.addColorStop(0, '#31234a');
      sphereGrad.addColorStop(0.6, '#18122c');
      sphereGrad.addColorStop(1, '#090714');

      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(planetCenterX, planetCenterY, planetRadius, 0, Math.PI * 2);
      ctx.fill();

      // Planet Crescent Rim Light (Cinnabar/Rose edge)
      ctx.strokeStyle = 'rgba(162, 79, 97, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(planetCenterX, planetCenterY, planetRadius, -Math.PI * 0.7, Math.PI * 0.25);
      ctx.stroke();

      // Stylized Ring System
      ctx.save();
      ctx.translate(planetCenterX, planetCenterY);
      ctx.rotate(-Math.PI / 7);
      ctx.scale(1, 0.3);
      ctx.strokeStyle = 'rgba(240, 215, 230, 0.18)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(0, 0, planetRadius * 2.1, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(122, 46, 55, 0.14)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, planetRadius * 1.7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      ctx.restore();

      // 2. Draw Subtle Navigation Orbital Coordinates & Rings
      ctx.save();
      const centerX = width * 0.5 + parallaxX * 0.5;
      const centerY = height * 0.45 + parallaxY * 0.5;

      ctx.strokeStyle = 'rgba(68, 38, 105, 0.06)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 14]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(width, height) * 0.38, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(122, 46, 55, 0.05)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 20]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(width, height) * 0.58, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 3. Draw Deep Space Constellation (Left side)
      ctx.save();
      const constX = width * 0.18 + parallaxX * 0.8;
      const constY = height * 0.28 + parallaxY * 0.8;
      const nodes = [
        { x: constX - 45, y: constY - 35 },
        { x: constX + 25, y: constY - 55 },
        { x: constX + 65, y: constY - 10 },
        { x: constX + 30, y: constY + 45 },
        { x: constX - 35, y: constY + 25 },
      ];

      // Constellation lines
      ctx.strokeStyle = 'rgba(202, 161, 173, 0.18)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      for (let i = 1; i < nodes.length; i++) {
        ctx.lineTo(nodes[i].x, nodes[i].y);
      }
      ctx.closePath();
      ctx.stroke();

      // Secondary connector
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      ctx.lineTo(nodes[2].x, nodes[2].y);
      ctx.stroke();

      // Constellation stars
      for (const node of nodes) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(162, 79, 97, 0.4)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // 4. Render Starfield
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (!prefersReducedMotion) {
          star.twinklePhase += star.twinkleSpeed;
          star.alpha = star.baseAlpha + Math.sin(star.twinklePhase) * 0.3;
        }

        const currentAlpha = Math.max(0.12, Math.min(1, star.alpha));
        const px = (star.x + parallaxX * star.layer + width) % width;
        const py = (star.y + parallaxY * star.layer + height) % height;

        ctx.fillStyle = `${star.color} ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fill();

        // 4-point cross diffraction glint on prominent celestial stars
        if (star.size > 2.0 && currentAlpha > 0.65) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.45})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(px - 5, py);
          ctx.lineTo(px + 5, py);
          ctx.moveTo(px, py - 5);
          ctx.lineTo(px, py + 5);
          ctx.stroke();
        }
      }

      // 5. Render Micro-Meteors
      for (let i = 0; i < meteors.length; i++) {
        const meteor = meteors[i];
        if (!meteor.active) continue;

        meteor.x += Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;
        meteor.alpha -= 0.012;

        if (meteor.alpha <= 0) {
          meteor.active = false;
          continue;
        }

        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

        const grad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
        grad.addColorStop(0, 'rgba(162, 79, 97, 0)');
        grad.addColorStop(0.7, `rgba(224, 215, 245, ${meteor.alpha * 0.6})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${meteor.alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(meteor.x, meteor.y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearInterval(meteorInterval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      {/* Deep Space Nebulae Gradients */}
      <div className="absolute top-[-10%] right-[-5%] w-[650px] h-[650px] rounded-full bg-[#3b2361]/22 blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] left-[-15%] w-[700px] h-[700px] rounded-full bg-[#7a2e37]/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[550px] h-[550px] rounded-full bg-[#1e1338]/30 blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 cosmic-grid opacity-35 pointer-events-none" />
    </div>
  );
};
