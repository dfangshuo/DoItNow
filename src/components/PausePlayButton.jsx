import React from 'react';
import { ReactComponent as Play } from '../icons/play.svg';
// import { ReactComponent as Play } from '../icons/play.png';
import { ReactComponent as Pause } from '../icons/pause.svg';

function PausePlayButton({ onClick, isPlaying }) {
  return (
    <button className="timer-button" type="button" onClick={onClick}>
      { isPlaying ? <Pause /> : <Play /> }
    </button>
  );
}

export default PausePlayButton;
