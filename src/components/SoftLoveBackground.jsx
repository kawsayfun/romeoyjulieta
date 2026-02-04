import { useEffect, useRef } from "react";

export default function SoftLoveBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = 0, h = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const HEARTS = 18;
    const FLOWERS = 14;

    const items = [];

    const rand = (min, max) => Math.random() * (max - min) + min;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const makeHeart = () => ({
      kind: "heart",
      x: rand(0, w),
      y: rand(0, h),
      s: rand(14, 34),
      vx: rand(-0.12, 0.12),
      vy: rand(-0.49, -0.27),
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.003, 0.003),
     a: rand(0.12, 0.22), // opaco/suave
      hue: rand(330, 360), // rosado
    });

    const makeFlower = () => ({
      kind: "flower",
      x: rand(0, w),
      y: rand(0, h),
      s: rand(18, 42),
      vx: rand(-0.08, 0.08),
      vy: rand(-0.14, -0.04),
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.002, 0.002),
      a: rand(0.10, 0.20),
      hue: rand(300, 350),
      petals: Math.floor(rand(5, 8)),
    });

    const seed = () => {
      items.length = 0;
      for (let i = 0; i < HEARTS; i++) items.push(makeHeart());
      for (let i = 0; i < FLOWERS; i++) items.push(makeFlower());
    };

    const drawHeart = (x, y, size, rot, alpha, hue) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;

      // relleno suave
      ctx.fillStyle = `hsla(${hue}, 85%, 60%, 1)`;
      ctx.shadowColor = `hsla(${hue}, 85%, 60%, 0.25)`;
      ctx.shadowBlur = 14;

      const s = size / 18;
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.moveTo(0, 6);
      ctx.bezierCurveTo(0, -2, -12, -2, -12, 6);
      ctx.bezierCurveTo(-12, 14, -4, 18, 0, 22);
      ctx.bezierCurveTo(4, 18, 12, 14, 12, 6);
      ctx.bezierCurveTo(12, -2, 0, -2, 0, 6);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const drawFlower = (x, y, size, rot, alpha, hue, petals) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;

      const r = size / 2;

      // pétalos
      for (let i = 0; i < petals; i++) {
        const a = (i / petals) * Math.PI * 2;
        ctx.save();
        ctx.rotate(a);
        ctx.fillStyle = `hsla(${hue}, 80%, 68%, 1)`;
        ctx.shadowColor = `hsla(${hue}, 80%, 68%, 0.18)`;
        ctx.shadowBlur = 14;

        ctx.beginPath();
        ctx.ellipse(0, -r * 0.55, r * 0.35, r * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // centro
      ctx.fillStyle = `hsla(45, 90%, 60%, 1)`;
      ctx.shadowColor = "rgba(255, 200, 80, 0.18)";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const tick = () => {
      // fondo suave (no totalmente blanco)
      ctx.clearRect(0, 0, w, h);

      // un gradiente ligero para que se sienta "universo suave"
      const g = ctx.createRadialGradient(w * 0.5, h * 0.35, 50, w * 0.5, h * 0.5, Math.max(w, h));
      g.addColorStop(0, "rgba(255, 210, 230, 0.35)");
      g.addColorStop(1, "rgba(255, 170, 210, 0.12)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // dibuja items
      for (const it of items) {
        it.x += it.vx;
        it.y += it.vy;
        it.rot += it.vr;

        // wrap arriba -> abajo
        if (it.y < -60) it.y = h + 60;
        if (it.x < -60) it.x = w + 60;
        if (it.x > w + 60) it.x = -60;

        if (it.kind === "heart") {
          drawHeart(it.x, it.y, it.s, it.rot, it.a, it.hue);
        } else {
          drawFlower(it.x, it.y, it.s, it.rot, it.a, it.hue, it.petals);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    seed();
    tick();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* capa extra para hacerlo más “opaco” */}
      <div className="absolute inset-0 bg-white/10" />
    </div>
  );
}
