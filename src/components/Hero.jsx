import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ButtonCta from './ButtonCta.jsx';

export default function Hero() {
  const cardRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef = useRef(null);
  const actionsRef = useRef(null);


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
          <video
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="https://djqhpvmdlnnnspyarexn.supabase.co/storage/v1/object/public/Videos/Vortex.mp4" type="video/mp4" />
          </video>

          <div className="hero__overlay" aria-hidden="true" />

          <div className="hero__card-content">
            <div className="hero__badge">
              <img
                src="/logo-vortex-3d.webp"
                alt="Vortex"
                className="hero__badge-logo"
                draggable="false"
              />
            </div>

            <h1 className="hero__title">
              <span ref={line1Ref} className="hero__title-line">
                Fortalecemos sua presença digital.
              </span>
              <em ref={line2Ref} className="hero__title-line hero__title-em">
                Se posicione além dos seus concorrentes.
              </em>
            </h1>

            <p ref={subRef} className="hero__sub">
              Sites e landing pages de alto padrão. Te entregamos a
              estrutura que os grandes usam.
            </p>

            <div ref={actionsRef} className="hero__actions">
              <ButtonCta href="#contato">
                Pedir uma proposta
                <svg className="arrow" width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ButtonCta>
              <ButtonCta href="#como-funciona" className="btn-cta--ghost">
                Ver como trabalhamos
              </ButtonCta>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
