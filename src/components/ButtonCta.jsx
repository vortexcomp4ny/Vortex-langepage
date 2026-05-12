/**
 * ButtonCta — Botão premium dark com multi-layer gradient + glow lilás.
 * Renderiza <a> se receber `href`, senão <button>.
 *
 * Adaptado do snippet TSX/Tailwind enviado por Augustus em 2026-05-11
 * (originalmente shadcn/ui + cn helper). Convertido pra JSX puro + classes CSS
 * próprias porque o projeto não tem Tailwind ativo.
 */
export default function ButtonCta({
  label,
  href,
  onClick,
  className = '',
  children,
  target,
  rel,
  ...rest
}) {
  const Component = href ? 'a' : 'button';
  const content = label ?? children;

  return (
    <Component
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={`btn-cta ${className}`.trim()}
      {...rest}
    >
      {/* Borda em gradient */}
      <span className="btn-cta__border" aria-hidden="true" />

      {/* Fundo escuro (camada base) */}
      <span className="btn-cta__inset btn-cta__inset--base" aria-hidden="true" />

      {/* Gradientes empilhados pra dar profundidade */}
      <span className="btn-cta__inset btn-cta__inset--gradient-x" aria-hidden="true" />
      <span className="btn-cta__inset btn-cta__inset--gradient-y" aria-hidden="true" />
      <span className="btn-cta__inset btn-cta__inset--gradient-diag" aria-hidden="true" />

      {/* Glow inset lilás */}
      <span className="btn-cta__inset btn-cta__inset--glow" aria-hidden="true" />

      {/* Camada de hover */}
      <span className="btn-cta__inset btn-cta__inset--hover" aria-hidden="true" />

      {/* Conteúdo */}
      <span className="btn-cta__content">
        <span className="btn-cta__label">{content}</span>
      </span>
    </Component>
  );
}
