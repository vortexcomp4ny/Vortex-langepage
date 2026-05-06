import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from './TiltCard';

const STEPS = [
  {
    num: '01',
    title: 'Imersão',
    desc: 'Mergulhamos no seu negócio: histórico de campanhas, margem, funil atual e onde o dinheiro está vazando.',
  },
  {
    num: '02',
    title: 'Diagnóstico',
    desc: 'Mapeamos os gargalos reais — criativos, páginas, segmentação ou oferta — com dados, não chutes.',
  },
  {
    num: '03',
    title: 'Estratégia',
    desc: 'Montamos o plano de 90 dias: canais, budget, testes prioritários e metas por etapa do funil.',
  },
  {
    num: '04',
    title: 'Execução',
    desc: 'Implementamos campanhas, landing pages e tracking com velocidade e precisão de time especializado.',
  },
  {
    num: '05',
    title: 'Evolução',
    desc: 'Iteramos toda semana com base em dados reais. O que aprende em um canal alimenta os outros.',
  },
];

export default function HowWeWork() {
  const stepsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        stepsRef.current.filter(Boolean),
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.09,
          scrollTrigger: { trigger: stepsRef.current[0], start: 'top 85%' },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="como-trabalhamos" className="section">
      <div className="container">
        <div className="how__header">
          <span className="eyebrow">Como trabalhamos</span>
          <h2 className="section-title">
            Um método construído para gerar resultado desde a primeira semana.
          </h2>
          <p className="section-desc">
            Cada etapa elimina desperdício e cria uma operação de crescimento
            que funciona sem depender de sorte.
          </p>
        </div>

        <div className="how__steps tilt-scene">
          {STEPS.map(({ num, title, desc }, i) => (
            <div
              key={num}
              ref={(el) => (stepsRef.current[i] = el)}
            >
              <TiltCard className="how-step" tiltOptions={{ max: 16, scale: 1.03 }}>
                <span className="how-step__num" aria-hidden="true">{num}</span>
                <h3 className="how-step__title">{title}</h3>
                <p className="how-step__desc">{desc}</p>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
