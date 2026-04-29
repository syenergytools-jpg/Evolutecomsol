"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type SparklesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleColor?: string;
  particleDensity?: number;
  particleSize?: { min: number; max: number };
  speed?: number;
};

type Particle = {
  x: number;
  y: number;
  size: number;
  vy: number;
  vx: number;
  twinklePhase: number;
  twinkleSpeed: number;
  baseAlpha: number;
};

/**
 * Lightweight canvas sparkles. Avoids the heavy tsparticles dependency.
 * Renders softly twinkling pixels — good for hero/CTA backdrops.
 */
export const SparklesCore = ({
  className,
  background = "transparent",
  particleColor = "#FFFFFF",
  particleDensity = 80,
  particleSize = { min: 0.4, max: 1.4 },
  speed = 0.4,
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      setSize({ w, h });

      const count = Math.round((w * h) / 9000) * (particleDensity / 80);
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size:
          particleSize.min +
          Math.random() * (particleSize.max - particleSize.min),
        vy: (Math.random() - 0.5) * speed,
        vx: (Math.random() - 0.5) * speed * 0.4,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.005 + Math.random() * 0.012,
        baseAlpha: 0.3 + Math.random() * 0.7,
      }));
    };
    resize();

    const onResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    };
    window.addEventListener("resize", onResize);

    const tick = () => {
      ctx.clearRect(0, 0, size.w || canvas.width, size.h || canvas.height);
      ctx.fillStyle = particleColor;
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.twinklePhase += p.twinkleSpeed;
        if (p.x < 0) p.x = (size.w || canvas.width / dpr);
        if (p.x > (size.w || canvas.width / dpr)) p.x = 0;
        if (p.y < 0) p.y = (size.h || canvas.height / dpr);
        if (p.y > (size.h || canvas.height / dpr)) p.y = 0;
        const alpha = p.baseAlpha * (0.4 + 0.6 * (Math.sin(p.twinklePhase) * 0.5 + 0.5));
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", onResize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [particleColor, particleDensity, particleSize.max, particleSize.min, size.h, size.w, speed]);

  return (
    <div className={cn("absolute inset-0", className)} style={{ background }}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
