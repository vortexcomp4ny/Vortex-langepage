import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const STEPS = [
  {
    title: 'Imersão',
    desc: 'Mergulhamos no seu negócio: histórico de campanhas, margem, funil atual e onde o dinheiro está vazando.',
    icon: '/imersao.png',
    tilt: 'rotateY(-14deg) rotateX(8deg)',
  },
  {
    title: 'Diagnóstico',
    desc: 'Mapeamos os gargalos reais: criativos, páginas, segmentação ou oferta, com dados, não chutes.',
    icon: '/search.png',
    tilt: 'rotateY(12deg) rotateX(-6deg)',
  },
  {
    title: 'Estratégia',
    desc: 'Montamos o plano de 90 dias: canais, budget, testes prioritários e metas por etapa do funil.',
    icon: '/peça.png',
    tilt: 'rotateY(-10deg) rotateX(10deg)',
  },
  {
    title: 'Execução',
    desc: 'Implementamos campanhas, landing pages e tracking com velocidade e precisão de time especializado.',
    icon: '/Target.png',
    tilt: 'rotateY(14deg) rotateX(-8deg)',
  },
  {
    title: 'Evolução',
    desc: 'Iteramos toda semana com base em dados reais. O que aprende em um canal alimenta os outros.',
    icon: '/evoliçao.png',
    tilt: 'rotateY(-12deg) rotateX(6deg)',
  },
];

export default function HowWeWork() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.waskee-process__header > *, .waskee-process__step',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.76,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mobile scroll-highlight: mark the step most centered in the viewport
  useEffect(() => {
    const isMobile = () => window.innerWidth <= 760;
    if (!isMobile()) return;

    const steps = sectionRef.current?.querySelectorAll('.waskee-process__step');
    if (!steps?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('wp-step--active');
          } else {
            entry.target.classList.remove('wp-step--active');
          }
        });
      },
      { threshold: 0.55 },
    );

    steps.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="como-funciona" className="waskee-process">
      <style>{`
        .waskee-process {
          --wp-bg: #050508;
          --wp-purple: #7c3aed;
          --wp-purple-soft: #a78bfa;
          --wp-title: #f0ede8;
          --wp-muted: #a1a1aa;
          --wp-line-y: 196px;
          background:
            radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.18), transparent 36%),
            var(--wp-bg);
          border-block: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--wp-title);
          overflow: hidden;
          padding: clamp(72px, 9vw, 120px) 0;
        }

        .waskee-process__inner {
          width: min(1120px, calc(100% - 40px));
          margin: 0 auto;
        }

        .waskee-process__header {
          display: grid;
          gap: 14px;
          justify-items: center;
          text-align: center;
        }

        .waskee-process__label {
          color: var(--wp-purple-soft);
          font-family: 'Satoshi', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          line-height: 1;
          text-transform: uppercase;
        }

        .waskee-process__title {
          color: var(--wp-title);
          font-family: 'ClashDisplay', sans-serif;
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 600;
          line-height: 1.15;
          margin: 0;
        }

        /* ── Desktop timeline ── */
        .waskee-process__viewport {
          margin-top: clamp(48px, 6vw, 72px);
          overflow-x: auto;
          overflow-y: hidden;
          padding: 4px 2px 18px;
          scrollbar-color: rgba(124, 58, 237, 0.8) rgba(255, 255, 255, 0.06);
          scrollbar-width: thin;
        }

        .waskee-process__viewport::-webkit-scrollbar { height: 6px; }
        .waskee-process__viewport::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 999px;
        }
        .waskee-process__viewport::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, var(--wp-purple), var(--wp-purple-soft));
          border-radius: 999px;
        }

        .waskee-process__timeline {
          position: relative;
          display: grid;
          grid-template-columns: repeat(5, minmax(148px, 1fr));
          min-width: 860px;
          min-height: 330px;
        }

        .waskee-process__timeline::before {
          content: '';
          position: absolute;
          top: var(--wp-line-y);
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--wp-purple), var(--wp-purple-soft), transparent);
          opacity: 0.5;
        }

        /* ── Step card ── */
        .waskee-process__step {
          position: relative;
          min-width: 0;
          padding: calc(var(--wp-line-y) + 36px) 14px 0;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .waskee-process__step:hover {
          transform: translateY(-8px);
        }

        /* ── 3D icon wrapper ── */
        .waskee-process__icon {
          position: absolute;
          top: 0;
          left: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 180px;
          height: 180px;
          transform: translateX(-50%);
          perspective: 700px;
        }

        .waskee-process__icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          pointer-events: none;
          user-select: none;
          will-change: transform;
          animation: wpFloat 3.4s ease-in-out infinite;
          filter: drop-shadow(0 12px 24px rgba(124, 58, 237, 0.28));
          transition: filter 0.3s ease;
        }

        .waskee-process__step:hover .waskee-process__icon img {
          filter: drop-shadow(0 16px 32px rgba(124, 58, 237, 0.5));
        }

        /* stagger float so each icon bobs at a different phase */
        .waskee-process__step:nth-child(1) .waskee-process__icon img { animation-delay: 0s; }
        .waskee-process__step:nth-child(2) .waskee-process__icon img { animation-delay: -0.68s; }
        .waskee-process__step:nth-child(3) .waskee-process__icon img { animation-delay: -1.36s; }
        .waskee-process__step:nth-child(4) .waskee-process__icon img { animation-delay: -2.04s; }
        .waskee-process__step:nth-child(5) .waskee-process__icon img { animation-delay: -2.72s; }

        @keyframes wpFloat {
          0%, 100% { transform: var(--wp-tilt) translateY(0px); }
          50%       { transform: var(--wp-tilt) translateY(-10px); }
        }

        /* ── Marker dot ── */
        .waskee-process__marker {
          position: absolute;
          top: calc(var(--wp-line-y) - 5px);
          left: 50%;
          width: 10px;
          height: 10px;
          background: var(--wp-purple-soft);
          box-shadow: 0 0 0 6px rgba(167, 139, 250, 0.12), 0 0 18px rgba(124, 58, 237, 0.6);
          transform: translateX(-50%) rotate(45deg);
        }

        /* ── Text ── */
        .waskee-process__content {
          display: grid;
          gap: 6px;
          justify-items: center;
        }

        .waskee-process__step-title {
          color: var(--wp-title);
          font-family: 'ClashDisplay', sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.25;
          margin: 0;
        }

        .waskee-process__desc {
          max-width: 162px;
          color: var(--wp-muted);
          font-family: 'Satoshi', sans-serif;
          font-size: 11.5px;
          font-weight: 400;
          line-height: 1.5;
          margin: 0;
        }

        /* ═══════════════════════════════════════
           MOBILE — vertical stacked layout
        ═══════════════════════════════════════ */
        @media (max-width: 760px) {
          .waskee-process {
            padding: 60px 0;
          }

          .waskee-process__inner {
            width: min(100% - 32px, 480px);
          }

          /* hide horizontal scroll viewport on mobile */
          .waskee-process__viewport {
            overflow: visible;
            padding: 0;
            margin-top: 40px;
          }

          .waskee-process__timeline {
            /* vertical stacked */
            display: flex;
            flex-direction: column;
            min-width: unset;
            min-height: unset;
            gap: 0;
            /* left vertical line — padding increased so icon has room */
            padding-left: 68px;
            position: relative;
          }

          .waskee-process__timeline::before {
            /* vertical connector line — moved to left:10px so icon doesn't overlap */
            top: 20px;
            bottom: 20px;
            left: 10px;
            right: auto;
            width: 1px;
            height: auto;
            background: linear-gradient(180deg, transparent, var(--wp-purple), var(--wp-purple-soft), transparent);
            opacity: 0.5;
          }

          .waskee-process__step {
            position: relative;
            display: flex;
            align-items: center;
            gap: 24px;
            padding: 16px 0;
            text-align: left;
            transform: none !important;
          }

          .waskee-process__step:hover {
            transform: translateX(4px) !important;
          }

          /* icon on the left of the row */
          .waskee-process__icon {
            position: relative;
            top: auto;
            left: auto;
            transform: none;
            width: 120px;
            height: 120px;
            flex-shrink: 0;
            /* pull back only 44px — icon starts 24px to the right of the line (10px) */
            margin-left: -44px;
          }

          .waskee-process__icon img {
            width: 120px;
            height: 120px;
          }

          /* marker on the vertical line */
          .waskee-process__marker {
            position: absolute;
            top: 50%;
            left: -53px;
            transform: translate(-50%, -50%) rotate(45deg);
          }

          .waskee-process__content {
            justify-items: start;
            gap: 4px;
            flex: 1;
          }

          .waskee-process__step-title {
            font-size: 15px;
          }

          .waskee-process__desc {
            max-width: 100%;
            font-size: 12px;
          }

          /* ── destaque ao rolar no celular ── */
          .waskee-process__step {
            transition: opacity 0.35s ease, transform 0.35s ease;
            opacity: 0.45;
          }

          .waskee-process__step.wp-step--active {
            opacity: 1;
            transform: translateX(6px) !important;
          }

          .waskee-process__step.wp-step--active .waskee-process__icon img {
            filter: drop-shadow(0 16px 32px rgba(124, 58, 237, 0.55)) !important;
            transform: scale(1.12);
          }

          .waskee-process__step.wp-step--active .waskee-process__step-title {
            font-size: 17px;
            color: #fff;
          }

          .waskee-process__step.wp-step--active .waskee-process__desc {
            font-size: 13px;
            color: #c4c4cc;
          }
        }

        @media (max-width: 400px) {
          .waskee-process__timeline {
            padding-left: 56px;
          }

          .waskee-process__icon {
            width: 100px;
            height: 100px;
            margin-left: -36px;
          }

          .waskee-process__icon img {
            width: 100px;
            height: 100px;
          }

          .waskee-process__marker {
            left: -41px;
          }
        }
      `}</style>

      <div className="waskee-process__inner">
        <div className="waskee-process__header">
          <span className="waskee-process__label">COMO FUNCIONA</span>
          <h2 className="waskee-process__title">Do cadastro à venda simples assim</h2>
        </div>

        <div className="waskee-process__viewport" aria-label="Processo">
          <div className="waskee-process__timeline">
            {STEPS.map((step) => (
              <article
                className="waskee-process__step"
                key={step.title}
                style={{ '--wp-tilt': step.tilt }}
              >
                <div className="waskee-process__icon" aria-hidden="true">
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
