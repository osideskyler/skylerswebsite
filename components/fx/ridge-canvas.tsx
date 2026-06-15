"use client";

import { useEffect, useRef } from "react";

type RidgeCanvasProps = {
  className?: string;
};

const LINES = 16;
const STEP = 12;

/**
 * Flowing mountain-ridge lines rendered on canvas. Lines drift with layered
 * sine noise and bow away from the cursor. Front ridges occlude the ones
 * behind for depth. Renders a single static frame under reduced motion.
 */
export function RidgeCanvas({ className }: RidgeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      const time = t * 0.001;

      for (let i = 0; i < LINES; i++) {
        const depth = i / (LINES - 1);
        const baseY = height * 0.4 + depth * height * 0.58;
        const points: Array<[number, number]> = [];

        for (let x = -STEP; x <= width + STEP; x += STEP) {
          let y =
            baseY +
            Math.sin(x * 0.0032 + time * 0.5 + i * 0.65) * 18 * (0.4 + depth) +
            Math.sin(x * 0.0085 - time * 0.32 + i * 1.4) * 8 +
            Math.sin(x * 0.019 + time * 0.75 + i * 2.2) * 3;

          const dx = x - mouse.x;
          const dy = baseY - mouse.y;
          const dist2 = dx * dx + dy * dy;
          y -= 52 * Math.exp(-dist2 / (2 * 120 * 120)) * (0.35 + 0.65 * depth);

          points.push([x, y]);
        }

        // Fill below the ridge so front lines occlude the ones behind.
        ctx.beginPath();
        points.forEach(([x, y], idx) =>
          idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y),
        );
        ctx.lineTo(width + STEP, height + 40);
        ctx.lineTo(-STEP, height + 40);
        ctx.closePath();
        ctx.fillStyle = "rgba(5, 10, 16, 0.5)";
        ctx.fill();

        ctx.beginPath();
        points.forEach(([x, y], idx) =>
          idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y),
        );
        const alpha = 0.05 + depth * 0.22;
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, `rgba(148, 213, 174, ${alpha})`);
        grad.addColorStop(0.55, `rgba(120, 186, 230, ${alpha * 0.9})`);
        grad.addColorStop(1, `rgba(148, 213, 174, ${alpha * 0.65})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const loop = (t: number) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = event.clientX - rect.left;
      mouse.ty = event.clientY - rect.top;
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    resizeObserver.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    if (reduceMotion) {
      draw(0);
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
