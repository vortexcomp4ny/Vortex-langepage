import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CursorCustom from './components/CursorCustom.jsx';
import Header from './components/Header.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import { useButtonSound } from './hooks/useButtonSound.js';

gsap.registerPlugin(ScrollTrigger);
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import HowWeWork from './components/HowWeWork.jsx';
import Pricing from './components/Pricing.jsx';
import Team from './components/Team.jsx';
import Contact from './components/Contact.jsx';
import { Footer } from './components/Footer.jsx';
import SectionDivider from './components/SectionDivider.jsx';
import MarqueeBand from './components/MarqueeBand.jsx';

export default function App() {
  useButtonSound();

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('main > section').forEach((section) => {
        gsap.fromTo(section,
          { filter: 'blur(8px)' },
          {
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <ScrollProgress />
      <CursorCustom />
      <Header />
      <main>
        <Hero />
        {/* Hero (black) → About (ink) — marquee de texto rolando */}
        <MarqueeBand />
        <About />
        {/* About (ink) → Services (black) */}
        <SectionDivider variant="diagonal" from="ink" to="black" />
        <Services />
        {/* Services (black) → HowWeWork (black + halo roxo no topo) */}
        <SectionDivider variant="wave" from="black" to="black" />
        <HowWeWork />
        {/* HowWeWork (black) → Pricing (ink) */}
        <SectionDivider variant="diagonal" from="black" to="ink" />
        <Pricing />
        {/* Pricing (ink) → Team (ink) */}
        <SectionDivider variant="wave" from="ink" to="ink" />
        <Team />
        {/* Team (ink) → Contact (black) */}
        <SectionDivider variant="diagonal" from="ink" to="black" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
