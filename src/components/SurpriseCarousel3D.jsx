import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { motion } from "framer-motion";

// ✅ IMPORTA las fotos (Vite las empaqueta para Netlify)
import img1 from "../assets/photos/1.jpg";
import img2 from "../assets/photos/2.jpg";
import img3 from "../assets/photos/3.jpg";
import img4 from "../assets/photos/4.jpg";
import img5 from "../assets/photos/5.jpg";
// Si tienes 6.jpg, descomenta:
 import img6 from "../assets/photos/6.jpg";

function ImageRing({ images }) {
  const group = useRef();

  // ✅ carga segura con drei (maneja mejor Vite/Netlify)
  const textures = useTexture(images);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.35;
  });

  const radius = 3.2;

  return (
    <group ref={group} position={[0, 0, 0]}>
      {textures.map((tex, i) => {
        const angle = (i / textures.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        // mejora calidad de textura
        tex.anisotropy = 8;

        return (
          <mesh
            key={i}
            position={[x, 0, z]}
            rotation={[0, -angle + Math.PI, 0]}
          >
            <planeGeometry args={[2.0, 2.8]} />
            <meshStandardMaterial map={tex} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial />
    </mesh>
  );
}

export default function SurpriseCarousel3D({ onNext }) {
  // ✅ Usa SOLO las que existan. Si no tienes 6.jpg, NO la pongas.
  const imgs = [img1, img2, img3, img4, img5 /*, img6 */];

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-[#120018] flex flex-col items-center justify-center px-4">
      <h2 className="text-3xl md:text-5xl font-extrabold text-center">
        Nuestros Recuerdos ✨
      </h2>
      <p className="mt-3 text-center opacity-80 max-w-xl">
        Un carrusel de momentos que guardo en el corazón.
      </p>

      <div className="w-full max-w-5xl h-[520px] md:h-[640px] mt-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 0.8, 8], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 5, 2]} intensity={1.2} />
          <pointLight position={[-3, -2, -2]} intensity={0.8} />

          <Suspense fallback={<LoadingFallback />}>
            <ImageRing images={imgs} />
          </Suspense>

          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        onClick={onNext}
        className="mt-8 mb-12 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition"
      >
        Ver nuestro universo 🌌
      </motion.button>
    </section>
  );
}
