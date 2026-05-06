import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/*
  Para adicionar vídeos reais:
  substitua `video: null` por `video: '/videos/nome.mp4'`
  e `poster: null` por `poster: '/imagens/thumb.jpg'`
*/
const TESTIMONIALS = [
  {
    id: 1,
    name: 'Marina Costa',
    company: 'Lumi Beauty',
    result: '+142% em vendas',
    video: null,
    poster: null,
    gradient: 'linear-gradient(160deg, #3b0764 0%, #1e1b4b 60%, #0f172a 100%)',
  },
  {
    id: 2,
    name: 'Rafael Nunes',
    company: 'Casa Norte',
    result: '3.6x ROAS',
    video: null,
    poster: null,
    gradient: 'linear-gradient(160deg, #064e3b 0%, #1e3a5f 60%, #0f172a 100%)',
  },
  {
    id: 3,
    name: 'Bianca Torres',
    company: 'FitCore',
    result: '-31% CPA',
    video: null,
    poster: null,
    gradient: 'linear-gradient(160deg, #4a044e 0%, #2d1b69 60%, #0f172a 100%)',
  },
  {
    id: 4,
    name: 'Thiago Mendes',
    company: 'UrbanStore',
    result: 'R$ 2M em 90 dias',
    video: null,
    poster: null,
    gradient: 'linear-gradient(160deg, #1e3a5f 0%, #3b0764 60%, #0f172a 100%)',
  },
  {
    id: 5,
    name: 'Carla Dias',
    company: 'NutriLife',
    result: '4.1x ROAS',
    video: null,
    poster: null,
    gradient: 'linear-gradient(160deg, #0f4c75 0%, #1b262c 60%, #0f172a 100%)',
  },
];

function PlayIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="23" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="23" fill="rgba(255,255,255,0.08)" />
      <path d="M20 16l16 8-16 8V16z" fill="white" />
    </svg>
  );
}

export default function VideoCarousel() {
  const [active, setActive]   = useState(0);
  const [playing, setPlaying] = useState(false);
  const trackRef  = useRef(null);
  const sectionRef = useRef(null);
  const videoRefs = useRef([]);
  const total = TESTIMONIALS.length;

  /* Entrada da seção */
  useEffect(() => {
    gsap.from(sectionRef.current, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
    });
  }, []);

  /* Animação de slide ao trocar */
  const goTo = (next) => {
    if (next === active) return;
    const dir = next > active ? 1 : -1;

    setPlaying(false);
    videoRefs.current.forEach(v => v?.pause?.());

    gsap.fromTo(trackRef.current,
      { x: dir * 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }
    );
    setActive(next);
  };

  const prev = () => goTo((active - 1 + total) % total);
  const next = () => goTo((active + 1) % total);

  const togglePlay = () => {
    const vid = videoRefs.current[active];
    if (!vid) return;
    if (playing) { vid.pause(); setPlaying(false); }
    else         { vid.play();  setPlaying(true);  }
  };

  /* Visible indices: prev, active, next (circular) */
  const indices = [
    (active - 1 + total) % total,
    active,
    (active + 1) % total,
  ];

  return (
    <section id="avaliacoes" className="vc-section section" ref={sectionRef}>
      <div className="container">
        <div className="vc-header">
          <span className="eyebrow">Avaliações</span>
          <h2 className="section-title">O que nossos clientes dizem.</h2>
          <p className="section-desc">
            Resultados reais, contados por quem viveu — em vídeo, sem roteiro.
          </p>
        </div>

        <div className="vc-stage">
          {/* Seta esquerda */}
          <button className="vc-arrow vc-arrow--prev" onClick={prev} aria-label="Anterior">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M14 5l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Stories */}
          <div className="vc-track" ref={trackRef}>
            {indices.map((idx, pos) => {
              const t   = TESTIMONIALS[idx];
              const isActive = pos === 1;

              return (
                <div
                  key={t.id}
                  className={`vc-story${isActive ? ' vc-story--active' : ' vc-story--side'}`}
                  onClick={() => !isActive && goTo(idx)}
                  style={{ '--story-gradient': t.gradient }}
                >
                  {/* Vídeo ou placeholder */}
                  {t.video ? (
                    <video
                      ref={el => (videoRefs.current[idx] = el)}
                      src={t.video}
                      poster={t.poster}
                      playsInline
                      loop
                      className="vc-story__video"
                    />
                  ) : (
                    <div className="vc-story__placeholder" style={{ background: t.gradient }} />
                  )}

                  {/* Overlay */}
                  <div className="vc-story__overlay" />

                  {/* Botão play (só no ativo com vídeo real) */}
                  {isActive && t.video && (
                    <button className="vc-story__play" onClick={togglePlay} aria-label="Play/Pause">
                      <PlayIcon />
                    </button>
                  )}

                  {/* Ícone play decorativo no placeholder */}
                  {isActive && !t.video && (
                    <div className="vc-story__play-dec">
                      <PlayIcon />
                    </div>
                  )}

                  {/* Info */}
                  <div className="vc-story__info">
                    <div className="vc-story__result">{t.result}</div>
                    <div className="vc-story__name">{t.name}</div>
                    <div className="vc-story__company">{t.company}</div>
                  </div>

                  {/* Barra de progresso no ativo */}
                  {isActive && (
                    <div className="vc-story__progress">
                      {TESTIMONIALS.map((_, i) => (
                        <div
                          key={i}
                          className={`vc-story__progress-bar${i === active ? ' active' : i < active ? ' done' : ''}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Seta direita */}
          <button className="vc-arrow vc-arrow--next" onClick={next} aria-label="Próximo">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M8 5l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="vc-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`vc-dot${i === active ? ' vc-dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Ir para avaliação ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
