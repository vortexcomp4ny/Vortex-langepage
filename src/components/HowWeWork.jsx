import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const STEPS = [
  {
    title: 'Imersão',
    desc: 'Mergulhamos no seu negócio: histórico de campanhas, margem, funil atual e onde o dinheiro está vazando.',
    icon: '/waskee-timeline/imersao-magnifier.png',
  },
  {
    title: 'Diagnóstico',
    desc: 'Mapeamos os gargalos reais — criativos, páginas, segmentação ou oferta — com dados, não chutes.',
    icon: '/waskee-timeline/diagnostico-network.png',
  },
  {
    title: 'Estratégia',
    desc: 'Montamos o plano de 90 dias: canais, budget, testes prioritários e metas por etapa do funil.',
    icon: '/waskee-timeline/estrategia-roadmap.png',
  },
  {
    title: 'Execução',
    desc: 'Implementamos campanhas, landing pages e tracking com velocidade e precisão de time especializado.',
    icon: '/waskee-timeline/execucao-rocket-gear.png',
  },
  {
    title: 'Evolução',
    desc: 'Iteramos toda semana com base em dados reais. O que aprende em um canal alimenta os outros.',
    icon: '/waskee-timeline/evolucao-diamond-arrow.png',
  },
];

export default function HowWeWork() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.waskee-process__header > *, .waskee-process__step',
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="como-funciona" className="waskee-process">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Syne:wght@700;800&display=swap');

        .waskee-process {
          --waskee-bg: #0a0a0a;
          --waskee-purple: #8b5cf6;
          --waskee-purple-soft: #a78bfa;
          --waskee-title: #f0ede8;
          --waskee-muted: #7a7570;
          --waskee-line-y: 154px;
          background:
            radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.16), transparent 32%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0) 34%),
            var(--waskee-bg);
          border-block: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--waskee-title);
          overflow: hidden;
          padding: clamp(76px, 9vw, 122px) 0;
        }

        .waskee-process__inner {
          width: min(1120px, calc(100% - 40px));
          margin: 0 auto;
        }

        .waskee-process__header {
          display: grid;
          gap: 12px;
          justify-items: center;
          text-align: center;
        }

        .waskee-process__label {
          color: var(--waskee-purple);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          line-height: 1;
          text-transform: uppercase;
        }

        .waskee-process__title {
          color: var(--waskee-title);
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          line-height: 1.18;
          margin: 0;
        }

        .waskee-process__viewport {
          margin-top: clamp(42px, 6vw, 68px);
          overflow-x: auto;
          overflow-y: hidden;
          padding: 4px 2px 18px;
          scrollbar-color: rgba(139, 92, 246, 0.8) rgba(255, 255, 255, 0.06);
          scrollbar-width: thin;
        }

        .waskee-process__viewport::-webkit-scrollbar {
          height: 8px;
        }

        .waskee-process__viewport::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.06);
          border-radius: 999px;
        }

        .waskee-process__viewport::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, var(--waskee-purple), var(--waskee-purple-soft));
          border-radius: 999px;
        }

        .waskee-process__timeline {
          position: relative;
          display: grid;
          grid-template-columns: repeat(5, minmax(144px, 1fr));
          min-width: 860px;
          min-height: 312px;
        }

        .waskee-process__timeline::before {
          content: '';
          position: absolute;
          top: var(--waskee-line-y);
          left: 10%;
          right: 10%;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--waskee-purple), var(--waskee-purple-soft));
          box-shadow: 0 0 28px rgba(139, 92, 246, 0.28);
        }

        .waskee-process__step {
          position: relative;
          min-width: 0;
          padding: calc(var(--waskee-line-y) + 32px) 14px 0;
          text-align: center;
          transition: transform 0.28s ease;
        }

        .waskee-process__step:hover {
          transform: translateY(-6px);
        }

        .waskee-process__icon {
          position: absolute;
          top: 0;
          left: 50%;
          display: grid;
          place-items: center;
          width: 72px;
          height: 72px;
          border-radius: 18px;
          transform: translateX(-50%);
          filter: drop-shadow(0 0 22px rgba(139, 92, 246, 0.4));
          transition: filter 0.28s ease, transform 0.28s ease;
          isolation: isolate;
        }

        .waskee-process__step:hover .waskee-process__icon {
          filter:
            drop-shadow(0 0 28px rgba(139, 92, 246, 0.68))
            drop-shadow(0 0 54px rgba(139, 92, 246, 0.28));
          transform: translate(-50%, -2px) scale(1.04);
        }

        .waskee-process__icon-placeholder {
          position: absolute;
          inset: 7px;
          border-radius: 18px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.46), rgba(139, 92, 246, 0.08) 58%, transparent 72%);
          box-shadow:
            0 0 26px rgba(139, 92, 246, 0.44),
            0 0 62px rgba(139, 92, 246, 0.18);
          z-index: -1;
        }

        .waskee-process__icon img {
          width: 72px;
          height: 72px;
          object-fit: contain;
          object-position: center;
          pointer-events: none;
          user-select: none;
        }

        .waskee-process__marker {
          position: absolute;
          top: calc(var(--waskee-line-y) - 6px);
          left: 50%;
          width: 12px;
          height: 12px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: var(--waskee-purple);
          box-shadow:
            0 0 0 7px rgba(139, 92, 246, 0.09),
            0 0 28px rgba(139, 92, 246, 0.72);
          transform: translateX(-50%) rotate(45deg);
        }

        .waskee-process__content {
          display: grid;
          gap: 7px;
          justify-items: center;
        }

        .waskee-process__step-title {
          color: var(--waskee-title);
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 800;
          line-height: 1.25;
          margin: 0;
        }

        .waskee-process__desc {
          max-width: 168px;
          color: var(--waskee-muted);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 400;
          line-height: 1.46;
          margin: 0;
        }

        @media (max-width: 760px) {
          .waskee-process {
            --waskee-line-y: 138px;
            padding: 68px 0;
          }

          .waskee-process__inner {
            width: min(100% - 28px, 1120px);
          }

          .waskee-process__timeline {
            grid-template-columns: repeat(5, 148px);
            min-width: 740px;
            min-height: 294px;
          }

          .waskee-process__step {
            padding-inline: 10px;
          }

          .waskee-process__icon,
          .waskee-process__icon img {
            width: 64px;
            height: 64px;
          }

          .waskee-process__desc {
            max-width: 138px;
          }
        }
      `}</style>

      <div className="waskee-process__inner">
        <div className="waskee-process__header">
          <span className="waskee-process__label">COMO FUNCIONA</span>
          <h2 className="waskee-process__title">Do cadastro à venda — simples assim</h2>
        </div>

        <div className="waskee-process__viewport" aria-label="Processo da Waskee">
          <div className="waskee-process__timeline">
            {STEPS.map((step) => (
              <article
                className="waskee-process__step"
                key={step.title}
              >
                <div className="waskee-process__icon" aria-hidden="true">
                  <div className="waskee-process__icon-placeholder" />
                  <img src={step.icon} alt="" loading="lazy" />
                </div>
                <span className="waskee-process__marker" aria-hidden="true" />
                <div className="waskee-process__content">
                  <h3 className="waskee-process__step-title">{step.title}</h3>
                  <p className="waskee-process__desc">{step.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
