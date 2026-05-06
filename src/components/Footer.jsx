const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.2 8.6V7.2c0-.7.5-1.1 1.2-1.1h1.8V3.3c-.8-.1-1.7-.2-2.6-.2-2.6 0-4.3 1.6-4.3 4.4v1.1H7.5v3.2h2.8v8.9h3.9v-8.9h2.7l.5-3.2h-3.2Z" />
      </svg>
    ),
  },
  {
    label: 'Discord',
    href: 'https://discord.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.2 7.4c2.4-.8 5.2-.8 7.6 0l.4.1 1.2-2.1c1.9.6 3.3 1.5 4.5 2.6-.4 5.7-2.4 9.3-5.1 11.1-1.1-.1-2.2-.5-3.1-1.1l.7-1.1c-1.6.5-3.2.5-4.8 0l.7 1.1c-.9.6-2 1-3.1 1.1-2.7-1.8-4.7-5.4-5.1-11.1 1.2-1.1 2.6-2 4.5-2.6l1.2 2.1.4-.1Zm.7 6.8c.8 0 1.4-.7 1.4-1.6S9.7 11 8.9 11s-1.4.7-1.4 1.6.6 1.6 1.4 1.6Zm6.2 0c.8 0 1.4-.7 1.4-1.6s-.6-1.6-1.4-1.6-1.4.7-1.4 1.6.6 1.6 1.4 1.6Z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#topo" className="footer__logo" aria-label="Vortex">
            <span className="footer__logo-mark">V</span>
            <span className="footer__logo-text">Vortex</span>
          </a>
          <p className="footer__copy">
            Performance criativa para marcas ambiciosas.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Políticas">
          <a href="#privacidade">Política de privacidade</a>
          <a href="#termos">Termos de uso</a>
          <a href="#cookies">Política de cookies</a>
        </nav>

        <div className="footer__social" aria-label="Redes sociais">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="footer__social-link"
              aria-label={social.label}
              target="_blank"
              rel="noreferrer"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© 2026 Vortex. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
