import { motion } from "framer-motion";
import { content } from "../data/content";
import SoftLoveBackground from "./SoftLoveBackground";

export default function CoverLetter({ onHeartClick }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-pink-200 text-gray-800 overflow-hidden">
       <SoftLoveBackground />
      {/* confeti suave */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-20 left-0 right-0 h-80 blur-2xl bg-pink-300/40" />
      </div>

      <div className="relative w-[92%] max-w-xl">
        <div className="bg-pink-300 rounded-2xl shadow-2xl p-6">
          <div className="bg-pink-50 rounded-xl p-6 border border-pink-200">
            <p className="text-center text-lg md:text-xl font-semibold">
              {content.coverTitle}
            </p>
            <p className="text-center mt-2 text-sm md:text-base opacity-80">
              {content.coverSubtitle}
            </p>

            <div className="flex justify-center mt-6">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={onHeartClick}
                className="relative w-16 h-16 md:w-20 md:h-20"
                aria-label="Abrir sorpresa"
              >
                <div className="absolute inset-0 bg-pink-600 rotate-45 rounded-2xl shadow-lg" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                  ❤️
                </div>
              </motion.button>
            </div>

            <div className="flex justify-between mt-6 text-sm">
              <div>
                <span className="opacity-70">De:</span>{" "}
                <span className="font-semibold">{content.from}</span>
              </div>
              <div>
                <span className="opacity-70">Para:</span>{" "}
                <span className="font-semibold">{content.to}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-4 text-xs opacity-70">
          Tip: si estás en PC, prueba hacer click en cualquier parte 😉
        </p>
      </div>
    </section>
  );
}
