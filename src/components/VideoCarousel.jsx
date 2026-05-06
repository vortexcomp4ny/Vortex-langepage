import { useRef, useState } from 'react';
import { gsap } from 'gsap';

const TESTIMONIALS = [
  { id: 1, name: 'Marina Costa',   company: 'Lumi Beauty',  result: '+142% em vendas', video: null, poster: null },
  { id: 2, name: 'Rafael Nunes',   company: 'Casa Norte',   result: '3.6x ROAS',       video: null, poster: null },
  { id: 3, name: 'Bianca Torres',  company: 'FitCore',      result: '-31% CPA',         video: null, poster: null },
  { id: 4, name: 'Thiago Mendes',  company: 'UrbanStore',   result: 'R$ 2M em 90 dias', video: null, poster: null },
  { id: 5, name: 'Carla Dias',     company: 'NutriLife',    result: '4.1x ROAS',        video: null, poster: null },
  { id: 6, name: 'Lucas Ferreira', company: 'TechFlow',     result: '+89% leads',       video: null, poster: null },
  { id: 7, name: 'Juliana Melo',   company: 'Glow Studio',  result: '2.8x ROAS',        video: null, poster: null },
];

function PlayIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="23" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="23" fill="rgba(255,255,255,0.06)" />
      <path d="M20 16l16 8-16 8V16z" fill="white" />
    </svg>
  );
}

export default function VideoCarousel() {
  const [page, setPage]     = useState(0);
  const [playing, setPlaying] = useState({});
  const trackRef  = useRef(null);
  const videoRefs = useRef({});

  const total     = TESTIMONIALS.length;
  const perPage   = 3;
  const maxPage   = total - perPage;

  const goTo = (next) => {
    if (next === page) return;
    const dir = next > page ? 1 : -1;
    gsap.fromTo(trackRef.current,
      { x: dir * 80, opacity: 0.5 },
      { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
    );
    // pause all videos
    Object.values(videoRefs.current).forEach(v => v?.pause?.());
    setPlaying({});
    setPage(next);
  };

  const prev = () => goTo(Math.max(0, page - 1));
  const next = () => goTo(Math.min(maxPage, page + 1));

  const togglePlay = (id) => {
    const vid = videoRefs.current[id];
    if (!vid) return;
    if (playing[id]) { vid.pause(); setPlaying(p => ({ ...p, [id]: false })); }
    else             { vid.play();  setPlaying(p => ({ ...p, [id]: true  })); }
  };

  const visible = TESTIMONIALS.slice(page, page + perPage);

  return (
    <section id="avaliacoes" className="vc-section section">
      <div className="container">
        <div className="vc-header">
          <span className="eyebrow">Avaliações</span>
          <h2 className="section-title">O que nossos clientes dizem.</h2>
          <p className="section-desc">
            Resultados reais, contados por quem viveu — em vídeo, sem roteiro.
          </p>
        </div>

        <div className="vc-stage">
          <button
            className="vc-arrow vc-arrow--prev"
            onClick={prev}
            disabled={page === 0}
            aria-label="Anterior"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M14 5l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="vc-track" ref={trackRef}>
            {visible.map((t) => (
              <div key={t.id} className="vc-card">
                {/* mídia */}
                {t.video ? (
                  <video
                    ref={el => (videoRefs.current[t.id] = el)}
                    src={t.video}
                    poster={t.poster}
                    playsInline
                    loop
                    className="vc-card__video"
                  />
                ) : (
                  <div className="vc-card__placeholder" />
                )}

                {/* overlay escuro no rodapé */}
                <div className="vc-card__overlay" />

                {/* botão play */}
                <button
                  className="vc-card__play"
                  onClick={() => togglePlay(t.id)}
                  aria-label="Play/Pause"
                >
                  <PlayIcon />
                </button>

                {/* info */}
                <div className="vc-card__info">
                  <span className="vc-card__result">{t.result}</span>
                  <span className="vc-card__name">{t.name}</span>
                  <span className="vc-card__company">{t.company}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            className="vc-arrow vc-arrow--next"
            onClick={next}
            disabled={page >= maxPage}
            aria-label="Próximo"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M8 5l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* dots */}
        <div className="vc-dots">
          {Array.from({ length: maxPage + 1 }).map((_, i) => (
            <button
              key={i}
              className={`vc-dot${i === page ? ' vc-dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Página ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
