import { useRef, useEffect, useCallback } from 'react';

interface HexagonBackgroundProps {
  className?: string;
}

const HexagonBackground = ({ className = '' }: HexagonBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const isDarkRef = useRef(document.documentElement.classList.contains('dark'));

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio, 2);
    
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, rect.width, rect.height);

    const size = 13;
    const gap = 3;
    const w = Math.sqrt(3) * (size + gap);
    const h = 1.5 * (size + gap);
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const radius = 80;
    const isDark = isDarkRef.current;

    const cols = Math.ceil(rect.width / w) + 2;
    const rows = Math.ceil(rect.height / h) + 2;

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const x = col * w + (row % 2 === 0 ? 0 : w / 2);
        const y = row * h;
        const dx = x - mx;
        const dy = y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let opacity = 0.06;
        let scale = 1;
        let glowAmount = 0;

        if (dist < radius) {
          const t = 1 - dist / radius;
          opacity = 0.06 + t * 0.44;
          scale = 1 + t * 0.15;
          glowAmount = t;
        }

        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        // Draw hexagon
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          const hx = size * Math.cos(angle);
          const hy = size * Math.sin(angle);
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();

        if (glowAmount > 0.3) {
          ctx.shadowColor = isDark ? 'rgba(108,99,225,0.4)' : 'rgba(108,99,225,0.3)';
          ctx.shadowBlur = glowAmount * 15;
        }

        const strokeColor = isDark 
          ? `rgba(108,99,225,${opacity})` 
          : `rgba(200,190,240,${opacity * 1.5})`;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 0.7;
        ctx.stroke();

        if (glowAmount > 0.5) {
          ctx.shadowColor = 'rgba(250,216,232,0.3)';
          ctx.shadowBlur = glowAmount * 8;
          ctx.strokeStyle = `rgba(250,216,232,${glowAmount * 0.2})`;
          ctx.stroke();
        }

        ctx.restore();
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      if (t) mouseRef.current = { x: t.clientX - rect.left, y: t.clientY - rect.top };
    };

    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    parent.addEventListener('mousemove', handleMove);
    parent.addEventListener('touchmove', handleTouch, { passive: true });
    parent.addEventListener('mouseleave', handleLeave);

    const observer = new MutationObserver(() => {
      isDarkRef.current = document.documentElement.classList.contains('dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const loop = () => {
      draw();
      animFrameRef.current = requestAnimationFrame(loop);
    };
    loop();

    const ro = new ResizeObserver(() => draw());
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      parent.removeEventListener('mousemove', handleMove);
      parent.removeEventListener('touchmove', handleTouch);
      parent.removeEventListener('mouseleave', handleLeave);
      observer.disconnect();
      ro.disconnect();
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

export default HexagonBackground;
