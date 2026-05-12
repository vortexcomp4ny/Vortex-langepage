/**
 * MarqueeBand — Faixa horizontal com texto rolando em loop infinito.
 * Usa duplicação do conteúdo + CSS animation pra loop seamless.
 */
export default function MarqueeBand({ items, speed = 40 }) {
  const defaultItems = [
    'Performance',
    'Conversão',
    'Escala',
    'Sites de alto padrão',
    'Landing Pages',
    'Tráfego Pago',
    'Copy que vende',
    'Vortex',
  ];
  const list = items ?? defaultItems;

  return (
    <div className="marquee-band" aria-hidden="true">
      <div className="marquee-band__fade marquee-band__fade--left" />
      <div className="marquee-band__fade marquee-band__fade--right" />
      <div className="marquee-band__track" style={{ '--marquee-duration': `${speed}s` }}>
        {/* Duplicado 2× pra loop seamless */}
        {[0, 1].map((dup) => (
          <div key={dup} className="marquee-band__row" aria-hidden={dup === 1}>
            {list.map((item, i) => (
              <span key={`${dup}-${i}`} className="marquee-band__item">
                <span className="marquee-band__text">{item}</span>
                <span className="marquee-band__sep" aria-hidden="true">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
