import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    id: 'start',
    name: 'Start',
    tag: null,
    desc: 'Para negócios que querem começar a escalar com método e estrutura.',
    price: { monthly: 2490, annual: 1990 },
    cta: 'Começar agora',
    accent: '#0d9488',
    accentRgb: '13,148,136',
    featured: false,
    features: [
      { text: '1 canal de mídia (Meta ou Google)', on: true },
      { text: 'Gestão de até R$ 15k/mês em verba', on: true },
      { text: '4 criativos por mês', on: true },
      { text: 'Relatório quinzenal', on: true },
      { text: 'Landing page de entrada', on: true },
      { text: 'Reunião estratégica mensal', on: true },
      { text: 'E-commerce & funil avançado', on: false },
      { text: 'Criativos em vídeo', on: false },
      { text: 'Dashboards em tempo real', on: false },
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    tag: 'Mais popular',
    desc: 'Para marcas que já vendem e querem multiplicar os resultados com consistência.',
    price: { monthly: 4990, annual: 3990 },
    cta: 'Quero escalar agora',
    accent: '#7c3aed',
    accentRgb: '124,58,237',
    featured: true,
    features: [
      { text: '2 canais de mídia (Meta + Google)', on: true },
      { text: 'Gestão de até R$ 50k/mês em verba', on: true },
      { text: '10 criativos por mês (estático + vídeo)', on: true },
      { text: 'Relatório semanal com insights', on: true },
      { text: 'Landing pages ilimitadas (A/B)', on: true },
      { text: 'Reunião estratégica quinzenal', on: true },
      { text: 'E-commerce & funil avançado', on: true },
      { text: 'Criativos em vídeo', on: true },
      { text: 'Dashboards em tempo real', on: false },
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    tag: 'Full operação',
    desc: 'Operação completa para quem precisa de velocidade, dados e escala sem limite.',
    price: { monthly: 9900, annual: 7900 },
    cta: 'Falar com o time',
    accent: '#86198f',
    accentRgb: '134,25,143',
    featured: false,
    features: [
      { text: 'Todos os canais (Meta, Google, TikTok)', on: true },
      { text: 'Gestão de verba ilimitada', on: true },
      { text: 'Criativos ilimitados (estático + vídeo)', on: true },
      { text: 'Relatório diário + alertas automáticos', on: true },
      { text: 'Landing pages ilimitadas + CRO avançado', on: true },
      { text: 'Acesso direto ao time + reuniões semanais', on: true },
      { text: 'E-commerce & funil avançado', on: true },
      { text: 'Criativos em vídeo', on: true },
      { text: 'Dashboards em tempo real', on: true },
    ],
  },
];

function Check({ color }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="8.5" cy="8.5" r="8" fill={color} fillOpacity="0.15" />
      <path d="M5.5 8.5l2.5 2.5L12 6" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Cross() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="8.5" cy="8.5" r="8" fill="rgba(255,255,255,0.04)" />
      <path d="M6 6l5 5M11 6l-5 5" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const sectionRef = useRef(null);
  const cardsRef   = useRef([]);
  const pricesRef  = useRef([]);

  /* Scroll entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.13,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  /* Price flip */
  const toggleBilling = () => {
    const prices = pricesRef.current.filter(Boolean);
    gsap.to(prices, {
      y: -8, opacity: 0, duration: 0.14, stagger: 0.04,
      onComplete: () => {
        setAnnual(v => !v);
        gsap.fromTo(prices,
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.22, stagger: 0.04, ease: 'power2.out' }
        );
      },
    });
  };

  return (
    <section id="planos" className="pricing section" ref={sectionRef}>
      <div className="container">

        {/* Header */}
        <div className="pricing__header">
          <span className="eyebrow">Planos & Pacotes</span>
          <h2 className="section-title">
            Escolha o plano certo<br />para o seu momento.
          </h2>
          <p className="section-desc">
            Preço transparente, sem fidelidade obrigatória e sem surpresas na fatura.
          </p>

          {/* Billing toggle */}
          <div className="pricing__toggle">
            <span className={`pricing__toggle-opt${!annual ? ' active' : ''}`}>Mensal</span>
            <button
              className={`pricing__switch${annual ? ' on' : ''}`}
              onClick={toggleBilling}
              aria-pressed={annual}
              aria-label="Cobrança anual"
            >
              <span />
            </button>
            <span className={`pricing__toggle-opt${annual ? ' active' : ''}`}>
              Anual
              <span className="pricing__save">−20%</span>
            </span>
          </div>
        </div>

        {/* Cards grid */}
        <div className="pricing__grid">
          {PLANS.map((plan, i) => (
            <article
              key={plan.id}
              ref={el => (cardsRef.current[i] = el)}
              className={`plan-card${plan.featured ? ' plan-card--featured' : ''}`}
              style={{ '--pa': plan.accent, '--pr': plan.accentRgb }}
            >
              {plan.featured && <div className="plan-card__glow" />}

              {/* Badge */}
              <div className="plan-card__badges">
                {plan.tag && <span className="plan-card__tag">{plan.tag}</span>}
              </div>

              {/* Name */}
              <div className="plan-card__name">{plan.name}</div>
              <p className="plan-card__desc">{plan.desc}</p>

              {/* Price */}
              <div className="plan-card__price-row">
                <span className="plan-card__currency">R$</span>
                <span className="plan-card__price" ref={el => (pricesRef.current[i] = el)}>
                  {(annual ? plan.price.annual : plan.price.monthly).toLocaleString('pt-BR')}
                </span>
                <span className="plan-card__period">/mês</span>
              </div>
              {annual && (
                <p className="plan-card__annual">
                  Cobrado anualmente · R$ {(plan.price.annual * 12).toLocaleString('pt-BR')}/ano
                </p>
              )}

              {/* CTA button */}
              <a
                href="#contato"
                className={`plan-card__cta${plan.featured ? ' plan-card__cta--main' : ''}`}
              >
                {plan.cta}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <div className="plan-card__sep" />

              {/* Features */}
              <ul className="plan-card__list">
                {plan.features.map((f, j) => (
                  <li key={j} className={`plan-card__item${f.on ? '' : ' plan-card__item--off'}`}>
                    {f.on ? <Check color={plan.accent} /> : <Cross />}
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="pricing__footnote">
          Todos os planos incluem onboarding dedicado.&nbsp;
          <a href="#contato" className="pricing__footnote-link">Tem dúvidas? Fale com a gente.</a>
        </p>

      </div>
    </section>
  );
}
