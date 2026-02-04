import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { content } from "../data/content";

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function SpaceJourney({ onLetter }) {
  const canvasRef = useRef(null);

  const cards = useMemo(() => {
    const photos = [
      "/src/assets/photos/1.jpg",
      "/src/assets/photos/2.jpg",
      "/src/assets/photos/3.jpg",
      "/src/assets/photos/4.jpg",
      "/src/assets/photos/5.jpg",
    ];
    const phrases = [
      "Eres mi sueño 🌙",
      "Mi lugar seguro 🫶",
      "Te amo infinito ♾️",
      "Contigo, siempre ✨",
      "Gracias por tanto ❤️",
      "Eres mi universo 🌌",
    ];

    // 18 elementos mezclados
    const items = [];
    for (let i = 0; i < 18; i++) {
      const type = i % 2 === 0 ? "photo" : "text";
      items.push({
        type,
        src: photos[i % photos.length],
        text: phrases[i % phrases.length],
        x: rand(0.1, 0.9),
        y: rand(0.1, 0.9),
        z: rand(0.0, 1.0),
        speed: rand(0.002, 0.006),
      });
    }
    return items;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w, h;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: rand(0.2, 1.2),
      v: rand(0.0004, 0.0012),
    }));

    const images = {};
    const loadImg = (src) =>
      new Promise((res) => {
        const img = new Image();
        img.onload = () => res(img);
        img.src = src;
      });

    let stop = false;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const draw = () => {
      if (stop) return;

      // fondo
      ctx.fillStyle = "#04040a";
      ctx.fillRect(0, 0, w, h);

      // estrellas
      ctx.fillStyle = "white";
      stars.forEach((s) => {
        s.y += s.v;
        if (s.y > 1) s.y = 0;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // cards acercándose
      cards.forEach((c) => {
        c.z += c.speed;
        if (c.z > 1.1) {
          c.z = 0;
          c.x = rand(0.1, 0.9);
          c.y = rand(0.1, 0.9);
        }

        // escala en función de z
        const scale = 0.2 + c.z * 1.2;
        const px = c.x * w;
        const py = c.y * h;

        if (c.type === "photo") {
          const img = images[c.src];
          if (img) {
            const iw = 140 * scale;
            const ih = 200 * scale;
            const x = px - iw / 2;
            const y = py - ih / 2;

            ctx.save();
            ctx.globalAlpha = Math.min(1, c.z);
            ctx.fillStyle = "rgba(255,255,255,0.08)";
            ctx.strokeStyle = "rgba(255,255,255,0.18)";
            ctx.lineWidth = 2;
            roundRect(ctx, x - 10, y - 10, iw + 20, ih + 20, 16);
            ctx.fill();
            ctx.stroke();
            ctx.drawImage(img, x, y, iw, ih);
            ctx.restore();
          }
        } else {
          ctx.save();
          ctx.globalAlpha = Math.min(1, c.z);
          ctx.font = `${Math.floor(18 * scale)}px system-ui`;
          ctx.fillStyle = "rgba(255,255,255,0.92)";
          ctx.textAlign = "center";
          ctx.fillText(c.text, px, py);
          ctx.restore();
        }
      });

      requestAnimationFrame(draw);
    };

    const init = async () => {
      resize();

      // precarga fotos
      const uniquePhotos = [...new Set(cards.filter((c) => c.type === "photo").map((c) => c.src))];
      const loaded = await Promise.all(uniquePhotos.map(loadImg));
      uniquePhotos.forEach((src, i) => (images[src] = loaded[i]));

      draw();
    };

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    init();

    return () => {
      stop = true;
      window.removeEventListener("resize", onResize);
    };
  }, [cards]);

  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-end pb-14 px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center drop-shadow">
          {content.universeTitle}
        </h2>
        <p className="mt-3 text-center opacity-85 max-w-2xl">
          Sigue bajando… estás viajando por nuestros recuerdos.
        </p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          onClick={onLetter}
          className="mt-8 px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-500 transition shadow-lg"
        >
          {content.letterButtonText}
        </motion.button>
      </div>
    </section>
  );
}

function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
