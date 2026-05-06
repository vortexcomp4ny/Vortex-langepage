import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Project data ─────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'landing',
    label: 'Landing Pages',
    projects: [
      {
        id: 'fitcore',
        client: 'FitCore',
        title: 'Lançamento de Programa',
        desc: 'LP de lançamento com vídeo VSL, prova social e checkout integrado. Redução de CPA em 31% em 45 dias.',
        metric: '-31% CPA',
        metricSub: 'em 45 dias',
        url: 'fitcore.com.br/programa',
        accent: '#7c3aed',
        accentRgb: '124,58,237',
        heroGradient: 'linear-gradient(135deg, #4a044e 0%, #2d1b69 60%, #0f172a 100%)',
        tags: ['VSL', 'Checkout', 'Meta Ads'],
      },
      {
        id: 'nutrilife',
        client: 'NutriLife',
        title: 'Assinatura Mensal',
        desc: 'Página de captura para nutricionistas com funil de e-mail automático e segmentação por objetivo.',
        metric: '4.1x ROAS',
        metricSub: 'média 60 dias',
        url: 'nutrilife.com.br/assine',
        accent: '#0d9488',
        accentRgb: '13,148,136',
        heroGradient: 'linear-gradient(135deg, #0f4c75 0%, #134e4a 60%, #0f172a 100%)',
        tags: ['Email Funnel', 'CRO', 'A/B Test'],
      },
      {
        id: 'lumi',
        client: 'Lumi Beauty',
        title: 'Skincare Premium',
        desc: 'Funil de vendas diretas com upsell pós-checkout e retargeting de alto valor no Meta.',
        metric: '+142% vendas',
        metricSub: 'vs. mês anterior',
        url: 'lumibeauty.com.br/skincare',
        accent: '#db2777',
        accentRgb: '219,39,119',
        heroGradient: 'linear-gradient(135deg, #831843 0%, #3b0764 60%, #0f172a 100%)',
        tags: ['Upsell', 'Retargeting', 'ROAS'],
      },
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    projects: [
      {
        id: 'urban',
        client: 'UrbanStore',
        title: 'Moda Masculina',
        desc: 'Shopify Plus com checkout customizado, fluxo de LTV e recorrência via e-mail + SMS.',
        metric: 'R$ 2M',
        metricSub: 'em 90 dias',
        url: 'urbanstore.com.br',
        accent: '#6d28d9',
        accentRgb: '109,40,217',
        heroGradient: 'linear-gradient(135deg, #1e3a5f 0%, #3b0764 60%, #0f172a 100%)',
        tags: ['Shopify', 'Email', 'LTV'],
      },
      {
        id: 'casanorte',
        client: 'Casa Norte',
        title: 'Decoração & Casa',
        desc: 'Estrutura de funil com remarketing dinâmico de catálogo e campanhas de coleção no Meta.',
        metric: '3.6x ROAS',
        metricSub: 'média trimestral',
        url: 'casanorte.com.br',
        accent: '#0d9488',
        accentRgb: '13,148,136',
        heroGradient: 'linear-gradient(135deg, #064e3b 0%, #1e3a5f 60%, #0f172a 100%)',
        tags: ['Catálogo', 'Meta Ads', 'DPA'],
      },
      {
        id: 'pethaus',
        client: 'PetHaus',
        title: 'Pet Shop Online',
        desc: 'Escala de R$ 40k para R$ 280k/mês em 5 meses. Estrutura de mídia + CRO + automação.',
        metric: '+600%',
        metricSub: 'faturamento mensal',
        url: 'pethaus.com.br',
        accent: '#ea580c',
        accentRgb: '234,88,12',
        heroGradient: 'linear-gradient(135deg, #7c2d12 0%, #1c1917 60%, #0f172a 100%)',
        tags: ['CRO', 'Automação', 'Google Ads'],
      },
    ],
  },
  {
    id: 'gestao',
    label: 'Gestão de Tráfego',
    projects: [
      {
        id: 'dentemais',
        client: 'DenteMais',
        title: 'Clínica Odontológica',
        desc: 'Google Ads + Meta Ads para captação de pacientes com CPA controlado e funil de agendamento.',
        metric: '-44% CPA',
        metricSub: 'em 30 dias',
        url: 'dentemais.com.br/agendar',
        accent: '#2563eb',
        accentRgb: '37,99,235',
        heroGradient: 'linear-gradient(135deg, #1e3a8a 0%, #0c4a6e 60%, #0f172a 100%)',
        tags: ['Google Ads', 'Meta Ads', 'Lead Gen'],
      },
      {
        id: 'imovbr',
        client: 'ImovBR',
        title: 'Imobiliária Digital',
        desc: 'Tráfego pago qualificado para corretores com segmentação por bairro e perfil de comprador.',
        metric: '8x leads/mês',
        metricSub: 'vs. orgânico',
        url: 'imovbr.com.br',
        accent: '#7c3aed',
        accentRgb: '124,58,237',
        heroGradient: 'linear-gradient(135deg, #3b0764 0%, #4a044e 60%, #0f172a 100%)',
        tags: ['Lead Ads', 'Segmentação', 'CRM'],
      },
      {
        id: 'codeup',
        client: 'CodeUp',
        title: 'Curso Online',
        desc: 'Estrutura de lançamento com sequência de anúncios por fase, criativos testados e retargeting.',
        metric: 'R$ 1.2M',
        metricSub: 'em lançamento',
        url: 'codeup.com.br/turma',
        accent: '#0d9488',
        accentRgb: '13,148,136',
        heroGradient: 'linear-gradient(135deg, #064e3b 0%, #0c4a6e 60%, #0f172a 100%)',
        tags: ['Lançamento', 'VSL', 'Remarketing'],
      },
    ],
  },
];

/* ─── Fake website sections (CSS-rendered) ──────────────────── */
function FakeSite({ project }) {
  return (
    <div className="fakesite" style={{ '--accent': project.accent, '--accent-rgb': project.accentRgb }}>
      {/* Fake nav */}
      <div className="fakesite__nav">
        <div className="fakesite__nav-logo" />
        <div className="fakesite__nav-links">
          <div className="fakesite__bar fakesite__bar--sm" />
          <div className="fakesite__bar fakesite__bar--sm" />
          <div className="fakesite__bar fakesite__bar--sm" />
        </div>
        <div className="fakesite__nav-btn" />
      </div>

      {/* Fake hero */}
      <div className="fakesite__hero" style={{ background: project.heroGradient }}>
        <div className="fakesite__hero-badge" />
        <div className="fakesite__bar fakesite__bar--xl" style={{ marginBottom: 10 }} />
        <div className="fakesite__bar fakesite__bar--lg" style={{ marginBottom: 6 }} />
        <div className="fakesite__bar fakesite__bar--md fakesite__bar--muted" style={{ marginBottom: 24 }} />
        <div className="fakesite__hero-actions">
          <div className="fakesite__hero-btn" />
          <div className="fakesite__hero-btn fakesite__hero-btn--ghost" />
        </div>
        <div className="fakesite__hero-metrics">
          {[0,1,2].map(i => (
            <div key={i} className="fakesite__hero-metric">
              <div className="fakesite__bar fakesite__bar--num" />
              <div className="fakesite__bar fakesite__bar--xs fakesite__bar--muted" />
            </div>
          ))}
        </div>
      </div>

      {/* Fake features */}
      <div className="fakesite__section">
        <div className="fakesite__section-head">
          <div className="fakesite__bar fakesite__bar--eyebrow" />
          <div className="fakesite__bar fakesite__bar--xl" style={{ marginBottom: 6 }} />
          <div className="fakesite__bar fakesite__bar--md fakesite__bar--muted" />
        </div>
        <div className="fakesite__grid3">
          {[0,1,2].map(i => (
            <div key={i} className="fakesite__card">
              <div className="fakesite__card-icon" />
              <div className="fakesite__bar fakesite__bar--md" style={{ marginBottom: 6 }} />
              <div className="fakesite__bar fakesite__bar--sm fakesite__bar--muted" />
              <div className="fakesite__bar fakesite__bar--sm fakesite__bar--muted" style={{ width: '70%' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Fake stats bar */}
      <div className="fakesite__stats">
        {[0,1,2].map(i => (
          <div key={i} className="fakesite__stat">
            <div className="fakesite__bar fakesite__bar--num fakesite__bar--accent" />
            <div className="fakesite__bar fakesite__bar--xs fakesite__bar--muted" />
          </div>
        ))}
      </div>

      {/* Fake testimonial */}
      <div className="fakesite__section">
        <div className="fakesite__section-head">
          <div className="fakesite__bar fakesite__bar--eyebrow" />
          <div className="fakesite__bar fakesite__bar--lg" />
        </div>
        <div className="fakesite__grid2">
          {[0,1].map(i => (
            <div key={i} className="fakesite__testi">
              <div className="fakesite__stars" />
              <div className="fakesite__bar fakesite__bar--md fakesite__bar--muted" />
              <div className="fakesite__bar fakesite__bar--sm fakesite__bar--muted" style={{ width: '80%' }} />
              <div className="fakesite__testi-author">
                <div className="fakesite__avatar" />
                <div>
                  <div className="fakesite__bar fakesite__bar--sm" style={{ marginBottom: 4 }} />
                  <div className="fakesite__bar fakesite__bar--xs fakesite__bar--muted" style={{ width: 80 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fake CTA */}
      <div className="fakesite__cta">
        <div className="fakesite__bar fakesite__bar--xl" style={{ marginBottom: 10 }} />
        <div className="fakesite__bar fakesite__bar--md fakesite__bar--muted" style={{ marginBottom: 24 }} />
        <div className="fakesite__cta-btn" />
      </div>
    </div>
  );
}

/* ─── Browser mockup ────────────────────────────────────────── */
function BrowserMockup({ project, onExpand }) {
  const viewportRef  = useRef(null);
  const contentRef   = useRef(null);
  const scrollTween  = useRef(null);

  const startScroll = useCallback(() => {
    const content   = contentRef.current;
    const viewport  = viewportRef.current;
    if (!content || !viewport) return;

    const totalH   = content.scrollHeight;
    const viewH    = viewport.clientHeight;
    const distance = totalH - viewH;
    if (distance <= 0) return;

    gsap.set(content, { y: 0 });

    scrollTween.current = gsap.to(content, {
      y: -distance,
      duration: distance / 40, // ~40px/s — slow browse feel
      ease: 'none',
      repeat: -1,
      yoyo: true,
      yoyoEase: 'power1.inOut',
    });
  }, []);

  const pauseScroll = () => scrollTween.current?.pause();
  const resumeScroll = () => scrollTween.current?.play();

  /* Re-launch scroll when project changes */
  useEffect(() => {
    scrollTween.current?.kill();

    const content  = contentRef.current;
    if (!content) return;

    // flash transition
    gsap.fromTo(
      viewportRef.current,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out',
        onComplete: startScroll }
    );

    return () => scrollTween.current?.kill();
  }, [project.id, startScroll]);

  return (
    <div className="wt2-browser">
      {/* Browser chrome */}
      <div className="wt2-chrome">
        <div className="wt2-chrome__dots">
          <span style={{ background: '#ff5f57' }} />
          <span style={{ background: '#febc2e' }} />
          <span style={{ background: '#28c840' }} />
        </div>
        <div className="wt2-chrome__url">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1a5 5 0 1 1 0 10A5 5 0 0 1 6 1zM6 3v3l2 1" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span>{project.url}</span>
        </div>
        <button
          className="wt2-chrome__expand"
          onClick={onExpand}
          title="Inspecionar site"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 5V2h3M9 2h3v3M12 9v3H9M5 12H2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Viewport (overflow hidden, auto-scrolls) */}
      <div
        ref={viewportRef}
        className="wt2-viewport"
        onMouseEnter={pauseScroll}
        onMouseLeave={resumeScroll}
      >
        <div ref={contentRef} className="wt2-content">
          <FakeSite project={project} />
        </div>

        {/* Hover hint */}
        <div className="wt2-viewport__hint">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Pausar scroll
        </div>

        {/* Click-to-expand overlay */}
        <button className="wt2-viewport__expand-btn" onClick={onExpand} aria-label="Inspecionar site">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 7V3h4M13 3h4v4M17 13v4h-4M7 17H3v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Inspecionar site
        </button>
      </div>
    </div>
  );
}

/* ─── Fullscreen inspect modal ──────────────────────────────── */
function InspectModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const panelRef   = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    gsap.fromTo(panelRef.current,
      { y: 40, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
    );
    return () => { document.body.style.overflow = ''; };
  }, []);

  const close = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    gsap.to(panelRef.current, {
      y: 30, opacity: 0, scale: 0.97, duration: 0.25,
      onComplete: onClose,
    });
  };

  return (
    <div className="wt2-modal" ref={overlayRef} onClick={(e) => e.target === overlayRef.current && close()}>
      <div className="wt2-modal__panel" ref={panelRef}>
        {/* Modal chrome */}
        <div className="wt2-modal__chrome">
          <div className="wt2-chrome__dots">
            <span style={{ background: '#ff5f57' }} />
            <span style={{ background: '#febc2e' }} />
            <span style={{ background: '#28c840' }} />
          </div>
          <div className="wt2-chrome__url">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
              <path d="M6 3.5c-1.5 0-2.5 1-2.5 2.5s1 2.5 2.5 2.5M6 3.5c.8 0 1.5 1 1.5 2.5s-.7 2.5-1.5 2.5M3.5 6h5" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
            </svg>
            <span>{project.url}</span>
          </div>
          <button className="wt2-modal__close" onClick={close} aria-label="Fechar">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        {/* Scrollable site */}
        <div className="wt2-modal__body">
          <FakeSite project={project} />
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────── */
export default function WorkTabs() {
  const [catIdx,     setCatIdx]     = useState(0);
  const [projectIdx, setProjectIdx] = useState(0);
  const [inspecting, setInspecting] = useState(false);

  const sectionRef  = useRef(null);
  const listRef     = useRef(null);
  const itemsRef    = useRef([]);
  const prevCat     = useRef(0);

  const currentCat     = CATEGORIES[catIdx];
  const currentProject = currentCat.projects[projectIdx];

  /* Section entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, []);

  /* Animate list items on cat/project change */
  useEffect(() => {
    const items = itemsRef.current.filter(Boolean);
    gsap.fromTo(items,
      { x: -16, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out', stagger: 0.07 }
    );
  }, [catIdx]);

  const switchCat = (idx) => {
    if (idx === catIdx) return;
    prevCat.current = catIdx;
    setCatIdx(idx);
    setProjectIdx(0);
  };

  const switchProject = (idx) => {
    if (idx === projectIdx) return;
    setProjectIdx(idx);
  };

  return (
    <>
      <section id="portfolio" className="wt2-section section" ref={sectionRef}>
        <div className="container">

          {/* Header */}
          <div className="wt2-header">
            <span className="eyebrow">Portfólio</span>
            <h2 className="section-title">Trabalhos que falam por si.</h2>
            <p className="section-desc">
              Cases reais — explore cada projeto como se estivesse navegando no site.
            </p>
          </div>

          {/* Category tabs */}
          <div className="wt2-cats">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.id}
                className={`wt2-cat${i === catIdx ? ' wt2-cat--active' : ''}`}
                onClick={() => switchCat(i)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Main split layout */}
          <div className="wt2-split">

            {/* Left: browser mockup */}
            <div className="wt2-left">
              <BrowserMockup
                key={currentProject.id}
                project={currentProject}
                onExpand={() => setInspecting(true)}
              />

              {/* Project meta below browser */}
              <div className="wt2-meta">
                <div className="wt2-meta__result">
                  <span className="wt2-meta__value">{currentProject.metric}</span>
                  <span className="wt2-meta__sub">{currentProject.metricSub}</span>
                </div>
                <div className="wt2-meta__tags">
                  {currentProject.tags.map(t => (
                    <span key={t} className="wt2-meta__tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: project list */}
            <div className="wt2-right" ref={listRef}>
              <p className="wt2-right__label">Projetos</p>
              <div className="wt2-list">
                {currentCat.projects.map((p, i) => (
                  <button
                    key={p.id}
                    ref={el => (itemsRef.current[i] = el)}
                    className={`wt2-item${i === projectIdx ? ' wt2-item--active' : ''}`}
                    onClick={() => switchProject(i)}
                    style={{ '--accent': p.accent }}
                  >
                    <span className="wt2-item__num">0{i + 1}</span>
                    <div className="wt2-item__text">
                      <span className="wt2-item__client">{p.client}</span>
                      <span className="wt2-item__title">{p.title}</span>
                      <span className="wt2-item__desc">{p.desc}</span>
                    </div>
                    <div className="wt2-item__metric">
                      <span className="wt2-item__metric-val">{p.metric}</span>
                      <span className="wt2-item__metric-sub">{p.metricSub}</span>
                    </div>
                    <div className="wt2-item__bar" />
                  </button>
                ))}
              </div>

              <button
                className="wt2-inspect-cta"
                onClick={() => setInspecting(true)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 5V2h3M11 2h3v3M14 11v3h-3M5 14H2v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Inspecionar este site
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Fullscreen inspect modal */}
      {inspecting && (
        <InspectModal
          project={currentProject}
          onClose={() => setInspecting(false)}
        />
      )}
    </>
  );
}
