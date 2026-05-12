import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlowCard from './GlowCard.jsx';

const TAGS = [
  'Sites', 'Landing Pages', 'CRO',
  'Copywriting', 'Performance',
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
              Criamos uma estrutura que vende.
            </h2>
            <p className="section-desc">
              A Vortex é uma agência especializada em elevar o posicionamento de
              marcas, seja com um site/landing page profissional ou com gestão
              de tráfego 100% alinhada. Tudo em um lugar só. Você não precisa
              mais terceirizar vários profissionais de marketing.
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
                src="/xadrez.webp"
                alt="Peças de xadrez, símbolo de estratégia"
                className="about__queen"
                loading="lazy"
                decoding="async"
                draggable="false"
              />
              {/* Sombra no chão */}
              <div className="about__queen-shadow" aria-hidden="true" />
            </div>

            {/* Card de manifesto — com glow seguindo o cursor */}
            <GlowCard glowColor="purple" className="about__card about__card--glow">
              <span className="about__quote-mark" aria-hidden="true">"</span>
              <blockquote className="about__quote">
                Há quem crie identidade. A gente cria demanda.
              </blockquote>
              <div className="about__author">
                <span className="about__author-line" />
                Vortex
              </div>
            </GlowCard>

          </div>
        </div>
      </div>
    </section>
  );
}
