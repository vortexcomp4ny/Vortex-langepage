import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import useScramble from '../hooks/useScramble';
import Typewriter from './Typewriter';

export default function Hero() {
  const cardRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef = useRef(null);
  const actionsRef = useRef(null);

  const scramble1Ref = useScramble('Transformamos verba de mídia em', { duration: 1400, delay: 400 });
  const scramble2Ref = useScramble('receita previsível.', { duration: 1100, delay: 700 });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        cardRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 },
        0,
      )
        .fromTo(
          line1Ref.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          0.4,
        )
        .fromTo(
          line2Ref.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          0.55,
        )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.75,
        )
        .fromTo(
          actionsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.9,
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="topo" className="hero">
      <div className="hero__card-outer">
        <div ref={cardRef} className="hero__card">
          <video className="hero__video" autoPlay muted loop playsInline>
            <source src="https://djqhpvmdlnnnspyarexn.supabase.co/storage/v1/object/public/Videos/Vortex.mp4" type="video/mp4" />
          </video>

          <div className="hero__overlay" aria-hidden="true" />

          <div className="hero__card-content">
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              Performance · Conversão · Escala
            </div>

            <h1 className="hero__title">
              <span ref={line1Ref} className="hero__title-line">
                <span ref={scramble1Ref}>Transformamos verba de mídia em</span>
              </span>
              <em ref={line2Ref} className="hero__title-line hero__title-em">
                <span ref={scramble2Ref}>receita previsível.</span>
              </em>
            </h1>

            <p ref={subRef} className="hero__sub">
              <Typewriter
                text={[
                  'Tráfego pago, landing pages e e-commerce integrados para crescer com margem e consistência.',
                  'Campanhas que vendem. Páginas que convertem. Resultados que escalam.',
                  'Da verba ao faturamento — estratégia, criativo e dados em uma só operação.',
                ]}
                speed={38}
                delay={1400}
                pause={2800}
              />
            </p>

            <div ref={actionsRef} className="hero__actions">
              <a href="#contato" className="btn btn--primary">
                Quero escalar agora
                <svg className="arrow" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#como-trabalhamos" className="btn btn--ghost-light">
                Ver como trabalhamos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
