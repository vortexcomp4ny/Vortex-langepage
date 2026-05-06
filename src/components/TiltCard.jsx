import { forwardRef } from 'react';
import useTilt from '../hooks/useTilt';

/**
 * Wraps children in a 3-D tilt card.
 * Add `tilt-scene` class to the parent container for perspective.
 */
const TiltCard = forwardRef(function TiltCard({ children, className = '', style, tiltOptions }, outerRef) {
  const { cardRef, glareRef, onMouseMove, onMouseLeave } = useTilt(tiltOptions);

  return (
    <div
      ref={(node) => {
        cardRef.current = node;
        if (typeof outerRef === 'function') outerRef(node);
        else if (outerRef) outerRef.current = node;
      }}
      className={`tilt-card ${className}`}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
      <span ref={glareRef} className="tilt-card__glare" aria-hidden="true" />
    </div>
  );
});

export default TiltCard;
