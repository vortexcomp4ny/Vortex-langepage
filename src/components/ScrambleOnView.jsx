import { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?';

/**
 * Renders text with a scramble/hacker effect when it scrolls into view.
 *
 * Props:
 *  - text      {string}  — final text to display
 *  - as        {string}  — HTML tag (default: 'span')
 *  - duration  {number}  — animation duration in ms (default: 1000)
 *  - delay     {number}  — delay after entering view in ms (default: 0)
 *  - className {string}  — forwarded className
 */
export default function ScrambleOnView({ text, as: Tag = 'span', duration = 1000, delay = 0, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf;

    const runScramble = () => {
      const len = text.length;
      const start = performance.now() + delay;

      const frame = (now) => {
        if (now < start) { raf = requestAnimationFrame(frame); return; }

        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const locked = Math.floor(progress * len);

        let output = '';
        for (let i = 0; i < len; i++) {
          if (text[i] === ' ') output += ' ';
          else if (i < locked) output += text[i];
          else output += CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        el.textContent = output;
        if (progress < 1) raf = requestAnimationFrame(frame);
        else el.textContent = text;
      };

      raf = requestAnimationFrame(frame);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runScramble();
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [text, duration, delay]);

  return <Tag ref={ref} className={className}>{text}</Tag>;
}
