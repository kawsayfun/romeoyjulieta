import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { content } from "../data/content";

function HeartParametric() {
  const meshRef = useRef();

  // Geometría del corazón (paramétrica) -> forma clásica
  const geometry = useMemo(() => {
    const points = [];
    const steps = 240;

    // Curva 2D del corazón (fórmula famosa)
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      // normalizamos escala
      points.push(new THREE.Vector2(x / 18, y / 18));
    }

    const shape = new THREE.Shape(points);

    // Extrusión para darle volumen (bonito 3D)
    const extrude = new THREE.ExtrudeGeometry(shape, {
      depth: 0.45,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.12,
      bevelSegments: 10,
      curveSegments: 24,
    });

    extrude.center();
    return extrude;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // rotación suave + “latido”
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.35;
      meshRef.current.rotation.x = Math.sin(t * 0.6) * 0.08;
      const beat = 1 + Math.sin(t * 2.4) * 0.03;
      meshRef.current.scale.set(2.1 * beat, 2.1 * beat, 2.1 * beat);
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      {/* material brillante tipo “plástico/vidrio” */}
      <meshPhysicalMaterial
        color="#ff0033"
        metalness={0.15}
        roughness={0.12}
        clearcoat={1}
        clearcoatRoughness={0.08}
        reflectivity={0.9}
      />
    </mesh>
  );
}

function PhraseRing() {
  const phrases = content.basePhrases.slice(0, 8);
  const radius = 2.8;

  return (
    <group position={[0, -1.7, 0]}>
      {/* base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.25, 2.25, 0.18, 64]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.9} />
      </mesh>

      {/* texto como “anillo” (simple) */}
      {phrases.map((t, i) => {
        const angle = (i / phrases.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <Text3DLike
            key={t}
            position={[x, 0.28, z]}
            rotation={[0, -angle + Math.PI / 2, 0]}
            text={t}
          />
        );
      })}
    </group>
  );
}

/**
 * Texto ligero sin depender de fuentes externas (evita errores)
 * Simulamos texto con HTML overlay (más estable), pero en 3D posición fija.
 */
function Text3DLike({ text, position, rotation }) {
  // Para no meter @react-three/drei Text (a veces falla por fuentes),
  // lo hacemos con un sprite canvas.
  const sprite = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font = "36px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sp = new THREE.Sprite(material);
    sp.scale.set(1.8, 0.45, 1);
    return sp;
  }, [text]);

  // OJO: sprite no usa rotation 3D como mesh, pero para ring se ve bien.
  return <primitive object={sprite} position={position} rotation={rotation} />;
}

export default function Heart3DSection({ onSurprise }) {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-[#070712] to-black flex flex-col items-center justify-center px-4">
      <div className="text-center mt-10">
        <h2 className="text-3xl md:text-5xl font-bold">💗</h2>
        <p className="mt-2 opacity-80">Mira nuestro corazón en 3D.</p>
      </div>

      <div className="w-full max-w-5xl h-[520px] md:h-[650px] mt-6 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 1.2, 6.8], fov: 45 }}>
          {/* luces para brillo */}
          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 6, 3]} intensity={1.5} />
          <pointLight position={[-4, 0, 2]} intensity={1.2} color="#ff4d6d" />
          <spotLight position={[0, 8, 6]} angle={0.35} penumbra={1} intensity={1.4} />

          {/* entorno para reflejos (sin HDR externo) */}
          <Environment preset="city" />

          <HeartParametric />
          <PhraseRing />

          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        onClick={onSurprise}
        className="mt-8 mb-12 px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-500 transition shadow-lg"
      >
        {content.surpriseButtonText}
      </motion.button>
    </section>
  );
}
