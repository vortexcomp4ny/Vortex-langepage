import { forwardRef } from 'react';
import useTilt from '../hooks/useTilt';

const TiltCard = forwardRef(function TiltCard({ children, className = '', style, tiltOptions }, outerRef) {
  const { cardRef, onMouseMove, onMouseLeave } = useTilt(tiltOptions);

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
    </div>
  );
});

export default TiltCard;
