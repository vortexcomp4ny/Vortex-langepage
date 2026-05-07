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
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.5 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3 9h3v12H3V9Zm6 0h2.9v1.6c.4-.7 1.4-1.9 3.4-1.9 3.6 0 4.2 2.4 4.2 5.4V21h-3v-6.3c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H9V9Z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.5 6.6s-.2-1.6-.9-2.3c-.9-.9-1.8-.9-2.3-1C17.1 3.1 12 3.1 12 3.1s-5.1 0-7.3.2c-.5.1-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S1.2 8.5 1.2 10.3v1.7c0 1.8.3 3.7.3 3.7s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.5.2 7.5.2s5.1 0 7.3-.3c.5-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.3-1.9.3-3.7v-1.7c-.1-1.8-.4-3.6-.7-3.6ZM9.7 14.8V8.7l6.2 3.1-6.2 3Z" />
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
            <img src="/log.png" alt="Vortex" className="footer__logo-img" />
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
