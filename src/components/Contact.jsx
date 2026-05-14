import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ButtonCta from './ButtonCta.jsx';

const BULLETS = [
  'Resposta no WhatsApp na hora',
  'Orçamento sem enrolação',
  'Você fala com quem vai fazer o trabalho',
];

function IconCheck() {
  return (
    <svg className="contact__bullet-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l4 4 8-8" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function IconArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12 12 4M4 4h8v8" />
    </svg>
  );
}

export default function Contact() {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: { trigger: cardRef.current, start: 'top 78%' },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="contato" className="contact section">
      <div className="container">
        <div ref={cardRef} className="contact__card">
          <div className="contact__inner">
            <div>
              <span className="eyebrow">Fale com a Vortex</span>
              <h2 className="contact__title">
                Manda o que você precisa que a gente responde rápido.
              </h2>
              <p className="contact__sub">
                Sem formulário longo, sem agendamento de "call de descoberta".
                Chama no WhatsApp, conta seu projeto, e a gente responde
                na hora.
              </p>
            </div>

            <div>
              <div className="contact__bullets">
                {BULLETS.map((b) => (
                  <div key={b} className="contact__bullet">
                    <IconCheck />
                    {b}
                  </div>
                ))}
              </div>

              <div className="contact__actions">
                <ButtonCta
                  href="https://wa.me/5551981335440?text=Oi%2C%20quero%20conhecer%20a%20Vortex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta--lg"
                >
                  <IconWhatsApp />
                  Falar no WhatsApp
                </ButtonCta>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
