import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Inline SVG icons ── */
function IconTarget() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function IconLayout() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

function IconCart() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

const SERVICES = [
  {
    Icon: IconTarget,
    title: 'Tráfego Pago',
    desc: 'Gestão de campanhas em Meta, Google e TikTok Ads com criativos, segmentação e otimização orientados por margem.',
    tags: ['Media Buying', 'Criativos', 'ROAS'],
    backDesc: 'Estruturamos campanhas do zero ou auditamos o que já existe. Criativos testados, audiências segmentadas por intenção e otimização focada em custo por venda — não em cliques.',
  },
  {
    Icon: IconLayout,
    title: 'Landing Pages',
    desc: 'Páginas rápidas, persuasivas e testáveis, criadas para transformar cliques em leads, vendas e reuniões qualificadas.',
    tags: ['CRO', 'Copywriting', 'A/B Tests'],
    backDesc: 'Design orientado por conversão, copy que remove objeções e testes A/B contínuos. Cada elemento da página tem uma hipótese e um número para validar.',
  },
  {
    Icon: IconCart,
    title: 'E-commerce',
    desc: 'Arquitetura de funil, tracking, ofertas e recorrência para lojas que precisam escalar sem perder eficiência.',
    tags: ['Shopify', 'Checkout', 'LTV'],
    backDesc: 'Da estrutura de produto ao pós-venda: funil completo, recuperação de carrinho, upsell e relatórios de margem real. Escalamos receita sem inflar CAC.',
  },
];

export default function Services() {
  const cardsRef = useRef([]);
  const gridRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="servicos" className="section">
      <div className="container">
        <div className="services__header">
          <span className="eyebrow">Serviços</span>
          <h2 className="section-title">
            Três frentes conectadas para vender mais com menos desperdício.
          </h2>
          <p className="section-desc">
            Cada disciplina conversa com a outra: mídia informa criativo,
            criativo alimenta a página, a página revela a próxima otimização.
          </p>
        </div>

        <div ref={gridRef} className="services__grid">
          {SERVICES.map(({ Icon, title, desc, tags, backDesc }, i) => (
            <article
              key={title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="service-card"
            >
              <div className="service-card__inner">
                {/* Frente */}
                <div className="service-card__front">
                  <div className="service-card__icon"><Icon /></div>
                  <h3 className="service-card__title">{title}</h3>
                  <p className="service-card__desc">{desc}</p>
                  <div className="service-card__tags">
                    {tags.map((tag) => (
                      <span key={tag} className="service-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Verso */}
                <div className="service-card__back">
                  <p className="service-card__back-title">{title}</p>
                  <p className="service-card__back-desc">{backDesc}</p>
                  <a href="#contato" className="service-card__back-cta">
                    Falar com a equipe
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                      <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
