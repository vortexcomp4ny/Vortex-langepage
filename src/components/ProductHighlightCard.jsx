import { forwardRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * ProductHighlightCard — Card 3D com tilt seguindo o mouse + glow radial.
 *
 * Adaptado do snippet TSX/Tailwind/shadcn enviado por Augustus em 2026-05-11
 * pra JSX puro + CSS próprio (projeto não tem Tailwind ativo).
 * Mantém: framer-motion (useMotionValue + useSpring + useTransform), tilt 3D
 * com perspective, glow radial seguindo mouse, imagem em translateZ (parallax).
 */
const ProductHighlightCard = forwardRef(function ProductHighlightCard(
  {
    category,
    title,
    description,
    imageSrc,
    imageAlt,
    imageWidth,
    imageHeight,
    tags = [],
    badge,
    className = '',
    accent = '#a78bfa',
    ...rest
  },
  ref,
) {
  const mouseX = useMotionValue(175);
  const mouseY = useMotionValue(175);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX.set(175);
    mouseY.set(175);
  };

  const rotateX = useTransform(mouseY, [0, 350], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 350], [-10, 10]);

  const springConfig = { stiffness: 300, damping: 25 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const glowX = useTransform(mouseX, [0, 350], [0, 100]);
  const glowY = useTransform(mouseY, [0, 350], [0, 100]);
  const glowOpacity = useTransform(mouseX, [0, 175, 350], [0, 0.55, 0]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`phc ${className}`.trim()}
      {...rest}
    >
      <div className="phc__inner" style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {/* Grid texture */}
        <div className="phc__grid" aria-hidden="true" />

        {/* Glow radial seguindo mouse */}
        <motion.div
          className="phc__glow"
          aria-hidden="true"
          style={{
            opacity: glowOpacity,
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(180px at ${x}% ${y}%, ${accent}99, transparent 60%)`,
            ),
          }}
        />

        {/* Content */}
        <div className="phc__content">
          <div className="phc__category">
            {badge && <span className="phc__badge">{badge}</span>}
            <span className="phc__category-label">{category}</span>
          </div>

          <div className="phc__bottom">
            <h3 className="phc__title">{title}</h3>
            <p className="phc__desc">{description}</p>
            {tags.length > 0 && (
              <div className="phc__tags">
                {tags.map((t) => (
                  <span key={t} className="phc__tag">{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Logo image em translateZ (parallax 3D) */}
        <motion.img
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          loading="lazy"
          decoding="async"
          draggable="false"
          style={{ transform: 'translateZ(60px)' }}
          whileHover={{ scale: 1.12, y: -12, x: 6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          className="phc__image"
        />
      </div>
    </motion.div>
  );
});

export default ProductHighlightCard;
