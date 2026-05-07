import { useEffect } from 'react';

/**
 * Gera um som de clique sintético estilo Opera usando Web Audio API.
 * Nenhum arquivo de áudio necessário — tudo é gerado no browser.
 */
function playClickSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    // --- Tick mecânico (ruído branco filtrado) ---
    const bufferSize = ctx.sampleRate * 0.04; // 40ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Filtro passa-banda para dar caráter "click"
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3200;
    filter.Q.value = 0.8;

    // Envelope de amplitude
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(ctx.currentTime);
    noise.stop(ctx.currentTime + 0.04);

    // --- Tom grave rápido (body do clique) ---
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.03);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.12, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.03);

    // Fecha o contexto após o som terminar
    setTimeout(() => ctx.close(), 200);
  } catch (_) {
    // Web Audio não disponível — silêncio
  }
}

/**
 * Hook que adiciona som de clique a todos os botões e links .btn da página.
 * Chame uma vez em App.jsx.
 */
export function useButtonSound() {
  useEffect(() => {
    const SELECTORS = 'button, a.btn, .btn, .plan-card__cta, .header__link, .header__mobile-link';

    function handleClick(e) {
      const target = e.target.closest(SELECTORS);
      if (target) playClickSound();
    }

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);
}
