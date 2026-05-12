import { useEffect, useRef } from 'react';

/**
 * GlowCard — Spotlight glow seguindo o cursor (bg + border).
 *
 * Adaptado do snippet TSX/Tailwind enviado por Augustus em 2026-05-11
 * pra JSX puro + CSS. Reescrito em 2026-05-12 pra usar a técnica
 * "padding-mask exclude" (mais robusta cross-browser que a original
 * com mask-composite: intersect que quebra em Chrome 119+).
 *
 * Props:
 *  - glowColor: 'purple' (default) | 'blue' | 'green'
 */
const GLOW_HSL = {
  purple: '280 80% 65%',
  blue:   '220 80% 65%',
  green:  '150 70% 55%',
};

export default function GlowCard({
  children,
  className = '',
  glowColor = 'purple',
  ...rest
}) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let rafId = null;
    const onPointerMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        rafId = null;
      });
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`glow-card ${className}`.trim()}
      style={{ '--glow-hsl': GLOW_HSL[glowColor] ?? GLOW_HSL.purple }}
      {...rest}
    >
      {children}
    </div>
  );
}
