import { useEffect } from "react";

export default function HeartsBurst() {
  useEffect(() => {
    const onPointer = (e) => {
      const x = e.clientX ?? (e.touches?.[0]?.clientX || 0);
      const y = e.clientY ?? (e.touches?.[0]?.clientY || 0);

      for (let i = 0; i < 18; i++) spawnHeart(x, y);
    };

    window.addEventListener("click", onPointer);
    window.addEventListener("touchstart", onPointer, { passive: true });

    return () => {
      window.removeEventListener("click", onPointer);
      window.removeEventListener("touchstart", onPointer);
    };
  }, []);

  return null;
}

function spawnHeart(x, y) {
  const el = document.createElement("div");
  el.textContent = "💖";
  el.style.position = "fixed";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.transform = "translate(-50%, -50%)";
  el.style.pointerEvents = "none";
  el.style.zIndex = "9999";
  el.style.fontSize = `${12 + Math.random() * 18}px`;
  el.style.opacity = "1";
  document.body.appendChild(el);

  const angle = Math.random() * Math.PI * 2;
  const dist = 80 + Math.random() * 140;
  const dx = Math.cos(angle) * dist;
  const dy = Math.sin(angle) * dist;

  const duration = 650 + Math.random() * 550;
  const start = performance.now();

  const animate = (t) => {
    const p = Math.min(1, (t - start) / duration);
    const ease = 1 - Math.pow(1 - p, 3);

    el.style.left = `${x + dx * ease}px`;
    el.style.top = `${y + dy * ease - 40 * p}px`;
    el.style.opacity = `${1 - p}`;
    el.style.filter = `blur(${p * 0.6}px)`;

    if (p < 1) requestAnimationFrame(animate);
    else el.remove();
  };

  requestAnimationFrame(animate);
}
