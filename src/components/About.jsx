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

      /* ── Entrada cinematográfica ── */
      gsap.from(queenRef.current, {
        scrollTrigger: { trigger: queenRef.current, start: 'top 82%' },
        opacity: 0,
        y: 60,
        rotationY: -25,
        rotationX: 12,
        scale: 0.88,
        duration: 1.4,
        ease: 'power3.out',
      });

      /* ── Levitação suave (Y) ── */
      gsap.to(queenRef.current, {
        y: -22,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      /* ── Oscilação 3D no eixo Y (câmera parallax) ── */
      gsap.to(queenRef.current, {
        rotationY: 14,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.4,
      });

      /* ── Oscilação 3D no eixo X (inclinação cinematográfica) ── */
      gsap.to(queenRef.current, {
        rotationX: -6,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.8,
      });

      /* ── Pulso de escala sutil ── */
      gsap.to(queenRef.current, {
        scale: 1.04,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
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
                src="/xadrez.png"
                alt="Peças de xadrez — símbolo de estratégia"
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
