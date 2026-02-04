import { useRef } from "react";

import CoverLetter from "./components/CoverLetter.jsx";
import Heart3DSection from "./components/Heart3DSection.jsx";
import SurpriseCarousel3D from "./components/SurpriseCarousel3D.jsx";
import SpaceJourney from "./components/SpaceJourney.jsx";
import LoveLetterSection from "./components/LoveLetterSection.jsx";
import Footer from "./components/Footer.jsx";
import HeartsBurst from "./components/HeartsBurst.jsx";




export default function App() {
  const heartRef = useRef(null);
  const surpriseRef = useRef(null);
  const universeRef = useRef(null);
  const letterRef = useRef(null);

  const scrollTo = (ref) => ref?.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-black text-white">
      <HeartsBurst />

      <CoverLetter onHeartClick={() => scrollTo(heartRef)} />

      <div ref={heartRef}>
        <Heart3DSection onSurprise={() => scrollTo(surpriseRef)} />
      </div>

      <div ref={surpriseRef}>
        <SurpriseCarousel3D onNext={() => scrollTo(universeRef)} />
      </div>

      <div ref={universeRef}>
        <SpaceJourney onLetter={() => scrollTo(letterRef)} />
      </div>

      <div ref={letterRef}>
        <LoveLetterSection />
      </div>

      <Footer />
    </div>
  );
}
