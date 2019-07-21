import React from 'react';
import { ReactComponent as EmptyStateIllustration } from '../icons/drawkit-nature-man-colour.svg';

function EmptyState() {
  return (
    <div className="empty-state-container">
      <br />
      <EmptyStateIllustration />
      <div className="acknowledgements"> 
        <p>
          1. Add a task you want to complete, just like a regular to-do list
          <br/>2. Select the # of Pomodoro sessions you plan to complete it in
          <br/>3. Time and track how many sessions you actually take
        </p>
        <p>
          Adapted from Pomodoist (React Decal 2019)
        </p>
      </div>
    </div>
  );
}

export default EmptyState;
