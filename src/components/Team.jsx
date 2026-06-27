import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import GlowCard from './GlowCard.jsx';

const MEMBERS = [
  {
    name: 'Augustus Gangary',
    title: 'Estratégia',
    role: 'Resultado & Desenvolvimento',
    img: '/augustus-portrait.webp',
    imgWidth: 800,
    imgHeight: 1000,
    initials: 'AG',
    color: '#86198f',
    bio: '4 anos como gestor de tráfego pago. Faz as copys, os criativos e conduz o desenvolvimento do seu site. É quem entende seu negócio antes de qualquer linha de código — e quem coloca ela no ar.',
  },
  {
    name: 'Andrew Torres',
    title: 'Operações',
    role: 'Automação & Operações',
    img: '/fotonova_do_guri_editada.webp',
    imgWidth: 1920,
    imgHeight: 3440,
    initials: 'AT',
    color: '#5b21b6',
    bio: 'Especialista em n8n. Conecta WhatsApp, planilhas e CRM pra que cada lead chegue no lugar certo no momento certo. Também é quem vai te atender na maioria dos casos.',
  },
];

export default function Team() {
  const headRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        scrollTrigger: { trigger: headRef.current, start: 'top 80%' },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 85%' },
          opacity: 0,
          y: 50,
          duration: 0.85,
          ease: 'power3.out',
          delay: i * 0.12,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="equipe" className="team section">
      <div className="container">
        <div ref={headRef} className="team__header">
          <span className="eyebrow">Equipe</span>
          <h2 className="section-title">
            A pessoa que vai te atender é a pessoa que vai fazer.
          </h2>
          <p className="section-desc">
            Dois sócios, um time só. Sem atendente que repassa o problema
            adiante. Você fala com quem entrega.
          </p>
        </div>

        <div className="team__grid">
          {MEMBERS.map(({ name, title, role, img, imgWidth, imgHeight, initials, color }, i) => (
            <GlowCard
              key={name}
              ref={(el) => { cardsRef.current[i] = el; }}
              glowColor="purple"
              className="team-card"
            >
              <div className="team-card__photo-wrap">
                {img ? (
                  <img src={img} alt={name} className="team-card__photo" width={imgWidth} height={imgHeight} draggable="false" loading="lazy" decoding="async" />
                ) : (
                  <div
                    className="team-card__avatar"
                    style={{ background: `linear-gradient(135deg, ${color}55, ${color}22)`, borderColor: `${color}44` }}
                  >
                    <span className="team-card__initials" style={{ color }}>{initials}</span>
                  </div>
                )}
                <div className="team-card__role-tag">{role}</div>
              </div>
              <div className="team-card__info">
                <div className="team-card__name-row">
                  <h3 className="team-card__name">{name}</h3>
                  {title && <span className="team-card__title">{title}</span>}
                </div>
                <p className="team-card__role">{role}</p>
              </div>
            </GlowCard>
          ))}
        </div>

        <div className="team__culture-frame">
        <div className="team__culture">
          <div className="team__culture-item">
            <span className="team__culture-num">I.A</span>
            <span className="team__culture-label">Automação com inteligência artificial</span>
          </div>
          <div className="team__culture-sep" />
          <div className="team__culture-item">
            <span className="team__culture-num">100%</span>
            <span className="team__culture-label">Foco em resultado e crescimento real</span>
          </div>
          <div className="team__culture-sep" />
          <div className="team__culture-item">
            <span className="team__culture-num">Full</span>
            <span className="team__culture-label">Stack: marketing, tech e estratégia</span>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
