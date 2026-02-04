import { content } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 px-4 py-10 text-center">
      <p className="text-lg md:text-xl font-semibold">{content.footerTop}</p>
      <p className="opacity-80 mt-1">{content.footerSub}</p>

      <a
        className="inline-block mt-6 text-sm md:text-base text-pink-400 hover:text-pink-300 transition underline"
        href={content.brandUrl}
        target="_blank"
        rel="noreferrer"
      >
        {content.brandText} — {content.brandUrl.replace("https://", "")}
      </a>
    </footer>
  );
}
