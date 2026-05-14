import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { label: 'Serviços',         href: '#servicos' },
  { label: 'Como trabalhamos', href: '#como-funciona' },
  { label: 'Equipe',           href: '#equipe' },
  { label: 'Planos',           href: '#planos' },
];

function WhatsAppIcon() {
  return (
    <svg
      className="header__whatsapp-icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.47 17.51 2 12.04 2Zm5.77 14.17c-.24.67-1.4 1.28-1.95 1.36-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.16-4.93-4.35-.15-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.3.59-.37.78-.37h.56c.18.01.42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.32.02.51-.1.2-.15.32-.3.49-.15.17-.32.38-.45.51-.15.15-.31.31-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.07 1.3 2.36 1.45.29.14.47.12.64-.07.2-.22.74-.86.94-1.15.2-.29.39-.24.66-.15.27.1 1.71.81 2 .96.29.14.49.22.56.34.07.12.07.7-.17 1.37Z"
      />
    </svg>
  );
}

export default function Header() {
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Entrada */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.1,
      });
    });
    return () => ctx.revert();
  }, []);

  /* Scroll: adiciona fundo sólido quando rola */
  useEffect(() => {
    const el = headerRef.current;
    const onScroll = () => {
      if (window.scrollY > 80) {
        el.classList.add('header--scrolled');
      } else {
        el.classList.remove('header--scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header ref={headerRef} className="header">
      <div className="header__inner container">

        {/* Logo */}
        <a href="#topo" className="header__logo" aria-label="Vortex">
          <img src="/vortex-logo.webp" alt="Vortex" className="header__logo-img" width={480} height={65} decoding="async" />
        </a>

        {/* Nav desktop */}
        <nav className="header__nav" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="header__link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <a
          href="https://wa.me/5551981335440"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
        >
          <WhatsAppIcon />
          <span>Falar com a Vortex</span>
        </a>

        {/* Hamburger mobile */}
        <button
          className={`header__burger${menuOpen ? ' header__burger--open' : ''}`}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="header__mobile-menu">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="header__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/5551981335440"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
            style={{ marginTop: '8px', width: '100%', justifyContent: 'center' }}
            onClick={() => setMenuOpen(false)}
          >
            <WhatsAppIcon />
            <span>Falar com a Vortex no WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
}
