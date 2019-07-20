import React from 'react';
import { ReactComponent as EmptyStateIllustration } from '../icons/drawkit-nature-man-colour.svg';

function EmptyState() {
  return (
    <div className="empty-state-container">
      <br />
      <EmptyStateIllustration />
      <p className="acknowledgements"> Adapted from Pomodoist (React Decal 2019)</p>
    </div>
  );
}

export default EmptyState;
