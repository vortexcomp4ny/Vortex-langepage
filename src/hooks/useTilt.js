import { useRef } from 'react';
import { gsap } from 'gsap';

export default function useTilt({ max = 18, scale = 1.04, speed = 0.4 } = {}) {
  const cardRef = useRef(null);
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
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;

    rotX.current(-y * max);
    rotY.current( x * max);
    gsap.to(el, { scale, duration: speed, ease: 'power2.out' });
  };

  const onMouseLeave = () => {
    const el = cardRef.current;
    if (!el || !rotX.current) return;
    rotX.current(0);
    rotY.current(0);
    gsap.to(el, { scale: 1, duration: speed * 1.5, ease: 'power3.out' });
  };

  return { cardRef, onMouseMove, onMouseLeave };
}
