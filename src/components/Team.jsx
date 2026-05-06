import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TiltCard from './TiltCard';

const MEMBERS = [
  {
    name: 'Andrew Torres',
    role: 'Automação & Marketing',
    img: '/fotonova_do_guri_editada.png',
    initials: 'AT',
    color: '#5b21b6',
    bio: 'Especialista em automações de marketing e fluxos inteligentes. Conecta ferramentas para que cada lead seja tratado no momento certo.',
  },
  {
    name: 'João Neto',
    role: 'Desenvolvedor & Analista de dados',
    img: '/d6426081-2df3-4abf-885e-daae113fe668.png',
    initials: 'JN',
    color: '#0d9488',
    bio: 'Transforma dados brutos em decisões. Cuida da infraestrutura técnica, dashboards e integrações que fazem a operação rodar com precisão.',
  },
  {
    name: 'Augustus Gangary',
    role: 'Gestor de Tráfego & Desenvolvedor',
    img: '/6DF21DD5-C899-45FE-BA21-3C95BE6E4C73.png',
    initials: 'AG',
    color: '#86198f',
    bio: 'Gerencia investimentos em Meta, Google e TikTok Ads com foco em ROAS real. Também desenvolve as landing pages que recebem o tráfego.',
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
          <span className="eyebrow">Sobre nós</span>
          <h2 className="section-title">
            Conheça quem está por trás dos resultados.
          </h2>
          <p className="section-desc">
            Um time pequeno, especializado e obcecado por crescimento. Cada
            pessoa aqui toca performance todos os dias, sem terceirizar
            decisões.
          </p>
        </div>

        <div className="team__grid tilt-scene">
          {MEMBERS.map(({ name, role, img, initials, color, bio }, i) => (
            <TiltCard
              key={name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="team-card"
              tiltOptions={{ max: 14, scale: 1.02 }}
            >
              <div className="team-card__inner">
                {/* Frente */}
                <div className="team-card__front">
                  <div className="team-card__photo-wrap">
                    {img ? (
                      <img src={img} alt={name} className="team-card__photo" draggable="false" />
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
                    <h3 className="team-card__name">{name}</h3>
                    <p className="team-card__role">{role}</p>
                  </div>
                </div>

                {/* Verso */}
                <div className="team-card__back-face">
                  {img && (
                    <img src={img} alt={name} className="team-card__back-avatar" draggable="false" />
                  )}
                  <p className="team-card__back-name">{name}</p>
                  <p className="team-card__back-role">{role}</p>
                  <p className="team-card__back-bio">{bio}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

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
    </section>
  );
}
