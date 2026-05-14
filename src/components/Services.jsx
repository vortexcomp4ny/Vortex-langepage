import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductHighlightCard from './ProductHighlightCard.jsx';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    category: 'Criação · Conversão',
    title: 'Sites e Landing Pages',
    description: 'Sites de marca e landing pages focadas em conversão. Rápidas, mobile-first, com copy que tira objeção e tracking pronto pra escalar.',
    imageSrc: '/logo-vortex-3d.webp',
    imageAlt: 'Logo Vortex',
    imageWidth: 600,
    imageHeight: 537,
    tags: ['CRO', 'Copywriting', 'Performance'],
    accent: '#a78bfa',
  },
  {
    category: 'Mídia · Performance',
    title: 'Tráfego Pago',
    description: 'Gestão de Meta Ads profissional, com a estrutura de criativos que mais converte hoje no mercado.',
    imageSrc: '/logo-meta.webp',
    imageAlt: 'Logo Meta',
    imageWidth: 600,
    imageHeight: 600,
    tags: ['Meta Ads', 'Criativos', 'ROAS'],
    accent: '#3b82f6',
  },
  {
    category: 'Loja · Escala',
    title: 'E-commerce',
    description: 'Lojas com alta conversão pra aumentar seu lucro. Recuperação de carrinho e estrutura pronta pra escalar.',
    imageSrc: '/logo-shopify.webp',
    imageAlt: 'Logo Shopify',
    imageWidth: 450,
    imageHeight: 450,
    tags: ['Shopify', 'Checkout', 'LTV'],
    accent: '#22c55e',
    badge: 'Em breve',
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
            Começamos pelo que mais alavanca: a página.
          </h2>
          <p className="section-desc">
            Te entregamos tudo que você precisa. Página rápida, copy que
            converte e remove objeções, e tracking que não deixa na mão.
          </p>
        </div>

        <div ref={gridRef} className="services__grid services__grid--phc">
          {SERVICES.map((service, i) => (
            <ProductHighlightCard
              key={service.title}
              ref={(el) => (cardsRef.current[i] = el)}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
