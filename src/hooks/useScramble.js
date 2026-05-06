import { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?';

/**
 * Scramble-text hacker effect.
 *
 * @param {string}  text      - Final text to reveal.
 * @param {object}  options
 * @param {number}  options.duration   - Total animation time in ms (default 1200).
 * @param {number}  options.delay      - Delay before starting in ms (default 0).
 * @param {boolean} options.trigger    - Set to true to start / restart the effect.
 */
export default function useScramble(text, { duration = 1200, delay = 0, trigger = true } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!trigger || !ref.current) return;

    const el = ref.current;
    const len = text.length;
    const start = performance.now() + delay;
    let raf;

    const frame = (now) => {
      if (now < start) {
        raf = requestAnimationFrame(frame);
        return;
      }

      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // How many chars are "locked" (revealed)
      const locked = Math.floor(progress * len);

      let output = '';
      for (let i = 0; i < len; i++) {
        if (text[i] === ' ') {
          output += ' ';
        } else if (i < locked) {
          output += text[i];
        } else {
          output += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      el.textContent = output;

      if (progress < 1) {
        raf = requestAnimationFrame(frame);
      } else {
        el.textContent = text;
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [text, duration, delay, trigger]);

  return ref;
}
