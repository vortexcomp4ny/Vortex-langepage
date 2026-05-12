import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  black: '#050508',
  ink: '#0b0b12',
};

/**
 * SectionDivider — Divisor de seção com gradient interno pra evitar quebra
 * visual entre seções de bg diferente (`--black` vs `--ink`).
 *
 * Props:
 *  - variant: 'wave' | 'diagonal' | 'aurora' | 'pulse'
 *  - from: 'black' | 'ink'   → cor do TOPO do divider (= cor da section anterior)
 *  - to:   'black' | 'ink'   → cor da BASE do divider (= cor da section seguinte)
 */
export default function SectionDivider({
  variant = 'wave',
  from = 'black',
  to = 'black',
}) {
  const ref = useRef(null);

  const bgStyle = {
    background: `linear-gradient(180deg, ${COLORS[from]} 0%, ${COLORS[to]} 100%)`,
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (variant === 'wave') {
        gsap.fromTo(
          el.querySelector('.sd-wave__path'),
          { strokeDasharray: 1200, strokeDashoffset: 1200 },
          {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
          },
        );
      } else if (variant === 'diagonal') {
        gsap.fromTo(
          el.querySelector('.sd-diagonal__line'),
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
          },
        );
      } else if (variant === 'aurora') {
        gsap.fromTo(
          el.querySelectorAll('.sd-aurora__orb'),
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.6,
            ease: 'power2.out',
            stagger: 0.18,
            scrollTrigger: { trigger: el, start: 'top 90%' },
          },
        );
      }
    }, el);
    return () => ctx.revert();
  }, [variant]);

  if (variant === 'aurora') {
    return (
      <div ref={ref} className="sd-aurora" style={bgStyle} aria-hidden="true">
        <div className="sd-aurora__orb sd-aurora__orb--1" />
        <div className="sd-aurora__orb sd-aurora__orb--2" />
        <div className="sd-aurora__orb sd-aurora__orb--3" />
      </div>
    );
  }

  if (variant === 'wave') {
    return (
      <div ref={ref} className="sd-wave" style={bgStyle} aria-hidden="true">
        <svg className="sd-wave__svg" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`sd-wave-grad-${from}-${to}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="rgba(167, 139, 250, 0)" />
              <stop offset="20%"  stopColor="rgba(167, 139, 250, 0.6)" />
              <stop offset="50%"  stopColor="rgba(124, 58, 237, 0.9)" />
              <stop offset="80%"  stopColor="rgba(167, 139, 250, 0.6)" />
              <stop offset="100%" stopColor="rgba(167, 139, 250, 0)" />
            </linearGradient>
            <filter id={`sd-wave-glow-${from}-${to}`}>
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            className="sd-wave__path"
            d="M0 50 Q 150 10, 300 50 T 600 50 T 900 50 T 1200 50"
            fill="none"
            stroke={`url(#sd-wave-grad-${from}-${to})`}
            strokeWidth="2"
            strokeLinecap="round"
            filter={`url(#sd-wave-glow-${from}-${to})`}
          />
        </svg>
      </div>
    );
  }

  if (variant === 'diagonal') {
    return (
      <div ref={ref} className="sd-diagonal" style={bgStyle} aria-hidden="true">
        <span className="sd-diagonal__line" />
      </div>
    );
  }

  return null;
}
