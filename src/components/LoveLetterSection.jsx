import { motion } from "framer-motion";
import { content } from "../data/content";

export default function LoveLetterSection() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-[#14000f] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10 shadow-2xl"
        >
          <h3 className="text-2xl md:text-4xl font-extrabold text-center">
            {content.letterTitle}
          </h3>

          <div className="mt-6 whitespace-pre-line leading-relaxed text-white/90 text-base md:text-lg">
            {content.letterBody}
          </div>

          <div className="mt-8 text-center text-white/70 text-sm">
            Att: {content.from} ❤️
          </div>
        </motion.div>
      </div>
    </section>
  );
}
