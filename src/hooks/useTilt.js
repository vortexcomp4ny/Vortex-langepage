import { useRef } from 'react';
import { gsap } from 'gsap';

/**
 * 3-D tilt on mouse move with GSAP quickTo.
 * Returns { cardRef, glareRef } — attach them to the card and the glare overlay.
 *
 * @param {object} opts
 * @param {number} opts.max      - Max rotation in degrees (default 18)
 * @param {number} opts.scale    - Scale on hover (default 1.04)
 * @param {number} opts.speed    - Animation duration in seconds (default 0.4)
 */
export default function useTilt({ max = 18, scale = 1.04, speed = 0.4 } = {}) {
  const cardRef  = useRef(null);
  const glareRef = useRef(null);

  const rotX = useRef(null);
  const rotY = useRef(null);

  const init = (el) => {
    if (!el || rotX.current) return;
    rotX.current = gsap.quickTo(el, 'rotateX', { duration: speed, ease: 'power2.out' });
    rotY.current = gsap.quickTo(el, 'rotateY', { duration: speed, ease: 'power2.out' });
  };

  const onMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    init(el);

    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;   // -0.5 … 0.5
    const y = (e.clientY - top)  / height - 0.5;

    rotX.current(-y * max);
    rotY.current( x * max);
    gsap.to(el, { scale, duration: speed, ease: 'power2.out' });

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0.18,
        x: `${(x + 0.5) * 100}%`,
        y: `${(y + 0.5) * 100}%`,
        duration: speed,
        ease: 'power2.out',
      });
    }
  };

  const onMouseLeave = () => {
    const el = cardRef.current;
    if (!el || !rotX.current) return;
    rotX.current(0);
    rotY.current(0);
    gsap.to(el, { scale: 1, duration: speed * 1.5, ease: 'power3.out' });
    if (glareRef.current) gsap.to(glareRef.current, { opacity: 0, duration: 0.3 });
  };

  return { cardRef, glareRef, onMouseMove, onMouseLeave };
}
