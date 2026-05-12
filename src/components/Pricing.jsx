import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import ButtonCta from './ButtonCta.jsx';

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    id: 'lp',
    name: 'Landing Page',
    tag: null,
    desc: 'Pra oferta única, lançamento, anúncio Meta/Google, prestadores de serviço.',
    oldPrice: 1200,
    price: 800,
    priceLabel: 'a partir de',
    cta: 'Quero minha LP',
    accentRgb: '13,148,136',
    featured: false,
    features: [
      'Estrutura focada em 1 objetivo',
      'Copy escrita pelos profissionais da Vortex',
      'Design + build',
      'Tracking instalado (Meta Pixel, GA4)',
      'Mobile-first + Lighthouse 90+',
      '30 dias de ajustes pós-entrega',
    ],
  },
  {
    id: 'site',
    name: 'Site Institucional',
    tag: 'Mais procurado',
    desc: 'Pra marca que precisa de presença séria.',
    oldPrice: 2500,
    price: 2000,
    priceLabel: 'a partir de',
    cta: 'Quero meu site',
    accentRgb: '124,58,237',
    featured: true,
    features: [
      'Até 5 páginas',
      'Identidade visual aplicada',
      'SEO básico',
      'Painel pra editar texto sem mexer no código',
      'Hospedagem 1º ano incluso',
      '30 dias de ajuste pós-entrega',
    ],
  },
  {
    id: 'combo',
    name: 'Combo + Tráfego',
    tag: 'Full operação',
    desc: 'Pra quem precisa de um site e novos clientes entrando no funil todo dia.',
    price: null,
    cta: 'Falar com a Vortex',
    accentRgb: '134,25,143',
    featured: false,
    features: [
      'Tudo do Pacote 1 OU 2',
      'Setup de campanhas Meta Ads',
      'Lote de criativos com qualidade',
      'Acompanhamento frequente de métricas',
    ],
  },
];

function CheckCircle() {
  return (
    <svg
      className="plano__check-icon"
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M5 8.2l2.2 2.2 3.8-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BorderTrail({ size = 100, style }) {
  return (
    <div className="plano__trail-track">
      <motion.div
        className="plano__trail-dot"
        style={{
          width: size,
          offsetPath: 'rect(0 auto auto 0 round 10px)',
          ...style,
        }}
        animate={{ offsetDistance: ['0%', '100%'] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
      />
    </div>
  );
}

const tiltRaf = new WeakMap();

function onTiltMove(e) {
  const wrap = e.currentTarget;
  if (tiltRaf.get(wrap)) return;
  const cx = e.clientX, cy = e.clientY;
  tiltRaf.set(wrap, requestAnimationFrame(() => {
    const rect = wrap.getBoundingClientRect();
    const rx = -((cy - (rect.top  + rect.height / 2)) / (rect.height / 2)) * 6;
    const ry =  ((cx - (rect.left + rect.width  / 2)) / (rect.width  / 2)) * 6;
    wrap.style.setProperty('--rx', rx + 'deg');
    wrap.style.setProperty('--ry', ry + 'deg');
    wrap.style.setProperty('--mx', (cx - rect.left) + 'px');
    wrap.style.setProperty('--my', (cy - rect.top)  + 'px');
    wrap.style.setProperty('--glow-active', '1');
    tiltRaf.set(wrap, null);
  }));
}

function onTiltLeave(e) {
  const wrap = e.currentTarget;
  wrap.style.setProperty('--rx', '0deg');
  wrap.style.setProperty('--ry', '0deg');
  wrap.style.setProperty('--glow-active', '0');
}

export default function Pricing() {
  const sectionRef = useRef(null);
  const cardsRef   = useRef([]);

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

  return (
    <section id="planos" className="pricing section" ref={sectionRef}>
      <div className="container">

        <div className="pricing__header">
          <span className="eyebrow">Pacotes</span>
          <h2 className="section-title">
            Escolha o que você deseja<br />e deixe conosco.
          </h2>
          <p className="section-desc">
            Preços fechados, sem fidelidade. Você paga pelo trabalho entregue.
            Opcional de recorrência incluso.
          </p>
        </div>

        <div className="planos-grid">
          {PLANS.map((plan, i) => (
            <div
              key={plan.id}
              className="plano-wrap"
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
            >
            <article
              ref={el => (cardsRef.current[i] = el)}
              className={`plano${plan.featured ? ' plano--featured' : ''}`}
              style={{ '--accent-rgb': plan.accentRgb }}
            >
              {/* BorderTrail — featured (roxo) e combo (fuchsia) */}
              {plan.featured && (
                <BorderTrail
                  size={100}
                  style={{
                    boxShadow:
                      '0px 0px 60px 30px rgba(167,139,250,0.45), 0 0 100px 60px rgba(0,0,0,0.45), 0 0 140px 90px rgba(0,0,0,0.45)',
                  }}
                />
              )}
              {plan.id === 'combo' && (
                <BorderTrail
                  size={80}
                  style={{
                    boxShadow:
                      '0px 0px 50px 24px rgba(168,85,247,0.4), 0 0 90px 50px rgba(0,0,0,0.4)',
                  }}
                />
              )}

              {/* ── Head: número + nome + preço ── */}
              <div className="plano__head">
                {plan.featured && plan.tag && (
                  <span className="plano__featured-tag">{plan.tag}</span>
                )}
                {plan.id === 'combo' && plan.tag && (
                  <span className="plano__featured-tag plano__featured-tag--combo">{plan.tag}</span>
                )}

                <div className="plano__num">{String(i + 1).padStart(2, '0')}</div>
                <div className="plano__nome">{plan.name}</div>

                {plan.price !== null ? (
                  <div className="plano__preco">
                    {plan.oldPrice && (
                      <span className="plano__preco-old">
                        R$ {plan.oldPrice.toLocaleString('pt-BR')}
                      </span>
                    )}
                    <div className="plano__preco-row">
                      <span className="plano__preco-cur">R$</span>
                      <span className="plano__preco-val">
                        {plan.price.toLocaleString('pt-BR')}
                      </span>
                      {plan.priceLabel && (
                        <span className="plano__preco-suf">{plan.priceLabel}</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="plano__preco">
                    <div className="plano__preco-row">
                      <span className="plano__preco-val plano__preco-val--custom">
                        Sob consulta
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Body: descrição + features ── */}
              <div className="plano__body">
                <p className="plano__desc">{plan.desc}</p>
                <ul className="plano__feats">
                  {plan.features.map((text, j) => (
                    <li key={j}>
                      <CheckCircle />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Foot: CTA ── */}
              <div className="plano__foot">
                <ButtonCta href="#contato" className="btn-cta--full">
                  <span>{plan.cta}</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ButtonCta>
              </div>
            </article>
            </div>
          ))}
        </div>

        <p className="pricing__footnote">
          Pagamento em 50% no início + 50% na entrega. Aceitamos Pix, cartão e boleto.&nbsp;
          <a href="#contato" className="pricing__footnote-link">Tem dúvidas? Fale com a gente.</a>
        </p>

      </div>
    </section>
  );
}
