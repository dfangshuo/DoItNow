import React from 'react';
import { ReactComponent as EmptyStateIllustration } from '../icons/drawkit-nature-man-colour.svg';

function EmptyState() {
  return (
    <div className="empty-state-container">
      <br />
      <EmptyStateIllustration />
    </div>
  );
}

export default EmptyState;
