import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CursorCustom() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;

    /* quickTo: creates a cached setter for maximum performance */
    const dotX  = gsap.quickTo(dot,  'x', { duration: 0.15, ease: 'power3.out' });
    const dotY  = gsap.quickTo(dot,  'y', { duration: 0.15, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.5,  ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.5,  ease: 'power3.out' });

    const onMove = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    /* Scale ring on interactive elements */
    const onEnter = () => gsap.to(ring, { scale: 2, duration: 0.3, ease: 'power2.out' });
    const onLeave = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' });

    window.addEventListener('mousemove', onMove);

    const targets = document.querySelectorAll('a, button, [data-cursor]');
    targets.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
