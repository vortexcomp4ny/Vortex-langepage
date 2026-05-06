import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const METRICS = [
  { prefix: '',    target: 4.8,  suffix: 'x',  decimals: 1, label: 'ROAS Médio' },
  { prefix: '',    target: 120,  suffix: '+',   decimals: 0, label: 'Landing Pages Publicadas' },
  { prefix: 'R$', target: 38,   suffix: 'M',   decimals: 0, label: 'Receita Gerada' },
];

function MetricCell({ prefix, target, suffix, decimals, label, delay }) {
  const cellRef  = useRef(null);
  const valueRef = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const cell  = cellRef.current;
    const value = valueRef.current;
    if (!cell || !value) return;

    /* CountUp triggers via IntersectionObserver */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animated.current) return;
        animated.current = true;
        observer.disconnect();

        /* Fade cell in */
        gsap.to(cell, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          delay,
        });

        /* Count up */
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          delay,
          onUpdate() {
            value.textContent =
              `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
          },
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(cell);
    return () => observer.disconnect();
  }, [delay, decimals, prefix, suffix, target]);

  return (
    <div ref={cellRef} className="metric-cell">
      <div className="metric-cell__value">
        <span ref={valueRef}>{prefix}0{suffix}</span>
      </div>
      <div className="metric-cell__label">{label}</div>
    </div>
  );
}

export default function Metrics() {
  return (
    <section id="metricas" className="metrics section">
      <div className="container">
        <div className="metrics__header">
          <span className="eyebrow">Resultados</span>
          <h2 className="section-title">Números que provam a operação.</h2>
          <p className="section-desc">
            Métricas reais de clientes reais. Sem estimativas, sem benchmarks
            genéricos — só o que construímos juntos.
          </p>
        </div>

        <div className="metrics__grid">
          {METRICS.map((m, i) => (
            <MetricCell key={m.label} {...m} delay={i * 0.13} />
          ))}
        </div>
      </div>
    </section>
  );
}
