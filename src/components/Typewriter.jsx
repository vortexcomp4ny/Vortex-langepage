import { useEffect, useRef, useState } from 'react';

/**
 * Types text letter by letter with a blinking cursor.
 *
 * Props:
 *  - text      {string|string[]}  — one string or array of strings to cycle through
 *  - speed     {number}           — ms per character (default: 45)
 *  - delay     {number}           — ms before starting (default: 0)
 *  - pause     {number}           — ms to hold completed text before erasing (default: 2000)
 *  - className {string}
 */
export default function Typewriter({ text, speed = 45, delay = 0, pause = 2000, className }) {
  const phrases = Array.isArray(text) ? text : [text];
  const [displayed, setDisplayed] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const state = useRef({ phraseIndex: 0, charIndex: 0, erasing: false, started: false });

  /* blinking cursor */
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  /* typing loop */
  useEffect(() => {
    let timeout;

    const tick = () => {
      const s = state.current;
      const phrase = phrases[s.phraseIndex];

      if (!s.erasing) {
        if (s.charIndex <= phrase.length) {
          setDisplayed(phrase.slice(0, s.charIndex));
          s.charIndex++;
          timeout = setTimeout(tick, speed);
        } else {
          // finished typing — pause then erase (only if multiple phrases)
          if (phrases.length > 1) {
            timeout = setTimeout(() => {
              s.erasing = true;
              tick();
            }, pause);
          }
          // single phrase: just stop (cursor keeps blinking)
        }
      } else {
        if (s.charIndex > 0) {
          s.charIndex--;
          setDisplayed(phrase.slice(0, s.charIndex));
          timeout = setTimeout(tick, speed / 2);
        } else {
          s.erasing = false;
          s.phraseIndex = (s.phraseIndex + 1) % phrases.length;
          timeout = setTimeout(tick, 400);
        }
      }
    };

    timeout = setTimeout(() => {
      state.current = { phraseIndex: 0, charIndex: 0, erasing: false };
      tick();
    }, delay);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className={className}>
      {displayed}
      <span className="typewriter-cursor" aria-hidden="true" style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
    </span>
  );
}
