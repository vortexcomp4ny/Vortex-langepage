import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TAGS = [
  'Meta Ads', 'Google Ads', 'TikTok Ads',
  'CRO', 'Copywriting', 'A/B Tests',
  'Shopify', 'Tracking', 'LTV',
];

export default function About() {
  const leftRef  = useRef(null);
  const rightRef = useRef(null);
  const queenRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Slide-in dos lados ── */
      gsap.from(leftRef.current, {
        scrollTrigger: { trigger: leftRef.current, start: 'top 78%' },
        opacity: 0, x: -40, duration: 0.9, ease: 'power3.out',
      });
      gsap.from(rightRef.current, {
        scrollTrigger: { trigger: rightRef.current, start: 'top 78%' },
        opacity: 0, x: 40, duration: 0.9, ease: 'power3.out', delay: 0.15,
      });

      /* ── Rainha: entrada ── */
      gsap.from(queenRef.current, {
        scrollTrigger: { trigger: queenRef.current, start: 'top 82%' },
        opacity: 0,
        y: 40,
        rotationY: -60,
        duration: 1.2,
        ease: 'power3.out',
      });

      /* ── Rotação 3D contínua (Y) ── */
      gsap.to(queenRef.current, {
        rotationY: 360,
        duration: 10,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      });

      /* ── Float sutil (Y) ── */
      gsap.to(queenRef.current, {
        y: -18,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" className="about section">
      <div className="container">
        <div className="about__grid">

          {/* Coluna esquerda — texto */}
          <div ref={leftRef}>
            <span className="eyebrow">Sobre a Vortex</span>
            <h2 className="section-title">
              Jogamos xadrez enquanto outros jogam damas.
            </h2>
            <p className="section-desc">
              Somos uma equipe obsessiva por resultado. Cada decisão parte de
              dados reais — campanhas, páginas, ofertas e criativos que se
              comunicam entre si para gerar crescimento sustentável.
            </p>
            <div className="about__tags">
              {TAGS.map((tag) => (
                <span key={tag} className="about__tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Coluna direita — rainha 3D + card */}
          <div ref={rightRef} className="about__right">

            {/* Rainha flutuante */}
            <div className="about__queen-wrap">
              <img
                ref={queenRef}
                src="/a5e0e28b-10ae-4d72-83d5-eb40ff2cb3a7.png"
                alt="Rainha de xadrez — símbolo de estratégia"
                className="about__queen"
                draggable="false"
              />
              {/* Sombra no chão */}
              <div className="about__queen-shadow" aria-hidden="true" />
            </div>

            {/* Card de citação */}
            <div className="about__card">
              <span className="about__quote-mark" aria-hidden="true">"</span>
              <blockquote className="about__quote">
                A diferença entre crescer e apenas gastar está em como cada
                peça do funil conversa com a outra.
              </blockquote>
              <div className="about__author">
                <span className="about__author-line" />
                Time Vortex — Estratégia de Performance
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
